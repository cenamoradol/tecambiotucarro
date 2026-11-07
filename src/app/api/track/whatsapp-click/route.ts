import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID || '';

/**
 * Proxy same-origin para el tracking de clics de WhatsApp.
 * Evita depender de la config CORS del backend (el sitio público vive en otro dominio).
 */
export async function POST(req: NextRequest) {
    try {
        const { publicId } = await req.json();
        if (!publicId || !STORE_ID) return NextResponse.json({ ok: false }, { status: 400 });

        const res = await fetch(`${API_BASE}/public/id/${STORE_ID}/vehicles/${encodeURIComponent(publicId)}/whatsapp-click`, {
            method: 'POST',
            cache: 'no-store',
        });

        return NextResponse.json({ ok: res.ok });
    } catch (e) {
        console.error('Error tracking whatsapp click', e);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
