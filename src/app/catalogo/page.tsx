'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LayoutGrid, List as ListIcon } from 'lucide-react';
import FiltersSidebar, { FilterState } from '@/components/vehicles/FiltersSidebar';
import VehicleCard, { Vehicle } from '@/components/vehicles/VehicleCard';
import VehicleSkeleton from '@/components/vehicles/VehicleSkeleton';
import { fetchVehicles } from '@/api/vehicles';
import gsap from 'gsap';

function CatalogContent() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q') || '';

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
    const [displayedVehicles, setDisplayedVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
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
    const prevCountRef = useRef(0);

    // Animar SOLO las tarjetas nuevas que se agregan al grid (no re-anima las existentes)
    const animateNewCards = useCallback(() => {
        if (!containerRef.current) return;
        const allCards = Array.from(containerRef.current.children).filter(
            (el) => !el.classList.contains('skeleton-card')
        );
        const prevCount = prevCountRef.current;
        const newCards = allCards.slice(prevCount);

        if (newCards.length > 0) {
            // Las tarjetas ya inician ocultas via CSS (.vehicle-card-enter)
            // Solo necesitamos animarlas HACIA visible
            gsap.to(newCards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power3.out',
                onComplete: () => {
                    // Limpiar la clase de entrada para que las tarjetas funcionen normalmente
                    newCards.forEach(card => card.classList.remove('vehicle-card-enter'));
                },
            });
        }
        prevCountRef.current = allCards.length;
    }, []);

    // Observar cambios en displayedVehicles para animar las nuevas tarjetas
    useEffect(() => {
        if (!isLoading && !isFetchingMore && displayedVehicles.length > 0) {
            // Pequeño delay para asegurar que el DOM se actualizó
            requestAnimationFrame(() => {
                animateNewCards();
            });
        }
    }, [displayedVehicles, isLoading, isFetchingMore, animateNewCards]);

    // Reset el contador cuando cambia el viewMode o los filtros
    useEffect(() => {
        prevCountRef.current = 0;
    }, [viewMode, filters, sortBy]);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchVehicles();
                setAllVehicles(data);

                // Opcional: inicializar precios altos
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

            // Text search match from Navbar
            const searchLower = searchQuery.toLowerCase();
            const textMatch = !searchQuery ||
                v.title.toLowerCase().includes(searchLower) ||
                (v.brand?.name || '').toLowerCase().includes(searchLower) ||
                (v.model?.name || '').toLowerCase().includes(searchLower) ||
                (v.badge || '').toLowerCase().includes(searchLower);

            return brandMatch && modelMatch && priceMatch && yearMatch && textMatch;
        });

        return filtered.sort((a, b) => {
            if (sortBy === 'price_asc') return a.price - b.price;
            if (sortBy === 'price_desc') return b.price - a.price;
            // Defaults to 'recent' logic where ids/publicIds assuming descending dates, or rely on original array order if they came sorted
            return 0;
        });
    }, [allVehicles, filters, sortBy, searchQuery]);

    // Keep displayed vehicles synced when filters change
    useEffect(() => {
        setDisplayedVehicles(filteredVehicles.slice(0, page * ITEMS_PER_PAGE));
    }, [filteredVehicles, page]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && !isLoading && !isFetchingMore && displayedVehicles.length < filteredVehicles.length) {
                setIsFetchingMore(true);
                // Simular un delay artificial de 1 segundo al hacer scroll (UX)
                setTimeout(() => {
                    setPage(prev => prev + 1);
                    setIsFetchingMore(false);
                }, 1000);
            }
        }, {
            root: null,
            rootMargin: '200px',
            threshold: 0.8
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) observer.disconnect();
        };
    }, [isLoading, isFetchingMore, displayedVehicles.length, filteredVehicles.length]);

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

                        {/* Mostrar esqueletos extra solo cuando estamos cargando la siguiente página */}
                        {isFetchingMore && (
                            <>
                                {[1, 2, 3].map(i => <VehicleSkeleton key={`extra-${i}`} viewMode={viewMode} />)}
                            </>
                        )}

                        {/* Tarjeta de Publicidad (Ad placeholder) */}
                        {/* ... */}
                    </div>
                )}

                {/* Loading / Pagination Indicator */}
                {!isLoading && (
                    <div ref={loaderRef} className="mt-10 flex justify-center w-full h-32">
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

export default function CatalogoPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
                <div className="size-16 rounded-full border-4 border-gray-200 border-t-primary animate-spin"></div>
            </div>
        }>
            <CatalogContent />
        </Suspense>
    );
}
