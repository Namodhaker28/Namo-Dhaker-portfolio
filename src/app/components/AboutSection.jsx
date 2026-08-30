"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin);

const LEAD_TEXT =
  "I'm a full-stack developer with a passion for creating interactive, responsive web applications — from database schema to the last pixel.";

const STATS = [
  { value: "3+", label: "Years of experience" },
  { value: "10+", label: "Projects shipped" },
  { value: "13", label: "Technologies in the stack" },
];

const AboutSection = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      // Typewriter effect for the lead statement. It's server-rendered
      // with the full text (SEO), emptied here before it scrolls into
      // view, then typed out character by character.
      const typed = scope.current.querySelector("[data-about-type]");
      gsap.set(typed, { text: "" });
      gsap.to(typed, {
        text: { value: LEAD_TEXT },
        duration: 3.2,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        onComplete: () => typed.classList.add("type-done"),
      });

      gsap.from("[data-about-reveal]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
      });
    },
    { scope }
  );

  return (
    <section
      id="about"
      ref={scope}
      className="relative overflow-hidden px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute top-1/4 left-[-12%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(141,123,255,0.1),transparent)]" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-[1fr_2fr]">
        <div data-about-reveal>
          <SectionLabel>About</SectionLabel>
          <div className="relative mt-10 aspect-[4/5] w-56 overflow-hidden rounded-2xl border border-line sm:w-64">
            <Image
              src="/images/namo-portrait.png"
              alt="Portrait of Namo Dhaker"
              fill
              sizes="(min-width: 640px) 16rem, 14rem"
              className="object-cover object-top grayscale transition-all duration-500 hover:grayscale-0"
            />
          </div>
        </div>

        <div>
          {/* Invisible copy reserves the final height so the layout
              doesn't shift while the visible copy types itself out */}
          <div className="relative">
            <p
              aria-hidden="true"
              className="invisible font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl lg:text-4xl">
              {LEAD_TEXT}
            </p>
            <p
              data-about-type
              className="absolute inset-0 font-display text-2xl font-medium leading-snug tracking-tight text-fg sm:text-3xl lg:text-4xl">
              {LEAD_TEXT}
            </p>
          </div>
          <p data-about-reveal className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
            I work across JavaScript, React, Node.js, Express and PostgreSQL,
            and I&apos;m always expanding that toolkit. I care about clean
            interfaces, fast feedback loops and shipping work that holds up in
            production — ideally as part of a team that sweats the details.
          </p>

          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {STATS.map((stat, index) => (
              <div key={stat.label} data-about-reveal>
                <p className="font-display text-xs text-muted">
                  [ {String(index + 1).padStart(2, "0")} ]
                </p>
                <dd className="mt-2 font-display text-3xl font-medium text-accent sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 block text-xs uppercase tracking-[0.15em] text-muted">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
