import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import {
  createR2Client,
  getR2BucketName,
  isAllowedAudioKey,
  prettyTitleFromFilename,
} from "@/lib/r2";

export const runtime = "nodejs";

export async function GET() {
  try {
    const client = createR2Client();
    const bucket = getR2BucketName();

    const songs: Array<{
      id: string;
      key: string;
      title: string;
      size: number | null;
      lastModified: string | null;
    }> = [];

    let continuationToken: string | undefined;
    do {
      const response = await client.send(
        new ListObjectsV2Command({
          Bucket: bucket,
          ContinuationToken: continuationToken,
        }),
      );

      for (const object of response.Contents ?? []) {
        const key = object.Key?.trim();
        if (!key) continue;
        if (key.endsWith("/")) continue;
        if (!isAllowedAudioKey(key)) continue;

        songs.push({
          id: key,
          key,
          title: prettyTitleFromFilename(key),
          size: object.Size ?? null,
          lastModified: object.LastModified
            ? object.LastModified.toISOString()
            : null,
        });
      }

      continuationToken = response.IsTruncated
        ? response.NextContinuationToken
        : undefined;
    } while (continuationToken);

    songs.sort((a, b) => a.title.localeCompare(b.title));
    return NextResponse.json({ songs });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unexpected error occurred.";
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(
        { error: "Failed to list songs", details: message },
        { status: 500 },
      );
    }
    return NextResponse.json({ error: "Failed to list songs" }, { status: 500 });
  }
}

