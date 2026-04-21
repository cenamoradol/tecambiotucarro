import React from 'react';
import HeroSection, { HeroSlide } from '@/components/home/HeroSection';
import SideNavigation from '@/components/home/SideNavigation';
import AboutSection from '@/components/home/AboutSection';
import MissionVisionSection from '@/components/home/MissionVisionSection';
import ServicesSection from '@/components/home/ServicesSection';
import TeamSection from '@/components/home/TeamSection';
import ContactSection from '@/components/home/ContactSection';
import HomeGSAPWrapper from '@/components/home/HomeGSAPWrapper';
import { fetchAdvertisements } from '@/api/advertisements';

export default async function Home() {
  const allAds = await fetchAdvertisements();
  const heroAds = allAds.filter(ad => ad.placement === 'HERO');
  
  // Base slider with default video
  const slides: HeroSlide[] = [
    { type: 'video', src: '/banners/home-banner.mp4' },
    ...heroAds.map(ad => ({ 
      id: ad.id,
      type: ((ad.kind?.toLowerCase() === 'video') ? 'video' : 'image') as 'video' | 'image', 
      src: ad.imageUrl, 
      alt: ad.title || 'Ad',
      targetUrl: ad.targetUrl || undefined
    }))
  ];

  return (
    <HomeGSAPWrapper>
      <SideNavigation />
      <HeroSection slides={slides} />
      <AboutSection />
      <MissionVisionSection />
      <ServicesSection />
      <TeamSection />
      <ContactSection />
    </HomeGSAPWrapper>
  );
}
