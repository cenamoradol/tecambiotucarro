'use client';

import React, { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import { PublicAdvertisement, fetchAdvertisements, trackAdImpression, trackAdClick } from '@/api/advertisements';
import Image from 'next/image';
import gsap from 'gsap';

export default function FloatingAd() {
    const [ad, setAd] = useState<PublicAdvertisement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [hasBeenDismissed, setHasBeenDismissed] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);
    const hasTracked = useRef(false);

    // Initial mount check to avoid hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || hasBeenDismissed) return;

        const loadAd = async () => {
            try {
                const allAds = await fetchAdvertisements();
                const floatingAds = allAds.filter(a => a.placement === 'FLOATING_BOTTOM');

                if (floatingAds.length > 0) {
                    // 1. Weighted Random Selection
                    // Sum all weights
                    const totalWeight = floatingAds.reduce((sum, ad) => sum + (ad.weight || 1), 0);
                    // Select a random number between 0 and totalWeight
                    let random = Math.random() * totalWeight;

                    // Pick the ad whose weight encompasses the random value
                    let selectedAd = floatingAds[0];
                    for (const ad of floatingAds) {
                        if (random < (ad.weight || 1)) {
                            selectedAd = ad;
                            break;
                        }
                        random -= (ad.weight || 1);
                    }

                    setAd(selectedAd);

                    // Show after 20 seconds
                    const timer = setTimeout(() => {
                        if (bannerRef.current) {
                            gsap.to(bannerRef.current, {
                                y: 0,
                                opacity: 1,
                                duration: 0.8,
                                ease: 'power3.out',
                                display: 'flex',
                                onStart: () => {
                                    // Track Impression when ad becomes visible
                                    if (!hasTracked.current) {
                                        trackAdImpression(selectedAd.id);
                                        hasTracked.current = true;
                                    }
                                }
                            });
                        }
                    }, 20000);

                    return () => clearTimeout(timer);
                }
            } catch (err) {
                console.error("Error loading floating ad", err);
            }
        };

        loadAd();
    }, [isMounted, hasBeenDismissed]);

    const handleClose = () => {
        if (bannerRef.current) {
            gsap.to(bannerRef.current, {
                y: 100,
                opacity: 0,
                duration: 0.4,
                ease: 'power3.in',
                onComplete: () => {
                    setHasBeenDismissed(true);
                }
            });
        }
    };

    const handleAdClick = () => {
        if (ad) {
            trackAdClick(ad.id);
        }
    };

    if (!isMounted || !ad || hasBeenDismissed) return null;

    return (
        <div
            ref={bannerRef}
            className="fixed bottom-0 left-0 w-full z-[100] p-4 hidden justify-center opacity-0 translate-y-10"
        >
            <div className="relative max-w-3xl w-full bg-white rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden group">

                {/* Close Button - More prominence for floating ad */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 z-30 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 transition-all duration-300 backdrop-blur-sm hover:scale-110"
                    aria-label="Cerrar anuncio"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Ad Content - Forced 2:1 Aspect Ratio (1280x640) */}
                <div className="aspect-[6/1] w-full relative overflow-hidden">
                    {ad.targetUrl ? (
                        <a
                            href={ad.targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleAdClick}
                            className="block w-full h-full relative"
                        >
                            <AdMedia ad={ad} />
                            <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded z-20">
                                ANUNCIO
                            </div>
                        </a>
                    ) : (
                        <div className="w-full h-full relative">
                            <AdMedia ad={ad} />
                            <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded z-20">
                                ANUNCIO
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper to keep the JSX clean
function AdMedia({ ad }: { ad: PublicAdvertisement }) {
    if (ad.kind === 'VIDEO') {
        return (
            <video
                src={ad.imageUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
            />
        );
    }
    return (
        <Image
            src={ad.imageUrl}
            alt={ad.title || "Publicidad"}
            fill
            unoptimized={ad.imageUrl.endsWith('.gif')}
            className="object-cover"
        />
    );
}
