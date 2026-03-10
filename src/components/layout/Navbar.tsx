'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    // Cerrar menú móvil al cambiar de ruta
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Bloquear scroll cuando el menú está abierto
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = searchQuery.trim();
        if (trimmed) {
            router.push(`/catalogo?q=${encodeURIComponent(trimmed)}`);
        } else {
            router.push('/catalogo');
        }
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 glass-panel h-20 px-4 md:px-10 flex items-center justify-between transition-all duration-300">
                {/* Logo */}
                <div className="min-w-fit flex items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative h-[76px] w-[200px] sm:w-[260px] flex items-center">
                            <Image
                                src="/logo.png"
                                alt="Te Cambio Tu Carro Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Barra de búsqueda (Desktop) */}
                <div className="flex-1 max-w-[480px] mx-4 hidden md:block h-14">
                    <form onSubmit={handleSearch} className="flex w-full h-full items-center rounded-full bg-white/80 shadow-sm border border-slate-200 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                        <input
                            className="flex-1 bg-transparent border-none text-slate-900 placeholder:text-slate-400 px-6 h-full focus:outline-none focus:ring-0 text-base"
                            placeholder="Ej. Honda CRV 2017"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="size-10 mr-2 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                {/* Navegación Desktop */}
                <div className="flex items-center gap-4 lg:gap-6 min-w-fit">
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link href="/" className="text-text-main hover:text-primary text-sm font-semibold transition-colors">
                            Inicio
                        </Link>
                        <Link href="/catalogo" className="text-primary text-sm font-bold border-b-2 border-primary pb-1">
                            Catálogo
                        </Link>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden p-2 text-slate-900 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay — z-[60] para estar por encima del header z-50 */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-[60] lg:hidden"
                    style={{ touchAction: 'none' }}
                >
                    {/* Backdrop oscuro */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeMobileMenu} />

                    {/* Panel del menú */}
                    <div className="absolute inset-x-0 top-0 bottom-0 bg-white flex flex-col overflow-y-auto">
                        {/* Header del menú con logo y botón X */}
                        <div className="flex items-center justify-between px-4 h-20 shrink-0 border-b border-gray-100">
                            <Link href="/" onClick={closeMobileMenu} className="flex items-center">
                                <div className="relative h-[60px] w-[160px] flex items-center">
                                    <Image
                                        src="/logo.png"
                                        alt="Te Cambio Tu Carro Logo"
                                        fill
                                        className="object-contain object-left"
                                    />
                                </div>
                            </Link>
                            <button
                                onClick={closeMobileMenu}
                                className="p-2 text-slate-900 hover:text-primary transition-colors rounded-full hover:bg-slate-100"
                                aria-label="Cerrar menú"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Búsqueda móvil */}
                        <div className="px-4 pt-6 pb-4">
                            <form onSubmit={handleSearch} className="flex w-full h-14 items-center rounded-full bg-slate-100 border border-slate-200 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                                <input
                                    className="flex-1 bg-transparent border-none text-slate-900 placeholder:text-slate-500 px-6 h-full focus:outline-none focus:ring-0 text-base"
                                    placeholder="Buscar vehículos..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                                <button type="submit" className="size-10 mr-2 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
                                    <Search className="w-5 h-5" />
                                </button>
                            </form>
                        </div>

                        {/* Enlaces de Navegación */}
                        <nav className="flex flex-col px-4">
                            <Link
                                href="/"
                                onClick={closeMobileMenu}
                                className="py-4 text-lg font-semibold text-text-main hover:text-primary border-b border-gray-100 transition-colors"
                            >
                                Inicio
                            </Link>
                            <Link
                                href="/catalogo"
                                onClick={closeMobileMenu}
                                className="py-4 text-lg font-bold text-primary border-b border-gray-100"
                            >
                                Catálogo de Vehículos
                            </Link>
                        </nav>

                        {/* Footer del menú */}
                        <div className="mt-auto px-4 py-6 border-t border-gray-100">
                            <p className="text-sm text-text-muted text-center mb-4">
                                Encuentra el auto de tus sueños
                            </p>
                            <a
                                href="https://wa.me/50400000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full h-14 rounded-full bg-whatsapp text-white font-bold text-lg flex items-center justify-center gap-2"
                                onClick={closeMobileMenu}
                            >
                                Contáctanos vía WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
