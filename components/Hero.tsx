import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const imagePaths = [
  './mascots/h1.png',
  './mascots/h2.png',
  './mascots/h3.png',
  './mascots/h4.png',
];

const Hero: React.FC = () => {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<string[]>(imagePaths);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imagePaths.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Cache images as Blobs to persist even if server is offline (e.g. during dev restarts)
  useEffect(() => {
    const cacheImages = async () => {
      try {
        const promises = imagePaths.map(async (path) => {
          const response = await fetch(path);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        });
        const cachedUrls = await Promise.all(promises);
        setDisplayImages(cachedUrls);
      } catch (error) {
        console.error("Image caching failed, falling back to network paths:", error);
      }
    };
    cacheImages();
    
    // Cleanup blobs on unmount (optional but good practice)
    return () => {
      // We don't have access to the *cachedUrls* var here easily without refs, 
      // but for a Hero component that stays mounted, it's low risk.
    };
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center pt-16 md:pt-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Decorative Circles */}
      <div className={`absolute top-20 ${dir === 'rtl' ? 'left-10' : 'right-10'} w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl`} />
      <div className={`absolute bottom-10 ${dir === 'rtl' ? 'right-10' : 'left-10'} w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 h-[calc(100vh-100px)] lg:h-auto gap-4 lg:gap-6 items-center justify-between">
          {/* Image/Mascot Area */}
          {/* for some reason the circle becomes oval-like on some phones */}
          {/* solution:             <div className="relative  h-[60%] lg:h-auto lg:w-full aspect-square max-w-full lg:max-w-lg"> */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative flex-1 w-full flex justify-center items-center min-h-0 p-4 ${dir === 'rtl' ? 'lg:justify-end lg:order-last' : 'lg:justify-start lg:order-first'} order-first`}
          >
            <div className="relative  h-[90%] lg:h-auto lg:w-full aspect-square max-w-full lg:max-w-lg">
              {/* Abstract blob background - Hidden on mobile for space */}
              {/* <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="hidden md:block absolute inset-0 w-full h-full text-blue-200/50 animate-pulse"> */}
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="md:block absolute inset-0 w-full h-full text-blue-200/50 animate-pulse">
                <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.3C93.4,8.6,81.8,21.5,70.5,32.4C59.2,43.3,48.2,52.2,36.2,60.6C24.2,69,11.2,76.9,-2.7,81.6C-16.6,86.3,-31.4,87.8,-43.3,81.8C-55.2,75.8,-64.2,62.3,-71.4,49.2C-78.6,36.1,-84,23.4,-84.9,10.2C-85.8,-3,-82.2,-16.7,-74.6,-28.6C-67,-40.5,-55.4,-50.6,-43.1,-58.5C-30.8,-66.4,-17.8,-72.1,-3.5,-66C10.8,-59.9,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center z-10 text-center">
                 <div className="relative w-full h-full bg-white/20 backdrop-blur-sm rounded-full border-2 md:border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                    <div className="text-center w-full h-full relative flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          <motion.img 
                            key={currentImageIndex}
                            src={displayImages[currentImageIndex]} 
                            alt={`Medestra Mascot ${currentImageIndex + 1}`} 
                            className="w-[80%] h-[80%] object-contain absolute inset-0 m-auto" 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                          />
                        </AnimatePresence>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-start shrink-0 pb-4 mb-8"
          >
            <div className="inline-block px-3 py-1 mb-3 md:mb-6 rounded-full bg-blue-100 text-brand-blue font-bold text-xs md:text-sm border border-blue-200">
              {t.hero.badge}
            </div>
            <h1 className="text-3xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-3 md:mb-6">
              {t.hero.titleStart} <span className="text-brand-blue">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-4 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#contact"
                className="group bg-brand-red text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-600 hover:shadow-brand-red/30 transition-all flex items-center justify-center gap-2"
              >
                {t.hero.quoteBtn}
                <Arrow className={`w-5 h-5 transition-transform ${dir === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </a>
              <a 
                href="#services"
                className="bg-white text-gray-700 border-2 border-gray-100 px-8 py-4 rounded-full font-bold text-lg hover:border-brand-blue hover:text-brand-blue transition-all shadow-sm"
              >
                {t.hero.servicesBtn}
              </a>
            </div>
          </motion.div>

          
        </div>
      </div>
    </section>
  );
};

export default Hero;