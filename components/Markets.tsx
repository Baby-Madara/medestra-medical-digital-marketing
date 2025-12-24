import React from 'react';
import { Globe, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Markets: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="markets" className="py-20 bg-brand-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-brand-blue mb-6">
              <Globe className="w-5 h-5" />
              <span className="font-bold">{t.markets.badge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t.markets.title}<br />
              <span className="text-brand-blue">{t.markets.subtitle}</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {t.markets.description}
            </p>
            
            <ul className="space-y-4 mb-8">
              {t.markets.points.map((point, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-brand-green w-6 h-6 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.markets.stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
                <div className="text-4xl font-extrabold text-brand-blue mb-2" dir="ltr">{stat.value}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Markets;