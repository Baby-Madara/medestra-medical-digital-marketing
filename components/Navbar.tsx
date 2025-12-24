import React, { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.markets, href: '#markets' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
             <div className="text-3xl font-extrabold tracking-tighter select-none">
                <span className="text-brand-red">m</span>
                <span className="text-brand-blue">e</span>
                <span className="text-brand-green">destra</span>
             </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-base font-medium transition-colors hover:text-brand-blue ${scrolled ? 'text-gray-700' : 'text-gray-800'}`}
              >
                {item.label}
              </a>
            ))}
            
            <button 
              onClick={toggleLanguage}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-colors ${scrolled ? 'border-gray-300 text-gray-700 hover:border-brand-blue' : 'border-gray-400 text-gray-800 hover:border-brand-blue'}`}
            >
              <Languages size={18} />
              <span className="text-sm font-bold uppercase">{language === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="md:hidden flex items-center gap-4">
             <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-gray-700 font-bold"
            >
              <span className="text-sm uppercase">{language === 'ar' ? 'En' : 'عربي'}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-brand-blue focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full left-0 top-full border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-start">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-3 py-3 w-full text-start text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full block text-center bg-brand-blue text-white px-6 py-3 rounded-xl font-bold"
            >
              {t.nav.book}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;