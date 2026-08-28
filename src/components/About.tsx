"use client";

import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

export default function About() {
  return (
    <SectionWrapper id="about" title="About Me">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="glass rounded-2xl p-8 sm:p-10">
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

        <div className="relative mx-auto h-80 w-full max-w-[280px] overflow-hidden rounded-2xl border border-neon/25 shadow-[0_0_30px_rgba(124,58,237,0.15)] lg:mx-0">
          <Image
            src="/zeph-about.jpg"
            alt="Zephaniah smiling outdoors"
            fill
            sizes="(max-width: 1024px) 280px, 280px"
            className="object-cover"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
