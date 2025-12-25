import React from 'react';
import { Globe, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Markets: React.FC = () => {
  const { t } = useLanguage();

  // Previous: className="h-screen md:overflow-hidden snap-start pt-20 md:pt-24 pb-0 bg-brand-dark text-white relative flex flex-col justify-center"
  return (
    <section id="markets" className="min-h-screen pt-20 md:pt-24 pb-0 bg-brand-dark text-white relative flex flex-col justify-center">
      {/* Background Pattern */}
      {/* Previous Pattern: opacity-5 radial-gradient(#000000 ...) */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
          <div>
            {/* Previous Badge: bg-brand-blue/10 */}
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-brand-blue mb-3 md:mb-6">
              <Globe className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-bold text-sm md:text-base">{t.markets.badge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-6 leading-tight">
              {t.markets.title}<br />
              <span className="text-brand-blue">{t.markets.subtitle}</span>
            </h2>
            {/* Previous Desc: text-gray-600 */}
            <p className="text-gray-300 text-base md:text-lg mb-4 md:mb-8 leading-relaxed max-w-lg">
              {t.markets.description}
            </p>
            
            <ul className="space-y-2 md:space-y-4 mb-6 md:mb-8">
              {t.markets.points.map((point, i) => (
                <li key={i} className="flex items-center gap-2 md:gap-3 text-sm md:text-base">
                  <CheckCircle2 className="text-brand-green w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
            {t.markets.stats.map((stat, idx) => (
              /* Previous Stat Card: bg-white/60 ... text-gray-600 */
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 text-center hover:bg-white/10 transition-colors">
                <div className="text-2xl md:text-4xl font-extrabold text-brand-blue mb-1 md:mb-2" dir="ltr">{stat.value}</div>
                <div className="text-gray-400 font-medium text-xs md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Markets;