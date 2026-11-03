/* =========================================================
   Samruddhi Oke · Night Cabin · main.js
   ========================================================= */

// Links that are optional. Fill these in and the buttons appear automatically;
// leave a value empty and its button stays hidden.
const LINKS = {
  icta: "",   // I Can't Tell Anyone website, e.g. "https://..."
  radio: "",  // radio show / station page
};

const SKILLS = {
  "Languages": [
    ["Python", "devicon-python-plain colored"], ["Java", "devicon-java-plain colored"],
    ["C++", "devicon-cplusplus-plain colored"], ["C", "devicon-c-plain colored"],
    ["Go", "devicon-go-original-wordmark colored"], ["TypeScript", "devicon-typescript-plain colored"],
    ["JavaScript", "devicon-javascript-plain colored"], ["C#", "devicon-csharp-plain colored"],
    ["SQL", "SQL"], ["Solidity", "devicon-solidity-plain"],
    ["Rust", "devicon-rust-original"], ["R", "devicon-r-plain colored"],
    ["MATLAB", "devicon-matlab-plain colored"], ["Kotlin", "devicon-kotlin-plain colored"],
  ],
  "Full-Stack": [
    ["React", "devicon-react-original colored"], ["Next.js", "devicon-nextjs-plain"],
    ["Node.js", "devicon-nodejs-plain colored"], ["FastAPI", "devicon-fastapi-plain colored"],
    ["Flask", "devicon-flask-original"], ["SQLAlchemy", "SA"],
    ["Tailwind CSS", "devicon-tailwindcss-original colored"], ["REST APIs", "API"],
    ["CI/CD", "devicon-githubactions-plain colored"], ["HTML/CSS", "devicon-html5-plain colored"],
  ],
  "AI / ML": [
    ["PyTorch", "devicon-pytorch-original colored"], ["TensorFlow", "devicon-tensorflow-original colored"],
    ["scikit-learn", "devicon-scikitlearn-plain colored"], ["Keras", "devicon-keras-plain colored"],
    ["Hugging Face", "🤗"], ["LangChain", "LC"], ["LangGraph", "LG"],
    ["OpenCV", "devicon-opencv-plain colored"], ["CUDA", "CU"], ["Triton", "TR"], ["JAX", "JAX"],
  ],
  "Infra & Tools": [
    ["ROS", "ROS"], ["AWS", "devicon-amazonwebservices-plain-wordmark colored"],
    ["GCP", "devicon-googlecloud-plain colored"], ["Docker", "devicon-docker-plain colored"],
    ["Git", "devicon-git-plain colored"], ["Redis", "devicon-redis-plain colored"],
    ["PostgreSQL", "devicon-postgresql-plain colored"], ["Kafka", "devicon-apachekafka-original colored"],
    ["Linux / Unix", "devicon-linux-plain"], ["Firebase", "devicon-firebase-plain colored"],
    ["Claude Code", "CC"], ["Cursor", "⌘"],
  ],
};

const ROLES = ["Software Engineer", "AI/ML Researcher", "Founder", "Robotics Builder", "Teaching Assistant"];
const SABER_COLORS = [
  ["#ff2d3d", "255, 45, 61"],   // sith red (default)
  ["#3d8bff", "61, 139, 255"],  // jedi blue
  ["#36e07a", "54, 224, 122"],  // yoda green
  ["#b45cff", "180, 92, 255"],  // mace purple
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// Deterministic random so the sky is the same on every visit
function rng(seed) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}
const svgNS = "http://www.w3.org/2000/svg";

/* ---------- Sky: static stars (no pulsing) ---------- */
(function stars() {
  const g = $("#stars");
  if (!g) return;
  const r = rng(42);
  for (let i = 0; i < 170; i++) {
    const c = document.createElementNS(svgNS, "circle");
    const y = Math.pow(r(), 1.6) * 430;
    c.setAttribute("cx", (r() * 1600).toFixed(1));
    c.setAttribute("cy", y.toFixed(1));
    c.setAttribute("r", (r() < 0.08 ? 1.7 : 0.5 + r() * 0.9).toFixed(2));
    c.setAttribute("opacity", (0.35 + r() * 0.6 * (1 - y / 520)).toFixed(2));
    g.appendChild(c);
  }
})();

