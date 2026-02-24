import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, MessageCircle, ArrowLeft } from 'lucide-react';
import { findServiceBySlug } from '../constants/services';
import { useLanguage } from '../LanguageContext';
import { FeatureIcon } from './icons/ServiceIcons';

export default function ServiceLanding() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const langCtx = useLanguage() as any;
  const language = langCtx?.language || 'ar';
  
  const service = slug ? findServiceBySlug(slug) : undefined;
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Scroll to top when page loads or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">خدمة غير موجودة</h1>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
            الرجوع للرئيسية
          </button>
        </motion.div>
      </div>
    );
  }

  const isArabic = language === 'ar';
  const whatsappMsg = encodeURIComponent(
    isArabic 
      ? `مرحبا ميديسترا، أود طلب عرض سعر لخدمة ${service.title_ar}`
      : `Hello medestra, I would like to request a quotation for ${service.title_en}`
  );
  const waLink = `https://wa.me/201118080265?text=${whatsappMsg}`;
  const faqs = isArabic ? service.faqs_ar : service.faqs_en;
  const features = isArabic ? service.features_ar : service.features_en;
  const benefits = isArabic ? service.benefits_ar : service.benefits_en;
  const steps = isArabic ? service.steps_ar : service.steps_en;

  return (
    <div className={`min-h-screen bg-white ${isArabic ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <ArrowLeft className={`w-5 h-5 text-slate-600 ${isArabic ? 'rotate-180' : ''}`} />
          </button>
          <h1 className="text-xl font-bold text-slate-900">{isArabic ? service.title_ar : service.title_en}</h1>
          <div className="w-10" />
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`bg-gradient-to-br ${service.background} py-16 md:py-24 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {service.id === 'team-training' ? (
              <div className={`w-32 h-32 md:w-48 md:h-48 mb-6 inline-block p-4 rounded-2xl ${service.iconBg} flex items-center justify-center overflow-hidden`}>
                <img src="/photos/Marketing Team Training.png" alt={service.title_en} className="w-full h-full object-contain" />
              </div>
            ) : ['ecommerce', 'social-media', 'web-mobile', 'customer-service', 'medical-content'].includes(service.id) ? (
              <div className={`w-32 h-32 md:w-48 md:h-48 mb-6 inline-block p-4 rounded-2xl ${service.iconBg} overflow-hidden`}>
                <img 
                  src={service.id === 'medical-content' ? '/photos/CONTENT.png' :
                       service.id === 'ecommerce' ? '/photos/ecommerce.png' :
                       service.id === 'social-media' ? '/photos/social media.png' :
                       service.id === 'web-mobile' ? '/photos/WEB.png' :
                       '/photos/CRM (2).png'}
                  alt={service.title_en}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className={`text-6xl md:text-7xl mb-6 inline-block p-4 rounded-2xl ${service.iconBg}`}>
                {service.id === 'medical-content' && '📝'}
              </div>
            )}
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {isArabic ? service.title_ar : service.title_en}
          </h1>
          <p className={`text-lg md:text-xl text-slate-600 mb-4`}>
            {isArabic ? service.tagline_ar : service.tagline_en}
          </p>
          <p className="text-base md:text-lg text-slate-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            {isArabic ? service.description_ar : service.description_en}
          </p>
          <motion.a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-all"
            style={{ backgroundColor: service.primaryColor, boxShadow: `0 10px 30px ${service.primaryColor}40` }}
          >
            <MessageCircle className="w-5 h-5" />
            {isArabic ? 'اطلب عرض سعر' : 'Request Quotation'}
          </motion.a>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            {isArabic ? 'ما الذي نقدمه' : 'What We Offer'}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4 w-10 h-10" style={{ color: service.primaryColor }}>
                  <FeatureIcon emoji={feature.icon} className="w-10 h-10" color={service.primaryColor} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            {isArabic ? 'الفوائد' : 'Key Benefits'}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4"
              >
                <div
                  className="w-6 h-6 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: service.primaryColor }}
                />
                <p className="text-slate-700 text-lg">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            {isArabic ? 'كيف يعمل' : 'How It Works'}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
                  style={{ backgroundColor: service.primaryColor }}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            {isArabic ? 'آراء العملاء' : 'What Our Clients Say'}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.testimonials.map((testimonial, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-6 h-6" style={{ color: '#FFD700' }}>
                      <FeatureIcon emoji="★" className="w-6 h-6" color="#FFD700" />
                    </div>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-semibold text-slate-900 hover:bg-slate-50 transition flex items-center justify-between"
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 text-slate-600 transition-transform ${
                      expandedFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-slate-700"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-center"
        style={{ background: `linear-gradient(135deg, ${service.primaryColor}20, ${service.primaryColor}10)` }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {isArabic ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p className="text-lg text-slate-700 mb-8">
            {isArabic 
              ? 'تواصل معنا اليوم واحصل على استشارة مجانية.'
              : 'Contact us today and get a free consultation.'}
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105"
            style={{ backgroundColor: service.primaryColor, boxShadow: `0 10px 30px ${service.primaryColor}40` }}
          >
            <MessageCircle className="w-5 h-5" />
            {isArabic ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
          </a>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4 text-lg font-bold">Medestra</p>
          <p className="text-slate-400 mb-6">{isArabic ? 'وكالة تسويق طبي متقدمة' : 'Advanced Medical Marketing Agency'}</p>
          <p className="text-slate-500 text-sm">
            {isArabic 
              ? '© 2026 ميديسترا. جميع الحقوق محفوظة.' 
              : '© 2026 Medestra. All Rights Reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
