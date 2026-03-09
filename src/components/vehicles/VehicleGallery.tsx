'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface VehicleGalleryProps {
    images: string[];
}

export default function VehicleGallery({ images }: VehicleGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="w-full flex flex-col lg:w-[40%]">
            {/* Slider Container */}
            <div className="relative w-full aspect-[9/16] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl group/slider">

                {/* Main Image */}
                <div className="w-full h-full relative">
                    <Image
                        src={images[currentIndex]}
                        alt={`Vista del vehículo ${currentIndex + 1}`}
                        fill
                        className="object-cover transition-opacity duration-300"
                        priority
                    />
                    <div className="absolute top-4 right-4 z-20">
                        <button className="bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-red-500 p-3 rounded-full transition-all duration-300 shadow-lg">
                            <Heart className="w-6 h-6" />
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
    );
}
