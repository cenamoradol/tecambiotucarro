import { getServicesListing, getServiceCategories } from "@/api/services";
import type { Metadata } from "next";
import { ServiceExplorer } from "@/components/services/ServiceExplorer";
import ContactButtonTracker from "@/components/services/ContactButtonTracker";
import { Briefcase, Gem, Zap, Shield, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Directorio de Emprendedores | Auto Lote",
  description: "Encuentra profesionales de confianza en mecánica, detallado, accesorios y más.",
};

export default async function ServiciosPage(props: {
  searchParams: Promise<{ category?: string }>
}) {
  const searchParams = await props.searchParams;
  const currentCategory = searchParams.category;

  // Fetch all services (filtering is now client-side)
  const [servicios, categories] = await Promise.all([
    getServicesListing(),
    getServiceCategories()
  ]);

  return (
    <div className="bg-[#fcfcfd] min-h-screen pb-24">
      {/* Hero Section — Compact */}


      {/* Dynamic Content Explorer — Sidebar Layout */}
      <ServiceExplorer
        initialServices={servicios}
        categories={categories}
        currentCategory={currentCategory}
      />

      {/* Modern Newsletter/CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="bg-background-dark rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl" />
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
            ¿Eres dueño de un negocio?
          </h2>
          <p className="text-white text-lg mb-10 max-w-xl mx-auto relative z-10 font-medium">
            Únete a nuestro directorio comercial y llega a miles de clientes potenciales que buscan lo que tú ofreces.
          </p>
          <ContactButtonTracker
            href="https://wa.me/50496458661"
            target="_blank"
            className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all hover:scale-105 relative z-10 shadow-xl"
          >
            Contactanos
          </ContactButtonTracker>
        </div>
      </div>
    </div>
  );
}
