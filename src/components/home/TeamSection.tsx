import React from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';

const team = [
    { name: "Javier Enamorado", role: "Asesor de Ventas", image: "/vendedores/javier.webp" },
    { name: "Belizario Diaz", role: "Asesor de Ventas", image: "/vendedores/belizario.webp" },
    { name: "Gerson Martinez", role: "Asesor de Ventas", image: "/vendedores/gerson.webp" },
    { name: "Henry Rodriguez", role: "Asesor de Ventas", image: "/vendedores/henry.webp" },
    { name: "Mauricio Rodriguez", role: "Asesor de Ventas", image: "/vendedores/mauricio.webp" },
];

export default function TeamSection() {
    return (
        <section id="equipo" className="min-h-screen bg-background-light p-8 md:p-20 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full text-center">
                <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Especialistas</span>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-primary">Nuestro Equipo</h2>
                <p className="text-slate-600 text-lg max-w-3xl mx-auto mb-16 leading-relaxed">
                    Con un equipo comprometido en brindar una atención eficiente y transparente, estamos preparados para asesorarte y acompañarte durante tu proceso de compra, venta o cambio de vehículo, garantizando una experiencia confiable y satisfactoria.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="space-y-4 group">
                            <div className="aspect-[9/16] bg-slate-200 rounded-3xl overflow-hidden flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-300 shadow-lg group-hover:shadow-primary/20 relative">
                                {member.image ? (
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                ) : (
                                    <Users className="w-12 h-12 text-slate-400 group-hover:text-primary transition-colors" />
                                )}
                            </div>
                            <div>
                                <h5 className="font-bold text-lg">{member.name}</h5>
                                <p className="text-sm font-medium text-primary">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
