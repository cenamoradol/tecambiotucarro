import { API_BASE, STORE_ID } from "./vehicles";
import { Vehicle } from "@/components/vehicles/VehicleCard";

export type EventMedia = {
    id: string;
    url: string;
    isCover: boolean;
    position: number;
};

export type EventVehicle = {
    vehicle: Vehicle;
};

export type Event = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    date?: string;
    createdAt: string;
    media: EventMedia[];
    vehicles: EventVehicle[];
};

export async function fetchCategoryEvents(categorySlug: string): Promise<Event[]> {
    if (!STORE_ID) throw new Error('Store ID no configurado');
    const res = await fetch(`${API_BASE}/public/id/${STORE_ID}/event-categories/${categorySlug}/events`, {
        next: { revalidate: 60 } // Revalidar cada minuto
    });

    if (!res.ok) throw new Error(`Error cargando eventos para ${categorySlug}`);
    const data = await res.json();
    return data.events || [];
}
