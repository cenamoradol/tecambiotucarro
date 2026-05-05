'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lottie from 'lottie-react';
import animationData from '../../../public/animations/man-walking.json';

export default function TakeoverAd() {
    const [isVisible, setIsVisible] = useState(false);
    const mascotRef = useRef<HTMLDivElement>(null);
    const bubbleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Por ahora lo dejamos sin límite de sesión para que puedas probarlo
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        if (!isVisible) return;

        const tl = gsap.timeline();

        // 1. Caminata de entrada
        tl.fromTo(mascotRef.current, 
            { x: -300, opacity: 0 }, 
            { 
                x: 50, 
                opacity: 1, 
                duration: 3, 
                ease: "none" // "none" suele ser mejor para caminatas de Lottie
            }
        );

        // 2. Aparece el globo de texto
        tl.fromTo(bubbleRef.current, 
            { scale: 0, opacity: 0, transformOrigin: "bottom left" }, 
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.5"
        );

        // 3. Esperar y luego irse
        tl.to(bubbleRef.current, { scale: 0, opacity: 0, delay: 6, duration: 0.3 });
        
        tl.to(mascotRef.current, { 
            x: -400, 
            opacity: 0, 
            duration: 2.5, 
            ease: "none",
            onComplete: () => setIsVisible(false)
        });

    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 z-[9999] pointer-events-none p-4 flex items-end overflow-visible">
            
            <div ref={mascotRef} className="relative flex flex-col items-start pointer-events-auto group">
                
                {/* Globo de Texto */}
                <div 
                    ref={bubbleRef}
                    className="absolute -top-24 left-24 min-w-[200px] bg-white border-2 border-primary p-4 rounded-2xl shadow-xl text-center"
                >
                    <p className="text-slate-900 font-bold text-md leading-tight">
                        ¡Hola! 👋<br/>
                        <span className="text-primary">Anúnciate con nosotros</span>
                    </p>
                    <div className="absolute -bottom-2.5 left-6 w-5 h-5 bg-white border-r-2 border-b-2 border-primary rotate-45"></div>
                </div>

                {/* Animación Lottie */}
                <div className="w-48 h-48 drop-shadow-lg">
                    <Lottie 
                        animationData={animationData} 
                        loop={true}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            </div>

        </div>
    );
}
