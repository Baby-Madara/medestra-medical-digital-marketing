import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllServices } from '../constants/services';
import FeatureIcon from './icons/ServiceIcons';
import { useLanguage } from '../LanguageContext';

const Services: React.FC = () => {
  const langCtx = useLanguage() as any;
  const language = langCtx?.language || 'ar';
  const t = langCtx?.t || { services: { heading: 'الخدمات', subheading: 'اكتشف خدماتنا المتخصصة' } };
  const services = getAllServices();

  const getServiceIcon = (id: string) => {
    const icons: { [key: string]: string } = {
      'medical-content': '📝',
      'customer-service': '📞',
      'ecommerce': '🛍️',
      'social-media': '📱',
      'team-training': '👨‍🏫',
      'web-mobile': '🌐'
    };
    return icons[id] || '⭐';
  };

  return (
    <section id="services" className="min-h-screen pt-20 pb-4 md:pt-24 md:pb-4 bg-transparent flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {language === 'ar' ? 'خدماتنا' : 'Our Services'}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {language === 'ar'
              ? 'حلول تسويق طبي شاملة مصممة خصيصاً لتنمية ممارستك الطبية'
              : 'Comprehensive healthcare marketing solutions designed to grow your medical practice'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Link key={service.id} to={`/service/${service.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`h-full rounded-[2.5rem] p-6 bg-white/[0.05] backdrop-blur-[40px] border-t-[2.5px] border-l-[2.5px] border-white/90 border-b border-r border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)] hover:bg-white/[0.1] hover:shadow-[0_30px_70px_rgba(0,0,0,0.15),_inset_0_1px_3px_rgba(255,255,255,1)] hover:-translate-y-3 transition-all duration-700 cursor-pointer group relative overflow-hidden`}
              >
                {/* Full-card Company Logo Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none p-4">
                  <img
                    src="./mesestra.png"
                    alt=""
                    className="w-full h-full object-contain filter grayscale group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />
                </div>

                <div className="relative z-10 flex flex-col h-full text-start">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                      {language === 'ar' ? service.title_ar : service.title_en}
                    </h3>
                  </div>

                  <p className="text-slate-700 mb-6 leading-relaxed text-base flex-grow">
                    {language === 'ar' ? service.shortDesc_ar : service.shortDesc_en}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mt-auto bg-white/10 w-fit px-5 py-1.5 rounded-full border border-white/30 group-hover:bg-brand-blue group-hover:text-white group-hover:border-transparent transition-all duration-500" style={{ color: service.primaryColor }}>
                    {language === 'ar' ? 'اكتشف المزيد →' : 'Discover More →'}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;