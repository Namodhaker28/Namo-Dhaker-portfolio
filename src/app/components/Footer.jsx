"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import SectionLabel from "./SectionLabel";
import SwapText from "./SwapText";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SOCIALS = [
  { label: "GitHub", url: "https://github.com/Namodhaker28" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/namo-dhaker" },
  { label: "Medium", url: "https://medium.com/@namodhaker76" },
];

const Footer = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      // Masked reveal for the big CTA
      gsap.from("[data-contact-mask]", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 75%",
        },
      });

      gsap.from("[data-contact-reveal]", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 75%",
        },
      });
    },
    { scope }
  );

  return (
    <footer
      id="contact"
      ref={scope}
      className="relative z-10 overflow-hidden border-t border-line bg-ink">
      <div className="pointer-events-none absolute -bottom-40 left-[10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(203,255,77,0.08),transparent)]" />
      <div className="pointer-events-none absolute -top-32 right-[5%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(141,123,255,0.12),transparent)]" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-28 sm:py-36">
        <div data-contact-reveal>
          <SectionLabel>Contact</SectionLabel>
        </div>

        <div className="mt-8 overflow-hidden">
          <a
            data-contact-mask
            href="mailto:namodhaker76@gmail.com"
            className="group block font-display text-4xl font-medium leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Let&apos;s build{" "}
            <span className="text-gradient">something together</span>
            <ArrowUpRightIcon className="ml-2 inline-block h-8 w-8 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-12 sm:w-12" />
          </a>
        </div>

        <p data-contact-reveal className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          I&apos;m currently open to new opportunities. Whether you have a
          question or just want to say hi, my inbox is always open.
        </p>
      </div>

      <div className="relative border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            © {new Date().getFullYear()} Namo Dhaker
          </p>
          <ul className="flex items-center gap-6">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swap-parent text-xs uppercase tracking-[0.15em] text-muted transition-colors duration-300 hover:text-fg">
                  <SwapText>{social.label}</SwapText>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
