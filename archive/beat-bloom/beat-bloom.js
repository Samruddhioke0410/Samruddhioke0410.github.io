/* ============ BEAT & BLOOM: synth drums that paint watercolor ============ */
(function () {
  const $ = (s) => document.querySelector(s);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  SiteTheme.init();
  SiteRender.mount($("#content"), { base: "../../", titles: { beyond: "Off the clock" } });
  SiteRender.navSpy($(".menu"));
  $("#yr").textContent = new Date().getFullYear();
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- watercolor canvas ---------- */
  const canvas = $("#paint"), ctx = canvas.getContext("2d");
  const DRUMS = { kick: "--p1", snare: "--p2", hat: "--p3", tom: "--p4", crash: "--p5" };
  let W = 0, H = 0, blooms = [], queue = [];
  const dark = () => document.documentElement.dataset.theme === "dark";
  const color = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

  function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }
  function gauss(r) { return (r() + r() + r() + r() - 2) / 2; }
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
  function polygon(cx, cy, rad, n, r) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, rr = rad * (0.8 + r() * 0.4);
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    return pts;
  }

  // a bloom paints over several frames so it visibly spreads
  function bloom(b) {
    const r = rng(b.seed);
    const base = deform(polygon(b.x * W, b.y * H, b.r * Math.min(W, H), 10, r), 3, 0.45, r);
    const hex = color(b.c);
    const layers = 26;
    for (let l = 0; l < layers; l++) {
      const grow = 0.75 + (l / layers) * 0.35;
      const pts = deform(base.map(([x, y]) => [b.x * W + (x - b.x * W) * grow, b.y * H + (y - b.y * H) * grow]), 2, 0.6, r);
      queue.push({ pts, hex, a: dark() ? 0.035 : 0.045 });
    }
  }
  function drawLayer({ pts, hex, a }) {
    ctx.globalCompositeOperation = dark() ? "screen" : "multiply";
    ctx.globalAlpha = a;
    ctx.fillStyle = hex;
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fill();
  }
  (function frame() {
    const n = reduce ? queue.length : Math.min(queue.length, 6);
    for (let i = 0; i < n; i++) drawLayer(queue.shift());
    requestAnimationFrame(frame);
  })();

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    repaint();
  }
  function repaint() {
    ctx.clearRect(0, 0, W, H);
    queue = [];
    blooms.forEach(bloom);
    if (reduce) queue.splice(0).forEach(drawLayer);
  }
  function addBloom(drum) {
    // favor the edges so the name stays readable
    const edge = Math.random() < 0.75;
    const x = edge ? (Math.random() < 0.5 ? Math.random() * 0.3 : 0.7 + Math.random() * 0.3) : 0.2 + Math.random() * 0.6;
    const y = 0.08 + Math.random() * 0.84;
    const b = { x, y, r: drum === "kick" ? 0.16 : drum === "crash" ? 0.2 : 0.1 + Math.random() * 0.06, c: DRUMS[drum], seed: Math.floor(Math.random() * 1e9) + 1 };
    blooms.push(b);
    if (blooms.length > 40) { blooms.shift(); repaint(); } else bloom(b);
  }

  // a few blooms already on the paper
  blooms = [
    { x: 0.08, y: 0.22, r: 0.2, c: "--p1", seed: 11 }, { x: 0.93, y: 0.18, r: 0.17, c: "--p2", seed: 23 },
    { x: 0.9, y: 0.82, r: 0.2, c: "--p4", seed: 37 }, { x: 0.12, y: 0.86, r: 0.16, c: "--p3", seed: 51 },
    { x: 0.8, y: 0.55, r: 0.07, c: "--p5", seed: 77 },
  ];
  addEventListener("resize", () => { clearTimeout(resize.t); resize.t = setTimeout(resize, 150); });
  addEventListener("themechange", repaint);
  resize();
  $("#clearPaint").addEventListener("click", () => { blooms = []; repaint(); });

  /* ---------- drums (Web Audio, synthesized, no files) ---------- */
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

  const pads = {};
  document.querySelectorAll(".pad").forEach((p) => (pads[p.dataset.d] = p));
  function hit(drum, when) {
    const a = audio();
    const t = when ?? a.currentTime;
    SOUNDS[drum](t);
    const delay = Math.max(0, (t - a.currentTime) * 1000);
    timers.push(setTimeout(() => {
      const p = pads[drum];
      p.classList.remove("hit"); void p.offsetWidth; p.classList.add("hit");
      setTimeout(() => p.classList.remove("hit"), 130);
      addBloom(drum);
    }, delay));
  }
  Object.entries(pads).forEach(([d, p]) => p.addEventListener("pointerdown", (e) => { e.preventDefault(); hit(d); }));
  Object.entries(pads).forEach(([d, p]) => p.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); hit(d); } }));
  const KEYS = { a: "kick", s: "snare", d: "hat", j: "tom", k: "crash" };
  addEventListener("keydown", (e) => {
    if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
    if (/input|textarea/i.test(document.activeElement?.tagName)) return;
    const d = KEYS[e.key.toLowerCase()];
    if (d && scrollY < innerHeight) hit(d);
  });

  /* ---------- a groove: keherwa-flavored 8-beat, two bars ---------- */
  const groove = $("#groove");
  let playing = false;
  const BAR = [
    ["kick", "hat", "crash"], ["hat"], ["snare", "hat"], ["hat", "kick"],
    ["kick", "hat"], ["hat", "tom"], ["snare", "hat"], ["tom", "hat"],
  ];
  function play() {
    const a = audio(), step = 60 / 96 / 2, t0 = a.currentTime + 0.08;
    playing = true; groove.textContent = "■ Stop";
    const seq = [...BAR, ...BAR.map((s, i) => (i === 0 ? s.filter((x) => x !== "crash") : s)), ["crash", "kick"]];
    seq.forEach((hits, i) => hits.forEach((d) => hit(d, t0 + i * step)));
    timers.push(setTimeout(stop, (seq.length * step + 0.4) * 1000));
  }
  function stop() {
    playing = false; groove.textContent = "▶ Play a groove";
    timers.forEach(clearTimeout); timers = [];
    if (ac) { ac.close(); ac = null; }
  }
  groove.addEventListener("click", () => (playing ? stop() : play()));
})();
