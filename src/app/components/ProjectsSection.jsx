"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projectsData = [
  {
    id: 2,
    title: "Chat App",
    description:
      "A real-time messaging platform with rooms, live presence and instant delivery. Socket.io keeps every conversation in sync across clients, backed by a Node and Express API with MongoDB persistence.",
    image: "/images/projects/chatapp.png",
    stack: ["React", "Node.js", "Express", "Socket.io", "MongoDB"],
    gitUrlClient: "https://github.com/Namodhaker28/chat-app-frontend/tree/master",
    gitUrlServer: "https://github.com/Namodhaker28/chat-app-backend/tree/master",
    previewUrl: "https://verdant-mandazi-e70ad1.netlify.app/",
  },
  {
    id: 3,
    title: "Sneaker Store",
    description:
      "A full e-commerce experience for sneakers — product catalogue, filtering, cart and checkout. Built as a separate React storefront and Node/Express API with PostgreSQL handling inventory and orders.",
    image: "/images/projects/ecommerce.png",
    stack: ["React", "Redux", "Node.js", "Express", "PostgreSQL"],
    gitUrlClient: "https://github.com/Namodhaker28/404shoe-frontend/tree/dev",
    gitUrlServer: "https://github.com/Namodhaker28/404shoe-backend/tree/dev",
    previewUrl: "https://lovely-quokka-068f3c.netlify.app",
  },
  {
    id: 4,
    title: "To-do App",
    description:
      "A fast, minimal task manager with full CRUD, backed by a real API rather than local storage. The React front end talks to a Node/Express service so tasks persist across sessions and devices.",
    image: "/images/projects/todoapp.PNG",
    stack: ["React", "Node.js", "Express", "PostgreSQL"],
    gitUrlClient: "https://github.com/Namodhaker28/ToDo-List/tree/todoList-with-backend",
    gitUrlServer: "https://github.com/Namodhaker28/todo-backend/tree/master",
    previewUrl: "https://celadon-chimera-001229.netlify.app/",
  },
  {
    id: 5,
    title: "Weather App",
    description:
      "A location-aware forecast app that turns raw weather API data into a clean, glanceable daily view. Search any city and get current conditions and forecasts, redefined in one swipe.",
    image: "/images/projects/weather.jpeg",
    stack: ["React", "REST API", "CSS"],
    gitUrlClient: "https://github.com/Namodhaker28/weather-app",
    gitUrlServer: "",
    previewUrl: "https://dulcet-maamoul-6aad65.netlify.app/",
  },
  {
    id: 6,
    title: "MorseEmoji",
    description:
      "A playful text transformer that encodes messages into Morse code rendered with emojis — dots and dashes replaced with expressive characters. A small experiment in making classic encoding fun to share.",
    image: "/images/projects/moseremoji.png",
    stack: ["JavaScript", "React"],
    gitUrlClient: "https://github.com/Namodhaker28/morsemoji",
    gitUrlServer: "",
    previewUrl: "https://scintillating-scone-138b72.netlify.app/",
  },
];

// Pinned section: on desktop the viewport locks while the track scrolls
// horizontally, driven by vertical scroll (GSAP ScrollTrigger + scrub).
const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  useGSAP(
    () => {
      // Masked reveal for the heading (fires before the pin starts)
      gsap.from("[data-work-mask]", {
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
        const track = trackRef.current;
        const distance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (counterRef.current) {
                const current = Math.min(
                  projectsData.length,
                  Math.floor(self.progress * projectsData.length) + 1
                );
                counterRef.current.textContent = String(current).padStart(2, "0");
              }
            },
          },
        });
      });

      // Recompute pin distances once everything (fonts, images) has loaded
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(141,123,255,0.1),transparent)]" />
      <div className="flex flex-col justify-center py-20 md:h-screen md:py-0">
        <div className="mx-auto mb-10 flex w-full max-w-6xl items-end justify-between px-6 md:mb-14">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <div className="mt-4 overflow-hidden">
              <h2
                data-work-mask
                className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
                Projects
              </h2>
            </div>
          </div>
          <p className="hidden font-display text-sm text-muted md:block">
            <span ref={counterRef} className="text-fg">
              01
            </span>{" "}
            / {String(projectsData.length).padStart(2, "0")}
          </p>
        </div>

        <div
          ref={trackRef}
          className="flex flex-col gap-10 px-6 md:flex-row md:flex-nowrap md:gap-8 md:pl-[max(1.5rem,calc((100vw-72rem)/2))] md:pr-[12vw]">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="w-full shrink-0 md:w-[min(38rem,72vw)]">
              <ProjectCard
                index={index + 1}
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                stack={project.stack}
                gitUrlClient={project.gitUrlClient}
                gitUrlServer={project.gitUrlServer}
                previewUrl={project.previewUrl}
              />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 hidden w-full max-w-6xl px-6 md:block">
          <div className="h-px w-full bg-line">
            <div
              ref={progressRef}
              className="h-px w-full origin-left scale-x-0 bg-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
