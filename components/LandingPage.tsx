import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import AboutUs from './AboutUs';
import Services from './Services';
import Beneficiaries from './Beneficiaries';
import Markets from './Markets';
import Contact from './Contact';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

import { FadeInSection } from './FadeInSection';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main className="relative z-10">
        <Hero />

        <FadeInSection>
          <AboutUs />
        </FadeInSection>

        <FadeInSection>
          <Services />
        </FadeInSection>

        <FadeInSection>
          <Beneficiaries />
        </FadeInSection>

        <FadeInSection>
          <Markets />
        </FadeInSection>

        <FadeInSection>
          <Contact />
        </FadeInSection>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default LandingPage;
