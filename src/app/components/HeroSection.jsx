"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SectionLabel from "./SectionLabel";
import SwapText from "./SwapText";

gsap.registerPlugin(useGSAP);

// Each heading line sits inside an overflow-hidden mask and slides up
// into view (masked line reveal) instead of a plain fade.
const MaskedLine = ({ children, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <span data-hero-line className="block">
      {children}
    </span>
  </span>
);

const HeroSection = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const tl = gsap
        .timeline({ paused: true, defaults: { ease: "power4.out" } })
        .from("[data-hero-line]", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.1,
        })
        .from(
          "[data-hero-fade]",
          { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.6"
        );

      // If the intro loader is running, start when it begins revealing the
      // site (mid-zoom). Otherwise play immediately.
      if (window.__introActive) {
        const start = () => tl.play();
        window.addEventListener("intro:reveal", start, { once: true });
        return () => window.removeEventListener("intro:reveal", start);
      }
      tl.play();
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute -top-32 left-[-15%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgba(141,123,255,0.16),transparent)]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(203,255,77,0.09),transparent)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div data-hero-fade>
          <SectionLabel className="mb-6">Full-stack Developer</SectionLabel>
        </div>

        <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
          <MaskedLine>Building bridges</MaskedLine>
          <MaskedLine className="text-muted">between ideas</MaskedLine>
          <MaskedLine>
            &amp; <span className="text-gradient">execution</span>
            <span className="text-accent">.</span>
          </MaskedLine>
        </h1>

        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p data-hero-fade className="max-w-sm text-sm leading-relaxed text-muted">
            I&apos;m Namo — a developer who designs, builds and ships
            interactive web applications end to end.
          </p>

          <div data-hero-fade className="flex items-center gap-4">
            <a
              href="mailto:namodhaker76@gmail.com"
              className="swap-parent rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:scale-105">
              <SwapText>Get in touch</SwapText>
            </a>
            <a
              href="/NAMO_DHAKER.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="swap-parent rounded-full border border-line px-6 py-3 text-sm text-fg transition-colors duration-300 hover:border-accent hover:text-accent">
              <SwapText>Download CV</SwapText>
            </a>
          </div>
        </div>
      </div>

      <div
        data-hero-fade
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted">
        Scroll
      </div>
    </section>
  );
};

export default HeroSection;
