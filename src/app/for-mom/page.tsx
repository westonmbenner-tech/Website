"use client";

import { useEffect, useMemo, useState } from "react";

type SongItem = {
  id: string;
  key: string;
  title: string;
  size: number | null;
  lastModified: string | null;
};

type SongUrlResponse = {
  id: string;
  key: string;
  title: string;
  url: string;
};

const LOCAL_STORAGE_KEY = "momUnlockedSongs";
const SESSION_AUTH_KEY = "momVaultAuthenticated";
const SESSION_PASSWORD_KEY = "momVaultPassword";
const INSCRIPTION_KEY = "Inscription.m4a";

function loadUnlockedFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id) => typeof id === "string");
  } catch {
    return [];
  }
}

function saveUnlockedToStorage(ids: string[]) {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Best-effort only.
  }
}

function pickRandomSongId(songs: SongItem[], unlockedIds: string[]): string | null {
  if (songs.length === 0) return null;

  if (unlockedIds.length === 0) {
    const inscription = songs.find((song) => song.key === INSCRIPTION_KEY);
    if (inscription) return inscription.id;
  }

  const locked = songs.filter((s) => !unlockedIds.includes(s.id));
  const pool = locked.length > 0 ? locked : songs;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx]?.id ?? null;
}

export default function MomVaultPage() {
  const [songs, setSongs] = useState<SongItem[]>([]);
  const [songsLoading, setSongsLoading] = useState(true);
  const [songsError, setSongsError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [nowPlaying, setNowPlaying] = useState<SongUrlResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasTriedPassword, setHasTriedPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setUnlockedIds(loadUnlockedFromStorage());
    setIsAuthenticated(window.sessionStorage.getItem(SESSION_AUTH_KEY) === "1");
    setPassword(window.sessionStorage.getItem(SESSION_PASSWORD_KEY) ?? "");
  }, []);

  useEffect(() => {
    async function loadSongs() {
      setSongsLoading(true);
      setSongsError(null);

      try {
        const res = await fetch("/api/mom-songs", { method: "GET" });
        const data = (await res.json().catch(() => null)) as
          | { songs?: SongItem[]; error?: string }
          | null;

        if (!res.ok || !data?.songs) {
          setSongsError(
            data?.error ?? "Could not load songs right now. Please try again.",
          );
          return;
        }

        setSongs(data.songs);
      } catch {
        setSongsError("Could not load songs right now. Please try again.");
      } finally {
        setSongsLoading(false);
      }
    }

    void loadSongs();
  }, []);

  useEffect(() => {
    saveUnlockedToStorage(unlockedIds);
  }, [unlockedIds]);

  const totalSongs = songs.length;
  const unlockedCount = useMemo(
    () => songs.filter((song) => unlockedIds.includes(song.id)).length,
    [songs, unlockedIds],
  );

  const unlockedSongs = useMemo(
    () => songs.filter((s) => unlockedIds.includes(s.id)),
    [songs, unlockedIds],
  );

  async function fetchSong(songId: string) {
    const activePassword =
      password || window.sessionStorage.getItem(SESSION_PASSWORD_KEY) || "";

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/mom-song-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId, password: activePassword }),
      });

      const data = (await res.json().catch(() => null)) as
        | { error?: string; details?: string }
        | SongUrlResponse
        | null;

      if (!res.ok || !data || "error" in data) {
        if (res.status === 401) {
          setHasTriedPassword(true);
          setError("That passcode does not look right. Try again?");
          return;
        }
        setError(
          (data && "error" in data && data.error) ||
            "Sorry, this song could not be loaded right now.",
        );
        return;
      }

      const song = data as SongUrlResponse;
      setIsAuthenticated(true);
      window.sessionStorage.setItem(SESSION_AUTH_KEY, "1");
      window.sessionStorage.setItem(SESSION_PASSWORD_KEY, activePassword);
      setNowPlaying(song);
      if (!unlockedIds.includes(song.id)) {
        const next = [...unlockedIds, song.id];
        setUnlockedIds(next);
      }
    } catch {
      setError("Sorry, something went wrong loading the song.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePlayRandom() {
    const songId = pickRandomSongId(songs, unlockedIds);
    if (!songId) {
      if (songsLoading) {
        setError("Still loading songs. Please wait a moment.");
      } else if (songs.length === 0) {
        setError("No songs found yet in your bucket.");
      } else {
        setError("No songs are configured yet.");
      }
      return;
    }
    await fetchSong(songId);
  }

  function resetAllProgress() {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUnlockedIds([]);
    setNowPlaying(null);
    setError(null);
  }

  const passcodeError =
    hasTriedPassword && !password
      ? "Please enter the passcode."
      : hasTriedPassword && password
        ? "That passcode doesn’t look right. Try again?"
        : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-xl space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200 border border-slate-700/80">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>The Vault</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            For Mom
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            A small archive of songs I wanted you to hear.
          </p>
          <p className="text-xs text-slate-400">
            Unlocked songs stay saved on this device.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl bg-slate-900/70 border border-slate-700/60 p-4 sm:p-5 shadow-lg shadow-slate-950/50">
          {!isAuthenticated ? (
            <>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Passcode
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setHasTriedPassword(false);
                    setError(null);
                  }}
                  className="flex-1 rounded-xl border border-slate-700/80 bg-slate-950/40 px-3 py-2 text-sm text-slate-50 shadow-inner shadow-slate-950/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/60"
                  placeholder="Type the secret phrase"
                />
                <button
                  type="button"
                  onClick={handlePlayRandom}
                  disabled={isLoading || songsLoading || songs.length === 0}
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-medium text-slate-950 shadow-md shadow-emerald-500/30 transition hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/40 disabled:opacity-60 disabled:hover:shadow-none"
                >
                  {isLoading ? "Loading..." : "Unlock and play"}
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handlePlayRandom}
                disabled={isLoading || songsLoading || songs.length === 0}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-medium text-slate-950 shadow-md shadow-emerald-500/30 transition hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/40 disabled:opacity-60 disabled:hover:shadow-none"
              >
                {isLoading ? "Loading..." : "Play a random song"}
              </button>
            </div>
          )}
          {passcodeError && (
            <p className="text-xs text-rose-300 mt-1">{passcodeError}</p>
          )}
          {songsLoading ? (
            <p className="text-xs text-slate-400 mt-1">Loading songs from vault...</p>
          ) : null}
          {songsError ? (
            <p className="text-xs text-rose-300 mt-1">{songsError}</p>
          ) : null}
          {error && !passcodeError && (
            <p className="text-xs text-rose-300 mt-1">{error}</p>
          )}
          <p className="mt-2 text-xs text-slate-400">
            Songs unlock one by one. Once they&apos;re all unlocked, the button
            will shuffle between every song.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Progress: {unlockedCount} of {totalSongs} songs unlocked
          </p>
        </div>

        <div className="space-y-4">
          {nowPlaying ? (
            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 sm:p-5 shadow-lg shadow-slate-950/40">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="space-y-0.5">
                  <p className="text-xs uppercase tracking-[0.16em] text-emerald-300">
                    Now playing
                  </p>
                  <p className="text-sm sm:text-base font-medium text-slate-50">
                    {nowPlaying.title}
                  </p>
                </div>
              </div>
              <audio
                src={nowPlaying.url}
                controls
                autoPlay
                className="mt-3 w-full"
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/40 p-4 sm:p-5 text-sm text-slate-300">
              <p className="font-medium mb-1.5">A mystery track awaits.</p>
              <p className="text-xs text-slate-400">
                {isAuthenticated
                  ? "Tap "
                  : "Enter the passcode and tap "}
                <span className="font-semibold text-slate-200">
                  {isAuthenticated ? "Play a random song" : "Unlock and play"}
                </span>{" "}
                to unlock the first song.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            Unlocked songs
          </p>
          {unlockedSongs.length === 0 ? (
            <p className="text-xs text-slate-500">
              {songs.length === 0
                ? "Your vault is empty right now. Upload audio files to your R2 bucket and refresh."
                : "As you listen, songs you've heard will collect here so you can replay them anytime."}
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {unlockedSongs.map((song) => (
                <button
                  key={song.id}
                  type="button"
                  onClick={() => fetchSong(song.id)}
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-100 shadow-sm shadow-slate-950/40 hover:border-emerald-400/80 hover:bg-slate-900/90 hover:text-emerald-50 transition"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:bg-emerald-300" />
                  <span>{song.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={resetAllProgress}
            className="text-xs text-slate-500 underline underline-offset-2 transition hover:text-slate-300"
          >
            Reset all
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 underline underline-offset-2 transition hover:text-slate-300"
          >
            <span>Back</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

