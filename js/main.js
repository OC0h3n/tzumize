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
      // {year} בזכויות היוצרים מתעדכן אוטומטית לשנה הנוכחית
      el.textContent = val.replace("{year}", new Date().getFullYear());
    });

    // כפתור החלפת השפה מציג את השפה הבאה
    const toggle = document.querySelector(".lang-toggle__current");
    if (toggle) toggle.textContent = LANGS[lang].next;

    // הזרקה מחדש של תוכן דינמי (כרטיסים/מחירים/רילסים) בשפה הנכונה
    renderLectures();
    renderPricing();
    renderReels();
    renderTestimonials();
    renderMarquee();
    updateWhatsapp();

    // מודיע ל-effects.js שהשפה הוחלפה (למשל בשביל המילה המתחלפת בהירו)
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  /* ---------- כרטיסי הרצאות ---------- */
  function renderLectures() {
    const grid = document.getElementById("lecturesGrid");
    if (!grid) return;
    const items = TRANSLATIONS[lang]["cards.lectures"] || [];
    grid.innerHTML = items.map((c) => `
      <article class="card reveal">
        <span class="card__tag">${c.tag}</span>
        <div class="card__icon">${ICONS[c.icon] || ""}</div>
        <h3 class="card__title">${c.title}</h3>
        <p class="card__desc">${c.desc}</p>
      </article>
    `).join("");
    applyStagger(grid);
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
    applyStagger(grid);
    observeReveals(grid);
  }

  /* ---------- רילסים ---------- */
  function renderReels() {
    const grid = document.getElementById("reelsGrid");
    if (!grid) return;
    const playLabel = TRANSLATIONS[lang]["reels.play"];
    const placeholderHTML = `<div class="reel__placeholder"><span class="reel__ph-icon">${ICONS.film}</span><span class="reel__ph-soon">${TRANSLATIONS[lang]["reels.soon"]}</span></div>`;
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

    // וידאו אחד בכל פעם: הפעלה עוצרת את כל השאר; בסיום — חוזרים למצב התצוגה
    grid.querySelectorAll("video").forEach((video) => {
      video.addEventListener("play", () => {
        grid.querySelectorAll("video").forEach((other) => {
          if (other !== video) other.pause();
        });
      });
      video.addEventListener("ended", () => {
        const reel = video.closest(".reel");
        if (!reel) return;
        reel.classList.remove("playing");
        video.controls = false;
        video.currentTime = 0;
      });
    });
    applyStagger(grid);
    observeReveals(grid);
  }

  /* ---------- פס קהלים נע ---------- */
  function renderMarquee() {
    const track = document.getElementById("marqueeTrack");
    if (!track) return;
    const items = TRANSLATIONS[lang]["marquee.items"] || [];
    const chips = items.map((m) => `<span class="marquee__item">${m}</span>`).join("");
    // שתי עותקים — כשהראשון יוצא מהמסך השני נכנס, ללולאה חלקה
    track.innerHTML = chips + chips;
  }

  /* ---------- המלצות ---------- */
  function renderTestimonials() {
    const grid = document.getElementById("testimonialsGrid");
    if (!grid) return;
    const items = TRANSLATIONS[lang]["cards.testimonials"] || [];
    grid.innerHTML = items.map((t) => `
      <div class="testimonial reveal">
        <div class="testimonial__stars">★★★★★</div>
        <span class="testimonial__quote">"</span>
        <p class="testimonial__text">${t.quote}</p>
        <div class="testimonial__author">
          <div class="testimonial__avatar">${t.initials}</div>
          <div>
            <div class="testimonial__name">${t.name}</div>
            <div class="testimonial__role">${t.role} · ${t.org}</div>
          </div>
        </div>
      </div>`).join("");
    applyStagger(grid);
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
  /* כניסה מדורגת — כל כרטיס נחשף מעט אחרי קודמו (תחושת Motion-Driven) */
  function applyStagger(grid, step) {
    if (!grid) return;
    [...grid.children].forEach((el, i) => {
      if (el.classList.contains("reveal")) el.style.setProperty("--reveal-delay", (i * (step || 70)) + "ms");
    });
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

    const overlay = document.createElement("div");
    overlay.className = "nav__overlay";
    document.body.appendChild(overlay);

    function closeNav() {
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      links.classList.remove("open");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    function syncScrolled() { nav.classList.toggle("scrolled", window.scrollY > 40); }
    window.addEventListener("scroll", syncScrolled, { passive: true });
    syncScrolled(); // גם אם הדף נטען כבר גלול (רענון באמצע הדף)

    burger.addEventListener("click", () => {
      const isOpen = burger.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(isOpen));
      links.classList.toggle("open");
      overlay.classList.toggle("active", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    overlay.addEventListener("click", closeNav);

    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", closeNav)
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Scrollspy: הדגשת הקישור הפעיל בתפריט לפי הגלילה ---------- */
  function initScrollSpy() {
    const links = document.querySelectorAll(".nav__links a[href^='#']");
    if (!links.length) return;
    const map = new Map(); // section id -> link
    links.forEach((a) => {
      const sec = document.querySelector(a.getAttribute("href"));
      if (sec) map.set(sec, a);
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.remove("active"));
        const link = map.get(e.target);
        if (link) link.classList.add("active");
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    map.forEach((_, sec) => obs.observe(sec));
  }

  /* ---------- סרגל התקדמות קריאה ---------- */
  function initProgressBar() {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${p})`;
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  /* ---------- כפתור חזרה למעלה ---------- */
  function initBackToTop() {
    const btn = document.getElementById("toTop");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
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
      if (rawDigits.length !== 9) {
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

      const success = form.querySelector("#formSuccess");
      success.hidden = false;
      setTimeout(() => { success.hidden = true; }, 7000); // ההודעה נעלמת לבד

      // קונפטי! effects.js מאזין ומפוצץ מהכפתור
      const sendBtn = form.querySelector("button[type='submit']");
      const br = sendBtn.getBoundingClientRect();
      document.dispatchEvent(new CustomEvent("bookingSuccess", {
        detail: { x: br.left + br.width / 2, y: br.top + br.height / 2 }
      }));
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
    initScrollSpy();
    initProgressBar();
    initBackToTop();

    document.getElementById("langToggle").addEventListener("click", () => {
      applyLang(lang === "he" ? "en" : "he");
    });
  });
})();
