"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLink, Images, X } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const sosImages = Array.from(
  { length: 8 },
  (_, index) => `/zephtech/sos/sos-${index + 1}.jpg`
);

export default function Zephtech() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <SectionWrapper id="zephtech" title="ZEPHtech">
      <div className="mb-10 max-w-3xl">
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          ZEPHtech is a software startup firm building practical, data-driven
          systems for real-world needs. Here are selected products developed
          by our team.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Smart Jotter */}
        <article className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Live product
          </span>
          <h3 className="mt-3 text-xl font-bold text-foreground">
            Smart Jotter
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            A focused digital jotter designed to make capturing, organizing,
            and returning to everyday ideas simple and reliable.
          </p>
          <a
            href="https://smart-jotter.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-neon/30 px-4 py-2 text-xs font-semibold text-neon-light transition-all duration-300 hover:bg-neon/10"
          >
            Visit Smart Jotter
            <ExternalLink size={14} />
          </a>
        </article>

        {/* School Operating System */}
        <article className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Case study · Screenshots
          </span>
          <h3 className="mt-3 text-xl font-bold text-foreground">
            School Operating System (SOS)
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            A role-based school management platform for administrators,
            teachers, and parents. It brings together academic records,
            subjects, grades, student and teacher records, tuition tracking,
            and in-app communication in one system.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-amber-200/70">
            The previous public demo is no longer available, so this project is
            presented through its product documentation and screenshots.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {sosImages.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-glass-border bg-glass"
                aria-label={`View School Operating System screenshot ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`School Operating System screenshot ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 120px, 150px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-black/60 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <Images size={11} /> View
                </span>
              </button>
            ))}
          </div>
        </article>

        {/* GroundTruth Vision */}
        <article className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-sm lg:col-span-2">
          <div className="grid items-center gap-6 md:grid-cols-[180px_minmax(0,1fr)]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-glass-border">
              <Image
                src="/zephtech/groundtruth/groundtruth-1.jpg"
                alt="GroundTruth Vision application dashboard"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                In development · Product preview
              </span>
              <h3 className="mt-3 text-xl font-bold text-foreground">
                GroundTruth Vision
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                A field data collection and visual intelligence tool built to
                organize trips, GPS coordinates, photo evidence, and synced
                data packages. Its dashboard includes trip metrics, a manual
                photo vault, offline-friendly capture flows, and sharing tools
                for turning field observations into usable ground truth data.
              </p>
              <p className="mt-3 text-xs text-sky-200/70">
                No public link is available yet. This preview documents the
                product direction while development continues.
              </p>
            </div>
          </div>
        </article>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded SOS screenshot"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative h-[85vh] w-full max-w-md">
            <Image
              src={selectedImage}
              alt="Expanded School Operating System screenshot"
              fill
              sizes="(max-width: 640px) 90vw, 448px"
              className="rounded-2xl object-contain"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white hover:bg-black/80"
              aria-label="Close expanded screenshot"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
