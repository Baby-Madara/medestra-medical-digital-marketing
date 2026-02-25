import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    Play,
    Award,
    Zap,
    ShieldCheck,
    ArrowRight
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AcademyLanding() {
    const { t, dir, language } = useLanguage();
    const isAr = language === 'ar';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]" dir={dir}>
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-white">
                <div className={`absolute top-0 ${isAr ? 'left-0' : 'right-0'} w-[50vw] h-[50vw] bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4`}></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-4 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold uppercase tracking-wider mb-6">
                            {isAr ? 'أكاديمية ميديسترا' : 'Medestra Academy'}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                            {isAr ? 'طريقك نحو' : 'Your Path to'}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600">
                                {isAr ? 'الاحتراف الطبي' : 'Medical Professionalism'}
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
                            {isAr
                                ? 'تعلم، تدرب، واحصل على شهادات معتمدة لتطوير مهاراتك في التسويق والمبيعات الطبية.'
                                : 'Learn, practice, and get certified to develop your medical marketing and sales skills.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-20">

                {/* Courses Section */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 bg-brand-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-blue/20">
                            <BookOpen size={24} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900">{t.nav.courses}</h2>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {/* Pharmacy Sales Course */}
                        <motion.div variants={itemVariants} className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden min-h-[320px] flex flex-col justify-between">
                            {/* Background Image Layer */}
                            <div className="absolute inset-0 z-0 scale-105">
                                <img
                                    src="/photos/صيدلية.png"
                                    alt=""
                                    className="w-full h-full object-cover opacity-100 blur-[4px] scale-125 group-hover:scale-[1.35] transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-transparent"></div>
                            </div>

                            <div className="relative z-10">
                                <div className={`flex justify-between items-start mb-6`}>
                                    <span className="bg-red-500 text-white text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase shadow-lg shadow-red-500/20">
                                        {t.nav.new}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4">{t.nav.pharmacySales}</h3>
                                <p className="text-gray-800 mb-8 font-bold leading-relaxed max-w-[90%]">
                                    {isAr
                                        ? 'دورة متكاملة لإتقان فنون البيع الأخلاقي في الصيدليات، من فهم احتياجات المريض إلى بناء الثقة والولاء.'
                                        : 'A complete course to master ethical selling in pharmacies, from understanding patient needs to building trust and loyalty.'}
                                </p>
                            </div>
                            <div className="relative z-10">
                                <Link
                                    to="/pharmacy-sales"
                                    className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg shadow-brand-blue/20"
                                >
                                    {t.nav.start}
                                    <ArrowRight size={18} className={isAr ? 'rotate-180' : ''} />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Meta Ads Master Class */}
                        <motion.div variants={itemVariants} className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden min-h-[320px] flex flex-col justify-between">
                            {/* Background Image Layer */}
                            <div className="absolute inset-0 z-0 scale-105">
                                <img
                                    src="/photos/اعلانات.png"
                                    alt=""
                                    className="w-full h-full object-cover opacity-100 blur-[4px] scale-125 group-hover:scale-[1.35] transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-transparent"></div>
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="bg-green-500 text-white text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase shadow-lg shadow-green-500/20">
                                        {t.nav.free}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4">{t.nav.metaAdsMaster}</h3>
                                <p className="text-gray-800 mb-8 font-bold leading-relaxed max-w-[90%]">
                                    {isAr
                                        ? 'تعلم أسرار إعلانات الفيسبوك والانستجرام الموجهة للقطاع الطبي لتحقيق أعلى العوائد.'
                                        : 'Learn the secrets of Facebook and Instagram ads for the medical sector to achieve the highest returns.'}
                                </p>
                            </div>
                            <div className="relative z-10">
                                <Link
                                    to="/meta-ads-master"
                                    className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                                >
                                    {t.nav.start}
                                    <ArrowRight size={18} className={isAr ? 'rotate-180' : ''} />
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Simulators Section */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-3xl font-black text-gray-900">{t.nav.simulators}</h2>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <motion.div variants={itemVariants} className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-center overflow-hidden">
                            {/* Background Image Layer */}
                            <div className="absolute inset-0 z-0 scale-105">
                                <img
                                    src="/photos/محاكي.png"
                                    alt=""
                                    className="w-full h-full object-cover opacity-100 blur-[4px] scale-125 group-hover:scale-[1.35] transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-transparent"></div>
                            </div>

                            <div className="relative z-10 flex-1 text-center md:text-start">
                                <h3 className="text-2xl font-black text-gray-900 mb-2">{t.nav.metaAdsManager}</h3>
                                <p className="text-gray-800 mb-6 font-bold leading-relaxed">
                                    {isAr
                                        ? 'تدرب على مدير الإعلانات في بيئة محاكاة واقعية دون المخاطرة بميزانيتك.'
                                        : 'Practice ads manager in a realistic simulation environment without risking your budget.'}
                                </p>
                                <Link
                                    to="/meta-ads-manager"
                                    className="inline-flex items-center gap-2 text-purple-700 font-black hover:gap-3 transition-all"
                                >
                                    {t.nav.start}
                                    <ArrowRight size={18} className={isAr ? 'rotate-180' : ''} />
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Verification Section */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-brand-blue rounded-[40px] p-12 text-center text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                <ShieldCheck size={40} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black mb-6">{t.nav.certified}</h2>
                            <p className="text-white/80 text-lg mb-10 font-medium">
                                {isAr
                                    ? 'هل حصلت على شهادة من ميديسترا؟ يمكنك التحقق من صحتها وتوثيقها الآن عبر معرف الشهادة الخاص بك.'
                                    : 'Did you get a certificate from Medestra? You can verify its authenticity and validate it now via your certificate ID.'}
                            </p>
                            <Link
                                to="/verify-certificate"
                                className="inline-flex items-center gap-2 bg-white text-brand-blue px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition"
                            >
                                <Award size={22} />
                                {t.nav.verifyBtn}
                            </Link>
                        </div>
                    </motion.div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
