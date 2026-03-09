import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchVehicle, getImageUrl } from '@/api/vehicles';
import VehicleGallery from '@/components/vehicles/VehicleGallery';
import VehicleInfoPanel from '@/components/vehicles/VehicleInfoPanel';

interface Props {
    params: Promise<{ id: string; slug: string }>;
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
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 pt-28">
                <VehicleGallery images={images} />
                <VehicleInfoPanel vehicle={vehicle} />
            </div>
        </main>
    );
}
