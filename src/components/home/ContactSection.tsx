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
                <div className="w-full md:w-1/2 bg-slate-200 flex items-center justify-center relative overflow-hidden min-h-[400px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.7100473183596!2d-88.01846147304687!3d15.500020899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f665b5255f704bd%3A0xda3070f690ee41b6!2sTe%20Cambio%20Tu%20Carro!5e0!3m2!1ses-419!2shn!4v1774413999496!5m2!1ses-419!2shn"
                        className="absolute inset-0 w-full h-full border-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Te+Cambio+Tu+Carro+San+Pedro+Sula"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 text-center p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl hover:bg-white/80 transition-all group block"
                    >
                        <MapPin className="w-16 h-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-2xl font-bold mb-2">Encuéntranos</h3>
                        <p className="text-slate-800 font-medium">
                            Entrada Colonia Aurora, 6 calle, <br />Avenida Juan Pablo ll, San Pedro Sula, Cortés.
                        </p>
                    </a>
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
                                <p className="text-slate-400">Lunes a Viernes: 7:00 a.m. - 5:00 p.m.</p>
                                <p className="text-slate-400">Sábados: 7:00 a.m. - 3:00 p.m.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-accent/20 transition-colors">
                                <Phone className="w-8 h-8 text-accent" />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl mb-1">Teléfonos</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                                    <a href="https://wa.me/50497944064" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> +504 9794-4064
                                    </a>
                                    <a href="https://wa.me/50499289097" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> +504 9928-9097
                                    </a>
                                    <a href="https://wa.me/50498396592" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> +504 9839-6592
                                    </a>
                                    <a href="https://wa.me/50493483507" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> +504 9348-3507
                                    </a>
                                    <a href="https://wa.me/50498023560" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> +504 9802-3560
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* <div className="flex items-start gap-6 group">
                            <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-accent/20 transition-colors">
                                <Mail className="w-8 h-8 text-accent" />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl mb-1">Email</h4>
                                <p className="text-slate-400">ventas@tecambiotucarrohn.com</p>
                            </div>
                        </div> */}
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
