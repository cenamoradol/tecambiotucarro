import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getImageUrl, formatPrice } from '@/api/vehicles';

export interface Vehicle {
    id: string | number;
    publicId?: string;
    title: string;
    description?: string;
    transmission?: string;
    fuelType?: string;
    year: number;
    mileage: number;
    price: number;
    offerPrice?: number | null;
    currency?: string;
    location?: string;
    image?: string;
    media?: any[];
    branch?: any;
    brand?: { id: string; name: string };
    model?: { id: string; name: string };
    colorRef?: { id: string; name: string };
    vehicleType?: { id: string; name: string };
    badge?: string;
    status?: string | 'AVAILABLE' | 'SOLD' | 'RESERVED';
    isClearance?: boolean;
    engineSize?: number;
}

interface VehicleCardProps {
    vehicle: Vehicle;
    viewMode?: 'grid' | 'list';
    currencySymbol?: string;
}

export default function VehicleCard({ vehicle, viewMode = 'grid', currencySymbol = 'L' }: VehicleCardProps) {
    const displayImage = vehicle.image || getImageUrl(vehicle);
    const displayLocation = vehicle.branch?.name || vehicle.location || 'Honduras';
    const routeId = vehicle.publicId || vehicle.id;
    const generateSlug = (text: string) => {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    };
    const slug = generateSlug(vehicle.title);

    return (
        <Link href={`/vehiculos/${routeId}/${slug}`} className="block w-full vehicle-card-enter">
            <article className={cn(
                "group relative bg-surface rounded-xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 cursor-pointer w-full",
                viewMode === 'grid' ? "aspect-story" : "flex flex-col sm:flex-row h-auto sm:h-56 md:h-64 gap-0"
            )}>
                {/* Image Container */}
                <div className={cn(
                    "relative",
                    viewMode === 'grid' ? "absolute inset-0 w-full h-full" : "w-full aspect-[4/3] sm:aspect-auto sm:w-1/3 sm:h-full shrink-0"
                )}>
                    <Image
                        src={displayImage}
                        alt={vehicle.title}
                        fill
                        className={cn(
                            "object-cover transition-transform duration-700 group-hover:scale-105",
                            vehicle.status === 'SOLD' && "grayscale-[0.5] opacity-80"
                        )}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Sold Overlay */}
                    {vehicle.status === 'SOLD' && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                            <div className="relative w-full h-full p-8 flex items-center justify-center">
                                <div className="relative w-full h-full max-w-[300px] max-h-[300px]">
                                    <Image
                                        src="/vendido.webp"
                                        alt="Vendido"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Gradient overlay for grid view */}
                {viewMode === 'grid' && (
                    <div className="absolute inset-0 glass-card-overlay"></div>
                )}

                <div className={cn(
                    "top-badges absolute top-4 left-4 right-4 flex justify-between items-start z-20",
                    viewMode === 'list' && "right-auto"
                )}>
                    {vehicle.badge || vehicle.offerPrice ? (
                        <span className="bg-secondary text-text-main text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
                            {vehicle.badge || 'Oferta'}
                        </span>
                    ) : <div></div>}


                </div>

                <div className={cn(
                    "bottom-content z-10 flex flex-col justify-between",
                    viewMode === 'grid'
                        ? "absolute bottom-0 left-0 right-0 p-5"
                        : "flex-1 p-6 bg-white"
                )}>
                    <div>
                        <h3 className={cn(
                            "font-bold leading-tight drop-shadow-sm",
                            viewMode === 'grid' ? "text-white text-xl" : "text-text-main text-xl mb-2"
                        )}>
                            {vehicle.title}
                        </h3>
                        <p className={cn(
                            "text-sm font-medium mt-1",
                            viewMode === 'grid' ? "text-gray-300" : "text-text-muted"
                        )}>
                            {vehicle.year || '-'} • {vehicle.mileage ? vehicle.mileage.toLocaleString('es-HN') : '0'} km
                        </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div className={cn(
                            "price-badge rounded-lg",
                            viewMode === 'grid'
                                ? "bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5"
                                : "bg-background-light border-none px-4 py-2"
                        )}>
                            <span className={cn(
                                "font-bold text-lg tracking-wide font-mono",
                                viewMode === 'grid' ? "text-secondary" : "text-primary"
                            )}>
                                {formatPrice(vehicle.price, currencySymbol)}
                            </span>
                        </div>
                        <span className={cn(
                            "location-badge text-xs flex items-center gap-1 rounded",
                            viewMode === 'grid'
                                ? "text-white/80 bg-black/20 px-2 py-1"
                                : "text-text-muted bg-background-light px-3 py-1.5"
                        )}>
                            <MapPin className="w-3 h-3" /> {displayLocation}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
