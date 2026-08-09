import { useEffect } from "react";
import BrandMarkDefs from "@/components/BrandMarkDefs";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Coach from "@/components/Coach";
import HowCoachingWorks from "@/components/HowCoachingWorks";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function App() {
  // ported from script.js: reveal-on-scroll, video autoplay-on-view, and the
  // hero CTA glow's onscreen gate. Same selectors/behavior, just run once
  // after React has mounted the real DOM instead of on a static page load.
  useEffect(() => {
    document.documentElement.classList.add("js");

    const cleanups: Array<() => void> = [];

    // Scroll-triggered reveals
    (function revealOnScroll() {
      const els = document.querySelectorAll<HTMLElement>(".reveal");
      if (
        !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
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
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );
      els.forEach((el, i) => {
        el.style.transitionDelay = Math.min(i % 4, 3) * 60 + "ms";
        io.observe(el);
      });
      cleanups.push(() => io.disconnect());
    })();

    // Play the training video only while it is on screen
    (function videoOnView() {
      const video = document.querySelector<HTMLVideoElement>(".hero-dark__video");
      if (!video || !("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) video.play().catch(() => {});
            else video.pause();
          });
        },
        { threshold: 0.25 },
      );
      io.observe(video);
      cleanups.push(() => io.disconnect());
    })();

    // Gate the CTA's glow loop on the cover being visible
    (function ctaGlowGate() {
      const hero = document.querySelector<HTMLElement>(".hero-dark");
      if (!hero) return;
      if (!("IntersectionObserver" in window)) {
        hero.classList.add("is-onscreen");
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) =>
            hero.classList.toggle("is-onscreen", e.isIntersecting),
          );
        },
        { threshold: 0.05 },
      );
      io.observe(hero);
      cleanups.push(() => io.disconnect());
    })();

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <BrandMarkDefs />
      <Nav />
      <main>
        <Hero />
        <Coach />
        <HowCoachingWorks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
