// script.js
console.log("UniFin Platform Loaded");

/* =========================================
   1. MULTILINGUAL TRANSLATION DATA
   ========================================= */
const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About Us",
        nav_awareness: "Awareness",
        nav_security: "Security",
        nav_stability: "Stability",
        nav_downloads: "Downloads",
        nav_links: "Links",
        hero_title: "Bringing Financial Inclusion to One Screen",
        hero_tagline: "One Nation. One Platform. Smart Finance.",
        sect_awareness: "Awareness Hub",
        card_schemes: "Financial Inclusion Schemes",
        desc_schemes: "Access government initiatives designed to bridge the economic gap.",
        card_learning: "Gamified Learning System",
        desc_learning: "Master finance through interactive levels and real-world simulations.",
        card_budget: "Current Budgeting",
        
        // ✅ CORRECTED LINE:
        desc_budget: "A National-Level Indian Economic Tracker.",
        
        sect_security: "Security & Protection",
        sub_security: "Advanced shielding against modern financial threats.",
        card_upi: "UPI Scam Shield",
        desc_upi: "Real-time transaction monitoring to prevent fraudulent UPI transfers.",
        card_call: "Call Threats (NLP)",
        desc_call: "AI-powered NLP to detect and block scam calls instantly.",
        sect_stability: "Financial Stability",
        sub_stability: "Tools to secure and grow your economic future.",
        card_expense: "Expense Tracker",
        desc_expense: "Automated categorization of your daily spends.",
        card_emi: "EMI Risk Predictor",
        desc_emi: "Forecast potential defaults based on cash flow.",
        card_portfolio: "Portfolio Advisory",
        desc_portfolio: "Personalized investment strategies.",
        sect_about: "About Us - Team Dominators",
        sub_about: "The minds behind the UniFin Platform.",
        agenda_title: "Our Agenda",
        agenda_desc_1: "Our agenda is to simplify finance and empower users to make informed financial decisions through a single, unified fintech platform.",
        agenda_desc_2: "By integrating awareness around digital payments, fraud prevention, and smart saving, we encourage responsible financial behavior.",
        btn_explore: "Explore",
        btn_play: "Play Now",
        btn_analyze: "Analyze",
        btn_activate: "Activate Shield",
        btn_logs: "View Logs",
        btn_track: "Track",
        btn_check: "Check Risk",
        btn_invest: "Invest"
    },
    hi: {
        nav_home: "होम",
        nav_about: "हमारे बारे में",
        nav_awareness: "जागरूकता",
        nav_security: "सुरक्षा",
        nav_stability: "स्थिरता",
        nav_downloads: "डाउनलोड",
        nav_links: "लिंक्स",
        hero_title: "वित्तीय समावेशन को एक स्क्रीन पर लाना",
        hero_tagline: "एक राष्ट्र। एक मंच। स्मार्ट फाइनेंस।",
        sect_awareness: "जागरूकता केंद्र",
        card_schemes: "वित्तीय समावेशन योजनाएं",
        desc_schemes: "आर्थिक अंतर को पाटने के लिए सरकारी पहलों तक पहुंचें।",
        card_learning: "गेमिफाइड लर्निंग सिस्टम",
        desc_learning: "इंटरैक्टिव स्तरों के माध्यम से वित्त में महारत हासिल करें।",
        card_budget: "वर्तमान बजट",
        desc_budget: "मासिक खर्च को ट्रैक और ऑप्टिमाइज़ करने के लिए AI टूल्स।",
        sect_security: "सुरक्षा और संरक्षण",
        sub_security: "आधुनिक वित्तीय खतरों के खिलाफ उन्नत सुरक्षा।",
        card_upi: "UPI स्कैम शील्ड",
        desc_upi: "धोखाधड़ी वाले UPI ट्रांसफर को रोकने के लिए रियल-टाइम मॉनिटरिंग।",
        card_call: "कॉल खतरे (NLP)",
        desc_call: "स्कैम कॉल को तुरंत ब्लॉक करने के लिए AI-संचालित NLP।",
        sect_stability: "वित्तीय स्थिरता",
        sub_stability: "आपके आर्थिक भविष्य को सुरक्षित करने के उपकरण।",
        card_expense: "व्यय ट्रैकर",
        desc_expense: "आपके दैनिक खर्चों का स्वचालित वर्गीकरण।",
        card_emi: "EMI जोखिम अनुमानक",
        desc_emi: "नकदी प्रवाह के आधार पर संभावित चूक का पूर्वानुमान।",
        card_portfolio: "पोर्टफोलियो सलाहकार",
        desc_portfolio: "व्यक्तिगत निवेश रणनीतियाँ।",
        sect_about: "हमारे बारे में - टीम डोमिनेटर्स",
        sub_about: "UniFin प्लेटफॉर्म के पीछे के दिमाग।",
        agenda_title: "हमारा एजेंडा",
        agenda_desc_1: "हमारा एजेंडा वित्त को सरल बनाना और एक एकीकृत प्लेटफॉर्म के माध्यम से उपयोगकर्ताओं को सशक्त बनाना है।",
        agenda_desc_2: "डिजिटल भुगतान और धोखाधड़ी की रोकथाम के प्रति जागरूकता लाकर हम जिम्मेदार वित्तीय व्यवहार को प्रोत्साहित करते हैं।",
        btn_explore: "खोजें",
        btn_play: "खेलें",
        btn_analyze: "विश्लेषण",
        btn_activate: "सक्रिय करें",
        btn_logs: "लॉग देखें",
        btn_track: "ट्रैक करें",
        btn_check: "जोखिम जांचें",
        btn_invest: "निवेश करें"
    },
    pa: {
        nav_home: "ਘਰ",
        nav_about: "ਸਾਡੇ ਬਾਰੇ",
        nav_awareness: "ਜਾਗਰੂਕਤਾ",
        nav_security: "ਸੁਰੱਖਿਆ",
        nav_stability: "ਸਥਿਰਤਾ",
        nav_downloads: "ਡਾਊਨਲੋਡ",
        nav_links: "ਲਿੰਕ",
        hero_title: "ਵਿੱਤੀ ਸਮਾਵੇਸ਼ ਨੂੰ ਇੱਕ ਸਕ੍ਰੀਨ ਤੇ ਲਿਆਉਣਾ",
        hero_tagline: "ਇਕ ਰਾਸ਼ਟਰ. ਇਕ ਪਲੇਟਫਾਰਮ. ਸਮਾਰਟ ਵਿੱਤ.",
        sect_awareness: "ਜਾਗਰੂਕਤਾ ਕੇਂਦਰ",
        card_schemes: "ਵਿੱਤੀ ਸਮਾਵੇਸ਼ ਯੋਜਨਾਵਾਂ",
        desc_schemes: "ਆਰਥਿਕ ਪਾੜੇ ਨੂੰ ਦੂਰ ਕਰਨ ਲਈ ਸਰਕਾਰੀ ਪਹਿਲਕਦਮੀਆਂ.",
        card_learning: "ਗੇਮੀਫਾਈਡ ਲਰਨਿੰਗ ਸਿਸਟਮ",
        desc_learning: "ਇੰਟਰਐਕਟਿਵ ਪੱਧਰਾਂ ਦੁਆਰਾ ਵਿੱਤ ਵਿੱਚ ਮਹਾਰਤ ਹਾਸਲ ਕਰੋ.",
        card_budget: "ਮੌਜੂਦਾ ਬਜਟ",
        desc_budget: "ਆਪਣੇ ਮਹੀਨਾਵਾਰ ਖਰਚਿਆਂ ਨੂੰ ਟਰੈਕ ਕਰਨ ਲਈ ਏਆਈ ਟੂਲ.",
        sect_security: "ਸੁਰੱਖਿਆ",
        sub_security: "ਆਧੁਨਿਕ ਵਿੱਤੀ ਖਤਰਿਆਂ ਤੋਂ ਉੱਨਤ ਸੁਰੱਖਿਆ.",
        card_upi: "UPI ਸਕੈਮ ਸ਼ੀਲਡ",
        desc_upi: "ਧੋਖਾਧੜੀ ਵਾਲੇ ਤਬਾਦਲੇ ਨੂੰ ਰੋਕਣ ਲਈ ਨਿਗਰਾਨੀ.",
        card_call: "ਕਾਲ ਧਮਕੀਆਂ (NLP)",
        desc_call: "ਘੁਟਾਲੇ ਦੀਆਂ ਕਾਲਾਂ ਨੂੰ ਰੋਕਣ ਲਈ ਏਆਈ ਦੀ ਵਰਤੋਂ.",
        sect_stability: "ਵਿੱਤੀ ਸਥਿਰਤਾ",
        sub_stability: "ਤੁਹਾਡੇ ਆਰਥਿਕ ਭਵਿੱਖ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਰਨ ਲਈ ਸਾਧਨ.",
        card_expense: "ਖਰਚਾ ਟਰੈਕਰ",
        desc_expense: "ਰੋਜ਼ਾਨਾ ਖਰਚਿਆਂ ਦਾ ਸਵੈਚਾਲਤ ਵਰਗੀਕਰਨ.",
        card_emi: "EMI ਜੋਖਮ ਭਵਿੱਖਬਾਣੀ",
        desc_emi: "ਨਕਦੀ ਪ੍ਰਵਾਹ ਦੇ ਅਧਾਰ ਤੇ ਸੰਭਾਵੀ ਡਿਫਾਲਟਸ ਦੀ ਭਵਿੱਖਬਾਣੀ.",
        card_portfolio: "ਪੋਰਟਫੋਲੀਓ ਸਲਾਹਕਾਰ",
        desc_portfolio: "ਨਿੱਜੀ ਨਿਵੇਸ਼ ਰਣਨੀਤੀਆਂ.",
        sect_about: "ਸਾਡੇ ਬਾਰੇ - ਟੀਮ ਡੋਮੀਨੇਟਰਸ",
        sub_about: "UniFin ਪਲੇਟਫਾਰਮ ਦੇ ਪਿੱਛੇ ਦਿਮਾਗ.",
        agenda_title: "ਸਾਡਾ ਏਜੰਡਾ",
        agenda_desc_1: "ਸਾਡਾ ਏਜੰਡਾ ਵਿੱਤ ਨੂੰ ਸਰਲ ਬਣਾਉਣਾ ਅਤੇ ਉਪਭੋਗਤਾਵਾਂ ਨੂੰ ਇੱਕ ਪਲੇਟਫਾਰਮ ਰਾਹੀਂ ਸ਼ਕਤੀ ਪ੍ਰਦਾਨ ਕਰਨਾ ਹੈ.",
        agenda_desc_2: "ਡਿਜੀਟਲ ਭੁਗਤਾਨ ਅਤੇ ਧੋਖਾਧੜੀ ਦੀ ਰੋਕਥਾਮ ਬਾਰੇ ਜਾਗਰੂਕਤਾ ਫੈਲਾ ਕੇ ਅਸੀਂ ਜ਼ਿੰਮੇਵਾਰ ਵਿੱਤੀ ਵਿਵਹਾਰ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਦੇ ਹਾਂ.",
        btn_explore: "ਪੜਚੋਲ",
        btn_play: "ਖੇਡੋ",
        btn_analyze: "ਵਿਸ਼ਲੇਸ਼ਣ",
        btn_activate: "ਚਾਲੂ ਕਰੋ",
        btn_logs: "ਲੌਗ ਵੇਖੋ",
        btn_track: "ਟਰੈਕ",
        btn_check: "ਜੋਖਮ ਵੇਖੋ",
        btn_invest: "ਨਿਵੇਸ਼"
    },
    gu: {
        nav_home: "ઘર",
        nav_about: "અમારા વિશે",
        nav_awareness: "જાગૃતિ",
        nav_security: "સુરક્ષા",
        nav_stability: "સ્થિરતા",
        nav_downloads: "ડાઉનલોડ્સ",
        nav_links: "લિંક્સ",
        hero_title: "એક સ્ક્રીન પર આર્થિક સમાવેશ",
        hero_tagline: "એક રાષ્ટ્ર. એક પ્લેટફોર્મ. સ્માર્ટ ફાઇનાન્સ.",
        sect_awareness: "જાગૃતિ કેન્દ્ર",
        card_schemes: "નાણાકીય સમાવેશ યોજનાઓ",
        desc_schemes: "આર્થિક અંતર ઘટાડવા માટે સરકારી પહેલ.",
        card_learning: "ગેમીફાઇડ લર્નિંગ સિસ્ટમ",
        desc_learning: "ઇન્ટરેક્ટિવ સ્તરો દ્વારા ફાઇનાન્સ શીખો.",
        card_budget: "વર્તમાન બજેટ",
        desc_budget: "તમારા માસિક ખર્ચને ટ્રેક કરવા માટે AI સાધનો.",
        sect_security: "સુરક્ષા અને રક્ષણ",
        sub_security: "આધુનિક નાણાકીય જોખમો સામે રક્ષણ.",
        card_upi: "UPI સ્કેમ શિલ્ડ",
        desc_upi: "છેતરપિંડી અટકાવવા માટે રીઅલ-ટાઇમ મોનિટરિંગ.",
        card_call: "કોલ ધમકીઓ (NLP)",
        desc_call: "સ્કેમ કોલ્સને અવરોધિત કરવા માટે AI.",
        sect_stability: "નાણાકીય સ્થિરતા",
        sub_stability: "તમારા આર્થિક ભવિષ્યને સુરક્ષિત કરવાના સાધનો.",
        card_expense: "ખર્ચ ટ્રેકર",
        desc_expense: "દૈનિક ખર્ચનું સ્વચાલિત વર્ગીકરણ.",
        card_emi: "EMI જોખમ આગાહી",
        desc_emi: "રોકડ પ્રવાહના આધારે ડિફોલ્ટની આગાહી.",
        card_portfolio: "પોર્ટફોલિયો સલાહકાર",
        desc_portfolio: "વ્યક્તિગત રોકાણ વ્યૂહરચના.",
        sect_about: "ટીમ ડોમિનેટર્સ",
        sub_about: "UniFin પ્લેટફોર્મ પાછળના લોકો.",
        agenda_title: "અમારો એજન્ડા",
        agenda_desc_1: "અમારો ઉદ્દેશ્ય ફાઇનાન્સને સરળ બનાવવાનો અને એક પ્લેટફોર્મ દ્વારા વપરાશકર્તાઓને સશક્ત કરવાનો છે.",
        agenda_desc_2: "ડિજિટલ પેમેન્ટ અને છેતરપિંડી નિવારણ વિશે જાગૃતિ લાવીને અમે જવાબદાર નાણાકીય વર્તનને પ્રોત્સાહિત કરીએ છીએ.",
        btn_explore: "જુઓ",
        btn_play: "રમો",
        btn_analyze: "વિશ્લેષણ",
        btn_activate: "સક્રિય કરો",
        btn_logs: "લોગ જુઓ",
        btn_track: "ટ્રેક",
        btn_check: "જોખમ તપાસો",
        btn_invest: "રોકાણ"
    },
    bn: {
        nav_home: "হোম",
        nav_about: "আমাদের সম্পর্কে",
        nav_awareness: "সচেতনতা",
        nav_security: "নিরাপত্তা",
        nav_stability: "স্থিতিশীলতা",
        nav_downloads: "ডাউনলোড",
        nav_links: "লিঙ্ক",
        hero_title: "এক স্ক্রিনে আর্থিক অন্তর্ভুক্তি",
        hero_tagline: "এক জাতি। এক প্ল্যাটফর্ম। স্মার্ট ফাইন্যান্স।",
        sect_awareness: "সচেতনতা কেন্দ্র",
        card_schemes: "আর্থিক অন্তর্ভুক্তি প্রকল্প",
        desc_schemes: "অর্থনৈতিক ব্যবধান পূরণের জন্য সরকারি উদ্যোগ।",
        card_learning: "গেম লার্নিং সিস্টেম",
        desc_learning: "ইন্টারেক্টিভ লেভেলের মাধ্যমে অর্থায়ন শিখুন।",
        card_budget: "বর্তমান বাজেট",
        desc_budget: "খরচ ট্র্যাক করার জন্য AI টুলস।",
        sect_security: "নিরাপত্তা এবং সুরক্ষা",
        sub_security: "আধুনিক আর্থিক হুমকির বিরুদ্ধে উন্নত সুরক্ষা।",
        card_upi: "UPI স্ক্যাম শিল্ড",
        desc_upi: "প্রতারণামূলক লেনদেন রোধ করতে পর্যবেক্ষণ।",
        card_call: "কল হুমকি (NLP)",
        desc_call: "স্ক্যাম কল ব্লক করতে AI ব্যবহার।",
        sect_stability: "আর্থিক স্থিতিশীলতা",
        sub_stability: "আপনার অর্থনৈতিক ভবিষ্যৎ সুরক্ষিত করার সরঞ্জাম।",
        card_expense: "খরচ ট্র্যাকার",
        desc_expense: "আপনার দৈনন্দিন খরচের স্বয়ংক্রিয় বিভাগ।",
        card_emi: "EMI ঝুঁকি পূর্বাভাস",
        desc_emi: "নগদ প্রবাহের উপর ভিত্তি করে খেলাপি হওয়ার পূর্বাভাস।",
        card_portfolio: "পোর্টফোলিও পরামর্শ",
        desc_portfolio: "ব্যক্তিগত বিনিয়োগ কৌশল।",
        sect_about: "টিম ডমিনেটরস",
        sub_about: "UniFin প্ল্যাটফর্মের পেছনের কারিগররা।",
        agenda_title: "আমাদের এজেন্ডা",
        agenda_desc_1: "আমাদের উদ্দেশ্য হল অর্থায়নকে সহজ করা এবং ব্যবহারকারীদের একটি প্ল্যাটফর্মের মাধ্যমে ক্ষমতায়ন করা।",
        agenda_desc_2: "ডিজিটাল পেমেন্ট এবং জালিয়াতি প্রতিরোধ সম্পর্কে সচেতনতা সৃষ্টি করে আমরা দায়িত্বশীল আচরণকে উৎসাহিত করি।",
        btn_explore: "দেখুন",
        btn_play: "খেলুন",
        btn_analyze: "বিশ্লেষণ",
        btn_activate: "চালু করুন",
        btn_logs: "লগ দেখুন",
        btn_track: "ট্র্যাক",
        btn_check: "ঝুঁকি দেখুন",
        btn_invest: "বিনিয়োগ"
    },
    ur: {
        nav_home: "ہوم",
        nav_about: "ہمارے بارے میں",
        nav_awareness: "آگاہی",
        nav_security: "سیکیورٹی",
        nav_stability: "استحکام",
        nav_downloads: "ڈاؤن لوڈ",
        nav_links: "لنکس",
        hero_title: "ایک اسکرین پر مالی شمولیت",
        hero_tagline: "ایک قوم۔ ایک پلیٹ فارم۔ اسمارٹ فنانس۔",
        sect_awareness: "آگاہی مرکز",
        card_schemes: "مالی شمولیت کی اسکیمیں",
        desc_schemes: "معاشی فرق کو ختم کرنے کے لیے حکومتی اقدامات۔",
        card_learning: "گیمیفائیڈ لرننگ سسٹم",
        desc_learning: "انٹرایکٹو لیولز کے ذریعے فنانس سیکھیں۔",
        card_budget: "موجودہ بجٹ",
        desc_budget: "ماہانہ اخراجات کو ٹریک کرنے کے لیے AI ٹولز۔",
        sect_security: "تحفظ اور سیکیورٹی",
        sub_security: "جدید مالیاتی خطرات کے خلاف تحفظ۔",
        card_upi: "UPI اسکینڈل شیلڈ",
        desc_upi: "دھوکہ دہی کو روکنے کے لیے ریئل ٹائم مانیٹرنگ۔",
        card_call: "کال کی دھمکیاں (NLP)",
        desc_call: "اسکیم کالز کو روکنے کے لیے AI۔",
        sect_stability: "مالی استحکام",
        sub_stability: "آپ کے معاشی مستقبل کو محفوظ بنانے کے ٹولز۔",
        card_expense: "اخراجات کا ٹریکر",
        desc_expense: "آپ کے روزانہ اخراجات کی خودکار درجہ بندی۔",
        card_emi: "EMI رسک کی پیشن گوئی",
        desc_emi: "کیش فلو کی بنیاد پر ممکنہ نادہندگی کی پیش گوئی۔",
        card_portfolio: "پورٹ فولیو ایڈوائزری",
        desc_portfolio: "ذاتی سرمایہ کاری کی حکمت عملی۔",
        sect_about: "ٹیم ڈومینیٹرز",
        sub_about: "UniFin پلیٹ فارم کے پیچھے موجود لوگ۔",
        agenda_title: "ہمارا ایجنڈا",
        agenda_desc_1: "ہمارا ایجنڈا فنانس کو آسان بنانا اور صارفین کو بااختیار بنانا ہے۔",
        agenda_desc_2: "ڈیجیٹل ادائیگیوں اور دھوکہ دہی کی روک تھام کے بارے میں شعور اجاگر کرکے ہم ذمہ دارانہ رویے کی حوصلہ افزائی کرتے ہیں۔",
        btn_explore: "دریافت",
        btn_play: "کھیلیں",
        btn_analyze: "تجزیہ",
        btn_activate: "فعال کریں",
        btn_logs: "لاگز دیکھیں",
        btn_track: "ٹریک",
        btn_check: "رسک چیک",
        btn_invest: "سرمایہ کاری"
    },
    ta: {
        nav_home: "முகப்பு",
        nav_about: "எங்களை பற்றி",
        nav_awareness: "விழிப்புணர்வு",
        nav_security: "பாதுகாப்பு",
        nav_stability: "ஸ்திரத்தன்மை",
        nav_downloads: "பதிவிறக்கங்கள்",
        nav_links: "இணைப்புகள்",
        hero_title: "ஒரே திரையில் நிதிச் சேர்க்கை",
        hero_tagline: "ஒரு நாடு. ஒரு தளம். ஸ்மார்ட் நிதி.",
        sect_awareness: "விழிப்புணர்வு மையம்",
        card_schemes: "நிதிச் சேர்க்கை திட்டங்கள்",
        desc_schemes: "பொருளாதார இடைவெளியைக் குறைக்க அரசு முயற்சிகள்.",
        card_learning: "கேமிஃபைட் கற்றல் முறை",
        desc_learning: "விளையாட்டு மூலம் நிதியைக் கற்றுக்கொள்ளுங்கள்.",
        card_budget: "தற்போதைய பட்ஜெட்",
        desc_budget: "செலவுகளைக் கண்காணிக்க AI கருவிகள்.",
        sect_security: "பாதுகாப்பு",
        sub_security: "நவீன நிதி அச்சுறுத்தல்களுக்கு எதிரான பாதுகாப்பு.",
        card_upi: "UPI மோசடி தடுப்பு",
        desc_upi: "மோசடியைத் தடுக்க நேரடி கண்காணிப்பு.",
        card_call: "அழைப்பு அச்சுறுத்தல்கள்",
        desc_call: "மோசடி அழைப்புகளைத் தடுக்க AI.",
        sect_stability: "நிதி நிலைத்தன்மை",
        sub_stability: "உங்கள் பொருளாதார எதிர்காலத்தைப் பாதுகாக்க கருவிகள்.",
        card_expense: "செலவு டிராக்கர்",
        desc_expense: "தினசரி செலவுகளை தானாக வகைப்படுத்துதல்.",
        card_emi: "EMI ஆபத்து கணிப்பு",
        desc_emi: "பணப்புழக்கத்தின் அடிப்படையில் கணிப்பு.",
        card_portfolio: "போர்ட்ஃபோலியோ ஆலோசனை",
        desc_portfolio: "தனிப்பயனாக்கப்பட்ட முதலீட்டு உத்திகள்.",
        sect_about: "டீம் டாமினேட்டர்ஸ்",
        sub_about: "UniFin தளத்தின் பின்னால் உள்ளவர்கள்.",
        agenda_title: "எங்கள் நோக்கம்",
        agenda_desc_1: "நிதியை எளிமையாக்குவதே எங்கள் நோக்கம் மற்றும் ஒரு தளத்தின் மூலம் பயனர்களுக்கு அதிகாரம் அளிப்பதாகும்.",
        agenda_desc_2: "டிஜிட்டல் கொடுப்பனவுகள் மற்றும் மோசடி தடுப்பு பற்றிய விழிப்புணர்வை ஏற்படுத்துவதன் மூலம் நாங்கள் பொறுப்பான நடத்தையை ஊக்குவிக்கிறோம்.",
        btn_explore: "ஆராயுங்கள்",
        btn_play: "விளையாடு",
        btn_analyze: "பகுப்பாய்வு",
        btn_activate: "இயக்கு",
        btn_logs: "பதிவுகள்",
        btn_track: "கண்காணிக்க",
        btn_check: "ஆபத்து",
        btn_invest: "முதலீடு"
    },
    te: {
        nav_home: "హోమ్",
        nav_about: "మా గురించి",
        nav_awareness: "అవగాహన",
        nav_security: "భద్రత",
        nav_stability: "స్థిరత్వం",
        nav_downloads: "డౌన్‌లోడ్‌లు",
        nav_links: "లింకులు",
        hero_title: "ఒకే స్క్రీన్‌పై ఆర్థిక చేరిక",
        hero_tagline: "ఒకే దేశం. ఒకే వేదిక. స్మార్ట్ ఫైనాన్స్.",
        sect_awareness: "అవగాహన కేంద్రం",
        card_schemes: "ఆర్థిక చేరిక పథకాలు",
        desc_schemes: "ఆర్థిక అంతరాలను తగ్గించడానికి ప్రభుత్వ కార్యక్రమాలు.",
        card_learning: "గేమిఫైడ్ లెర్నింగ్ సిస్టమ్",
        desc_learning: "ఇంటరాక్టివ్ లెవల్స్ ద్వారా ఫైనాన్స్ నేర్చుకోండి.",
        card_budget: "ప్రస్తుత బడ్జెట్",
        desc_budget: "ఖర్చులను ట్రాక్ చేయడానికి AI సాధనాలు.",
        sect_security: "భద్రత",
        sub_security: "ఆధునిక ఆర్థిక బెదిరింపులకు వ్యతిరేకంగా రక్షణ.",
        card_upi: "UPI స్కామ్ షీల్డ్",
        desc_upi: "మోసాలను నిరోధించడానికి రియల్ టైమ్ పర్యవేక్షణ.",
        card_call: "కాల్ బెదిరింపులు",
        desc_call: "స్కామ్ కాల్‌లను నిరోధించడానికి AI.",
        sect_stability: "ఆర్థిక స్థిరత్వం",
        sub_stability: "మీ ఆర్థిక భవిష్యత్తును సురక్షితం చేసే సాధనాలు.",
        card_expense: "ఖర్చు ట్రాకర్",
        desc_expense: "రోజువారీ ఖర్చుల స్వయంచాలక వర్గీకరణ.",
        card_emi: "EMI రిస్క్ ప్రిడిక్టర్",
        desc_emi: "నగదు ప్రవాహం ఆధారంగా అంచనా.",
        card_portfolio: "పోర్ట్‌ఫోలియో సలహా",
        desc_portfolio: "వ్యక్తిగతీకరించిన పెట్టుబడి వ్యూహాలు.",
        sect_about: "టీమ్ డామినేటర్స్",
        sub_about: "UniFin ప్లాట్‌ఫారమ్ వెనుక ఉన్న వ్యక్తులు.",
        agenda_title: "మా ఎజెండా",
        agenda_desc_1: "ఫైనాన్స్‌ను సులభతరం చేయడం మరియు ఒక ప్లాట్‌ఫారమ్ ద్వారా వినియోగదారులను శక్తివంతం చేయడం మా లక్ష్యం.",
        agenda_desc_2: "డిజిటల్ చెల్లింపులు మరియు మోసాల నివారణపై అవగాహన కల్పించడం ద్వారా మేము బాధ్యతాయుతమైన ప్రవర్తనను ప్రోత్సహిస్తాము.",
        btn_explore: "చూడండి",
        btn_play: "ఆడండి",
        btn_analyze: "విశ్లేషణ",
        btn_activate: "యాక్టివేట్",
        btn_logs: "లాగ్స్",
        btn_track: "ట్రాక్",
        btn_check: "రిస్క్",
        btn_invest: "పెట్టుబడి"
    }
};

