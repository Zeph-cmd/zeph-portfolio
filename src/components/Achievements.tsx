"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const achievements = [
  {
    title: "Presidential Award I",
    description:
      "Recognized with a presidential award for outstanding performance and achievement.",
    href: "/achievements/presidential-award-1.pdf",
    label: "View",
  },
  {
    title: "Presidential Award II",
    description:
      "A second presidential award recognizing consistent excellence and impact.",
    href: "/achievements/presidential-award-2.pdf",
    label: "View",
  },
  {
    title: "Scholarship to Anna Maria College",
    description:
      "Awarded a scholarship to study abroad at Anna Maria College, reflecting academic promise and opportunity.",
    href: "/achievements/anna-maria-college-scholarship.pdf",
    label: "View",
  },
  {
    title: "Built First Full-Stack Project",
    description:
      "Designed and deployed a secure authentication system with role-based access and PostgreSQL backend.",
    href: "#projects",
    label: "View",
  },
  {
    title: "Cybersecurity Self-Study",
    description:
      "Completed foundational threat modeling, authentication flow design, and secure database practices training.",
    href: "#skills",
    label: "View",
  },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof achievements)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Vertical line */}
      <div className="absolute left-[7px] top-3 bottom-0 w-px bg-gradient-to-b from-neon/60 to-transparent glow-line" />

      {/* Dot */}
      <div className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-neon bg-background glow-line" />

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground">
        {item.title}
      </h3>
      <p className="mt-1 text-sm text-muted leading-relaxed">
        {item.description}
      </p>
      <a
        href={item.href}
        target={item.href.startsWith("/") ? "_blank" : undefined}
        rel={item.href.startsWith("/") ? "noopener noreferrer" : undefined}
        className="mt-3 inline-flex w-fit items-center rounded-full border border-neon/30 bg-neon/10 px-4 py-2 text-xs font-semibold text-neon-light transition-all duration-300 hover:bg-neon/20 hover:glow-sm"
      >
        {item.label}
      </a>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <SectionWrapper id="achievements" title="Achievements">
      <div className="max-w-2xl">
        {achievements.map((item, i) => (
          <TimelineItem key={item.title} item={item} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
