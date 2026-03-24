'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin);
}

const sections = [
    { id: "hero", num: "01", label: "Inicio" },
    { id: "quienes-somos", num: "02", label: "Quiénes Somos" },
    { id: "mision-vision", num: "03", label: "Propósito" },
    { id: "eventos", num: "04", label: "Remates" },
    { id: "subastas", num: "05", label: "Subastas" },
    // { id: "restauracion", num: "06", label: "Restauración" },
    // { id: "off-road", num: "07", label: "Off Road" },
    { id: "equipo", num: "08", label: "Equipo" },
    { id: "contacto", num: "09", label: "Contacto" }
];

export default function SideNavigation() {
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1,
            scrollTo: `#${id}`,
            ease: "power2.inOut"
        });
    };

    return (
        <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-[60] hidden xl:block">
            <nav className="relative flex flex-col gap-6">
                <div className="absolute left-[11px] top-8 w-[1px] h-[calc(100%-16px)] bg-slate-300"></div>
                {sections.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => handleScroll(e, item.id)}
                            className={`flex items-center gap-4 py-2 transition-all duration-300 cursor-pointer ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                        >
                            <span className={`w-[23px] h-[23px] rounded-full border-2 border-slate-300 bg-white flex items-center justify-center text-[10px] font-bold z-10 transition-colors ${isActive ? 'border-accent bg-accent text-white' : ''}`}>
                                {item.num}
                            </span>
                            <span className={`text-xs uppercase tracking-widest whitespace-nowrap ${isActive ? 'text-accent font-bold' : ''}`}>
                                {item.label}
                            </span>
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
}
