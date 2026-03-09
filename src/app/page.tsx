import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import SideNavigation from '@/components/home/SideNavigation';
import AboutSection from '@/components/home/AboutSection';
import MissionVisionSection from '@/components/home/MissionVisionSection';
import ServicesSection from '@/components/home/ServicesSection';
import TeamSection from '@/components/home/TeamSection';
import ContactSection from '@/components/home/ContactSection';
import HomeGSAPWrapper from '@/components/home/HomeGSAPWrapper';

export default function Home() {
  return (
    <HomeGSAPWrapper>
      <SideNavigation />
      <HeroSection />
      <AboutSection />
      <MissionVisionSection />
      <ServicesSection />
      <TeamSection />
      <ContactSection />
    </HomeGSAPWrapper>
  );
}
