"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Something went wrong. Please try again.");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("Something went wrong. Please try again.");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
      company: String(data.get("company") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setErrorMessage(typeof body?.error === "string" ? body.error : "Unable to send message.");
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionWrapper id="contact" title="Contact">
      <div className="glass rounded-2xl p-8 sm:p-10 max-w-3xl">
        <p className="text-base text-muted sm:text-lg mb-8">
          Have a project in mind or want to collaborate? Send me a message and
          I&apos;ll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Honeypot field for bots */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              minLength={2}
              maxLength={50}
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
              maxLength={500}
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
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}
        </form>
      </div>
    </SectionWrapper>
  );
}
