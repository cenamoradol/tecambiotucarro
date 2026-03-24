'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Event } from '@/api/events';
import VehicleCard from '@/components/vehicles/VehicleCard';
import gsap from 'gsap';
import { Calendar, Images, CarFront, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SubastasContent({ initialEvents }: { initialEvents: Event[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    // Active tab = active event index
    const [activeIdx, setActiveIdx] = useState(0);
    // Hero carousel index
    const [heroIdx, setHeroIdx] = useState(0);
    // Show all gallery items toggle
    const [showAllGallery, setShowAllGallery] = useState(false);

    const activeEvent = initialEvents[activeIdx] || null;

    // Combined gallery items: images first, then vehicles
    const galleryImages = activeEvent?.media || [];
    const galleryVehicles = activeEvent?.vehicles || [];

    // How many gallery items to show initially
    const GALLERY_PREVIEW = 5;
    const totalGalleryItems = galleryImages.length + galleryVehicles.length;
    const hasMoreGallery = totalGalleryItems > GALLERY_PREVIEW;

    // Hero images: use all event images for the carousel
    const heroImages = galleryImages.length > 0 ? galleryImages : [];

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.hero-anim', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Animate gallery when tab changes
    useEffect(() => {
        if (!galleryRef.current) return;
        setShowAllGallery(false);
        setHeroIdx(0);
        const ctx = gsap.context(() => {
            gsap.fromTo('.gallery-item', { opacity: 0, y: 20, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' });
        }, galleryRef);
        return () => ctx.revert();
    }, [activeIdx]);

    // Hero carousel auto-advance
    useEffect(() => {
        if (heroImages.length <= 1) return;
        const interval = setInterval(() => {
            setHeroIdx(prev => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroImages.length, activeIdx]);

    if (!initialEvents || initialEvents.length === 0) {
        return (
            <main className="max-w-[1200px] w-full mx-auto p-6 md:p-10 flex flex-col justify-center items-center min-h-[60vh] pt-28">
                <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Experiencias Exclusivas</span>
                <h2 className="text-4xl md:text-6xl font-black text-primary uppercase italic tracking-tighter mb-4 text-center">Galería de Subastas</h2>
                <p className="text-lg text-slate-500 text-center">Actualmente no hay eventos de subastas disponibles.</p>
            </main>
        );
    }

    const dateFormatted = activeEvent?.date
        ? new Intl.DateTimeFormat('es-HN', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(activeEvent.date))
        : 'Fecha por anunciar';

    return (
        <main className="min-h-screen bg-background-light" ref={containerRef}>

            {/* ═══════════ HERO SECTION ═══════════ */}
            <section className="relative overflow-hidden bg-white pt-28 pb-16">
                <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                        {/* Left: Text */}
                        <div className="hero-anim">
                            <span className="inline-block bg-accent/15 text-accent font-bold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full mb-6">
                                🏆 Eventos Exclusivos
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-text-main leading-[0.95] tracking-tighter mb-6">
                                Resultados de<br />
                                <span className="text-primary italic">Subastas</span> Épicas.
                            </h1>
                            <p className="text-slate-600 text-lg leading-relaxed max-w-md mb-8">
                                Revive los momentos más emocionantes de nuestras subastas.
                                Aquí presentamos una selección exclusiva de los vehículos que encontraron
                                nuevos dueños a través de nuestra plataforma.
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 bg-background-light rounded-xl px-5 py-3">
                                    <CarFront className="w-6 h-6 text-primary" />
                                    <div>
                                        <span className="text-xl font-black text-text-main">{galleryVehicles.length}</span>
                                        <span className="text-xs text-text-muted block">Autos Subastados</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-background-light rounded-xl px-5 py-3">
                                    <Images className="w-6 h-6 text-primary" />
                                    <div>
                                        <span className="text-xl font-black text-text-main">{galleryImages.length}</span>
                                        <span className="text-xs text-text-muted block">Fotos del Evento</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Hero Image Carousel */}
                        <div className="hero-anim relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-200 shadow-2xl group">
                            {heroImages.length > 0 ? (
                                <>
                                    {heroImages.map((img, i) => (
                                        <img
                                            key={img.id}
                                            src={img.url}
                                            alt={`Subasta imagen ${i + 1}`}
                                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === heroIdx ? 'opacity-100' : 'opacity-0'}`}
                                        />
                                    ))}
                                    {/* Carousel controls */}
                                    {heroImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => setHeroIdx(prev => prev === 0 ? heroImages.length - 1 : prev - 1)}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white"
                                            >
                                                <ChevronLeft className="w-5 h-5 text-text-main" />
                                            </button>
                                            <button
                                                onClick={() => setHeroIdx(prev => (prev + 1) % heroImages.length)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white"
                                            >
                                                <ChevronRight className="w-5 h-5 text-text-main" />
                                            </button>
                                            {/* Dots */}
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                                {heroImages.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setHeroIdx(i)}
                                                        className={`h-2 rounded-full transition-all duration-300 ${i === heroIdx ? 'w-8 bg-accent' : 'w-2 bg-white/60'}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    {/* Edition badge on image */}
                                    <div className="absolute bottom-6 left-6 bg-accent text-slate-900 font-black text-sm px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 z-10">
                                        <Calendar className="w-4 h-4" />
                                        {activeEvent?.name}
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-400">
                                    <Images className="w-16 h-16" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ TABS: Ediciones ═══════════ */}
            <section className="bg-white border-b border-slate-200 sticky top-[72px] z-30">
                <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
                        {initialEvents.map((ev, idx) => (
                            <button
                                key={ev.id}
                                onClick={() => setActiveIdx(idx)}
                                className={`whitespace-nowrap px-5 py-3 text-sm font-bold rounded-full transition-all duration-200 ${
                                    idx === activeIdx
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'text-text-muted hover:text-text-main hover:bg-slate-100'
                                }`}
                            >
                                {ev.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ COMBINED GALLERY: Images + Vehicles ═══════════ */}
            <section className="py-16" ref={galleryRef}>
                <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">

                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">Historial del Evento</h2>
                            <p className="text-text-muted mt-1">
                                Explora las imágenes y vehículos destacados de <span className="font-bold text-text-main">{activeEvent?.name}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-text-muted">
                            <span className="flex items-center gap-1.5 bg-white rounded-full px-4 py-2 border border-slate-200">
                                <Images className="w-4 h-4 text-primary" /> {galleryImages.length} Fotos
                            </span>
                            <span className="flex items-center gap-1.5 bg-white rounded-full px-4 py-2 border border-slate-200">
                                <CarFront className="w-4 h-4 text-primary" /> {galleryVehicles.length} Vehículos
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    {activeEvent?.description && (
                        <p className="text-slate-600 leading-relaxed text-lg mb-10 max-w-3xl">{activeEvent.description}</p>
                    )}

                    {/* Combined Masonry-like Grid */}
                    {totalGalleryItems === 0 ? (
                        <div className="text-center py-20 text-slate-400 italic">
                            Este evento aún no tiene contenido multimedia ni vehículos.
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {/* Render images */}
                                {galleryImages.slice(0, showAllGallery ? galleryImages.length : GALLERY_PREVIEW).map((media, i) => (
                                    <div
                                        key={`img-${media.id}`}
                                        className={`gallery-item relative rounded-2xl overflow-hidden bg-slate-100 group cursor-pointer ${
                                            i === 0 ? 'col-span-2 row-span-2' : ''
                                        }`}
                                    >
                                        <div className={`${i === 0 ? 'aspect-square' : 'aspect-[4/3]'}`}>
                                            <img
                                                src={media.url}
                                                alt={`Galería ${i + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        {media.isCover && (
                                            <span className="absolute top-3 left-3 bg-accent text-slate-900 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                                                Portada
                                            </span>
                                        )}
                                    </div>
                                ))}

                                {/* "See full gallery" card if collapsed and there are more images */}
                                {!showAllGallery && galleryImages.length > GALLERY_PREVIEW && (
                                    <button
                                        onClick={() => setShowAllGallery(true)}
                                        className="gallery-item rounded-2xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center gap-3 aspect-[4/3] hover:border-primary hover:bg-primary/5 transition-colors group cursor-pointer"
                                    >
                                        <Images className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
                                        <span className="text-sm font-bold text-slate-500 group-hover:text-primary transition-colors">
                                            Explorar Galería Completa
                                        </span>
                                        <span className="text-xs text-slate-400">+{galleryImages.length - GALLERY_PREVIEW} fotos más</span>
                                    </button>
                                )}
                            </div>

                            {/* Vehicles Section */}
                            {galleryVehicles.length > 0 && (
                                <div className="mt-16">
                                    <h3 className="text-2xl font-black text-text-main tracking-tight mb-2">Autos Subastados</h3>
                                    <p className="text-text-muted mb-8">Explora los modelos más destacados que han pasado por nuestra subasta.</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {galleryVehicles.map(ev => {
                                            if (!ev.vehicle) return null;
                                            return (
                                                <div key={ev.vehicle.id} className="gallery-item">
                                                    <VehicleCard vehicle={ev.vehicle} viewMode="grid" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* ═══════════ CTA SECTION ═══════════ */}
            <section className="py-20 bg-text-main text-white">
                <div className="max-w-[700px] w-full mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-4">¿Quiere ser parte del próximo evento?</h2>
                    <p className="text-slate-400 mb-10 leading-relaxed">
                        Únase a nuestra lista de correo exclusiva para recibir fechas de
                        subastas, catálogos anticipados e invitaciones especiales.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Su correo electrónico"
                            className="flex-1 w-full rounded-full bg-white/10 border border-white/20 placeholder:text-slate-500 text-white px-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <button className="bg-accent hover:bg-accent/90 text-slate-900 font-bold text-sm px-8 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-accent/20 whitespace-nowrap">
                            Suscribirse <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

        </main>
    );
}
