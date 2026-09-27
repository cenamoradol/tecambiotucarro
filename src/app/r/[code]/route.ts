import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  let finalUrl: string | null = null;
  try {
    const res = await fetch(`${API_BASE}/public/r/${encodeURIComponent(code)}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const body = await res.json();
      finalUrl = body?.finalUrl ?? null;
    }
  } catch {
    // cae al fallback
  }

  if (finalUrl) {
    return NextResponse.redirect(finalUrl, 301);
  }

  return NextResponse.redirect(new URL('/', API_BASE), 302);
}
