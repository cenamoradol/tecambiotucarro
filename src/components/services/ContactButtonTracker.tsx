'use client';

import React from 'react';

interface ContactButtonTrackerProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
}

/**
 * Client component to track clicks on the "Contactanos" button
 * Sends a custom event to Google Tag Manager layer
 */
export default function ContactButtonTracker({ children, className, href, target }: ContactButtonTrackerProps) {
  const handleTrackerClick = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'contact_click',
        button_location: 'servicios_cta',
        action: 'whatsapp_contact'
      });
    }
  };

  return (
    <a 
      href={href} 
      target={target} 
      className={className}
      onClick={handleTrackerClick}
    >
      {children}
    </a>
  );
}
