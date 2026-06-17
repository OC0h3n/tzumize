/* ============================================================
   effects.js — אפקטים מתקדמים ("וואו")
   שדה חלקיקים, tilt תלת-ממדי, כפתורים מגנטיים, מילה מתחלפת
   בהירו, זוהר עוקב-עכבר, פרלקסה וקונפטי. ואניל JS, בלי ספריות.
   הכל כבוי אוטומטית עבור prefers-reduced-motion, ואפקטי עכבר
   פועלים רק במכשירים עם סמן מדויק (לא מסכי מגע).
   ============================================================ */

(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = window.matchMedia("(pointer: fine)").matches;

  /* ---------- שדה חלקיקים אינטראקטיבי (רקע כל הדף) ---------- */
  function initParticles() {
    const canvas = document.createElement("canvas");
    canvas.className = "fx-stars";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let W, H;
    const mouse = { x: -9999, y: -9999 };
    let particles = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = W < 700 ? 26 : 52;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.8 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        tw: Math.random() * Math.PI * 2, // פאזת נצנוץ
        hue: Math.random() < 0.5 ? "124,92,255" : (Math.random() < 0.5 ? "0,212,255" : "255,255,255")
      }));
    }

    if (FINE) {
      window.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
      document.addEventListener("pointerleave", () => { mouse.x = -9999; mouse.y = -9999; });
    }
    window.addEventListener("resize", resize);
    resize();

    const LINK = 110; // מרחק מקסימלי לקו מקשר בין חלקיקים
    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.tw += 0.02;
        // העכבר דוחף חלקיקים קרובים — תחושה חיה
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) {
          const d = Math.sqrt(d2) || 1;
          p.x += (dx / d) * 1.4;
          p.y += (dy / d) * 1.4;
        }
        // יציאה מצד אחד = כניסה מהצד השני
        if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
        const a = 0.25 + Math.abs(Math.sin(p.tw)) * 0.45;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},${a})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            ctx.strokeStyle = `rgba(124,92,255,${(1 - Math.sqrt(d2) / LINK) * 0.13})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- זוהר רך שעוקב אחרי העכבר ---------- */
  function initGlow() {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);
    let tx = window.innerWidth / 2, ty = window.innerHeight / 3, x = tx, y = ty;
    window.addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function follow() {
      x += (tx - x) * 0.08; y += (ty - y) * 0.08; // ריחוף עם השהיה נעימה
      glow.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(follow);
    })();
  }

  /* ---------- Tilt תלת-ממדי + זוהר נקודתי על כרטיסים ----------
     מאזין גלובלי אחד (delegation) — שורד גם רינדור מחדש בהחלפת שפה */
  const TILT_SEL = ".card, .price-card, .testimonial, .step";
  function initTilt() {
    let current = null;
    const MAX = 9; // מעלות הטיה מקסימליות

    function reset(el) {
      el.classList.remove("fx-hover");
      el.style.transition = "transform 0.45s ease";
      el.style.transform = "";
      setTimeout(() => { if (el !== current) el.style.transition = ""; }, 450);
    }

    document.addEventListener("pointermove", (e) => {
      const el = e.target.closest(TILT_SEL);
      if (el !== current) {
        if (current) reset(current);
        current = el;
        if (current) current.style.transition = "transform 0.08s ease-out";
      }
      if (!current) return;
      const r = current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      current.style.transform =
        `perspective(900px) rotateX(${(0.5 - py) * MAX}deg) rotateY(${(px - 0.5) * MAX}deg) translateY(-6px)`;
      current.style.setProperty("--mx", (px * 100) + "%");
      current.style.setProperty("--my", (py * 100) + "%");
      current.classList.add("fx-hover");
    }, { passive: true });

    document.addEventListener("pointerleave", () => {
      if (current) { reset(current); current = null; }
    });
  }

  /* ---------- כפתורים מגנטיים — נמשכים לעבר הסמן ---------- */
  const MAG_SEL = ".btn--primary, .btn--cta, .btn--whatsapp, .btn--ghost, .lang-toggle, .fab-whatsapp";
  function initMagnetic() {
    let cur = null;
    document.addEventListener("pointermove", (e) => {
      const el = e.target.closest(MAG_SEL);
      if (el !== cur) {
        if (cur) { cur.style.transform = ""; setTimeout(((b) => () => { if (b !== cur) b.style.transition = ""; })(cur), 200); }
        cur = el;
        if (cur) cur.style.transition = "transform 0.15s ease-out";
      }
      if (!cur) return;
      const r = cur.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      cur.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
    }, { passive: true });
  }

  /* ---------- מילה מתחלפת בכותרת ההירו (אפקט מכונת כתיבה) ----------
     הטקסטים ב-translations.js: hero.titleBase + hero.titleWords */
  let rotGen = 0; // מונה דורות — מבטל לולאה ישנה כשמחליפים שפה
  function initWordRotate() {
    const h1 = document.querySelector(".hero__title");
    if (!h1 || typeof TRANSLATIONS === "undefined") return;
    const lang = document.documentElement.getAttribute("lang") || "he";
    const base = TRANSLATIONS[lang]["hero.titleBase"];
    const words = TRANSLATIONS[lang]["hero.titleWords"];
    if (!base || !words || !words.length) return;

    const my = ++rotGen;
    h1.textContent = "";
    h1.append(base + " ");
    const wordEl = document.createElement("span");
    wordEl.className = "rotate-word";
    const caret = document.createElement("span");
    caret.className = "rotate-caret";
    caret.setAttribute("aria-hidden", "true");
    h1.append(wordEl, caret);

    let wi = 0;
    function typeWord(word, ci) {
      if (my !== rotGen) return;
      wordEl.textContent = word.slice(0, ci);
      if (ci < word.length) setTimeout(() => typeWord(word, ci + 1), 85);
      else setTimeout(() => deleteWord(word, word.length), 2500);
    }
    function deleteWord(word, ci) {
      if (my !== rotGen) return;
      wordEl.textContent = word.slice(0, ci);
      if (ci > 0) setTimeout(() => deleteWord(word, ci - 1), 45);
      else {
        wi = (wi + 1) % words.length;
        setTimeout(() => typeWord(words[wi], 0), 350);
      }
    }
    typeWord(words[wi], 0);
  }

  /* ---------- פרלקסה בהירו — התוכן "נשאר מאחור" בגלילה ---------- */
  function initParallax() {
    const inner = document.querySelector(".hero__inner");
    const hint = document.querySelector(".hero__scroll");
    if (!inner) return;
    let tick = false;
    function onScroll() {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          inner.style.transform = `translateY(${y * 0.25}px)`;
          inner.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.8));
          if (hint) hint.style.opacity = Math.max(0, 1 - y / 200);
        }
        tick = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- כרטיס 3D אינטראקטיבי (תמונת המרצה) ----------
     ההטיה חזקה ומוחלקת, השכבות (צ'יפ/כדורים/ניצוץ) צפות בעומק,
     וברק נסחף על התמונה לפי מיקום הסמן. */
  function initPhoto3D() {
    const scene = document.getElementById("aboutScene");
    if (!scene) return;
    const tilt = scene.querySelector(".about__photo-tilt");
    const glare = scene.querySelector(".photo-glare");
    if (!tilt) return;
    const MAX = 16; // הטיה דרמטית יותר מהכרטיסים הרגילים
    let raf = 0, tx = 0, ty = 0;

    function onMove(e) {
      const r = scene.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      tx = (px - 0.5) * MAX;       // rotateY
      ty = (0.5 - py) * MAX;       // rotateX
      if (raf) return;
      raf = requestAnimationFrame(() => {
        tilt.style.transition = "transform 0.12s ease-out";
        tilt.style.transform =
          `rotateX(${ty}deg) rotateY(${tx}deg) translateY(-4px)`;
        if (glare) {
          glare.style.opacity = "1";
          glare.style.setProperty("--glare", (30 + px * 80) + "%");
        }
        raf = 0;
      });
    }
    function reset() {
      tilt.style.transition = "transform 0.6s cubic-bezier(0.2,0.8,0.2,1)";
      tilt.style.transform = "";
      if (glare) glare.style.opacity = "0";
    }

    scene.addEventListener("pointermove", onMove, { passive: true });
    scene.addEventListener("pointerleave", reset);
  }

  /* ---------- עומק רקע עוקב-עכבר — ה-blobs נעים בעדינות ---------- */
  function initHeroDepth() {
    const blobs = document.querySelector(".bg-blobs");
    if (!blobs) return;
    let tx = 0, ty = 0, x = 0, y = 0;
    window.addEventListener("pointermove", (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 40;
      ty = (e.clientY / window.innerHeight - 0.5) * 40;
    }, { passive: true });
    (function follow() {
      x += (tx - x) * 0.05; y += (ty - y) * 0.05;
      blobs.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(follow);
    })();
  }

  /* ---------- קונפטי 🎉 — מתפוצץ בשליחת טופס מוצלחת ---------- */
  function confettiBurst(origin) {
    const canvas = document.createElement("canvas");
    canvas.className = "fx-confetti";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const colors = ["#7c5cff", "#00d4ff", "#ffd166", "#ff7eb3", "#ffffff"];
    const cx = (origin && origin.x) || window.innerWidth / 2;
    const cy = (origin && origin.y) || window.innerHeight / 2;
    const pieces = Array.from({ length: 130 }, () => {
      const ang = Math.random() * Math.PI * 2;
      const sp = 4 + Math.random() * 9;
      return {
        x: cx, y: cy,
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 4,
        w: 5 + Math.random() * 6, h: 3 + Math.random() * 4,
        rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
        c: colors[(Math.random() * colors.length) | 0]
      };
    });
    let frames = 0;
    (function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) {
        p.vy += 0.18; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.vx *= 0.99;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (++frames < 170) requestAnimationFrame(tick);
      else canvas.remove();
    })();
  }

  /* ---------- חיווט ----------
     main.js משדר langchange אחרי כל החלפת שפה ו-bookingSuccess
     אחרי שליחת טופס תקינה — אנחנו רק מאזינים. */
  document.addEventListener("langchange", () => { if (!REDUCED) initWordRotate(); });
  document.addEventListener("bookingSuccess", (e) => { if (!REDUCED) confettiBurst(e.detail); });

  document.addEventListener("DOMContentLoaded", () => {
    if (REDUCED) return; // מי שביקש פחות תנועה — מקבל אתר שקט
    initParticles();
    initParallax();
    if (FINE) { // אפקטי עכבר — רק בדסקטופ
      initGlow();
      initTilt();
      initMagnetic();
      initPhoto3D();
      initHeroDepth();
    }
  });
})();
