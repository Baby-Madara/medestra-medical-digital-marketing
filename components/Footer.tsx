import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    // Check if we are on the landing page
    if (location.pathname !== '/') {
      navigate('/');
      // Allow time for navigation to happen before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="min-h-screen pt-20 pb-4 md:pt-24 md:pb-8 bg-transparent border-t border-gray-100 flex flex-col justify-center">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-12 text-center md:text-start">

          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-0 mb-3 md:mb-6 justify-center" dir="ltr">
              <div className="">
                <img src="./mesestra.png" alt="Medestra Logo" className="h-12 md:h-16 w-auto object-contain" />
                {/* <img src="https://placehold.co/200x80/transparent/00AEEF?text=Medestra" alt="Medestra Logo" className="h-12 md:h-16 w-auto object-contain" /> */}
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed max-w mx-auto md:mx-0 text-sm md:text-base">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3 md:mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li><a href="#hero" onClick={(e) => handleNavigation(e, 'hero')} className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.home}</a></li>
              <li><a href="#aboutUs" onClick={(e) => handleNavigation(e, 'aboutUs')} className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.aboutUs}</a></li>
              <li><a href="#services" onClick={(e) => handleNavigation(e, 'services')} className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.services}</a></li>
              <li><a href="#markets" onClick={(e) => handleNavigation(e, 'markets')} className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.markets}</a></li>
              <li><a href="#contact" onClick={(e) => handleNavigation(e, 'contact')} className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.contact}</a></li>
              <li><button onClick={() => navigate('/faq')} className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav.faq}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3 md:mb-6">{t.footer.contactUs}</h4>
            <div className="flex gap-3 md:gap-4 justify-center md:justify-start mb-6">
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
              <a
                href="https://www.facebook.com/medestra.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-blue hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>

            <div className="space-y-3 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-brand-blue" />
                <a href="mailto:marketing@medestra.me" className="hover:text-brand-blue transition-colors">marketing@medestra.me</a>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-brand-blue" />
                <a href="https://wa.me/201118080265" className="hover:text-brand-blue transition-colors" dir="ltr">+20 111 808 0265</a>
              </div>
              <div className="mt-4 opacity-50 text-center md:text-start" dir="ltr">
                @medestra.me
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pb-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-6" dir={dir}>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>{t.footer.rights}</p>
            <div className="h-px w-8 bg-gray-200 hidden md:block"></div>
            <div className="flex items-center gap-3 bg-gray-50/50 px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
              <img src="/photos/الضرائب.png" alt="Tax Logo" className="h-10 md:h-12 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {language === 'ar' ? 'رقم التسجيل الضريبي' : 'Tax Registration Number'}
                </span>
                <span className="font-mono font-bold text-gray-700 tracking-wider">4607466263084392</span>
              </div>
            </div>
          </div>
          <p className="mt-2 md:mt-0">{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;