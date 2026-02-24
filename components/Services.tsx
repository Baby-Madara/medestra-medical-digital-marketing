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
    <section id="services" className="min-h-screen pt-20 pb-4 md:pt-24 md:pb-4 bg-white flex flex-col justify-center">
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
                className={`h-full rounded-2xl p-8 bg-white/30 backdrop-blur-md border border-white/30 hover:bg-white/40 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group`}
              >
                <div className={`w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform overflow-hidden`}>
                  {service.id === 'team-training' ? (
                    <img 
                      src={'/photos/Marketing Team Training.png'}
                      alt={service.title_en}
                      className="w-full h-full object-cover"
                    />
                  ) : ['ecommerce', 'social-media', 'web-mobile', 'customer-service', 'medical-content'].includes(service.id) ? (
                    <img 
                      src={service.id === 'medical-content' ? '/photos/CONTENT.png' :
                           service.id === 'ecommerce' ? '/photos/ecommerce.png' :
                           service.id === 'social-media' ? '/photos/social media.png' :
                           service.id === 'web-mobile' ? '/photos/WEB.png' :
                           '/photos/CRM (2).png'}
                      alt={service.title_en}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getServiceIcon(service.id)
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {language === 'ar' ? service.title_ar : service.title_en}
                </h3>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  {language === 'ar' ? service.shortDesc_ar : service.shortDesc_en}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: service.primaryColor }}>
                  {language === 'ar' ? 'تعرف أكثر →' : 'Learn More →'}
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