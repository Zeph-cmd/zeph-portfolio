"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
  Code2,
  Server,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "PostgreSQL", "API Design"],
  },
  {
    title: "Cybersecurity",
    icon: ShieldCheck,
    skills: ["Threat Modeling Basics", "Authentication Flows", "Secure DB Practices"],
  },
  {
    title: "Data Science",
    icon: BarChart3,
    skills: ["Python", "SQL", "Statistical Modeling"],
  },
];

function SkillCard({
  group,
  index,
}: {
  group: (typeof skillGroups)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = group.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="glass rounded-2xl p-6 transition-all duration-300 hover:glow-sm hover:-translate-y-1"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon/10">
          <Icon size={20} className="text-neon-light" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
      </div>
      <ul className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-glass-border bg-glass px-3 py-1 text-xs font-medium text-muted"
          >
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <SkillCard key={group.title} group={group} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
