'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function HomeGSAPWrapper({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Seleccionamos todas las secciones principales
        const sections = gsap.utils.toArray<HTMLElement>('section');

        // Animaciones de entrada para cada sección
        sections.forEach((section) => {
            // Configuramos elementos que queramos animar
            const fadeElements = section.querySelectorAll('h2, h3, p, .gsap-animate-up');
            const scaleElements = section.querySelectorAll('.gsap-animate-scale');

            if (fadeElements.length > 0) {
                gsap.from(fadeElements, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    }
                });
            }

            if (scaleElements.length > 0) {
                gsap.from(scaleElements, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    }
                });
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full flex flex-col font-display bg-background-light dark:bg-background-dark">
            {children}
        </div>
    );
}
