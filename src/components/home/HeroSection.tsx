'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { trackAdClick, trackAdImpression } from '@/api/advertisements';
import Image from 'next/image';

// ──────────────────────────────────────────────
// Configure your hero slides here.
// type: 'video' | 'image'
// src:  path relative to /public
// ──────────────────────────────────────────────
export interface HeroSlide {
    id?: string;
    type: 'video' | 'image';
    src: string;
    alt?: string;
    targetUrl?: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
    { type: 'video', src: '/banners/home-banner.mp4' },
];

const SLIDE_INTERVAL = 8000; // ms – time per slide (auto-advance)

interface Props {
    slides?: HeroSlide[];
}

export default function HeroSection({ slides = DEFAULT_SLIDES }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0.5);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const trackedAds = useRef<Set<string>>(new Set());

    useEffect(() => { setIsMounted(true); }, []);

    const currentSlide = slides[currentIndex];
    const hasMultipleSlides = isMounted && slides.length > 1;

    useEffect(() => {
        if (isMounted) console.log("Hero slides:", slides.length, slides);
    }, [isMounted, slides]);

    // ── Metrics Tracking ──────────────────────
    useEffect(() => {
        if (isMounted && currentSlide && currentSlide.id) {
            if (!trackedAds.current.has(currentSlide.id)) {
                trackAdImpression(currentSlide.id);
                trackedAds.current.add(currentSlide.id);
            }
        }
    }, [isMounted, currentIndex, currentSlide]);

    // ── Navigation helpers ────────────────────
    const goTo = useCallback((index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        // Pause current video if any
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo) {
            currentVideo.pause();
            currentVideo.currentTime = 0;
        }
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 700);
    }, [currentIndex, isTransitioning]);

    const goNext = useCallback(() => {
        goTo((currentIndex + 1) % slides.length);
    }, [currentIndex, slides.length, goTo]);

    const goPrev = useCallback(() => {
        goTo((currentIndex - 1 + slides.length) % slides.length);
    }, [currentIndex, slides.length, goTo]);

    // ── Auto-advance timer ────────────────────
    useEffect(() => {
        if (isPaused || !hasMultipleSlides) return;

        timerRef.current = setTimeout(() => {
            goNext();
        }, SLIDE_INTERVAL);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [currentIndex, isPaused, hasMultipleSlides, goNext]);

    // ── Play current video when it becomes active ──
    useEffect(() => {
        const video = videoRefs.current[currentIndex];
        if (video && currentSlide.type === 'video') {
            video.currentTime = 0;
            video.play().catch(() => { /* autoplay blocked – user can unmute */ });
        }
    }, [currentIndex, currentSlide]);

    // ── Audio controls ────────────────────────
    const toggleMute = () => {
        const anyVideo = videoRefs.current.find(v => v !== null);
        if (!anyVideo) return;
        videoRefs.current.forEach(v => {
            if (v) {
                v.muted = !isMuted;
                v.volume = volume;
            }
        });
        setIsMuted(!isMuted);
        if (isMuted && volume === 0) setVolume(0.5);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        videoRefs.current.forEach(v => {
            if (v) {
                v.volume = newVolume;
                v.muted = newVolume === 0;
            }
        });
        setIsMuted(newVolume === 0);
    };

    // Does ANY slide have a video? (to know whether to show audio controls)
    const hasVideo = slides.some(s => s.type === 'video');

    const handleAdClick = (id?: string) => {
        if (id) trackAdClick(id);
    };

    return (
        <section id="hero" className="flex items-center justify-center overflow-hidden h-screen w-full relative">
            {/* ── Slides ── */}
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out ${i === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40 z-10" />

                    {slide.type === 'video' ? (
                        slide.targetUrl ? (
                            <a 
                                href={slide.targetUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={() => handleAdClick(slide.id)}
                                className="block w-full h-full cursor-pointer relative z-20"
                            >
                                <video
                                    ref={(el) => { videoRefs.current[i] = el; }}
                                    autoPlay={i === 0}
                                    loop
                                    muted={isMuted}
                                    playsInline
                                    className="w-full h-full object-cover"
                                >
                                    <source src={slide.src} type="video/mp4" />
                                </video>
                            </a>
                        ) : (
                            <video
                                ref={(el) => { videoRefs.current[i] = el; }}
                                autoPlay={i === 0}
                                loop
                                muted={isMuted}
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={slide.src} type="video/mp4" />
                            </video>
                        )
                    ) : (
                        slide.targetUrl ? (
                            <a 
                                href={slide.targetUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={() => handleAdClick(slide.id)}
                                className="block w-full h-full cursor-pointer relative z-20"
                            >
                                <Image
                                    src={slide.src}
                                    alt={slide.alt || `Hero slide ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={i === 0}
                                    unoptimized={slide.src.endsWith('.gif')}
                                />
                            </a>
                        ) : (
                            <Image
                                src={slide.src}
                                alt={slide.alt || `Hero slide ${i + 1}`}
                                fill
                                className="object-cover"
                                priority={i === 0}
                                unoptimized={slide.src.endsWith('.gif')}
                            />
                        )
                    )}

                </div>
            ))}

            {/* ── Center content area (empty for now, keeps future extensibility) ── */}
            <div className="z-20 relative text-center px-4">
                {/* Posible contenido futuro encima del video hero */}
            </div>

            {/* ── Slider Controls ── */}
            {hasMultipleSlides && (
                <>
                    {/* Prev / Next arrows */}
                    <button
                        onClick={goPrev}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:scale-110 group"
                        aria-label="Slide anterior"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={goNext}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:scale-110 group"
                        aria-label="Siguiente slide"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Dot indicators + Pause/Play */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10">
                        {/* Pause / Play */}
                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className="text-white/80 hover:text-white transition-colors mr-1"
                            aria-label={isPaused ? 'Reanudar' : 'Pausar'}
                        >
                            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                        </button>

                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className="relative group/dot focus:outline-none"
                                aria-label={`Ir al slide ${i + 1}`}
                            >
                                {/* Background track */}
                                <div className={`w-8 h-1.5 rounded-full transition-all duration-300 overflow-hidden ${i === currentIndex ? 'bg-white/30' : 'bg-white/20 hover:bg-white/40'
                                    }`}>
                                    {/* Animated fill for active slide */}
                                    {i === currentIndex && !isPaused && (
                                        <div
                                            className="h-full bg-white rounded-full hero-progress-bar"
                                            style={{
                                                animation: `heroProgress ${SLIDE_INTERVAL}ms linear forwards`,
                                            }}
                                        />
                                    )}
                                    {i === currentIndex && isPaused && (
                                        <div className="h-full bg-white rounded-full w-full" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}

            {/* ── Audio controls (top-right, only if there's a video) ── */}
            {hasVideo && (
                <div className="absolute top-28 right-8 z-50 flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full px-4 py-2 transition-all duration-300 border border-white/10 group">
                    <button
                        onClick={toggleMute}
                        className="text-white hover:text-primary transition-colors focus:outline-none"
                        aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                    >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-0 group-hover:w-24 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out h-1.5 bg-gray-500/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-primary"
                    />
                </div>
            )}
        </section>
    );
}
