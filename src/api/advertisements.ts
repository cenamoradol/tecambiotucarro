export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID || '';

export interface PublicAdvertisement {
    id: string;
    title: string | null;
    kind: "IMAGE" | "VIDEO";
    imageUrl: string;
    targetUrl: string | null;
    placement: "HERO" | "VEHICLE_LIST" | "FLOATING_BOTTOM";
    weight: number;
}

export async function fetchAdvertisements(): Promise<PublicAdvertisement[]> {
    if (!STORE_ID) return [];
    
    try {
        const res = await fetch(`${API_BASE}/public/id/${STORE_ID}/advertisements`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) return [];
        const data = await res.json();
        return data.advertisements || [];
    } catch (error) {
        console.error("Error fetching ads", error);
        return [];
    }
}

export async function trackAdImpression(adId: string): Promise<void> {
    try {
        await fetch(`${API_BASE}/public/advertisements/${adId}/impression`, {
            method: 'POST',
        });
    } catch (error) {
        console.error("Error tracking ad impression", error);
    }
}

export async function trackAdClick(adId: string): Promise<void> {
    try {
        await fetch(`${API_BASE}/public/advertisements/${adId}/click`, {
            method: 'POST',
        });
    } catch (error) {
        console.error("Error tracking ad click", error);
    }
}
