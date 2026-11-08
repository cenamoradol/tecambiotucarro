import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { fetchVehicle, fetchVehicles, getImageUrl } from '@/api/vehicles';
import VehicleGallery from '@/components/vehicles/VehicleGallery';
import VehicleInfoPanel from '@/components/vehicles/VehicleInfoPanel';
import { generateSlug } from '@/lib/utils';

interface Props {
    params: Promise<{ id: string; slug: string }>;
}

// El HTML se cachea en el edge de Vercel (s-maxage=300, stale-while-revalidate).
// Sin esto cada visita a una ficha era una invocacion de funcion + una llamada al backend.
export const revalidate = 300;

// Prerender de las fichas mas consultadas. El resto se genera on-demand
// (dynamicParams) y tambien queda cacheado en el edge por el revalidate de arriba.
export async function generateStaticParams() {
    try {
        const vehicles = await fetchVehicles();
        return vehicles.slice(0, 40).map((v) => ({
            id: v.publicId || String(v.id),
            slug: generateSlug(v.title),
        }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    try {
        const vehicle = await fetchVehicle(resolvedParams.id);
        if (!vehicle) return { title: 'Vehículo no encontrado' };

        return {
            title: `${vehicle.title} | Te Cambio Tu Carro`,
            description: vehicle.description || `Adquiere este maravilloso ${vehicle.title} del año ${vehicle.year} en Te Cambio Tu Carro.`,
            openGraph: {
                images: [{ url: getImageUrl(vehicle) }],
            }
        };
    } catch (error) {
        return { title: 'Vehículo | Te Cambio Tu Carro' };
    }
}

export default async function VehicleDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const publicId = resolvedParams.id; // It's string now, representing backend's publicId

    let vehicle;
    try {
        vehicle = await fetchVehicle(publicId);
    } catch (e) {
        notFound();
    }

    if (!vehicle) {
        notFound();
    }

    // Adaptar imágenes para la galería
    const images: string[] = vehicle.media && vehicle.media.length > 0
        ? vehicle.media.sort((a, b) => (b.isCover ? 1 : 0) - (a.isCover ? 1 : 0)).map((m: any) => m.url)
        : [getImageUrl(vehicle)]; // Fallback en caso de string image

    return (
        <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
            <div className="pt-5 lg:pt-5 mb-6">
                <Link href={vehicle.isClearance ? "/en-remate" : "/catalogo"} className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-bold text-sm bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-sm w-fit">
                    <ChevronLeft className="w-5 h-5" />
                    Volver a Catálogo
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                <VehicleGallery images={images} />
                <VehicleInfoPanel vehicle={vehicle} />
            </div>
        </main>
    );
}
