'use client';
import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function HeroSection() {
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0.5);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
            // Si desmuteamos y el volumen estaba en 0, lo ponemos por defecto a algo audible
            if (isMuted && volume === 0) setVolume(0.5);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            if (newVolume === 0) {
                setIsMuted(true);
                videoRef.current.muted = true;
            } else {
                setIsMuted(false);
                videoRef.current.muted = false;
            }
        }
    };

    return (
        <section id="hero" className="flex items-center justify-center overflow-hidden h-screen w-full relative">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/videos/home-banner.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="z-20 relative text-center px-4">
                {/* Posible contenido futuro encima del video hero */}
            </div>

            {/* Controles de sonido superiores */}
            <div className="absolute top-28 right-8 z-50 flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full px-4 py-2 transition-all duration-300 border border-white/10 group">
                <button
                    onClick={toggleMute}
                    className="text-white hover:text-primary transition-colors focus:outline-none"
                    aria-label={isMuted ? "Activar sonido" : "Silenciar"}
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
        </section>
    );
}
