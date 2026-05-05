"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { ServiceListing, ServiceCategory } from "@/api/services";
import { ServiceFiltersSidebar, ServiceFilterState } from "./ServiceFiltersSidebar";
import { ServiceCard } from "./ServiceCard";
import { ServiceDetailModal } from "./ServiceDetailModal";
import { Briefcase, Search, X, SlidersHorizontal, ChevronDown, Layers } from "lucide-react";
import { gsap } from "gsap";

interface Props {
  initialServices: ServiceListing[];
  categories: ServiceCategory[];
  currentCategory?: string;
}

export function ServiceExplorer({ initialServices, categories, currentCategory }: Props) {
  const [filters, setFilters] = useState<ServiceFilterState>({
    category: currentCategory || "",
    searchTerm: "",
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceListing | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const prevFilterRef = useRef<string>("");

  const filteredServices = useMemo(() => {
    let result = initialServices;

    // Category filter
    if (filters.category) {
      result = result.filter(
        (s) => s.category?.slug === filters.category
      );
    }

    // Search filter
    if (filters.searchTerm) {
      const lowerTerm = filters.searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(lowerTerm) ||
          s.description?.toLowerCase().includes(lowerTerm) ||
          s.serviceType?.toLowerCase().includes(lowerTerm) ||
          s.category?.name?.toLowerCase().includes(lowerTerm)
      );
    }

    return result;
  }, [filters, initialServices]);

  // Animate cards on filter change
  const animateCards = useCallback(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".service-card-wrapper");
    if (cards.length === 0) return;

    gsap.set(cards, { y: 24, opacity: 0, scale: 0.97 });
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.06,
      ease: "power3.out",
      delay: 0.1,
    });
  }, []);

  // Re-animate when filters change
  useEffect(() => {
    const filterKey = `${filters.category}|${filters.searchTerm}`;
    if (filterKey !== prevFilterRef.current) {
      prevFilterRef.current = filterKey;
      requestAnimationFrame(() => animateCards());
    }
  }, [filteredServices, animateCards, filters]);

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-10 flex gap-8">
      {/* Desktop Sidebar */}
      <ServiceFiltersSidebar
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        resultCount={filteredServices.length}
        totalCount={initialServices.length}
      />

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white p-4 rounded-2xl shadow-lg shadow-primary/30 transition-all hover:scale-105"
        >
          <SlidersHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                Filtros
              </h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search */}
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
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white rounded-xl py-3 pl-4 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all placeholder:text-slate-400"
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

            {/* Mobile Category */}
            <div className="space-y-3 mb-8">
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
                  className="w-full appearance-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white rounded-xl py-3 pl-4 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none cursor-pointer transition-all"
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

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl text-sm transition-colors"
            >
              Ver {filteredServices.length} resultados
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Directorio de Emprendedores
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Mostrando {filteredServices.length} de {initialServices.length} servicios
            </p>
          </div>
        </div>

        {/* Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {filters.searchTerm ? "No hay coincidencias" : "Sin resultados"}
            </h3>
            <p className="text-slate-500 mt-3 max-w-md mx-auto font-medium">
              {filters.searchTerm
                ? `No encontramos resultados para "${filters.searchTerm}". Prueba con otros términos.`
                : `No encontramos servicios${filters.category ? " en esta categoría" : ""} por el momento.`}
            </p>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredServices.map((srv) => (
              <div key={srv.id} className="service-card-wrapper">
                <ServiceCard 
                  service={srv} 
                  onSelect={(s) => setSelectedService(s)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedService && (
          <ServiceDetailModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </div>
    </div>
  );
}
