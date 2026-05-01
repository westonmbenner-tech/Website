"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  clueToWords,
  getDailyTossupIndex,
  guessMatchesAcceptable,
  parseTossupFile,
  type ParsedTossup,
} from "@/lib/tossupHelpers";

/** Fetched from `public/data/daily-tossups.txt` — see `tossupHelpers.ts` header comment for format. */
const TOSSUP_ASSET_URL = "/data/daily-tossups.txt";

const WORD_INTERVAL_MS = 380;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  return new Ctx();
}

async function resumeCtx(ctx: AudioContext) {
  if (ctx.state === "suspended") await ctx.resume();
}

function playBuzz(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(220, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.14);
  g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.11, ctx.currentTime + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

function playCorrect(ctx: AudioContext) {
  const freqs = [523.25, 659.25, 783.99];
  freqs.forEach((freq, i) => {
    const t0 = ctx.currentTime + i * 0.07;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.09, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.32);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.34);
  });
}

type LoadState = "loading" | "ready" | "error";

function DailyTossupGameplay({
  tossup,
  total,
}: {
  tossup: ParsedTossup;
  total: number;
}) {
  const words = clueToWords(tossup.clue);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [buzzed, setBuzzed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "tryagain">("idle");

  const audioRef = useRef<AudioContext | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTick = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  const ensureAudio = useCallback(async () => {
    if (!audioRef.current) audioRef.current = getAudioContext();
    const ctx = audioRef.current;
    if (ctx) await resumeCtx(ctx);
    return ctx;
  }, []);

  useEffect(() => {
    if (!isRunning || isPaused || buzzed || !words.length) {
      clearTick();
      return;
    }
    tickRef.current = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= words.length) return c;
        const next = c + 1;
        if (next >= words.length) {
          setIsRunning(false);
        }
        return next;
      });
    }, WORD_INTERVAL_MS);
    return clearTick;
  }, [isRunning, isPaused, buzzed, words.length, clearTick]);

  const displayedClue = words.slice(0, visibleCount).join(" ");
  const progress = words.length ? visibleCount / words.length : 0;

  const handleStart = async () => {
    await ensureAudio();
    if (buzzed) return;
    if (visibleCount >= words.length) {
      setVisibleCount(0);
    }
    setIsPaused(false);
    setIsRunning(true);
  };

  const handlePauseResume = () => {
    if (buzzed) return;
    if (!isRunning && visibleCount > 0 && visibleCount < words.length) {
      setIsRunning(true);
      setIsPaused(false);
      return;
    }
    if (isRunning) {
      setIsPaused((p) => !p);
    }
  };

  const handleBuzz = async () => {
    const ctx = await ensureAudio();
    clearTick();
    setIsRunning(false);
    setIsPaused(false);
    setBuzzed(true);
    if (ctx) playBuzz(ctx);
  };

  const handleReveal = () => {
    setRevealed(true);
    setVisibleCount(words.length);
    setIsRunning(false);
    setIsPaused(false);
    clearTick();
  };

  const handleSubmitGuess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (guessMatchesAcceptable(guess, tossup.acceptable)) {
      setFeedback("correct");
      const ctx = await ensureAudio();
      if (ctx) playCorrect(ctx);
    } else {
      setFeedback("tryagain");
    }
  };

  return (
    <div className="rounded-2xl border border-cyan-500/15 bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-black/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-cyan-400/90">
            Quiz Bowl
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Daily tossup
          </h3>
          <p className="mt-1 max-w-xl text-sm text-zinc-400">
            A daily tossup, revealed one word at a time. Each calendar day advances
            to the next clue in the bank, then cycles through all {total} again.
          </p>
        </div>
        <p className="text-xs text-zinc-500">
          <span className="text-zinc-400">{tossup.category}</span>
          <span className="mx-1.5 text-zinc-600" aria-hidden>
            ·
          </span>
          Tossup {tossup.id} of {total}
        </p>
      </div>

      <div
        className="mb-4 h-1 w-full overflow-hidden rounded-full bg-zinc-800/80"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-label="Reading progress through the tossup"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500/70 to-teal-400/90 transition-[width] duration-200 ease-out"
          style={{ width: `${Math.min(100, progress * 100)}%` }}
        />
      </div>

      <div
        className="min-h-[8.5rem] rounded-xl border border-white/[0.06] bg-black/35 px-4 py-4 text-base leading-relaxed text-zinc-100 sm:min-h-[9.5rem] sm:px-5 sm:py-5 sm:text-lg"
        aria-live="polite"
        aria-atomic="false"
      >
        <p className="m-0">
          {displayedClue}
          {isRunning && !isPaused && visibleCount < words.length ? (
            <span
              className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-cyan-400/80 align-middle"
              aria-hidden
            />
          ) : null}
        </p>
      </div>

      {revealed ? (
        <p className="mt-4 rounded-lg border border-emerald-500/25 bg-emerald-950/25 px-4 py-3 text-sm text-emerald-100/95">
          <span className="font-semibold text-emerald-300/95">Answer: </span>
          {tossup.rawAnswers}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => void handleStart()}
          disabled={buzzed || !words.length}
          className="inline-flex items-center justify-center rounded-full border border-cyan-500/35 bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-400/50 hover:bg-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Start
        </button>
        <button
          type="button"
          onClick={handlePauseResume}
          disabled={buzzed || visibleCount === 0 || visibleCount >= words.length}
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPaused || !isRunning ? "Resume" : "Pause"}
        </button>
        <button
          type="button"
          onClick={() => void handleBuzz()}
          disabled={buzzed || !words.length}
          className="inline-flex items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/15 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-400/55 hover:bg-amber-500/25 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Buzz in to answer"
        >
          Buzz
        </button>
        <button
          type="button"
          onClick={handleReveal}
          disabled={revealed || !words.length}
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reveal answer
        </button>
      </div>

      {buzzed ? (
        <form
          className="mt-6 space-y-3 rounded-xl border border-amber-500/20 bg-amber-950/10 p-4"
          onSubmit={(e) => void handleSubmitGuess(e)}
        >
          <label htmlFor={`tossup-guess-${tossup.id}`} className="block text-sm font-medium text-amber-100/90">
            Your answer
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id={`tossup-guess-${tossup.id}`}
              type="text"
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value);
                if (feedback !== "idle") setFeedback("idle");
              }}
              autoComplete="off"
              disabled={feedback === "correct"}
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-white outline-none ring-cyan-500/40 placeholder:text-zinc-600 focus:border-cyan-500/40 focus:ring-2 disabled:opacity-60"
              placeholder="Type what you think it is…"
            />
            <button
              type="submit"
              disabled={feedback === "correct" || !guess.trim()}
              className="rounded-lg border border-cyan-500/40 bg-cyan-600/25 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600/35 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit
            </button>
          </div>
          {feedback === "correct" ? (
            <p className="m-0 text-sm font-semibold text-emerald-300" role="status">
              Correct
            </p>
          ) : null}
          {feedback === "tryagain" ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="m-0 text-sm text-amber-100/90" role="status">
                Guess again
              </p>
              <button
                type="button"
                onClick={handleReveal}
                disabled={revealed}
                className="self-start rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white/[0.1] disabled:opacity-40"
              >
                Reveal
              </button>
            </div>
          ) : null}
        </form>
      ) : null}
    </div>
  );
}

