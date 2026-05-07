"use client";

import { FormEvent, useState } from "react";

export default function Footer() {
  const [showVaultPrompt, setShowVaultPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  async function handleVaultSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!password) return;

    setIsChecking(true);
  try {
    const res = await fetch("/api/mom-vault-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      // Intentionally silent to avoid revealing anything.
      setPassword("");
      return;
    }
    window.sessionStorage.setItem("momVaultAuthenticated", "1");
    window.sessionStorage.setItem("momVaultPassword", password);
    window.location.href = "/for-mom";
  } catch {
    // Intentionally silent to avoid revealing anything about the vault.
  } finally {
    setIsChecking(false);
  }
}

  return (
    <footer className="relative z-[60] border-t border-white/5 bg-[var(--background)] py-8">
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
        <div className="mt-4">
          <button
            type="button"
            onClick={() => {
              setShowVaultPrompt(true);
              setPassword("");
            }}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-500 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-300"
            aria-label="The Vault"
          >
            The Vault
          </button>
        </div>
      </div>
      {showVaultPrompt ? (
        <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/50 px-4 pb-6 pt-10 sm:items-center">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-950 p-4 text-left shadow-2xl">
            <p className="text-sm text-zinc-200">Enter password</p>
            <form onSubmit={handleVaultSubmit} className="mt-3 space-y-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-cyan-500/40"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowVaultPrompt(false);
                    setPassword("");
                  }}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition hover:text-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChecking}
                  className="rounded-lg border border-cyan-500/30 bg-cyan-500/15 px-3 py-1.5 text-xs text-cyan-200 transition hover:bg-cyan-500/20 disabled:opacity-60"
                >
                  {isChecking ? "Checking..." : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </footer>
  );
}
