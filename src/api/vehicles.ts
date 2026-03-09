import { Vehicle } from '@/components/vehicles/VehicleCard';

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID || '';

export async function fetchVehicles(): Promise<Vehicle[]> {
    if (!STORE_ID) throw new Error('Store ID no configurado');
    const res = await fetch(`${API_BASE}/public/id/${STORE_ID}/vehicles`, {
        // Cache revalidation or options if necessary, for now nextjs default or no-store
        next: { revalidate: 60 } // Revalidar cada minuto
    });

    if (!res.ok) throw new Error('Error cargando vehículos');
    const data = await res.json();
    return data.vehicles || []; // El backend devuelve { store, vehicles }
}

export async function fetchVehicle(publicId: string): Promise<Vehicle> {
    if (!STORE_ID) throw new Error('Store ID no configurado');
    const res = await fetch(`${API_BASE}/public/id/${STORE_ID}/vehicles/${publicId}`, {
        next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error('Vehículo no encontrado');
    const data = await res.json();
    return data.vehicle;
}

export function formatPrice(value: number | string, symbol = 'L', currency = 'HNL') {
    if (value === undefined || value === null) return '-';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '-';
    return `${symbol} ${num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function getImageUrl(vehicle: any): string {
    if (!vehicle.media || vehicle.media.length === 0) return '/vehicle-placeholder.jpg';
    const cover = vehicle.media.find((m: any) => m.isCover);
    return cover ? cover.url : vehicle.media[0].url;
}

export function timeAgo(dateStr: string | Date) {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHrs < 24) return `${diffHrs}h`;
    if (diffDays < 30) return `${diffDays}d`;
    return `${Math.floor(diffDays / 30)}mes`;
}
