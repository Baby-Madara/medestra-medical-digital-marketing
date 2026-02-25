import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    CheckCircle,
    Lock,
    Menu,
    X,
    ChevronRight,
    Award,
    Clock,
    ArrowLeft,
    Zap,
    Star,
    BookOpen,
    ShieldCheck,
    ChevronLeft
} from 'lucide-react';
import { COURSE_CONTENT, Module } from './academy/course';
import { Certificate } from './academy/Certificate';
import { BrandLogo } from './academy/BrandLogo';
import { useLanguage } from '../LanguageContext';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PharmacySalesCourse() {
    const { language, t, dir } = useLanguage();
    const isAr = language === 'ar';

    const [view, setView] = useState<'landing' | 'course'>('landing');
    const [activeModuleId, setActiveModuleId] = useState<string>('intro');
    const [completedModules, setCompletedModules] = useState<string[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showCertificate, setShowCertificate] = useState(false);
    const [userName, setUserName] = useState('');
    const [nameInputOpen, setNameInputOpen] = useState(false);

    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Exam State
    const [examStarted, setExamStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    const activeModule = COURSE_CONTENT.find(m => m.id === activeModuleId) || COURSE_CONTENT[0];

    const totalQuestions = COURSE_CONTENT.reduce((acc, module) => acc + module.content.quiz.length, 0);

    const answeredQuestions = COURSE_CONTENT.reduce((acc, module) => {
        if (completedModules.includes(module.id)) {
            return acc + module.content.quiz.length;
        }
        if (module.id === activeModuleId) {
            return acc + currentQuestionIndex;
        }
        return acc;
    }, 0);

    const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
    const allCompleted = completedModules.includes('final-exam');

    // Reset quiz state and scroll to top when module changes
    useEffect(() => {
        if (activeModuleId === 'intro') return;
        setQuizAnswers({});
        setCurrentQuestionIndex(0);
        setShowExplanation(false);
        setQuizCompleted(false);
        setExamStarted(false);
        setTimeLeft(300);
        window.scrollTo(0, 0); // Scroll to top when activeModuleId changes
    }, [activeModuleId]);

    // Timer Logic
    useEffect(() => {
        if (!examStarted || quizCompleted || activeModule.id !== 'final-exam') return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setQuizCompleted(true); // Auto-submit/finish when time runs out
                    handleModuleComplete(activeModule.id);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [examStarted, quizCompleted, activeModule.id]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleModuleComplete = (id: string) => {
        if (!completedModules.includes(id)) {
            setCompletedModules(prev => [...prev, id]);
        }
    };

    const handleAnswerSelect = (questionId: string, optionIndex: number) => {
        if (showExplanation) return;

        setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        const currentQuestion = activeModule.content.quiz[currentQuestionIndex];
        const isCorrect = quizAnswers[currentQuestion.id] === currentQuestion.correctAnswer;

        if (isCorrect) {
            if (currentQuestionIndex < activeModule.content.quiz.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setShowExplanation(false);
            } else {
                setQuizCompleted(true);
                handleModuleComplete(activeModule.id);
            }
        } else {
            setShowExplanation(false);
            setQuizAnswers(prev => {
                const newAnswers = { ...prev };
                delete newAnswers[currentQuestion.id];
                return newAnswers;
            });
        }
    };

    const handleGetCertificate = () => {
        if (userName) {
            setShowCertificate(true);
        } else {
            setNameInputOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 selection:bg-brand-blue selection:text-white" dir={dir}>

            {/* Landing View */}
            {view === 'landing' && (
                <div className="relative min-h-screen flex flex-col overflow-hidden">
                    <Navbar />

                    {/* Abstract Background Shapes */}
                    <div className={`absolute top-0 ${isAr ? 'left-0' : 'right-0'} w-[50vw] h-[50vw] bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4`}></div>
                    <div className={`absolute bottom-0 ${isAr ? 'right-0' : 'left-0'} w-[40vw] h-[40vw] bg-brand-blue/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4`}></div>

                    <main className="relative z-20 flex-1 flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto mt-32 mb-20 text-balance">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce">
                                <span className="inline-block py-1 px-4 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider shadow-md transform -rotate-2 border border-brand-blue/20">
                                    {isAr ? 'دورة جديدة!' : 'New Course!'}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight text-gray-900">
                                {isAr ? 'اتقن ' : 'Master the '}{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-600 to-cyan-500">
                                    {isAr ? 'فنون و اخلاقيات بيع الصيدلية' : t.nav.pharmacySales}
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                                {isAr
                                    ? 'ارتقِ بمهاراتك البيعية، واتقن استشارات المرضى، وأطلق كامل إمكاناتك مع صفنا التفاعلي المتقدم.'
                                    : 'Level up your sales skills, master patient consultation, and unlock your full potential with our interactive masterclass.'}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button
                                    onClick={() => setView('course')}
                                    className="px-8 py-4 bg-brand-blue text-white font-bold text-lg rounded-2xl hover:bg-blue-600 transition shadow-xl shadow-brand-blue/20 flex items-center gap-2 group transform hover:-translate-y-1"
                                >
                                    {isAr ? 'ابدأ رحلتك الآن' : 'Start Your Journey'}
                                    <div className={`bg-white/20 rounded-full p-1 ${isAr ? 'rotate-180' : ''}`}>
                                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>
                            </div>
                        </motion.div>

                        {/* Stats / Trust */}
                        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                            {[
                                { label: isAr ? 'وحدات' : 'Modules', value: '6', icon: BookOpen, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
                                { label: isAr ? 'المدة' : 'Duration', value: isAr ? '5 ساعات' : '5 Hours', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-600/10' },
                                { label: isAr ? 'المستوى' : 'Level', value: isAr ? 'متقدم' : 'Advanced', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                                { label: isAr ? 'الشهادة' : 'Certificate', value: isAr ? 'مشمولة' : 'Included', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className={`${stat.bg} w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </main>
                    <Footer />
                </div>
            )}

            {/* Course View */}
            {view === 'course' && (
                <div className="flex h-screen overflow-hidden bg-gray-50">

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ [isAr ? 'right' : 'left']: -320 }}
                        animate={{ [isAr ? 'right' : 'left']: sidebarOpen ? 0 : -320 }}
                        className={`fixed md:relative z-30 w-80 h-full bg-white border-${isAr ? 'l' : 'r'} border-gray-200 flex flex-col shrink-0 shadow-xl`}
                    >
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
                                <BrandLogo className="w-10 h-10" />
                                <span className="font-bold text-xl tracking-tight text-gray-900">{isAr ? 'أكاديمية ميديسترا' : 'Medestra Academy'}</span>
                            </div>
                            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex justify-between text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">
                                <span>{isAr ? 'تقدمك' : 'Your Progress'}</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-brand-blue to-emerald-400 transition-all duration-500 rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto py-4">
                            <div className="px-6 pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">{isAr ? 'المنهج التعليمي' : 'Curriculum'}</div>
                            <div className="space-y-2 px-3">
                                {/* Introduction Item */}
                                <button
                                    onClick={() => setActiveModuleId('intro')}
                                    className={`w-full px-4 py-3 flex items-center gap-3 text-start transition-all rounded-xl relative group ${activeModuleId === 'intro' ? "bg-brand-blue/10 text-brand-blue" : "hover:bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm ${activeModuleId === 'intro' ? "bg-brand-blue text-white" : "bg-white border-2 border-gray-200 text-gray-400"
                                        }`}>
                                        <BookOpen size={14} />
                                    </div>
                                    <span className={`text-sm font-bold ${activeModuleId === 'intro' ? "text-brand-blue" : "text-gray-700"}`}>
                                        {isAr ? 'المقدمة وخارطة الطريق' : 'Introduction & Roadmap'}
                                    </span>
                                </button>

                                {COURSE_CONTENT.map((module, index) => {
                                    const isActive = activeModuleId === module.id;
                                    const isCompleted = completedModules.includes(module.id);
                                    const isLocked = index === 0
                                        ? !completedModules.includes('intro')
                                        : !completedModules.includes(COURSE_CONTENT[index - 1].id);

                                    return (
                                        <button
                                            key={module.id}
                                            onClick={() => !isLocked && setActiveModuleId(module.id)}
                                            disabled={isLocked}
                                            className={`w-full px-4 py-3 flex items-start gap-3 text-start transition-all rounded-xl relative group ${isActive ? "bg-brand-blue/10 text-brand-blue" : "hover:bg-gray-100 text-gray-600"
                                                } ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                        >
                                            <div className={`
                        mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm ${isCompleted
                                                    ? "bg-emerald-500 text-white"
                                                    : isActive
                                                        ? "bg-brand-blue text-white"
                                                        : "bg-white border-2 border-gray-200 text-gray-400"
                                                }`}>
                                                {isCompleted ? <CheckCircle size={14} /> : <span className="text-[10px] font-bold">{index + 1}</span>}
                                            </div>

                                            <div className="flex-1">
                                                <h4 className={`text-sm font-bold mb-0.5 leading-tight ${isActive ? "text-brand-blue" : "text-gray-700"}`}>
                                                    {module.title}
                                                </h4>
                                                <div className="flex items-center gap-2 text-xs opacity-70 font-medium">
                                                    <Clock size={10} />
                                                    <span>{module.duration}</span>
                                                </div>
                                            </div>

                                            {isLocked && <Lock size={14} className="self-center text-gray-300" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Certificate Button in Sidebar */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
                            <button
                                onClick={() => {
                                    if (completedModules.includes('final-exam')) {
                                        handleGetCertificate();
                                    } else {
                                        alert(isAr ? 'يرجى إكمال الاختبار النهائي أولاً!' : 'Please complete the final exam first!');
                                    }
                                }}
                                className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-sm ${completedModules.includes('final-exam')
                                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-lg hover:-translate-y-0.5"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                <Award size={18} />
                                {isAr ? 'احصل على الشهادة' : 'Claim Certificate'}
                            </button>

                            <button
                                onClick={() => {
                                    if (confirm(isAr ? 'هل أنت متأكد من إعادة تصفير التقدم؟' : 'Are you sure you want to reset your progress?')) {
                                        setCompletedModules([]);
                                        setActiveModuleId('intro');
                                    }
                                }}
                                className="w-full text-xs text-gray-400 hover:text-red-500 transition flex items-center justify-center gap-1 font-medium"
                            >
                                {isAr ? 'إعادة تعيين التقدم' : 'Reset Progress'}
                            </button>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <main className="flex-1 flex flex-col h-full relative overflow-y-auto bg-[#F8FAFC]">
                        {/* Mobile Header */}
                        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-20 shadow-sm">
                            <div className="flex items-center gap-2">
                                <BrandLogo className="w-8 h-8" />
                                <span className="font-bold text-gray-900">{isAr ? 'أكاديمية ميديسترا' : 'Medestra'}</span>
                            </div>
                            <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
                                <Menu size={24} />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12">
                            <div className="mb-8">
                                <button
                                    onClick={() => setView('landing')}
                                    className="flex items-center gap-2 text-gray-500 hover:text-brand-blue text-sm mb-6 transition font-medium"
                                >
                                    <div className={isAr ? 'rotate-180' : ''}><ArrowLeft size={16} /></div>
                                    {isAr ? 'العودة للرئيسية' : 'Back to Home'}
                                </button>

                                {activeModuleId === 'intro' ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase rounded-full">
                                                {isAr ? 'أهلاً بك' : 'Welcome'}
                                            </span>
                                            <span className="text-gray-500 text-sm flex items-center gap-1 font-medium">
                                                <Clock size={14} /> {isAr ? '5 دقائق قراءة' : '5 Mins Read'}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                            {isAr ? 'خارطة طريق' : 'Course'}{' '}
                                            <span className="text-brand-blue">{isAr ? 'الدورة' : 'Roadmap'}</span> {isAr ? 'والمقدمة' : '& Introduction'}
                                        </h1>
                                        <p className="text-gray-600 text-lg font-medium max-w-3xl leading-relaxed mb-12">
                                            {isAr
                                                ? 'مرحبًا بك في دورة اتقان فنون البيع الصيدلي الأخلاقي. هذا البرنامج الشامل مصمم لتحويل نهجك من مجرد صرف للدواء إلى استشارة موثوقة، مما يضمن نتائج صحية أفضل لمرضاك ونموًا مهنيًا لك.'
                                                : 'Welcome to the Master the Art of Ethical Pharmacy Sales course. This program is designed to transform your approach from transactional dispensing to consultative care.'}
                                        </p>

                                        <div className="max-w-2xl mx-auto mt-12">
                                            {COURSE_CONTENT.map((module, index) => {
                                                const isCompleted = completedModules.includes(module.id);
                                                const isNext = !isCompleted && (index === 0
                                                    ? completedModules.includes('intro')
                                                    : completedModules.includes(COURSE_CONTENT[index - 1].id));
                                                const isLocked = !isCompleted && !isNext;

                                                return (
                                                    <div key={module.id} className={`relative p${isAr ? 'r' : 'l'}-12 pb-10 last:pb-0 group`}>
                                                        {/* Connecting Line */}
                                                        {index !== COURSE_CONTENT.length - 1 && (
                                                            <div className={`absolute ${isAr ? 'right' : 'left'}-[15px] top-8 bottom-0 w-0.5 transition-colors duration-500 ${isCompleted ? "bg-emerald-500" : "bg-gray-100"
                                                                }`} />
                                                        )}

                                                        {/* Node Icon */}
                                                        <button
                                                            onClick={() => !isLocked && setActiveModuleId(module.id)}
                                                            disabled={isLocked}
                                                            className={`absolute ${isAr ? 'right' : 'left'}-0 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300 ${isCompleted
                                                                ? "bg-emerald-500 border-emerald-500 text-white scale-100"
                                                                : isNext
                                                                    ? "bg-white border-brand-blue text-brand-blue ring-4 ring-brand-blue/10 scale-110"
                                                                    : "bg-white border-gray-200 text-gray-300"
                                                                }`}
                                                        >
                                                            {isCompleted ? <CheckCircle size={16} strokeWidth={3} /> :
                                                                isLocked ? <Lock size={14} /> :
                                                                    <span className="text-xs font-bold">{index + 1}</span>}
                                                        </button>

                                                        {/* Content */}
                                                        <div
                                                            onClick={() => !isLocked && setActiveModuleId(module.id)}
                                                            className={`transition-all duration-300 cursor-pointer rounded-xl p-4 -mt-2 ${isNext ? "bg-white shadow-md border border-brand-blue/20 translate-x-2" : "hover:bg-gray-50 border border-transparent"
                                                                } ${isLocked ? "opacity-60 cursor-not-allowed" : ""}`}
                                                        >
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className={`text-xs font-bold uppercase tracking-wider ${isCompleted ? "text-emerald-500" : isNext ? "text-brand-blue" : "text-gray-400"
                                                                    }`}>
                                                                    {isAr ? 'الوحدة' : 'Module'} {index + 1}
                                                                </span>
                                                                <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                                                    <Clock size={12} /> {module.duration}
                                                                </span>
                                                            </div>

                                                            <h3 className={`text-lg font-bold mb-1 ${isCompleted ? "text-gray-800" : isNext ? "text-brand-blue" : "text-gray-600"
                                                                }`}>
                                                                {module.title}
                                                            </h3>

                                                            {isNext && (
                                                                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                                                                    {module.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {/* Certificate Node */}
                                            <div className={`relative p${isAr ? 'r' : 'l'}-12 pt-8`}>
                                                <div className={`absolute ${isAr ? 'right' : 'left'}-[15px] top-[-30px] bottom-10 w-0.5 transition-colors duration-500 ${allCompleted ? "bg-emerald-500" : "bg-gray-100"
                                                    }`} />

                                                <div className={`absolute ${isAr ? 'right' : 'left'}-0 top-2 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all ${allCompleted ? "bg-amber-400 border-amber-400 text-white animate-bounce" : "bg-white border-gray-200 text-gray-300"
                                                    }`}>
                                                    <Award size={16} />
                                                </div>

                                                <div className={`p-4 rounded-xl border-2 border-dashed transition-all ${allCompleted ? "border-amber-400 bg-amber-400/5" : "border-gray-200"
                                                    }`}>
                                                    <h3 className={`text-lg font-bold ${allCompleted ? "text-gray-900" : "text-gray-400"}`}>
                                                        {isAr ? 'شهادة الدورة' : 'Course Certificate'}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {allCompleted ? (isAr ? "جاهزة للاستلام!" : "Ready to claim!") : (isAr ? "أكمل كافة الوحدات لفتحها" : "Complete all modules to unlock.")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-12 flex justify-center">
                                            <button
                                                onClick={() => {
                                                    handleModuleComplete('intro');
                                                    setActiveModuleId(COURSE_CONTENT[0].id);
                                                }}
                                                className="px-8 py-4 bg-brand-blue text-white font-bold text-lg rounded-2xl hover:bg-blue-600 transition shadow-xl shadow-brand-blue/20 flex items-center gap-2 animate-pulse"
                                            >
                                                {isAr ? 'ابدأ الوحدة الأولى' : 'Start First Module'}
                                                <div className={isAr ? 'rotate-180' : ''}><ChevronRight size={20} /></div>
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase rounded-full">
                                                {isAr ? 'الوحدة' : 'Module'} {COURSE_CONTENT.findIndex(m => m.id === activeModuleId) + 1}
                                            </span>
                                            <span className="text-gray-500 text-sm flex items-center gap-1 font-medium">
                                                <Clock size={14} /> {activeModule.duration}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{activeModule.title}</h1>
                                        <p className="text-gray-600 text-lg font-medium max-w-3xl leading-relaxed">{activeModule.description}</p>
                                    </>
                                )}
                            </div>

                            {activeModuleId !== 'intro' && (
                                <>
                                    <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl mb-12 shadow-sm relative overflow-hidden">
                                        <div className={`absolute top-0 ${isAr ? 'left' : 'right'}-0 w-32 h-32 bg-amber-500/5 rounded-b${isAr ? 'r' : 'l'}-full -m-10`}></div>

                                        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-normal relative z-10">
                                            {activeModule.content.text.split('\n\n').map((paragraph, idx) => (
                                                <p key={idx} className="mb-6 last:mb-0">
                                                    {paragraph.split(/(\*\*.*?\*\*)/).map((part, i) =>
                                                        part.startsWith('**') && part.endsWith('**') ? (
                                                            <strong key={i} className="text-gray-900 font-bold">
                                                                {part.slice(2, -2)}
                                                            </strong>
                                                        ) : (
                                                            part
                                                        )
                                                    )}
                                                </p>
                                            ))}
                                        </div>

                                        <div className="mt-12 pt-8 border-t border-gray-100 relative z-10">
                                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                                <div className="bg-amber-500/20 p-2 rounded-lg text-amber-500">
                                                    <Star size={20} fill="currentColor" />
                                                </div>
                                                {isAr ? 'النقاط الأساسية' : 'Key Takeaways'}
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {activeModule.content.keyTakeaways.map((point, i) => (
                                                    <div key={i} className="flex items-start gap-3 bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-brand-blue/20 transition-colors">
                                                        <div className="bg-brand-blue text-white rounded-full p-1 mt-0.5 shrink-0">
                                                            <CheckCircle size={14} strokeWidth={3} />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700">{point}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quiz Section */}
                                    <div className="mb-20">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-brand-blue/10 p-2 rounded-xl text-brand-blue">
                                                    <Award size={24} />
                                                </div>
                                                {activeModule.id === 'final-exam' ? (isAr ? 'الاختبار النهائي' : 'Final Exam') : (isAr ? 'اختبار المعرفة' : 'Knowledge Check')}
                                            </div>

                                            {activeModule.id === 'final-exam' && examStarted && !quizCompleted && (
                                                <div className={`px-4 py-2 rounded-xl font-mono font-bold text-xl flex items-center gap-2 ${timeLeft < 60 ? "bg-red-100 text-red-600 animate-pulse" : "bg-gray-100 text-gray-700"
                                                    }`}>
                                                    <Clock size={20} />
                                                    {formatTime(timeLeft)}
                                                </div>
                                            )}
                                        </h3>

                                        {activeModule.id === 'final-exam' && !examStarted && !quizCompleted ? (
                                            <div className="bg-white border border-gray-200 p-12 rounded-3xl shadow-sm text-center">
                                                <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                                    <ShieldCheck size={48} className="text-brand-blue" />
                                                </div>
                                                <h3 className="text-3xl font-bold text-gray-900 mb-4">{isAr ? 'هل أنت مستعد للاختبار النهائي؟' : 'Ready for the Final Exam?'}</h3>
                                                <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
                                                    {isAr
                                                        ? 'لديك 5 دقائق لإكمال 5 حالات دراسية. هذا الاختبار يقيس قدرتك على تطبيق ما تعلمته في سيناريوهات واقعية.'
                                                        : "You have 5 minutes to complete 5 case studies. This exam tests your ability to apply what you've learned."}
                                                </p>
                                                <button
                                                    onClick={() => setExamStarted(true)}
                                                    className="px-10 py-4 bg-brand-blue text-white font-bold text-xl rounded-2xl hover:bg-blue-600 transition shadow-xl shadow-brand-blue/20 transform hover:-translate-y-1"
                                                >
                                                    {isAr ? 'ابدأ الاختبار الآن' : 'Start Exam Now'}
                                                </button>
                                            </div>
                                        ) : (
                                            !quizCompleted ? (
                                                <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm">
                                                    <div className="mb-8">
                                                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                                            <span>{isAr ? 'سؤال' : 'Question'} {currentQuestionIndex + 1} {isAr ? 'من' : 'of'} {activeModule.content.quiz.length}</span>
                                                            <span>{Math.round(((currentQuestionIndex) / activeModule.content.quiz.length) * 100)}% {isAr ? 'مكتمل' : 'Completed'}</span>
                                                        </div>
                                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-brand-blue transition-all duration-300 rounded-full"
                                                                style={{ width: `${((currentQuestionIndex) / activeModule.content.quiz.length) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    <AnimatePresence mode="wait">
                                                        <motion.div
                                                            key={currentQuestionIndex}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -20 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <h4 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
                                                                {activeModule.content.quiz[currentQuestionIndex].question}
                                                            </h4>

                                                            <div className="space-y-3 mb-8">
                                                                {activeModule.content.quiz[currentQuestionIndex].options.map((option, idx) => {
                                                                    const currentQuestionId = activeModule.content.quiz[currentQuestionIndex].id;
                                                                    const isSelected = quizAnswers[currentQuestionId] === idx;
                                                                    const isCorrect = activeModule.content.quiz[currentQuestionIndex].correctAnswer === idx;

                                                                    let buttonStyle = "border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600";

                                                                    if (showExplanation) {
                                                                        if (isCorrect) {
                                                                            buttonStyle = "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold ring-2 ring-emerald-500/20";
                                                                        } else if (isSelected && !isCorrect) {
                                                                            buttonStyle = "border-red-500 bg-red-50 text-red-700 opacity-50";
                                                                        } else {
                                                                            buttonStyle = "border-gray-100 opacity-40";
                                                                        }
                                                                    } else if (isSelected) {
                                                                        buttonStyle = "border-brand-blue bg-brand-blue/5 text-brand-blue font-bold ring-2 ring-brand-blue/20";
                                                                    }

                                                                    return (
                                                                        <button
                                                                            key={idx}
                                                                            onClick={() => !showExplanation && handleAnswerSelect(currentQuestionId, idx)}
                                                                            disabled={showExplanation}
                                                                            className={`w-full text-start p-5 rounded-2xl border-2 transition-all flex justify-between items-center text-lg ${buttonStyle}`}
                                                                        >
                                                                            <span>{option}</span>
                                                                            {showExplanation && isCorrect && <CheckCircle size={24} className="text-emerald-500" />}
                                                                            {showExplanation && isSelected && !isCorrect && <X size={24} className="text-red-500" />}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>

                                                            {showExplanation && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    className={`p-6 rounded-2xl mb-6 border-${isAr ? 'r' : 'l'}-4 ${quizAnswers[activeModule.content.quiz[currentQuestionIndex].id] === activeModule.content.quiz[currentQuestionIndex].correctAnswer
                                                                        ? "bg-emerald-50 border-emerald-500"
                                                                        : "bg-red-50 border-red-500"
                                                                        }`}
                                                                >
                                                                    <div className="flex items-start gap-3">
                                                                        <div className={`p-2 rounded-full shrink-0 ${quizAnswers[activeModule.content.quiz[currentQuestionIndex].id] === activeModule.content.quiz[currentQuestionIndex].correctAnswer
                                                                            ? "bg-emerald-200 text-emerald-700"
                                                                            : "bg-red-200 text-red-700"
                                                                            }`}>
                                                                            {quizAnswers[activeModule.content.quiz[currentQuestionIndex].id] === activeModule.content.quiz[currentQuestionIndex].correctAnswer
                                                                                ? <CheckCircle size={20} />
                                                                                : <X size={20} />
                                                                            }
                                                                        </div>
                                                                        <div>
                                                                            <h5 className={`font-bold text-lg mb-1 ${quizAnswers[activeModule.content.quiz[currentQuestionIndex].id] === activeModule.content.quiz[currentQuestionIndex].correctAnswer
                                                                                ? "text-emerald-800"
                                                                                : "text-red-800"
                                                                                }`}>
                                                                                {quizAnswers[activeModule.content.quiz[currentQuestionIndex].id] === activeModule.content.quiz[currentQuestionIndex].correctAnswer
                                                                                    ? (isAr ? "صحيح!" : "Correct!")
                                                                                    : (isAr ? "غير صحيح" : "Incorrect")
                                                                                }
                                                                            </h5>
                                                                            <p className="text-gray-700 leading-relaxed text-balance">
                                                                                {activeModule.content.quiz[currentQuestionIndex].explanation}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="mt-6 flex justify-end">
                                                                        {quizAnswers[activeModule.content.quiz[currentQuestionIndex].id] === activeModule.content.quiz[currentQuestionIndex].correctAnswer ? (
                                                                            <button
                                                                                onClick={handleNextQuestion}
                                                                                className="px-8 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-600 transition shadow-lg flex items-center gap-2"
                                                                            >
                                                                                <span>{currentQuestionIndex < activeModule.content.quiz.length - 1 ? (isAr ? 'السؤال التالي' : 'Next Question') : (isAr ? 'إنهاء الوحدة' : 'Finish Module')}</span>
                                                                                <div className={isAr ? 'rotate-180' : ''}><ChevronRight size={20} /></div>
                                                                            </button>
                                                                        ) : (
                                                                            <button
                                                                                onClick={handleNextQuestion}
                                                                                className="px-6 py-3 bg-white border-2 border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition"
                                                                            >
                                                                                {isAr ? 'حاول مرة أخرى' : 'Try Again'}
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl text-center">
                                                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                        <Award size={40} className="text-emerald-600" />
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-emerald-800 mb-2">{isAr ? 'تم إكمال الوحدة!' : 'Module Completed!'}</h3>
                                                    <p className="text-emerald-700 mb-8 max-w-md mx-auto">
                                                        {isAr
                                                            ? 'لقد أتقنت هذا الموضوع بنجاح. يمكنك الآن الانتقال للوحدة التالية أو مراجعة المحتوى.'
                                                            : "You've successfully mastered this topic. You can now proceed to the next module."}
                                                    </p>

                                                    <div className="flex justify-center gap-4">
                                                        <button
                                                            onClick={() => {
                                                                setQuizCompleted(false);
                                                                setCurrentQuestionIndex(0);
                                                                setQuizAnswers({});
                                                                setShowExplanation(false);
                                                            }}
                                                            className="px-6 py-3 bg-white border border-emerald-200 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 transition"
                                                        >
                                                            {isAr ? 'مراجعة الاختبار' : 'Review Quiz'}
                                                        </button>

                                                        {COURSE_CONTENT.findIndex(m => m.id === activeModuleId) < COURSE_CONTENT.length - 1 && (
                                                            <button
                                                                onClick={() => {
                                                                    const currentIndex = COURSE_CONTENT.findIndex(m => m.id === activeModuleId);
                                                                    setActiveModuleId(COURSE_CONTENT[currentIndex + 1].id);
                                                                }}
                                                                className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-lg flex items-center gap-2"
                                                            >
                                                                <span>{isAr ? 'الوحدة التالية' : 'Next Module'}</span>
                                                                <div className={isAr ? 'rotate-180' : ''}><ChevronRight size={20} /></div>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </main>
                </div>
            )}

            {/* Name Input Modal */}
            <AnimatePresence>
                {nameInputOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl border-4 border-brand-blue/10"
                        >
                            <h2 className="text-3xl font-black text-gray-900 mb-2">{isAr ? 'لقد فعلتها! 🎉' : 'You Did It! 🎉'}</h2>
                            <p className="text-gray-600 mb-6 font-medium">{isAr ? 'أدخل اسمك لاستخراج شهادتك الرسمية.' : 'Enter your name to generate your official certificate.'}</p>

                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => {
                                    if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                                        setUserName(e.target.value);
                                    }
                                }}
                                placeholder={isAr ? "اسمك الكامل (بالإنجليزي فقط)" : "Your Full Name (English Only)"}
                                className={`w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-brand-blue outline-none transition mb-6 text-lg font-bold ${isAr ? 'text-right' : 'text-left'}`}
                                autoFocus
                                dir="ltr"
                            />

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setNameInputOpen(false)}
                                    className="flex-1 py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition"
                                >
                                    {isAr ? 'إلغاء' : 'Cancel'}
                                </button>
                                <button
                                    onClick={() => {
                                        if (userName.trim().length > 2) {
                                            setNameInputOpen(false);
                                            setShowCertificate(true);
                                        }
                                    }}
                                    disabled={userName.trim().length <= 2}
                                    className="flex-[2] py-4 bg-brand-blue text-white font-bold rounded-2xl hover:bg-blue-600 transition shadow-lg shadow-brand-blue/20 disabled:opacity-50"
                                >
                                    {isAr ? 'إصدار الشهادة' : 'Issue Certificate'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Certificate Display */}
            {showCertificate && (
                <Certificate
                    studentName={userName}
                    courseName={isAr ? "فنون و اخلاقيات بيع الصيدلية" : "Pharmacy Sales Arts & Ethics"}
                    date={new Date().toLocaleDateString(isAr ? 'en-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    onClose={() => setShowCertificate(false)}
                />
            )}
        </div>
    );
}
