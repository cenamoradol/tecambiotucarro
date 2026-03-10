import { cookies } from 'next/headers';
import React from 'react';
import ComingSoonPage from '@/components/coming-soon/ComingSoonPage';
import HeroSection from '@/components/home/HeroSection';
import SideNavigation from '@/components/home/SideNavigation';
import AboutSection from '@/components/home/AboutSection';
import MissionVisionSection from '@/components/home/MissionVisionSection';
import ServicesSection from '@/components/home/ServicesSection';
import TeamSection from '@/components/home/TeamSection';
import ContactSection from '@/components/home/ContactSection';
import HomeGSAPWrapper from '@/components/home/HomeGSAPWrapper';

export default async function Home() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get('bypass_coming_soon')?.value === 'true' || process.env.NODE_ENV === 'development';

  if (!hasAccess) {
    return <ComingSoonPage />;
  }

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
