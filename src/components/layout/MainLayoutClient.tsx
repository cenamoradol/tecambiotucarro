'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MainLayoutClient({ children, isComingSoon = false }: { children: React.ReactNode, isComingSoon?: boolean }) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    // Si estamos en la página de inicio Y estamos en modo coming soon, ocultamos el navbar
    const hideNav = isHome && isComingSoon;

    return (
        <div className={`flex flex-col min-h-screen ${!isHome ? 'pt-20' : ''}`}>
            {!hideNav && <Navbar />}
            <div className="flex-1 flex flex-col relative">
                {children}
            </div>
            {!isHome && <Footer />}
        </div>
    );
}