/* ---------- Pine trees ---------- */
function pine(x, base, h, fill) {
  const w = h * 0.42;
  const tiers = 4;
  let d = "";
  for (let t = 0; t < tiers; t++) {
    const top = base - h + (t * h) / (tiers + 0.6);
    const bot = top + h * 0.42;
    const ww = w * (0.45 + t * 0.2);
    d += `M${x} ${top} L${x + ww} ${bot} L${x - ww} ${bot}Z `;
  }
  d += `M${x - 2} ${base - h * 0.12} h4 v${h * 0.14} h-4Z`;
  const p = document.createElementNS(svgNS, "path");
  p.setAttribute("d", d);
  p.setAttribute("fill", fill);
  return p;
}
(function trees() {
  const far = $("#treesFar"), near = $("#treesNear");
  if (!far || !near) return;
  const r = rng(7);
  // far rows along both banks, avoiding the river channel
  for (let x = 0; x < 1600; x += 14 + r() * 16) {
    if (x > 690 && x < 900) continue;
    const base = 650 + r() * 30 + (x < 700 ? (700 - x) * 0.02 : (x - 900) * 0.015);
    far.appendChild(pine(x, base, 34 + r() * 30, "#121937"));
  }
  // near clusters framing the scene (left heavy, right around the cabin)
  const spots = [[40, 820, 150], [110, 800, 120], [190, 840, 170], [270, 790, 100], [340, 820, 120],
                 [1080, 760, 90], [1140, 770, 110], [1400, 760, 130], [1470, 790, 160], [1550, 770, 120]];
  spots.forEach(([x, b, h]) => near.appendChild(pine(x, b, h, "#080d1f")));
})();

/* ---------- Keep the cabin + moon in frame on narrow screens ---------- */
(function frameScene() {
  const scene = $(".scene");
  const mq = window.matchMedia("(max-width: 700px)");
  const set = () => scene.setAttribute("viewBox", mq.matches ? "860 0 640 900" : "0 0 1600 900");
  set();
  mq.addEventListener("change", set);
})();

/* ---------- Parallax ("look beyond") ---------- */
(function parallax() {
  if (reduceMotion) return;
  const layers = $$(".scene .layer").map((el) => [el, parseFloat(el.dataset.depth)]);
  const copy = $(".hero-copy");
  const hero = $(".hero");
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    if (y < hero.offsetHeight) {
      layers.forEach(([el, d]) => (el.style.transform = `translate3d(0, ${y * d}px, 0)`));
      copy.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
      copy.style.opacity = Math.max(0, 1 - y / (hero.offsetHeight * 0.6));
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
})();

/* ---------- Role rotator ---------- */
(function roles() {
  const el = $("#roleRotator");
  if (!el || reduceMotion) return;
  let i = 0, ch = ROLES[0].length, deleting = true;
  const tick = () => {
    ch += deleting ? -1 : 1;
    el.textContent = ROLES[i].slice(0, ch);
    if (deleting && ch === 0) {
      deleting = false;
      i = (i + 1) % ROLES.length;
      return setTimeout(tick, 300);
    }
    if (!deleting && ch === ROLES[i].length) {
      deleting = true;
      return setTimeout(tick, 2200);
    }
    setTimeout(tick, deleting ? 40 : 75);
  };
  setTimeout(tick, 2600);
})();

/* ---------- Skills ---------- */
(function skills() {
  const root = $("#skillGroups");
  if (!root) return;
  Object.entries(SKILLS).forEach(([group, items], gi) => {
    const wrap = document.createElement("div");
    wrap.className = "skill-group reveal";
    wrap.innerHTML = `<h3><span class="mono">0${gi + 1}</span>${group}</h3><div class="skill-grid"></div>`;
    const grid = $(".skill-grid", wrap);
    items.forEach(([name, icon]) => {
      const tile = document.createElement("div");
      tile.className = "skill";
      tile.innerHTML = icon.startsWith("devicon")
        ? `<i class="${icon}" aria-hidden="true"></i><span>${name}</span>`
        : `<span class="mono-ic" aria-hidden="true">${icon}</span><span>${name}</span>`;
      grid.appendChild(tile);
    });
    root.appendChild(wrap);
  });
})();

/* ---------- Optional links ---------- */
$$("[data-link]").forEach((a) => {
  const url = LINKS[a.dataset.link];
  if (url) a.href = url;
  else {
    a.style.display = "none";
    const fb = $(`[data-fallback="${a.dataset.link}"]`);
    if (fb) fb.style.display = "inline";
  }
});

/* ---------- Media fallbacks ---------- */
(function media() {
  const img = $("#portrait");
  if (img) {
    const hide = () => (img.style.display = "none");
    if (img.complete && !img.naturalWidth) hide();
    img.addEventListener("error", hide);
  }
  const vid = $("#reachyVideo"), box = $("#reachyMedia");
  if (vid && box) {
    const off = () => box.classList.add("no-video");
    vid.addEventListener("error", off);
    if (vid.error) off();
  }
})();

/* ---------- Reveal + lightsabers igniting ---------- */
(function reveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach((e) => io.observe(e));
})();

