import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { momSongs } from "@/lib/momSongs";

export const runtime = "nodejs";

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    if (process.env.NODE_ENV !== "production") {
      // In development, surface missing envs clearly in the response.
      throw new Error(`Missing required environment variable: ${name}`);
    }
  }
  return value;
}

function createS3Client() {
  const accountId = getEnv("R2_ACCOUNT_ID");
  const accessKeyId = getEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = getEnv("R2_SECRET_ACCESS_KEY");

  if (!accountId || !accessKeyId || !secretAccessKey) {
    // In production this will be a generic error; in dev, getEnv throws earlier with specifics.
    throw new Error("R2 credentials are not fully configured.");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { songId?: string; password?: string }
      | null;

    if (!body || !body.songId || !body.password) {
      return NextResponse.json(
        { error: "Missing songId or password" },
        { status: 400 },
      );
    }

    const expectedPassword = getEnv("MOM_VAULT_PASSWORD");
    if (!expectedPassword || body.password !== expectedPassword) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 },
      );
    }

    const song = momSongs.find((s) => s.id === body.songId);
    if (!song) {
      return NextResponse.json({ error: "Song not found." }, { status: 404 });
    }

    const bucket = getEnv("R2_BUCKET_NAME");
    if (!bucket) {
      throw new Error("R2 bucket name is not configured.");
    }

    const client = createS3Client();

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: song.key,
    });

    const url = await getSignedUrl(client, command, {
      expiresIn: 60 * 10,
    });

    return NextResponse.json({
      id: song.id,
      title: song.title,
      url,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unexpected error occurred.";

    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(
        { error: "Failed to generate song URL", details: message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Failed to generate song URL" },
      { status: 500 },
    );
  }
}

