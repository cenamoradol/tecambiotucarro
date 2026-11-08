import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

/**
 * Refresco manual de las fichas de vehiculo.
 *
 * La web cachea las fichas con revalidate=3600 (1 h) como red de seguridad.
 * Cuando alguien edita un vehiculo en el CRM puede forzar el refresco aqui
 * para que el cambio se vea al instante.
 *
 * POST /api/revalidate   { "publicId": "CLN34xH7Zc" }
 * Header: x-revalidate-secret: <REVALIDATE_SECRET>
 */
export async function POST(req: NextRequest) {
    const secret = process.env.REVALIDATE_SECRET;
    if (!secret || req.headers.get('x-revalidate-secret') !== secret) {
        return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }

    // Se invalida la ruta dinamica completa: el slug puede haber cambiado al editar el titulo.
    revalidatePath('/vehiculos/[id]/[slug]', 'page');

    return NextResponse.json({ ok: true, revalidated: '/vehiculos/[id]/[slug]' });
}
