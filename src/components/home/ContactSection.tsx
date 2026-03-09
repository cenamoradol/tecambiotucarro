'use client';
import React from 'react';
import { MapPin, Clock, Phone, Mail, ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin);
}

export default function ContactSection() {
    const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1,
            scrollTo: '#hero',
            ease: "power2.inOut"
        });
    };
    return (
        <>
            <section id="contacto" className="relative flex flex-col md:flex-row items-stretch min-h-[70vh]">
                <div className="w-full md:w-1/2 bg-slate-200 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-30 grayscale mix-blend-multiply"
                        style={{ backgroundImage: "url('/media__1773003789655.png')" }}
                    ></div>
                    <div className="relative z-10 text-center p-8 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                        <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Encuéntranos</h3>
                        <p className="text-slate-800 dark:text-slate-200 font-medium">
                            Tegucigalpa, Honduras<br />Calle Principal de Automóviles
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-background-dark text-white">
                    <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Conéctate con Nosotros</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-12 text-primary">Contacto</h2>

                    <div className="space-y-10">
                        <div className="flex items-start gap-6 group">
                            <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-accent/20 transition-colors">
                                <Clock className="w-8 h-8 text-accent" />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl mb-1">Horario de Atención</h4>
                                <p className="text-slate-400">Lunes a Sábado: 8:00 AM - 6:00 PM</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-accent/20 transition-colors">
                                <Phone className="w-8 h-8 text-accent" />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl mb-1">Teléfonos</h4>
                                <p className="text-slate-400">+504 2200-0000<br />+504 9900-0000</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-accent/20 transition-colors">
                                <Mail className="w-8 h-8 text-accent" />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl mb-1">Email</h4>
                                <p className="text-slate-400">ventas@tecambiotucarrohn.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scroll to top button */}
            <a
                href="#hero"
                onClick={handleScrollToTop}
                className="fixed bottom-8 right-8 z-50 bg-accent text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform group cursor-pointer"
            >
                <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </a>
        </>
    );
}
