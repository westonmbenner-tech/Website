import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const heroDir = path.join("public/hero");
const sourceCandidates = [
  "profile-source.jpg",
  "profile.jpg",
  "profile.jpeg",
  "profile.png",
];
const inputName =
  sourceCandidates.find((name) => fs.existsSync(path.join(heroDir, name))) ??
  "profile.jpg";
const input = path.join(heroDir, inputName);
const output = path.join(heroDir, "profile.webp");
const tmp = path.join(heroDir, "profile.processed.webp");

const size = 800;
const border = 6;
const borderColor = "#18181b";
const innerRadius = size / 2 - border - 2;
const focalX = 0.5;
const focalY = 0.22;

const metadata = await sharp(input).metadata();
const sourceWidth = metadata.width ?? size;
const sourceHeight = metadata.height ?? size;
const scale = Math.max(size / sourceWidth, size / sourceHeight);
const scaledWidth = Math.round(sourceWidth * scale);
const scaledHeight = Math.round(sourceHeight * scale);
const extractLeft = Math.max(
  0,
  Math.min(Math.round(scaledWidth * focalX - size / 2), scaledWidth - size),
);
const extractTop = Math.max(
  0,
  Math.min(Math.round(scaledHeight * focalY - size / 2), scaledHeight - size),
);

const photo = await sharp(input)
  .rotate()
  .resize(scaledWidth, scaledHeight, { kernel: sharp.kernel.lanczos3 })
  .extract({
    left: extractLeft,
    top: extractTop,
    width: size,
    height: size,
  })
  .blur(0.35)
  .toBuffer();

const photoMask = Buffer.from(
  `<svg width="${size}" height="${size}">
    <circle cx="${size / 2}" cy="${size / 2}" r="${innerRadius}" fill="white"/>
  </svg>`,
);

const maskedPhoto = await sharp(photo)
  .composite([{ input: photoMask, blend: "dest-in" }])
  .png()
  .toBuffer();

const borderRing = Buffer.from(
  `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - border / 2}" fill="none" stroke="${borderColor}" stroke-width="${border}"/>
  </svg>`,
);

await sharp({
  create: {
    width: size,
    height: size,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    { input: maskedPhoto, top: 0, left: 0 },
    { input: borderRing, top: 0, left: 0 },
  ])
  .webp({ quality: 82, alphaQuality: 100 })
  .toFile(tmp);

const before = fs.statSync(input).size;
const after = fs.statSync(tmp).size;
fs.renameSync(tmp, output);

for (const name of ["profile.jpg", "profile.jpeg", "profile.png"]) {
  const stale = path.join(heroDir, name);
  if (stale !== input && fs.existsSync(stale)) {
    fs.unlinkSync(stale);
  }
}

console.log(`Source: ${input}`);
console.log(`Wrote ${output}`);
console.log(
  `Size: ${before} -> ${after} (${Math.round((1 - after / before) * 100)}% smaller than source)`,
);
