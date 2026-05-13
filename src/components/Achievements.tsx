"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const achievements = [
  {
    title: "Presidential Award",
    description:
      "Recognized with a presidential award for strong performance and leadership.",
    href: "/achievements/presidential-award-1.pdf",
  },
  {
    title: "Presidential Award Certificate",
    description:
      "A second official presidential award record showing the same top-level recognition.",
    href: "/achievements/presidential-award-2.pdf",
  },
  {
    title: "Scholarship to Anna Maria College",
    description:
      "Awarded a scholarship to study abroad at Anna Maria College, reflecting academic potential and excellence.",
    href: "/achievements/anna-maria-college-scholarship.pdf",
  },
  {
    title: "Built First Full-Stack Project",
    description:
      "Designed and deployed a secure authentication system with role-based access and PostgreSQL backend.",
    href: "#projects",
  },
  {
    title: "Cybersecurity Self-Study",
    description:
      "Completed foundational threat modeling, authentication flow design, and secure database practices training.",
    href: "#skills",
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
        target={item.href.startsWith("#") ? undefined : "_blank"}
        rel={item.href.startsWith("#") ? undefined : "noopener noreferrer"}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-neon/30 px-4 py-2 text-xs font-semibold text-neon-light transition-all duration-300 hover:bg-neon/10 hover:shadow-[0_0_24px_rgba(124,58,237,0.18)]"
      >
        View
        <ExternalLink size={14} />
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
