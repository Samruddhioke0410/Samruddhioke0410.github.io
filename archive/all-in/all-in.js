/* ============ ALL IN: dealt royal flush + market ticker ============ */
(function () {
  const $ = (s) => document.querySelector(s);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  SiteTheme.init();
  const RANKS = ["A", "K", "Q", "J", "10", "9", "8", "7"];
  const SUITS = ["♠", "♥", "♦", "♣"];
  SiteRender.mount($("#content"), {
    base: "../../",
    titles: { beyond: "Off the table", leadership: "Leadership" },
    num: (i) => {
      const s = SUITS[i % 4];
      const black = s === "♠" || s === "♣";
      return `<span style="color:${black ? "#1d1a16" : "#c8102e"}">${RANKS[i]}<br>${s}</span>`;
    },
  });
  document.querySelectorAll(".interest").forEach((el, i) => el.setAttribute("data-suit", SUITS[i % 4]));
  SiteRender.navSpy($(".menu"));
  $("#yr").textContent = new Date().getFullYear();

  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- the deal ---------- */
  const CARDS = [
    ["A", "Engineer", "ZetaChain · ICTA", "#experience"],
    ["K", "Researcher", "PilotProxy · CHI '27", "#research"],
    ["Q", "Founder", "I Can't Tell Anyone", "#experience"],
    ["J", "Teacher", "TA × 3 courses", "#experience"],
    ["10", "Builder", "4 projects", "#projects"],
  ];
  const hand = $("#hand"), deck = $("#deck"), handName = $("#handName");
  let dealing = false;

  function deal(order) {
    if (dealing) return;
    dealing = true;
    handName.classList.remove("show");
    hand.innerHTML = order.map(([r, role, where, href]) => `
      <div class="pcard" data-href="${href}" role="link" tabindex="0" aria-label="${role}: ${where}">
        <div class="back"></div>
        <div class="front">
          <span class="cr tl">${r}<small>♥</small></span>
          <span class="pip">♥</span>
          <span class="role">${role}</span>
          <span class="where">${where}</span>
          <span class="cr br">${r}<small>♥</small></span>
        </div>
      </div>`).join("");
    const cards = [...hand.children];
    const d = deck.getBoundingClientRect();
    const deckVisible = d.width > 0;
    cards.forEach((c) => {
      const r = c.getBoundingClientRect();
      const dx = deckVisible ? d.left + d.width / 2 - (r.left + r.width / 2) : 0;
      const dy = deckVisible ? d.top + d.height / 2 - (r.top + r.height / 2) : -60;
      c.style.transition = "none";
      c.style.opacity = "0";
      c.style.transform = `translate(${dx}px, ${dy}px) rotate(-28deg) scale(.7)`;
    });
    hand.offsetWidth; // flush
    const step = reduce ? 0 : 170;
    cards.forEach((c, i) => {
      setTimeout(() => {
        c.style.transition = "";
        c.style.opacity = "1";
        c.style.transform = "";
      }, 80 + i * step);
      setTimeout(() => c.classList.add("up"), 80 + i * step + (reduce ? 0 : 520));
    });
    setTimeout(() => { handName.classList.add("show"); dealing = false; }, 80 + cards.length * step + 700);

    cards.forEach((c) => {
      const go = () => document.querySelector(c.dataset.href)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      c.addEventListener("click", go);
      c.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
    });
  }

  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  addEventListener("load", () => deal(CARDS));
  $("#dealAgain").addEventListener("click", () => deal(shuffle(CARDS)));

  /* ---------- ticker ---------- */
  const T = [
    ["ICTA", "160+ users", 1], ["INFER", "<25 ms", 1], ["ZETA", "latency −56%", 0], ["CHI", "'27 under review", 1],
    ["TATA", "top 1%", 1], ["PILOT", "operator interventions −67%", 0], ["EAGLE", "LLM tokens −52.5%", 0],
    ["CLOUT", "2nd @ UPenn", 1], ["ROBOT", "30 FPS · ±0.5 m", 1], ["TESTS", "coverage 90%", 1], ["TA", "LLMs · ML · Embedded", 1],
  ];
  const items = T.map(([k, v, up]) => `<span><b>${k}</b> <i class="${up ? "u" : "d"}">${up ? "▲" : "▼"}</i> ${v}</span>`).join("");
  $("#tape").innerHTML = items + items;
})();
