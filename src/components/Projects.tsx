"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Globe, Gamepad2 } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

type Project = {
  title: string;
  description: string;
  link: string;
  linkLabel: string;
  tag: "demo" | "live" | "github";
};

const websites: Project[] = [
  {
    title: "Linswrap Catering",
    description:
      "A polished demo website built for Linswrap Catering Services — showcasing menus, services, and brand identity with a clean, appetizing layout.",
    link: "https://linswrap.autocoder.cc",
    linkLabel: "Live Demo",
    tag: "demo",
  },
  {
    title: "Zaaky Importation",
    description:
      "A professional business site designed for an importation brand, highlighting product categories, sourcing capabilities, and contact channels.",
    link: "https://zaaky.autocoder.cc",
    linkLabel: "Live Demo",
    tag: "demo",
  },
  {
    title: "GIMS",
    description:
      "A web platform for a heavy-machine operation skill acquisition center — presenting training programs, enrollment info, and operational expertise.",
    link: "https://gims.autocoder.cc",
    linkLabel: "Live Demo",
    tag: "demo",
  },
  {
    title: "Episterizo",
    description:
      "An interactive Q&A site built to help readers better understand and engage with key themes from a pastor's published book.",
    link: "https://episterizo.vercel.app",
    linkLabel: "View Site",
    tag: "live",
  },
  {
    title: "Motivation Quotes",
    description:
      "My very first web project — a simple yet effective quotes site that serves daily inspiration. Where the journey into web development began.",
    link: "https://zeph-cmd.github.io/motivation-quotes/",
    linkLabel: "View Site",
    tag: "live",
  },
];

const games: Project[] = [
  {
    title: "Pin Wheel Illusion",
    description:
      "A mesmerizing visual illusion game that plays with motion perception — spin the wheel and watch your reality bend.",
    link: "https://pin-wheel.autocoder.cc",
    linkLabel: "Live Demo",
    tag: "demo",
  },
  {
    title: "Arena Dodger",
    description:
      "A fast-paced browser game where reflexes are everything — dodge incoming projectiles and survive as long as you can in the arena.",
    link: "https://zeph-cmd.github.io/arena-dodger-game/",
    linkLabel: "Play Game",
    tag: "live",
  },
  {
    title: "Samurai Killer",
    description:
      "An action-packed samurai combat game — slash through enemies with precision timing and rack up your highest kill streak.",
    link: "https://zeph-cmd.github.io/samurai_killer/",
    linkLabel: "Play Game",
    tag: "live",
  },
];

const tagStyles: Record<Project["tag"], string> = {
  demo: "border-amber-500/30 text-amber-400",
  live: "border-emerald-500/30 text-emerald-400",
  github: "border-sky-500/30 text-sky-400",
};

const tagLabels: Record<Project["tag"], string> = {
  demo: "Live Demo",
  live: "Production",
  github: "Open Source",
};

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const LinkIcon =
    project.tag === "github" ? Github : project.tag === "demo" ? Globe : ExternalLink;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group glass rounded-2xl p-6 transition-all duration-300 hover:glow-md hover:-translate-y-2 flex flex-col"
    >
      {/* Tag badge */}
      <span
        className={`self-start rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${tagStyles[project.tag]}`}
      >
        {tagLabels[project.tag]}
      </span>

      <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-neon-light transition-colors duration-300">
        {project.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-neon/30 px-4 py-2 text-xs font-semibold text-neon-light transition-all duration-300 hover:bg-neon/10 w-fit"
      >
        {project.linkLabel}
        <LinkIcon size={14} />
      </a>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" title="Projects">
      {/* Websites */}
      <div className="mb-6 flex items-center gap-3">
        <Globe size={18} className="text-neon-light" />
        <h3 className="text-lg font-semibold text-foreground">Websites</h3>
        <span className="rounded-full bg-neon/10 px-2.5 py-0.5 text-xs font-mono text-neon-light">
          {websites.length}
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {websites.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

      {/* Games */}
      <div className="mb-6 flex items-center gap-3">
        <Gamepad2 size={18} className="text-neon-light" />
        <h3 className="text-lg font-semibold text-foreground">Games</h3>
        <span className="rounded-full bg-neon/10 px-2.5 py-0.5 text-xs font-mono text-neon-light">
          {games.length}
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
