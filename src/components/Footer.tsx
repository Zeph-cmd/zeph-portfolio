export default function Footer() {
  return (
    <footer className="border-t border-glass-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Zephaniah. All rights reserved.
        </span>
        <span className="font-mono text-xs text-neon/40">
          Built with Next.js &middot; Tailwind &middot; Framer Motion
        </span>
      </div>
    </footer>
  );
}
