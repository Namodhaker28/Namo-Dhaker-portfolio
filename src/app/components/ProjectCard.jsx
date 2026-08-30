import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import SwapText from "./SwapText";

const ProjectCard = ({
  index,
  title,
  description,
  imgUrl,
  stack = [],
  gitUrlClient,
  gitUrlServer,
  previewUrl,
}) => {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors duration-500 hover:border-accent/40">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imgUrl}
          alt={title}
          fill
          sizes="(min-width: 768px) 40rem, 90vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-medium tracking-tight text-fg sm:text-2xl">
            {title}
          </h3>
          <span className="shrink-0 font-display text-sm text-muted">
            [ {String(index).padStart(2, "0")} ]
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>

        {stack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-muted">
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-5 pt-6">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="swap-parent inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.15em] text-accent transition-opacity duration-300 hover:opacity-80">
            <SwapText>Live site</SwapText>
            <ArrowUpRightIcon className="h-3 w-3" />
          </a>
          <a
            href={gitUrlClient}
            target="_blank"
            rel="noopener noreferrer"
            className="swap-parent text-xs uppercase tracking-[0.15em] text-muted transition-colors duration-300 hover:text-fg">
            <SwapText>Client code</SwapText>
          </a>
          {gitUrlServer && (
            <a
              href={gitUrlServer}
              target="_blank"
              rel="noopener noreferrer"
              className="swap-parent text-xs uppercase tracking-[0.15em] text-muted transition-colors duration-300 hover:text-fg">
              <SwapText>Server code</SwapText>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
