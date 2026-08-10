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

// Coaching application → posted straight to Netlify Forms.
// Submitted over fetch rather than a page navigation so the visitor stays put
// and gets an answer in place. This replaced a mailto: handoff, which silently
// did nothing on phones with no mail app configured and inside the in-app
// browsers that Instagram links open in.
(function () {
  const form = document.getElementById("apply-form");
  if (!form) return;
  const note = form.querySelector(".form-note");
  const button = form.querySelector("button[type=submit]");
  const say = (msg) => { if (note) note.textContent = msg; };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const original = note ? note.textContent : "";
    if (button) button.disabled = true;
    say("보내는 중…");

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      say("신청서가 접수되었습니다. 24–48시간 내에 답변드리겠습니다. 감사합니다!");
    } catch {
      if (button) button.disabled = false;
      say(
        "전송에 실패했습니다. 잠시 후 다시 시도하시거나 " +
          "coachkimjungwon@gmail.com 으로 보내주세요."
      );
      setTimeout(() => say(original), 8000);
    }
  });
})();

// Programme request → serverless function emails the PDF to the visitor and
// tells the coach a lead came in. The download link stays in the success
// message as a fallback, so nobody is stuck waiting on an inbox.
(function () {
  const form = document.getElementById("programme-form");
  if (!form) return;
  const msg = form.querySelector(".get-form__msg");
  const button = form.querySelector("button[type=submit]");
  const PDF = "assets/hyrox-4-week-programme.pdf";

  const say = (html, isError) => {
    if (!msg) return;
    msg.innerHTML = html;
    msg.classList.toggle("get-form__msg--error", !!isError);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    form.classList.add("is-sending");
    if (button) button.disabled = true;
    say("보내는 중…");

    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/.netlify/functions/send-programme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      form.reset();
      say(
        "메일함을 확인해 주세요. 프로그램을 보내드렸습니다. " +
          `메일이 오지 않으면 <a href="${PDF}" download>여기서 바로 받으실 수 있습니다</a>.`
      );
    } catch {
      // The send failed, but the programme is free — hand it over anyway
      // rather than turning someone away over a mail problem.
      say(
        `메일 전송에 실패했습니다. <a href="${PDF}" download>여기서 바로 다운로드하세요</a>.`,
        true
      );
    } finally {
      form.classList.remove("is-sending");
      if (button) button.disabled = false;
    }
  });
})();
