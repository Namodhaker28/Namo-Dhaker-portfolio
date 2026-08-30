"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  {
    title: "The Blueprint",
    description:
      "Every bridge starts on paper. I dig into the problem, the users and the constraints before writing a line of code — so we build the right thing, not just a thing.",
    deliverables: ["Discovery", "Requirements", "Data modelling", "Architecture", "Timeline"],
    glow: "rgba(141, 123, 255, 0.14)",
  },
  {
    title: "The Build",
    description:
      "Design, development and iteration in tight loops. APIs, databases and interfaces come together piece by piece, with progress you can see and click — not weeks of silence.",
    deliverables: ["UI development", "API & database", "Integrations", "Animations", "Reviews"],
    glow: "rgba(203, 255, 77, 0.1)",
  },
  {
    title: "The Bridge",
    description:
      "Launch is when the bridge opens to traffic. I ship, measure and polish — performance, edge cases and the details that make software feel dependable.",
    deliverables: ["Testing & QA", "Performance", "Deployment", "Monitoring", "Support"],
    glow: "rgba(141, 123, 255, 0.14)",
  },
];

// Pinned stacked cards: the section locks and each step card slides up
// over the previous one as the user scrolls (desktop only).
const ProcessSection = () => {
  const sectionRef = useRef(null);
  const stackRef = useRef(null);

  useGSAP(
    () => {
      gsap.from("[data-process-mask]", {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray("[data-process-card]", stackRef.current);

        gsap.set(cards.slice(1), { yPercent: 130 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (cards.length - 1)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, i) => {
          if (i === 0) return;
          tl.to(cards[i - 1], { scale: 0.94, opacity: 0.45, ease: "none" });
          tl.to(card, { yPercent: 0, ease: "none" }, "<");
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-ink">
      <div className="flex flex-col justify-center px-6 py-20 md:h-screen md:py-0">
        <div className="mx-auto mb-10 w-full max-w-4xl md:mb-12">
          <SectionLabel>Process</SectionLabel>
          <div className="mt-4 overflow-hidden">
            <h2
              data-process-mask
              className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
              How I build bridges
            </h2>
          </div>
        </div>

        <div
          ref={stackRef}
          className="relative mx-auto flex w-full max-w-4xl flex-col gap-6 md:block md:h-[54vh] md:min-h-[22rem]">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              data-process-card
              className="relative overflow-hidden rounded-2xl border border-line bg-panel p-8 sm:p-10 md:absolute md:inset-0 md:flex md:flex-col md:justify-between"
              style={{ zIndex: index + 1 }}>
              <div
                className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full"
                style={{
                  background: `radial-gradient(closest-side, ${step.glow}, transparent)`,
                }}
              />

              <div className="relative">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-xs uppercase tracking-[0.2em] text-muted">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <span className="font-display text-sm text-muted">
                    [ {String(index + 1).padStart(2, "0")} ]
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl font-medium tracking-tight text-fg sm:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>

              <ul className="relative mt-8 flex flex-wrap gap-2">
                {step.deliverables.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
