/* ============ CUBED: interactive Rubik's cube cover ============ */
(function () {
  const $ = (s) => document.querySelector(s);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  SiteTheme.init();
  SiteRender.mount($("#content"), {
    base: "../../",
    titles: { beyond: "Off the clock", contact: "Contact" },
    num: () => "<i></i>".repeat(9),
  });
  SiteRender.navSpy($(".menu"));
  $("#yr").textContent = new Date().getFullYear();

  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- the cube ---------- */
  const css = getComputedStyle(document.documentElement);
  const C = (v) => css.getPropertyValue(v).trim();
  // each face: its solved color + the section its center sticker opens
  const FACES = [
    ["front", "--r", "About", "#about"],
    ["right", "--b", "Research", "#research"],
    ["back", "--o", "Experience", "#experience"],
    ["left", "--g", "Projects", "#projects"],
    ["top", "--w", "Say hi", "#contact"],
    ["bottom", "--y", "Skills", "#skills"],
  ];
  const cube = $("#cube");
  const stickers = [];
  FACES.forEach(([pos, color, label, href], f) => {
    const face = document.createElement("div");
    face.className = `face f-${pos}`;
    for (let k = 0; k < 9; k++) {
      const s = document.createElement("div");
      s.className = "st" + (k === 4 ? " center" : "");
      s.style.background = C(color);
      if (k === 4) {
        s.innerHTML = `<span>${label}</span>`;
        s.dataset.href = href;
        s.setAttribute("role", "link");
        s.setAttribute("aria-label", `Go to ${label}`);
      } else stickers.push({ el: s, home: color });
      face.appendChild(s);
    }
    cube.appendChild(face);
  });

  // rotation state
  let ax = -24, ay = -34, vx = 0, vy = 0, dragging = false, moved = 0, lx = 0, ly = 0, hover = false;
  const render = () => (cube.style.transform = `rotateX(${ax}deg) rotateY(${ay}deg)`);
  render();

  const stage = $("#stage");
  stage.addEventListener("pointerenter", () => (hover = true));
  stage.addEventListener("pointerleave", () => (hover = false));
  stage.addEventListener("pointerdown", (e) => {
    dragging = true; moved = 0; lx = e.clientX; ly = e.clientY; vx = vy = 0;
    stage.classList.add("dragging");
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lx, dy = e.clientY - ly;
    lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
    vy = dx * 0.45; vx = -dy * 0.45;
    ay += vy; ax = Math.max(-80, Math.min(80, ax + vx));
    render();
  });
  const end = (e) => {
    if (!dragging) return;
    dragging = false; stage.classList.remove("dragging");
    if (moved < 6) {
      // a tap: find the center sticker under the pointer
      stage.releasePointerCapture?.(e.pointerId);
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const c = hit && hit.closest(".st.center");
      if (c) document.querySelector(c.dataset.href)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
  };
  stage.addEventListener("pointerup", end);
  stage.addEventListener("pointercancel", end);

  // idle spin + inertia
  (function loop() {
    if (!dragging) {
      vx *= 0.94; vy *= 0.94;
      ay += vy + (hover || reduce ? 0 : 0.12);
      ax = Math.max(-80, Math.min(80, ax + vx));
      render();
    }
    requestAnimationFrame(loop);
  })();

  /* ---------- scramble / solve with a speedcube timer ---------- */
  const MOVES = ["R", "L", "U", "D", "F", "B"], MOD = ["", "'", "2"];
  const palette = ["--r", "--b", "--o", "--g", "--w", "--y"];
  const clock = $("#clock"), state = $("#cubeState"), scr = $("#scramble");
  const bS = $("#btnScramble"), bV = $("#btnSolve");
  let t0 = 0, raf = 0;
  const fmt = (ms) => {
    const m = Math.floor(ms / 60000), s = Math.floor(ms / 1000) % 60, cs = Math.floor(ms / 10) % 100;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
  };
  const tick = () => { clock.textContent = fmt(performance.now() - t0); raf = requestAnimationFrame(tick); };

  const paint = (pick) => stickers.forEach((s, i) => setTimeout(() => {
    s.el.classList.add("flip");
    s.el.style.background = C(pick(s));
    setTimeout(() => s.el.classList.remove("flip"), 220);
  }, reduce ? 0 : i * 9));

  bS.addEventListener("click", () => {
    let last = "", seq = [];
    while (seq.length < 20) {
      const m = MOVES[Math.floor(Math.random() * 6)];
      if (m === last) continue;
      last = m; seq.push(m + MOD[Math.floor(Math.random() * 3)]);
    }
    scr.textContent = seq.join(" ");
    paint(() => palette[Math.floor(Math.random() * 6)]);
    vy = 14;
    state.textContent = "SCRAMBLED"; state.classList.add("scrambled");
    bV.disabled = false;
    cancelAnimationFrame(raf); t0 = performance.now(); tick();
  });
  bV.addEventListener("click", () => {
    cancelAnimationFrame(raf);
    const time = fmt(performance.now() - t0);
    clock.textContent = time;
    paint((s) => s.home);
    vy = -14;
    state.textContent = "SOLVED"; state.classList.remove("scrambled");
    scr.textContent = `Solved in ${time}. Scramble again?`;
    bV.disabled = true;
  });

  // re-read colors after theme flips (white face stays white, but keep in sync)
  addEventListener("themechange", () => {
    stickers.forEach((s) => { if (state.textContent === "SOLVED") s.el.style.background = C(s.home); });
  });
})();
