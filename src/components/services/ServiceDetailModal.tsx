"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Phone, Mail, MapPin, Share2, MessageCircle } from "lucide-react";
import { ServiceListing } from "@/api/services";
import { gsap } from "gsap";

interface Props {
  service: ServiceListing;
  onClose: () => void;
}

export function ServiceDetailModal({ service, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    tl.fromTo(
      modalRef.current,
      { y: 100, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" },
      "-=0.2"
    );

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 100, opacity: 0, scale: 0.95, duration: 0.3, ease: "power4.in" });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-10">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] sm:max-h-[90vh]"
      >
        {/* Close Button Floating (Mobile & Tablet) */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-3 bg-white/90 hover:bg-white text-slate-900 rounded-full shadow-lg transition-all md:hidden"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left: Image Section */}
        <div className="w-full md:w-1/2 min-h-[300px] md:min-h-full relative bg-slate-100 flex-shrink-0">
          {service.media && service.media.length > 0 ? (
            <Image
              src={service.media[0].url}
              alt={service.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-slate-300 bg-slate-50">
              <span className="material-symbols-outlined text-8xl">storefront</span>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-6 left-6">
            <span className="bg-primary text-white text-[10px] uppercase tracking-widest font-black px-5 py-2 rounded-full shadow-lg">
              {service.category?.name || service.serviceType}
            </span>
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="w-full md:w-1/2 flex flex-col p-6 sm:p-10 md:p-12 overflow-y-auto no-scrollbar bg-white">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {service.name}
            </h2>
            <button
              onClick={handleClose}
              className="hidden md:flex p-2 bg-slate-100 text-slate-500 hover:text-slate-900 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-slate-500 text-base sm:text-lg mb-8 font-medium leading-relaxed">
            {service.description || "Este emprendedor aún no ha agregado una descripción detallada de sus servicios."}
          </p>

          {/* Contact Details Grid */}
          <div className="space-y-3 sm:space-y-4 mb-10">
            {service.phone && (
              <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-3 bg-primary/10 text-primary rounded-xl mr-4 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Teléfono</p>
                  <a href={`tel:${service.phone}`} className="text-slate-900 font-bold hover:text-primary transition-colors truncate block">
                    {service.phone}
                  </a>
                </div>
              </div>
            )}

            {service.email && (
              <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl mr-4 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Correo Electrónico</p>
                  <a href={`mailto:${service.email}`} className="text-slate-900 font-bold hover:text-primary transition-colors truncate block">
                    {service.email}
                  </a>
                </div>
              </div>
            )}

            {service.address && (
              <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-3 bg-green-500/10 text-green-500 rounded-xl mr-4 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Ubicación</p>
                  <p className="text-slate-900 font-bold leading-tight">
                    {service.address}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-slate-100 pb-4 md:pb-0">
            <a
              href={`https://wa.me/${service.phone?.replace(/[^0-9]/g, "")}`}
              target="_blank"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-2xl font-black text-[11px] sm:text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-green-500/20"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: service.name,
                    text: service.description || "",
                    url: window.location.href,
                  });
                }
              }}
              className="flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-black text-[11px] sm:text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