/* ---------- Saber color easter egg ---------- */
(function saber() {
  let idx = 0;
  $$(".hilt").forEach((h) => h.addEventListener("click", () => {
    idx = (idx + 1) % SABER_COLORS.length;
    const [hex, rgb] = SABER_COLORS[idx];
    const s = document.documentElement.style;
    s.setProperty("--saber", hex);
    s.setProperty("--saber-soft", `rgba(${rgb}, 0.14)`);
    s.setProperty("--saber-glow", `rgba(${rgb}, 0.55)`);
    // re-ignite every beam
    $$(".sec-head.in").forEach((sh) => {
      sh.classList.remove("in"); void sh.offsetWidth; sh.classList.add("in");
    });
  }));
})();

/* ---------- Nav ---------- */
(function nav() {
  const navEl = $("#nav"), toggle = $("#navToggle"), links = $("#navLinks");
  const onScroll = () => navEl.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("a", links).forEach((a) => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  const map = new Map($$('a[href^="#"]', links).map((a) => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const a = map.get(e.target.id);
      if (a && e.isIntersecting) {
        map.forEach((l) => l.classList.remove("active"));
        a.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
})();

/* ---------- Poker hand ---------- */
$$(".card").forEach((c) => {
  const i = parseFloat(getComputedStyle(c).getPropertyValue("--i")) || 0;
  c.style.setProperty("--lift", `${Math.abs(i - 2.5) * 12}px`);
  c.addEventListener("click", () => {
    const was = c.classList.contains("active");
    $$(".card.active").forEach((x) => x.classList.remove("active"));
    if (!was) c.classList.add("active");
  });
});

/* ---------- Rubik's cube ---------- */
(function rubik() {
  const cube = $("#rubik");
  if (!cube) return;
  const COLORS = ["#ff2d3d", "#ffffff", "#3d8bff", "#36e07a", "#ffb35c", "#ffe14d"];
  const faces = [...Array(6)].map((_, f) => {
    const face = document.createElement("div");
    face.className = `face f${f}`;
    for (let k = 0; k < 9; k++) {
      const s = document.createElement("i");
      s.style.background = COLORS[f];
      face.appendChild(s);
    }
    cube.appendChild(face);
    return face;
  });
  let solved = true;
  cube.addEventListener("click", (e) => {
    e.stopPropagation();
    faces.forEach((face, f) => $$("i", face).forEach((s) => {
      s.style.background = solved ? COLORS[Math.floor(Math.random() * 6)] : COLORS[f];
    }));
    solved = !solved;
    cube.title = solved ? "Click to scramble" : "Click to solve";
  });
})();

$("#year").textContent = new Date().getFullYear();
