import React, { useState, useEffect } from 'react';
import { COURSE_CONTENT_AR, getCourseContent } from './constants/meta-ads';
import { InteractionType, LevelData } from './types/meta-ads';
import { QuizComponent } from './components/meta-ads/QuizComponent';
import { DragDropComponent } from './components/meta-ads/DragDropComponent';
import { InteractiveChart } from './components/meta-ads/InteractiveChart';
import { FinalChallenge } from './components/meta-ads/FinalChallenge';
import { InputChallenge } from './components/meta-ads/InputChallenge';
import { PixelInstallationGuide } from './components/meta-ads/PixelInstallationGuide';
import { AiTutor } from './components/meta-ads/AiTutor';
import { Certificate } from './components/meta-ads/Certificate';
import { 
  LayoutDashboard, CheckCircle, Lock, BookOpen, ChevronLeft, Menu, Trophy, PlayCircle, 
  Rocket, Sparkles, ArrowRight, Award, User, Languages
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

// --- Welcome Screen Component ---
const WelcomeScreen = ({ onStart }: { onStart: () => void }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative overflow-x-hidden" dir={isAr ? "rtl" : "ltr"}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-transparent -z-10"></div>
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-yellow-100 rounded-full blur-3xl opacity-30 animate-pulse-slow delay-1000"></div>
      
      {/* Navbar Placeholder / Back to Main */}
      <div className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} z-50`}>
        <Link to="/" className="text-slate-500 hover:text-meta-blue flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur rounded-lg border border-slate-100 shadow-sm transition-all">
          <ArrowRight className={`w-4 h-4 ${isAr ? '' : 'rotate-180'}`} />
          <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center z-10">
        
        {/* Logo & Header */}
        <div className="mb-8 animate-fade-in flex flex-col items-center">
           <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity rounded-full"></div>
              <img 
                src="https://drive.google.com/thumbnail?id=1sBR2GW-CwhHfpREEl8cXdYX3tNbBzb6g&sz=w200" 
                alt="Meta Ads Master Logo" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-xl relative z-10 transform transition-transform duration-500 hover:scale-105 hover:rotate-3"
                referrerPolicy="no-referrer"
              />
           </div>
           <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight leading-tight">
             Meta Ads <span className="text-transparent bg-clip-text bg-gradient-to-r from-meta-blue to-blue-600">Master Class</span>
           </h1>
           <p className="text-lg md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
             {isAr ? 'رحلتك التفاعلية لاحتراف إعلانات فيسبوك وانستجرام.' : 'Your interactive journey to mastering Facebook and Instagram Ads.'} <br className="hidden md:block"/>
             {isAr ? 'تعلم بالممارسة، نافس نفسك، واستعن بالذكاء الاصطناعي.' : 'Learn by doing, challenge yourself, and get AI assistance.'}
           </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-4 text-meta-blue shadow-inner group-hover:scale-110 group-hover:from-meta-blue group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                <LayoutDashboard className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">{isAr ? 'تعلم تطبيقي' : 'Practical Learning'}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{isAr ? 'محاكاة حقيقية لواجهة مدير الإعلانات وسيناريوهات واقعية لاتخاذ القرارات الاستراتيجية.' : 'Real simulation of Ads Manager interface and realistic scenarios for strategic decision making.'}</p>
           </div>
           
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-purple-200 transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center mb-4 text-purple-600 shadow-inner group-hover:scale-110 group-hover:from-purple-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">{isAr ? 'مساعد ذكي (AI)' : 'AI Assistant'}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{isAr ? 'احصل على إجابات فورية، شرح للمصطلحات، وتوجيه شخصي من المساعد الذكي أثناء التعلم.' : 'Get instant answers, terminology explanations, and personal guidance from the AI assistant.'}</p>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-yellow-200 transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl flex items-center justify-center mb-4 text-orange-500 shadow-inner group-hover:scale-110 group-hover:from-orange-500 group-hover:to-yellow-500 group-hover:text-white transition-all duration-300">
                <Trophy className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-800">{isAr ? 'نظام المستويات' : 'Level System'}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{isAr ? 'نظام تنافسي ممتع. تجاوز التحديات لفتح المستويات الجديدة والحصول على شهادة الإتقان.' : 'Fun competitive system. Pass challenges to unlock new levels and earn the Mastery Certificate.'}</p>
           </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={onStart}
          className="group relative px-8 py-4 bg-meta-blue text-white text-xl font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-bounce-in"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="flex items-center gap-3 relative z-10">
            <span>{isAr ? 'ابدأ المسار التعليمي' : 'Start Learning Path'}</span>
            <Rocket className={`w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isAr ? '' : 'rotate-180'}`} />
          </div>
        </button>

        <p className="mt-6 text-sm text-slate-400 font-medium">{isAr ? 'الإصدار التجريبي 1.0 • متوافق مع تحديثات Meta 2026' : 'Beta v1.0 • Compatible with Meta 2026 Updates'}</p>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const MetaAdsPage = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState(1); // Start with only level 1 unlocked
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const isAr = language === 'ar';

  const COURSE_CONTENT = getCourseContent(language as 'ar' | 'en');

  // Certificate State
  const [showCertForm, setShowCertForm] = useState(false);
  const [showCertPreview, setShowCertPreview] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (hasStarted) {
      window.scrollTo(0, 0);
      // If we are revisiting a previous level (one that is lower than our max unlocked level),
      // consider it complete so the user can see the "Next" button without solving again.
      // Otherwise (for new levels), they must solve it.
      if (currentLevelId < unlockedLevels) {
        setIsLevelComplete(true);
      } else {
        setIsLevelComplete(false);
      }
    }
  }, [currentLevelId, hasStarted, unlockedLevels]);

  const currentLevel = COURSE_CONTENT.find(l => l.id === currentLevelId) || COURSE_CONTENT[0];
  const isFinalLevel = currentLevel.id === COURSE_CONTENT.length;

  const handleLevelComplete = (success: boolean) => {
    if (success) {
      setIsLevelComplete(true);
      if (currentLevelId === unlockedLevels) {
        setUnlockedLevels(prev => Math.min(prev + 1, COURSE_CONTENT.length + 1)); // +1 to ensure max level is markable as done
      }
    }
  };

  const nextLevel = () => {
    if (currentLevelId < COURSE_CONTENT.length) {
      setCurrentLevelId(prev => prev + 1);
    }
  };

  const handleCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim().length > 2) {
      setShowCertForm(false);
      setShowCertPreview(true);
    }
  };

  const renderInteraction = (level: LevelData) => {
    // We add key={level.id} to force React to remount the component when the level changes,
    // ensuring the internal state (like selected answers) is reset.
    switch (level.interactionType) {
      case InteractionType.QUIZ:
      case InteractionType.SCENARIO:
        return (
          <QuizComponent
            key={level.id}
            question={level.interactionData.question}
            options={level.interactionData.options}
            onComplete={handleLevelComplete}
          />
        );
      case InteractionType.DRAG_DROP:
        return (
          <DragDropComponent
            key={level.id}
            instruction={level.interactionData.instruction}
            items={level.interactionData.items}
            zones={level.interactionData.zones}
            onComplete={handleLevelComplete}
          />
        );
      case InteractionType.CHART:
        return (
           <InteractiveChart 
              key={level.id}
              instruction={level.interactionData.instruction}
              correctDayIndex={level.interactionData.correctDayIndex}
              feedback={level.interactionData.feedback}
              onComplete={handleLevelComplete}
           />
        );
      case InteractionType.INPUT:
        return (
           <InputChallenge 
              key={level.id}
              prompt={level.interactionData.prompt}
              placeholder={level.interactionData.placeholder}
              expectedKeywords={level.interactionData.expectedKeywords}
              successMessage={level.interactionData.successMessage}
              onComplete={handleLevelComplete}
           />
        );
      case InteractionType.FINAL:
        return (
            <FinalChallenge 
                key={level.id}
                steps={level.interactionData.steps}
                onComplete={handleLevelComplete}
            />
        );
      default:
        return <div>Unknown Interaction</div>;
    }
  };

  if (!hasStarted) {
    return <WelcomeScreen onStart={() => setHasStarted(true)} />;
  }

  return (
    <>
      <div className="min-h-screen md:h-screen bg-slate-50 flex flex-col md:flex-row font-sans md:overflow-hidden animate-fade-in" dir={isAr ? "rtl" : "ltr"}>
        {/* Background decoration */}
        <div className={`fixed top-0 ${isAr ? 'left-0' : 'right-0'} w-full h-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-transparent pointer-events-none z-0`}></div>
  
        {/* Certificate Preview Modal */}
        {showCertPreview && (
          <Certificate 
            recipientName={userName} 
            onClose={() => setShowCertPreview(false)} 
          />
        )}
  
        {/* Certificate Name Input Modal */}
        {showCertForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-bounce-in relative">
              <button 
                onClick={() => setShowCertForm(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <User className="w-5 h-5" />
              </button>
              <div className="text-center mb-6">
                 <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600">
                   <Award className="w-8 h-8" />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-800">{isAr ? 'إصدار الشهادة' : 'Issue Certificate'}</h3>
                 <p className="text-slate-500 mt-2">{isAr ? 'يرجى كتابة اسمك الثلاثي كما تريد أن يظهر في الشهادة.' : 'Please enter your full name as you want it to appear on the certificate.'}</p>
              </div>
              
              <form onSubmit={handleCertSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-bold text-slate-700 mb-2 ${isAr ? 'text-right' : 'text-left'}`}>{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
                  <input 
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={isAr ? "مثال: أحمد محمد علي" : "Ex: John Doe"}
                    className={`w-full p-3 rounded-xl border border-slate-300 focus:border-meta-blue focus:ring-2 focus:ring-meta-blue/20 outline-none transition-all ${isAr ? 'text-right' : 'text-left'}`}
                    required
                    minLength={3}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-meta-blue text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  <span>{isAr ? 'إنشاء الشهادة' : 'Generate Certificate'}</span>
                  <Sparkles className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}
  
        {/* Mobile Header */}
        <div className="md:hidden bg-white/80 backdrop-blur-md border-b p-4 flex justify-between items-center sticky top-0 z-40 shadow-sm h-[74px]">
           <button 
               onClick={() => setHasStarted(false)}
               className="font-extrabold text-slate-800 flex items-center gap-3 text-lg hover:opacity-75 transition-opacity"
           >
              <img 
                 src="https://drive.google.com/thumbnail?id=1sBR2GW-CwhHfpREEl8cXdYX3tNbBzb6g&sz=w200" 
                 alt="Meta Master Logo" 
                 className="w-8 h-8 object-contain"
                 referrerPolicy="no-referrer"
              />
              <span>Meta Master</span>
           </button>
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Menu className="w-6 h-6 text-slate-600" />
           </button>
        </div>
  
        {/* Sidebar */}
        <aside className={`
          fixed bottom-0 top-[74px] md:top-0 ${isAr ? 'right-0 border-l' : 'left-0 border-r'} z-30 w-72 bg-white border-slate-200 shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-full flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : (isAr ? 'translate-x-full' : '-translate-x-full')}
        `}>
          <div className="p-6 border-b border-slate-100 hidden md:block">
            <button 
               onClick={() => setHasStarted(false)}
               className={`text-xl font-extrabold text-slate-800 flex items-center gap-3 w-full ${isAr ? 'text-right' : 'text-left'} hover:opacity-75 transition-opacity`}
            >
               <img 
                 src="https://drive.google.com/thumbnail?id=1sBR2GW-CwhHfpREEl8cXdYX3tNbBzb6g&sz=w200" 
                 alt="Meta Ads Master Logo" 
                 className="w-12 h-12 object-contain drop-shadow-sm hover:scale-105 transition-transform"
                 referrerPolicy="no-referrer"
               />
               <span>Meta Ads Master</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {/* Back link */}
            <Link to="/" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-meta-blue hover:bg-blue-50 rounded-lg mb-4">
              <ArrowRight className={`w-4 h-4 ${isAr ? '' : 'rotate-180'}`} />
              <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </Link>
  
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{isAr ? 'المسار التعليمي' : 'Learning Path'}</p>
            {COURSE_CONTENT.map((level) => {
              const isUnlocked = level.id <= unlockedLevels;
              const isActive = level.id === currentLevelId;
              const isCompleted = level.id < unlockedLevels;
  
              return (
                <button
                  key={level.id}
                  disabled={!isUnlocked}
                  onClick={() => {
                    setCurrentLevelId(level.id);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  className={`group w-full ${isAr ? 'text-right' : 'text-left'} p-3 rounded-xl flex items-center gap-3 transition-all duration-200 relative overflow-hidden
                    ${isActive 
                      ? 'bg-meta-light text-meta-blue font-bold shadow-sm ring-1 ring-blue-100' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                    ${!isUnlocked ? 'opacity-60 cursor-not-allowed grayscale' : ''}
                  `}
                >
                  {isActive && <div className={`absolute ${isAr ? 'right-0' : 'left-0'} top-0 bottom-0 w-1 bg-meta-blue ${isAr ? 'rounded-l-full' : 'rounded-r-full'}`}></div>}
                  
                  <div className={`
                      w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors
                      ${isActive ? 'bg-white text-meta-blue shadow-sm' : isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}
                  `}>
                      {isCompleted && !isActive ? <CheckCircle className="w-5 h-5" /> : isUnlocked ? <span className="font-bold font-mono">{level.id}</span> : <Lock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 truncate text-right">
                    <span className="block truncate">{level.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
  
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-md">
                      <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                      <p className="text-sm font-bold text-slate-800">{isAr ? 'مستواك الحالي' : 'Current Status'}</p>
                      <p className="text-xs text-slate-500">
                        {unlockedLevels === 1 ? (isAr ? 'مبتدئ جديد' : 'Newbie') : unlockedLevels > 8 ? (isAr ? 'خبير إعلانات' : 'Ads Expert') : (isAr ? 'مسوق طموح' : 'Aspiring Marketer')}
                      </p>
                  </div>
              </div>
              
              <button 
                onClick={toggleLanguage}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-white hover:text-meta-blue hover:shadow-sm transition-all text-sm font-bold"
              >
                <Languages className="w-4 h-4" />
                <span>{language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}</span>
              </button>
          </div>
        </aside>
  
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 md:hidden transition-opacity"
              onClick={() => setSidebarOpen(false)}
          />
        )}
  
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 md:overflow-y-auto relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
              
              {/* Progress Header */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6 animate-fade-in">
                  <div className="flex-1 w-full">
                      <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
                          <span>{isAr ? 'التقدم العام' : 'Overall Progress'}</span>
                          <span className="text-meta-blue">{Math.round(((unlockedLevels - 1) / COURSE_CONTENT.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                          <div 
                              className="bg-gradient-to-r from-meta-blue to-blue-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(6,104,225,0.3)]" 
                              style={{ width: `${((unlockedLevels - 1) / COURSE_CONTENT.length) * 100}%` }}
                          ></div>
                      </div>
                  </div>
              </div>
  
              {/* Level Content */}
              <div className="animate-slide-up space-y-8">
                  <header>
                      <div className="flex items-center gap-3 mb-4">
                          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md shadow-blue-200">
                              {isAr ? 'المستوى' : 'Level'} {currentLevel.id}
                          </span>
                          <span className="text-slate-400 text-sm font-medium">/ {COURSE_CONTENT.length}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                          {currentLevel.title}
                      </h2>
                      <div className="flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-blue-900">
                          <BookOpen className="w-6 h-6 text-meta-blue shrink-0 mt-0.5" />
                          <p className="font-medium leading-relaxed">{currentLevel.objective}</p>
                      </div>
                  </header>
  
                  {/* Theory Section */}
                  <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 opacity-50 transition-transform group-hover:scale-110"></div>
                      
                      <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2 relative z-10">
                          <span className="w-2 h-8 bg-meta-blue rounded-full"></span>
                          {isAr ? 'المادة التعليمية' : 'Learning Material'}
                      </h3>
                      
                      <ul className="space-y-4 relative z-10">
                          {currentLevel.content.map((point, index) => (
                              <li key={index} className="flex items-start gap-4 text-slate-700 leading-relaxed p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                  <span className="w-6 h-6 rounded-full bg-blue-100 text-meta-blue flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                                      {index + 1}
                                  </span>
                                  <span className="text-lg">{point}</span>
                              </li>
                          ))}
                      </ul>
  
                      {/* Level 6 Visual Guide */}
                      {currentLevel.id === 6 && <PixelInstallationGuide />}
                  </section>
  
                  {/* Interactive Section */}
                  <section className="bg-white p-1 rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-t-3xl relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 z-0"></div>
                           <div className="relative z-10 flex items-center gap-3 mb-2">
                               <div className="bg-yellow-400 text-slate-900 p-1.5 rounded-lg shadow-lg shadow-yellow-400/20">
                                   <PlayCircle className="w-6 h-6" />
                               </div>
                               <h3 className="text-xl font-bold">{isAr ? 'نشاط تفاعلي' : 'Interactive Activity'}</h3>
                           </div>
                           <p className="relative z-10 text-slate-400 text-sm">{isAr ? 'أثبت مهاراتك وانتقل للمستوى التالي' : 'Prove your skills and unlock next level'}</p>
                      </div>
                      
                      <div className="p-6 md:p-8 bg-slate-50">
                          {renderInteraction(currentLevel)}
  
                          {isLevelComplete && (
                             <div className="mt-8 flex justify-center animate-bounce-in">
                               {!isFinalLevel ? (
                                  <button 
                                      onClick={nextLevel}
                                      className="group bg-meta-blue text-white pl-8 pr-6 py-4 rounded-2xl font-bold text-lg hover:bg-meta-hover shadow-xl shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center gap-3"
                                  >
                                      <span>{isAr ? 'الانتقال للمستوى التالي' : 'Next Level'}</span>
                                      <div className={`bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform ${isAr ? '' : 'rotate-180'}`}>
                                          <ChevronLeft className="w-5 h-5" />
                                      </div>
                                  </button>
                               ) : (
                                  <button 
                                      onClick={() => setShowCertForm(true)}
                                      className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-white pl-8 pr-6 py-4 rounded-2xl font-bold text-lg hover:shadow-orange-500/40 shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-3"
                                  >
                                      <span>{isAr ? 'احصل على الشهادة الخاصة بك' : 'Get Your Certificate'}</span>
                                      <div className="bg-white/20 p-2 rounded-full group-hover:rotate-12 transition-transform">
                                          <Award className="w-6 h-6" />
                                      </div>
                                  </button>
                               )}
                             </div>
                          )}
                      </div>
                  </section>
              </div>
          </div>
  
          {/* AI Tutor WAS HERE */}
  
        </main>
      </div>
      
      {/* AI Tutor MOVED HERE */}
      <AiTutor currentLevelTitle={currentLevel.title} />
    </>
  );
};

export default MetaAdsPage;
