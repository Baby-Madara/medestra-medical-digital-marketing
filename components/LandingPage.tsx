import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Beneficiaries from './Beneficiaries';
import Markets from './Markets';
import Contact from './Contact';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
// import CustomCursor from './CustomCursor';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Beneficiaries />
        <Markets />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default LandingPage;
