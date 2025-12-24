import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const Beneficiaries: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{t.beneficiaries.heading}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.beneficiaries.subheading}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {t.beneficiaries.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group"
            >
              <div className="w-14 h-14 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mb-3 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <item.icon className="w-7 h-7" />
              </div>
              <span className="font-bold text-gray-700 text-sm">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Beneficiaries;