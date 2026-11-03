/* ============ WATERCOLOR: painted scenes, a painted-in portrait, a groove that splashes color ============ */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const S = window.SITE;
  const BASE = document.documentElement.dataset.base ?? "../../";
  const dark = () => document.documentElement.dataset.theme === "dark";
  const cssVar = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const PIG = ["--p1", "--p2", "--p3", "--p4", "--p5", "--p6", "--p7"];

  /* =========================================================
     Sections (shared content, with this design's own Beyond + Contact)
     ========================================================= */
  const HAND = [
    ["A", "drums", "I even built <a href=\"#projects\" class=\"card-link\">a drum game</a> for embedded systems."],
    ["K", "martial", ""],
    ["Q", "adventure", ""],
    ["J", "paint", "Pretty much this whole website."],
    ["10", "poker", ""],
  ];
  const interest = (k) => S.interests.find((x) => x.key === k);

  function beyond() {
    const radio = interest("radio");
    return `
    <p class="sec-intro">Every good trader knows their hand. Here's mine. <span class="note">hover a card ↓</span></p>
    <div class="hand" id="hand">
      ${HAND.map(([rank, key, extra], i) => {
        const it = interest(key);
        return `
        <div class="pcard" style="--i:${i}" tabindex="0">
          <div class="pc-inner">
            <div class="pc-face pc-front">
              <span class="corner"><b>${rank}</b>♥</span>
              <span class="pc-art">${SiteRender.icon(key)}</span>
              <h4>${it.title}</h4>
              <p>${it.text}${extra ? " " + extra : ""}</p>
              <span class="corner flip"><b>${rank}</b>♥</span>
            </div>
            <div class="pc-face pc-back" aria-hidden="true"><span>SO</span></div>
          </div>
        </div>`;
      }).join("")}
    </div>
    <div class="hand-foot"><button class="btn btn-ghost btn-sm" id="redeal">↻ Shuffle &amp; deal again</button></div>

    <div class="cube-lab">
      <div class="cube-stage" id="cubeStage" aria-label="A Rubik's cube. Drag to spin it.">
        <div class="cube-shadow"></div>
        <div class="cube" id="cube"></div>
      </div>
      <div class="cube-copy">
        <h3>Rubik's cube</h3>
        <p>${interest("cube").text} Scramble it, then hit solve. The timer's running.</p>
        <div class="timer-panel">
          <div class="timer-top"><span class="clock" id="clock">00:00.00</span><span class="state" id="cubeState">SOLVED</span></div>
          <p class="scramble" id="scramble">Drag the cube to spin it.</p>
          <div class="timer-btns">
            <button class="btn btn-sm btn-solid" id="btnScramble">Scramble</button>
            <button class="btn btn-sm btn-ghost" id="btnSolve" disabled>Solve</button>
          </div>
        </div>
        <div class="radio-line">
          <span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
          <p><b>${radio.title}:</b> ${radio.text}</p>
          <a class="btn btn-ghost btn-sm" data-link="radio" target="_blank" rel="noopener">Tune in ↗</a>
        </div>
      </div>
    </div>`;
  }

  function contact(c) {
    const ext = SiteRender.ext;
    return `
    <div class="cocoa">
      <div class="connect">
        <p class="note">first cup's on me</p>
        <h2 class="connect-title">Let's grab a <em>hot chocolate</em>.</h2>
        <p>${S.contactLine}</p>
        <div class="connect-grid">
          <a href="mailto:${S.email}" class="connect-card"><span>Email</span><b>${S.email}</b></a>
          ${ext(S.linkedin, `<span>LinkedIn</span><b>in/samruddhi-oke ↗</b>`, "connect-card")}
          ${ext(S.github, `<span>GitHub</span><b>Samruddhioke0410 ↗</b>`, "connect-card")}
          <a href="${c.base}${S.resume}" download class="connect-card connect-hot"><span>Resume</span><b>Download PDF ↓</b></a>
        </div>
      </div>
      <div class="mug-wrap">${MUG}</div>
    </div>`;
  }

  const MUG = `
  <svg class="mug" viewBox="0 0 260 260" role="img" aria-label="A red mug of hot chocolate with whipped cream and a candy cane">
    <defs>
      <linearGradient id="mugRed" x1="0" x2="1"><stop offset="0" stop-color="#ff5a5f"/><stop offset=".45" stop-color="#e2283b"/><stop offset="1" stop-color="#a8122a"/></linearGradient>
      <radialGradient id="cocoaTop" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#8a4b2c"/><stop offset="1" stop-color="#4e2615"/></radialGradient>
    </defs>
    <g class="steam" fill="none" stroke-linecap="round">
      <path d="M96 58 C82 42 110 32 96 12"/><path d="M124 52 C110 34 138 24 124 2"/><path d="M152 58 C138 42 166 32 152 14"/>
    </g>
    <ellipse cx="128" cy="236" rx="104" ry="15" class="saucer-shadow"/>
    <ellipse cx="128" cy="230" rx="104" ry="15" class="saucer"/>
    <ellipse cx="128" cy="227" rx="62" ry="7" class="saucer-ring"/>
    <path d="M186 118 Q236 116 232 158 Q228 198 184 194" fill="none" stroke="#c41d33" stroke-width="17" stroke-linecap="round"/>
    <path d="M186 118 Q236 116 232 158 Q228 198 184 194" fill="none" stroke="#ff6b70" stroke-width="4" stroke-linecap="round" opacity=".5" transform="translate(-3 -3)"/>
    <path d="M52 94 H188 V188 Q188 224 152 224 H88 Q52 224 52 188 Z" fill="url(#mugRed)"/>
    <rect x="52" y="146" width="136" height="26" fill="#fff4ea"/>
    <g fill="#e2283b">
      ${[66, 88, 110, 132, 154, 176].map((x, i) => (i % 2 ? `<path d="M${x} 152 l5 7 l-5 7 l-5 -7z"/>` : `<path d="M${x - 6} 159 h12 M${x} 153 v12 M${x - 4} 155 l8 8 M${x + 4} 155 l-8 8" stroke="#e2283b" stroke-width="2" stroke-linecap="round"/>`)).join("")}
    </g>
    <path d="M52 142 H188 M52 176 H188" stroke="#fff4ea" stroke-width="3" stroke-dasharray="3 5"/>
    <path d="M64 104 Q60 150 70 196" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".22"/>
    <ellipse cx="120" cy="94" rx="68" ry="12" fill="#b3172c"/>
    <ellipse cx="120" cy="96" rx="61" ry="9" fill="url(#cocoaTop)"/>
    <g class="cane"><path d="M160 108 L172 36 Q176 16 192 20 Q206 25 200 42" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
      <path d="M160 108 L172 36 Q176 16 192 20 Q206 25 200 42" fill="none" stroke="#e2283b" stroke-width="10" stroke-dasharray="6 7" stroke-linecap="butt"/></g>
    <g class="cream">
      <circle cx="84" cy="88" r="15"/><circle cx="104" cy="78" r="19"/><circle cx="128" cy="80" r="18"/><circle cx="150" cy="88" r="14"/><circle cx="116" cy="64" r="14"/>
      <path d="M70 94 Q120 104 166 94 L166 98 Q120 108 70 98Z"/>
    </g>
    <g class="cream-shade"><path d="M92 70 Q100 62 110 64" /><path d="M120 54 Q126 52 130 58"/></g>
    <g fill="#7a3d22" opacity=".7"><circle cx="100" cy="72" r="1.6"/><circle cx="118" cy="62" r="1.4"/><circle cx="132" cy="74" r="1.7"/><circle cx="146" cy="84" r="1.3"/><circle cx="88" cy="84" r="1.4"/><circle cx="124" cy="80" r="1.2"/></g>
    <rect x="132" y="66" width="12" height="11" rx="3" fill="#ffd1dc" transform="rotate(16 138 71)"/>
    <rect x="90" y="74" width="11" height="10" rx="3" fill="#fff" stroke="#f1dfd2" transform="rotate(-12 95 79)"/>
    <rect id="mugTop" x="70" y="58" width="96" height="40" fill="none"/>
  </svg>`;

  SiteTheme.init();
  SiteRender.mount($("#content"), {
    base: BASE,
    titles: { beyond: "Off the clock", contact: "Contact" },
    render: { beyond, contact },
  });
  SiteRender.navSpy($(".menu"));
  $("#yr").textContent = new Date().getFullYear();
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* =========================================================
     Watercolor engine: layered, deformed polygons (seeded)
     ========================================================= */
  function rng(seed) { seed = seed % 2147483647 || 1; return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }
  const gauss = (r) => (r() + r() + r() + r() - 2) / 2;
  function deform(pts, depth, variance, r) {
    for (let d = 0; d < depth; d++) {
      const out = [];
      for (let i = 0; i < pts.length; i++) {
        const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
        const len = Math.hypot(x2 - x1, y2 - y1);
        out.push([x1, y1], [(x1 + x2) / 2 + gauss(r) * variance * len, (y1 + y2) / 2 + gauss(r) * variance * len]);
      }
      pts = out;
    }
    return pts;
  }
  function polygon(cx, cy, rx, ry, n, r) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, k = 0.8 + r() * 0.4;
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    return pts;
  }
  // one bloom = a stack of slightly different translucent layers
  function bloomLayers(cx, cy, rx, ry, seed, n = 22) {
    const r = rng(seed);
    const base = deform(polygon(cx, cy, rx, ry, 10, r), 3, 0.42, r);
    const out = [];
    for (let l = 0; l < n; l++) {
      const g = 0.7 + (l / n) * 0.42;
      out.push(deform(base.map(([x, y]) => [cx + (x - cx) * g, cy + (y - cy) * g]), 2, 0.55, r));
    }
    return out;
  }
  function fill(ctx, pts, color, a, op = "source-over") {
    ctx.globalCompositeOperation = op;
    ctx.globalAlpha = a;
    ctx.fillStyle = color;
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fill();
  }
  function fitCanvas(cv) {
    const dpr = Math.min(devicePixelRatio || 1, 2), r = cv.getBoundingClientRect();
    cv.width = Math.max(1, Math.round(r.width * dpr)); cv.height = Math.max(1, Math.round(r.height * dpr));
    const ctx = cv.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, W: r.width, H: r.height };
  }

  // shared frame queue so blooms spread over a few frames instead of popping in
  let queue = [];
  (function frame() {
    const n = reduce ? queue.length : Math.min(queue.length, 10);
    for (let i = 0; i < n; i++) { const q = queue.shift(); fill(q.ctx, q.pts, q.c, q.a); }
    requestAnimationFrame(frame);
  })();

  /* a canvas that remembers its blooms so it can repaint on resize / theme change */
  function Surface(cv) {
    const s = { cv, items: [], ctx: null, W: 0, H: 0 };
    s.layers = (b) => {
      const m = Math.min(s.W, s.H);
      return bloomLayers(b.x * s.W, b.y * s.H, b.r * m, b.r * m * (b.squash || 1), b.seed);
    };
    s.alpha = () => (dark() ? 0.055 : 0.045);
    s.add = (b) => {
      // keep the whole bloom inside the canvas so it never gets cut off square
      const reach = b.r * Math.min(s.W, s.H) * 1.3;
      b.x = Math.min(1 - reach / s.W, Math.max(reach / s.W, b.x));
      b.y = Math.min(1 - reach / s.H, Math.max(reach / s.H, b.y));
      s.items.push(b);
      if (s.items.length > 30) { s.items.splice(0, 10); s.repaint(); cleanBtn.hidden = false; return; }
      const c = cssVar(b.c), a = s.alpha();
      s.layers(b).forEach((pts) => queue.push({ ctx: s.ctx, pts, c, a }));
      cleanBtn.hidden = false;
    };
    s.repaint = () => {
      queue = queue.filter((q) => q.ctx !== s.ctx);
      s.ctx.setTransform(1, 0, 0, 1, 0, 0); s.ctx.clearRect(0, 0, cv.width, cv.height);
      ({ ctx: s.ctx, W: s.W, H: s.H } = fitCanvas(cv));
      const a = s.alpha();
      s.items.forEach((b) => { const c = cssVar(b.c); s.layers(b).forEach((pts) => fill(s.ctx, pts, c, a)); });
    };
    s.clear = () => { s.items = []; s.repaint(); };
    ({ ctx: s.ctx, W: s.W, H: s.H } = fitCanvas(cv));
    return s;
  }

  /* torn watercolor paper with a soft shadow, as a background image */
  function tornPaper(w, h, pad, color, alpha, seed) {
    const dpr = Math.min(devicePixelRatio || 1, 2), r = rng(seed);
    const cv = document.createElement("canvas");
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const ctx = cv.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const x0 = pad, y0 = pad, x1 = w - pad, y1 = h - pad, pts = [];
    const p1 = r() * 6, p2 = r() * 6;
    const edge = (t) => 2 + 2.5 * (Math.sin(t * 0.045 + p1) + Math.sin(t * 0.13 + p2) + 2) / 2 + r() * 2.6 + (r() < 0.03 ? 4 : 0);
    let t = 0;
    for (let x = x0; x < x1; x += 4, t += 4) pts.push([x, y0 + edge(t)]);
    for (let y = y0; y < y1; y += 4, t += 4) pts.push([x1 - edge(t), y]);
    for (let x = x1; x > x0; x -= 4, t += 4) pts.push([x, y1 - edge(t)]);
    for (let y = y1; y > y0; y -= 4, t += 4) pts.push([x0 + edge(t), y]);
    ctx.shadowColor = "rgba(40, 20, 60, .3)"; ctx.shadowBlur = 26 * dpr; ctx.shadowOffsetY = 10 * dpr;
    fill(ctx, pts, color, alpha);
    ctx.shadowColor = "transparent";
    // a little paper grain
    ctx.globalCompositeOperation = "source-atop";
    for (let i = 0; i < (w * h) / 900; i++) {
      ctx.globalAlpha = 0.05 + r() * 0.05;
      ctx.fillStyle = r() < 0.5 ? "#8a7a90" : "#ffffff";
      ctx.fillRect(x0 + r() * (x1 - x0), y0 + r() * (y1 - y0), 1.2, 1.2);
    }
    ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
    return `url(${cv.toDataURL()})`;
  }
  function papers() {
    const w = $(".wash");
    w.style.setProperty("--torn", tornPaper(w.offsetWidth, w.offsetHeight, 22, cssVar("--bg"), 0.9, 11));
    const st = $("#stage");
    st.style.setProperty("--torn", tornPaper(st.offsetWidth * 1.1 + 44, st.offsetHeight * 1.08 + 44, 22, "#fffaf2", 1, 29));
  }

  /* =========================================================
     Cover: painted scenes behind, my photo painted in front
     ========================================================= */
  const SCENES = {
    light: [["sunset-beach", "Sunset beach", "50% 62%"], ["himalaya-dusk", "Himalayan dusk", "40% 50%"], ["lantern-lake", "Lantern lake", "50% 55%"]],
    dark: [["galaxy-lake", "Galaxy lake", "50% 60%"], ["firefly-forest", "Firefly creek", "50% 50%"], ["blossom-swirl", "Blossom night", "50% 40%"]],
  };
  const scenesEl = $("#scenes"), dotsEl = $("#sceneDots");
  let sceneIdx = 0, sceneTimer = 0, playing = false;
  function buildScenes() {
    const set = SCENES[dark() ? "dark" : "light"];
    scenesEl.innerHTML = set.map(([f, , pos], i) =>
      `<div class="scene${i === 0 ? " on" : ""}" style="background-image:url(${BASE}assets/img/scenes/${f}.jpg);background-position:${pos}"></div>`).join("");
    dotsEl.innerHTML = set.map(([, name], i) =>
      `<button class="${i === 0 ? "on" : ""}" aria-label="Show painting: ${name}" title="${name}"></button>`).join("");
    $$("button", dotsEl).forEach((b, i) => b.addEventListener("click", () => showScene(i, true)));
    sceneIdx = 0; autoScenes();
  }
  function showScene(i, user) {
    const els = $$(".scene", scenesEl), dots = $$("button", dotsEl);
    sceneIdx = (i + els.length) % els.length;
    els.forEach((e, k) => e.classList.toggle("on", k === sceneIdx));
    dots.forEach((e, k) => e.classList.toggle("on", k === sceneIdx));
    if (user) autoScenes();
  }
  function autoScenes() {
    clearInterval(sceneTimer);
    if (!reduce && !playing) sceneTimer = setInterval(() => showScene(sceneIdx + 1), 11000);
  }
  buildScenes();

  /* ---- the portrait paints itself in ---- */
  const stage = $("#stage"), pcv = $("#portrait");
  const photo = new Image();
  photo.src = BASE + S.portrait;
  const maskCv = document.createElement("canvas");
  let pctx, mctx, PW = 0, PH = 0, maskLayers = [], painted = 0, paintRaf = 0;

  function buildMask() {
    // start at my face, then spread outward
    const spots = [[0.5, 0.3, 0.3], [0.5, 0.54, 0.34], [0.34, 0.42, 0.25], [0.66, 0.44, 0.25], [0.5, 0.76, 0.3],
      [0.33, 0.68, 0.24], [0.67, 0.7, 0.24], [0.34, 0.2, 0.21], [0.66, 0.2, 0.21], [0.5, 0.15, 0.21], [0.36, 0.86, 0.2], [0.64, 0.86, 0.2]];
    maskLayers = [];
    spots.forEach(([x, y, rad], k) => {
      const L = bloomLayers(x * PW, y * PH, rad * PW, rad * PW * 1.08, 100 + k * 37, 18);
      L.forEach((pts) => maskLayers.push({ pts, a: k < 2 ? 0.16 : 0.11 }));
    });
    // a solid core so my face is fully opaque, painted last
    bloomLayers(0.5 * PW, 0.5 * PH, 0.34 * PW, 0.4 * PH, 7, 6).forEach((pts) => maskLayers.push({ pts, a: 0.6 }));
  }
  function composite() {
    pctx.setTransform(1, 0, 0, 1, 0, 0);
    pctx.globalCompositeOperation = "source-over"; pctx.globalAlpha = 1;
    pctx.clearRect(0, 0, pcv.width, pcv.height);
    // crop the tall photo to the stage, centered on me
    const sw = photo.naturalWidth, sh = Math.min(photo.naturalHeight, sw * (PH / PW));
    const sy = Math.max(0, Math.min(photo.naturalHeight - sh, photo.naturalHeight * 0.21));
    pctx.filter = "saturate(1.15) contrast(1.03)";
    pctx.drawImage(photo, 0, sy, sw, sh, 0, 0, pcv.width, pcv.height);
    pctx.filter = "none";
    // tint the grey city sky toward the painting behind it
    const g = pctx.createLinearGradient(0, 0, 0, pcv.height);
    (dark() ? ["#7b4bff", "#ff5fa2", "#2a1d6b"] : ["#ff7aa8", "#ffb066", "#2ec4c9"]).forEach((c, i) => g.addColorStop(i / 2, c));
    pctx.globalCompositeOperation = "soft-light"; pctx.globalAlpha = 0.7;
    pctx.fillStyle = g; pctx.fillRect(0, 0, pcv.width, pcv.height);
    pctx.globalAlpha = 1;
    pctx.globalCompositeOperation = "destination-in";
    pctx.drawImage(maskCv, 0, 0);
    pctx.globalCompositeOperation = "source-over";
  }
  function sizePortrait() {
    ({ ctx: pctx, W: PW, H: PH } = fitCanvas(pcv));
    maskCv.width = pcv.width; maskCv.height = pcv.height;
    mctx = maskCv.getContext("2d");
    const dpr = pcv.width / PW;
    mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildMask();
  }
  function paintIn(instant) {
    cancelAnimationFrame(paintRaf);
    mctx.clearRect(0, 0, PW, PH);
    painted = 0;
    const step = () => {
      const n = instant ? maskLayers.length : 5;
      for (let i = 0; i < n && painted < maskLayers.length; i++, painted++) fill(mctx, maskLayers[painted].pts, "#000", maskLayers[painted].a);
      if (photo.complete && photo.naturalWidth) composite();
      if (painted < maskLayers.length) paintRaf = requestAnimationFrame(step);
      else stage.classList.add("painted");
    };
    step();
  }
  sizePortrait();
  const startPaint = () => paintIn(reduce);
  if (photo.complete && photo.naturalWidth) startPaint(); else photo.addEventListener("load", startPaint);
  photo.addEventListener("error", () => stage.classList.add("no-photo"));

  /* ---- blooms behind the photo + splashes on it ---- */
  const cleanBtn = $("#clean");
  const behind = Surface($("#blooms"));
  const onTop = Surface($("#splash"));
  cleanBtn.addEventListener("click", () => { behind.clear(); onTop.clear(); cleanBtn.hidden = true; });

  const DRUM_PIG = { kick: ["--p1", "--p5"], snare: ["--p2", "--p7"], hat: ["--p3", "--p6"], tom: ["--p5", "--p1"], crash: ["--p4", "--p3"] };
  const pick = (d) => DRUM_PIG[d][Math.random() < 0.7 ? 0 : 1];
  const seed = () => Math.floor(Math.random() * 1e9) + 1;
  function splash(drum, at) {
    const big = drum === "kick" || drum === "crash";
    // around the photo: a ring just outside its edge
    const a = at ? Math.atan2(at.y - 0.5, at.x - 0.5) + (Math.random() - 0.5) * 0.6 : Math.random() * Math.PI * 2;
    const d = 0.33 + Math.random() * 0.12;
    behind.add({ x: 0.5 + Math.cos(a) * d, y: 0.5 + Math.sin(a) * d * 1.05, r: big ? 0.15 : 0.08 + Math.random() * 0.05, c: pick(drum), seed: seed() });
    // on the paper: where you tapped, otherwise only along the paper's border so the photo stays clean
    if (at) {
      // splash canvas is the paper (photo + 5-6% margin); map the tap into it
      onTop.add({ x: (at.x + 0.06) / 1.12, y: (at.y + 0.05) / 1.1, r: 0.05, c: pick(drum), seed: seed() });
    } else if (big || Math.random() < 0.35) {
      const side = Math.random();
      const x = side < 0.35 ? 0.02 + Math.random() * 0.06 : side < 0.7 ? 0.92 + Math.random() * 0.06 : 0.1 + Math.random() * 0.8;
      const y = side < 0.7 ? 0.4 + Math.random() * 0.56 : 0.93 + Math.random() * 0.05;
      onTop.add({ x, y, r: 0.035 + Math.random() * 0.025, c: pick(drum), seed: seed() });
    }
  }

  /* =========================================================
     Drums (Web Audio, synthesized, no files)
     ========================================================= */
  let ac = null, noiseBuf = null, timers = [];
  function audio() {
    if (!ac) {
      ac = new (window.AudioContext || window.webkitAudioContext)();
      noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ac.state === "suspended") ac.resume();
    return ac;
  }
  function env(g, t, peak, dur) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }
  function tone(t, f0, f1, dur, peak, type = "sine") {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.8);
    env(g, t, peak, dur); o.connect(g).connect(ac.destination); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(t, type, freq, dur, peak) {
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = noiseBuf; f.type = type; f.frequency.value = freq;
    env(g, t, peak, dur); s.connect(f).connect(g).connect(ac.destination); s.start(t); s.stop(t + dur + 0.05);
  }
  const SOUNDS = {
    kick: (t) => tone(t, 150, 42, 0.45, 0.9),
    snare: (t) => { noise(t, "highpass", 1200, 0.2, 0.5); tone(t, 220, 160, 0.12, 0.3, "triangle"); },
    hat: (t) => noise(t, "highpass", 7500, 0.06, 0.25),
    tom: (t) => tone(t, 240, 120, 0.32, 0.6),
    crash: (t) => { noise(t, "highpass", 5000, 1.1, 0.3); noise(t, "bandpass", 9000, 0.6, 0.2); },
  };
  function hit(drum, when, at) {
    const a = audio(), t = when ?? a.currentTime;
    SOUNDS[drum](t);
    timers.push(setTimeout(() => {
      splash(drum, at);
      stage.classList.remove("thump"); void stage.offsetWidth; stage.classList.add("thump");
      if (drum === "kick" && playing) { scenesEl.classList.remove("kick"); void scenesEl.offsetWidth; scenesEl.classList.add("kick"); }
    }, Math.max(0, (t - a.currentTime) * 1000)));
  }

  // tap the photo: where you tap decides the drum
  stage.addEventListener("pointerdown", (e) => {
    const r = pcv.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    if (x < -0.1 || x > 1.1 || y < -0.1 || y > 1.1) return;
    const drum = y < 0.3 ? (x < 0.5 ? "hat" : "crash") : y < 0.65 ? (x < 0.5 ? "snare" : "tom") : "kick";
    stage.classList.add("tapped");
    hit(drum, undefined, { x: Math.min(0.97, Math.max(0.03, x)), y: Math.min(0.97, Math.max(0.03, y)) });
  });

  /* groove: keherwa-flavored 8-beat, looping until you stop it.
     Each new bar moves to the next painting. */
  const groove = $("#groove");
  let barTimer = 0;
  const BAR = [
    ["kick", "hat", "crash"], ["hat"], ["snare", "hat"], ["hat", "kick"],
    ["kick", "hat"], ["hat", "tom"], ["snare", "hat"], ["tom", "hat"],
  ];
  function play() {
    const a = audio(), step = 60 / 96 / 2;
    let bar = 0, next = a.currentTime + 0.08;
    playing = true; groove.classList.add("on"); scenesEl.classList.add("fast");
    clearInterval(sceneTimer);
    $(".g-ic", groove).textContent = "■"; $(".g-tx", groove).textContent = "Stop";
    const barMs = BAR.length * step * 1000, LEAD = 350;
    // each bar is queued LEAD ms before it starts, on a steady timer
    const scheduleBar = () => {
      if (!playing || !ac) return;
      next = Math.max(next, ac.currentTime + 0.05);
      const t0 = next;
      BAR.forEach((hits, i) => hits.forEach((d) => { if (d !== "crash" || bar % 2 === 0) hit(d, t0 + i * step); }));
      // a new painting on every half bar
      [LEAD, LEAD + barMs / 2].forEach((ms, k) => { if (bar > 0 || k > 0) timers.push(setTimeout(() => playing && showScene(sceneIdx + 1), ms)); });
      bar++; next += BAR.length * step;
      timers = timers.slice(-40);
      barTimer = setTimeout(scheduleBar, bar === 1 ? barMs - LEAD : barMs);
    };
    scheduleBar();
  }
  function stop() {
    playing = false; groove.classList.remove("on"); scenesEl.classList.remove("fast", "kick");
    clearTimeout(barTimer); autoScenes();
    $(".g-ic", groove).textContent = "▶"; $(".g-tx", groove).textContent = "Play a groove";
    timers.forEach(clearTimeout); timers = [];
    if (ac) { ac.close(); ac = null; }
  }
  groove.addEventListener("click", () => (playing ? stop() : play()));

  /* =========================================================
     Bright watercolor washes on every tile
     ========================================================= */
  function wash(el, i) {
    const W = Math.round(el.offsetWidth / 2), H = Math.round(el.offsetHeight / 2);
    if (W < 10 || H < 10) return;
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d"), R = rng((i + 3) * 7919);
    const m = Math.min(Math.max(W, H) * 0.2, H * 0.5, 120);
    const left = i % 2 === 0;
    const spots = [
      [left ? 0.02 : 0.98, 0.04, 1, PIG[i % 7]],
      [left ? 0.97 : 0.03, 0.98, 0.8, PIG[(i + 3) % 7]],
      [left ? 0.2 + R() * 0.2 : 0.6 + R() * 0.2, 0.02, 0.45, PIG[(i + 5) % 7]],
    ];
    const a = dark() ? 0.03 : 0.024;
    spots.forEach(([x, y, k, c], j) => {
      const col = cssVar(c);
      bloomLayers(x * W, y * H, m * k, m * k * 0.85, (i + 1) * 131 + j * 17, 20).forEach((pts) => fill(ctx, pts, col, a));
    });
    el.style.setProperty("--wash", `url(${cv.toDataURL()})`);
  }
  function washAll() {
    $$(".entry, .pc-front, .cube-lab, .skill-group").forEach((el, i) => wash(el, i));
  }

  /* =========================================================
     Poker hand: dealt when it scrolls in
     ========================================================= */
  const hand = $("#hand");
  const cards = $$(".pcard", hand);
  cards.forEach((c) => {
    const i = +c.style.getPropertyValue("--i");
    c.style.setProperty("--lift", `${Math.abs(i - 2) * 14}px`);
    c.addEventListener("pointerleave", () => c.blur());
    c.addEventListener("click", (e) => {
      if (e.target.closest("a") || matchMedia("(hover: hover)").matches) return;
      const was = c.classList.contains("active");
      cards.forEach((x) => x.classList.remove("active"));
      if (!was) c.classList.add("active");
    });
  });
  function deal() {
    cards.forEach((c) => c.classList.remove("dealt", "active", "settled"));
    void hand.offsetWidth;
    cards.forEach((c, i) => {
      setTimeout(() => c.classList.add("dealt"), reduce ? 0 : 140 + i * 170);
      setTimeout(() => c.classList.add("settled"), reduce ? 0 : 1100 + i * 170);
    });
  }
  document.addEventListener("click", (e) => { if (!e.target.closest(".pcard")) cards.forEach((x) => x.classList.remove("active")); });
  if (reduce || !("IntersectionObserver" in window)) cards.forEach((c) => c.classList.add("dealt", "settled"));
  else {
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { deal(); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(hand);
  }
  $("#redeal").addEventListener("click", deal);

  /* =========================================================
     Rubik's cube: drag to spin, scramble + solve with a timer
     ========================================================= */
  (function cubeLab() {
    const COLORS = ["--cr", "--cb", "--co", "--cg", "--cw", "--cy"];
    const POS = ["front", "right", "back", "left", "top", "bottom"];
    const cube = $("#cube"), stickers = [];
    POS.forEach((p, f) => {
      const face = document.createElement("div");
      face.className = `face f-${p}`;
      for (let k = 0; k < 9; k++) {
        const s = document.createElement("i");
        s.style.backgroundColor = `var(${COLORS[f]})`;
        stickers.push({ el: s, home: COLORS[f] });
        face.appendChild(s);
      }
      cube.appendChild(face);
    });
    let ax = -24, ay = -34, vx = 0, vy = 0, dragging = false, lx = 0, ly = 0, hover = false;
    const render = () => (cube.style.transform = `rotateX(${ax}deg) rotateY(${ay}deg)`);
    render();
    const st = $("#cubeStage");
    st.addEventListener("pointerenter", () => (hover = true));
    st.addEventListener("pointerleave", () => (hover = false));
    st.addEventListener("pointerdown", (e) => { dragging = true; lx = e.clientX; ly = e.clientY; vx = vy = 0; st.classList.add("dragging"); st.setPointerCapture(e.pointerId); });
    st.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - lx, dy = e.clientY - ly;
      lx = e.clientX; ly = e.clientY;
      vy = dx * 0.45; vx = -dy * 0.45;
      ay += vy; ax = Math.max(-80, Math.min(80, ax + vx)); render();
    });
    const end = () => { dragging = false; st.classList.remove("dragging"); };
    st.addEventListener("pointerup", end); st.addEventListener("pointercancel", end);
    (function loop() {
      if (!dragging) {
        vx *= 0.94; vy *= 0.94;
        ay += vy + (hover || reduce ? 0 : 0.12);
        ax = Math.max(-80, Math.min(80, ax + vx)); render();
      }
      requestAnimationFrame(loop);
    })();

    const MOVES = ["R", "L", "U", "D", "F", "B"], MOD = ["", "'", "2"];
    const clock = $("#clock"), state = $("#cubeState"), scr = $("#scramble"), bS = $("#btnScramble"), bV = $("#btnSolve");
    let t0 = 0, raf = 0;
    const fmt = (ms) => `${String(Math.floor(ms / 60000)).padStart(2, "0")}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}.${String(Math.floor(ms / 10) % 100).padStart(2, "0")}`;
    const tick = () => { clock.textContent = fmt(performance.now() - t0); raf = requestAnimationFrame(tick); };
    const paint = (fn) => stickers.forEach((s, i) => setTimeout(() => {
      s.el.classList.add("flip"); s.el.style.backgroundColor = `var(${fn(s)})`;
      setTimeout(() => s.el.classList.remove("flip"), 220);
    }, reduce ? 0 : i * 9));
    bS.addEventListener("click", () => {
      let last = "", seq = [];
      while (seq.length < 20) { const m = MOVES[Math.floor(Math.random() * 6)]; if (m === last) continue; last = m; seq.push(m + MOD[Math.floor(Math.random() * 3)]); }
      scr.textContent = seq.join(" ");
      paint(() => COLORS[Math.floor(Math.random() * 6)]);
      vy = 14; state.textContent = "SCRAMBLED"; state.classList.add("scrambled");
      bV.disabled = false; cancelAnimationFrame(raf); t0 = performance.now(); tick();
    });
    bV.addEventListener("click", () => {
      cancelAnimationFrame(raf);
      const time = fmt(performance.now() - t0);
      clock.textContent = time; paint((s) => s.home);
      vy = -14; state.textContent = "SOLVED"; state.classList.remove("scrambled");
      scr.textContent = `Solved in ${time}. Scramble again?`; bV.disabled = true;
    });
  })();

  /* =========================================================
     The quote: a painted band with lanterns (light) or fireflies (dark)
     ========================================================= */
  const band = document.createElement("section");
  band.className = "quote-band";
  band.setAttribute("aria-label", "A favorite quote");
  band.innerHTML = `
    <div class="qb-scene" aria-hidden="true"></div>
    <canvas class="qb-glow" aria-hidden="true"></canvas>
    <blockquote class="qb-quote">
      <p>${S.quote[0].split(" ").map((w, i) => `<span style="--d:${i}">${w}</span>`).join(" ")}</p>
      <cite>${S.quote[1]}</cite>
    </blockquote>`;
  $("#contact").before(band);
  const qGlow = $(".qb-glow", band);
  let glow = { ctx: null, W: 0, H: 0 }, motes = [], bandOn = false;
  function seedMotes() {
    glow = fitCanvas(qGlow);
    const n = Math.round(Math.min(46, glow.W / 30));
    motes = Array.from({ length: n }, () => ({
      x: Math.random() * glow.W, y: Math.random() * glow.H,
      s: dark() ? 1.6 + Math.random() * 2 : 5 + Math.random() * 9,
      v: 0.15 + Math.random() * 0.35, ph: Math.random() * 6.28, w: 0.4 + Math.random() * 0.8,
    }));
  }
  function drawMotes(t) {
    const { ctx, W, H } = glow;
    ctx.clearRect(0, 0, W, H);
    const night = dark();
    motes.forEach((m) => {
      if (!reduce) {
        if (night) { m.x += Math.cos(t / 1400 * m.w + m.ph) * 0.35; m.y += Math.sin(t / 1700 * m.w + m.ph) * 0.3; }
        else { m.y -= m.v; m.x += Math.sin(t / 2000 + m.ph) * 0.15; if (m.y < -30) { m.y = H + 20; m.x = Math.random() * W; } }
        m.x = (m.x + W) % W; m.y = night ? (m.y + H) % H : m.y;
      }
      if (night) {
        const on = 0.55 + 0.45 * Math.sin(t / 900 * m.w + m.ph);
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.s * 7);
        g.addColorStop(0, `rgba(255,230,140,${0.9 * on})`); g.addColorStop(0.25, `rgba(255,205,90,${0.35 * on})`); g.addColorStop(1, "rgba(255,200,80,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(m.x, m.y, m.s * 7, 0, 7); ctx.fill();
      } else {
        // a little paper lantern with a warm glow
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.s * 3);
        g.addColorStop(0, "rgba(255,214,140,.55)"); g.addColorStop(1, "rgba(255,170,90,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(m.x, m.y, m.s * 3, 0, 7); ctx.fill();
        ctx.fillStyle = "rgba(255,226,170,.95)";
        ctx.beginPath(); ctx.ellipse(m.x, m.y, m.s * 0.55, m.s * 0.75, 0, 0, 7); ctx.fill();
        ctx.fillStyle = "rgba(255,150,70,.6)"; ctx.fillRect(m.x - m.s * 0.4, m.y + m.s * 0.55, m.s * 0.8, m.s * 0.16);
      }
    });
  }
  (function bandLoop(t) { requestAnimationFrame(bandLoop); if (bandOn && glow.ctx) drawMotes(t || 0); })();

  /* =========================================================
     Contact: snow falling on a hot chocolate
     ========================================================= */
  const sec = $("#contact");
  const snowCv = document.createElement("canvas");
  snowCv.className = "snow"; snowCv.setAttribute("aria-hidden", "true");
  sec.prepend(snowCv);
  let snow = { ctx: null, W: 0, H: 0 }, flakes = [], melting = [], wind = 0, windTarget = 0, snowOn = false, lastT = 0;
  const mugTop = () => {
    const el = $("#mugTop"), a = el && el.getBoundingClientRect(), b = sec.getBoundingClientRect();
    return a ? { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height } : null;
  };
  let cup = null;
  function flake(top) {
    const z = Math.random(); // depth: 0 far, 1 near
    return {
      x: Math.random() * snow.W, y: top ? -10 - Math.random() * 40 : Math.random() * snow.H,
      r: 0.8 + z * z * 3.4, z, vy: 0.35 + z * 1.1, ph: Math.random() * 6.28, sw: 0.4 + Math.random() * 0.9,
      rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.02, crystal: z > 0.82,
    };
  }
  function seedSnow() {
    snow = fitCanvas(snowCv);
    cup = mugTop();
    const n = Math.round(Math.min(170, (snow.W * snow.H) / 7000));
    flakes = Array.from({ length: n }, () => flake(false));
    melting = [];
  }
  function drawFlake(ctx, f, alpha) {
    ctx.globalAlpha = alpha;
    if (f.crystal) {
      ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rot);
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.1; ctx.lineCap = "round";
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (k * Math.PI) / 3, L = f.r * 2.1, cx = Math.cos(a), sy = Math.sin(a);
        ctx.moveTo(0, 0); ctx.lineTo(cx * L, sy * L);
        const bx = cx * L * 0.55, by = sy * L * 0.55, b1 = a + 0.6, b2 = a - 0.6;
        ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(b1) * L * 0.32, by + Math.sin(b1) * L * 0.32);
        ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(b2) * L * 0.32, by + Math.sin(b2) * L * 0.32);
      }
      ctx.stroke(); ctx.restore();
    } else {
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 7); ctx.fill();
    }
  }
  function snowFrame(t) {
    const dt = Math.min(3, (t - lastT) / 16.7 || 1); lastT = t;
    const { ctx, W, H } = snow;
    ctx.clearRect(0, 0, W, H);
    wind += (windTarget - wind) * 0.02;
    windTarget *= 0.985;
    const gust = Math.sin(t / 5200) * 0.35 + Math.sin(t / 2300) * 0.15;
    ctx.shadowColor = "rgba(255,255,255,.6)";
    flakes.forEach((f, i) => {
      f.y += f.vy * dt;
      f.x += (Math.sin(t / 1000 * f.sw + f.ph) * 0.35 + (gust + wind) * (0.4 + f.z)) * dt;
      f.rot += f.vr * dt;
      if (cup && f.z > 0.35 && f.x > cup.x + 6 && f.x < cup.x + cup.w - 6) {
        // land on the whipped cream, then melt into the warm cocoa
        const surface = cup.y + cup.h * (0.35 + 0.25 * Math.abs((f.x - cup.x) / cup.w - 0.5) * 2);
        if (f.y > surface && f.y < surface + 8) { melting.push({ ...f, y: surface, life: 1 }); flakes[i] = flake(true); return; }
      }
      if (f.y > H + 10 || f.x < -30 || f.x > W + 30) { flakes[i] = flake(true); if (f.x < -30) flakes[i].x = W + 10; }
      ctx.shadowBlur = f.z > 0.7 ? 6 : 0;
      drawFlake(ctx, f, 0.35 + f.z * 0.6);
    });
    melting = melting.filter((m) => {
      m.life -= 0.008 * dt;
      if (m.life <= 0) return false;
      const r0 = m.r; m.r = r0 * (0.5 + m.life * 0.5);
      ctx.shadowBlur = 0; drawFlake(ctx, m, m.life * 0.9); m.r = r0;
      return true;
    });
    ctx.globalAlpha = 1;
  }
  (function snowLoop(t) { requestAnimationFrame(snowLoop); if (snowOn && snow.ctx) snowFrame(t || 0); })();
  sec.addEventListener("pointermove", (e) => { windTarget = Math.max(-2.5, Math.min(2.5, (e.movementX || 0) * 0.08)); });

  // only animate what's on screen
  const watch = (el, on) => {
    if (!("IntersectionObserver" in window)) return on(true);
    new IntersectionObserver((es) => on(es[0].isIntersecting), { rootMargin: "120px" }).observe(el);
  };
  watch(band, (v) => { bandOn = v && !reduce; if (v && reduce && glow.ctx) drawMotes(0); band.classList.toggle("in", v || band.classList.contains("in")); });
  watch(sec, (v) => { snowOn = v && !reduce; if (v) cup = mugTop(); if (v && reduce && snow.ctx) snowFrame(0); });

  /* =========================================================
     Layout + theme changes
     ========================================================= */
  function layout() {
    sizePortrait(); paintIn(true);
    behind.repaint(); onTop.repaint();
    seedMotes(); seedSnow(); washAll(); papers();
  }
  let lastW = innerWidth;
  addEventListener("resize", () => {
    clearTimeout(layout.t);
    layout.t = setTimeout(() => { if (innerWidth !== lastW) { lastW = innerWidth; layout(); } else { cup = mugTop(); } }, 180);
  });
  addEventListener("themechange", () => {
    buildScenes(); behind.repaint(); onTop.repaint(); seedMotes(); washAll(); papers();
    if (photo.complete && photo.naturalWidth) composite();
    if (reduce) { drawMotes(0); }
  });
  seedMotes(); seedSnow(); papers();
  const ready = () => { seedMotes(); seedSnow(); washAll(); papers(); if (reduce) drawMotes(0); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ready); else addEventListener("load", ready);
})();
