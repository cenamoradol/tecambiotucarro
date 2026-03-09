import React from 'react';
import Image from 'next/image';

export default function AboutSection() {
    return (
        <section id="quienes-somos" className="flex flex-col md:flex-row items-stretch min-h-screen relative">
            <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 bg-background-light dark:bg-background-dark">
                <div className="max-w-md">
                    <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Nuestra Historia</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-primary">Trayectoria y Confianza</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                        Te Cambio Tu Carro es una empresa dedicada a la compra y venta de vehículos, con más de 15 años de experiencia en el mercado automotriz. A lo largo de su trayectoria se ha caracterizado por ofrecer vehículos a precios accesibles y competitivos, implementando un modelo de negocio basado en la alta rotación de inventario y en brindar a sus clientes una forma confiable y ágil de realizar transacciones de compra y venta de automóviles.
                    </p>
                </div>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-slate-200">
                <Image
                    src="/dorian.webp"
                    alt="Acerca de Te Cambio Tu Carro"
                    fill
                    className="object-cover"
                />
            </div>
        </section>
    );
}
