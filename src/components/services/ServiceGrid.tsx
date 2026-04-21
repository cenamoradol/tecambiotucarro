"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ServiceListing } from "@/api/services";
import { ServiceCard } from "./ServiceCard";

interface Props {
  services: ServiceListing[];
}

export function ServiceGrid({ services }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && services.length > 0) {
      const cards = containerRef.current.querySelectorAll(".service-card-wrapper");
      
      // Initial state
      gsap.set(cards, { y: 30, opacity: 0 });
      
      // Animation
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      });
    }
  }, [services]);

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {services.map((srv) => (
        <div key={srv.id} className="service-card-wrapper">
          <ServiceCard service={srv} />
        </div>
      ))}
    </div>
  );
}
