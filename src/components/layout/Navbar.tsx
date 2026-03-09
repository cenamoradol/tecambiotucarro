import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-panel h-20 px-4 md:px-10 flex items-center justify-between transition-all duration-300">
            {/* Logo */}
            <div className="min-w-fit flex items-center">
                <Link href="/" className="flex items-center gap-3">
                    {/* Usar el logo proveído por el usuario */}
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
                <label className="flex w-full h-full items-center rounded-full bg-white/80 dark:bg-slate-800/80 shadow-sm border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                    <input
                        className="flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 px-6 h-full focus:outline-none focus:ring-0 text-base"
                        placeholder="Ej. Honda CRV 2017"
                        type="text"
                    />
                    <button className="size-10 mr-2 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                </label>
            </div>

            {/* Navegación y Acciones (Desktop/Mobile) */}
            <div className="flex items-center gap-6 min-w-fit">
                <nav className="hidden lg:flex items-center">
                    <Link href="/catalogo" className="text-primary text-sm font-bold border-b-2 border-primary pb-1">
                        Vehículos
                    </Link>
                </nav>

                {/* Mobile Action Buttons */}
                <button className="md:hidden p-2 text-slate-900 dark:text-white">
                    <Search className="w-6 h-6" />
                </button>
                <button className="lg:hidden p-2 text-slate-900 dark:text-white">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}
