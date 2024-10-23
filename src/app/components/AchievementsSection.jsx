"use client";
import React from "react";
import dynamic from "next/dynamic";
import LogoJavascript from "/public/images/logos/icon-javascript.svg";
import LogoTypescript from "/public/images/logos/icon-typescript.svg";
import LogoReact from "/public/images/logos/icon-react.svg";
import LogoNextjs from "/public/images/logos/icon-nextjs.svg";
import LogoNodejs from "/public/images/logos/icon-nodejs.svg";
import LogoExpress from "/public/images/logos/icon-express.svg";
import LogoExpressLight from "/public/images/logos/icon-express-light.svg";
import LogoNest from "/public/images/logos/icon-nest.svg";
import LogoSocket from "/public/images/logos/icon-socket.svg";
import LogoSocketLight from "/public/images/logos/icon-socket-light.svg";
import LogoPostgreSQL from "/public/images/logos/icon-postgresql.svg";
import LogoMongoDB from "/public/images/logos/icon-mongodb.svg";
import LogoSass from "/public/images/logos/icon-sass.svg";
import LogoTailwindcss from "/public/images/logos/icon-tailwindcss.svg";
import LogoFigma from "/public/images/logos/icon-figma.svg";
import "animate.css";
import LogoGit from "/public/images/logos/icon-git.svg";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
gsap.registerPlugin(useGSAP);

export const TECHNOLOGIES = [
  {
    label: "Javascript",
    logo: LogoJavascript,
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    label: "Typescript",
    logo: LogoTypescript,
    url: "https://www.typescriptlang.org/",
  },
  {
    label: "React",
    logo: LogoReact,
    url: "https://react.dev/",
  },
  {
    label: "Next.js",
    logo: LogoNextjs,
    url: "https://nextjs.org/",
  },
  {
    label: "Node.js",
    logo: LogoNodejs,
    url: "https://nodejs.org/en",
  },
  {
    label: "Express.js",
    logo: LogoExpress,
    darkModeLogo: LogoExpressLight,
    url: "https://expressjs.com/",
  },
  // {
  //   label: 'Nest.js',
  //   logo: LogoNest,
  //   url: 'https://nestjs.com/',
  // },
  {
    label: "Socket.io",
    logo: LogoSocket,
    darkModeLogo: LogoSocketLight,
    url: "https://socket.io/",
  },

  {
    label: "MongoDB",
    logo: LogoMongoDB,
    url: "https://www.mongodb.com/",
  },
  {
    label: "Sass/Scss",
    logo: LogoSass,
    url: "https://sass-lang.com/",
  },
  {
    label: "Tailwindcss",
    logo: LogoTailwindcss,
    url: "https://tailwindcss.com/",
  },
  {
    label: "Figma",
    logo: LogoFigma,
    url: "https://www.figma.com/",
  },
  {
    label: "Git",
    logo: LogoGit,
    url: "https://git-scm.com/",
  },
];

const AchievementsSection = () => {
  const imageRef = useRef();
  const scrollRef = useRef(null)
  useGSAP(() => {
    gsap.from(".imagegsap", { opacity: 0, stagger: 0.25 });
    gsap.to(".imagegsap", {
      rotation: 360,
      delay: 3,
    }); // <-- automatically reverted
  });

  return (
    <motion.div initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ root: scrollRef }} >
    <div className="py-8 px-4 xl:gap-16 ">
      <div className=" rounded-md py-8 gap-2  flex flex-wrap flex-row sm:flex-row items-center justify-between">
        {TECHNOLOGIES.map(({ url, logo, darkModeLogo, label }, index) => {
          return (
            <div key={index} className=" w-16 imagegsap flex flex-col items-center gap-2">
              <Link noCustomization href={url} externalLink>
                <Image
                  src={darkModeLogo || logo}
                  alt={label}
                  ref={imageRef}
                  className={` w-1/2 sm:w-full mx-auto transition-transform duration-300 md:hover:scale-120`}
                />
              </Link>
              <h5 className="text-white text-xs">{label}</h5>
            </div>

          );
        })}
      </div>
    </div>
    </motion.div>
  );
};

export default AchievementsSection;
