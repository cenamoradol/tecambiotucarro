import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

export interface FilterState {
    brand: string;
    model: string;
    maxPrice: number;
    minYear: number;
}

interface FiltersSidebarProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    availableBrands: string[];
    availableModels: string[];
    maxPriceLimit: number;
}

export default function FiltersSidebar({ filters, setFilters, availableBrands, availableModels, maxPriceLimit }: FiltersSidebarProps) {
    const handleClear = () => {
        setFilters({
            brand: '',
            model: '',
            maxPrice: maxPriceLimit,
            minYear: 2000
        });
    };

    return (
        <aside className="hidden lg:block w-[280px] shrink-0">
            <div className="sticky top-28 flex flex-col gap-6">
                <div className="bg-surface rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Filter className="w-5 h-5 text-primary" />
                            Filtros
                        </h2>
                        <button
                            onClick={handleClear}
                            className="text-xs font-bold text-text-muted hover:text-primary transition-colors"
                        >
                            Borrar todo
                        </button>
                    </div>

                    {/* Marca */}
                    <div className="space-y-4 mb-6">
                        <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Marca</h3>
                        <div className="relative">
                            <select
                                value={filters.brand}
                                onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value, model: '' }))}
                                className="w-full appearance-none bg-background-light border border-gray-200 text-sm font-bold text-text-main rounded-lg py-3 pl-4 pr-10 shadow-sm focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
                            >
                                <option value="">Todas las marcas</option>
                                {availableBrands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                        </div>
                    </div>

                    {/* Modelo */}
                    <div className="space-y-4 mb-8">
                        <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Modelo</h3>
                        <div className="relative">
                            <select
                                value={filters.model}
                                onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
                                disabled={!filters.brand}
                                className="w-full appearance-none bg-background-light border border-gray-200 disabled:opacity-50 text-sm font-bold text-text-main rounded-lg py-3 pl-4 pr-10 shadow-sm focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
                            >
                                <option value="">Todos los modelos</option>
                                {availableModels.map(model => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                        </div>
                    </div>

                    {/* Precio */}
                    <div className="space-y-4 mb-8">
                        <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Precio Máximo</h3>
                        <div className="flex items-center justify-between text-sm font-bold text-text-main mb-2">
                            <span>L 0</span>
                            <span>L {filters.maxPrice < 1000000 ? `${(filters.maxPrice / 1000).toFixed(0)}k` : `${(filters.maxPrice / 1000000).toFixed(1)}M`}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max={maxPriceLimit}
                            step="50000"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    {/* Año */}
                    <div className="space-y-4 mb-2">
                        <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Año Mínimo</h3>
                        <div className="flex items-center justify-between text-sm font-bold text-text-main mb-2">
                            <span>2000</span>
                            <span>{filters.minYear}</span>
                        </div>
                        <input
                            type="range"
                            min="2000"
                            max={new Date().getFullYear()}
                            value={filters.minYear}
                            onChange={(e) => setFilters(prev => ({ ...prev, minYear: Number(e.target.value) }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>

                {/* Banner Vender Auto */}
                {/* <div className="bg-gradient-to-br from-background-dark to-black rounded-xl p-6 text-white relative overflow-hidden mt-4">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <h3 className="font-bold text-lg mb-2 relative z-10">¿Vendes tu auto?</h3>
                    <p className="text-sm text-gray-300 mb-4 relative z-10">Publícalo hoy y recibe ofertas al instante.</p>
                    <button className="w-full py-2 bg-primary text-background-dark font-bold rounded-lg text-sm hover:bg-white transition-colors relative z-10">Vender Ahora</button>
                </div> */}
            </div>
        </aside>
    );
}
