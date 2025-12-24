import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="min-h-screen md:h-screen md:overflow-hidden snap-start pt-20 pb-4 md:pt-24 md:pb-4 bg-rose-50 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1 md:mb-2">{t.services.heading}</h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-4xl mx-auto">
            {t.services.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {t.services.items.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-slate-50 rounded-xl md:rounded-2xl p-2 md:p-4 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 hover:-translate-y-1 group border border-gray-100 flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-4 h-full"
            >
              <div className={`w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-lg md:rounded-xl flex items-center justify-center bg-white shadow-sm group-hover:scale-105 transition-transform duration-300 md:mb-4`}>
                <service.icon className={`w-5 h-5 md:w-7 md:h-7 ${service.color}`} />
              </div>
              <div className="flex flex-col items-start text-start">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-0 md:mb-2">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-xs md:text-sm flex-grow">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;