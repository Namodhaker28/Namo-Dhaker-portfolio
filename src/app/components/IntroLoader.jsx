"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// The name rises in via a pure-CSS animation (see globals.css) so it is
// visible immediately on first paint — even before the JS bundle loads.
// Once GSAP is ready it waits for the CSS animation to finish, then runs
// the remaining phases. HeroSection starts its entrance when the
// "intro:reveal" event fires (mid-zoom, as the overlay starts fading).
const IntroLoader = () => {
  const scope = useRef(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      window.__introActive = true;

      // Lock scrolling while the intro plays
      window.lenis?.stop();
      document.body.style.overflow = "hidden";

      const unlock = () => {
        document.body.style.overflow = "";
        window.lenis?.start();
      };

      // The names hang off either side of the gap element, so growing the
      // gap's width pushes them apart symmetrically — while the photo
      // inside it stays hidden until its own reveal step.
      const gapWidth = () => (window.innerWidth < 640 ? "6rem" : "9rem");

      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          window.__introActive = false;
          unlock();
          setDone(true);
        },
      });

      // Phase 2 (0.35s after the name settles): names move left and
      // right, opening an EMPTY gap between them
      tl.fromTo(
        "[data-intro-gap]",
        { width: 0 },
        { width: gapWidth, duration: 0.7, ease: "power4.inOut" },
        0.35
      )
        // Phase 3: the photo wipes up into the gap
        .fromTo(
          "[data-intro-frame]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.6,
            ease: "power4.out",
          },
          1.2
        )
        // Phase 4: hold, then the name exits upward. The CSS entrance
        // animation is removed first so GSAP fully owns the transform.
        .call(
          () => {
            gsap.utils.toArray("[data-intro-name]").forEach((el) => {
              el.style.animation = "none";
            });
            gsap.set("[data-intro-name]", { yPercent: 0 });
          },
          null,
          2.0
        )
        .to(
          "[data-intro-name]",
          { yPercent: -120, duration: 0.5, stagger: 0.05, ease: "power3.in" },
          2.0
        )
        // Phase 5: photo zooms toward fullscreen with a slow push-in
        .to(
          "[data-intro-gap]",
          {
            width: "100vw",
            height: "100vh",
            duration: 1.0,
            ease: "power4.inOut",
          },
          2.2
        )
        .to(
          "[data-intro-frame]",
          { borderRadius: 0, duration: 0.6, ease: "power2.inOut" },
          2.2
        )
        .to(
          "[data-intro-img]",
          { scale: 1.4, duration: 1.3, ease: "power2.inOut" },
          2.2
        )
        // Phase 6: crossfade starts MID-zoom — the site blends through the
        // photo before it reaches full size. Hero entrance starts here.
        .call(
          () => window.dispatchEvent(new Event("intro:reveal")),
          null,
          2.5
        )
        .to(
          scope.current,
          { opacity: 0, duration: 0.9, ease: "power2.inOut" },
          2.5
        );

      // Start the GSAP phases only after the CSS name entrance has
      // finished (or immediately, if it already finished while JS loaded).
      let started = false;
      const start = () => {
        if (started) return;
        started = true;
        tl.play();
      };

      const names = gsap.utils.toArray("[data-intro-name]");
      const lastName = names[names.length - 1];
      // CSS animation ends ~1.15s after first paint
      if (performance.now() > 1400) {
        start();
      } else {
        lastName.addEventListener("animationend", start, { once: true });
      }
      const failsafe = setTimeout(start, 1800);

      return () => {
        clearTimeout(failsafe);
        lastName.removeEventListener("animationend", start);
        window.__introActive = false;
        unlock();
      };
    },
    { scope }
  );

  if (done) return null;

  return (
    <div
      ref={scope}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink">
      <div className="relative flex items-center justify-center">
        {/* The gap opens first (empty), then the photo reveals inside it.
            All hidden states are inline so nothing flashes before hydration. */}
        <div
          data-intro-gap
          className="relative h-32 sm:h-44"
          style={{ width: 0 }}>
          <div
            data-intro-frame
            className="absolute inset-0 overflow-hidden rounded-2xl"
            style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
            <Image
              data-intro-img
              src="/images/namo-portrait.png"
              alt="Namo Dhaker"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <span className="absolute right-full mr-4 overflow-hidden sm:mr-8">
          <span
            data-intro-name
            className="intro-name intro-name-first block font-display text-3xl font-medium uppercase tracking-tight text-fg sm:text-6xl">
            Namo
          </span>
        </span>
        <span className="absolute left-full ml-4 overflow-hidden sm:ml-8">
          <span
            data-intro-name
            className="intro-name intro-name-last block font-display text-3xl font-medium uppercase tracking-tight text-muted sm:text-6xl">
            Dhaker
          </span>
        </span>
      </div>
    </div>
  );
};

export default IntroLoader;
