"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const achievements = [
  {
    year: "2025",
    title: "Started Data Science at KSTU",
    description:
      "Began formal studies in Data Science, combining statistical foundations with real-world application.",
  },
  {
    year: "2025",
    title: "Built First Full-Stack Project",
    description:
      "Designed and deployed a secure authentication system with role-based access and PostgreSQL backend.",
  },
  {
    year: "2026",
    title: "Cybersecurity Self-Study",
    description:
      "Completed foundational threat modeling, authentication flow design, and secure database practices training.",
  },
  {
    year: "2026",
    title: "Launched Portfolio & Brand",
    description:
      "Designed and shipped a production-ready personal portfolio, positioning for freelance and professional work.",
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
      <span className="font-mono text-xs text-neon-light/60">{item.year}</span>
      <h3 className="mt-1 text-lg font-semibold text-foreground">
        {item.title}
      </h3>
      <p className="mt-1 text-sm text-muted leading-relaxed">
        {item.description}
      </p>
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
