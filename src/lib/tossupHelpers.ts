/**
 * Daily Quiz Bowl tossup parsing and answer matching.
 *
 * Question file location (Next.js static asset):
 *   Place your plain-text tossup bank at: `public/data/daily-tossups.txt`
 *   It is fetched in the browser from: `/data/daily-tossups.txt`
 *
 * Expected file format (repeat for each tossup):
 *   - Optional comment lines at the top starting with `#` are ignored.
 *   - A header line: `N. Category` (e.g. `1. Literature`)
 *   - One or more blank lines are allowed after the header.
 *   - The clue text (may span multiple lines) until a line that begins with `Answer:` (case-insensitive).
 *   - Exactly one answer line per tossup: `Answer: ...`
 *     Acceptable alternatives on that line may be separated with `/`, `;`, the word `or`, or
 *     parenthetical alternates like `Main (Alt)` — see `splitAcceptableAnswers`.
 *   - Blank lines between tossups are fine.
 */

export interface ParsedTossup {
  /** 1-based id from the file */
  id: number;
  category: string;
  /** Full clue text (trimmed), may include internal newlines */
  clue: string;
  /** Raw text after `Answer:` before splitting */
  rawAnswers: string;
  /** Individual acceptable phrasings after splitting */
  acceptable: string[];
}

const ARTICLE_RE = /^(the|a|an)\s+/i;

function stripDiacritics(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Lowercase, strip diacritics, collapse whitespace, remove punctuation, strip leading articles. */
export function normalizeForMatch(s: string): string {
  let t = stripDiacritics(s.trim().toLowerCase());
  t = t.replace(/[^\p{L}\p{N}\s]+/gu, " ");
  t = t.replace(/\s+/g, " ").trim();
  while (ARTICLE_RE.test(t)) {
    t = t.replace(ARTICLE_RE, "").trim();
  }
  return t;
}

/** Same semantic fingerprint but ignores spaces (helps E = mc^2 vs emc2). */
function compactKey(s: string): string {
  return normalizeForMatch(s).replace(/\s/g, "");
}

/**
 * Split the `Answer:` line into acceptable strings.
 * Handles `/`, `;` (except titles like `...; or, The Whale`), ` or `, and `Name (Alt)`.
 */
export function splitAcceptableAnswers(answerLine: string): string[] {
  const out = new Set<string>();
  const line = answerLine.trim();
  if (!line) return [];

  const pushExpanded = (raw: string) => {
    const t = raw.trim();
    if (!t) return;
    const paren = t.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
    if (paren) {
      out.add(paren[1].trim());
      out.add(paren[2].trim());
      out.add(t);
    } else {
      out.add(t);
    }
  };

  const slashParts = line.split(/\s*\/\s*/);
  for (const chunk of slashParts) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;
    if (/;\s*or,/i.test(trimmed)) {
      pushExpanded(trimmed);
      continue;
    }
    const semiParts = trimmed.split(/\s*;\s*/);
    if (semiParts.length > 1) {
      for (const p of semiParts) pushExpanded(p);
    } else {
      const orParts = trimmed.split(/\s+or\s+/i);
      for (const p of orParts) pushExpanded(p);
    }
  }

  return [...out];
}

export function parseTossupFile(raw: string): ParsedTossup[] {
  const lines = raw.split(/\r?\n/);
  const tossups: ParsedTossup[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (!trimmed || trimmed.startsWith("#")) {
      i += 1;
      continue;
    }

    const header = trimmed.match(/^(\d+)\.\s*(.+)$/);
    if (!header) {
      i += 1;
      continue;
    }

    const id = Number.parseInt(header[1], 10);
    const category = header[2].trim();
    i += 1;

    while (i < lines.length && !lines[i].trim()) i += 1;

    const clueBuf: string[] = [];
    let answerText: string | null = null;

    while (i < lines.length) {
      const line = lines[i];
      const m = line.match(/^\s*Answer:\s*(.*)\s*$/i);
      if (m) {
        answerText = m[1] ?? "";
        i += 1;
        break;
      }
      clueBuf.push(line);
      i += 1;
    }

    if (answerText === null) break;

    const clue = clueBuf.join("\n").trim();
    const acceptable = splitAcceptableAnswers(answerText);
    tossups.push({
      id,
      category,
      clue,
      rawAnswers: answerText,
      acceptable,
    });
  }

  tossups.sort((a, b) => a.id - b.id);
  return tossups;
}

/**
 * Index of today’s tossup in the sorted bank (0 … total−1).
 *
 * Uses the viewer’s **local calendar date**. Consecutive days advance by **one**
 * position in bank order, then wrap: day N → index `(N % total)`, so all `total`
 * tossups are visited in rotation (same local date ⇒ same tossup for everyone
 * on that calendar day).
 */
export function getDailyTossupIndex(total: number, ref: Date = new Date()): number {
  if (total <= 0) return 0;
  const epoch = new Date(2020, 0, 1);
  const day = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
  const days = Math.floor((day.getTime() - epoch.getTime()) / 86_400_000);
  return ((days % total) + total) % total;
}

export function clueToWords(clue: string): string[] {
  return clue
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);
}

export function guessMatchesAcceptable(guess: string, acceptable: string[]): boolean {
  const g = normalizeForMatch(guess);
  const gc = compactKey(guess);
  if (!g && !gc) return false;
  for (const ans of acceptable) {
    const a = normalizeForMatch(ans);
    if (a === g) return true;
    if (compactKey(ans) === gc && gc.length > 0) return true;
  }
  return false;
}
