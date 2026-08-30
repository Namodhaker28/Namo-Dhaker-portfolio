"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import SwapText from "./SwapText";

const NAV_LINKS = [
  { title: "Work", hash: "#work" },
  { title: "About", hash: "#about" },
  { title: "Contact", hash: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e, hash) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(hash, { offset: 0, duration: 1.4 });
    } else {
      document.querySelector(hash)?.scrollIntoView();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "border-line bg-ink/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-fg">
          Namo Dhaker
        </Link>

        <ul className="flex items-center gap-6 sm:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.hash}>
              <a
                href={link.hash}
                onClick={(e) => scrollTo(e, link.hash)}
                className="swap-parent text-xs uppercase tracking-[0.15em] text-muted transition-colors duration-300 hover:text-fg">
                <SwapText>{link.title}</SwapText>
              </a>
            </li>
          ))}
          <li className="hidden sm:block">
            <a
              href="/NAMO_DHAKER.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="swap-parent rounded-full border border-line px-4 py-2 text-xs uppercase tracking-[0.15em] text-fg transition-colors duration-300 hover:border-accent hover:text-accent">
              <SwapText>Resume</SwapText>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
