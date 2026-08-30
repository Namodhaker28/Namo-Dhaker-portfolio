"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Seconds from mount until the overlay starts fading and the site is
// revealed. HeroSection uses this to delay its own entrance animation.
// The fade begins mid-zoom so the photo blends into the site.
export const INTRO_REVEAL_AT = 3.25;

const IntroLoader = () => {
  const scope = useRef(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      // Lock scrolling while the intro plays
      window.lenis?.stop();
      document.body.style.overflow = "hidden";

      const unlock = () => {
        document.body.style.overflow = "";
        window.lenis?.start();
      };

      const tl = gsap.timeline({
        onComplete: () => {
          unlock();
          setDone(true);
        },
      });

      // The names hang off either side of the gap element, so growing the
      // gap's width pushes them apart symmetrically — while the photo
      // inside it stays hidden until its own reveal step.
      const gapWidth = () => (window.innerWidth < 640 ? "6rem" : "9rem");

      // Phase 1 (0s): the full name rises into view, centered
      tl.fromTo(
        "[data-intro-name]",
        { yPercent: 120 },
        { yPercent: 0, duration: 0.85, stagger: 0.08, ease: "power4.out" },
        0
      )
        // Phase 2 (1.1s): names move left and right, opening an EMPTY gap
        .fromTo(
          "[data-intro-gap]",
          { width: 0 },
          { width: gapWidth, duration: 0.7, ease: "power4.inOut" },
          1.1
        )
        // Phase 3 (1.95s): the photo wipes up into the gap
        .fromTo(
          "[data-intro-frame]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.6,
            ease: "power4.out",
          },
          1.95
        )
        // Phase 4 (2.75s): hold, then the name exits upward
        .to(
          "[data-intro-name]",
          { yPercent: -120, duration: 0.5, stagger: 0.05, ease: "power3.in" },
          2.75
        )
        // Phase 5 (2.95s): photo zooms toward fullscreen with a slow push-in
        .to(
          "[data-intro-gap]",
          {
            width: "100vw",
            height: "100vh",
            duration: 1.0,
            ease: "power4.inOut",
          },
          2.95
        )
        .to(
          "[data-intro-frame]",
          { borderRadius: 0, duration: 0.6, ease: "power2.inOut" },
          2.95
        )
        .to(
          "[data-intro-img]",
          { scale: 1.4, duration: 1.3, ease: "power2.inOut" },
          2.95
        )
        // Phase 6: crossfade starts MID-zoom, so the site blends through
        // the photo before it ever reaches full size
        .to(
          scope.current,
          { opacity: 0, duration: 0.9, ease: "power2.inOut" },
          INTRO_REVEAL_AT
        );

      return unlock;
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
            className="block font-display text-3xl font-medium uppercase tracking-tight text-fg sm:text-6xl"
            style={{ transform: "translateY(120%)" }}>
            Namo
          </span>
        </span>
        <span className="absolute left-full ml-4 overflow-hidden sm:ml-8">
          <span
            data-intro-name
            className="block font-display text-3xl font-medium uppercase tracking-tight text-muted sm:text-6xl"
            style={{ transform: "translateY(120%)" }}>
            Dhaker
          </span>
        </span>
      </div>
    </div>
  );
};

export default IntroLoader;
