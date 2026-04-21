"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { ServiceCategory } from "@/api/services";

interface Props {
  categories: ServiceCategory[];
  currentCategory?: string;
  onSearch: (term: string) => void;
}

export function ServiceFilters({ categories, currentCategory, onSearch }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLAnchorElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Sync indicator with active tab
  useEffect(() => {
    if (activeTabRef.current && indicatorRef.current) {
      const { offsetLeft, offsetWidth } = activeTabRef.current;
      gsap.to(indicatorRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.4,
        ease: "power3.out"
      });
    }
  }, [currentCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This is for visual/real-time filter in parent if we wanted, 
    // but here we can just update the URL if needed or let the parent handle it.
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="sticky top-20 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-y border-slate-200 dark:border-slate-800 py-4 mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Search Bar */}
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre o servicio..."
            className="block w-full pl-11 pr-12 py-3 bg-slate-100 dark:bg-slate-800/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white placeholder-slate-400 transition-all outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch(e.target.value);
            }}
          />
          {search && (
            <button 
              onClick={() => {
                clearSearch();
                onSearch("");
              }}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-2 relative"
          >
            {/* Sliding Indicator Background */}
            <div 
              ref={indicatorRef}
              className="absolute h-10 bg-blue-600 dark:bg-blue-500 rounded-full z-0 top-0 shadow-lg shadow-blue-500/20"
              style={{ width: 0 }}
            />

            <a
              href="/servicios"
              ref={!currentCategory ? activeTabRef : null}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors duration-300 ${
                !currentCategory ? "text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Todos los Servicios
            </a>

            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/servicios?category=${cat.slug}`}
                ref={currentCategory === cat.slug ? activeTabRef : null}
                className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors duration-300 ${
                  currentCategory === cat.slug ? "text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
