// Código compartido: idioma, menú, diálogos, cookies, club, formulario y pie.
(function () {
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  const LINKS = {
    order: "https://tabitisrael.co.il/tabit-order?orgName=Boutique%20Central&step=enter",
    whatsapp: "https://wa.me/972549479712",
    instagram: "https://www.instagram.com/boutique_central/",
    events: "https://www.boutiquecentral.co.il/en/events/",
    club: "#" // PENDIENTE: enlace correcto del club (Tabit o wee.ai)
  };

  const EN = {
    menu: "Menu", close: "Close", quick: "Quick actions", cookie_label: "Cookie notice",
    prev_photo: "Previous photo", next_photo: "Next photo", crumbs: "Breadcrumb",
    see_all: "See all boutiques",
    open_now: "Open now · closes at {t}", closed_now: "Closed now · opens {d} at {t}",
    today: "today", tomorrow: "tomorrow",
    days: ["on Sunday", "on Monday", "on Tuesday", "on Wednesday", "on Thursday", "on Friday", "on Saturday"],
    addr_missing: "⚑ Address to be confirmed",
    form_ok: "Thank you! (Prototype: the form is not connected yet.)",
    form_err: "Please fill in name, email, message and accept the privacy policy."
  };
  const HE = {
    skip: "דלג לתוכן",
    proto: "אב־טיפוס עיצובי · פריטים המסומנים ⚑ דורשים מידע מהעסק",
    tagline: "פטיסרי כמו בפריז",
    menu: "תפריט", close: "סגירה", quick: "פעולות מהירות", crumbs: "פירורי לחם",
    nav_boutiques: "סניפים", nav_patisserie: "פטיסרי", nav_events: "אירועים", nav_order: "הזמנה אונליין",
    home: "בית", prev_photo: "התמונה הקודמת", next_photo: "התמונה הבאה", photo: "תמונה",
    tbc: "⚑ לאישור", addr_tbc: "⚑ כתובת לאישור",
    all_h: "הסניפים שלנו", see_all: "לכל הסניפים",
    write_h: "כתבו לנו", f_name: "שם", f_phone: "טלפון", f_email: "אימייל", f_reason: "נושא", f_msg: "הודעה",
    r1: "הזמנה", r2: "הזמנת עוגה", r3: "אירועים וקייטרינג", r4: "משוב", r5: "אחר",
    f_consent: "אני מסכים/ה למדיניות הפרטיות.", f_send: "שליחה",
    form_ok: "תודה! (אב־טיפוס: הטופס עדיין לא מחובר.)", form_err: "נא למלא שם, אימייל, הודעה ולאשר את מדיניות הפרטיות.",
    credits: "עיצוב · חוויית משתמש · פיתוח",
    m_call: "חיוג", m_dir: "ניווט", m_order: "הזמנה",
    cookie_label: "הודעת עוגיות", cookie_text: "אנחנו משתמשים בעוגיות כדי לשפר את החוויה שלכם.", privacy: "מדיניות פרטיות", accept: "אישור",
    club_h: "הצטרפו למועדון בוטיק סנטרל", club_p: "הצטרפו וקבלו הטבות חברים ועדכונים מהפטיסרי.", club_btn: "להצטרפות",
    insta_h: "עקבו אחרינו באינסטגרם", insta_btn: "לאינסטגרם",
    open_now: "פתוח עכשיו · נסגר ב־{t}", closed_now: "סגור עכשיו · נפתח {d} ב־{t}",
    today: "היום", tomorrow: "מחר",
    days: ["ביום ראשון", "ביום שני", "ביום שלישי", "ביום רביעי", "ביום חמישי", "ביום שישי", "בשבת"],
    addr_missing: "⚑ כתובת לאישור",
    get_directions: "הוראות הגעה"
  };

  const listeners = [];
  const BC = window.BC = {
    lang: "en",
    links: LINKS,
    store,
    addHe(o) { Object.assign(HE, o); },
    addEn(o) { Object.assign(EN, o); },
    onLang(fn) { listeners.push(fn); },
    t(k) { return (BC.lang === "he" ? HE[k] : undefined) ?? EN[k] ?? k; },
    loc(o) { return o ? o[BC.lang] ?? o.en : null; },
    branchUrl(slug) { return `boutique.html?b=${encodeURIComponent(slug)}`; },
    setLang
  };

  function setLang(l) {
    BC.lang = l;
    document.documentElement.lang = l;
    document.documentElement.dir = l === "he" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(el => { el.innerHTML = BC.t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", BC.t(el.dataset.i18nAria)));
    document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = BC.t(el.dataset.i18nPh); });
    document.querySelectorAll("[data-i18n-title]").forEach(el => { el.title = BC.t(el.dataset.i18nTitle); });
    const btn = document.getElementById("lang");
    if (btn) { btn.textContent = l === "he" ? "English" : "עברית"; btn.lang = l === "he" ? "en" : "he"; }
    renderFooterZones();
    listeners.forEach(fn => fn(l));
    store.set("bc-lang", l);
  }

  // ---- Diálogos accesibles (foco atrapado, Esc, clic fuera) ----
  let lastFocus = null;
  BC.activeDialog = null;
  BC.openDialog = (el, focusEl) => {
    lastFocus = document.activeElement; BC.activeDialog = el;
    el.classList.add("open"); el.setAttribute("aria-hidden", "false");
    (focusEl || el.querySelector("button, a")).focus();
  };
  BC.closeDialog = () => {
    const el = BC.activeDialog;
    if (!el) return;
    el.classList.remove("open"); el.setAttribute("aria-hidden", "true");
    BC.activeDialog = null;
    if (lastFocus) lastFocus.focus();
  };
  document.addEventListener("keydown", e => {
    const d = BC.activeDialog;
    if (!d) return;
    if (e.key === "Escape") BC.closeDialog();
    if (e.key === "Tab") {
      const f = [...d.querySelectorAll("button, a[href]")].filter(x => x.offsetParent !== null);
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  // ---- Pie: sucursales por zona ----
  function renderFooterZones() {
    const box = document.getElementById("zones");
    if (!box || !window.BC_ZONES) return;
    box.innerHTML = "";
    BC_ZONES.forEach(z => {
      const d = document.createElement("details");
      if (window.innerWidth > 700) d.open = true;
      const s = document.createElement("summary");
      s.textContent = BC.loc(z);
      const ul = document.createElement("ul");
      const list = BC_BRANCHES.filter(b => b.zone === z.id);
      (list.length ? list : [null]).forEach(b => {
        const li = document.createElement("li"), a = document.createElement("a");
        a.href = b ? BC.branchUrl(b.slug) : "index.html#find";
        a.textContent = b ? BC.loc(b.name) : BC.t("see_all");
        li.appendChild(a); ul.appendChild(li);
      });
      d.append(s, ul);
      box.appendChild(d);
    });
  }

  // ---- Abierto / cerrado ahora (hora de Israel) ----
  const toMin = s => { const [h, m] = s.split(":"); return +h * 60 + +m; };
  BC.nowInIsrael = function () {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jerusalem", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date()).map(x => [x.type, x.value]));
    return { day: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(p.weekday), min: +p.hour * 60 + +p.minute };
  };
  // Devuelve { cls: "open" | "closed", text } o null si no hay horario
  BC.hoursStatus = function (hours) {
    if (!hours) return null;
    const { day, min } = BC.nowInIsrael();
    if (day < 0) return null;
    const h = hours[day];
    if (h && min >= toMin(h[0]) && min < toMin(h[1])) return { cls: "open", text: BC.t("open_now").replace("{t}", h[1]) };
    for (let i = 0; i < 7; i++) {
      const d = (day + i) % 7, hh = hours[d];
      if (!hh || (i === 0 && min >= toMin(hh[0]))) continue;
      const when = i === 0 ? BC.t("today") : i === 1 ? BC.t("tomorrow") : BC.t("days")[d];
      return { cls: "closed", text: BC.t("closed_now").replace("{d}", when).replace("{t}", hh[0]) };
    }
    return null;
  };

  BC.init = function () {
    document.querySelectorAll("[data-link]").forEach(a => { if (LINKS[a.dataset.link]) a.href = LINKS[a.dataset.link]; });
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    // Textos ingleses originales del HTML
    document.querySelectorAll("[data-i18n]").forEach(el => { EN[el.dataset.i18n] ??= el.innerHTML; });
    document.querySelectorAll("[data-i18n-title]").forEach(el => { EN[el.dataset.i18nTitle] ??= el.title; });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => { EN[el.dataset.i18nPh] ??= el.placeholder; });

    const langBtn = document.getElementById("lang");
    if (langBtn) langBtn.addEventListener("click", () => setLang(BC.lang === "en" ? "he" : "en"));

    // Menú móvil
    const burger = document.querySelector(".burger"), menu = document.getElementById("menu");
    if (burger) burger.addEventListener("click", () => burger.setAttribute("aria-expanded", menu.classList.toggle("open")));

    // Cookies y club: nunca a la vez; el club una sola vez cada 30 días
    const cookie = document.getElementById("cookie"), club = document.getElementById("club");
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    const clubSeen = () => Date.now() - Number(store.get("bc-club-seen") || 0) < THIRTY_DAYS;
    let clubTimer = null;
    function showClub() {
      if (!club || clubSeen() || cookie.classList.contains("show") || BC.activeDialog) return;
      store.set("bc-club-seen", String(Date.now()));
      BC.openDialog(club, document.getElementById("club-close"));
    }
    function armClub() {
      if (!club || clubSeen()) return;
      clubTimer = setTimeout(showClub, 30000);
      if (matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mouseout", function exit(e) {
          if (!e.relatedTarget && e.clientY <= 0) { document.removeEventListener("mouseout", exit); clearTimeout(clubTimer); showClub(); }
        });
      }
    }
    if (cookie) {
      if (store.get("bc-cookies") !== "ok") cookie.classList.add("show");
      else armClub();
      document.getElementById("cookie-ok").addEventListener("click", () => {
        store.set("bc-cookies", "ok"); cookie.classList.remove("show"); armClub();
      });
    }
    if (club) {
      document.getElementById("club-close").addEventListener("click", BC.closeDialog);
      club.addEventListener("click", e => { if (e.target === club) BC.closeDialog(); });
    }

    // Formulario (prototipo: no envía)
    const form = document.getElementById("contact");
    if (form) form.addEventListener("submit", e => {
      e.preventDefault();
      const ok = form.checkValidity();
      document.getElementById("form-msg").textContent = ok ? BC.t("form_ok") : BC.t("form_err");
      if (ok) form.reset();
    });

    const urlLang = new URLSearchParams(location.search).get("lang");
    const saved = store.get("bc-lang");
    setLang(urlLang === "he" || urlLang === "en" ? urlLang : saved === "he" ? "he" : "en");
  };
})();
