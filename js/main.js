/* ============================================================
   main.js — לוגיקת האתר
   ============================================================ */

(function () {
  "use strict";

  const LANGS = { he: { dir: "rtl", next: "EN" }, en: { dir: "ltr", next: "עב" } };
  let lang = localStorage.getItem("siteLang") || "he";

  /* ---------- החלפת שפה + החלת תרגומים ---------- */
  function applyLang(next) {
    lang = next;
    localStorage.setItem("siteLang", lang);

    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", LANGS[lang].dir);

    // טקסטים רגילים
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = TRANSLATIONS[lang][key];
      if (val === undefined) return;
      if (key === "meta.title") { document.title = val; return; }
      if (key === "meta.description") {
        const m = document.querySelector('meta[name="description"]');
        if (m) m.setAttribute("content", val);
        return;
      }
      el.textContent = val;
    });

    // כפתור החלפת השפה מציג את השפה הבאה
    const toggle = document.querySelector(".lang-toggle__current");
    if (toggle) toggle.textContent = LANGS[lang].next;

    // הזרקה מחדש של תוכן דינמי (כרטיסים/מחירים/רילסים) בשפה הנכונה
    renderLectures();
    renderPricing();
    renderReels();
    updateWhatsapp();
  }

  /* ---------- כרטיסי הרצאות ---------- */
  function renderLectures() {
    const grid = document.getElementById("lecturesGrid");
    if (!grid) return;
    const items = TRANSLATIONS[lang]["cards.lectures"] || [];
    grid.innerHTML = items.map((c) => `
      <article class="card reveal">
        <span class="card__tag">${c.tag}</span>
        <div class="card__icon">${c.icon}</div>
        <h3 class="card__title">${c.title}</h3>
        <p class="card__desc">${c.desc}</p>
      </article>
    `).join("");
    observeReveals(grid);
  }

  /* ---------- מחירונים ---------- */
  function renderPricing() {
    const grid = document.getElementById("pricingGrid");
    if (!grid) return;
    const t = TRANSLATIONS[lang];
    grid.innerHTML = PRICING.map((p) => {
      const priceHtml = p.price === null
        ? `<div class="price-card__price">${lang === "he" ? "בהתאמה" : "Custom"}</div>`
        : `<div class="price-card__from">${t["pricing.from"]}</div>
           <div class="price-card__price">${p.currency}${p.price.toLocaleString()} <small>${lang === "he" ? "להרצאה" : "/ talk"}</small></div>`;
      const feats = p.features[lang].map((f) => `<li>${f}</li>`).join("");
      return `
        <div class="price-card ${p.popular ? "price-card--popular" : ""} reveal">
          ${p.popular ? `<span class="price-card__badge">${t["pricing.popular"]}</span>` : ""}
          <h3 class="price-card__name">${p.name[lang]}</h3>
          <p class="price-card__desc">${p.desc[lang]}</p>
          ${priceHtml}
          <ul class="price-card__features">${feats}</ul>
          <a href="#contact" class="btn btn--primary">${t["pricing.cta"]}</a>
        </div>`;
    }).join("");
    observeReveals(grid);
  }

  /* ---------- רילסים ---------- */
  function renderReels() {
    const grid = document.getElementById("reelsGrid");
    if (!grid) return;
    const playLabel = TRANSLATIONS[lang]["reels.play"];
    const placeholderHTML = `<div class="reel__placeholder"><span class="reel__ph-icon">🎬</span><span class="reel__ph-soon">${TRANSLATIONS[lang]["reels.soon"]}</span></div>`;
    grid.innerHTML = REELS.map((r) => {
      const media = r.src
        ? `<video src="${r.src}" ${r.poster ? `poster="${r.poster}"` : ""} preload="metadata" playsinline></video>`
        : placeholderHTML;
      return `
        <div class="reel reveal" data-has-video="${r.src ? "1" : "0"}">
          ${media}
          <div class="reel__play" aria-label="${playLabel}">▶</div>
          <div class="reel__overlay"><span class="reel__title">${r.title[lang]}</span></div>
        </div>`;
    }).join("");

    // אם קובץ הווידאו חסר (404) — מחליפים בכרטיס "בקרוב" אלגנטי במקום וידאו שבור
    grid.querySelectorAll("video").forEach((video) => {
      video.addEventListener("error", () => {
        const reel = video.closest(".reel");
        if (!reel) return;
        reel.setAttribute("data-has-video", "0");
        const tpl = document.createElement("template");
        tpl.innerHTML = placeholderHTML;
        video.replaceWith(tpl.content.firstElementChild);
      });
    });

    // הפעלת וידאו בלחיצה (רק אם יש קובץ)
    grid.querySelectorAll(".reel").forEach((reel) => {
      reel.addEventListener("click", () => {
        const video = reel.querySelector("video");
        if (!video) return; // אין עדיין קובץ — placeholder בלבד
        reel.classList.add("playing");
        video.controls = true;
        video.play();
      });
    });
    observeReveals(grid);
  }

  /* ---------- וואטסאפ ---------- */
  function updateWhatsapp() {
    const msg = encodeURIComponent(CONTACT.whatsappMsg[lang]);
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${msg}`;
    ["whatsappLink", "fabWhatsapp"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = url;
    });
  }

  /* ---------- Scroll reveal ---------- */
  let revealObserver;
  function initRevealObserver() {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
  }
  function observeReveals(scope) {
    (scope || document).querySelectorAll(".reveal:not(.in)").forEach((el) => revealObserver.observe(el));
  }

  /* ---------- ספירת מספרים בסטטיסטיקות ---------- */
  function animateCount(el) {
    const target = +el.getAttribute("data-count");
    const dur = 1600;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }
  function initCounters() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll(".stat__num").forEach((el) => obs.observe(el));
  }

  /* ---------- Navbar: scroll state + תפריט מובייל ---------- */
  function initNav() {
    const nav = document.getElementById("nav");
    const burger = document.getElementById("navBurger");
    const links = document.getElementById("navLinks");

    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });

    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        burger.classList.remove("open");
        links.classList.remove("open");
      })
    );
  }

  /* ---------- טופס הזמנה ---------- */
  function initForm() {
    const form = document.getElementById("bookingForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      // שליחה דרך וואטסאפ עם הפרטים שמולאו (אפשר להחליף בשליחת מייל/שרת בהמשך)
      const data = new FormData(form);
      const typeSel = form.querySelector("#type");
      const typeText = typeSel.options[typeSel.selectedIndex].textContent;
      // חילוץ הספרות בלבד (בלי מקפים/X) + ודא שכל הספרות מולאו
      const rawDigits = String(data.get("phone") || "").replace(/\D/g, "");
      if (rawDigits.length < 9) {
        const pin = form.querySelector("#phone");
        pin.setCustomValidity(lang === "he" ? "אנא מלאו את כל ספרות הטלפון" : "Please fill in the full phone number");
        pin.reportValidity();
        return;
      }
      // הוספת קידומת +972 (מסירים 0 מוביל אם יש)
      const phone = "+972 " + rawDigits.replace(/^0+/, "");
      const lines = lang === "he"
        ? `הזמנת הרצאה:\nשם: ${data.get("name")}\nטלפון: ${phone}\nסוג: ${typeText}\nהודעה: ${data.get("message") || "-"}`
        : `Lecture booking:\nName: ${data.get("name")}\nPhone: ${phone}\nType: ${typeText}\nMessage: ${data.get("message") || "-"}`;
      window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines)}`, "_blank");

      form.querySelector("#formSuccess").hidden = false;
      form.reset();
      form.querySelector("#phone").dispatchEvent(new Event("input")); // איפוס שכבת הרפאים לתבנית
    });
  }

  /* ---------- מסכת טלפון: XX-XXX-XXXX, כל ספרה אוכלת X אחד ---------- */
  function initPhoneMask() {
    const input = document.getElementById("phone");
    const ghost = document.getElementById("phoneGhost");
    if (!input || !ghost) return;
    const template = "XX-XXX-XXXX";
    const slots = [];
    for (let i = 0; i < template.length; i++) if (template[i] === "X") slots.push(i);

    function fullFormat(digits) {
      const chars = template.split("");
      for (let i = 0; i < slots.length; i++) {
        chars[slots[i]] = i < digits.length ? digits[i] : "X";
      }
      return chars.join("");
    }

    function render() {
      const digits = (input.value.match(/\d/g) || []).join("").slice(0, slots.length);
      if (!digits.length) {
        input.value = "";
        ghost.innerHTML = `<span class="g-rest">${template}</span>`; // ריק => כל התבנית אפורה
        return;
      }
      const full = fullFormat(digits);
      const cut = slots[digits.length - 1] + 1;  // עד אחרי הספרה האחרונה (כולל מקפים שביניהן)
      const typed = full.slice(0, cut);
      input.value = typed;                       // התיבה מכילה רק את מה שהוקלד — בצבע בהיר
      // רפאים: עותק שקוף של מה שהוקלד (לרוחב) + שארית ה-X-ים באפור עמום קבוע
      ghost.innerHTML = `<span class="g-typed">${typed}</span><span class="g-rest">${full.slice(cut)}</span>`;
      input.setSelectionRange(typed.length, typed.length);
    }

    input.addEventListener("input", () => { input.setCustomValidity(""); render(); });
    render(); // מצב התחלתי — מציג את התבנית האפורה
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initRevealObserver();
    applyLang(lang);          // מזריק תוכן + מתרגם
    observeReveals(document); // אלמנטים סטטיים
    initCounters();
    initNav();
    initForm();
    initPhoneMask();

    document.getElementById("langToggle").addEventListener("click", () => {
      applyLang(lang === "he" ? "en" : "he");
    });
  });
})();
