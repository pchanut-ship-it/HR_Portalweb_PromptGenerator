// Classic browser script (no ES module) so index.html works seamlessly over file:// and http(s)://
window.STYLE_CATEGORIES = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'corporate', label: 'ทางการ & องค์กร' },
    { id: '3d-tech', label: '3D & เทคโนโลยี' },
    { id: 'illustration', label: 'กราฟิก & วาดประกอบ' },
    { id: 'photo-culture', label: 'ภาพถ่าย & อัตลักษณ์' }
];

window.CUSTOM_STYLE_PRESETS = [
    'Studio Ghibli',
    'Bauhaus',
    'Neo-Brutalism',
    'Oil Painting (สีน้ำมัน)',
    'Pixel Art',
    'Chalkboard (กระดานดำ)',
    'Origami',
    'Stained Glass',
    'Minimal Line Art',
    'Y2K Aesthetic'
];

window.ART_STYLES = [
    {
        id: 'minimal',
        nameTh: 'มินิมอล',
        nameEn: 'Minimalist',
        category: 'corporate',
        categoryLabel: 'ทางการ & องค์กร',
        shortDesc: 'เรียบง่าย สะอาดตา พื้นที่ว่างเยอะ อ่านง่าย',
        image: 'images/styles/minimal.jpg',
        fallbackGradient: 'linear-gradient(135deg, #f7f4ee 0%, #e4d6c5 55%, #b76e54 100%)',
        badge: 'ยอดนิยม',
        palette: [
            { hex: '#F6F3EC', name: 'Warm Off-White' },
            { hex: '#C66B4F', name: 'Terracotta' },
            { hex: '#7D927D', name: 'Muted Sage' },
            { hex: '#2B2F36', name: 'Charcoal Ink' }
        ],
        detailSummary: 'งานออกแบบสไตล์สวิสมินิมอลที่ตัดทอนองค์ประกอบฟุ่มเฟือยออกทั้งหมด เหลือเพียงรูปทรงเรขาคณิตที่สมดุลและจังหวะพื้นที่ว่างขนาดใหญ่ ช่วยให้หัวข้อข่าวสารหรือข้อความสำคัญโดดเด่นชัดเจนตั้งแต่แรกเห็น',
        details: {
            mood: 'สงบ เรียบร้อย ทันสมัย และดูมีรสนิยมสูง สื่อถึงความโปร่งใสและความใส่ใจในรายละเอียด',
            lightingAndTexture: 'พื้นผิวกระดาษด้านเนื้อละเอียด (Matte paper) แสงธรรมชาติอ่อนๆ นุ่มนวล ไร้เงาแข็งหรือเอฟเฟกต์รกตา',
            layoutAndTypography: 'ใช้ระบบกริด (Swiss Grid) เว้นขอบและพื้นที่ว่าง 40–55% คู่กับฟอนต์ไร้เชิง (Sans-serif) น้ำหนักบาง-หนาตัดกันชัดเจน',
            colorStrategy: 'จำกัดชุดสีเพียง 2–3 สีหลักบนพื้นหลังโทนขาวนวลหรือครีมอุ่น เพื่อรักษาความสบายตาและความคมชัดของข้อความ'
        },
        bestFor: [
            'โปสเตอร์ประชาสัมพันธ์กิจกรรม/นิทรรศการ',
            'ประกาศนโยบายและสวัสดิการ HR',
            'Infographic สรุปขั้นตอนแบบอ่านง่าย',
            'สื่อรับสมัครงานภาพลักษณ์ทันสมัย'
        ],
        promptSpec: {
            enKeywords: 'Swiss minimalist poster design, generous negative space, clean geometric balance, warm matte paper texture, soft diffused daylight, restrained editorial palette, crisp modern typography layout, ultra-clean composition',
            thArtDirection: 'สไตล์สวิสมินิมอล (Swiss Minimalist) เน้นรูปทรงเรขาคณิตที่เรียบง่าย สมดุล ตัดทอนรายละเอียดส่วนเกินออกทั้งหมดเพื่อสร้างความโปร่งโล่งและสบายตา',
            thColorAndLight: 'พื้นหลังสีขาวนวล/ครีมอุ่น (Warm Off-White) ผสมสีเน้นเพียง 1–2 สี เช่น เทอราคอตตาและเขียวเซจ พื้นผิวกระดาษแมตต์ แสงธรรมชาติอ่อนละมุน',
            thCompositionPoster: 'เว้นพื้นที่ว่าง (Negative Space) อย่างน้อย 40% สำหรับพาดหัวหลักขนาดใหญ่ที่คมชัด วางองค์ประกอบภาพนำสายตาแบบสมมาตรหรือกฎสามส่วน',
            thCompositionInfographic: 'จัดวางข้อมูลตามแนวกริดที่สะอาดตา แบ่งช่องว่างระหว่างบล็อกข้อความชัดเจน ใช้ไอคอนเส้นบางเรียบง่ายและลำดับขั้นสายตาที่อ่านจากบนลงล่าง',
            mjParams: '--stylize 150'
        }
    },
    {
        id: '3d',
        nameTh: '3D ทันสมัย',
        nameEn: '3D Render',
        category: '3d-tech',
        categoryLabel: '3D & เทคโนโลยี',
        shortDesc: 'มีมิติ แสงเงาละมุน ทันสมัย ดูน่ารัก/สมจริง',
        image: 'images/styles/3d.jpg',
        fallbackGradient: 'linear-gradient(135deg, #dbeafe 0%, #3b82f6 55%, #f97316 100%)',
        badge: 'ยอดนิยม',
        palette: [
            { hex: '#E0F2FE', name: 'Soft Sky' },
            { hex: '#2563EB', name: 'Royal Blue' },
            { hex: '#FB7185', name: 'Vibrant Coral' },
            { hex: '#FACC15', name: 'Warm Amber' }
        ],
        detailSummary: 'งานกราฟิกสามมิติสไตล์ Octane / Blender Render ที่ผสานความมนโค้งเป็นมิตรเข้ากับแสงเงาระดับสตูดิโอ ช่วยเปลี่ยนเรื่องวิชาการหรือข้อมูล HR ที่ดูแห้งให้กลายเป็นภาพที่ดึงดูดสายตาและมีชีวิตชีวาบนโซเชียลมีเดีย',
        details: {
            mood: 'สดใส ทันสมัย กระตือรือร้น และเข้าถึงง่าย เหมาะกับการสร้างการมีส่วนร่วมบนฟีดออนไลน์',
            lightingAndTexture: 'พื้นผิวซาตินกึ่งมันวาวและพลาสติกนุ่ม (Soft subsurface scattering) พร้อม Rim Light และ Softbox รอบวัตถุ',
            layoutAndTypography: 'จัดวางไอคอนหรือโมเดล 3D ลอยตัวแบบมีระยะชัดลึก คู่กับฟอนต์หัวมนหรือเรขาคณิตหนาที่เข้ากับความนุ่มของโมเดล',
            colorStrategy: 'พื้นหลังไล่เฉดพาสเทลสว่างตัดกับวัตถุสีสดอิ่มตัว เช่น น้ำเงินโคบอลต์ คอรัล และเหลืองอำพัน'
        },
        bestFor: [
            'โปสเตอร์แคมเปญ Onboarding / กิจกรรมพนักงาน',
            'Infographic สรุปสถิติและ KPI ประจำปี',
            'สื่อประชาสัมพันธ์อบรม/เวิร์กช็อปดิจิทัล',
            'โพสต์โซเชียลมีเดียสำหรับคนรุ่นใหม่'
        ],
        promptSpec: {
            enKeywords: 'modern 3D render illustration, Cinema4D and Octane render aesthetic, smooth rounded 3D icons, soft studio rim lighting, subtle subsurface scattering, glossy matte contrast, shallow depth of field, vibrant clean pastel backdrop, 8k resolution',
            thArtDirection: 'สไตล์ 3D Render ร่วมสมัย คล้ายงาน Cinema4D / Pixar-inspired เน้นวัตถุและไอคอนสามมิติรูปทรงมนสะอาดตา ลอยตัวมีมิติหน้า-หลังชัดเจน',
            thColorAndLight: 'พื้นหลังไล่เฉดสีฟ้าอ่อนสว่าง ตัดกับโมเดลสีน้ำเงินสด คอรัล และเหลืองอุ่น ใช้แสงสตูดิโอนุ่มนวล (Softbox) พร้อมขอบแสง Rim Light สร้างความเงางามกำลังดี',
            thCompositionPoster: 'จัดกลุ่มวัตถุ 3D หลักเป็นจุดรวมสายตาที่กึ่งกลางหรือด้านล่าง พร้อมเว้นพื้นที่โล่งด้านบนหรือด้านข้างสำหรับพาดหัวตัวหนา',
            thCompositionInfographic: 'ใช้ไอคอน 3D แทนหมวดหมู่ข้อมูลหรือกราฟแท่งสามมิติที่อ่านค่าได้ทันที แบ่งโซนด้วยการ์ดพื้นหลังอ่อนและเงาตกกระทบที่นุ่มนวล',
            mjParams: '--stylize 250'
        }
    },
    {
        id: 'corporate',
        nameTh: 'องค์กร',
        nameEn: 'Corporate',
        category: 'corporate',
        categoryLabel: 'ทางการ & องค์กร',
        shortDesc: 'ทางการ น่าเชื่อถือ เป็นมืออาชีพ คุมโทน',
        image: 'images/styles/corporate.jpg',
        fallbackGradient: 'linear-gradient(135deg, #f8fafc 0%, #1e3a8a 60%, #0d9488 100%)',
        badge: 'ยอดนิยม',
        palette: [
            { hex: '#1E3A8A', name: 'Executive Navy' },
            { hex: '#0D9488', name: 'Modern Teal' },
            { hex: '#94A3B8', name: 'Brushed Silver' },
            { hex: '#F8FAFC', name: 'Clean Slate' }
        ],
        detailSummary: 'ภาษาภาพระดับองค์กรและสถาบันการศึกษาที่เน้นความภูมิฐาน เที่ยงตรง และมีโครงสร้างชัดเจน ผสานริบบิ้นแก้วโปร่งแสง เส้นกราฟข้อมูล และแสงสะอาดตา เพื่อสร้างความไว้วางใจในการสื่อสารทางการ',
        details: {
            mood: 'น่าเชื่อถือ มีวิสัยทัศน์ เป็นทางการ และเปี่ยมด้วยความเป็นมืออาชีพในระดับผู้บริหาร',
            lightingAndTexture: 'พื้นผิวกระจกสถาปัตยกรรมและโลหะเงินขัดเงา พร้อมแสงสว่างสม่ำเสมอแบบห้องประชุมสมัยใหม่',
            layoutAndTypography: 'โครงสร้างสมดุล วางแนวชัดเจน (Structured Alignment) ใช้ฟอนต์ที่เป็นทางการ อ่านง่าย และมีลำดับหัวข้อชัดเจน',
            colorStrategy: 'โทนสีกรมท่า (Navy) จับคู่สีเขียวอมฟ้า (Teal) และสีเงินบนพื้นหลังขาวสะอาด เพื่อสื่อถึงความมั่นคงและก้าวหน้า'
        },
        bestFor: [
            'โปสเตอร์ประชุมวิชาการ / สัมมนาผู้บริหาร',
            'ประกาศทางการจากหน่วยงานและมหาวิทยาลัย',
            'Infographic รายงานผลประกอบการและแผนยุทธศาสตร์',
            'คู่มือปฐมนิเทศบุคลากรใหม่'
        ],
        promptSpec: {
            enKeywords: 'executive corporate graphic design, sleek translucent navy and teal architectural ribbons, subtle glowing data curves, brushed silver accents, clean bright studio gradient, structured visual hierarchy, authoritative professional aesthetic',
            thArtDirection: 'สไตล์องค์กรมืออาชีพ (Corporate & Institutional) เน้นโครงสร้างที่เป็นระเบียบ มีริบบิ้นกราฟิกโปร่งแสงและเส้นสายสถาปัตยกรรมที่ดูมั่นคงทันสมัย',
            thColorAndLight: 'โทนสีกรมท่า (Navy Blue) สีเขียวน้ำทะเล (Teal) และสีเงินเมทัลลิก บนพื้นหลังสว่างสะอาดตา แสงสว่างคมชัดสม่ำเสมอ',
            thCompositionPoster: 'วางโครงสร้างแบบมีแกนนำสายตาชัดเจน เหลือพื้นที่ด้านบนสำหรับตราหน่วยงานและชื่อโครงการ และพื้นที่ด้านล่างสำหรับกำหนดการ',
            thCompositionInfographic: 'จัดกลุ่มข้อมูลเป็นคอลัมน์หรือการ์ดสมมาตร ใช้เส้นแบ่งสัดส่วนละเอียดและตัวเลขหัวข้อที่เด่นชัดเพื่อความน่าเชื่อถือ',
            mjParams: '--stylize 150'
        }
    },
    {
        id: 'vector',
        nameTh: 'กราฟิกเวกเตอร์',
        nameEn: 'Vector Flat',
        category: 'illustration',
        categoryLabel: 'กราฟิก & วาดประกอบ',
        shortDesc: 'ลายเส้นคมชัด 2D Flat Design สีสันสดใส',
        image: 'images/styles/vector.jpg',
        fallbackGradient: 'linear-gradient(135deg, #fef3c7 0%, #2563eb 55%, #ef4444 100%)',
        badge: 'ยอดนิยม',
        palette: [
            { hex: '#1D4ED8', name: 'Cobalt Blue' },
            { hex: '#F59E0B', name: 'Mustard Gold' },
            { hex: '#EF4444', name: 'Coral Red' },
            { hex: '#FFFBEB', name: 'Warm Cream' }
        ],
        detailSummary: 'ภาพประกอบ 2 มิติแบบเวกเตอร์แบน (Modern Editorial Flat Vector) ที่เล่าเรื่องผ่านตัวละครสัดส่วนร่วมสมัยและรูปทรงสีสดคมชัด ช่วยอธิบายกระบวนการทำงานที่ซับซ้อนให้เข้าใจง่ายภายในเสี้ยววินาที',
        details: {
            mood: 'กระฉับกระเฉง เป็นมิตร สร้างสรรค์ และสื่อสารเรื่องยากให้กลายเป็นเรื่องสนุกได้ง่าย',
            lightingAndTexture: 'สีทึบแบนเรียบคม (Crisp Flat Color Blocking) ไร้การไล่เฉดรกตา อาจมีเกรนเบาๆ เพื่อเพิ่มมิติแบบงานอาร์ตยุคใหม่',
            layoutAndTypography: 'แบ่งโซนภาพประกอบกับข้อความอย่างเด็ดขาด ใช้ฟอนต์ Sans-serif ทรงเรขาคณิตขนาดอ่านชัดบนพื้นหลังสีอ่อน',
            colorStrategy: 'จับคู่สีตัดกันอย่างมีชีวิตชีวา เช่น น้ำเงินโคบอลต์ เหลืองมัสตาร์ด และแดงคอรัล บนพื้นครีมอุ่น'
        },
        bestFor: [
            'Infographic อธิบายขั้นตอนการทำงาน (Workflow / How-to)',
            'โปสเตอร์กิจกรรมสร้างทีมและวัฒนธรรมองค์กร',
            'สื่อรณรงค์ภายในองค์กรและงาน HR',
            'สื่อการสอนและคู่มือพนักงาน'
        ],
        promptSpec: {
            enKeywords: 'modern 2D flat vector illustration, Dribbble editorial character art style, crisp clean vector shapes, bold flat color blocking in cobalt blue mustard yellow coral red and warm cream, friendly storytelling scene, high legibility',
            thArtDirection: 'สไตล์ภาพประกอบเวกเตอร์ 2 มิติ (Modern 2D Flat Vector) ลายเส้นคมกริบไร้ขอบเบลอ ตัวละครและวัตถุออกแบบทรงร่วมสมัย เล่าเรื่องได้อย่างชัดเจน',
            thColorAndLight: 'ใช้คู่สีทึบที่สดใสตัดกันลงตัว ได้แก่ น้ำเงินโคบอลต์ เหลืองมัสตาร์ด แดงคอรัล บนพื้นหลังสีครีมอุ่น ไม่มีแสงเงาซับซ้อนเกินจำเป็น',
            thCompositionPoster: 'จัดภาพประกอบฉากการทำงานหรือกิจกรรมไว้ครึ่งหนึ่งของเฟรม และเปิดพื้นที่เรียบสีครีมอีกด้านสำหรับวางข้อความสำคัญและปุ่ม Call-to-Action',
            thCompositionInfographic: 'เชื่อมต่อแต่ละขั้นตอนด้วยเส้นนำสายตาลูกศรและไอคอนเวกเตอร์สไตล์เดียวกัน ทำให้ลำดับ 1-2-3 ชัดเจนและอ่านลื่นไหล',
            mjParams: '--stylize 200'
        }
    },
    {
        id: 'pastel',
        nameTh: 'สีน้ำ / พาสเทล',
        nameEn: 'Watercolor & Pastel',
        category: 'illustration',
        categoryLabel: 'กราฟิก & วาดประกอบ',
        shortDesc: 'โทนสีนุ่มนวล ละมุนตา อบอุ่น เป็นกันเอง',
        image: 'images/styles/pastel.jpg',
        fallbackGradient: 'linear-gradient(135deg, #fce7f3 0%, #d8b4fe 50%, #bbf7d0 100%)',
        badge: '',
        palette: [
            { hex: '#F9A8D4', name: 'Blush Pink' },
            { hex: '#A7C4A0', name: 'Soft Sage' },
            { hex: '#C4B5FD', name: 'Lavender Mist' },
            { hex: '#FFF8F0', name: 'Cream Paper' }
        ],
        detailSummary: 'งานวาดสีน้ำและสีพาสเทลบนกระดาษเนื้อหยาบที่ให้รอยแปรงซึมซับอย่างเป็นธรรมชาติ มอบความรู้สึกอ่อนโยน ปลอบประโลม และเปี่ยมด้วยความเป็นมิตร เหมาะกับหัวข้อที่ต้องการเข้าถึงใจผู้คน',
        details: {
            mood: 'อบอุ่น ผ่อนคลาย ละมุนละไม และสร้างพื้นที่ปลอดภัยทางอารมณ์ให้กับผู้ชม',
            lightingAndTexture: 'สัมผัสกระดาษสีน้ำ (Cold-press watercolor grain) รอยสีโปร่งแสงซ้อนทับกันอย่างนุ่มนวล ขอบสีฟุ้งเป็นธรรมชาติ',
            layoutAndTypography: 'จัดกรอบภาพประกอบพฤกษศาสตร์หรือคลื่นสีอ่อนไว้รอบขอบ ให้พื้นที่กลางภาพสว่างสำหรับข้อความฟอนต์ลายมือหรือฟอนต์โปร่ง',
            colorStrategy: 'โทนสีพาสเทลอ่อนละมุน เช่น ชมพูบลัช เขียวเซจ ลาเวนเดอร์ และครีมอบอุ่น ที่กลมกลืนกันโดยไม่บาดตา'
        },
        bestFor: [
            'โปสเตอร์กิจกรรมสุขภาพจิต / Well-being พนักงาน',
            'สื่อรณรงค์ดูแลใจ วันสำคัญ และงานอาสา',
            'Infographic เคล็ดลับการใช้ชีวิตและการทำงานอย่างมีความสุข',
            'การ์ดอวยพรหรือสื่อขอบคุณบุคลากร'
        ],
        promptSpec: {
            enKeywords: 'delicate hand-painted watercolor and pastel gouache illustration, cold-press textured watercolor paper grain, soft botanical elements, gentle organic pigment washes in blush pink sage green lavender and cream, airy warm lighting',
            thArtDirection: 'สไตล์สีน้ำวาดมือและสีพาสเทล (Watercolor & Pastel Gouache) มีรอยพู่กันโปร่งแสงและองค์ประกอบธรรมชาติที่อ่อนโยน ดูจริงใจและเข้าถึงง่าย',
            thColorAndLight: 'โทนสีละมุนตา ชมพูบลัช เขียวเซจ ม่วงลาเวนเดอร์ และครีม บนพื้นผิวกระดาษสีน้ำเนื้อละเอียด แสงฟุ้งนุ่มนวลอบอุ่น',
            thCompositionPoster: 'จัดวางลวดลายสีน้ำและใบไม้ประดับไว้ตามขอบหรือมุมทแยง เพื่อโอบล้อมพื้นที่ตรงกลางที่สว่างสะอาดสำหรับใส่ข้อความ',
            thCompositionInfographic: 'ใช้แถบสีน้ำระบายอ่อนๆ เป็นฉากหลังแบ่งหัวข้อย่อยแต่ละส่วน ช่วยลดความแข็งกระด้างของข้อมูลให้ดูอ่านสบายตา',
            mjParams: '--stylize 300'
        }
    },
    {
        id: 'scifi',
        nameTh: 'เทคโนโลยี / ไซไฟ',
        nameEn: 'Sci-Fi & Cyber',
        category: '3d-tech',
        categoryLabel: '3D & เทคโนโลยี',
        shortDesc: 'ล้ำยุค โทนแสงนีออน ไซเบอร์ โฮโลแกรม',
        image: 'images/styles/scifi.jpg',
        fallbackGradient: 'linear-gradient(135deg, #090d24 0%, #06b6d4 55%, #d946ef 100%)',
        badge: '',
        palette: [
            { hex: '#0B1026', name: 'Midnight Indigo' },
            { hex: '#06B6D4', name: 'Electric Cyan' },
            { hex: '#E879F9', name: 'Neon Magenta' },
            { hex: '#3B82F6', name: 'Cyber Blue' }
        ],
        detailSummary: 'สุนทรียภาพโลกอนาคตที่ผสานอินเทอร์เฟซโฮโลแกรม เส้นสายวงจรข้อมูล และแสงนีออนเข้มข้นบนฉากหลังโทนมืด ช่วยปลุกพลังความตื่นเต้นและตอกย้ำภาพลักษณ์ความเป็นผู้นำด้านนวัตกรรมและ AI',
        details: {
            mood: 'ล้ำสมัย ทรงพลัง ตื่นเต้น และเต็มไปด้วยพลังงานแห่งเทคโนโลยีแห่งอนาคต',
            lightingAndTexture: 'ฉากหลังโทนมืดลุ่มลึกตัดกับแสงฟุ้งแบบ Volumetric Neon Glow, เส้นตารางดิจิทัล และเอฟเฟกต์โฮโลแกรมโปร่งแสง',
            layoutAndTypography: 'ใช้กรอบ HUD เชิงมุมและเส้นนำแสงดิจิทัล คู่กับฟอนต์เทคโนโลยีทรงกว้างหรือ Sans-serif สีขาว/ฟ้าเรืองแสงเพื่อความคมชัด',
            colorStrategy: 'พื้นสีน้ำเงินเข้มเกือบดำ (Midnight Indigo) ขับเน้นด้วยแสงไซอัน (Cyan) และมาเจนตา (Magenta) ความเปรียบต่างสูง'
        },
        bestFor: [
            'โปสเตอร์งาน Hackathon / AI & Tech Summit',
            'แคมเปญอบรมทักษะดิจิทัลและ AI Literacy',
            'Infographic เทคโนโลยีสารสนเทศและความปลอดภัยไซเบอร์',
            'ประชาสัมพันธ์นวัตกรรมใหม่ขององค์กร'
        ],
        promptSpec: {
            enKeywords: 'futuristic sci-fi digital graphic art, glowing holographic HUD rings, luminous neon data streams, sleek cybernetic grid over dark midnight indigo background, electric cyan and magenta rim light, atmospheric volumetric glow, high contrast',
            thArtDirection: 'สไตล์เทคโนโลยีล้ำยุค/ไซไฟ (Sci-Fi & Cyberpunk) ใช้เส้นสายดิจิทัล วงแหวนโฮโลแกรม และแสงข้อมูลเรืองแสงเพื่อสื่อถึงโลกอนาคตและนวัตกรรม',
            thColorAndLight: 'พื้นหลังสีน้ำเงินเข้มเกือบดำตัดกับแสงนีออนสีฟ้าไซอันและสีชมพูมาเจนตา มีมิติแสงฟุ้ง (Volumetric Glow) และขอบแสงคมชัด',
            thCompositionPoster: 'จัดวัตถุหรือวงแหวนโฮโลแกรมเป็นจุดโฟกัสเรืองแสง พร้อมกรอบพื้นที่มืดสนิทด้านบน/ล่างเพื่อให้ตัวหนังสือสีขาวเรืองแสงอ่านง่ายชัดเจน',
            thCompositionInfographic: 'เชื่อมโยงข้อมูลด้วยเส้นวงจรเรืองแสงและกรอบหน้าต่าง HUD แบบดิจิทัล แบ่งบล็อกข้อมูลชัดเจนบนพื้นหลังโทนเข้มที่ไม่แย่งสายตา',
            mjParams: '--stylize 350'
        }
    },
    {
        id: 'realistic',
        nameTh: 'ภาพถ่ายสมจริง',
        nameEn: 'Realistic Photo',
        category: 'photo-culture',
        categoryLabel: 'ภาพถ่าย & อัตลักษณ์',
        shortDesc: 'สมจริง คมชัดเหมือนถ่ายภาพด้วยกล้องโปร',
        image: 'images/styles/realistic.jpg',
        fallbackGradient: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #d97706 100%)',
        badge: '',
        palette: [
            { hex: '#F1F5F9', name: 'Daylight White' },
            { hex: '#D97706', name: 'Golden Sunlight' },
            { hex: '#4D7C0F', name: 'Natural Olive' },
            { hex: '#334155', name: 'Slate Shadow' }
        ],
        detailSummary: 'ภาพถ่ายเชิงพาณิชย์ระดับบรรณาธิการ (Editorial Commercial Photography) ที่เก็บรายละเอียดแสงธรรมชาติ ระยะชัดตื้น (Bokeh) และพื้นผิวจริงได้อย่างสมจริง ให้ความรู้สึกจริงใจและน่าเชื่อถือในชีวิตจริง',
        details: {
            mood: 'จริงใจ อบอุ่น เข้าถึงได้จริง และมีมาตรฐานงานโฆษณาระดับมืออาชีพ',
            lightingAndTexture: 'แสงแดดอุ่นช่วง Golden Hour หรือแสงธรรมชาติผ่านหน้าต่างกว้าง พื้นผิวจริงคมชัด 8K พร้อมละลายฉากหลังอย่างนุ่มนวล',
            layoutAndTypography: 'ใช้มุมมองภาพที่มีพื้นที่เบลอเรียบ (Clean Bokeh Area) หรือไล่เงามืดบางๆ สำหรับวางข้อความพาดหัวให้กลมกลืน',
            colorStrategy: 'สีสันสมจริงตามธรรมชาติ (True-to-life Color Grading) เน้นโทนแสงอุ่นสมดุลกับสีสภาพแวดล้อมจริงของออฟฟิศหรือแคมปัส'
        },
        bestFor: [
            'โปสเตอร์รับสมัครงานและ Employer Branding',
            'ประชาสัมพันธ์บรรยากาศการทำงานและสถานที่จริง',
            'ข่าวประชาสัมพันธ์ความสำเร็จของบุคลากร/นิสิต',
            'แบนเนอร์เว็บไซต์และสื่อสิ่งพิมพ์องค์กร'
        ],
        promptSpec: {
            enKeywords: 'high-end commercial editorial photography, sunlit modern workspace or lifestyle scene, natural golden hour lighting, crisp focus with creamy shallow depth of field bokeh, authentic textures, shot on full-frame DSLR 50mm f/1.8, 8k photorealistic',
            thArtDirection: 'สไตล์ภาพถ่ายสมจริงระดับโฆษณา (Editorial Commercial Photography) ถ่ายทอดบรรยากาศสถานที่จริงและแสงธรรมชาติที่ดูอบอุ่นน่าอยู่',
            thColorAndLight: 'โทนสีสมจริงตามธรรมชาติ (Natural Color Grading) มีแสงอาทิตย์อุ่นส่องเฉียงและระยะชัดตื้นละลายฉากหลัง (Shallow Depth of Field)',
            thCompositionPoster: 'จัดวัตถุหรือผู้คนอยู่ด้านข้างตามกฎสามส่วน แล้วเปิดพื้นที่ฉากหลังที่เบลอนุ่มนวลไว้สำหรับวางพาดหัวข่าวและข้อมูลประชาสัมพันธ์',
            thCompositionInfographic: 'ใช้ภาพถ่ายจริงเป็นพื้นหลังหรือกรอบไฮไลต์หลัก แล้ววางการ์ดสรุปข้อมูลกึ่งทึบแสงทับในบริเวณที่ภาพสงบเพื่อให้ตัวอักษรคมชัด',
            mjParams: '--style raw --stylize 100'
        }
    },
    {
        id: 'anime',
        nameTh: 'อนิเมะ',
        nameEn: 'Anime Illustration',
        category: 'illustration',
        categoryLabel: 'กราฟิก & วาดประกอบ',
        shortDesc: 'ลายเส้นการ์ตูนญี่ปุ่น สดใส มีชีวิตชีวา',
        image: 'images/styles/anime.jpg',
        fallbackGradient: 'linear-gradient(135deg, #38bdf8 0%, #60a5fa 50%, #fbcfe8 100%)',
        badge: '',
        palette: [
            { hex: '#0284C7', name: 'Azure Sky' },
            { hex: '#F9A8D4', name: 'Sakura Pink' },
            { hex: '#FEF9C3', name: 'Sunbeam Cream' },
            { hex: '#1E293B', name: 'Anime Line' }
        ],
        detailSummary: 'ภาพประกอบสไตล์อนิเมชั่นญี่ปุ่นร่วมสมัยที่โดดเด่นด้วยท้องฟ้าสดใส ก้อนเมฆส่องแสง แสงแฟลร์ชวนฝัน และลายเส้นคมชัด ช่วยสร้างความประทับใจและดึงดูดกลุ่มคนรุ่นใหม่ นิสิต นักศึกษาได้อย่างรวดเร็ว',
        details: {
            mood: 'สดใส เปี่ยมความหวัง ชวนฝัน และกระตุ้นความสนใจจากกลุ่มเป้าหมาย Gen Z / วัยเรียน',
            lightingAndTexture: 'การลงสีแบบ Cel-shading ผสานพื้นหลังวาดละเอียด (Scenery Anime Art) พร้อมแสงแดดส่องผ่านและ Lens Flare',
            layoutAndTypography: 'เปิดพื้นที่ท้องฟ้าด้านบนให้โล่งสำหรับพาดหัว หรือจัดเฟรมภาพยนตร์จอกว้างคู่กับฟอนต์สมัยใหม่ที่อ่านสนุก',
            colorStrategy: 'สีฟ้าใสของท้องฟ้าตัดกับสีชมพูซากุระและแสงแดดสีทองอุ่น ให้ภาพดูสว่างไสวและเปี่ยมพลังบวก'
        },
        bestFor: [
            'โปสเตอร์รับสมัครนิสิต/นักศึกษา Open House',
            'กิจกรรมชมรม งานเทศกาล และแคมเปญวัยรุ่น',
            'สื่อประชาสัมพันธ์แนว Storytelling สร้างแรงบันดาลใจ',
            'Infographic รูปแบบการ์ตูนเล่าเรื่องสนุกๆ'
        ],
        promptSpec: {
            enKeywords: 'vibrant modern Japanese anime key-visual illustration, Makoto Shinkai inspired sky and sunlight, crisp cel-shaded linework, drifting blossoms and luminous lens flare, rich atmospheric perspective, uplifting emotional mood',
            thArtDirection: 'สไตล์ภาพประกอบอนิเมะญี่ปุ่นร่วมสมัย (Modern Anime Key-Visual) ลายเส้นคมชัด ลงสีสดใสมีแสงเงาแบบแอนิเมชั่นคุณภาพสูง',
            thColorAndLight: 'ท้องฟ้าสีฟ้าครามสดใสและเมฆรับแสงอาทิตย์ ตัดกับโทนชมพูอบอุ่นและแสงแดดส่องฟุ้ง (Luminous Sunlight & Lens Flare)',
            thCompositionPoster: 'จัดทิวทัศน์หรือฉากตัวละครในมุมมองกว้างชวนติดตาม และเปิดพื้นที่ท้องฟ้าโปร่งด้านบนไว้สำหรับวางชื่อกิจกรรมขนาดใหญ่',
            thCompositionInfographic: 'แบ่งช่องเรื่องราวคล้ายเฟรมแอนิเมชั่นหรือจัดกรอบข้อความสีขาวขอบคมเหนือฉากอนิเมะสีอ่อนเพื่อรักษาความคมชัดของการอ่าน',
            mjParams: '--niji 6 --stylize 250'
        }
    },
    {
        id: 'vintage',
        nameTh: 'วินเทจ / เรโทร',
        nameEn: 'Vintage & Retro',
        category: 'photo-culture',
        categoryLabel: 'ภาพถ่าย & อัตลักษณ์',
        shortDesc: 'คลาสสิก ย้อนยุค โทนสีอบอุ่น มีเท็กซ์เจอร์',
        image: 'images/styles/vintage.jpg',
        fallbackGradient: 'linear-gradient(135deg, #fde68a 0%, #ea580c 55%, #115e59 100%)',
        badge: '',
        palette: [
            { hex: '#EA580C', name: 'Burnt Orange' },
            { hex: '#D97706', name: 'Mustard Ochre' },
            { hex: '#115E59', name: 'Faded Teal' },
            { hex: '#F5EBDC', name: 'Aged Cream' }
        ],
        detailSummary: 'กลิ่นอายโปสเตอร์ยุค 1960s–70s และงานพิมพ์ซิลค์สกรีนคลาสสิก โดดเด่นด้วยรูปทรงเรขาคณิตรัศมีแสงอาทิตย์ สีเอิร์ธโทนอุ่น และเนื้อกระดาษเก่ามีเสน่ห์ สร้างความโดดเด่นและเอกลักษณ์ที่แตกต่างทันที',
        details: {
            mood: 'คลาสสิก น่าค้นหา มีเรื่องราว และให้ความรู้สึกอบอุ่นชวนหวนคิดถึง (Nostalgic Charm)',
            lightingAndTexture: 'เท็กซ์เจอร์กระดาษเก่า ลายเม็ดสกรีน Halftone และขอบพิมพ์แบบ Screen-print ยุค Mid-century',
            layoutAndTypography: 'จัดกรอบโปสเตอร์มีขอบชัดเจน (Framed Poster) ใช้ฟอนต์ย้อนยุคหัวมนหนาหรือ Serif คลาสสิกแบบสมมาตร',
            colorStrategy: 'ชุดสีเรโทรอบอุ่น เช่น ส้มอิฐ เหลืองมัสตาร์ด เขียวหม่น และพื้นครีมกระดาษเก่า (Aged Cream)'
        },
        bestFor: [
            'โปสเตอร์งานเทศกาล ตลาดนัด หรือกิจกรรมย้อนยุค',
            'งานครบรอบสถาปนาองค์กรและนิทรรศการประวัติศาสตร์',
            'แคมเปญอนุรักษ์สิ่งแวดล้อม / ท่องเที่ยวเชิงวัฒนธรรม',
            'Infographic เล่าไทม์ไลน์เหตุการณ์สำคัญ'
        ],
        promptSpec: {
            enKeywords: 'mid-century 1960s-70s retro travel poster illustration, bold radiating sunbeams and layered geometric shapes, burnt orange mustard ochre faded teal and aged cream palette, distressed screen-print halftone and vintage paper grain',
            thArtDirection: 'สไตล์วินเทจ/เรโทรยุค 60s–70s (Mid-Century Retro Poster) เน้นรูปทรงกราฟิกที่ชัดเจน กรอบโปสเตอร์คลาสสิก และกลิ่นอายงานพิมพ์ย้อนยุค',
            thColorAndLight: 'ชุดสีอบอุ่นคลาสสิก ส้มอิฐ เหลืองมัสตาร์ด เขียวอมฟ้าหม่น บนพื้นหลังสีครีมกระดาษเก่า พร้อมเท็กซ์เจอร์เม็ดสกรีนและเนื้อกระดาษพิมพ์',
            thCompositionPoster: 'จัดกรอบภาพแบบสมมาตรมีเส้นขอบล้อมรอบ วางภาพเด่นไว้ตรงกลางและกันแถบสีครีมด้านบน-ล่างไว้สำหรับพาดหัวสไตล์คลาสสิก',
            thCompositionInfographic: 'แบ่งส่วนข้อมูลเป็นแถบแนวนอนหรือไทม์ไลน์แบบโปสเตอร์สิ่งพิมพ์ ใช้ป้ายแบนเนอร์ริบบิ้นและตัวเลขหนาที่อ่านชัด',
            mjParams: '--stylize 250'
        }
    },
    {
        id: 'isometric',
        nameTh: 'ไอโซเมตริก 3D',
        nameEn: 'Isometric 3D',
        category: '3d-tech',
        categoryLabel: '3D & เทคโนโลยี',
        shortDesc: 'ภาพจำลองมุมเฉียง 30 องศา เห็นภาพรวมเป็นระบบ',
        image: 'images/styles/isometric.jpg',
        fallbackGradient: 'linear-gradient(135deg, #e0f2fe 0%, #38bdf8 55%, #4f46e5 100%)',
        badge: 'ใหม่',
        palette: [
            { hex: '#E0F2FE', name: 'Ice Backdrop' },
            { hex: '#2563EB', name: 'Tech Blue' },
            { hex: '#10B981', name: 'Plant Emerald' },
            { hex: '#F59E0B', name: 'Accent Amber' }
        ],
        detailSummary: 'ภาพไดโอรามาสามมิติในมุมมองเฉียง 30 องศา (Isometric Projection) ที่เปิดให้เห็นโครงสร้างอาคาร ห้องทำงาน หรือระบบการทำงานทั้งหมดในภาพเดียว ช่วยเปลี่ยนข้อมูลเชิงระบบและขั้นตอน HR ให้เข้าใจได้ง่ายเป็นรูปธรรม',
        details: {
            mood: 'เป็นระบบ ฉลาด ชัดเจน และสนุกกับการสำรวจรายละเอียดในฉากจำลองขนาดย่อม',
            lightingAndTexture: 'โมเดล 3D เรียบคมแสงสว่างสม่ำเสมอ เงาตกกระทบชัดเจนตามแกนมุมมอง 30 องศา ไม่มีPerspective บิดเบี้ยว',
            layoutAndTypography: 'วางฉากจำลองลอยบนพื้นหลังสะอาดเพื่อให้โยงเส้น Callout ชี้จุดข้อมูลแต่ละโซนได้อย่างเป็นระเบียบ',
            colorStrategy: 'พื้นหลังสีฟ้าอ่อนหรือเทาสว่าง ช่วยขับตัวฉากจำลองสีน้ำเงิน เขียว และส้มให้คมชัดทุกองค์ประกอบ'
        },
        bestFor: [
            'Infographic อธิบายโครงสร้างองค์กร / ผังอาคาร / ระบบงาน',
            'แผนผังเส้นทางพนักงาน (Employee Journey) และสวัสดิการ',
            'โปสเตอร์แนะนำศูนย์นวัตกรรมและห้องสมุดอัจฉริยะ',
            'คู่มืออธิบาย Workflow หลายแผนก'
        ],
        promptSpec: {
            enKeywords: 'clean 3D isometric diorama illustration, miniature modern smart office and innovation hub cutaway, crisp 30-degree isometric projection, soft studio lighting, neat architectural details, clean pale blue backdrop, infographic-ready layout',
            thArtDirection: 'สไตล์ไอโซเมตริก 3 มิติ (Isometric 3D Diorama) มุมมองเฉียง 30 องศาเห็นภาพรวมทั้งระบบหรือผังจำลองขนาดย่อมอย่างคมชัด',
            thColorAndLight: 'พื้นหลังสีฟ้าอ่อนเรียบสะอาด ช่วยขับโมเดลอาคารและอุปกรณ์สีน้ำเงิน เขียว และส้มอุ่น แสงสตูดิโอสว่างทั่วถึงเงาตกกระทบคมกำลังดี',
            thCompositionPoster: 'วางไดโอรามาหลักไว้บริเวณกลางค่อนล่างในมุมเอียงสวยเด่น เหลือพื้นที่ด้านบนโล่งสำหรับใส่ชื่อโครงการและรายละเอียด',
            thCompositionInfographic: 'เหมาะมากสำหรับโยงเส้น Callout ชี้แต่ละโซนในฉากจำลอง (เช่น จุดรับบริการ 1-2-3) พร้อมกล่องข้อความเรียบร้อยรอบข้าง',
            mjParams: '--stylize 200'
        }
    },
    {
        id: 'clay',
        nameTh: 'ดินปั้น 3D',
        nameEn: 'Claymorphism',
        category: '3d-tech',
        categoryLabel: '3D & เทคโนโลยี',
        shortDesc: 'นุ่มนวล น่ารักเหมือนปั้นจากดินน้ำมัน',
        image: 'images/styles/clay.jpg',
        fallbackGradient: 'linear-gradient(135deg, #fed7aa 0%, #fbcfe8 55%, #a7f3d0 100%)',
        badge: 'ใหม่',
        palette: [
            { hex: '#FED7AA', name: 'Soft Peach' },
            { hex: '#F9A8D4', name: 'Candy Rose' },
            { hex: '#A7F3D0', name: 'Mint Clay' },
            { hex: '#FDE047', name: 'Butter Yellow' }
        ],
        detailSummary: 'สไตล์ 3 มิติเนื้อด้านอ้วนกลมราวกับปั้นด้วยดินน้ำมันหรือดินโพลิเมอร์ มอบสัมผัสที่เป็นมิตร อบอุ่น และชวนยิ้ม ช่วยลดความตึงเครียดของประกาศองค์กรและดึงดูดใจผู้อ่านทุกช่วงวัย',
        details: {
            mood: 'น่ารัก สนุกสนาน อบอุ่นใจ และสร้างความรู้สึกเป็นกันเองสูงสุด',
            lightingAndTexture: 'เนื้อดินปั้นด้านละมุน (Matte tactile clay surface) ขอบโค้งมนอวบอิ่มทุกส่วน พร้อมเงา Soft ambient occlusion นุ่มลึก',
            layoutAndTypography: 'จัดไอคอนหรือตัวละครดินปั้นกระจายตัวสมดุล คู่กับฟอนต์หัวมนกลม (Rounded Sans-serif) ที่ดูนุ่มเข้าชุดกัน',
            colorStrategy: 'พาสเทลสดใสโทนพีช มิ้นต์ ชมพู และเหลืองเนย ให้ความรู้สึกสดชื่นและไม่ฉูดฉาด'
        },
        bestFor: [
            'โปสเตอร์กิจกรรมสันทนาการ งานครอบครัว และ Well-being',
            'สื่อรับสมัครนักศึกษาใหม่และแคมเปญสร้างสรรค์',
            'Infographic แนะนำสิทธิประโยชน์พนักงานแบบอ่านสนุก',
            'โพสต์ประกาศวันสำคัญและเทศกาลองค์กร'
        ],
        promptSpec: {
            enKeywords: 'adorable 3D claymorphism illustration, soft matte sculpted modeling-clay icons and objects, chubby rounded edges, tactile clay texture, soft peach and mint pastel backdrop, diffused studio ambient lighting, playful and friendly',
            thArtDirection: 'สไตล์ดินปั้น 3 มิติ (Claymorphism) วัตถุทุกชิ้นอวบอ้วนโค้งมนคล้ายงานปั้นดินน้ำมันหรือดินโพลิเมอร์ ดูน่ารักและอบอุ่นเป็นมิตร',
            thColorAndLight: 'สีพาสเทลละมุนโทนพีช มิ้นต์ ชมพู และเหลืองเนย พื้นผิวเนื้อแมตต์ไม่มันวาว แสงสตูดิโอนุ่มรอบทิศทางและเงาตกกระทบนุ่มลึก',
            thCompositionPoster: 'จัดไอคอนดินปั้นลอยรอบกรอบภาพหรือเรียงเป็นกลุ่มน่ารักด้านล่าง เปิดพื้นที่สีพีชอ่อนโล่งด้านบนสำหรับพาดหัวตัวอ้วนมน',
            thCompositionInfographic: 'ใช้ไอคอนดินปั้น 3D แทนหัวข้อแต่ละรายการและจัดวางในกล่องการ์ดมุมโค้งมน (Rounded Cards) สีขาวนวล',
            mjParams: '--stylize 250'
        }
    },
    {
        id: 'papercut',
        nameTh: 'กระดาษซ้อนชั้น',
        nameEn: 'Paper Cutout',
        category: 'illustration',
        categoryLabel: 'กราฟิก & วาดประกอบ',
        shortDesc: 'ศิลปะตัดกระดาษซ้อนมิติ เงาลึกประณีต',
        image: 'images/styles/papercut.jpg',
        fallbackGradient: 'linear-gradient(135deg, #0f766e 0%, #f97316 55%, #fef3c7 100%)',
        badge: 'ใหม่',
        palette: [
            { hex: '#0F766E', name: 'Deep Teal' },
            { hex: '#FB7185', name: 'Coral Paper' },
            { hex: '#FEF3C7', name: 'Ivory Card' },
            { hex: '#1E293B', name: 'Shadow Navy' }
        ],
        detailSummary: 'งานศิลปะการตัดและซ้อนกระดาษแข็งหลายชั้น (Layered Paper Craft) ที่สร้างมิติความลึกด้วยเงาตกกระทบจริงระหว่างชั้นกระดาษ ให้ความรู้สึกประณีต มีคุณค่า และมีมิติทางกายภาพที่จับต้องได้',
        details: {
            mood: 'ประณีต อบอุ่น มีศิลปะ และสื่อถึงความตั้งใจและการประกอบสร้างทีละขั้นตอน',
            lightingAndTexture: 'เนื้อกระดาษการ์ดด้าน (Matte cardstock) เห็นขอบตัดกระดาษคมชัดและเงาลึกหลายระดับ (Multi-layer drop shadow)',
            layoutAndTypography: 'ใช้ชั้นกระดาษด้านหน้าสุดหรือชั้นสว่างเป็นกรอบรับสายตา วางข้อความในชั้นกระดาษเรียบที่โดดเด่นเหนือชั้นอื่น',
            colorStrategy: 'จับคู่สีลึกและสีอุ่นแบบงานคราฟต์ เช่น เขียวเข้ม คอรัล กรมท่า และกระดาษงาช้าง เพื่อขับเงาระหว่างชั้นให้ชัดเจน'
        },
        bestFor: [
            'โปสเตอร์งานด้านสิ่งแวดล้อม ความยั่งยืน (ESG)',
            'แคมเปญงานศิลปะ วัฒนธรรม และงานอาสาสมัคร',
            'Infographic เล่ากระบวนการเติบโตหรือพัฒนาทีละขั้น',
            'สื่อประชาสัมพันธ์งานมอบรางวัลและวันสำคัญ'
        ],
        promptSpec: {
            enKeywords: 'intricate 3D layered paper cutout craft artwork, sculptural curved cardstock layers in deep teal coral ivory and navy, realistic soft cast shadows between paper layers, tactile matte paper texture, handcrafted depth and warmth',
            thArtDirection: 'สไตล์ศิลปะตัดกระดาษซ้อนชั้น (Layered Paper Cutout Craft) เรียงซ้อนชั้นกระดาษหลายระดับให้เกิดมิติลึกตื้นและรูปทรงโค้งพริ้วประณีต',
            thColorAndLight: 'สีเขียวหัวเป็ดเข้ม คอรัล กรมท่า และกระดาษสีงาช้าง พื้นผิวกระดาษการ์ดด้าน มีแสงส่องเฉียงสร้างเงาตกกระทบจริงระหว่างทุกชั้นกระดาษ',
            thCompositionPoster: 'จัดชั้นกระดาษโค้งล้อมกรอบจากขอบเข้าสู่ตรงกลาง เปิดพื้นที่ชั้นกระดาษสีอ่อนตรงกลางสำหรับวางข้อความพาดหัวให้ดูลอยเด่น',
            thCompositionInfographic: 'ใช้ชั้นกระดาษแต่ละระดับแทนลำดับขั้นหรือหมวดหมู่ข้อมูล ให้ความรู้สึกเหมือนเปิดหน้ากระดาษทีละชั้นอย่างเป็นระเบียบ',
            mjParams: '--stylize 300'
        }
    },
    {
        id: 'editorial',
        nameTh: 'นิตยสารโมเดิร์น',
        nameEn: 'Modern Editorial',
        category: 'corporate',
        categoryLabel: 'ทางการ & องค์กร',
        shortDesc: 'จัดวางแบบนิตยสารแฟชั่น ไทโปกราฟีคมกริบ',
        image: 'images/styles/editorial.jpg',
        fallbackGradient: 'linear-gradient(135deg, #faf7f2 0%, #18181b 55%, #dc2626 100%)',
        badge: 'ใหม่',
        palette: [
            { hex: '#FAF7F2', name: 'Editorial Cream' },
            { hex: '#18181B', name: 'Jet Black' },
            { hex: '#DC2626', name: 'Vermilion Red' },
            { hex: '#D4D4D8', name: 'Marble Stone' }
        ],
        detailSummary: 'งานออกแบบร่วมสมัยระดับหน้านิตยสารและสิ่งพิมพ์ไฮเอนด์ เน้นการจัดสัดส่วนอสมมาตร บล็อกสีตัดกันอย่างเฉียบคม และงานประติมากรรม/ภาพพอร์ตเทรตคู่กับพื้นที่จัดวางตัวอักษรที่มีรสนิยมสูง',
        details: {
            mood: 'เฉียบคม มีรสนิยม ทันสมัยระดับสากล และดึงดูดสายตาผู้ชมสายสร้างสรรค์',
            lightingAndTexture: 'พื้นผิวสะอาดคมชัด แสงสตูดิโอคอนทราสต์สูงเน้นมิติประติมากรรมหรือภาพหลักตัดกับบล็อกสีแบนเรียบ',
            layoutAndTypography: 'จัดหน้าแบบ Asymmetric Grid ผสานฟอนต์ Serif คลาสสิกเข้ากับ Sans-serif ตัวบาง และเส้นคั่นละเอียดแบบหน้าปกนิตยสาร',
            colorStrategy: 'คู่สีอาร์ตแกลเลอรี ขาวครีม ดำสนิท และสีเน้นแดงชาด (Vermilion Red) เพียงจุดเดียวเพื่อสร้างจุดสะดุดตา'
        },
        bestFor: [
            'โปสเตอร์ปาฐกถาพิเศษ งานเสวนาวิชาการ และนิทรรศการ',
            'สื่อประชาสัมพันธ์บทความผู้บริหาร / Spotlight บุคลากร',
            'รับสมัครงานสายครีเอทีฟ การตลาด และกลยุทธ์',
            'Infographic สรุปเทรนด์และอินไซต์ระดับสูง'
        ],
        promptSpec: {
            enKeywords: 'contemporary high-fashion editorial magazine poster design, sculptural minimal art paired with bold asymmetrical color blocks in cream jet black and vermilion red, Swiss typographic grid harmony, dramatic gallery studio lighting',
            thArtDirection: 'สไตล์นิตยสารร่วมสมัย (Modern Editorial) เน้นการจัดหน้าแบบอสมมาตรอันเฉียบคม จับคู่บล็อกสีเรขาคณิตกับวัตถุศิลป์หรือภาพถ่ายคมกริบ',
            thColorAndLight: 'พื้นสีครีมอ่อนตัดกับสีดำสนิทและจุดเน้นสีแดงชาด (Vermilion Red) แสงเงาสตูดิโอคมชัดสไตล์แกลเลอรีศิลปะ',
            thCompositionPoster: 'แบ่งโครงสร้างแบบหน้านิตยสาร มีเส้นแบ่งคอลัมน์ละเอียดและพื้นที่ว่างขนาดใหญ่สำหรับพาดหัวฟอนต์ที่ดูหรูทันสมัย',
            thCompositionInfographic: 'จัดวางบทความสั้นและตัวเลขสถิติขนาดใหญ่ (Big Pull-Quote Numbers) สลับกับบล็อกภาพอย่างมีจังหวะแบบหน้า Editorial Spread',
            mjParams: '--stylize 200'
        }
    },
    {
        id: 'handdrawn',
        nameTh: 'วาดมือสเก็ตช์โน้ต',
        nameEn: 'Hand-drawn & Sketchnote',
        category: 'illustration',
        categoryLabel: 'กราฟิก & วาดประกอบ',
        shortDesc: 'ลายเส้นปากกาดูเดิลบนสมุดโน้ต อ่านสนุก',
        image: 'images/styles/handdrawn.jpg',
        fallbackGradient: 'linear-gradient(135deg, #fffdf5 0%, #fde68a 55%, #99f6e4 100%)',
        badge: 'ใหม่',
        palette: [
            { hex: '#FFFDF5', name: 'Sketch Paper' },
            { hex: '#1E293B', name: 'Fineliner Ink' },
            { hex: '#FDE047', name: 'Yellow Marker' },
            { hex: '#6EE7B7', name: 'Mint Highlighter' }
        ],
        detailSummary: 'สไตล์จดโน้ตเชิงภาพ (Visual Sketchnote) ที่วาดด้วยปากกาหมึกดำตัดเส้นอิสระพร้อมปาดปากกาไฮไลต์สีเหลืองและมิ้นต์บนกระดาษสมุดจุดไข่ปลา ช่วยเปลี่ยนเนื้อหาอบรมหรือกฎระเบียบยาวๆ ให้ดูอ่านเพลินเหมือนเพื่อนช่วยสรุป',
        details: {
            mood: 'เป็นกันเอง ฉลาด คล่องแคล่ว และกระตุ้นการจดจำเหมือนบันทึกไอเดียในเวิร์กช็อป',
            lightingAndTexture: 'พื้นกระดาษสมุดสเก็ตช์ลายจุด (Dot-grid notebook) ลายเส้นหมึกปากกา Fineliner และรอยปาดสี Marker โปร่งใส',
            layoutAndTypography: 'เชื่อมโยงองค์ประกอบด้วยลูกศรวาดมือ กรอบคำพูด และดอกจัน เน้นตัวอักษรแนวลายมืออ่านง่าย',
            colorStrategy: 'สีขาวครีมกระดาษ + เส้นหมึกดำเป็นหลัก เติมสีไฮไลต์เพียง 2 สี (เหลืองและเขียวมิ้นต์) เพื่อขีดเน้นจุดสำคัญ'
        },
        bestFor: [
            'Infographic สรุปเนื้อหาการอบรม (Key Takeaways)',
            'คู่มือ Onboarding พนักงานใหม่และเช็กลิสต์ขั้นตอน',
            'โปสเตอร์เวิร์กช็อป Design Thinking และระดมสมอง',
            'สื่อสรุปความรู้สั้นๆ แชร์ในองค์กร'
        ],
        promptSpec: {
            enKeywords: 'charming hand-drawn sketchnote doodle illustration on warm cream dot-grid notebook paper, expressive black fineliner ink icons arrows and lightbulbs, soft pastel yellow and mint highlighter accents, clean editorial sketchnote aesthetic',
            thArtDirection: 'สไตล์วาดมือสเก็ตช์โน้ต (Hand-drawn Sketchnote) ใช้ลายเส้นปากกาหมึกดำแบบดูเดิลและไอคอนวาดมือบนหน้ากระดาษสมุดจุดไข่ปลา',
            thColorAndLight: 'พื้นหลังสีครีมอุ่นกระดาษสมุดสเก็ตช์ เส้นหมึกสีดำคมชัด แต้มสีไฮไลต์เหลืองอ่อนและเขียวมิ้นต์เพื่อเน้นหัวข้ออย่างเป็นธรรมชาติ',
            thCompositionPoster: 'วางรูปวาดดูเดิลและลูกศรชี้รอบพาดหัวตรงกลาง คล้ายโปสเตอร์ชวนเข้าร่วมเวิร์กช็อปที่เต็มไปด้วยไอเดียสร้างสรรค์',
            thCompositionInfographic: 'เชื่อมหัวข้อย่อยด้วยเส้นลูกศรวาดมือ กรอบวงรี/เมฆ และไฮไลต์ใต้คำสำคัญ ทำให้ข้อมูลที่เยอะดูย่อยง่ายและน่าอ่าน',
            mjParams: '--stylize 200'
        }
    },
    {
        id: 'popart',
        nameTh: 'ป๊อปอาร์ต',
        nameEn: 'Pop Art Comic',
        category: 'illustration',
        categoryLabel: 'กราฟิก & วาดประกอบ',
        shortDesc: 'สีสันจัดจ้าน คอมิกอเมริกัน จุดสกรีนดอท',
        image: 'images/styles/popart.jpg',
        fallbackGradient: 'linear-gradient(135deg, #facc15 0%, #ef4444 50%, #06b6d4 100%)',
        badge: 'ใหม่',
        palette: [
            { hex: '#EF4444', name: 'Comic Red' },
            { hex: '#FACC15', name: 'Bold Yellow' },
            { hex: '#06B6D4', name: 'Pop Cyan' },
            { hex: '#111827', name: 'Heavy Ink' }
        ],
        detailSummary: 'ศิลปะคอมิกเรโทรยุค 60s แรงบันดาลใจจาก Roy Lichtenstein ที่อัดแน่นด้วยสีแม่สีสดจัด เส้นขอบหมึกดำหนา ลายจุด Ben-Day Dots และแฉกรัศมีระเบิดพลัง ช่วยหยุดนิ้วผู้ชมบนฟีดโซเชียลได้ทันที',
        details: {
            mood: 'สนุกสนาน ดุดัน ตะโกนชัด เปี่ยมพลังงาน และดึงความสนใจได้ในทันที',
            lightingAndTexture: 'เส้นตัดขอบหมึกดำคมหนา (Thick black ink outlines) ผสมลายจุด Ben-Day halftone dots และเงาทึบสไตล์หนังสือการ์ตูน',
            layoutAndTypography: 'ใช้กรอบช่องการ์ตูน กล่องคำพูด (Speech Bubble) และรัศมี Starburst ประกอบตัวอักษรหนาเอียงโดดเด่น',
            colorStrategy: 'ชุดสีแม่สีความเปรียบต่างสูงสุด แดงสด เหลืองจัด ฟ้าไซอัน และดำสนิท สะดุดตาแม้ย่อเป็นภาพขนาดเล็ก'
        },
        bestFor: [
            'โปสเตอร์แคมเปญด่วน โปรโมชัน หรือประกาศรับสมัครด่วน',
            'กิจกรรมแข่งขัน กีฬาสี หรือปาร์ตี้องค์กร',
            'สื่อรณรงค์ท้าทายไอเดียใหม่ที่ต้องการความสะดุดตา',
            'Infographic เชิงเปรียบเทียบหรือเรื่องท้าทายชวนคิด'
        ],
        promptSpec: {
            enKeywords: 'energetic classic Pop Art comic book illustration, Roy Lichtenstein inspired, dynamic starburst rays, vibrant primary red bright cyan and bold yellow, thick black ink outlines, prominent Ben-Day halftone dots, high energy graphic impact',
            thArtDirection: 'สไตล์ป๊อปอาร์ตคอมิก (Pop Art Comic) แรงบันดาลใจจากหนังสือการ์ตูนคลาสสิก เส้นหมึกดำหนา ลายจุด Halftone และเอฟเฟกต์รัศมีทรงพลัง',
            thColorAndLight: 'สีแม่สีสดจัดอิ่มตัวสูง แดงสด เหลืองจัด ฟ้าไซอัน ตัดขอบด้วยสีดำสนิท พื้นผิวลายจุด Ben-Day Dots ชัดเจน',
            thCompositionPoster: 'วางแฉก Starburst หรือกล่องข้อความคอมิกเป็นจุดศูนย์กลางเพื่อตะโกนพาดหัวหลักให้โดดเด่นทะลุเฟรม',
            thCompositionInfographic: 'แบ่งข้อมูลเป็นช่องตารางหนังสือการ์ตูน (Comic Panels) พร้อมกล่องข้อความขอบดำหนาที่ไล่ลำดับสายตาได้สนุก',
            mjParams: '--stylize 250'
        }
    },
    {
        id: 'glassmorphism',
        nameTh: 'แก้วโปร่งแสง',
        nameEn: 'Glassmorphism',
        category: '3d-tech',
        categoryLabel: '3D & เทคโนโลยี',
        shortDesc: 'การ์ดกระจกฝ้าใส ฟลูอิดแสงออโรราพรีเมียม',
        image: 'images/styles/glassmorphism.jpg',
        fallbackGradient: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #ec4899 100%)',
        badge: 'ใหม่',
        palette: [
            { hex: '#6366F1', name: 'Aurora Violet' },
            { hex: '#22D3EE', name: 'Fluid Cyan' },
            { hex: '#F472B6', name: 'Soft Magenta' },
            { hex: '#FFFFFF', name: 'Frosted Glass' }
        ],
        detailSummary: 'ภาษาดีไซน์ UI ยุคใหม่ที่นำแผ่นกระจกฝ้าโปร่งแสง (Frosted Glass Cards) มาซ้อนลอยเหนือฉากหลังไล่สีออโรราพริ้วไหว ขอบกระจกสะท้อนแสงคมกริบ มอบภาพลักษณ์ผลิตภัณฑ์ดิจิทัลระดับพรีเมียม',
        details: {
            mood: 'โมเดิร์น หรูหราแบบดิจิทัล ลื่นไหล และให้ความรู้สึกเป็นเทคโนโลยีที่เข้าถึงง่าย',
            lightingAndTexture: 'กระจกฝ้าเบลอฉากหลัง (Backdrop blur) ขอบเส้นแสงสะท้อนบางเฉียบ (Specular highlight) เหนือคลื่นแสง Fluid Mesh Gradient',
            layoutAndTypography: 'วางข้อมูลลงบนการ์ดกระจกซ้อนเหลื่อมกันอย่างมีมิติ ใช้ฟอนต์ Sans-serif สะอาดสีขาวหรือกรมท่าคมชัด',
            colorStrategy: 'พื้นหลังสีรุ้งออโรรา ม่วงคราม ฟ้าไซอัน และชมพูมาเจนตา ที่นุ่มนวลลงเมื่อมองผ่านกระจกฝ้าสีขาวโปร่งแสง'
        },
        bestFor: [
            'โปสเตอร์เปิดตัวแอปพลิเคชัน HR / ระบบ IT ใหม่',
            'Infographic สรุปฟีเจอร์และข้อมูลดิจิทัลแพลตฟอร์ม',
            'แบนเนอร์สัมมนาด้าน SaaS, Cloud และ Digital Transformation',
            'พรีเซนเทชันวิสัยทัศน์ด้านเทคโนโลยี'
        ],
        promptSpec: {
            enKeywords: 'sleek modern UI glassmorphism graphic art, floating translucent frosted glass cards and crystal prisms, crisp glowing specular edges, creamy backdrop blur over luminous fluid aurora mesh gradients in violet cyan and magenta',
            thArtDirection: 'สไตล์แก้วโปร่งแสง (Glassmorphism UI) โดดเด่นด้วยแผ่นกระจกฝ้าและรูปทรงคริสตัลซ้อนลอยเหนือพื้นหลังคลื่นแสงออโรรา',
            thColorAndLight: 'พื้นหลังไล่เฉดสีม่วงอินดิโก ฟ้าไซอัน และชมพูมาเจนตาพริ้วไหว มองผ่านแผ่นกระจกโปร่งแสงที่มีขอบสะท้อนแสงสีขาวคมเฉียบ',
            thCompositionPoster: 'จัดแผ่นกระจกฝ้าใบใหญ่เป็นเวทีตรงกลางสำหรับวางหัวข้อข่าวสาร โดยมีรูปทรงคริสตัลลอยรอบข้างเพิ่มมิติความลึก',
            thCompositionInfographic: 'ใช้การ์ดกระจกฝ้าหลายใบเรียงเป็นกริดสำหรับแยกหัวข้อสถิติและฟีเจอร์ ดูสะอาดตาและเหมือนหน้าจอแอปพลิเคชันพรีเมียม',
            mjParams: '--stylize 250'
        }
    },
    {
        id: 'luxury',
        nameTh: 'หรูหราพรีเมียม',
        nameEn: 'Luxury Gold & Dark',
        category: 'corporate',
        categoryLabel: 'ทางการ & องค์กร',
        shortDesc: 'พื้นเข้มหินอ่อนตัดทองเมทัลลิก ทรงคุณค่า',
        image: 'images/styles/luxury.jpg',
        fallbackGradient: 'linear-gradient(135deg, #064e3b 0%, #0f172a 55%, #d4af37 100%)',
        badge: 'ใหม่',
        palette: [
            { hex: '#064E3B', name: 'Deep Emerald' },
            { hex: '#0F172A', name: 'Obsidian Dark' },
            { hex: '#D4AF37', name: 'Brushed Gold' },
            { hex: '#FEF3C7', name: 'Champagne Glow' }
        ],
        detailSummary: 'งานออกแบบระดับบัตรเชิญวีไอพีและงานประกาศเกียรติคุณ ผสานพื้นผิวหินอ่อนสีมรกตเข้มและดำออบซิเดียนเข้ากับลายเส้นทองคำเมทัลลิกขัดเงาและกรอบสไตล์ Art Deco สะท้อนความสง่างามและคุณค่าสูงสุด',
        details: {
            mood: 'ทรงเกียรติ หรูหรา พิเศษเหนือระดับ และสร้างความภาคภูมิใจแก่ผู้ได้รับเกียรติหรือผู้ร่วมงาน',
            lightingAndTexture: 'ลายหินอ่อนเข้มลึกตัดกับฟอยล์ทองเมทัลลิกขัดด้าน แสงสปอตไลต์อุ่นนุ่มนวลสร้างประกายทองอย่างมีระดับ',
            layoutAndTypography: 'จัดวางสมมาตรสง่างาม มีเส้นกรอบ Art Deco คมละเอียด คู่กับฟอนต์ Serif หรูหราหรือ Sans-serif ช่องไฟกว้าง',
            colorStrategy: 'เขียวหัวเป็ด/มรกตเข้มและดำลึก ขับความเงางามของสีทองคำแชมเปญและทองเมทัลลิกให้โดดเด่นโดยไม่ฉูดฉาด'
        },
        bestFor: [
            'โปสเตอร์งานมอบรางวัลบุคลากรดีเด่น (Awards Night)',
            'บัตรเชิญงานกาล่าดินเนอร์ / งานเกษียณอายุราชการ',
            'ประกาศหลักสูตรผู้บริหารระดับสูง (Executive Program)',
            'สื่อเชิดชูเกียรติและความสำเร็จระดับองค์กร'
        ],
        promptSpec: {
            enKeywords: 'opulent luxury prestige poster background, deep emerald green and obsidian dark marble texture, shimmering brushed metallic gold foil accents and refined geometric art-deco lines, warm gallery spotlight glow, sophisticated elegance',
            thArtDirection: 'สไตล์หรูหราพรีเมียม (Luxury Gold & Dark) ใช้กรอบเรขาคณิตแบบ Art Deco และลวดลายใบไม้/เส้นสายสีทองขัดเงาที่เรียบหรูสง่างาม',
            thColorAndLight: 'พื้นหลังลายหินอ่อนสีเขียวมรกตเข้มและดำออบซิเดียน ตัดกับฟอยล์ทองคำเมทัลลิกและแสงสปอตไลต์สีทองแชมเปญที่ส่องนุ่มนวล',
            thCompositionPoster: 'จัดวางแบบสมมาตรกลางเฟรม ล้อมกรอบด้วยเส้นทองบางเฉียบและเว้นพื้นที่เข้มสงบตรงกลางสำหรับชื่อรางวัลหรือคำเชิญสีทอง/ขาวครีม',
            thCompositionInfographic: 'วางข้อมูลสำคัญบนกรอบการ์ดขอบทองบางเฉียบ ใช้เส้นแบ่งระดับสีทองแชมเปญและตัวเลขเน้นขนาดใหญ่ดูทรงคุณค่า',
            mjParams: '--stylize 250'
        }
    },
    {
        id: 'thaicontemp',
        nameTh: 'ไทยร่วมสมัย',
        nameEn: 'Thai Contemporary',
        category: 'photo-culture',
        categoryLabel: 'ภาพถ่าย & อัตลักษณ์',
        shortDesc: 'ลายไทยประยุกต์มินิมอล สง่างามมีเอกลักษณ์',
        image: 'images/styles/thaicontemp.jpg',
        fallbackGradient: 'linear-gradient(135deg, #1e1b4b 0%, #9a3412 55%, #eab308 100%)',
        badge: 'ใหม่',
        palette: [
            { hex: '#1E1B4B', name: 'Royal Indigo' },
            { hex: '#D97706', name: 'Thai Gold' },
            { hex: '#B45309', name: 'Terracotta Silk' },
            { hex: '#0F766E', name: 'Emerald Silk' }
        ],
        detailSummary: 'การตีความศิลปะไทยและลายกนก ดอกบัว หรือสถาปัตยกรรมไทยใหม่ด้วยเส้นสายเรขาคณิตมินิมอลที่เฉียบคมบนโทนสีผ้าไหมไทยและครามเข้ม ผสานความงดงามทางวัฒนธรรมเข้ากับความทันสมัยระดับสากลอย่างลงตัว',
        details: {
            mood: 'สง่างาม ภาคภูมิใจในรากเหง้าวัฒนธรรม แต่ยังดูโมเดิร์น เข้าใจง่าย และเป็นสากล',
            lightingAndTexture: 'เส้นลายไทยประยุกต์เรขาคณิตคมชัด ผสมประกายทองคำเปลวอ่อนๆ และพื้นผิวสัมผัสคล้ายผ้าไหมไทยหรือกระดาษสาประณีต',
            layoutAndTypography: 'ใช้ลวดลายไทยประยุกต์เป็นกรอบมุมหรือพื้นหลังช่วงล่าง คู่กับฟอนต์ไทยร่วมสมัยที่มีหัวหรือไร้หัวที่ดูสง่าอ่านง่าย',
            colorStrategy: 'สีน้ำเงินครามราชวงศ์ ดินเผาอุ่น เขียวมรกตผ้าไหม และทองคำไทย สร้างความหรูหราอย่างมีอัตลักษณ์'
        },
        bestFor: [
            'โปสเตอร์งานวันสำคัญไทย สงกรานต์ ลอยกระทง วันไหว้ครู',
            'งานพิธีการของมหาวิทยาลัยและหน่วยงานราชการ',
            'สื่อประชาสัมพันธ์โครงการศิลปวัฒนธรรมและ Soft Power',
            'Infographic ความรู้ประวัติศาสตร์ ศิลปะ และอัตลักษณ์ไทย'
        ],
        promptSpec: {
            enKeywords: 'contemporary Thai graphic art poster illustration, modernized minimalist golden Kanok flame motifs and geometric lotus petals over deep royal indigo, warm terracotta and emerald Thai silk tones, subtle gold leaf shimmer, balanced modern layout',
            thArtDirection: 'สไตล์ไทยร่วมสมัย (Thai Contemporary) นำลายกนก กลีบบัว และเส้นสายศิลปะไทยมาลดทอนเป็นรูปทรงเรขาคณิตมินิมอลที่ดูทันสมัยและสง่างาม',
            thColorAndLight: 'โทนสีครามเข้ม น้ำตาลดินเผา เขียวมรกตผ้าไหม และสีทองคำเปลวอ่อนๆ มีแสงสะท้อนละมุนบนพื้นผิวสัมผัสผ้าไหมหรือกระดาษคราฟต์ประณีต',
            thCompositionPoster: 'วางลวดลายไทยประยุกต์เป็นกรอบโค้งหรือซุ้มประดับด้านล่าง-มุมภาพ เพื่อเปิดพื้นที่ตรงกลางให้โล่งสง่าสำหรับข้อความพิธีการ',
            thCompositionInfographic: 'ใช้เส้นกรอบและไอคอนแรงบันดาลใจจากดอกบัวและลายไทยประยุกต์แบ่งหัวข้ออย่างเป็นระเบียบ อ่านชัดเจนแบบร่วมสมัย',
            mjParams: '--stylize 250'
        }
    }
];
