import fs from "node:fs";
import path from "node:path";

const HERO_DIR = path.join(process.cwd(), "public", "hero");
const PROFILE_BASENAME = "profile";
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"] as const;

export function getHeroProfileSrc(): string {
  for (const ext of IMAGE_EXTENSIONS) {
    const filename = `${PROFILE_BASENAME}${ext}`;
    if (fs.existsSync(path.join(HERO_DIR, filename))) {
      return `/hero/${filename}`;
    }
  }

  throw new Error(
    `No hero profile image found in public/hero (expected ${PROFILE_BASENAME}.{jpg|jpeg|png|webp|avif}).`,
  );
}
