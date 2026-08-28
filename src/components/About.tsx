"use client";

import SectionWrapper from "./SectionWrapper";

export default function About() {
  return (
    <SectionWrapper id="about" title="About Me">
      <div className="glass rounded-2xl p-8 sm:p-10 max-w-3xl">
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          The founder &amp; lead developer of ZEPHtech — a software startup
          firm. My team and I are focused on building data-driven systems.
          Security is non-negotiable in everything I create.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          We are already living in a digital future, the question is who is
          prepared for it. I work to make high-quality, professional web
          platforms, helping brands transition into premium, corporate-level
          positioning.
        </p>
      </div>
    </SectionWrapper>
  );
}
