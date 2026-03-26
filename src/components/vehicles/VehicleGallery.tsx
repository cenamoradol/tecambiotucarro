'use client';
import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface VehicleGalleryProps {
    images: string[];
}

export default function VehicleGallery({ images }: VehicleGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    // Zoom state
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const lastPosition = useRef({ x: 0, y: 0 });
    const lastTouchDistance = useRef(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const openZoom = () => {
        setIsZoomed(true);
        setScale(1);
        setPosition({ x: 0, y: 0 });
        document.body.style.overflow = 'hidden';
    };

    const closeZoom = () => {
        setIsZoomed(false);
        setScale(1);
        setPosition({ x: 0, y: 0 });
        document.body.style.overflow = '';
    };

    // Desktop: wheel zoom
    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        setScale(prev => Math.min(Math.max(prev + (e.deltaY > 0 ? -0.3 : 0.3), 1), 5));
    }, []);

    // Desktop: drag to pan
    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale <= 1) return;
        setIsDragging(true);
        dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || scale <= 1) return;
        setPosition({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y,
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    // Mobile: pinch to zoom + drag
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            lastTouchDistance.current = dist;
        } else if (e.touches.length === 1 && scale > 1) {
            setIsDragging(true);
            dragStart.current = {
                x: e.touches[0].clientX - position.x,
                y: e.touches[0].clientY - position.y,
            };
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            if (lastTouchDistance.current > 0) {
                const delta = dist / lastTouchDistance.current;
                setScale(prev => Math.min(Math.max(prev * delta, 1), 5));
            }
            lastTouchDistance.current = dist;
        } else if (e.touches.length === 1 && isDragging && scale > 1) {
            setPosition({
                x: e.touches[0].clientX - dragStart.current.x,
                y: e.touches[0].clientY - dragStart.current.y,
            });
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        lastTouchDistance.current = 0;
    };

    // Double tap to toggle zoom
    const lastTap = useRef(0);
    const handleDoubleTap = () => {
        const now = Date.now();
        if (now - lastTap.current < 300) {
            if (scale > 1) {
                setScale(1);
                setPosition({ x: 0, y: 0 });
            } else {
                setScale(2.5);
            }
        }
        lastTap.current = now;
    };

    return (
        <>
            <div className="w-full flex flex-col lg:w-[40%]">
                {/* Slider Container */}
                <div className="relative w-full aspect-[9/16] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl group/slider">

                    {/* Main Image */}
                    <div className="w-full h-full relative cursor-zoom-in" onClick={openZoom}>
                        <Image
                            src={images[currentIndex]}
                            alt={`Vista del vehículo ${currentIndex + 1}`}
                            fill
                            className="object-cover transition-opacity duration-300"
                            priority
                        />
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); openZoom(); }}
                                className="bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-text-main p-3 rounded-full transition-all duration-300 shadow-lg"
                            >
                                <ZoomIn className="w-5 h-5" />
                            </button>

                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 size-12 flex items-center justify-center rounded-full glass-panel text-text-main hover:bg-primary hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 duration-300"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 size-12 flex items-center justify-center rounded-full glass-panel text-text-main hover:bg-primary hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 duration-300"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Pagination Dots */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 p-2 rounded-full glass-panel">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`size-2.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-primary' : 'bg-black/20'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Gradient Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${idx === currentIndex ? 'border-primary ring-offset-2 ring-primary' : 'border-gray-200 hover:border-primary/50'}`}
                            >
                                <Image
                                    src={img}
                                    alt={`Miniatura ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Fullscreen Zoom Modal */}
            {isZoomed && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
                    onClick={(e) => { if (e.target === e.currentTarget && scale <= 1) closeZoom(); }}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeZoom}
                        className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all backdrop-blur-md"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Image counter */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 text-white/70 text-sm font-semibold bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Zoom Navigation */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); setScale(1); setPosition({ x: 0, y: 0 }); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 size-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); setScale(1); setPosition({ x: 0, y: 0 }); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 size-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Zoomable Image */}
                    <div
                        className="w-full h-full flex items-center justify-center overflow-hidden touch-none select-none"
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onClick={handleDoubleTap}
                    >
                        <div
                            className="relative w-full h-full transition-transform duration-100 ease-out"
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                                cursor: scale > 1 ? 'grab' : 'zoom-in',
                            }}
                        >
                            <Image
                                src={images[currentIndex]}
                                alt={`Zoom - Vista del vehículo ${currentIndex + 1}`}
                                fill
                                className="object-contain"
                                quality={90}
                                sizes="100vw"
                            />
                        </div>
                    </div>

                    {/* Zoom level indicator */}
                    {scale > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 text-white/60 text-xs font-semibold bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                            {Math.round(scale * 100)}%
                        </div>
                    )}

                    {/* Thumbnails strip at bottom */}
                    {images.length > 1 && (
                        <div className="absolute bottom-6 left-0 right-0 z-50 flex justify-center gap-2 px-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); setScale(1); setPosition({ x: 0, y: 0 }); }}
                                    className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${idx === currentIndex ? 'border-primary scale-110' : 'border-white/20 opacity-60 hover:opacity-100'}`}
                                >
                                    <Image src={img} alt={`Miniatura ${idx + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
