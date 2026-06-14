/* ============================================================
   translations.js
   מילון תרגום דו-לשוני (עברית / אנגלית).
   כדי לערוך טקסט באתר — שנו כאן את הערכים. כל מפתח מופיע
   ב-HTML דרך data-i18n="key".
   ============================================================ */

const TRANSLATIONS = {
  he: {
    "meta.title": "מאיה כהן הראל | הרצאות שמשאירות חותם",
    "meta.description": "הרצאות מרתקות לנוער ולמבוגרים — הזמינו הרצאה עכשיו",

    "nav.brand": "מאיה כהן הראל",
    "nav.about": "אודות",
    "nav.lectures": "הרצאות",
    "nav.reels": "רגעים",
    "nav.pricing": "מחירים",
    "nav.contact": "צור קשר",
    "nav.book": "הזמנת הרצאה",
    "nav.testimonials": "המלצות",

    "hero.badge": "🎤 מרצה ומנחה",
    "hero.eyebrow": "הרצאות העשרה • השראה • תוכן",
    "hero.title": "הרצאות שמשאירות חותם.",
    // המילה המתחלפת בכותרת (effects.js) — הבסיס + רשימת המילים
    "hero.titleBase": "הרצאות שמשאירות",
    "hero.titleWords": ["חותם.", "השראה.", "חיוך.", "אנרגיה."],
    "hero.subtitle": "חוויה שמשלבת ידע, רגש והומור — מותאמת לנוער ולמבוגרים, בכל מסגרת.",
    "hero.ctaBook": "הזמינו הרצאה",
    "hero.ctaWatch": "▶ צפו ברגעים",
    "hero.stat1": "הרצאות",
    "hero.stat2": "מאזינים",
    "hero.stat3": "שנות ניסיון",

    "about.eyebrow": "קצת עליי",
    "about.title": "מי עומדת מאחורי הבמה",
    "about.p1": "כבר למעלה מעשור אני עולה לבמות מול קהלים מגוונים — מבני נוער ועד מנהלים בכירים. ההרצאות שלי משלבות סיפור אישי, תובנות מעשיות והרבה אנרגיה, ומשאירות את הקהל עם משהו לקחת הביתה.",
    "about.p2": "כל הרצאה נבנית בהתאמה אישית לקהל ולמטרה — בין אם זו הרצאת מוטיבציה לנוער, יום גיבוש לארגון, או ערב העשרה קהילתי.",
    "about.li1": "✦ הרצאות מותאמות אישית לכל קהל",
    "about.li2": "✦ שילוב סיפור, הומור ותוכן מעשי",
    "about.li3": "✦ ניסיון מול אלפי מאזינים בכל הארץ",
    "about.chipYears": "שנים על הבמה",

    "lectures.eyebrow": "מה אני מעבירה",
    "lectures.title": "ההרצאות שלי",
    "lectures.sub": "מבחר נושאים — צרו קשר להזמנה.",

    "reels.eyebrow": "טעימה מהבמה",
    "reels.title": "רגעים מתוך ההרצאות",
    "reels.sub": "קליפים קצרים שנותנים טעימה מהאנרגיה ומהמסר.",
    "reels.play": "נגן",
    "reels.soon": "בקרוב",

    "testimonials.eyebrow": "מה אומרים עלי",
    "testimonials.title": "קולות מהקהל",
    "testimonials.sub": "ארגונים, בתי ספר ועמותות שכבר חוו את ההרצאה — בדברים שלהם.",

    "pricing.eyebrow": "חבילות והזמנה",
    "pricing.title": "מחירון הרצאות",
    "pricing.sub": "מחירים מעודכנים. ניתן לשלב מספר הרצאות בהנחה — דברו איתי.",
    "pricing.note": "💡 הנחות: הזמנת חבילה של 3 הרצאות ומעלה — 15% הנחה. מוסדות חינוך ועמותות — צרו קשר למחיר מיוחד.",
    "pricing.cta": "להזמנה",
    "pricing.popular": "הכי פופולרי",
    "pricing.from": "החל מ-",

    "cta.title": "מוכנים להרים את האירוע הבא?",
    "cta.sub": "בואו נבנה ביחד חוויה שהקהל לא ישכח.",
    "cta.btn": "צרו קשר עכשיו",

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
    "contact.consent": "בלחיצה על \"שליחה\" ייפתח וואטסאפ עם הפרטים שמילאתם כדי שתשלחו אותם אליי, ואני אחזור אליכם בנוגע לפנייה. אינני שומרת את הפרטים בשרת. למידע נוסף:",
    "contact.privacyLink": "מדיניות פרטיות",

    "footer.phone": "📞 052-854-3393",
    "footer.copy": "© {year} מאיה כהן הראל. כל הזכויות שמורות.",
    "footer.privacy": "מדיניות פרטיות",

    "a11y.skip": "דלגו לתוכן הראשי",

    "process.eyebrow": "מהזמנה לבמה",
    "process.title": "איך זה עובד?",
    "process.sub": "ארבעה צעדים פשוטים — מהפנייה הראשונה ועד הרצאה שהקהל זוכר.",

    "faq.eyebrow": "יש שאלות?",
    "faq.title": "שאלות נפוצות",
    "faq.sub": "כל מה שחשוב לדעת לפני שמזמינים — ואם משהו חסר, פשוט תשאלו.",

    // פס הקהלים הנע — הוסיפו/הסירו פריטים בחופשיות
    "marquee.items": [
      "🏫 בתי ספר", "🏢 חברות וארגונים", "🏛️ עיריות ורשויות", "⚜️ תנועות נוער",
      "🎗️ עמותות", "🎓 מכללות", "👥 ימי גיבוש", "🌟 ערבי קהילה", "🎤 כנסים ואירועים"
    ],

    // שלבי "איך זה עובד"
    "cards.process": [
      { icon: "📞", title: "שיחת היכרות", desc: "מספרים לי על הקהל, המטרה והאירוע — בטלפון או בוואטסאפ, בלי התחייבות." },
      { icon: "🎯", title: "התאמה אישית", desc: "בונים יחד את ההרצאה המדויקת — נושא, אורך, דגשים וסיפורים שמתאימים בדיוק לכם." },
      { icon: "🎤", title: "ההרצאה עצמה", desc: "מגיעה מוכנה, מחוברת ומחויכת — ונותנת לקהל שלכם חוויה שלא שוכחים." },
      { icon: "💬", title: "ליווי והמשך", desc: "נשארת זמינה גם אחרי — למשוב, חומרים נלווים והרצאות המשך." }
    ],

    // שאלות נפוצות
    "cards.faq": [
      { q: "כמה זמן נמשכת הרצאה?", a: "הרצאה סטנדרטית נמשכת 60 דקות, ולמבוגרים אפשר להאריך עד 90 דקות כולל שאלות ותשובות. הכל גמיש ומתואם מראש לפי האירוע שלכם." },
      { q: "לאילו קהלים ההרצאות מתאימות?", a: "מבני נוער בחטיבות ותיכונים ועד צוותים בארגונים, עיריות, עמותות וערבי קהילה. כל הרצאה מותאמת מראש לגיל, לרקע ולמטרה של הקהל." },
      { q: "האם אתם מגיעים לכל הארץ?", a: "כן! ההרצאות מתקיימות בכל רחבי הארץ. לאירועים מרוחקים ייתכן תיאום נסיעות — נסגור הכל מראש בשיחה." },
      { q: "מה צריך להכין מבחינת ציוד?", a: "בסך הכל מקרן או מסך, מערכת הגברה ומיקרופון. אני מגיעה עם המצגת והסרטונים — ואם אין ציוד, נמצא פתרון יחד." },
      { q: "כמה זמן מראש כדאי להזמין?", a: "מומלץ לפחות 2–3 שבועות מראש כדי להבטיח את התאריך ולהספיק להתאים את התוכן. דחוף יותר? צרו קשר — לפעמים יש פתרונות." },
      { q: "האם יש הנחות לחבילות?", a: "כן — בהזמנת 3 הרצאות ומעלה יש 15% הנחה, ולמוסדות חינוך ועמותות יש מחירים מיוחדים. דברו איתי ונבנה חבילה משתלמת." }
    ],

    // כרטיסי הרצאות — ערכו/הוסיפו לפי הצורך
    "cards.lectures": [
      { icon: "🚀", title: "פורצים קדימה", desc: "הרצאת מוטיבציה על יציאה מאזור הנוחות והגשמת מטרות.", tag: "נוער" },
      { icon: "🧠", title: "חוסן מנטלי", desc: "כלים מעשיים להתמודדות עם לחץ, כישלון ושינוי.", tag: "מבוגרים" },
      { icon: "🤝", title: "כוחה של מנהיגות", desc: "מה הופך אדם רגיל למוביל — סיפורים ותובנות.", tag: "ארגונים" },
      { icon: "💡", title: "חשיבה יצירתית", desc: "איך לפתח רעיונות, לשבור דפוסים ולחדש.", tag: "נוער" },
      { icon: "❤️", title: "מערכות יחסים", desc: "תקשורת, הקשבה וחיבור אמיתי בין אנשים.", tag: "מבוגרים" },
      { icon: "🌍", title: "עולם משתנה", desc: "להתאים את עצמנו לעידן הטכנולוגי המהיר.", tag: "כללי" }
    ]
    ,

    "cards.testimonials": [
      { quote: "ציפינו להרצאה טובה, קיבלנו חוויה שלמה. מאיה מצליחה לגעת בלב מבלי לאבד אף שנייה את תשומת הלב של הקהל.", name: "מיכל לוי", role: "רכזת חינוך", org: "עיריית רמת גן", initials: "מ" },
      { quote: "יום הגיבוש שלנו קיבל מימד חדש לגמרי. ההרצאה שילבה הומור, תוכן ממשי וכלים שאנשי הצוות לוקחים עד היום.", name: "דרור כהן", role: "מנהל משאבי אנוש", org: "חברת טכנולוגיה מובילה", initials: "ד" },
      { quote: "כבר ראיתי הרצאות רבות — זו שונה. מאיה יודעת לקרוא את הקהל ולהתאים את עצמה בדיוק למה שצריך, בדיוק ברגע הנכון.", name: "שרית אברהמי", role: "מנהלת אירועים", org: "עמותת קהילה וחינוך", initials: "ש" }
    ]
  },

  en: {
    "meta.title": "Maya Cohen Harel | Talks That Leave a Mark",
    "meta.description": "Captivating talks for teens and adults — book a lecture now",

    "nav.brand": "Maya Cohen Harel",
    "nav.about": "About",
    "nav.lectures": "Lectures",
    "nav.reels": "Moments",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.book": "Book a Talk",
    "nav.testimonials": "Reviews",

    "hero.badge": "🎤 Lecturer & Facilitator",
    "hero.eyebrow": "Enrichment • Inspiration • Content",
    "hero.title": "Talks that leave a mark.",
    "hero.titleBase": "Talks that leave a",
    "hero.titleWords": ["mark.", "spark.", "smile.", "memory."],
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
    "about.chipYears": "years on stage",

    "lectures.eyebrow": "What I deliver",
    "lectures.title": "My Lectures",
    "lectures.sub": "A selection of topics — get in touch to book.",

    "reels.eyebrow": "A taste of the stage",
    "reels.title": "Moments from the talks",
    "reels.sub": "Short clips that give a taste of the energy and the message.",
    "reels.play": "Play",
    "reels.soon": "Coming soon",

    "testimonials.eyebrow": "What people say",
    "testimonials.title": "Voices from the audience",
    "testimonials.sub": "Organizations, schools and nonprofits that have experienced the talk — in their own words.",

    "pricing.eyebrow": "Packages & booking",
    "pricing.title": "Lecture Pricing",
    "pricing.sub": "Up-to-date prices. Combine several talks for a discount — let's talk.",
    "pricing.note": "💡 Discounts: book a package of 3+ talks — 15% off. Schools & nonprofits — contact me for a special rate.",
    "pricing.cta": "Book now",
    "pricing.popular": "Most popular",
    "pricing.from": "From",

    "cta.title": "Ready to elevate your next event?",
    "cta.sub": "Let's build an experience together that your audience won't forget.",
    "cta.btn": "Get in touch now",

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
    "contact.consent": "Clicking \"Send\" opens WhatsApp with the details you entered so you can send them to me, and I'll get back to you about your request. I do not store the details on a server. Learn more:",
    "contact.privacyLink": "Privacy Policy",

    "footer.phone": "📞 +972 52-854-3393",
    "footer.copy": "© {year} Maya Cohen Harel. All rights reserved.",
    "footer.privacy": "Privacy Policy",

    "a11y.skip": "Skip to main content",

    "process.eyebrow": "From booking to stage",
    "process.title": "How does it work?",
    "process.sub": "Four simple steps — from the first call to a talk your audience remembers.",

    "faq.eyebrow": "Got questions?",
    "faq.title": "Frequently Asked Questions",
    "faq.sub": "Everything you need to know before booking — and if something's missing, just ask.",

    "marquee.items": [
      "🏫 Schools", "🏢 Companies & Orgs", "🏛️ Municipalities", "⚜️ Youth Movements",
      "🎗️ Nonprofits", "🎓 Colleges", "👥 Team Days", "🌟 Community Evenings", "🎤 Conferences & Events"
    ],

    "cards.process": [
      { icon: "📞", title: "Intro Call", desc: "Tell me about your audience, goal and event — by phone or WhatsApp, no commitment." },
      { icon: "🎯", title: "Custom Fit", desc: "Together we shape the exact talk — topic, length, emphases and stories that fit you perfectly." },
      { icon: "🎤", title: "The Talk", desc: "I arrive prepared, connected and smiling — giving your audience an unforgettable experience." },
      { icon: "💬", title: "Follow-up", desc: "I stay available afterwards — for feedback, supporting materials and follow-up talks." }
    ],

    "cards.faq": [
      { q: "How long is a talk?", a: "A standard talk runs 60 minutes; for adults it can extend to 90 minutes including Q&A. Everything is flexible and coordinated in advance for your event." },
      { q: "Which audiences are the talks for?", a: "From middle and high school students to teams in organizations, municipalities, nonprofits and community evenings. Every talk is tailored in advance to the audience's age, background and goal." },
      { q: "Do you travel anywhere in the country?", a: "Yes! Talks take place all over the country. For remote events travel arrangements may apply — we'll settle everything up front." },
      { q: "What equipment is needed?", a: "Just a projector or screen, a sound system and a microphone. I bring the slides and videos — and if equipment is missing, we'll find a solution together." },
      { q: "How far in advance should I book?", a: "At least 2–3 weeks ahead is recommended, to secure the date and tailor the content. In a rush? Get in touch — sometimes there are solutions." },
      { q: "Are there package discounts?", a: "Yes — booking 3+ talks gets 15% off, and schools & nonprofits get special rates. Let's talk and build a package that works." }
    ],

    "cards.lectures": [
      { icon: "🚀", title: "Breaking Forward", desc: "A motivational talk on leaving your comfort zone and achieving goals.", tag: "Youth" },
      { icon: "🧠", title: "Mental Resilience", desc: "Practical tools for coping with stress, failure and change.", tag: "Adults" },
      { icon: "🤝", title: "The Power of Leadership", desc: "What turns an ordinary person into a leader — stories and insights.", tag: "Organizations" },
      { icon: "💡", title: "Creative Thinking", desc: "How to develop ideas, break patterns and innovate.", tag: "Youth" },
      { icon: "❤️", title: "Relationships", desc: "Communication, listening and genuine connection between people.", tag: "Adults" },
      { icon: "🌍", title: "A Changing World", desc: "Adapting ourselves to the fast technological era.", tag: "General" }
    ]
    ,

    "cards.testimonials": [
      { quote: "We expected a good talk, we got a full experience. Maya manages to touch hearts without losing the audience's attention for a single second.", name: "Michal Levi", role: "Education Coordinator", org: "Ramat Gan Municipality", initials: "M" },
      { quote: "Our team day took on a whole new dimension. The talk blended humor, real content and tools that our people still use today.", name: "Dror Cohen", role: "HR Manager", org: "Leading Tech Company", initials: "D" },
      { quote: "I've seen many talks — this one is different. Maya knows how to read the room and adapt precisely to what's needed, at exactly the right moment.", name: "Sarit Avrahami", role: "Events Manager", org: "Community & Education NGO", initials: "S" }
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
    price: 2000,
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
    price: 4500,
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
  { src: "assets/videos/reel1.mp4", poster: "assets/images/reel1.jpg", title: { he: "זמן לא מרפא כלום", en: "Time heals nothing" } },
  { src: "assets/videos/reel2.mp4", poster: "assets/images/reel2.jpg", title: { he: "כל יום זה פחות יום", en: "Every day is one day less" } },
  { src: "assets/videos/reel3.mp4", poster: "assets/images/reel3.jpg", title: { he: "הרגע שהכל התנפץ", en: "When everything shattered" } },
  { src: "assets/videos/reel4.mp4", poster: "assets/images/reel4.jpg", title: { he: "והחיוך שלי חזר", en: "And my smile came back" } }
];

/* ----------------------------------------------------------------
   פרטי קשר — עדכנו כאן את מספר הוואטסאפ (בפורמט בינלאומי, ללא +).
   ---------------------------------------------------------------- */
const CONTACT = {
  whatsapp: "972528543393", // מאיה כהן הראל
  whatsappMsg: { he: "היי! אשמח לשמוע פרטים על הזמנת הרצאה 🙂", en: "Hi! I'd love details about booking a talk 🙂" }
};
