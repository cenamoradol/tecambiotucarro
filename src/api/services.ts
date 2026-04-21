export type ServiceMedia = {
  id: string;
  kind: "IMAGE" | "VIDEO";
  url: string;
  isCover?: boolean;
  position?: number;
};

export type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
};

export type ServiceListing = {
  id: string;
  storeId: string;
  name: string;
  serviceType: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  description?: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  media?: ServiceMedia[];
  category?: ServiceCategory;
};

export async function getServicesListing(categorySlug?: string | null): Promise<ServiceListing[]> {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!storeId || !baseUrl) return [];

  try {
    const url = new URL(`${baseUrl}/public/id/${storeId}/services`);
    if (categorySlug) url.searchParams.append("category", categorySlug);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.services || [];
  } catch (e) {
    console.error("Error fetching services", e);
    return [];
  }
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!storeId || !baseUrl) return [];

  try {
    const res = await fetch(`${baseUrl}/public/id/${storeId}/service-categories`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Error fetching service categories", e);
    return [];
  }
}
