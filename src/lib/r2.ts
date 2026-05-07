import { S3Client } from "@aws-sdk/client-s3";

const AUDIO_EXTENSIONS = [".m4a", ".mp3", ".wav", ".aac"] as const;

function getEnv(name: string): string {
  const value = process.env[name];
  if (value) return value;
  if (process.env.NODE_ENV !== "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  throw new Error("Server configuration error.");
}

export function isAllowedAudioKey(key: string): boolean {
  const lower = key.toLowerCase().trim();
  return AUDIO_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export function prettyTitleFromFilename(key: string): string {
  const filename = key.split("/").pop() ?? key;
  const withoutExt = filename.replace(/\.[^/.]+$/, "");
  const cleaned = withoutExt
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || "Untitled";
}

export function getR2BucketName(): string {
  return getEnv("R2_BUCKET_NAME");
}

export function createR2Client(): S3Client {
  const accountId = getEnv("R2_ACCOUNT_ID");
  const accessKeyId = getEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = getEnv("R2_SECRET_ACCESS_KEY");

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

