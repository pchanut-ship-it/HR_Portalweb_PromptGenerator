(function (global) {
  'use strict';

  const ROLE_LABELS = {
    generalist: 'HR Generalist',
    specialist: 'HR Specialist',
    manager: 'HRBP & Manager'
  };

  // =========================================================================
  // Pure-JS Dependency-Free ZIP Builder (IEEE 802.3 CRC-32, STORE, UTF-8 0x0800)
  // =========================================================================
  const CRC_TABLE = (() => {
    const table = new Uint32Array(256);
    for (let i = 0; i < 256; i += 1) {
      let c = i;
      for (let k = 0; k < 8; k += 1) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[i] = c >>> 0;
    }
    return table;
  })();

  function crc32(bytes) {
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i += 1) {
      crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function getDosDateTime(date = new Date()) {
    const year = Math.max(1980, date.getFullYear());
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = Math.floor(date.getSeconds() / 2);

    const dosTime = ((hours & 0x1f) << 11) | ((minutes & 0x3f) << 5) | (seconds & 0x1f);
    const dosDate = (((year - 1980) & 0x7f) << 9) | ((month & 0x0f) << 5) | (day & 0x1f);
    return { dosTime, dosDate };
  }

  /**
   * Build a standard ZIP archive (STORE method 0, UTF-8 EFS flag 0x0800)
   * @param {Array<{name: string, content: string | Uint8Array}>} files
   * @returns {Uint8Array}
   */
  function buildZip(files) {
    const encoder = new TextEncoder();
    const { dosTime, dosDate } = getDosDateTime(new Date());
    const UTF8_FLAG = 0x0800;

    const localChunks = [];
    const centralChunks = [];
    let offset = 0;

    for (const file of files) {
      const normalizedName = String(file.name).replace(/^\/+/, '').replace(/\\/g, '/');
      const nameBytes = encoder.encode(normalizedName);
      const dataBytes = file.content instanceof Uint8Array
        ? file.content
        : encoder.encode(String(file.content));
      const crc = crc32(dataBytes);
      const size = dataBytes.length;

      // Local File Header (30 bytes + filename)
      const localHeader = new Uint8Array(30 + nameBytes.length);
      const ldv = new DataView(localHeader.buffer);
      ldv.setUint32(0, 0x04034b50, true); // Local file header signature
      ldv.setUint16(4, 20, true);         // Version needed to extract (2.0)
      ldv.setUint16(6, UTF8_FLAG, true);  // General purpose bit flag (UTF-8)
      ldv.setUint16(8, 0, true);          // Compression method: 0 (STORE)
      ldv.setUint16(10, dosTime, true);   // Last mod file time
      ldv.setUint16(12, dosDate, true);   // Last mod file date
      ldv.setUint32(14, crc, true);       // CRC-32
      ldv.setUint32(18, size, true);      // Compressed size
      ldv.setUint32(22, size, true);      // Uncompressed size
      ldv.setUint16(26, nameBytes.length, true); // File name length
      ldv.setUint16(28, 0, true);         // Extra field length
      localHeader.set(nameBytes, 30);

      localChunks.push(localHeader, dataBytes);

      // Central Directory Header (46 bytes + filename)
      const centralHeader = new Uint8Array(46 + nameBytes.length);
      const cdv = new DataView(centralHeader.buffer);
      cdv.setUint32(0, 0x02014b50, true); // Central file header signature
      cdv.setUint16(4, 20, true);         // Version made by
      cdv.setUint16(6, 20, true);         // Version needed to extract
      cdv.setUint16(8, UTF8_FLAG, true);  // General purpose bit flag (UTF-8)
      cdv.setUint16(10, 0, true);         // Compression method: 0 (STORE)
      cdv.setUint16(12, dosTime, true);   // Last mod file time
      cdv.setUint16(14, dosDate, true);   // Last mod file date
      cdv.setUint32(16, crc, true);       // CRC-32
      cdv.setUint32(20, size, true);      // Compressed size
      cdv.setUint32(24, size, true);      // Uncompressed size
      cdv.setUint16(28, nameBytes.length, true); // File name length
      cdv.setUint16(30, 0, true);         // Extra field length
      cdv.setUint16(32, 0, true);         // File comment length
      cdv.setUint16(34, 0, true);         // Disk number start
      cdv.setUint16(36, 0, true);         // Internal file attributes
      cdv.setUint32(38, 0, true);         // External file attributes
      cdv.setUint32(42, offset, true);    // Relative offset of local header
      centralHeader.set(nameBytes, 46);

      centralChunks.push(centralHeader);
      offset += localHeader.length + dataBytes.length;
    }

    let centralSize = 0;
    for (const chunk of centralChunks) {
      centralSize += chunk.length;
    }

    // End of Central Directory Record (22 bytes)
    const eocd = new Uint8Array(22);
    const edv = new DataView(eocd.buffer);
    edv.setUint32(0, 0x06054b50, true);        // EOCD signature
    edv.setUint16(4, 0, true);                 // Number of this disk
    edv.setUint16(6, 0, true);                 // Disk where central directory starts
    edv.setUint16(8, files.length, true);      // Entries on this disk
    edv.setUint16(10, files.length, true);     // Total entries
    edv.setUint32(12, centralSize, true);      // Size of central directory
    edv.setUint32(16, offset, true);           // Offset of central directory
    edv.setUint16(20, 0, true);                // ZIP comment length

    const totalSize = offset + centralSize + eocd.length;
    const output = new Uint8Array(totalSize);
    let pos = 0;
    for (const chunk of localChunks) {
      output.set(chunk, pos);
      pos += chunk.length;
    }
    for (const chunk of centralChunks) {
      output.set(chunk, pos);
      pos += chunk.length;
    }
    output.set(eocd, pos);

    return output;
  }

  // =========================================================================
  // README Generators for Individual Skills & Multi-Skill ZIP Bundles
  // =========================================================================
  function buildSkillReadme(skill) {
    const prompts = (skill.examplePrompts || [])
      .map((p, idx) => `${idx + 1}. ${p}`)
      .join('\n');

    return `# ${skill.title} (${skill.subtitle})

รหัส Skill: \`${skill.slug}\`

## สรุปความสามารถ
${skill.summary}

## วิธีติดตั้งและใช้งาน
1. **Gemini Skills (Web / Chrome / Gemini CLI):**
   - *Gemini เว็บ:* ไปที่ [gemini.google.com](https://gemini.google.com) เลือก **Customize > Skills** (หรือเปิด \`chrome://skills\`) จากนั้นกด **Create > Upload file / Import** หรือ **More options > Replace skill** เพื่ออัปโหลดไฟล์ \`${skill.slug}.zip\` หรือไฟล์ \`SKILL.md\` (หากใช้ \`.zip\` ตรวจสอบให้ \`SKILL.md\` อยู่ที่ชั้นบนสุดของโฟลเดอร์ Skill)
   - *Gemini CLI:* แตกไฟล์โฟลเดอร์ \`${skill.slug}/\` ไปวางที่ \`~/.gemini/skills/\` (ใช้ได้ทุกโปรเจกต์) หรือ \`.gemini/skills/\` (เฉพาะโปรเจกต์)
2. **Antigravity / Claude Code:** แตกไฟล์โฟลเดอร์ \`${skill.slug}/\` ไปวางไว้ในโฟลเดอร์ Skills ของคุณ (เช่น \`~/.gemini/antigravity/skills/\`, \`~/.claude/skills/\` หรือ \`.agents/skills/\` ในโปรเจกต์)
3. **Claude.ai (Web / Desktop):** เปิด Settings > Capabilities > Skills แล้วอัปโหลดไฟล์ \`${skill.slug}.zip\` หรือคัดลอกเนื้อหาใน \`SKILL.md\` ไปใส่ใน Project Instructions
4. **ChatGPT Skills (Web / Desktop / Codex):** เปิด ChatGPT ไปที่เมนู **Skills** (แถบด้านข้างหรือ **Settings > Skills**) กด **Create / New Skill > Upload from your computer** แล้วอัปโหลดไฟล์ \`${skill.slug}.zip\` (หรือวางโฟลเดอร์ \`${skill.slug}/\` ในระบบ Codex)

## ตัวอย่างคำสั่งใช้งาน
${prompts}

> **ข้อควรระวังด้าน PDPA:** ห้ามนำชื่อ-นามสกุลจริง เลขบัตรประชาชน บัญชีธนาคาร หรือข้อมูลสุขภาพของพนักงานจริงใส่ใน AI สาธารณะ กรุณาใช้นามสมมติหรือรหัสพนักงานแทนทุกครั้ง
`;
  }

  function buildBundleReadme(skills, categories) {
    const catMap = new Map(categories.map((c) => [c.id, c.name]));
    const rows = skills
      .map((s, idx) => `| ${idx + 1} | \`${s.slug}\` | ${s.title} | ${catMap.get(s.category) || s.category} |`)
      .join('\n');

    return `# คลัง HR AI Skills ประเทศไทย (Thailand HR Skills Pack)

ชุดแพ็กเกจ Agent Skills ภาษาไทยสำหรับงานทรัพยากรบุคคลในประเทศไทย จำนวน ${skills.length} Skills (อัปเดตกฎหมายแรงงาน พ.ศ. 2568–2569 และ PDPA)

## โครงสร้างไฟล์ในแพ็กเกจนี้
แต่ละโฟลเดอร์ประกอบด้วย:
- \`<slug>/SKILL.md\` — ไฟล์ Skill มาตรฐานพร้อม YAML Frontmatter (UTF-8 ไม่มี BOM)
- \`<slug>/README.md\` — คู่มือสรุปการใช้งานเฉพาะ Skill

## รายการ Skills ทั้งหมดในชุดนี้ (${skills.length} รายการ)
| ลำดับ | รหัสโฟลเดอร์ (Slug) | ชื่อ Skill | หมวดหมู่ |
|---|---|---|---|
${rows}

## วิธีใช้งานกับเครื่องมือ AI ยอดนิยม
- **Gemini Skills (Web / Chrome / CLI):** ใน Gemini เว็บไปที่ **Customize > Skills** หรือ \`chrome://skills\` เพื่ออัปโหลดโฟลเดอร์/ไฟล์ \`SKILL.md\` ที่ต้องการ หรือสำหรับ Gemini CLI แตกโฟลเดอร์ \`hr-*\` ไปวางไว้ที่ \`~/.gemini/skills/\` หรือ \`.gemini/skills/\`
- **Antigravity / Claude Code:** แตกไฟล์แล้วคัดลอกโฟลเดอร์ \`hr-*\` ที่ต้องการไปวางในโฟลเดอร์ \`skills/\` ของเครื่องมือ
- **Claude.ai:** บีบอัดโฟลเดอร์ย่อยที่ต้องการเป็น \`.zip\` เพื่ออัปโหลดในหน้า Skills หรือคัดลอกเนื้อหา \`SKILL.md\` ใส่ใน Claude Project
- **ChatGPT Skills (Web / Desktop / Codex):** ไปที่เมนู **Skills** ใน ChatGPT (หรือ **Settings > Skills**) กด **Create / New Skill > Upload from your computer** เพื่ออัปโหลดไฟล์ \`.zip\` ของ Skill ที่ต้องการ (สำหรับ Codex สามารถตั้งค่าโฟลเดอร์ \`hr-*\` ในเครื่องได้)

## หมายเหตุสำคัญ (PDPA & กฎหมายแรงงาน)
- ปิดบังหรือลบข้อมูลส่วนบุคคลที่ระบุตัวตนได้ (PII) ก่อนนำข้อมูลจริงเข้า AI สาธารณะทุกครั้ง
- ผลลัพธ์จาก AI ใช้เป็นเครื่องมือช่วยร่างและวิเคราะห์เบื้องต้น กรณีข้อพิพาทแรงงานที่มีความเสี่ยงทางกฎหมายควรปรึกษานิติกรหรือทนายความก่อนดำเนินการจริง
`;
  }

  // =========================================================================
  // XSS-Safe Markdown & YAML Frontmatter Parser
  // =========================================================================
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function parseFrontmatter(mdText) {
    const normalized = String(mdText || '').replace(/\r\n/g, '\n');
    const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!match) {
      return { meta: null, body: normalized };
    }
    const fmBlock = match[1];
    const nameMatch = fmBlock.match(/^name:\s*(.+)$/m);
    const descMatch = fmBlock.match(/^description:\s*(.+)$/m);
    return {
      meta: {
        name: nameMatch ? nameMatch[1].trim() : '',
        description: descMatch ? descMatch[1].trim() : ''
      },
      body: match[2]
    };
  }

  function renderInline(rawEscaped) {
    const codeTokens = [];
    let text = rawEscaped.replace(/`([^`]+)`/g, (_, code) => {
      const idx = codeTokens.length;
      codeTokens.push(`<code>${code}</code>`);
      return `\u0000CODE${idx}\u0000`;
    });

    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    text = text.replace(/&lt;br\s*\/?&gt;/gi, '<br>');

    text = text.replace(/\u0000CODE(\d+)\u0000/g, (_, idx) => codeTokens[Number(idx)] || '');
    return text;
  }

  function isTableRow(line) {
    return /^\s*\|.*\|\s*$/.test(line);
  }

  function isTableSeparator(line) {
    return /^\s*\|(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(line);
  }

  function splitTableCells(line) {
    return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
  }

  function renderMarkdown(mdText) {
    const { meta, body } = parseFrontmatter(mdText);
    const lines = body.split('\n');
    const htmlParts = [];

    if (meta && (meta.name || meta.description)) {
      htmlParts.push(
        `<div class="md-frontmatter-card"><div><strong>Skill ID:</strong> <code>${escapeHtml(meta.name)}</code></div><div style="margin-top:0.25rem"><strong>Trigger Description:</strong> ${escapeHtml(meta.description)}</div></div>`
      );
    }

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];

      // Blank line
      if (/^\s*$/.test(line)) {
        i += 1;
        continue;
      }

      // Fenced code block
      if (/^\s*```/.test(line)) {
        const codeLines = [];
        i += 1;
        while (i < lines.length && !/^\s*```/.test(lines[i])) {
          codeLines.push(escapeHtml(lines[i]));
          i += 1;
        }
        i += 1; // skip closing fence
        htmlParts.push(`<pre><code>${codeLines.join('\n')}</code></pre>`);
        continue;
      }

      // Horizontal rule
      if (/^\s*---+\s*$/.test(line)) {
        htmlParts.push('<hr>');
        i += 1;
        continue;
      }

      // Headings h1-h4
      const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        htmlParts.push(`<h${level}>${renderInline(escapeHtml(headingMatch[2]))}</h${level}>`);
        i += 1;
        continue;
      }

      // Blockquote
      if (/^\s*>\s?/.test(line)) {
        const quoteLines = [];
        while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
          quoteLines.push(renderInline(escapeHtml(lines[i].replace(/^\s*>\s?/, ''))));
          i += 1;
        }
        htmlParts.push(`<blockquote>${quoteLines.join('<br>')}</blockquote>`);
        continue;
      }

      // GFM Table
      if (i + 1 < lines.length && isTableRow(line) && isTableSeparator(lines[i + 1])) {
        const headers = splitTableCells(line);
        i += 2;
        const rows = [];
        while (i < lines.length && isTableRow(lines[i])) {
          rows.push(splitTableCells(lines[i]));
          i += 1;
        }
        const thHtml = headers.map((h) => `<th>${renderInline(escapeHtml(h))}</th>`).join('');
        const trHtml = rows
          .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(escapeHtml(cell))}</td>`).join('')}</tr>`)
          .join('');
        htmlParts.push(`<div class="md-table-wrap"><table><thead><tr>${thHtml}</tr></thead><tbody>${trHtml}</tbody></table></div>`);
        continue;
      }

      // Unordered or Task List
      if (/^\s*[-*]\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          const rawItem = lines[i].replace(/^\s*[-*]\s+/, '');
          const taskMatch = rawItem.match(/^\[( |x|X)\]\s+(.*)$/);
          if (taskMatch) {
            const checked = taskMatch[1].toLowerCase() === 'x';
            items.push(`<li class="md-task">${checked ? '☑' : '☐'} ${renderInline(escapeHtml(taskMatch[2]))}</li>`);
          } else {
            items.push(`<li>${renderInline(escapeHtml(rawItem))}</li>`);
          }
          i += 1;
        }
        htmlParts.push(`<ul>${items.join('')}</ul>`);
        continue;
      }

      // Ordered List
      if (/^\s*\d+\.\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          const rawItem = lines[i].replace(/^\s*\d+\.\s+/, '');
          items.push(`<li>${renderInline(escapeHtml(rawItem))}</li>`);
          i += 1;
        }
        htmlParts.push(`<ol>${items.join('')}</ol>`);
        continue;
      }

      // Paragraph
      const paraLines = [];
      while (
        i < lines.length &&
        !/^\s*$/.test(lines[i]) &&
        !/^\s*```/.test(lines[i]) &&
        !/^#{1,4}\s+/.test(lines[i]) &&
        !/^\s*>\s?/.test(lines[i]) &&
        !/^\s*[-*]\s+/.test(lines[i]) &&
        !/^\s*\d+\.\s+/.test(lines[i]) &&
        !(i + 1 < lines.length && isTableRow(lines[i]) && isTableSeparator(lines[i + 1]))
      ) {
        paraLines.push(renderInline(escapeHtml(lines[i])));
        i += 1;
      }
      if (paraLines.length > 0) {
        htmlParts.push(`<p>${paraLines.join('<br>')}</p>`);
      } else {
        i += 1;
      }
    }

    return htmlParts.join('\n');
  }

  // Expose core pure functions for Node verification / external inspection
  global.HRSkillsLib = {
    buildZip,
    renderMarkdown,
    parseFrontmatter,
    buildSkillReadme,
    buildBundleReadme
  };

  // Skip DOM bootstrap if running inside headless Node unit test without document
  if (typeof document === 'undefined') {
    return;
  }

  // =========================================================================
  // Browser Application Bootstrap
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    const categories = global.HR_SKILLS_CATEGORIES || [];
    const skills = global.HR_SKILLS_DATA || [];
    const categoryMap = new Map(categories.map((c) => [c.id, c]));

    const state = {
      searchQuery: '',
      category: 'all',
      role: 'all',
      onlyLawUpdate: false,
      selectedSlugs: new Set(),
      activeModalSlug: null,
      activeModalTab: 'overview',
      activeGuidePlatform: 'antigravity',
      lastFocusedEl: null
    };

    // DOM Elements
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const openGuideTopBtn = document.getElementById('openGuideTopBtn');
    const openGuideHeroBtn = document.getElementById('openGuideHeroBtn');
    const downloadAllHeroBtn = document.getElementById('downloadAllHeroBtn');
    const selectedCountTop = document.getElementById('selectedCountTop');
    const selectedTopBtn = document.getElementById('selectedTopBtn');

    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const categoryFiltersEl = document.getElementById('categoryFilters');
    const roleFilterGroup = document.getElementById('roleFilterGroup');
    const lawUpdateToggle = document.getElementById('lawUpdateToggle');
    const resultCounter = document.getElementById('resultCounter');
    const selectAllVisibleBtn = document.getElementById('selectAllVisibleBtn');

    const skillsGrid = document.getElementById('skillsGrid');
    const emptyState = document.getElementById('emptyState');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');

    const bundleDock = document.getElementById('bundleDock');
    const bundleDockCount = document.getElementById('bundleDockCount');
    const bundleSelectVisibleBtn = document.getElementById('bundleSelectVisibleBtn');
    const bundleClearBtn = document.getElementById('bundleClearBtn');
    const bundleDownloadBtn = document.getElementById('bundleDownloadBtn');

    // Skill Detail Modal Elements
    const skillModal = document.getElementById('skillModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCategoryBadge = document.getElementById('modalCategoryBadge');
    const modalLawBadge = document.getElementById('modalLawBadge');
    const modalSkillTitle = document.getElementById('modalSkillTitle');
    const modalSkillSubtitle = document.getElementById('modalSkillSubtitle');
    const modalDownloadZipBtn = document.getElementById('modalDownloadZipBtn');
    const modalDownloadMdBtn = document.getElementById('modalDownloadMdBtn');
    const modalCopyMdBtn = document.getElementById('modalCopyMdBtn');
    const modalSelectToggleBtn = document.getElementById('modalSelectToggleBtn');
    const modalTabs = document.getElementById('modalTabs');
    const tabPanelOverview = document.getElementById('tabPanelOverview');
    const tabPanelPreview = document.getElementById('tabPanelPreview');
    const tabPanelRaw = document.getElementById('tabPanelRaw');
    const modalSummaryText = document.getElementById('modalSummaryText');
    const modalMetaGrid = document.getElementById('modalMetaGrid');
    const modalOutputsList = document.getElementById('modalOutputsList');
    const modalLawsList = document.getElementById('modalLawsList');
    const modalPromptsList = document.getElementById('modalPromptsList');
    const modalMarkdownPreview = document.getElementById('modalMarkdownPreview');
    const modalRawCode = document.getElementById('modalRawCode');

    // Guide Modal Elements
    const guideModal = document.getElementById('guideModal');
    const guideCloseBtn = document.getElementById('guideCloseBtn');
    const guideTabs = document.getElementById('guideTabs');
    const guidePlatformContent = document.getElementById('guidePlatformContent');

    const toastRegion = document.getElementById('toastRegion');

    // =========================================================================
    // Toast & Clipboard & File Download Helpers
    // =========================================================================
    function showToast(message, type = 'success') {
      const toast = document.createElement('div');
      toast.className = `toast toast--${type}`;
      toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}" aria-hidden="true"></i><span>${escapeHtml(message)}</span>`;
      toastRegion.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3200);
    }

    async function copyText(text, successMsg = 'คัดลอกเรียบร้อยแล้ว') {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          showToast(successMsg, 'success');
          return true;
        }
      } catch (e) {
        // Fallback below
      }
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      let copied = false;
      try {
        copied = document.execCommand('copy');
      } catch (e) {
        copied = false;
      }
      document.body.removeChild(textarea);
      if (copied) {
        showToast(successMsg, 'success');
      } else {
        showToast('ไม่สามารถคัดลอกอัตโนมัติได้ กรุณาเปิดดูไฟล์ต้นฉบับเพื่อคัดลอก', 'info');
      }
      return copied;
    }

    function triggerDownload(blob, filename) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }

    function downloadSingleMd(skill) {
      const blob = new Blob([skill.markdown], { type: 'text/markdown;charset=utf-8' });
      triggerDownload(blob, `${skill.slug}-SKILL.md`);
      showToast(`ดาวน์โหลด ${skill.slug}-SKILL.md สำเร็จ`);
    }

    function downloadSingleZip(skill) {
      const files = [
        { name: `${skill.slug}/SKILL.md`, content: skill.markdown },
        { name: `${skill.slug}/README.md`, content: buildSkillReadme(skill) }
      ];
      const zipBytes = buildZip(files);
      const blob = new Blob([zipBytes], { type: 'application/zip' });
      triggerDownload(blob, `${skill.slug}.zip`);
      showToast(`ดาวน์โหลดแพ็กเกจ ${skill.slug}.zip สำเร็จ`);
    }

    function downloadZipBundle(targetSkills, filename) {
      if (!targetSkills || targetSkills.length === 0) return;
      const files = [
        { name: 'README-HR-SKILLS.md', content: buildBundleReadme(targetSkills, categories) }
      ];
      for (const skill of targetSkills) {
        files.push({ name: `${skill.slug}/SKILL.md`, content: skill.markdown });
        files.push({ name: `${skill.slug}/README.md`, content: buildSkillReadme(skill) });
      }
      const zipBytes = buildZip(files);
      const blob = new Blob([zipBytes], { type: 'application/zip' });
      triggerDownload(blob, filename);
      showToast(`ดาวน์โหลดชุด ${targetSkills.length} Skills (${filename}) สำเร็จ`);
    }

    // =========================================================================
    // Theme Sync (Shared localStorage key 'hr-portal-theme')
    // =========================================================================
    function updateThemeState(theme) {
      root.setAttribute('data-theme', theme);
      const isDark = theme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('title', isDark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด');
    }

    updateThemeState(root.getAttribute('data-theme') || 'light');

    themeToggle.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      updateThemeState(nextTheme);
      try {
        localStorage.setItem('hr-portal-theme', nextTheme);
      } catch (e) {
        // Ignore storage error
      }
    });

    // =========================================================================
    // Filtering & Category Pills Rendering
    // =========================================================================
    function getFilteredSkills() {
      const q = state.searchQuery.trim().toLowerCase();
      return skills.filter((skill) => {
        if (state.category !== 'all' && skill.category !== state.category) {
          return false;
        }
        if (state.role !== 'all' && !(skill.roles || []).includes(state.role)) {
          return false;
        }
        if (state.onlyLawUpdate && !skill.hasLawUpdate2568) {
          return false;
        }
        if (!q) return true;

        const catName = categoryMap.get(skill.category)?.name || '';
        const haystack = [
          skill.slug,
          skill.title,
          skill.subtitle,
          skill.summary,
          catName,
          ...(skill.tags || []),
          ...(skill.laws || []),
          ...(skill.outputs || [])
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    function renderCategoryPills() {
      const counts = new Map();
      for (const s of skills) {
        counts.set(s.category, (counts.get(s.category) || 0) + 1);
      }

      const allActive = state.category === 'all';
      let html = `<button type="button" class="cat-pill ${allActive ? 'active' : ''}" data-category="all" aria-pressed="${allActive}">ทั้งหมด <span class="cat-pill-count">${skills.length}</span></button>`;

      for (const cat of categories) {
        const count = counts.get(cat.id) || 0;
        const active = state.category === cat.id;
        html += `<button type="button" class="cat-pill ${active ? 'active' : ''}" data-category="${escapeHtml(cat.id)}" aria-pressed="${active}"><i class="${escapeHtml(cat.icon)}" aria-hidden="true"></i><span>${escapeHtml(cat.shortName || cat.name)}</span><span class="cat-pill-count">${count}</span></button>`;
      }

      categoryFiltersEl.innerHTML = html;
    }

    function updateSelectionUI() {
      const count = state.selectedSlugs.size;
      selectedCountTop.textContent = String(count);
      selectedTopBtn.classList.toggle('has-items', count > 0);
      bundleDock.hidden = count === 0;
      bundleDockCount.textContent = `เลือกไว้ ${count} Skill${count > 1 ? 's' : ''}`;

      if (state.activeModalSlug) {
        const isSelected = state.selectedSlugs.has(state.activeModalSlug);
        modalSelectToggleBtn.innerHTML = isSelected
          ? '<i class="fa-solid fa-check-square" aria-hidden="true"></i><span>เลือกอยู่ในชุดแล้ว</span>'
          : '<i class="fa-regular fa-square" aria-hidden="true"></i><span>เพิ่มเข้าชุดดาวน์โหลด</span>';
      }
    }

    function renderSkillsGrid() {
      const filtered = getFilteredSkills();
      resultCounter.textContent = `แสดง ${filtered.length} จาก ${skills.length} Skills`;
      clearSearchBtn.hidden = state.searchQuery.trim().length === 0;

      if (filtered.length === 0) {
        skillsGrid.innerHTML = '';
        skillsGrid.hidden = true;
        emptyState.hidden = false;
        return;
      }

      emptyState.hidden = true;
      skillsGrid.hidden = false;

      const cardsHtml = filtered.map((skill) => {
        const cat = categoryMap.get(skill.category) || { name: skill.category, accent: 'indigo', icon: 'fa-solid fa-wand-magic-sparkles' };
        const isSelected = state.selectedSlugs.has(skill.slug);
        const outputsHtml = (skill.outputs || [])
          .slice(0, 3)
          .map((o) => `<span class="output-chip">${escapeHtml(o)}</span>`)
          .join('');
        const lawBadge = skill.hasLawUpdate2568
          ? '<span class="law-update-badge"><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i>อัปเดตกฎหมาย 2568–2569</span>'
          : '';

        return `
          <article class="skill-card skill-card--${escapeHtml(cat.accent)} ${isSelected ? 'is-selected' : ''}" data-slug="${escapeHtml(skill.slug)}">
            <div class="skill-card-top">
              <div class="skill-card-head-left">
                <div class="skill-icon" aria-hidden="true">
                  <i class="${escapeHtml(cat.icon)}"></i>
                </div>
                <span class="skill-cat-pill">${escapeHtml(cat.name)}</span>
              </div>
              <button
                type="button"
                class="select-toggle-btn"
                data-action="toggle-select"
                data-slug="${escapeHtml(skill.slug)}"
                aria-pressed="${isSelected}"
                aria-label="เลือก ${escapeHtml(skill.title)} เข้าชุดดาวน์โหลด"
                title="${isSelected ? 'นำออกจากชุดดาวน์โหลด' : 'เพิ่มเข้าชุดดาวน์โหลดหลายไฟล์'}"
              >
                <i class="fa-solid ${isSelected ? 'fa-check' : 'fa-plus'}" aria-hidden="true"></i>
              </button>
            </div>

            <div class="skill-card-body">
              <button type="button" class="skill-title-btn" data-action="open-modal" data-slug="${escapeHtml(skill.slug)}">
                <h2>${escapeHtml(skill.title)}</h2>
              </button>
              <div class="skill-subtitle">${escapeHtml(skill.subtitle)}</div>
              <p class="skill-summary">${escapeHtml(skill.summary)}</p>
              <div class="skill-badges-row">
                ${lawBadge}
                ${outputsHtml}
              </div>
            </div>

            <div class="skill-card-footer">
              <button type="button" class="card-btn" data-action="open-modal" data-slug="${escapeHtml(skill.slug)}">
                <i class="fa-regular fa-eye" aria-hidden="true"></i>
                <span>ดูรายละเอียด</span>
              </button>
              <div class="card-footer-right">
                <button type="button" class="card-btn" data-action="copy-md" data-slug="${escapeHtml(skill.slug)}" title="คัดลอกเนื้อหา SKILL.md">
                  <i class="fa-regular fa-copy" aria-hidden="true"></i>
                </button>
                <button type="button" class="card-btn" data-action="download-md" data-slug="${escapeHtml(skill.slug)}" title="ดาวน์โหลดไฟล์ .md">
                  <span>.md</span>
                </button>
                <button type="button" class="card-btn card-btn--zip" data-action="download-zip" data-slug="${escapeHtml(skill.slug)}" title="ดาวน์โหลดแพ็กเกจ .zip พร้อมคู่มือ">
                  <i class="fa-solid fa-file-zipper" aria-hidden="true"></i>
                  <span>.zip</span>
                </button>
              </div>
            </div>
          </article>
        `;
      }).join('');

      skillsGrid.innerHTML = cardsHtml;
    }

    function toggleSkillSelection(slug) {
      if (state.selectedSlugs.has(slug)) {
        state.selectedSlugs.delete(slug);
      } else {
        state.selectedSlugs.add(slug);
      }
      updateSelectionUI();
      renderSkillsGrid();
    }

    function selectAllVisible() {
      const visible = getFilteredSkills();
      for (const skill of visible) {
        state.selectedSlugs.add(skill.slug);
      }
      updateSelectionUI();
      renderSkillsGrid();
      showToast(`เลือกเพิ่มครบ ${visible.length} Skills ที่แสดงอยู่แล้ว`, 'info');
    }

    // =========================================================================
    // Skill Detail Modal
    // =========================================================================
    function switchModalTab(tabName) {
      state.activeModalTab = tabName;
      const tabButtons = modalTabs.querySelectorAll('.modal-tab-btn');
      tabButtons.forEach((btn) => {
        const active = btn.dataset.tab === tabName;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', String(active));
      });
      tabPanelOverview.hidden = tabName !== 'overview';
      tabPanelPreview.hidden = tabName !== 'preview';
      tabPanelRaw.hidden = tabName !== 'raw';
    }

    function openSkillModal(slug) {
      const skill = skills.find((s) => s.slug === slug);
      if (!skill) return;

      state.lastFocusedEl = document.activeElement;
      state.activeModalSlug = slug;

      const cat = categoryMap.get(skill.category) || { name: skill.category };
      modalCategoryBadge.textContent = cat.name;
      modalLawBadge.hidden = !skill.hasLawUpdate2568;
      modalSkillTitle.textContent = skill.title;
      modalSkillSubtitle.textContent = `${skill.subtitle} • รหัสไฟล์: ${skill.slug}/SKILL.md (${skill.lineCount} บรรทัด)`;

      modalSummaryText.textContent = skill.summary;

      const rolesText = (skill.roles || []).map((r) => ROLE_LABELS[r] || r).join(', ');
      modalMetaGrid.innerHTML = `
        <div class="meta-item">
          <div class="meta-item-label">เหมาะสำหรับบทบาท</div>
          <div class="meta-chips"><span class="meta-chip">${escapeHtml(rolesText)}</span><span class="meta-chip">ระดับ: ${escapeHtml(skill.level)}</span></div>
        </div>
        <div class="meta-item">
          <div class="meta-item-label">รหัสแพ็กเกจ (Slug) &amp; ขนาด</div>
          <div class="meta-chips"><span class="meta-chip"><code>${escapeHtml(skill.slug)}</code></span><span class="meta-chip">${skill.charCount.toLocaleString()} ตัวอักษร</span></div>
        </div>
      `;

      modalOutputsList.innerHTML = (skill.outputs || [])
        .map((o) => `<span class="meta-chip">${escapeHtml(o)}</span>`)
        .join('');

      const laws = (skill.laws && skill.laws.length > 0) ? skill.laws : ['แนวปฏิบัติมาตรฐานสากล & บริบทองค์กรไทย'];
      modalLawsList.innerHTML = laws
        .map((l) => `<span class="meta-chip">${escapeHtml(l)}</span>`)
        .join('');

      modalPromptsList.innerHTML = (skill.examplePrompts || [])
        .map((prompt, idx) => `
          <div class="prompt-example-card">
            <div class="prompt-example-text">${escapeHtml(prompt)}</div>
            <button type="button" class="btn btn-secondary btn-xs" data-copy-prompt="${idx}">
              <i class="fa-regular fa-copy" aria-hidden="true"></i>
              <span>คัดลอก</span>
            </button>
          </div>
        `)
        .join('');

      modalMarkdownPreview.innerHTML = renderMarkdown(skill.markdown);
      modalRawCode.textContent = skill.markdown;

      switchModalTab('overview');
      updateSelectionUI();

      skillModal.hidden = false;
      document.body.classList.add('modal-open');
      modalCloseBtn.focus();
    }

    function closeSkillModal() {
      if (skillModal.hidden) return;
      skillModal.hidden = true;
      state.activeModalSlug = null;
      document.body.classList.remove('modal-open');
      if (state.lastFocusedEl && typeof state.lastFocusedEl.focus === 'function') {
        state.lastFocusedEl.focus();
      }
    }

    // =========================================================================
    // How-to-Use Guide Modal
    // =========================================================================
    const GUIDE_CONTENT = {
      antigravity: `
        <div class="guide-steps">
          <div class="guide-step">
            <span class="guide-step-num">1</span>
            <div>
              <h4>ดาวน์โหลดไฟล์ .zip ของ Skill ที่ต้องการ (หรือชุดรวม 18 Skills)</h4>
              <p>กดปุ่ม <strong>.zip</strong> บนการ์ด หรือเลือกหลายรายการแล้วกด <strong>ดาวน์โหลดชุดที่เลือก (.zip)</strong> ระบบจะสร้างไฟล์แพ็กเกจที่มีโฟลเดอร์ <code>&lt;slug&gt;/SKILL.md</code> ให้พร้อมใช้ทันที</p>
            </div>
          </div>
          <div class="guide-step">
            <span class="guide-step-num">2</span>
            <div>
              <h4>แตกไฟล์ไปวางในโฟลเดอร์ Skills</h4>
              <p>นำโฟลเดอร์ <code>hr-*</code> ที่แตกได้ไปวางใน <code>~/.gemini/antigravity/skills/</code> (ใช้งานได้ทุกโปรเจกต์) หรือในโฟลเดอร์ <code>.agents/skills/</code> ภายใน Workspace ขององค์กร</p>
            </div>
          </div>
          <div class="guide-step">
            <span class="guide-step-num">3</span>
            <div>
              <h4>พิมพ์คำสั่งภาษาไทยตามงานจริงได้เลย</h4>
              <p>Antigravity จะอ่าน YAML Frontmatter (<code>name</code> และ <code>description</code>) อัตโนมัติและเรียกใช้ Skill ไทยที่ตรงงานให้ทันที เช่น "ช่วยร่างหนังสือตักเตือนกรณีมาสาย 6 ครั้ง"</p>
            </div>
          </div>
        </div>
      `,
      claude: `
        <div class="guide-steps">
          <div class="guide-step">
            <span class="guide-step-num">1</span>
            <div>
              <h4>สำหรับ Claude.ai (เว็บ/เดสก์ท็อป)</h4>
              <p>เข้าไปที่ <strong>Settings &gt; Capabilities &gt; Skills</strong> แล้วอัปโหลดไฟล์ <code>&lt;slug&gt;.zip</code> ที่ดาวน์โหลดจากหน้านี้ได้โดยตรง (หรือสร้าง Claude Project แล้วนำเนื้อหาใน <code>SKILL.md</code> ไปใส่ใน Project Instructions)</p>
            </div>
          </div>
          <div class="guide-step">
            <span class="guide-step-num">2</span>
            <div>
              <h4>สำหรับ Claude Code</h4>
              <p>แตกไฟล์โฟลเดอร์ <code>hr-*</code> ไปวางที่ <code>~/.claude/skills/</code> หรือ <code>.claude/skills/</code> ในโปรเจกต์ แล้วเรียกใช้งานได้ทันทีในทุก Session</p>
            </div>
          </div>
          <div class="guide-step">
            <span class="guide-step-num">3</span>
            <div>
              <h4>ใช้งานร่วมกับไฟล์เอกสารองค์กร</h4>
              <p>แนบ JD, ข้อบังคับการทำงาน หรือข้อมูลแบบไม่ระบุชื่อพนักงาน (Anonymized) เพื่อให้ Claude อ้างอิงบริบทจริงของบริษัทคุณ</p>
            </div>
          </div>
        </div>
      `,
      chatgpt: `
        <div class="guide-steps">
          <div class="guide-step">
            <span class="guide-step-num">1</span>
            <div>
              <h4>ดาวน์โหลดแพ็กเกจ Skill (<code>.zip</code>)</h4>
              <p>กดปุ่ม <strong>.zip</strong> บนการ์ด Skill ที่ต้องการ ระบบจะเตรียมแพ็กเกจที่มีโฟลเดอร์ <code>&lt;slug&gt;/SKILL.md</code> พร้อม YAML Frontmatter (<code>name</code> และ <code>description</code>) ตามมาตรฐาน Open Agent Skills</p>
            </div>
          </div>
          <div class="guide-step">
            <span class="guide-step-num">2</span>
            <div>
              <h4>อัปโหลดติดตั้งใน ChatGPT Skills (หรือ Codex)</h4>
              <p><strong>ChatGPT เว็บ / เดสก์ท็อป:</strong> เปิดเมนู <strong>Skills</strong> (ในแถบด้านข้างหรือ <strong>Settings &gt; Skills</strong>) กด <strong>Create / New Skill &gt; Upload from your computer</strong> แล้วเลือกไฟล์ <code>.zip</code> ที่ดาวน์โหลด ระบบจะตรวจสอบโครงสร้างไฟล์ <code>SKILL.md</code> อัตโนมัติ</p>
              <p style="margin-top:0.4rem"><strong>Codex / CLI:</strong> แตกไฟล์โฟลเดอร์ <code>hr-*</code> ไปติดตั้งในโฟลเดอร์ Skills ของ Codex (สิทธิ์การอัปโหลด Skill บนเว็บขึ้นอยู่กับแพ็กเกจบัญชีและการตั้งค่า Workspace)</p>
            </div>
          </div>
          <div class="guide-step">
            <span class="guide-step-num">3</span>
            <div>
              <h4>เรียกใช้งาน Skill ในแชท</h4>
              <p>เมื่อ Skill แสดงในรายการ <strong>Installed / Created by me</strong> แล้ว สามารถพิมพ์คำสั่งงาน HR ภาษาไทยได้ทันทีเพื่อให้ ChatGPT เรียกใช้ Skill อัตโนมัติ หรือเรียกใช้ร่วมกับตัวอย่างคำสั่งจากคลังนี้</p>
            </div>
          </div>
        </div>
      `,
      gemini: `
        <div class="guide-steps">
          <div class="guide-step">
            <span class="guide-step-num">1</span>
            <div>
              <h4>เตรียมไฟล์ Skill (<code>SKILL.md</code> หรือ <code>.zip</code>)</h4>
              <p>กดดาวน์โหลดแพ็กเกจ <code>.zip</code> (ซึ่งจัดโครงสร้างโฟลเดอร์ <code>&lt;slug&gt;/SKILL.md</code> เป็นตัวพิมพ์เล็กคั่นด้วยขีดกลางตามมาตรฐาน Agent Skills) หรือดาวน์โหลดไฟล์ <code>.md</code> รายตัวจากคลังนี้</p>
            </div>
          </div>
          <div class="guide-step">
            <span class="guide-step-num">2</span>
            <div>
              <h4>ติดตั้งใน Google Gemini (Web / Chrome / CLI)</h4>
              <p><strong>Gemini เว็บ (gemini.google.com):</strong> เปิดเมนูด้านข้าง เลือก <strong>Customize &gt; Skills</strong> (หากไม่พบให้กด <strong>More</strong> ก่อน) หรือเปิด <code>chrome://skills</code> จากนั้นกด <strong>Create &gt; Upload file / Import</strong> (หรือสร้างแล้วกดเมนู <strong>More options &gt; Replace skill</strong>) เพื่ออัปโหลดไฟล์ <code>.zip</code>, โฟลเดอร์ Skill หรือไฟล์ <code>SKILL.md</code></p>
              <p style="margin-top:0.4rem"><strong>Gemini CLI:</strong> แตกไฟล์แล้วนำโฟลเดอร์ <code>hr-*</code> ไปวางไว้ที่ <code>~/.gemini/skills/</code> (ใช้งานได้ทุกโปรเจกต์) หรือ <code>.gemini/skills/</code> ภายในโฟลเดอร์โปรเจกต์</p>
            </div>
          </div>
          <div class="guide-step">
            <span class="guide-step-num">3</span>
            <div>
              <h4>เรียกใช้งาน Skill ในแชท Gemini</h4>
              <p>พิมพ์ <code>/</code> หรือ <code>@</code> ตามด้วยชื่อ Skill ในห้องแชท หรือพิมพ์คำสั่งงาน HR ภาษาไทยตามปกติเพื่อให้ Gemini เรียกใช้งาน Skill ที่ตรงกับงานอัตโนมัติ</p>
            </div>
          </div>
        </div>
      `
    };

    function renderGuidePlatform(platform) {
      state.activeGuidePlatform = platform;
      guideTabs.querySelectorAll('.modal-tab-btn').forEach((btn) => {
        const active = btn.dataset.platform === platform;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', String(active));
      });
      guidePlatformContent.innerHTML = GUIDE_CONTENT[platform] || GUIDE_CONTENT.antigravity;
    }

    function openGuideModal() {
      state.lastFocusedEl = document.activeElement;
      renderGuidePlatform(state.activeGuidePlatform);
      guideModal.hidden = false;
      document.body.classList.add('modal-open');
      guideCloseBtn.focus();
    }

    function closeGuideModal() {
      if (guideModal.hidden) return;
      guideModal.hidden = true;
      document.body.classList.remove('modal-open');
      if (state.lastFocusedEl && typeof state.lastFocusedEl.focus === 'function') {
        state.lastFocusedEl.focus();
      }
    }

    // =========================================================================
    // Event Listeners
    // =========================================================================
    searchInput.addEventListener('input', () => {
      state.searchQuery = searchInput.value;
      renderSkillsGrid();
    });

    clearSearchBtn.addEventListener('click', () => {
      state.searchQuery = '';
      searchInput.value = '';
      searchInput.focus();
      renderSkillsGrid();
    });

    categoryFiltersEl.addEventListener('click', (event) => {
      const btn = event.target.closest('.cat-pill');
      if (!btn) return;
      state.category = btn.dataset.category || 'all';
      renderCategoryPills();
      renderSkillsGrid();
    });

    roleFilterGroup.addEventListener('click', (event) => {
      const btn = event.target.closest('.role-btn');
      if (!btn) return;
      state.role = btn.dataset.role || 'all';
      roleFilterGroup.querySelectorAll('.role-btn').forEach((el) => {
        const active = el === btn;
        el.classList.toggle('active', active);
        el.setAttribute('aria-pressed', String(active));
      });
      renderSkillsGrid();
    });

    lawUpdateToggle.addEventListener('click', () => {
      state.onlyLawUpdate = !state.onlyLawUpdate;
      lawUpdateToggle.setAttribute('aria-pressed', String(state.onlyLawUpdate));
      renderSkillsGrid();
    });

    resetFiltersBtn.addEventListener('click', () => {
      state.searchQuery = '';
      state.category = 'all';
      state.role = 'all';
      state.onlyLawUpdate = false;
      searchInput.value = '';
      lawUpdateToggle.setAttribute('aria-pressed', 'false');
      roleFilterGroup.querySelectorAll('.role-btn').forEach((el) => {
        const active = el.dataset.role === 'all';
        el.classList.toggle('active', active);
        el.setAttribute('aria-pressed', String(active));
      });
      renderCategoryPills();
      renderSkillsGrid();
    });

    selectAllVisibleBtn.addEventListener('click', selectAllVisible);
    bundleSelectVisibleBtn.addEventListener('click', selectAllVisible);

    bundleClearBtn.addEventListener('click', () => {
      state.selectedSlugs.clear();
      updateSelectionUI();
      renderSkillsGrid();
      showToast('ล้างรายการที่เลือกเรียบร้อยแล้ว', 'info');
    });

    bundleDownloadBtn.addEventListener('click', () => {
      const selected = skills.filter((s) => state.selectedSlugs.has(s.slug));
      downloadZipBundle(selected, `thailand-hr-skills-selected-${selected.length}.zip`);
    });

    selectedTopBtn.addEventListener('click', () => {
      if (state.selectedSlugs.size === 0) {
        showToast('กดปุ่ม + ที่มุมขวาบนของการ์ด เพื่อเลือกหลาย Skills พร้อมกัน', 'info');
        return;
      }
      const selected = skills.filter((s) => state.selectedSlugs.has(s.slug));
      downloadZipBundle(selected, `thailand-hr-skills-selected-${selected.length}.zip`);
    });

    downloadAllHeroBtn.addEventListener('click', () => {
      downloadZipBundle(skills, `thailand-hr-skills-all-${skills.length}.zip`);
    });

    skillsGrid.addEventListener('click', (event) => {
      const actionBtn = event.target.closest('[data-action]');
      if (!actionBtn) return;
      const slug = actionBtn.dataset.slug;
      const action = actionBtn.dataset.action;
      const skill = skills.find((s) => s.slug === slug);
      if (!skill) return;

      if (action === 'open-modal') {
        openSkillModal(slug);
      } else if (action === 'toggle-select') {
        toggleSkillSelection(slug);
      } else if (action === 'copy-md') {
        copyText(skill.markdown, `คัดลอก SKILL.md ของ "${skill.title}" แล้ว`);
      } else if (action === 'download-md') {
        downloadSingleMd(skill);
      } else if (action === 'download-zip') {
        downloadSingleZip(skill);
      }
    });

    // Modal Actions
    modalCloseBtn.addEventListener('click', closeSkillModal);
    skillModal.addEventListener('click', (event) => {
      if (event.target === skillModal) closeSkillModal();
    });

    modalTabs.addEventListener('click', (event) => {
      const btn = event.target.closest('.modal-tab-btn');
      if (!btn) return;
      switchModalTab(btn.dataset.tab);
    });

    modalDownloadZipBtn.addEventListener('click', () => {
      const skill = skills.find((s) => s.slug === state.activeModalSlug);
      if (skill) downloadSingleZip(skill);
    });

    modalDownloadMdBtn.addEventListener('click', () => {
      const skill = skills.find((s) => s.slug === state.activeModalSlug);
      if (skill) downloadSingleMd(skill);
    });

    modalCopyMdBtn.addEventListener('click', () => {
      const skill = skills.find((s) => s.slug === state.activeModalSlug);
      if (skill) copyText(skill.markdown, `คัดลอกเนื้อหา SKILL.md ของ "${skill.title}" แล้ว`);
    });

    modalSelectToggleBtn.addEventListener('click', () => {
      if (state.activeModalSlug) toggleSkillSelection(state.activeModalSlug);
    });

    modalPromptsList.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-copy-prompt]');
      if (!btn || !state.activeModalSlug) return;
      const skill = skills.find((s) => s.slug === state.activeModalSlug);
      const idx = Number(btn.dataset.copyPrompt);
      if (skill && skill.examplePrompts && skill.examplePrompts[idx]) {
        copyText(skill.examplePrompts[idx], 'คัดลอกตัวอย่างคำสั่งแล้ว');
      }
    });

    // Guide Modal Events
    openGuideTopBtn.addEventListener('click', openGuideModal);
    openGuideHeroBtn.addEventListener('click', openGuideModal);
    guideCloseBtn.addEventListener('click', closeGuideModal);
    guideModal.addEventListener('click', (event) => {
      if (event.target === guideModal) closeGuideModal();
    });
    guideTabs.addEventListener('click', (event) => {
      const btn = event.target.closest('.modal-tab-btn');
      if (!btn) return;
      renderGuidePlatform(btn.dataset.platform);
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (!skillModal.hidden) {
          closeSkillModal();
        } else if (!guideModal.hidden) {
          closeGuideModal();
        }
        return;
      }

      if (
        event.key === '/' &&
        skillModal.hidden &&
        guideModal.hidden &&
        document.activeElement !== searchInput &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
      ) {
        event.preventDefault();
        searchInput.focus();
      }
    });

    // Initial Render
    renderCategoryPills();
    renderSkillsGrid();
    updateSelectionUI();
  });
})(typeof window !== 'undefined' ? window : globalThis);
