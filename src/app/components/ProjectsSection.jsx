"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 2,
    title: "Chat App",
    description:
      "The chat app for those who love to talk, type, and take conversations to the next level ",
    image: "/images/projects/2.png",
    tag: ["All", "Web"],
    gitUrlClient: "https://github.com/Namodhaker28/chat-app-frontend/tree/master",
    gitUrlServer: "https://github.com/Namodhaker28/chat-app-backend/tree/master",
    previewUrl: "https://verdant-mandazi-e70ad1.netlify.app/",
  },
  {
    id: 3,
    title: "Sneaker Store",
    description:
      "Discover your perfect stride with our vast collection of shoes, where style meets comfort in every click.",
    image: "/images/projects/3.png",
    tag: ["All", "Web"],
    gitUrlClient: "https://github.com/Namodhaker28/404shoe-frontend/tree/dev",
    gitUrlServer: "https://github.com/Namodhaker28/404shoe-backend/tree/dev",
    previewUrl: "https://lovely-quokka-068f3c.netlify.app",
  },
  {
    id: 4,
    title: "To-do App",
    description:
      "Unleash the power of productivity: conquer chaos and claim victory over your tasks with our heroic to-do app.",
    image: "/images/projects/4.png",
    tag: ["All", "Mobile"],
    gitUrlClient: "https://github.com/Namodhaker28/ToDo-List/tree/todoList-with-backend",
    gitUrlServer: "https://github.com/Namodhaker28/todo-backend/tree/master",
    previewUrl: "https://celadon-chimera-001229.netlify.app/",
  },
  {
    id: 5,
    title: "Weather App",
    description:
      "Navigate the whims of the weather with precision, all in one swipe—your daily forecast, redefined.",
    image: "/images/projects/5.png",
    tag: ["All", "Web"],
    gitUrlClient: "https://github.com/Namodhaker28/weather-app",
    gitUrlServer: "",
    previewUrl: "https://dulcet-maamoul-6aad65.netlify.app/",
  },
  {
    id: 6,
    title: "MorseEmoji Code genertion",
    description:
      "Transform text into a playful MorseEmoji code, where dots and dashes are replaced with fun emojis, adding a whimsical twist to classic communication.",
    image: "/images/projects/6.png",
    tag: ["All", "Web"],
    gitUrlClient: "https://github.com/Namodhaker28/morsemoji",
    gitUrlServer: "",
    previewUrl: "https://scintillating-scone-138b72.netlify.app/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) => project.tag.includes(tag));

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">My Projects</h2>
      {/* <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div> */}
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {projectsData.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}>
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrlClient={project.gitUrlClient}
              gitUrlServer={project.gitUrlServer}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