export default function DailyTossup() {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [tossups, setTossups] = useState<ParsedTossup[]>([]);
  const [testOffset, setTestOffset] = useState(0);
  /** Bumped on a timer / tab focus so the daily index recalculates after local midnight. */
  const [dayVersion, setDayVersion] = useState(0);

  const isDevControls =
    typeof process !== "undefined" && process.env.NODE_ENV === "development";

  useEffect(() => {
    if (loadState !== "ready") return;
    const bump = () => setDayVersion((v) => v + 1);
    const intervalId = window.setInterval(bump, 60_000);
    const onVisibility = () => {
      if (document.visibilityState === "visible") bump();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [loadState]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(TOSSUP_ASSET_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`Could not load tossups (${res.status})`);
        const text = await res.text();
        const parsed = parseTossupFile(text);
        if (parsed.length === 0) throw new Error("No tossups found in file");
        if (!cancelled) {
          setTossups(parsed);
          setLoadState("ready");
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(e instanceof Error ? e.message : "Failed to load tossups");
          setLoadState("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  void dayVersion;
  const dailyBase =
    tossups.length > 0 ? getDailyTossupIndex(tossups.length, new Date()) : 0;
  const activeIndex =
    tossups.length === 0
      ? 0
      : ((dailyBase + testOffset) % tossups.length + tossups.length) % tossups.length;
  const active = tossups[activeIndex] ?? null;

  if (loadState === "loading") {
    return (
      <div
        className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 p-6 text-center text-sm text-zinc-400"
        role="status"
        aria-live="polite"
      >
        Loading daily tossup…
      </div>
    );
  }

  if (loadState === "error") {
    return (
      <div
        className="rounded-2xl border border-red-500/20 bg-red-950/20 p-6 text-center text-sm text-red-200/90"
        role="alert"
      >
        {loadError ?? "Could not load tossups."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {active ? (
        <DailyTossupGameplay key={active.id} tossup={active} total={tossups.length} />
      ) : null}
      {isDevControls && tossups.length > 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-700/80 bg-zinc-900/40 px-3 py-2 text-xs text-zinc-500">
          <span className="font-medium text-zinc-400">Dev:</span> shift day index for testing.
          <span className="ml-2 inline-flex gap-1">
            <button
              type="button"
              className="rounded border border-zinc-600 px-2 py-0.5 text-zinc-300 hover:bg-zinc-800"
              onClick={() => setTestOffset((o) => o - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded border border-zinc-600 px-2 py-0.5 text-zinc-300 hover:bg-zinc-800"
              onClick={() => setTestOffset((o) => o + 1)}
            >
              Next
            </button>
            <button
              type="button"
              className="rounded border border-zinc-600 px-2 py-0.5 text-zinc-300 hover:bg-zinc-800"
              onClick={() => setTestOffset(0)}
            >
              Reset
            </button>
          </span>
        </div>
      ) : null}
    </div>
  );
}
