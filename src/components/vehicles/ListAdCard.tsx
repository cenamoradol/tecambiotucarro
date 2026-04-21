'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { trackAdClick, trackAdImpression } from '@/api/advertisements';

interface ListAdCardProps {
    ad: {
        id: string;
        imageUrl: string;
        targetUrl?: string | null;
        kind: 'IMAGE' | 'VIDEO';
        title?: string | null;
    };
    viewMode: 'grid' | 'list';
}

export default function ListAdCard({ ad, viewMode }: ListAdCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasTracked = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTracked.current) {
                    trackAdImpression(ad.id);
                    hasTracked.current = true;
                }
            },
            { threshold: 0.5 } // Count impression when 50% is visible
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, [ad.id]);

    const handleAdClick = () => {
        trackAdClick(ad.id);
    };

    const containerClasses = `col-span-1 ${
        viewMode === 'grid' ? 'sm:col-span-2 lg:col-span-2 xl:col-span-3' : 'w-full'
    } rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative group mb-6 border border-slate-100`;

    const AdMedia = () => (
        <>
            {ad.kind === 'VIDEO' ? (
                <video
                    src={ad.imageUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
            ) : (
                <Image
                    src={ad.imageUrl}
                    alt={ad.title || 'Publicidad'}
                    fill
                    unoptimized={ad.imageUrl.endsWith('.gif')}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
            )}
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                ANUNCIO
            </div>
        </>
    );

    return (
        <div ref={containerRef} className={containerClasses}>
            {ad.targetUrl ? (
                <a
                    href={ad.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleAdClick}
                    className="block w-full h-[140px] md:h-[220px] relative"
                >
                    <AdMedia />
                </a>
            ) : (
                <div className="w-full h-[140px] md:h-[220px] relative">
                    <AdMedia />
                </div>
            )}
        </div>
    );
}
