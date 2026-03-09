import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware para restringir el acceso al sitio durante el desarrollo.
 * Redirige todas las rutas (Catálogo, Detalles, etc.) a la página de "Muy Pronto" (Home).
 */

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 1. Si estamos en desarrollo (localhost), permitimos ver todas las rutas
    if (process.env.NODE_ENV === 'development') {
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
