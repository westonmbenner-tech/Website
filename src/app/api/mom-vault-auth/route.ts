import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { password?: string }
    | null;

  if (!body?.password) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const expected = process.env.MOM_VAULT_PASSWORD;
  if (!expected) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  if (body.password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}

