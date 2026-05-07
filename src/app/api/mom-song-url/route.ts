import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  createR2Client,
  getR2BucketName,
  isAllowedAudioKey,
  prettyTitleFromFilename,
} from "@/lib/r2";

export const runtime = "nodejs";

function getPassword(): string {
  const value = process.env.MOM_VAULT_PASSWORD;
  if (value) return value;
  if (process.env.NODE_ENV !== "production") {
    throw new Error("Missing required environment variable: MOM_VAULT_PASSWORD");
  }
  throw new Error("Server configuration error.");
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

    const songId = body.songId.trim();
    if (!isAllowedAudioKey(songId)) {
      return NextResponse.json(
        { error: "Song id must be a valid audio file key." },
        { status: 400 },
      );
    }

    const expectedPassword = getPassword();
    if (body.password !== expectedPassword) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 },
      );
    }

    const bucket = getR2BucketName();
    const client = createR2Client();

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: songId,
    });

    const url = await getSignedUrl(client, command, {
      expiresIn: 60 * 10,
    });

    return NextResponse.json({
      id: songId,
      key: songId,
      title: prettyTitleFromFilename(songId),
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

