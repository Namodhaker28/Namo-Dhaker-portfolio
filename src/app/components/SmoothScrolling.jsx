"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScrolling = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    // Keep GSAP's ScrollTrigger in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Expose for anchor navigation (navbar links)
    window.lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  return children;
};

export default SmoothScrolling;
