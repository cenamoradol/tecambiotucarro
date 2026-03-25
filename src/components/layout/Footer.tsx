import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-20 border-t border-slate-200 py-10 bg-white">
            <div className="mx-auto max-w-[1400px] px-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-text-muted text-sm">
                    © {currentYear} Te Cambio Tu Carro. Todos los derechos reservados.
                </p>

            </div>
        </footer>
    );
}
