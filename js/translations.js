/* ============================================================
   translations.js
   מילון תרגום דו-לשוני (עברית / אנגלית).
   כדי לערוך טקסט באתר — שנו כאן את הערכים. כל מפתח מופיע
   ב-HTML דרך data-i18n="key".
   ============================================================ */

const TRANSLATIONS = {
  he: {
    "meta.title": "שם המרצה | הרצאות שמשאירות חותם",
    "meta.description": "הרצאות מרתקות לנוער ולמבוגרים — הזמינו הרצאה עכשיו",

    "nav.brand": "שם המרצה",
    "nav.about": "אודות",
    "nav.lectures": "הרצאות",
    "nav.reels": "רגעים",
    "nav.pricing": "מחירים",
    "nav.contact": "צור קשר",
    "nav.book": "הזמנת הרצאה",

    "hero.eyebrow": "הרצאות העשרה • השראה • תוכן",
    "hero.title": "הרצאות שמשאירות חותם.",
    "hero.subtitle": "חוויה שמשלבת ידע, רגש והומור — מותאמת לנוער ולמבוגרים, בכל מסגרת.",
    "hero.ctaBook": "הזמינו הרצאה",
    "hero.ctaWatch": "▶ צפו ברגעים",
    "hero.stat1": "הרצאות",
    "hero.stat2": "מאזינים",
    "hero.stat3": "שנות ניסיון",

    "about.eyebrow": "קצת עליי",
    "about.title": "מי עומד מאחורי הבמה",
    "about.p1": "כבר למעלה מעשור אני עולה לבמות מול קהלים מגוונים — מבני נוער ועד מנהלים בכירים. ההרצאות שלי משלבות סיפור אישי, תובנות מעשיות והרבה אנרגיה, ומשאירות את הקהל עם משהו לקחת הביתה.",
    "about.p2": "כל הרצאה נבנית בהתאמה אישית לקהל ולמטרה — בין אם זו הרצאת מוטיבציה לנוער, יום גיבוש לארגון, או ערב העשרה קהילתי.",
    "about.li1": "✦ הרצאות מותאמות אישית לכל קהל",
    "about.li2": "✦ שילוב סיפור, הומור ותוכן מעשי",
    "about.li3": "✦ ניסיון מול אלפי מאזינים בכל הארץ",

    "lectures.eyebrow": "מה אני מעביר",
    "lectures.title": "ההרצאות שלי",
    "lectures.sub": "מבחר נושאים — לחצו כדי לקרוא עוד, וצרו קשר להזמנה.",

    "reels.eyebrow": "טעימה מהבמה",
    "reels.title": "רגעים מתוך ההרצאות",
    "reels.sub": "קליפים קצרים שנותנים טעימה מהאנרגיה. (החליפו בקבצי הווידאו שלכם)",
    "reels.play": "נגן",

    "pricing.eyebrow": "חבילות והזמנה",
    "pricing.title": "מחירון הרצאות",
    "pricing.sub": "מחירים מעודכנים. ניתן לשלב מספר הרצאות בהנחה — דברו איתי.",
    "pricing.note": "💡 הנחות: הזמנת חבילה של 3 הרצאות ומעלה — 15% הנחה. מוסדות חינוך ועמותות — צרו קשר למחיר מיוחד.",
    "pricing.cta": "להזמנה",
    "pricing.popular": "הכי פופולרי",
    "pricing.from": "החל מ-",

    "contact.eyebrow": "בואו נדבר",
    "contact.title": "הזמנת הרצאה",
    "contact.sub": "השאירו פרטים ואחזור אליכם בהקדם, או שלחו הודעה ישירות בוואטסאפ.",
    "contact.whatsapp": "שליחת הודעה בוואטסאפ",
    "contact.name": "שם מלא",
    "contact.phone": "טלפון",
    "contact.type": "סוג הרצאה",
    "contact.optYouth": "הרצאה לנוער",
    "contact.optAdults": "הרצאה למבוגרים",
    "contact.optCustom": "מותאם אישית",
    "contact.message": "הודעה",
    "contact.send": "שליחה",
    "contact.success": "תודה! נחזור אליכם בהקדם 🙌",

    "footer.phone": "📞 050-000-0000",
    "footer.copy": "© 2026 שם המרצה. כל הזכויות שמורות.",

    // כרטיסי הרצאות — ערכו/הוסיפו לפי הצורך
    "cards.lectures": [
      { icon: "🚀", title: "פורצים קדימה", desc: "הרצאת מוטיבציה על יציאה מאזור הנוחות והגשמת מטרות.", tag: "נוער" },
      { icon: "🧠", title: "חוסן מנטלי", desc: "כלים מעשיים להתמודדות עם לחץ, כישלון ושינוי.", tag: "מבוגרים" },
      { icon: "🤝", title: "כוחה של מנהיגות", desc: "מה הופך אדם רגיל למוביל — סיפורים ותובנות.", tag: "ארגונים" },
      { icon: "💡", title: "חשיבה יצירתית", desc: "איך לפתח רעיונות, לשבור דפוסים ולחדש.", tag: "נוער" },
      { icon: "❤️", title: "מערכות יחסים", desc: "תקשורת, הקשבה וחיבור אמיתי בין אנשים.", tag: "מבוגרים" },
      { icon: "🌍", title: "עולם משתנה", desc: "להתאים את עצמנו לעידן הטכנולוגי המהיר.", tag: "כללי" }
    ]
  },

  en: {
    "meta.title": "Speaker Name | Talks That Leave a Mark",
    "meta.description": "Captivating talks for teens and adults — book a lecture now",

    "nav.brand": "Speaker Name",
    "nav.about": "About",
    "nav.lectures": "Lectures",
    "nav.reels": "Moments",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.book": "Book a Talk",

    "hero.eyebrow": "Enrichment • Inspiration • Content",
    "hero.title": "Talks that leave a mark.",
    "hero.subtitle": "An experience blending knowledge, emotion and humor — tailored for teens and adults, in any setting.",
    "hero.ctaBook": "Book a Lecture",
    "hero.ctaWatch": "▶ Watch Moments",
    "hero.stat1": "Talks",
    "hero.stat2": "Listeners",
    "hero.stat3": "Years of experience",

    "about.eyebrow": "A bit about me",
    "about.title": "Who's behind the stage",
    "about.p1": "For over a decade I've stood on stages before diverse audiences — from teenagers to senior executives. My talks blend personal storytelling, practical insights and plenty of energy, leaving the audience with something to take home.",
    "about.p2": "Every talk is custom-built for the audience and the goal — whether a motivational talk for teens, a corporate team day, or a community enrichment evening.",
    "about.li1": "✦ Talks tailored to every audience",
    "about.li2": "✦ Blend of story, humor and practical content",
    "about.li3": "✦ Experience before thousands of listeners nationwide",

    "lectures.eyebrow": "What I deliver",
    "lectures.title": "My Lectures",
    "lectures.sub": "A selection of topics — click to read more, and get in touch to book.",

    "reels.eyebrow": "A taste of the stage",
    "reels.title": "Moments from the talks",
    "reels.sub": "Short clips that give a taste of the energy. (Replace with your own videos)",
    "reels.play": "Play",

    "pricing.eyebrow": "Packages & booking",
    "pricing.title": "Lecture Pricing",
    "pricing.sub": "Up-to-date prices. Combine several talks for a discount — let's talk.",
    "pricing.note": "💡 Discounts: book a package of 3+ talks — 15% off. Schools & nonprofits — contact me for a special rate.",
    "pricing.cta": "Book now",
    "pricing.popular": "Most popular",
    "pricing.from": "From",

    "contact.eyebrow": "Let's talk",
    "contact.title": "Book a Lecture",
    "contact.sub": "Leave your details and I'll get back to you soon, or message me directly on WhatsApp.",
    "contact.whatsapp": "Message on WhatsApp",
    "contact.name": "Full name",
    "contact.phone": "Phone",
    "contact.type": "Lecture type",
    "contact.optYouth": "Youth talk",
    "contact.optAdults": "Adults talk",
    "contact.optCustom": "Custom",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.success": "Thank you! We'll be in touch soon 🙌",

    "footer.phone": "📞 +972 50-000-0000",
    "footer.copy": "© 2026 Speaker Name. All rights reserved.",

    "cards.lectures": [
      { icon: "🚀", title: "Breaking Forward", desc: "A motivational talk on leaving your comfort zone and achieving goals.", tag: "Youth" },
      { icon: "🧠", title: "Mental Resilience", desc: "Practical tools for coping with stress, failure and change.", tag: "Adults" },
      { icon: "🤝", title: "The Power of Leadership", desc: "What turns an ordinary person into a leader — stories and insights.", tag: "Organizations" },
      { icon: "💡", title: "Creative Thinking", desc: "How to develop ideas, break patterns and innovate.", tag: "Youth" },
      { icon: "❤️", title: "Relationships", desc: "Communication, listening and genuine connection between people.", tag: "Adults" },
      { icon: "🌍", title: "A Changing World", desc: "Adapting ourselves to the fast technological era.", tag: "General" }
    ]
  }
};

