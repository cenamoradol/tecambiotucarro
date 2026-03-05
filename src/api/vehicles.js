const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const STORE_ID = import.meta.env.VITE_STORE_ID || '';

export async function fetchVehicles() {
    const res = await fetch(`${API_BASE}/public/id/${STORE_ID}/vehicles`);
    if (!res.ok) throw new Error('Error cargando vehículos');
    const data = await res.json();
    return data;
}

export async function fetchVehicle(publicId) {
    const res = await fetch(`${API_BASE}/public/id/${STORE_ID}/vehicles/${publicId}`);
    if (!res.ok) throw new Error('Vehículo no encontrado');
    const data = await res.json();
    return data;
}

export function formatPrice(value, symbol = 'L', currency = 'HNL') {
    if (!value && value !== 0) return '-';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '-';
    return `${symbol} ${num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function getImageUrl(vehicle) {
    if (!vehicle.media || vehicle.media.length === 0) return null;
    const cover = vehicle.media.find(m => m.isCover);
    return cover ? cover.url : vehicle.media[0].url;
}

export function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHrs < 24) return `${diffHrs}h`;
    if (diffDays < 30) return `${diffDays}d`;
    return `${Math.floor(diffDays / 30)}mes`;
}
