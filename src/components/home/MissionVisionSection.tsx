import React from 'react';
import { Target, Eye } from 'lucide-react';

export default function MissionVisionSection() {
    return (
        <section className="flex flex-col min-h-screen" id="mision-vision">
            {/* Misión */}
            <div className="flex-1 w-full bg-background-light dark:bg-slate-900 relative overflow-hidden flex items-center border-b border-slate-200 dark:border-slate-800 py-20">
                <div className="absolute inset-0 bg-primary/5 -skew-x-12 translate-x-1/2 opacity-30"></div>
                <div className="container mx-auto px-12 md:px-32 flex justify-start z-10 w-full lg:w-[85%]">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-shrink-0">
                            <div className="bg-primary text-white w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center shadow-2xl rotate-3">
                                <Target className="w-12 h-12 md:w-16 md:h-16" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-5xl md:text-7xl font-black text-primary uppercase italic tracking-tighter mb-4">Misión</h3>
                            <p className="text-slate-700 dark:text-slate-300 text-xl md:text-3xl leading-snug font-medium italic">
                                &quot;Brindar a nuestros clientes la mejor experiencia en la compra y venta de vehículos, ofreciendo precios competitivos, procesos transparentes y una forma innovadora de hacer negocios que responda a sus necesidades.&quot;
                            </p>
                        </div>
                    </div>
                </div>
                <div className="absolute right-10 bottom-0 text-[8rem] md:text-[16rem] font-black text-primary/5 select-none pointer-events-none italic uppercase leading-none">Misión</div>
            </div>

            {/* Visión */}
            <div className="flex-1 w-full bg-white dark:bg-background-dark relative overflow-hidden flex items-center py-20">
                <div className="absolute inset-0 bg-accent/5 skew-x-12 -translate-x-1/2 opacity-30"></div>
                <div className="container mx-auto px-12 md:px-32 flex justify-end z-10 text-right w-full lg:w-[85%]">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                        <div className="flex-shrink-0">
                            <div className="bg-accent text-white w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center shadow-2xl -rotate-3">
                                <Eye className="w-12 h-12 md:w-16 md:h-16" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-5xl md:text-7xl font-black text-accent uppercase italic tracking-tighter mb-4">Visión</h3>
                            <p className="text-slate-700 dark:text-slate-300 text-xl md:text-3xl leading-snug font-medium italic">
                                &quot;Ser reconocidos como el referente en la compra y venta de vehículos, ofreciendo una experiencia confiable, innovadora, y construyendo relaciones duraderas con nuestros clientes basadas en confianza.&quot;
                            </p>
                        </div>
                    </div>
                </div>
                <div className="absolute left-10 top-0 text-[8rem] md:text-[16rem] font-black text-accent/5 select-none pointer-events-none italic uppercase leading-none">Visión</div>
            </div>
        </section>
    );
}
