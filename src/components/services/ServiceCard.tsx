"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import { ServiceListing } from "@/api/services";

interface Props {
  service: ServiceListing;
  onSelect?: (service: ServiceListing) => void;
}

export function ServiceCard({ service, onSelect }: Props) {
  return (
    <div 
      className="group relative bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
      onClick={() => onSelect?.(service)}
    >
      {/* Background Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700" />
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden bg-slate-100 mb-6">
        {service.media && service.media.length > 0 ? (
          <Image
            src={service.media[0].url}
            alt={service.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-slate-300">
            <span className="material-symbols-outlined text-6xl">storefront</span>
          </div>
        )}
        
        {/* Category Badge - Floating */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] uppercase tracking-widest font-black px-4 py-1.5 rounded-full shadow-sm">
            {service.category?.name || service.serviceType}
          </span>
        </div>
      </div>

      <div className="px-2 pb-2">
        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed h-[40px]">
          {service.description || "Sin descripción disponible."}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {service.phone && (
            <div className="flex items-center text-sm font-medium text-slate-600 group/item">
              <div className="p-2 bg-primary/10 rounded-lg mr-3 group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                <Phone className="h-4 w-4" />
              </div>
              <a href={`tel:${service.phone}`} className="hover:text-primary transition-colors">
                {service.phone}
              </a>
            </div>
          )}
          
          {service.address && (
            <div className="flex items-start text-sm font-medium text-slate-600 group/item">
              <div className="p-2 bg-slate-50 rounded-lg mr-3 group-hover/item:bg-primary group-hover/item:text-white transition-colors mt-0.5">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="line-clamp-1">{service.address}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button className="w-full py-3.5 bg-background-dark text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 group/btn hover:bg-primary transition-all duration-300">
          Ver Detalles
          <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
