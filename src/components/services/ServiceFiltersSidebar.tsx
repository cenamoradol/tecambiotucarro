"use client";

import React from "react";
import { Filter, ChevronDown, Search, X, Tag, Layers } from "lucide-react";
import { ServiceCategory } from "@/api/services";

export interface ServiceFilterState {
  category: string;
  searchTerm: string;
}

interface ServiceFiltersSidebarProps {
  filters: ServiceFilterState;
  setFilters: React.Dispatch<React.SetStateAction<ServiceFilterState>>;
  categories: ServiceCategory[];
  resultCount: number;
  totalCount: number;
}

export function ServiceFiltersSidebar({
  filters,
  setFilters,
  categories,
  resultCount,
  totalCount,
}: ServiceFiltersSidebarProps) {
  const handleClear = () => {
    setFilters({ category: "", searchTerm: "" });
  };

  const activeFiltersCount = [filters.category, filters.searchTerm].filter(Boolean).length;

  return (
    <aside className="hidden lg:block w-[280px] shrink-0">
      <div className="sticky top-28 flex flex-col gap-6">
        {/* Main Filter Card */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="ml-1 text-[10px] font-black bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </h2>
            <button
              onClick={handleClear}
              className="text-xs font-bold text-slate-400 hover:text-primary transition-colors"
            >
              Borrar todo
            </button>
          </div>

          {/* Search */}
          <div className="space-y-3 mb-6">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              Buscar
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Nombre o servicio..."
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
                }
                className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 rounded-xl py-3 pl-4 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all placeholder:text-slate-400"
              />
              {filters.searchTerm && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, searchTerm: "" }))}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-6" />

          {/* Category */}
          <div className="space-y-3 mb-2">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              Categoría
            </h3>
            <div className="relative">
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 rounded-xl py-3 pl-4 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none cursor-pointer transition-all"
              >
                <option value="">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Summary Card */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-xl -ml-6 -mb-6" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 opacity-80" />
              <span className="text-xs font-black uppercase tracking-wider opacity-80">Resultados</span>
            </div>
            <p className="text-3xl font-black">{resultCount}</p>
            <p className="text-blue-100/70 text-xs font-bold mt-1">
              de {totalCount} servicios disponibles
            </p>
          </div>
        </div>


      </div>
    </aside>
  );
}
