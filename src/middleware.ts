import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware para restringir el acceso al sitio durante el desarrollo.
 * Redirige todas las rutas (Catálogo, Detalles, etc.) a la página de "Muy Pronto" (Home).
 */

export function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl

    // 0. Revisar si hay un token de acceso por URL
    const bypassToken = searchParams.get('bypass')
    const secret = process.env.BYPASS_TOKEN || 'admin123'
    const hasAccess = request.cookies.get('bypass_coming_soon')?.value === 'true'

    if (bypassToken === secret) {
        // Redirigir limpiando el parámetro bypass de la URL para que no sea visible
        const url = new URL(pathname, request.url)
        const response = NextResponse.redirect(url)
        response.cookies.set('bypass_coming_soon', 'true', {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 días
        })
        return response
    }

    // 1. Si estamos en desarrollo (localhost) o ya tiene la cookie, permitimos ver todas las rutas
    if (process.env.NODE_ENV === 'development' || hasAccess) {
        return NextResponse.next()
    }

    // 2. Definimos qué rutas NO deben ser redirigidas en producción (archivos estáticos, imágenes, favicon, etc)
    if (
        pathname === '/' ||
        pathname.includes('.') || // Permite archivos como favicon.ico, logo.png, etc.
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') // Permite llamadas internas si las hay
    ) {
        return NextResponse.next()
    }

    // 3. Redirigimos cualquier otra ruta (/catalogo, /vehiculos, etc) al Home (Coming Soon) en producción
    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    // Aplicamos el middleware a todas las rutas excepto las de sistema
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
