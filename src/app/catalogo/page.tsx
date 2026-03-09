'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LayoutGrid, List as ListIcon } from 'lucide-react';
import FiltersSidebar, { FilterState } from '@/components/vehicles/FiltersSidebar';
import VehicleCard, { Vehicle } from '@/components/vehicles/VehicleCard';
import VehicleSkeleton from '@/components/vehicles/VehicleSkeleton';
import { fetchVehicles } from '@/api/vehicles';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function CatalogoPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
    const [displayedVehicles, setDisplayedVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    const [filters, setFilters] = useState<FilterState>({
        brand: '',
        model: '',
        maxPrice: 2000000,
        minYear: 2000
    });

    type SortOption = 'recent' | 'price_asc' | 'price_desc';
    const [sortBy, setSortBy] = useState<SortOption>('recent');

    const ITEMS_PER_PAGE = 9;
    const loaderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (containerRef.current && containerRef.current.children.length > 0) {
            gsap.fromTo(containerRef.current.children,
                { opacity: 0, scale: 0.97, y: 15 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out', overwrite: 'auto' }
            );
        }
    }, { dependencies: [viewMode, displayedVehicles], scope: containerRef });

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchVehicles();
                setAllVehicles(data);

                // Initialize highest price dynamically for the filter slider if data exists
                if (data.length > 0) {
                    const maxP = Math.max(...data.map((v: Vehicle) => v.price));
                    setFilters(prev => ({ ...prev, maxPrice: maxP }));
                }
            } catch (error) {
                console.error("Error loading vehicles", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadInitialData();
    }, []);

    // Extract brands and models from the data
    const availableBrands = useMemo(() => Array.from(new Set(allVehicles.map(v => v.brand?.name).filter(Boolean))).sort() as string[], [allVehicles]);
    const availableModels = useMemo(() => {
        if (!filters.brand) return [];
        return Array.from(new Set(
            allVehicles
                .filter(v => v.brand?.name === filters.brand)
                .map(v => v.model?.name)
                .filter(Boolean)
        )).sort() as string[];
    }, [allVehicles, filters.brand]);

    // Compute the filtered list
    const filteredVehicles = useMemo(() => {
        const filtered = allVehicles.filter(v => {
            const brandMatch = !filters.brand || v.brand?.name === filters.brand;
            const modelMatch = !filters.model || v.model?.name === filters.model;
            const priceMatch = v.price <= filters.maxPrice;
            const yearMatch = v.year >= filters.minYear;
            return brandMatch && modelMatch && priceMatch && yearMatch;
        });

        return filtered.sort((a, b) => {
            if (sortBy === 'price_asc') return a.price - b.price;
            if (sortBy === 'price_desc') return b.price - a.price;
            // Defaults to 'recent' logic where ids/publicIds assuming descending dates, or rely on original array order if they came sorted
            return 0;
        });
    }, [allVehicles, filters, sortBy]);

    // Keep displayed vehicles synced when filters change
    useEffect(() => {
        setDisplayedVehicles(filteredVehicles.slice(0, page * ITEMS_PER_PAGE));
    }, [filteredVehicles, page]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && !isLoading && displayedVehicles.length < filteredVehicles.length) {
                setTimeout(() => {
                    setPage(prev => prev + 1);
                }, 400);
            }
        }, {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) observer.disconnect();
        };
    }, [isLoading, displayedVehicles.length, filteredVehicles]);

    const hasMore = displayedVehicles.length < filteredVehicles.length;
    const maxGlobalPrice = allVehicles.length > 0 ? Math.max(...allVehicles.map(v => v.price)) : 2000000;

    return (
        <main className="max-w-[1600px] w-full mx-auto p-6 md:p-10 flex gap-8 min-h-screen pt-28">
            {/* Sidebar de filtros */}
            <FiltersSidebar
                filters={filters}
                setFilters={setFilters}
                availableBrands={availableBrands}
                availableModels={availableModels}
                maxPriceLimit={maxGlobalPrice}
            />

            {/* Contenido Principal */}
            <div className="flex-1 min-w-0">

                {/* Cabecera de resultados */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-text-main mb-1">Vehículos en venta</h2>
                        <p className="text-sm text-text-muted">
                            {isLoading ? 'Cargando...' : `Mostrando ${displayedVehicles.length} de ${filteredVehicles.length} resultados`}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">

                        {/* Toggle de vista */}
                        <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border border-slate-200 dark:border-slate-700">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`flex items-center justify-center size-9 rounded-md transition-all shadow-sm ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-muted hover:text-primary'}`}
                                title="Vista de Cuadrícula"
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`flex items-center justify-center size-9 rounded-md transition-all shadow-sm ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-muted hover:text-primary'}`}
                                title="Vista de Lista"
                            >
                                <ListIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Opciones de ordenamiento */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-text-muted hidden sm:inline">Ordenar por:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="bg-surface border border-slate-200 dark:border-slate-700 text-sm font-bold text-text-main rounded-lg py-2 pl-3 pr-8 shadow-sm focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
                            >
                                <option value="recent">Más recientes</option>
                                <option value="price_asc">Precio: Menor a Mayor</option>
                                <option value="price_desc">Precio: Mayor a Menor</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid / List de vehículos */}
                {isLoading ? (
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' : 'grid-cols-1'}`}>
                        {[1, 2, 3, 4, 5, 6].map(i => <VehicleSkeleton key={i} viewMode={viewMode} />)}
                    </div>
                ) : (
                    <div
                        ref={containerRef}
                        className={`grid gap-6 transition-all duration-300 ${viewMode === 'grid'
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                            : 'grid-cols-1 view-list w-full'
                            }`}
                    >
                        {displayedVehicles.map((vehicle: Vehicle) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} viewMode={viewMode} />
                        ))}

                        {/* Tarjeta de Publicidad (Ad placeholder) */}
                        <article className="relative aspect-story bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col justify-center items-center text-center p-6">
                            <div className="absolute top-4 left-4">
                                <span className="bg-gray-100 dark:bg-slate-800 text-text-muted text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                                    Anuncio
                                </span>
                            </div>
                            <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-4xl text-gray-300">ads_click</span>
                            </div>
                            <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">Publicidad Aquí</h3>
                            <p className="text-sm text-text-muted mb-6">Llega a miles de compradores hondureños.</p>
                            <button className="text-primary font-bold text-sm hover:underline">Más información</button>
                        </article>
                    </div>
                )}

                {/* Loading / Pagination Indicator */}
                {!isLoading && (
                    <div ref={loaderRef} className="py-12 flex justify-center w-full h-32">
                        {hasMore ? (
                            <div className="group flex flex-col items-center gap-3 opacity-80">
                                <div className="size-12 rounded-full border-4 border-gray-200 border-t-primary animate-spin"></div>
                                <span className="text-sm font-bold text-text-muted">Cargando más vehículos...</span>
                            </div>
                        ) : (
                            <span className="text-sm font-bold text-text-muted">Has llegado al final del catálogo.</span>
                        )}
                    </div>
                )}

            </div>
        </main>
    );
}
