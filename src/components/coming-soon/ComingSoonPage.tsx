'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ComingSoonPage() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) setSubmitted(true);
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#0a1a10] flex items-center justify-center">
            {/* Animated background gradient orbs */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full bg-[#0b6b11]/20 blur-[120px] animate-pulse"
                style={{
                    top: '10%',
                    left: '20%',
                    transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
                    transition: 'transform 0.3s ease-out',
                }}
            />
            <div
                className="absolute w-[500px] h-[500px] rounded-full bg-[#FFB81C]/10 blur-[100px] animate-pulse"
                style={{
                    bottom: '10%',
                    right: '15%',
                    animationDelay: '1s',
                    transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
                    transition: 'transform 0.3s ease-out',
                }}
            />
            <div
                className="absolute w-[400px] h-[400px] rounded-full bg-[#0b6b11]/15 blur-[80px] animate-pulse"
                style={{
                    top: '50%',
                    right: '40%',
                    animationDelay: '2s',
                    transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
                    transition: 'transform 0.3s ease-out',
                }}
            />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
                {/* Logo */}
                <div className="relative w-64 sm:w-80 md:w-96 h-24 sm:h-32 mb-10 animate-[fadeInDown_0.8s_ease-out]">
                    <Image
                        src="/logo.png"
                        alt="Te Cambio Tu Carro"
                        fill
                        className="object-contain brightness-0 invert"
                        priority
                    />
                </div>

                {/* Badge */}
                <div className="animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b6b11]/20 border border-[#0b6b11]/30 text-[#4ade80] text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                        En Construcción
                    </span>
                </div>

                {/* Headline */}
                <h1 className="mt-8 text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1] animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
                    <span className="text-white">Muy</span>{' '}
                    <span className="bg-gradient-to-r from-[#0b6b11] via-[#4ade80] to-[#FFB81C] bg-clip-text text-transparent">
                        Pronto
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
                    Estamos preparando algo increíble para ti. Una nueva experiencia de compra y venta de vehículos, totalmente rediseñada.
                </p>



                {/* Feature pills */}
                <div className="mt-14 flex flex-wrap gap-3 justify-center animate-[fadeInUp_0.8s_ease-out_1s_both]">
                    {['Catálogo Digital', 'Financiamiento', 'Remates', 'Subastas'].map((item) => (
                        <span key={item} className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-gray-500 text-xs font-medium tracking-wide">
                            {item}
                        </span>
                    ))}
                </div>

                {/* Social links */}
                <div className="mt-12 flex items-center gap-6 animate-[fadeInUp_0.8s_ease-out_1.2s_both]">
                    <a href="https://www.facebook.com/tecambiotucarro" className="text-gray-600 hover:text-[#4ade80] transition-colors" aria-label="Facebook">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    </a>
                    <a href="https://www.instagram.com/te_cambio_tu_carro/" className="text-gray-600 hover:text-[#4ade80] transition-colors" aria-label="Instagram">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                    </a>
                </div>
            </div>

        </div>
    );
}
