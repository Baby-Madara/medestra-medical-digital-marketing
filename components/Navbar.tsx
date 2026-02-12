import React, { useState, useEffect } from 'react';
import { Menu, X, Languages, ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20 || document.documentElement.scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, id: 'hero', href: '/#hero' },
    { label: t.nav.services, id: 'services', href: '/#services' },
    { label: t.nav.markets, id: 'markets', href: '/#markets' },
    { label: t.nav.contact, id: 'contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[rgba(255,255,255,0.6)] backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
             {/* Using placeholder until real logo is available */}
             <img src="./mesestra.png" alt="Medestra Logo" className="h-10 md:h-12 w-auto object-contain" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavigation(e, item.id)}
                className={`text-base font-medium transition-colors hover:text-brand-blue ${scrolled ? 'text-gray-700' : 'text-gray-800'}`}
              >
                {item.label}
              </a>
            ))}

            {/* E-Service Dropdown */}
            <div className="relative group">
              <button 
                className={`flex items-center gap-1 text-base font-medium transition-colors hover:text-brand-blue ${scrolled ? 'text-gray-700' : 'text-gray-800'}`}
              >
                {t.nav.eservice}
                <ChevronDown size={16} />
              </button>
              <div className="absolute top-full right-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <Link 
                    to="/meta-ads-master" 
                    className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-brand-blue hover:text-white transition-colors text-right"
                  >
                    {t.nav.metaAdsMaster}
                  </Link>
                </div>
              </div>
            </div>
            
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
      <div 
        className={`md:hidden bg-white shadow-xl absolute w-full left-0 top-full border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-start">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavigation(e, item.id)}
              className="block px-3 py-3 w-full text-start text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-md"
            >
              {item.label}
            </a>
          ))}
          
          {/* Mobile E-Service Item */}
           <div className="w-full border-t border-gray-100 my-2 pt-2">
              <p className="px-3 py-2 text-xs font-bold text-gray-400 uppercase">{t.nav.eservice}</p>
              <Link
                to="/meta-ads-master"
                className="block px-3 py-2 w-full text-start text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.metaAdsMaster}
              </Link>
           </div>
          
          <a 
            href="/#contact"
            onClick={(e) => handleNavigation(e, 'contact')}
            className="mt-4 w-full block text-center bg-brand-blue text-white px-6 py-3 rounded-xl font-bold"
          >
            {t.nav.book}
          </a>
        </div>
      </div>
    </nav>
  );
};

// export Navbar.handleNavigation as handleNavigation;
export default Navbar;