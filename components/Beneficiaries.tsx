import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const Beneficiaries: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen snap-start pt-28 pb-20 bg-slate-50 border-t border-slate-100 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">{t.beneficiaries.heading}</h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
            {t.beneficiaries.subheading}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {t.beneficiaries.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow text-center group"
            >
              <div className="w-20 h-20 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mb-5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <item.icon className="w-10 h-10" />
              </div>
              <span className="font-bold text-gray-800 text-lg leading-tight">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Beneficiaries;