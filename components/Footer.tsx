import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <footer className="h-screen overflow-hidden snap-start pt-20 pb-4 md:pt-24 md:pb-8 bg-white border-t border-gray-100 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-12 text-center md:text-start">
          
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-0 mb-3 md:mb-6 justify-center" dir="ltr">
              <img src="./mesestra.png" alt="Medestra Logo" className="h-12 md:h-16 w-auto object-contain" />
            </div>
            <p className="text-gray-500 leading-relaxed max-w-sm mx-auto md:mx-0 text-sm md:text-base">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3 md:mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><a href="#hero" className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.home}</a></li>
              <li><a href="#services" className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.services}</a></li>
              <li><a href="#markets" className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.markets}</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3 md:mb-6">{t.footer.contactUs}</h4>
            <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
              <a 
                href="https://www.linkedin.com/company/marketingmedestra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white transition-all"
              >
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a 
                href="https://instagram.com/medestra.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition-all"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              {/* Fallback/Generic Facebook if needed, otherwise removed or updated if link provided later */}
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-blue hover:text-white transition-all">
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-500 font-medium text-center" dir="ltr">
              @medestra.me
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pb-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>{t.footer.rights}</p>
          <p className="mt-2 md:mt-0">{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;