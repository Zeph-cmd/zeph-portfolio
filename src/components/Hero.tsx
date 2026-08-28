"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-neon/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-neon-blue/10 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
        className="group absolute right-5 top-24 z-20 h-40 w-28 overflow-hidden rounded-2xl border border-neon/30 bg-background/70 shadow-[0_0_30px_rgba(124,58,237,0.18)] sm:right-10 sm:top-28 sm:h-56 sm:w-40 lg:right-16 lg:top-32 lg:h-72 lg:w-52"
      >
        <Image
          src="/zeph-jacket.jpg"
          alt="Zephaniah wearing a jacket"
          fill
          priority
          sizes="(max-width: 640px) 112px, (max-width: 1024px) 160px, 208px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100 focus-visible:bg-black/35 focus-visible:opacity-100"
          aria-label="Expand portrait"
        >
          <span className="flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-xs font-semibold backdrop-blur-sm">
            <Maximize2 size={14} />
            Expand
          </span>
        </button>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 inline-block"
        >
          <span className="glass rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-neon-light">
            &#9679; Available for projects
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text text-glow">Zephaniah</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-3 text-base font-semibold text-neon-light sm:text-lg"
        >
          Founder &amp; Lead Developer of ZEPHtech
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-5 text-lg text-muted sm:text-xl"
        >
          Full Stack Developer &middot; Cybersecurity Enthusiast
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-2 font-mono text-sm text-neon-light/70"
        >
          Building real-world systems, not tutorials.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-10"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-7 py-3 text-sm font-semibold text-neon-light transition-all duration-300 hover:bg-neon/20 hover:glow-md hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
          >
            View Projects
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>

      {isExpanded && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded portrait"
          onClick={() => setIsExpanded(false)}
        >
          <div className="relative h-[80vh] w-full max-w-2xl">
            <Image
              src="/zeph-jacket.jpg"
              alt="Zephaniah wearing a jacket"
              fill
              sizes="(max-width: 768px) 92vw, 672px"
              className="rounded-2xl object-contain"
            />
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-black/80"
              aria-label="Close expanded portrait"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
