import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const Beneficiaries: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen md:h-screen md:overflow-hidden snap-start pt-20 pb-4 md:pt-24 md:pb-8 bg-emerald-50 border-t border-gray-100 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 md:mb-4">{t.beneficiaries.heading}</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto px-2">
            {t.beneficiaries.subheading}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
          {t.beneficiaries.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex flex-col items-center p-2 md:p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mb-2 md:mb-3 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <item.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span className="font-bold text-gray-800 text-sm md:text-base leading-tight">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Beneficiaries;