/* =========================================
   2. LANGUAGE SWITCHING LOGIC
   ========================================= */
function changeLanguage() {
    const langSelect = document.getElementById("langSelect");
    const selectedLang = langSelect.value;
    
    // 1. Handle RTL for Urdu
    if (selectedLang === 'ur') {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.setAttribute('dir', 'ltr');
    }

    // 2. Update Text Content
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[selectedLang] && translations[selectedLang][key]) {
            element.innerText = translations[selectedLang][key];
        }
    });

    // 3. Save preference
    localStorage.setItem('preferredLang', selectedLang);
}

/* =========================================
   3. INITIALIZATION & EVENTS
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Restore Saved Language
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    const langSelect = document.getElementById("langSelect");
    if(langSelect) {
        langSelect.value = savedLang;
        changeLanguage();
    }

    // B. Initialize Visual Effects
    initThreeJS();
    initParallax();

    // C. Reveal on Scroll Animation (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden-element').forEach((el) => observer.observe(el));

    // D. Mobile Menu Handling
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            if(navList.style.display === 'flex') {
                navList.style.display = 'none';
            } else {
                navList.style.display = 'flex';
                navList.style.flexDirection = 'column';
                navList.style.position = 'absolute';
                navList.style.top = '70px';
                navList.style.left = '0';
                navList.style.width = '100%';
                navList.style.background = 'var(--primary-dark)';
                navList.style.padding = '20px';
            }
        });
    }

    // E. Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80, // Adjust for sticky header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

/* =========================================
   4. VISUAL EFFECTS ENGINE
   ========================================= */