/* ----------------------------------------------------------------
   מחירונים — ערכים נפרדים כדי שיהיה קל לעדכן מחירים והנחות.
   כל חבילה: id, מחיר, מטבע, ורשימת מה-כלול (he/en).
   ---------------------------------------------------------------- */
const PRICING = [
  {
    id: "youth",
    popular: false,
    price: 1500,
    currency: "₪",
    name: { he: "הרצאה לנוער", en: "Youth Talk" },
    desc: { he: "מותאמת לבתי ספר ותנועות נוער", en: "Tailored for schools & youth groups" },
    features: {
      he: ["עד 60 דקות", "כיתה / שכבה / מליאה", "התאמה לגיל ולנושא", "מצגת ווידאו מלווים"],
      en: ["Up to 60 minutes", "Class / grade / assembly", "Age & topic adaptation", "Slides & video included"]
    }
  },
  {
    id: "adults",
    popular: true,
    price: 2500,
    currency: "₪",
    name: { he: "הרצאה למבוגרים", en: "Adults Talk" },
    desc: { he: "לארגונים, אירועים וערבי העשרה", en: "For organizations, events & enrichment evenings" },
    features: {
      he: ["60–90 דקות", "התאמה אישית לארגון", "סשן שאלות ותשובות", "מצגת ווידאו מלווים", "פגישת היכרות מקדימה"],
      en: ["60–90 minutes", "Custom-tailored to your org", "Q&A session", "Slides & video included", "Pre-event intro meeting"]
    }
  },
  {
    id: "custom",
    popular: false,
    price: null,
    currency: "₪",
    name: { he: "מותאם אישית", en: "Custom" },
    desc: { he: "סדנאות, סדרות וחבילות מיוחדות", en: "Workshops, series & special packages" },
    features: {
      he: ["סדרת הרצאות", "סדנאות מעמיקות", "ליווי לאורך זמן", "מחיר לפי היקף"],
      en: ["Lecture series", "In-depth workshops", "Ongoing guidance", "Price by scope"]
    }
  }
];

