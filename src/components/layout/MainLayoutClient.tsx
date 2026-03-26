'use client';
import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MainLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <div className={`flex flex-col min-h-screen ${!isHome ? 'pt-20' : ''}`}>
            <Suspense fallback={<div className="h-20" />}>
                <Navbar />
            </Suspense>
            <div className="flex-1 flex flex-col relative">
                {children}
            </div>
            {!isHome && <Footer />}
        </div>
    );
}