// --- PARALLAX BLOBS ---
function initParallax() {
    const shapes = [
        { el: document.querySelector('.shape-1'), speed: 0.2 },
        { el: document.querySelector('.shape-2'), speed: -0.15 },
        { el: document.querySelector('.shape-3'), speed: 0.1 }
    ];

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        shapes.forEach(shape => {
            if (shape.el) {
                shape.el.style.transform = `translateY(${scrollY * shape.speed}px)`;
            }
        });
    });
}

// --- THREE.JS BACKGROUND ---
function initThreeJS() {
    const container = document.getElementById('three-js-background');
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50; 

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 3. Texture for soft particles
    const getTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    };

    // 4. Create Particles
    const particleCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 150; 
        const y = (Math.random() - 0.5) * 150;
        const z = (Math.random() - 0.5) * 100;
        positions.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0x6366f1,    
        size: 1.5,          
        map: getTexture(),  
        transparent: true,
        opacity: 0.6,       
        depthWrite: false,  
        blending: THREE.AdditiveBlending 
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 5. Animation Loop
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    });

    const animate = function () {
        requestAnimationFrame(animate);
        const scrollY = window.scrollY;
        
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005 + (mouseY * 0.05);
        particleSystem.position.y = scrollY * 0.02;

        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
// D. Mobile Menu Handling
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if(hamburger && navList) {
        hamburger.addEventListener('click', () => {
            // Toggle the 'active' class on the list
            navList.classList.toggle('active');
            
            // Optional: Change icon from Bars to X
            const icon = hamburger.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768) {
                navList.classList.remove('active');
                // Reset icon
                const icon = hamburger.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
