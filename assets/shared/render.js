/* Shared section renderer + light/dark theme + small behaviors.
   Each design supplies its own cover, CSS, and decoration. */
(function () {
  const S = window.SITE;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ext = (url, label, cls = "") => `<a href="${url}" target="_blank" rel="noopener" class="${cls}">${label}</a>`;
  const tags = (t) => (t && t.length ? `<ul class="tags">${t.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : "");
  const bullets = (b) => (b && b.length ? `<ul class="bullets">${b.map((x) => `<li>${x}</li>`).join("")}</ul>` : "");
  const btnLinks = (l) => (l && l.length ? `<div class="links">${l.map(([t, u]) => ext(u, t, "btn btn-ghost btn-sm")).join("")}</div>` : "");
  const mark = (e, base) => e.logo
    ? `<span class="mark mark-logo" style="${e.logoBg ? `--logo-bg:${e.logoBg}` : ""}"><img src="${base}${e.logo}" alt="${esc(e.org)} logo" loading="lazy" /></span>`
    : `<span class="mark">${e.mark || esc(e.org.slice(0, 2))}</span>`;
  const COURSE_IC = {
    llm: '<path d="M8 10h22a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H18l-7 6v-6H8a6 6 0 0 1-6-6v-8a6 6 0 0 1 6-6z"/><path d="M11 20h2M18 20h2M25 20h2"/>',
    ml: '<circle cx="7" cy="12" r="3"/><circle cx="7" cy="28" r="3"/><circle cx="20" cy="8" r="3"/><circle cx="20" cy="20" r="3"/><circle cx="20" cy="32" r="3"/><circle cx="33" cy="20" r="3"/><path d="M10 12l7-3M10 12l7 8M10 28l7-8M10 28l7 4M23 8l7 11M23 20h7M23 32l7-11"/>',
    chip: '<rect x="10" y="10" width="20" height="20" rx="3"/><rect x="15" y="15" width="10" height="10" rx="1"/><path d="M15 4v6M20 4v6M25 4v6M15 30v6M20 30v6M25 30v6M4 15h6M4 20h6M4 25h6M30 15h6M30 20h6M30 25h6"/>',
  };
  const org = (name, url) => (url ? ext(url, `${esc(name)} ↗`, "org-link") : `<span class="org-link">${esc(name)}</span>`);

  const ICONS = {
    drums: '<ellipse cx="40" cy="34" rx="26" ry="9"/><path d="M14 34 V54 Q40 66 66 54 V34"/><path d="M22 18 L36 30 M58 16 L44 30"/>',
    martial: '<path d="M22 44 Q20 26 34 24 L52 24 Q62 26 60 38 L60 52 Q58 62 46 62 L32 62 Q22 60 22 50Z"/><path d="M30 24 V36 M40 24 V36 M50 24 V36 M22 44 H40"/>',
    adventure: '<path d="M6 52 Q20 36 32 48 T56 46 T76 40"/><path d="M6 62 Q22 50 36 60 T62 58 T76 54"/><path d="M28 34 L50 28 L46 22 Z"/>',
    paint: '<path d="M56 12 L68 24 L36 56 L24 44Z"/><path d="M24 44 Q12 50 14 66 Q30 68 36 56"/><circle cx="58" cy="60" r="5"/>',
    cube: '<path d="M40 10 L68 24 L68 56 L40 70 L12 56 L12 24Z"/><path d="M12 24 L40 38 L68 24 M40 38 V70"/><path d="M26 17 L54 31 M54 17 L26 31 M12 40 L40 54 L68 40 M26 31 V63 M54 31 V63"/>',
    poker: '<circle cx="40" cy="40" r="24"/><circle cx="40" cy="40" r="14"/><path d="M40 16 V24 M40 56 V64 M16 40 H24 M56 40 H64 M23 23 L29 29 M51 51 L57 57 M57 23 L51 29 M23 57 L29 51"/>',
    radio: '<rect x="10" y="28" width="60" height="38" rx="6"/><circle cx="52" cy="47" r="10"/><path d="M18 40 H36 M18 48 H36 M18 56 H30 M22 28 L54 12"/>',
    cocoa: '<path d="M16 30 H56 V56 Q56 66 46 66 H26 Q16 66 16 56Z"/><path d="M56 36 Q68 36 66 46 Q64 54 56 54"/><path d="M28 22 Q24 16 28 10 M38 22 Q34 16 38 10"/>',
  };
  const icon = (k) => `<svg viewBox="0 0 80 80" class="ic" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${ICONS[k] || ""}</svg>`;

  const ART = {
    podcast: `<svg viewBox="0 0 320 180" class="art art-podcast" aria-hidden="true">
      <g class="a1">${[40, 58, 76, 94, 112, 130].map((x, i) => `<rect x="${x}" y="${60 + [10, -10, 20, -20, 0, 15][i]}" width="10" height="${60 - 2 * [10, -10, 20, -20, 0, 15][i]}" rx="5"/>`).join("")}</g>
      <g class="a2">${[180, 198, 216, 234, 252, 270].map((x, i) => `<rect x="${x}" y="${60 + [5, -15, 15, -5, -25, 10][i]}" width="10" height="${60 - 2 * [5, -15, 15, -5, -25, 10][i]}" rx="5"/>`).join("")}</g>
      <text x="90" y="165" class="art-t" text-anchor="middle">HOST A</text><text x="230" y="165" class="art-t" text-anchor="middle">HOST B</text></svg>`,
    drums: `<svg viewBox="0 0 320 180" class="art art-drums" aria-hidden="true">
      <g class="p1"><ellipse cx="95" cy="95" rx="42" ry="14" class="head"/><path d="M53 95 V122 Q95 140 137 122 V95" class="body"/><line class="stick" x1="58" y1="35" x2="92" y2="90"/></g>
      <g class="p2"><ellipse cx="225" cy="95" rx="42" ry="14" class="head"/><path d="M183 95 V122 Q225 140 267 122 V95" class="body"/><line class="stick" x1="262" y1="35" x2="228" y2="90"/></g>
      <text x="160" y="100" text-anchor="middle" class="art-t vs">VS</text></svg>`,
    candles: `<svg viewBox="0 0 320 180" class="art art-candles" aria-hidden="true">
      ${[[50, 70, 150, 95, 40, 0], [90, 60, 140, 80, 45, 1], [130, 40, 120, 55, 50, 1], [170, 55, 125, 65, 35, 0], [210, 30, 105, 40, 50, 1], [250, 20, 90, 28, 45, 1]].map(([x, y1, y2, ry, h, up]) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="wick"/><rect x="${x - 8}" y="${ry}" width="16" height="${h}" class="${up ? "up" : "dn"}"/>`).join("")}
      <text x="160" y="172" text-anchor="middle" class="art-t">#CLOUT ▲ 12K tweets/day</text></svg>`,
    line: `<svg viewBox="0 0 320 180" class="art art-line" aria-hidden="true">
      <path class="grid" d="M30 40 H290 M30 80 H290 M30 120 H290 M30 160 H290"/>
      <path class="real" d="M30 140 L60 130 L90 136 L120 110 L150 116 L180 86 L210 94 L240 64 L270 72 L290 52"/>
      <path class="pred" d="M30 144 L60 126 L90 132 L120 114 L150 110 L180 90 L210 88 L240 70 L270 66 L290 48"/>
      <text x="30" y="26" class="art-t">BTC/USD · stream &lt;5s · infer &lt;150ms</text></svg>`,
  };

  const R = {
    about(c) {
      const a = S.about;
      return `
      <div class="about-grid">
        <figure class="portrait">
          <div class="portrait-frame"><img src="${c.base}${S.portrait}" alt="Portrait of ${S.name}" data-portrait /><span class="portrait-fallback">SO</span></div>
        </figure>
        <div class="about-copy">
          <p class="lead">${a.lead}</p>
          ${a.body.map((p) => `<p>${p}</p>`).join("")}
          <ul class="chips">${a.chips.map((x, i) => `<li class="${i === a.chips.length - 1 ? "chip-hot" : ""}">${x}</li>`).join("")}</ul>
          <div class="about-actions">
            ${c.resumeInAbout === false ? "" : `<a href="${c.base}${S.resume}" download class="btn btn-solid">Download resume</a>
            <a href="${c.base}${S.resume}" target="_blank" rel="noopener" class="btn btn-ghost">View resume ↗</a>`}
            <span class="socials">
              ${ext(S.github, '<i class="devicon-github-original"></i>', "social")}
              ${ext(S.linkedin, '<i class="devicon-linkedin-plain"></i>', "social")}
              <a href="mailto:${S.email}" class="social" aria-label="Email"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></a>
            </span>
          </div>
        </div>
      </div>`;
    },

    research(c) {
      return S.research.map((r) => `
      <article class="entry research">
        <div class="research-main">
          <ul class="badges"><li class="b-hot">Research</li><li class="b-live"><i></i>Current</li><li>${r.status}</li></ul>
          <h3>${r.role} <span class="dim">·</span> ${r.project}</h3>
          <p class="org">${org(r.org, r.orgUrl)}</p>
          <p class="mentor">Mentor <span class="sep">//</span> ${ext(r.mentorUrl, r.mentor)}</p>
          <p class="dates">${r.dates} · Ithaca, NY</p>
          ${bullets(r.bullets)}${tags(r.tags)}
        </div>
        <div class="research-media" data-media>
          <video src="${c.base}${S.reachyVideo}" autoplay muted loop playsinline preload="metadata"></video>
          <div class="media-fallback">
            <svg viewBox="0 0 120 140" class="robot" aria-hidden="true">
              <rect x="30" y="18" width="60" height="44" rx="20" class="r-shell"/><rect x="40" y="30" width="40" height="20" rx="10" class="r-face"/>
              <circle cx="51" cy="40" r="4" class="r-eye"/><circle cx="69" cy="40" r="4" class="r-eye"/>
              <line x1="60" y1="18" x2="60" y2="6" class="r-ant"/><circle cx="60" cy="5" r="4" class="r-eye"/>
              <rect x="34" y="68" width="52" height="46" rx="14" class="r-body"/><rect x="16" y="72" width="14" height="34" rx="7" class="r-body"/>
              <rect x="90" y="72" width="14" height="34" rx="7" class="r-body r-wave"/>
              <rect x="42" y="116" width="12" height="18" rx="5" class="r-leg"/><rect x="66" y="116" width="12" height="18" rx="5" class="r-leg"/>
            </svg>
            <span>Reachy demo · coming soon</span>
          </div>
        </div>
      </article>`).join("");
    },

    experience(c) {
      return `<div class="entries">${S.experience.map((e) => `
      <article class="entry xp${e.courses ? " xp-ta" : ""}">
        ${mark(e, c.base)}
        <div class="entry-body">
          <header><div><h3>${e.role}</h3><p class="org">${org(e.org, e.orgUrl)}</p></div><span class="dates">${e.dates}</span></header>
          ${e.courses ? `
          <ul class="courses">${e.courses.map(([t, n, ic, did]) => `
            <li>
              <svg viewBox="0 0 40 40" class="course-ic" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${COURSE_IC[ic] || ""}</svg>
              <div><span>${t}</span><b>${n}</b>${did ? `<ul class="course-did">${did.map((d) => `<li>${d}</li>`).join("")}</ul>` : ""}</div>
            </li>`).join("")}</ul>` : ""}
          ${bullets(e.bullets)}${tags(e.tags)}${btnLinks(e.links)}
        </div>
      </article>`).join("")}</div>`;
    },

    projects(c) {
      return `<div class="projects">${S.projects.map((p, i) => `
      <article class="entry project${p.image ? " project-wide" : ""}" data-i="${i}">
        <div class="project-art${p.image ? " has-shot" : ""}">${p.image ? `<img class="project-shot" src="${c.base}${p.image}" alt="${esc(p.title)} app screenshot" loading="lazy" width="1400" height="655" />` : ART[p.art] || ""}${p.award ? `<span class="award">${p.award}</span>` : ""}</div>
        <div class="project-body">
          <p class="kicker">${p.kicker}</p>
          <h3>${p.title}</h3>
          <p class="idea"><span class="label">The idea</span>${p.idea}</p>
          <p class="label">What I built</p>
          ${bullets(p.built)}${tags(p.tags)}${btnLinks(p.links)}
        </div>
      </article>`).join("")}</div>`;
    },

    leadership(c) {
      return `<div class="lead-grid">${S.leadership.map((l) => `
      <article class="entry lead xp">
        ${mark(l, c.base)}
        <div class="entry-body">
          <header><div><h3>${l.role}</h3><p class="org">${org(l.org, l.orgUrl)}</p></div><span class="dates">${l.dates}</span></header>
          ${bullets(l.bullets)}${tags(l.tags)}${btnLinks(l.links)}
        </div>
      </article>`).join("")}</div>`;
    },

    skills() {
      return Object.entries(S.skills).map(([g, items], gi) => `
      <div class="skill-group">
        <h3><span class="gi">0${gi + 1}</span>${g}</h3>
        <ul class="skill-grid">${items.map(([n, ic]) => `<li class="skill">${ic ? `<i class="devicon-${ic} colored"></i>` : `<span class="mono-ic">${esc(n.replace(/[^A-Za-z+#]/g, "").slice(0, 3).toUpperCase())}</span>`}<span>${esc(n)}</span></li>`).join("")}</ul>
      </div>`).join("");
    },

    beyond() {
      return `<ul class="interests">${S.interests.map((it) => `
      <li class="interest" data-key="${it.key}">
        <span class="i-ic">${icon(it.key)}</span>
        <h4>${it.title}</h4>
        <p>${it.text}</p>
        ${it.link ? `<a class="btn btn-ghost btn-sm" data-link="${it.link}" target="_blank" rel="noopener">Tune in ↗</a>` : ""}
      </li>`).join("")}</ul>`;
    },

    contact(c) {
      return `
      <blockquote class="quote"><p>“${S.quote[0]}”</p><cite>${S.quote[1]}</cite></blockquote>
      <div class="connect">
        <h2 class="connect-title">${c.connectTitle || "Let's grab a <em>hot chocolate</em>."}</h2>
        <p>${S.contactLine}</p>
        <div class="connect-grid">
          <a href="mailto:${S.email}" class="connect-card"><span>Email</span><b>${S.email}</b></a>
          ${ext(S.linkedin, `<span>LinkedIn</span><b>in/samruddhi-oke ↗</b>`, "connect-card")}
          ${ext(S.github, `<span>GitHub</span><b>Samruddhioke0410 ↗</b>`, "connect-card")}
          <a href="${c.base}${S.resume}" download class="connect-card connect-hot"><span>Resume</span><b>Download PDF ↓</b></a>
        </div>
      </div>`;
    },
  };

  const DEFAULT_TITLES = {
    about: "About", research: "Research", experience: "Experience", projects: "Projects",
    leadership: "Leadership", skills: "Skills", beyond: "Off the clock", contact: "Contact",
  };

  window.SiteRender = {
    icon, ART, esc, ext,
    mount(root, cfg = {}) {
      const c = Object.assign({ base: "", order: Object.keys(DEFAULT_TITLES), titles: {}, num: (i) => String(i + 1).padStart(2, "0"), headExtra: () => "" }, cfg);
      root.innerHTML = c.order.map((k, i) => `
        <section class="sec sec-${k}" id="${k}">
          <div class="wrap">
            ${k === "contact" ? "" : `<header class="sec-head"><span class="sec-num">${c.num(i, k)}</span><h2 class="sec-title">${c.titles[k] || DEFAULT_TITLES[k]}</h2>${c.headExtra(k, i)}</header>`}
            <div class="sec-body">${((c.render && c.render[k]) || R[k])(c)}</div>
          </div>
        </section>`).join("");
      this.wire(root);
    },

    wire(root) {
      // optional links
      root.querySelectorAll("[data-link]").forEach((a) => {
        const u = S.links[a.dataset.link];
        if (u) a.href = u; else a.remove();
      });
      // portrait / video fallbacks
      root.querySelectorAll("[data-portrait]").forEach((img) => {
        const hide = () => img.classList.add("missing");
        img.addEventListener("error", hide);
        if (img.complete && !img.naturalWidth) hide();
      });
      root.querySelectorAll("[data-media]").forEach((box) => {
        const v = box.querySelector("video");
        const off = () => box.classList.add("no-video");
        v.addEventListener("error", off);
        if (v.error) off();
      });
      // reveal on scroll
      const els = root.querySelectorAll(".sec-head, .entry, .about-grid, .skill-group, .interest, .quote, .connect");
      els.forEach((e) => e.classList.add("rv"));
      if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }), { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
      els.forEach((e) => io.observe(e));
    },

    navSpy(nav) {
      const links = [...nav.querySelectorAll('a[href^="#"]')];
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
      }), { rootMargin: "-45% 0px -50% 0px" });
      links.forEach((l) => { const s = document.querySelector(l.getAttribute("href")); if (s) io.observe(s); });
    },
  };

  /* ---------- Theme: light by default, remembered per visitor ---------- */
  window.SiteTheme = {
    get() { return document.documentElement.dataset.theme || "light"; },
    set(t) {
      document.documentElement.dataset.theme = t;
      try { localStorage.setItem("so-theme", t); } catch (e) {}
      document.querySelectorAll("[data-theme-toggle]").forEach((b) => {
        b.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
        b.dataset.mode = t;
      });
      window.dispatchEvent(new CustomEvent("themechange", { detail: t }));
    },
    init() {
      this.set(this.get());
      document.querySelectorAll("[data-theme-toggle]").forEach((b) =>
        b.addEventListener("click", () => this.set(this.get() === "dark" ? "light" : "dark")));
    },
  };
})();
