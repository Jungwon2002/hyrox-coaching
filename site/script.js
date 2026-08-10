// Enable reveal animations only when JS is running,
// so content is never hidden if this file fails to load
document.documentElement.classList.add("js");

// Scroll-triggered reveals
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el, i) => {
    el.style.transitionDelay = Math.min(i % 4, 3) * 60 + "ms";
    io.observe(el);
  });
})();

// Play the training video only while it is on screen
(function () {
  const video = document.querySelector(".hero-dark__video");
  if (!video || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) video.play().catch(() => {});
        else video.pause();
      });
    },
    { threshold: 0.25 }
  );
  io.observe(video);
})();

// Gate the CTA's glow loop on the cover being visible — an animation nobody
// can see is just battery
(function () {
  const hero = document.querySelector(".hero-dark");
  if (!hero) return;
  if (!("IntersectionObserver" in window)) {
    hero.classList.add("is-onscreen");
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => hero.classList.toggle("is-onscreen", e.isIntersecting));
    },
    { threshold: 0.05 }
  );
  io.observe(hero);
})();

// Coaching application → opens a pre-filled email
(function () {
  const form = document.getElementById("apply-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = (id) => (document.getElementById(id).value || "-").trim();
    const body = [
      "[HYROX KIM 1:1 코칭 신청 / Coaching Application]",
      "",
      "이름 / Name: " + v("f-name"),
      "이메일 / Email: " + v("f-email"),
      "인스타그램 / Instagram: " + v("f-instagram"),
      "필요한 도움 / Needs help with: " + v("f-help"),
      "체력 수준 / Fitness level: " + v("f-fitness"),
      "목표 대회 / Target race: " + v("f-race"),
    ].join("\n");
    const url =
      "mailto:coachkimjungwon@gmail.com" +
      "?subject=" + encodeURIComponent("[HYROX KIM] 1:1 코칭 신청 — " + v("f-name")) +
      "&body=" + encodeURIComponent(body);
    window.location.href = url;
  });
})();
