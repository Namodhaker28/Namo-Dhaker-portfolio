"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Seconds from mount until the overlay starts fading and the site is
// revealed. HeroSection uses this to delay its own entrance animation.
// The fade begins mid-zoom so the photo blends into the site.
export const INTRO_REVEAL_AT = 3.0;

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

      // The hidden initial states are server-rendered inline (see JSX), so
      // fromTo simply confirms them at hydration — no flash of visible
      // content before the animation takes over.

      // The names hang off either side of the frame, so growing the frame's
      // width from 0 pushes them apart symmetrically.
      const frameWidth = () => (window.innerWidth < 640 ? "6rem" : "9rem");

      // Phase 1 (0 - 0.95s): the full name rises out of its masks and
      // stands alone, centered
      tl.fromTo(
        "[data-intro-name]",
        { yPercent: 120 },
        { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "power4.out" },
        0
      )
        // Phase 2 (1.25s, after a clear beat): the photo grows between the
        // names, pushing first and last name left and right to make space
        .fromTo(
          "[data-intro-frame]",
          { width: 0 },
          { width: frameWidth, duration: 0.9, ease: "power4.inOut" },
          1.25
        )
        // Phase 3 (2.45s): hold the composition, then the name exits upward
        .to(
          "[data-intro-name]",
          { yPercent: -120, duration: 0.55, stagger: 0.05, ease: "power3.in" },
          2.45
        )
        // Phase 4 (2.7s): photo zooms toward fullscreen with a slow push-in
        .to(
          "[data-intro-frame]",
          {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            duration: 1.1,
            ease: "power4.inOut",
          },
          2.7
        )
        .to(
          "[data-intro-img]",
          { scale: 1.4, duration: 1.4, ease: "power2.inOut" },
          2.7
        )
        // 5. Crossfade starts MID-zoom, so the site blends through the
        // photo before it ever reaches full size
        .to(
          scope.current,
          { opacity: 0, duration: 1.0, ease: "power2.inOut" },
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
        {/* Photo stays perfectly viewport-centered; names hang off either side */}
        <div
          data-intro-frame
          className="relative h-32 overflow-hidden rounded-2xl sm:h-44"
          style={{ width: 0 }}>
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
