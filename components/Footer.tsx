import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="min-h-screen snap-start pt-28 pb-16 bg-white border-t border-gray-100 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-0 mb-6" dir="ltr">
                <span className="text-3xl font-extrabold  text-brand-red">m</span>
                <span className="text-3xl font-extrabold  text-brand-blue">e</span>
                <span className="text-3xl font-extrabold  text-brand-green">destra</span>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              <li><a href="#hero" className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.home}</a></li>
              <li><a href="#services" className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.services}</a></li>
              <li><a href="#markets" className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.markets}</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">{t.footer.contactUs}</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/marketingmedestra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/medestra.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              {/* Fallback/Generic Facebook if needed, otherwise removed or updated if link provided later */}
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-blue hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-500 font-medium" dir="ltr">
              @medestra.me
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>{t.footer.rights}</p>
          <p className="mt-2 md:mt-0">{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;