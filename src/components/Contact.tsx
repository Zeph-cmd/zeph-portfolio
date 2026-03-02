"use client";

import { useState, FormEvent } from "react";
import { Mail, MessageCircle, Send, CheckCircle, Loader2 } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionWrapper id="contact" title="Contact">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Form */}
        <div className="glass rounded-2xl p-8 sm:p-10">
          <p className="text-base text-muted sm:text-lg mb-8">
            Have a project in mind or want to collaborate? Send me a message
            — I&apos;ll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Web3Forms access key — replace with yours */}
            <input
              type="hidden"
              name="access_key"
              value="ba96676c-85c8-480e-addc-6c083d4617b8"
            />
            <input type="hidden" name="subject" value="New message from portfolio" />
            <input type="checkbox" name="botcheck" className="hidden" />

            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-glass-border bg-glass px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-neon/50 focus:glow-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-glass-border bg-glass px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-neon/50 focus:glow-sm"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-lg border border-glass-border bg-glass px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-neon/50 focus:glow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-7 py-3 text-sm font-semibold text-neon-light transition-all duration-300 hover:bg-neon/20 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>

            {status === "success" && (
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle size={16} />
                Message sent! I&apos;ll get back to you soon.
              </div>
            )}

            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again or reach out directly.
              </p>
            )}
          </form>
        </div>

        {/* Direct contact links */}
        <div className="flex flex-col justify-center gap-6">
          <h3 className="text-lg font-semibold text-foreground">
            Or reach out directly
          </h3>

          <a
            href="mailto:yumpinizephaniah@gmail.com"
            className="group inline-flex items-center gap-3 rounded-xl border border-glass-border bg-glass px-6 py-4 transition-all duration-300 hover:border-neon/30 hover:glow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon/10">
              <Mail size={18} className="text-neon-light" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-xs text-muted">yumpinizephaniah@gmail.com</p>
            </div>
          </a>

          <a
            href="https://wa.me/233209638007"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-xl border border-glass-border bg-glass px-6 py-4 transition-all duration-300 hover:border-neon/30 hover:glow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon/10">
              <MessageCircle size={18} className="text-neon-light" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">WhatsApp</p>
              <p className="text-xs text-muted">+233 209 638 007</p>
            </div>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
