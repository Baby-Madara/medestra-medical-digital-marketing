import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <footer className="min-h-screen md:h-screen md:overflow-hidden snap-start pt-20 pb-4 md:pt-24 md:pb-8 bg-brand-dark text-white relative flex flex-col justify-center border-t border-white/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-12 text-center md:text-start">
          
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-0 mb-3 md:mb-6 justify-center" dir="ltr">
               <div className="bg-white/5 rounded-xl p-2 backdrop-blur-sm">
                  <img src="./mesestra.png" alt="Medestra Logo" className="h-12 md:h-16 w-auto object-contain brightness-110" />
               </div>
            </div>
<p className="text-gray-400 leading-relaxed max-w-prose mx-auto md:mx-0 text-sm md:text-base">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 md:mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><a href="#hero" className="text-gray-300 hover:text-brand-blue transition-colors">{t.nav.home}</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-brand-blue transition-colors">{t.nav.services}</a></li>
              <li><a href="#markets" className="text-gray-300 hover:text-brand-blue transition-colors">{t.nav.markets}</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-brand-blue transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 md:mb-6 text-center">{t.footer.contactUs}</h4>
            <div className="flex gap-3 md:gap-4 justify-center md:justify-center">
              <a 
                href="https://www.linkedin.com/company/marketingmedestra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-blue transition-all"
              >
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a 
                href="https://instagram.com/medestra.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-600 transition-all"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              {/* Fallback/Generic Facebook if needed */}
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-blue transition-all">
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-400 font-medium text-center" dir="ltr">
              @medestra.me
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pb-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400" dir={dir}>
          <p>{t.footer.rights}</p>
          <p className="mt-2 md:mt-0">{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;