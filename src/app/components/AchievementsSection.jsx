"use client";
import Image from "next/image";
import LogoJavascript from "/public/images/logos/icon-javascript.svg";
import LogoTypescript from "/public/images/logos/icon-typescript.svg";
import LogoReact from "/public/images/logos/icon-react.svg";
import LogoNextjs from "/public/images/logos/icon-nextjs.svg";
import LogoNodejs from "/public/images/logos/icon-nodejs.svg";
import LogoExpressLight from "/public/images/logos/icon-express-light.svg";
import LogoSocketLight from "/public/images/logos/icon-socket-light.svg";
import LogoPostgreSQL from "/public/images/logos/icon-postgresql.svg";
import LogoMongoDB from "/public/images/logos/icon-mongodb.svg";
import LogoSass from "/public/images/logos/icon-sass.svg";
import LogoTailwindcss from "/public/images/logos/icon-tailwindcss.svg";
import LogoFigma from "/public/images/logos/icon-figma.svg";
import LogoGit from "/public/images/logos/icon-git.svg";

const TECHNOLOGIES = [
  { label: "JavaScript", logo: LogoJavascript },
  { label: "TypeScript", logo: LogoTypescript },
  { label: "React", logo: LogoReact },
  { label: "Next.js", logo: LogoNextjs },
  { label: "Node.js", logo: LogoNodejs },
  { label: "Express", logo: LogoExpressLight },
  { label: "Socket.io", logo: LogoSocketLight },
  { label: "PostgreSQL", logo: LogoPostgreSQL },
  { label: "MongoDB", logo: LogoMongoDB },
  { label: "Sass", logo: LogoSass },
  { label: "Tailwind", logo: LogoTailwindcss },
  { label: "Figma", logo: LogoFigma },
  { label: "Git", logo: LogoGit },
];

const STATS = [
  "3+ years of experience",
  "10+ projects shipped",
  "Full-stack JavaScript",
  "React / Next.js",
  "Node.js APIs",
  "Open to opportunities",
];

// Both marquee rows duplicate their lists so the loop is seamless.
// The stats row scrolls in the opposite direction to the logo row.
const AchievementsSection = () => {
  return (
    <section aria-label="Technologies and stats">
      <div className="overflow-hidden border-y border-line py-8">
        <div className="marquee-track flex w-max items-center gap-14 px-7">
          {[...TECHNOLOGIES, ...TECHNOLOGIES].map(({ label, logo }, index) => (
            <div
              key={`${label}-${index}`}
              className="flex shrink-0 items-center gap-3 opacity-75 transition-opacity duration-300 hover:opacity-100">
              <Image src={logo} alt={label} className="h-7 w-7" />
              <span className="text-xs uppercase tracking-[0.15em] text-muted">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden border-b border-line py-6">
        <div className="marquee-track-reverse flex w-max items-center gap-10 px-5">
          {[...STATS, ...STATS].map((stat, index) => (
            <div key={`${stat}-${index}`} className="flex shrink-0 items-center gap-10">
              <span className="font-display text-sm uppercase tracking-[0.2em] text-fg/80">
                {stat}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
