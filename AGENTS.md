# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 16 personal portfolio website using TypeScript, Tailwind CSS v4, and the App Router.

### Running the dev server

```
npm run dev
```

The site runs on `http://localhost:3000` by default.

### Key commands

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Type check | `npx tsc --noEmit` |
| Production build | `npm run build` |

### Project structure

- `src/app/` — Next.js App Router pages and layout
- `src/components/` — Reusable React components (Navbar, Hero, ProjectCard, Timeline, etc.)
- `src/data/` — Typed data arrays (`content.ts`) and TypeScript interfaces (`types.ts`)

Content (projects, timeline entries, interests, writing pieces) is defined in `src/data/content.ts` for easy editing. Types are in `src/data/types.ts`.

### Notes

- Tailwind CSS v4 is used with the `@import "tailwindcss"` syntax in `globals.css` (not the v3 `@tailwind` directives).
- The site is a single-page app with smooth-scroll navigation. All sections are rendered in `src/app/page.tsx`.
- Dark theme is hardcoded (not system-preference based). Background is `#0a0a0c`.
