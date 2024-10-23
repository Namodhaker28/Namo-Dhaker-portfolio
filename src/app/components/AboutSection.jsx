"use client";
import React, { useTransition, useState, useRef } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { TypeAnimation } from "react-type-animation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Node.js</li>
        <li>Express</li>
        <li>PostgreSQL</li>
        <li>Sequelize</li>
        <li>JavaScript</li>
        <li>React</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Fullstack Academy of Code</li>
        <li>University of California, Santa Cruz</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>AWS Cloud Practitioner</li>
        <li>Google Professional Cloud Developer</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const [showAbout, setShowAbout] = useState(false);
  const { scrollY } = useScroll();
  const scrollRef = useRef(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowAbout(true);
  });

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-1 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        {/* <Image src="/images/about-image.png" width={500} height={500} /> */}
        <div ref={scrollRef} className="mt-4 md:mt-0 text-left flex flex-col w-full h-full">
          {/* <h2 className="text-4xl font-bold text-white mb-4">About Me</h2> */}
          {/* <p className="text-base lg:text-lg"> */}

          {showAbout && (
            <TypeAnimation
              sequence={[
                "I am a full stack web developer with a passion for creating interactive and responsive web applications. I have experience working with JavaScript, React, Redux, Node.js, Express and Git. I am a quick learner and I am always looking to expand my knowledge and skill set. I am a team player and I am excited to work with others to create amazing applications.",
              ]}
              wrapper="span"
              className="text-lg lg:text-lg"
              speed={50}
              repeat={Infinity}
            />
          )}
          {/* </p> */}
          {/* <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div> */}
          {/* <div className="mt-8">{TAB_DATA.find((t) => t.id === tab).content}</div> */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
