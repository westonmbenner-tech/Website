export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[var(--background)] py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs text-zinc-600">
          Jump anywhere:{" "}
          <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-zinc-500">
            ⌘K
          </kbd>{" "}
          /{" "}
          <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-zinc-500">
            Ctrl+K
          </kbd>
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          &copy; 2026 Weston Benner. Built with curiosity, care, and a bias
          toward action.
        </p>
      </div>
    </footer>
  );
}