/* ----------------------------------------------------------------
   רילסים — שמות קבצים קבועים. כדי להציג סרטון: שימו קובץ בשם
   reel1.mp4 / reel2.mp4 / reel3.mp4 / reel4.mp4 בתיקייה assets/videos/
   (אותיות קטנות!). קובץ שחסר — מוצג אוטומטית רקע צבעוני במקומו.
   אפשר גם תמונת תצוגה: reel1.jpg וכו' בתיקייה assets/images/.
   ---------------------------------------------------------------- */
const REELS = [
  { src: "assets/videos/reel1.mp4", poster: "assets/images/reel1.jpg", title: { he: "רגע מהבמה #1", en: "Stage moment #1" } },
  { src: "assets/videos/reel2.mp4", poster: "assets/images/reel2.jpg", title: { he: "רגע מהבמה #2", en: "Stage moment #2" } },
  { src: "assets/videos/reel3.mp4", poster: "assets/images/reel3.jpg", title: { he: "רגע מהבמה #3", en: "Stage moment #3" } },
  { src: "assets/videos/reel4.mp4", poster: "assets/images/reel4.jpg", title: { he: "רגע מהבמה #4", en: "Stage moment #4" } }
];

/* ----------------------------------------------------------------
   פרטי קשר — עדכנו כאן את מספר הוואטסאפ (בפורמט בינלאומי, ללא +).
   ---------------------------------------------------------------- */
const CONTACT = {
  whatsapp: "972500000000", // לדוגמה: 972501234567
  whatsappMsg: { he: "היי! אשמח לשמוע פרטים על הזמנת הרצאה 🙂", en: "Hi! I'd love details about booking a talk 🙂" }
};
