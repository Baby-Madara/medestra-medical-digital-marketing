import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { COURSE_CONTENT, Module } from '@/data/course';
import { Certificate } from '@/components/Certificate';
import { BrandLogo } from '@/components/BrandLogo';

export default function App() {
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
  const allCompleted = completedModules.length === COURSE_CONTENT.length;

  // Reset quiz state when module changes
  useEffect(() => {
    if (activeModuleId === 'intro') return;
    setQuizAnswers({});
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setQuizCompleted(false);
    setExamStarted(false);
    setTimeLeft(300);
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
    
    // Auto advance to next module if available
    const currentIndex = COURSE_CONTENT.findIndex(m => m.id === id);
    if (currentIndex < COURSE_CONTENT.length - 1) {
      // Optional: Auto-advance after a delay or let user click next
    }
  };

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    if (showExplanation) return; // Prevent changing answer after submission

    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanation(true); // Show explanation immediately after selection
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
      // If incorrect, they stay on the same question but explanation is shown
      // They can retry by resetting the explanation state? 
      // Requirement: "appear when I answer correctly moves me to the next question"
      // So if incorrect, they should probably see why, and then try again?
      // Let's keep explanation open. They need to select the correct one to proceed?
      // Or maybe we just reset the state to allow re-selection?
      // Let's allow re-selection if incorrect.
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
    <div className="min-h-screen bg-brand-bg text-gray-800 selection:bg-brand-blue selection:text-white">
      
      {/* Landing View */}
      {view === 'landing' && (
        <div className="relative min-h-screen flex flex-col overflow-hidden">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-brand-yellow/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
          
          <nav className="relative z-20 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
              <BrandLogo className="w-12 h-12" />
              <span className="font-display font-bold text-2xl tracking-tight text-gray-900">Medestra Academy</span>
            </div>
          </nav>

          <main className="relative z-20 flex-1 flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto mt-10 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce">
                 <span className="inline-block py-1 px-4 rounded-full bg-brand-yellow text-brand-blue text-xs font-bold uppercase tracking-wider shadow-md transform -rotate-2">
                  New Course!
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight text-gray-900">
                Master the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-red to-brand-yellow">Ethical Pharmacy Sales</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                Level up your sales skills, master patient consultation, and unlock your full potential with our interactive masterclass.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => setView('course')}
                  className="px-8 py-4 bg-brand-blue text-white font-bold text-lg rounded-2xl hover:bg-blue-500 transition shadow-xl shadow-blue-500/20 flex items-center gap-2 group transform hover:-translate-y-1"
                >
                  Start Your Journey
                  <div className="bg-white/20 rounded-full p-1">
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Stats / Trust */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              {[
                { label: 'Modules', value: '5', icon: BookOpen, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
                { label: 'Duration', value: '5 Hours', icon: Clock, color: 'text-brand-red', bg: 'bg-brand-red/10' },
                { label: 'Level', value: 'Advanced', icon: Zap, color: 'text-brand-yellow', bg: 'bg-brand-yellow/10' },
                { label: 'Certificate', value: 'Included', icon: Award, color: 'text-brand-green', bg: 'bg-brand-green/10' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4", stat.bg)}>
                    <stat.icon className={stat.color} size={24} />
                  </div>
                  <div className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* Course View */}
      {view === 'course' && (
        <div className="flex h-screen overflow-hidden bg-gray-50">
          
          {/* Sidebar */}
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: sidebarOpen ? 0 : -320 }}
            className="fixed md:relative z-30 w-80 h-full bg-white border-r border-gray-200 flex flex-col shrink-0 shadow-xl"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
                <BrandLogo className="w-10 h-10" />
                <span className="font-display font-bold text-xl tracking-tight text-gray-900">Medestra Academy</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex justify-between text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">
                <span>Your Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brand-blue to-brand-green transition-all duration-500 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <div className="px-6 pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Curriculum</div>
              <div className="space-y-2 px-3">
                {/* Introduction Item */}
                <button
                  onClick={() => setActiveModuleId('intro')}
                  className={cn(
                    "w-full px-4 py-3 flex items-center gap-3 text-left transition-all rounded-xl relative group",
                    activeModuleId === 'intro' ? "bg-brand-blue/10 text-brand-blue" : "hover:bg-gray-100 text-gray-600"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm",
                    activeModuleId === 'intro' ? "bg-brand-blue text-white" : "bg-white border-2 border-gray-200 text-gray-400"
                  )}>
                    <BookOpen size={14} />
                  </div>
                  <span className={cn("text-sm font-bold", activeModuleId === 'intro' ? "text-brand-blue" : "text-gray-700")}>
                    Introduction & Roadmap
                  </span>
                </button>

                {COURSE_CONTENT.map((module, index) => {
                  const isActive = activeModuleId === module.id;
                  const isCompleted = completedModules.includes(module.id);
                  // Unlock all modules for editing/testing purposes as requested
                  const isLocked = false; 

                  return (
                    <button
                      key={module.id}
                      onClick={() => !isLocked && setActiveModuleId(module.id)}
                      disabled={isLocked}
                      className={cn(
                        "w-full px-4 py-3 flex items-start gap-3 text-left transition-all rounded-xl relative group",
                        isActive ? "bg-brand-blue/10 text-brand-blue" : "hover:bg-gray-100 text-gray-600",
                        isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      )}
                    >
                      <div className={cn(
                        "mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm",
                        isCompleted 
                          ? "bg-brand-green text-white" 
                          : isActive 
                            ? "bg-brand-blue text-white" 
                            : "bg-white border-2 border-gray-200 text-gray-400"
                      )}>
                        {isCompleted ? <CheckCircle size={14} /> : <span className="text-[10px] font-bold">{index + 1}</span>}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className={cn("text-sm font-bold mb-0.5 leading-tight", isActive ? "text-brand-blue" : "text-gray-700")}>
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
                onClick={handleGetCertificate}
                className={cn(
                  "w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-sm",
                  "bg-gradient-to-r from-brand-yellow to-orange-400 text-white hover:shadow-lg hover:-translate-y-0.5" 
                )}
              >
                <Award size={18} />
                Claim Certificate
              </button>
              
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to reset your progress?')) {
                    setCompletedModules([]);
                    setActiveModuleId(COURSE_CONTENT[0].id);
                  }
                }}
                className="w-full text-xs text-gray-400 hover:text-brand-red transition flex items-center justify-center gap-1 font-medium"
              >
                Reset Progress
              </button>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col h-full relative overflow-y-auto bg-[#F8FAFC]">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-20 shadow-sm">
              <div className="flex items-center gap-2">
                <BrandLogo className="w-8 h-8" />
                <span className="font-display font-bold text-gray-900">Medestra Academy</span>
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
                  <ArrowLeft size={16} /> Back to Home
                </button>

                {activeModuleId === 'intro' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-brand-yellow/10 text-brand-yellow text-xs font-bold uppercase rounded-full">
                        Welcome
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-1 font-medium">
                        <Clock size={14} /> 5 Mins Read
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-display font-black text-gray-900 mb-6 leading-tight">
                      Course <span className="text-brand-blue">Roadmap</span> & Introduction
                    </h1>
                    <p className="text-gray-600 text-lg font-medium max-w-3xl leading-relaxed mb-12">
                      Welcome to the <strong>Master the Art of Ethical Pharmacy Sales</strong> course. This comprehensive program is designed to transform your approach from transactional dispensing to consultative care, ensuring better health outcomes for your patients and professional growth for you.
                    </p>

                    {/* Interactive Roadmap - Simplified */}
                    <div className="max-w-2xl mx-auto mt-12">
                      {COURSE_CONTENT.map((module, index) => {
                        const isCompleted = completedModules.includes(module.id);
                        const isNext = !isCompleted && (index === 0 || completedModules.includes(COURSE_CONTENT[index - 1].id));
                        const isLocked = !isCompleted && !isNext;
                        
                        return (
                          <div key={module.id} className="relative pl-12 pb-10 last:pb-0 group">
                            {/* Connecting Line */}
                            {index !== COURSE_CONTENT.length - 1 && (
                              <div className={cn(
                                "absolute left-[15px] top-8 bottom-0 w-0.5 transition-colors duration-500",
                                isCompleted ? "bg-brand-green" : "bg-gray-100"
                              )} />
                            )}

                            {/* Node Icon */}
                            <button
                              onClick={() => !isLocked && setActiveModuleId(module.id)}
                              disabled={isLocked}
                              className={cn(
                                "absolute left-0 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300",
                                isCompleted 
                                  ? "bg-brand-green border-brand-green text-white scale-100" 
                                  : isNext
                                    ? "bg-white border-brand-blue text-brand-blue ring-4 ring-brand-blue/10 scale-110"
                                    : "bg-white border-gray-200 text-gray-300"
                              )}
                            >
                              {isCompleted ? <CheckCircle size={16} strokeWidth={3} /> : 
                               isLocked ? <Lock size={14} /> : 
                               <span className="text-xs font-bold">{index + 1}</span>}
                            </button>

                            {/* Content */}
                            <div 
                              onClick={() => !isLocked && setActiveModuleId(module.id)}
                              className={cn(
                                "transition-all duration-300 cursor-pointer rounded-xl p-4 -mt-2",
                                isNext ? "bg-white shadow-md border border-brand-blue/20 translate-x-2" : "hover:bg-gray-50 border border-transparent",
                                isLocked ? "opacity-60 cursor-not-allowed" : ""
                              )}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className={cn(
                                  "text-xs font-bold uppercase tracking-wider",
                                  isCompleted ? "text-brand-green" : isNext ? "text-brand-blue" : "text-gray-400"
                                )}>
                                  Module {index + 1}
                                </span>
                                <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                  <Clock size={12} /> {module.duration}
                                </span>
                              </div>
                              
                              <h3 className={cn(
                                "text-lg font-bold mb-1",
                                isCompleted ? "text-gray-800" : isNext ? "text-brand-blue" : "text-gray-600"
                              )}>
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
                      <div className="relative pl-12 pt-8">
                         {/* Line from last module */}
                         <div className={cn(
                            "absolute left-[15px] top-[-30px] bottom-10 w-0.5 transition-colors duration-500",
                            allCompleted ? "bg-brand-green" : "bg-gray-100"
                        )} />

                        <div className={cn(
                          "absolute left-0 top-2 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all",
                          allCompleted ? "bg-brand-yellow border-brand-yellow text-white animate-bounce" : "bg-white border-gray-200 text-gray-300"
                        )}>
                          <Award size={16} />
                        </div>
                        
                        <div className={cn(
                          "p-4 rounded-xl border-2 border-dashed transition-all",
                          allCompleted ? "border-brand-yellow bg-brand-yellow/5" : "border-gray-200"
                        )}>
                          <h3 className={cn("text-lg font-bold", allCompleted ? "text-gray-900" : "text-gray-400")}>
                            Course Certificate
                          </h3>
                          <p className="text-sm text-gray-500">
                            {allCompleted ? "Ready to claim!" : "Complete all modules to unlock."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 flex justify-center">
                      <button
                        onClick={() => setActiveModuleId(COURSE_CONTENT[0].id)}
                        className="px-8 py-4 bg-brand-blue text-white font-bold text-lg rounded-2xl hover:bg-blue-600 transition shadow-xl shadow-blue-500/20 flex items-center gap-2 animate-pulse"
                      >
                        Start First Module <ChevronRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase rounded-full">
                        Module {COURSE_CONTENT.findIndex(m => m.id === activeModuleId) + 1}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-1 font-medium">
                        <Clock size={14} /> {activeModule.duration}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-4">{activeModule.title}</h1>
                    <p className="text-gray-600 text-lg font-medium max-w-3xl leading-relaxed">{activeModule.description}</p>
                  </>
                )}
              </div>

              {/* Reading Content - Only show if NOT intro */}
              {activeModuleId !== 'intro' && (
                <>
                  <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl mb-12 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-full -mr-10 -mt-10"></div>
                    
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
                      <h3 className="text-xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="bg-brand-yellow/20 p-2 rounded-lg text-brand-yellow">
                          <Star size={20} fill="currentColor" />
                        </div>
                        Key Takeaways
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
                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3 justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-brand-red/10 p-2 rounded-xl text-brand-red">
                          <Award size={24} />
                        </div>
                        {activeModule.id === 'final-exam' ? 'Final Exam' : 'Knowledge Check'}
                      </div>
                      
                      {/* Timer Display */}
                      {activeModule.id === 'final-exam' && examStarted && !quizCompleted && (
                        <div className={cn(
                          "px-4 py-2 rounded-xl font-mono font-bold text-xl flex items-center gap-2",
                          timeLeft < 60 ? "bg-red-100 text-red-600 animate-pulse" : "bg-gray-100 text-gray-700"
                        )}>
                          <Clock size={20} />
                          {formatTime(timeLeft)}
                        </div>
                      )}
                    </h3>
                    
                    {/* Final Exam Start Screen */}
                    {activeModule.id === 'final-exam' && !examStarted && !quizCompleted ? (
                      <div className="bg-white border border-gray-200 p-12 rounded-3xl shadow-sm text-center">
                        <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <ShieldCheck size={48} className="text-brand-blue" />
                        </div>
                        <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">Ready for the Final Exam?</h3>
                        <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
                          You have <strong>5 minutes</strong> to complete <strong>5 case study questions</strong>. 
                          This exam tests your ability to apply what you've learned in real-world scenarios.
                        </p>
                        <button 
                          onClick={() => setExamStarted(true)}
                          className="px-10 py-4 bg-brand-blue text-white font-bold text-xl rounded-2xl hover:bg-blue-600 transition shadow-xl shadow-blue-500/20 transform hover:-translate-y-1"
                        >
                          Start Exam Now
                        </button>
                      </div>
                    ) : (
                      !quizCompleted ? (
                        <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm">
                        {/* Progress Bar for Quiz */}
                        <div className="mb-8">
                          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                            <span>Question {currentQuestionIndex + 1} of {activeModule.content.quiz.length}</span>
                            <span>{Math.round(((currentQuestionIndex) / activeModule.content.quiz.length) * 100)}% Completed</span>
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
                                    buttonStyle = "border-green-500 bg-green-50 text-green-700 font-bold ring-2 ring-green-500/20";
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
                                    className={cn(
                                      "w-full text-left p-5 rounded-2xl border-2 transition-all flex justify-between items-center text-lg",
                                      buttonStyle
                                    )}
                                  >
                                    <span>{option}</span>
                                    {showExplanation && isCorrect && <CheckCircle size={24} className="text-green-500" />}
                                    {showExplanation && isSelected && !isCorrect && <X size={24} className="text-red-500" />}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Explanation & Next Button */}
                            {showExplanation && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                  "p-6 rounded-2xl mb-6 border-l-4",
                                  quizAnswers[activeModule.content.quiz[currentQuestionIndex].id] === activeModule.content.quiz[currentQuestionIndex].correctAnswer
                                    ? "bg-green-50 border-green-500"
                                    : "bg-red-50 border-red-500"
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={cn(
                                    "p-2 rounded-full shrink-0",
                                    quizAnswers[activeModule.content.quiz[currentQuestionIndex].id] === activeModule.content.quiz[currentQuestionIndex].correctAnswer
                                      ? "bg-green-200 text-green-700"
                                      : "bg-red-200 text-red-700"
                                  )}>
                                    {quizAnswers[activeModule.content.quiz[currentQuestionIndex].id] === activeModule.content.quiz[currentQuestionIndex].correctAnswer
                                      ? <CheckCircle size={20} />
                                      : <X size={20} />
                                    }
                                  </div>
                                  <div>
                                    <h5 className={cn(
                                      "font-bold text-lg mb-1",
                                      quizAnswers[activeModule.content.quiz[currentQuestionIndex].id] === activeModule.content.quiz[currentQuestionIndex].correctAnswer
                                        ? "text-green-800"
                                        : "text-red-800"
                                    )}>
                                      {quizAnswers[activeModule.content.quiz[currentQuestionIndex].id] === activeModule.content.quiz[currentQuestionIndex].correctAnswer
                                        ? "Correct!"
                                        : "Incorrect"
                                      }
                                    </h5>
                                    <p className="text-gray-700 leading-relaxed">
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
                                      {currentQuestionIndex < activeModule.content.quiz.length - 1 ? "Next Question" : "Finish Module"} <ChevronRight size={20} />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={handleNextQuestion}
                                      className="px-6 py-3 bg-white border-2 border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition"
                                    >
                                      Try Again
                                    </button>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 p-8 rounded-3xl text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Award size={40} className="text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-800 mb-2">Module Completed!</h3>
                        <p className="text-green-700 mb-8 max-w-md mx-auto">
                          You've successfully mastered this topic. You can now proceed to the next module or review the content.
                        </p>
                        
                        <div className="flex justify-center gap-4">
                          <button 
                            onClick={() => {
                              setQuizCompleted(false);
                              setCurrentQuestionIndex(0);
                              setQuizAnswers({});
                              setShowExplanation(false);
                            }}
                            className="px-6 py-3 bg-white border border-green-200 text-green-700 font-bold rounded-xl hover:bg-green-100 transition"
                          >
                            Review Quiz
                          </button>
                          
                          {COURSE_CONTENT.findIndex(m => m.id === activeModuleId) < COURSE_CONTENT.length - 1 && (
                            <button 
                              onClick={() => {
                                const currentIndex = COURSE_CONTENT.findIndex(m => m.id === activeModuleId);
                                setActiveModuleId(COURSE_CONTENT[currentIndex + 1].id);
                              }}
                              className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg flex items-center gap-2"
                            >
                              Next Module <ChevronRight size={20} />
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
              <h2 className="text-3xl font-display font-black text-gray-900 mb-2">You Did It! 🎉</h2>
              <p className="text-gray-600 mb-6 font-medium">Enter your name to generate your official certificate.</p>
              
              <input 
                type="text" 
                value={userName}
                onChange={(e) => {
                  // Allow only English letters and spaces
                  if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                    setUserName(e.target.value);
                  }
                }}
                placeholder="Your Full Name (English Only)"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-gray-900 focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition mb-6 font-bold text-lg"
                autoFocus
              />
              
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setNameInputOpen(false)}
                  className="px-6 py-3 text-gray-500 hover:text-gray-800 transition font-bold"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (userName.trim()) {
                      // Format name: Capitalize first letter of each word
                      const formattedName = userName
                        .toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                      
                      setUserName(formattedName);
                      setNameInputOpen(false);
                      setShowCertificate(true);
                    }
                  }}
                  className="px-8 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/30"
                >
                  Get Certificate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      {showCertificate && (
        <Certificate 
          studentName={userName} 
          courseName="Master the Art of Ethical Pharmacy Sales"
          date={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}
