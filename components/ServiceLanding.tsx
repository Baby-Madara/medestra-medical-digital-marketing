import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { findServiceBySlug } from '../constants/services';
import { useLanguage } from '../LanguageContext';
import { FeatureIcon } from './icons/ServiceIcons';
import Footer from './Footer';
import Navbar from './Navbar';

export default function ServiceLanding() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const langCtx = useLanguage() as any;
  const language = langCtx?.language || 'ar';

  const service = slug ? findServiceBySlug(slug) : undefined;
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">خدمة غير موجودة</h1>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-brand-blue text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
          >
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

  const glassStyle = "bg-white/[0.05] backdrop-blur-[40px] border-t-[2.5px] border-l-[2.5px] border-white/90 border-b border-r border-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)]";

  return (
    <div className={`min-h-screen bg-transparent ${isArabic ? 'rtl' : 'ltr'} selection:bg-brand-blue/30`}>
      <Navbar />

      {/* Dynamic Watermark Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center opacity-[0.03]">
        <img src="/mesestra.png" alt="" className="w-[80%] h-[80%] object-contain" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative overflow-hidden rounded-[3.5rem] p-8 md:p-16 ${glassStyle} flex flex-col md:flex-row items-center gap-12 text-center md:text-start`}
          >
            {/* Subtle Hero Watermark */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-10 blur-2xl z-0 -translate-y-1/2 translate-x-1/2 rounded-full" style={{ backgroundColor: service.primaryColor }}></div>

            <div className="relative z-10 flex-1">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-sm mb-6 border border-brand-blue/20"
              >
                {isArabic ? service.tagline_ar : service.tagline_en}
              </motion.span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.15]">
                {isArabic ? service.title_ar : service.title_en}
              </h1>
              <p className="text-lg md:text-xl text-slate-700 mb-10 leading-relaxed max-w-2xl">
                {isArabic ? service.description_ar : service.description_en}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-10 py-4 bg-brand-blue text-white rounded-full font-bold text-lg shadow-[0_20px_40px_rgba(0,174,239,0.3),_inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_25px_50px_rgba(0,174,239,0.4)] transition-all flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  {isArabic ? 'اطلب عرض سعر الآن' : 'Get A Quote Now'}
                </a>
              </div>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <motion.div
                initial={{ rotate: -5, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-64 h-64 md:w-80 md:h-80 bg-white/20 backdrop-blur-2xl rounded-[3rem] border-t-[2px] border-l-[2px] border-white/60 p-8 shadow-2xl flex items-center justify-center group"
              >
                <img
                  src={service.id === 'team-training' ? '/photos/Marketing Team Training.png' :
                    service.id === 'medical-content' ? '/photos/CONTENT.png' :
                      service.id === 'ecommerce' ? '/photos/ecommerce.png' :
                        service.id === 'social-media' ? '/photos/social media.png' :
                          service.id === 'web-mobile' ? '/photos/WEB.png' :
                            '/photos/CRM (2).png'}
                  alt={service.title_en}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features - 3D Glass Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">{isArabic ? 'ماذا نقدم لك؟' : 'Expert Solutions For You'}</h2>
            <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group p-8 rounded-[2.5rem] ${glassStyle} hover:-translate-y-3 transition-all duration-500`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                  <FeatureIcon emoji={feature.icon} className="w-10 h-10" color={service.primaryColor} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section & Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-10">{isArabic ? 'لماذا تختارنا؟' : 'Why Choose Us?'}</h2>
            <div className="space-y-6">
              {benefits.map((benefit: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 bg-white/10 border border-white/20 p-5 rounded-2xl backdrop-blur-md"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white shrink-0">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-xl font-bold text-slate-800">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className={`p-10 rounded-[3.5rem] ${glassStyle}`}>
            <h3 className="text-3xl font-black text-slate-900 mb-10 text-center">{isArabic ? 'رحلة النجاح' : 'Success Roadmap'}</h3>
            <div className="space-y-12">
              {steps.map((step: any, idx: number) => (
                <div key={idx} className="flex gap-6 relative group">
                  {idx < steps.length - 1 && <div className="absolute top-16 bottom-0 left-8 w-1 bg-brand-blue/20"></div>}
                  <div className="w-16 h-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center text-2xl font-black z-10 shadow-lg shadow-brand-blue/20">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-slate-600 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Refined Glass */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">{isArabic ? 'قالوا عنا' : 'Client Success Stories'}</h2>
            <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {service.testimonials.map((testimonial, idx: number) => (
              <motion.div
                key={idx}
                className={`p-10 rounded-[3rem] ${glassStyle} italic relative`}
              >
                <div className="absolute top-8 right-10 text-brand-blue/10 text-8xl font-serif">“</div>
                <p className="text-2xl text-slate-800 leading-relaxed mb-8 relative z-10 font-medium">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-xl">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-xl">{testimonial.name}</p>
                    <p className="text-brand-blue font-bold">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Minimal Glass */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-16 text-center">{isArabic ? 'الأسئلة المتكررة' : 'Common Questions'}</h2>
          <div className="space-y-4">
            {faqs.map((faq: any, idx: number) => (
              <div
                key={idx}
                className={`rounded-[2rem] overflow-hidden border border-white/20 transition-all duration-300 ${expandedFaq === idx ? 'bg-white/20 shadow-xl' : 'bg-white/5 shadow-sm'}`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 text-start flex items-center justify-between group"
                >
                  <span className="text-xl font-bold text-slate-800 group-hover:text-brand-blue transition-colors">{faq.question}</span>
                  <div className={`p-2 rounded-full transition-transform duration-300 ${expandedFaq === idx ? 'bg-brand-blue text-white rotate-180' : 'bg-white/10 text-slate-600'}`}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </button>
                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8 text-slate-700 text-lg leading-relaxed border-t border-white/10"
                    >
                      <div className="pt-6">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Immersive Glass */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute inset-0 bg-brand-blue rounded-[4rem] blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className={`relative p-12 md:p-20 rounded-[4rem] ${glassStyle} text-center`}>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              {isArabic ? 'ابدأ رحلة نمو ممارستك الطبية اليوم' : 'Empower Your Clinic with Expert Marketing'}
            </h2>
            <p className="text-xl text-slate-700 mb-12 max-w-2xl mx-auto">
              {isArabic
                ? 'فريقنا جاهز لمساعدتك في الوصول إلى المرضى المستهدفين بأفضل الاستراتيجيات.'
                : 'Our team is ready to help you reach target patients with premium healthcare strategies.'}
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-4 px-12 py-5 bg-brand-blue text-white rounded-full font-black text-xl shadow-2xl shadow-brand-blue/30 hover:scale-105 transition-all"
            >
              <MessageCircle className="w-7 h-7" />
              {isArabic ? 'ابدأ استشارتك المجانية' : 'Start Your Free Consultation'}
              <ArrowRight className={`w-6 h-6 ${isArabic ? 'rotate-180' : ''}`} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
