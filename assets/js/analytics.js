/* Google Analytics 4 + a few custom events.
   Paste your Measurement ID below (GA → Admin → Data streams → your web stream, looks like "G-XXXXXXXXXX").
   While it's empty, nothing loads and nothing is tracked.

   To keep your own visits out of the stats, open the site once with ?me=1 on each browser you use
   (https://samruddhioke0410.github.io/?me=1). Use ?me=0 to undo. */
(function () {
  const GA_ID = "";

  try {
    const me = new URLSearchParams(location.search).get("me");
    if (me === "1") localStorage.setItem("so-notrack", "1");
    if (me === "0") localStorage.removeItem("so-notrack");
    if (localStorage.getItem("so-notrack") === "1") return;
  } catch (e) {}
  if (!GA_ID || location.hostname === "localhost" || location.hostname === "127.0.0.1") return;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", GA_ID);

  const track = (name, params) => gtag("event", name, params || {});
  const once = new Set();
  const trackOnce = (key, name, params) => { if (!once.has(key)) { once.add(key); track(name, params); } };

  const start = () => {
    // which sections they actually reached
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { trackOnce("sec:" + e.target.id, "section_view", { section: e.target.id }); io.unobserve(e.target); }
      }), { threshold: 0.35 });
      document.querySelectorAll("section[id]").forEach((el) => io.observe(el));
    }

    // how far down they scrolled
    const marks = [25, 50, 75, 100];
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      const pct = h > 0 ? (scrollY / h) * 100 : 100;
      marks.forEach((m) => { if (pct >= m - 1) trackOnce("scroll:" + m, "scroll_depth", { percent: m }); });
    };
    addEventListener("scroll", onScroll, { passive: true });

    // what they clicked or played with
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) {
        const href = a.getAttribute("href") || "";
        if (/Resume\.pdf/i.test(href)) return track("resume_open");
        if (href.startsWith("mailto:")) return track("email_click");
        if (/linkedin\.com/.test(href)) return track("linkedin_click");
        if (/github\.com/.test(href)) return track("github_click");
        if (/youtu/.test(href)) return track("demo_video_click", { link_text: a.textContent.trim().slice(0, 60) });
        return;
      }
      const id = e.target.closest("button")?.id;
      if (id === "groove") trackOnce("groove", "groove_play");
      if (id === "btnScramble") trackOnce("cube", "cube_scramble");
      if (id === "redeal") track("cards_redeal");
    }, true);
    document.getElementById("stage")?.addEventListener("pointerdown", () => trackOnce("photo", "photo_drum_tap"), { once: true });
    addEventListener("themechange", (e) => track("theme_switch", { theme: e.detail }));
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
