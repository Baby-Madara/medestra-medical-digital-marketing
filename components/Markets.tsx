import React from 'react';
import { Globe, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Markets: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="markets" className="min-h-screen snap-start pt-28 pb-10 bg-brand-dark text-white relative overflow-hidden flex flex-col justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full text-brand-blue mb-8">
              <Globe className="w-6 h-6" />
              <span className="font-bold text-lg">{t.markets.badge}</span>
            </div>
            <h2 className="text-4xl md:text-4xl font-bold mb-8 leading-tight">
              {t.markets.title}<br />
              <span className="text-brand-blue">{t.markets.subtitle}</span>
            </h2>
            <p className="text-gray-300 text-xl mb-10 leading-relaxed">
              {t.markets.description}
            </p>
            
            <ul className="space-y-6 mb-10">
              {t.markets.points.map((point, i) => (
                <li key={i} className="flex items-center gap-4 text-lg">
                  <CheckCircle2 className="text-brand-green w-8 h-8 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.markets.stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-colors">
                <div className="text-5xl font-extrabold text-brand-blue mb-3" dir="ltr">{stat.value}</div>
                <div className="text-gray-400 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Markets;