import React, { Suspense } from 'react';
import SubastasContent from './SubastasContent';
import { fetchCategoryEvents, Event } from '@/api/events';

export const revalidate = 60; // Revalida cada minuto

export const metadata = {
    robots: {
        index: false,
        follow: true,
    },
};

export default async function SubastasPage() {
    // Buscamos directamente la categoría llamada 'subastas'
    let events: Event[] = [];
    try {
        events = await fetchCategoryEvents('subastas');
    } catch (e) {
        console.error("No se pudieron cargar las subastas", e);
    }

    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
                <div className="size-16 rounded-full border-4 border-gray-200 border-t-primary animate-spin"></div>
            </div>
        }>
            <SubastasContent initialEvents={events} />
        </Suspense>
    );
}
