import React, { useState } from 'react';
import { Settings, Globe, Code, CheckCircle, MousePointerClick, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const PixelInstallationGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const steps = isAr ? [
    {
      title: 'مدير الأحداث (Events Manager)',
      description: 'من قائمة Business Manager، انتقل إلى "Events Manager" لبدء الإعداد. هذه هي لوحة التحكم الخاصة ببياناتك.',
      icon: <Settings className="w-10 h-10 text-white" />,
      color: 'bg-slate-600',
      imageHint: 'ابحث عن أيقونة الترس أو القائمة الجانبية.'
    },
    {
      title: 'ربط مصدر البيانات (Connect Data)',
      description: 'اختر "Web" كمصدر للبيانات لأنك تريد تتبع موقع إلكتروني، ثم اضغط على زر "Connect" الأزرق للبدء.',
      icon: <Globe className="w-10 h-10 text-white" />,
      color: 'bg-blue-500',
      imageHint: 'ستظهر لك خيارات مثل App و CRM، اختر Web.'
    },
    {
      title: 'تسمية البكسل (Name Your Pixel)',
      description: 'اكتب اسماً واضحاً للبكسل (مثلاً: "بكسل متجري") واضغط "Create". الاسم يساعدك في تنظيم حساباتك لاحقاً.',
      icon: <MousePointerClick className="w-10 h-10 text-white" />,
      color: 'bg-indigo-500',
      imageHint: 'يمكنك تغيير الاسم لاحقاً إذا أردت.'
    },
    {
      title: 'تثبيت الكود (Install Code)',
      description: 'للمبتدئين: اختر "Partner Integration" لربطه تلقائياً مع منصات مثل Shopify أو WordPress بدون برمجة.',
      icon: <Code className="w-10 h-10 text-white" />,
      color: 'bg-purple-500',
      imageHint: 'إذا كان لديك مبرمج، اختر Manual Install.'
    },
    {
      title: 'التحقق (Verify Setup)',
      description: 'استخدم أداة "Test Events" في فيسبوك، أو افتح موقعك للتأكد من أن مؤشر الحالة أصبح "Active" (أخضر).',
      icon: <CheckCircle className="w-10 h-10 text-white" />,
      color: 'bg-green-500',
      imageHint: 'حمل إضافة Facebook Pixel Helper للمساعدة.'
    }
  ] : [
    {
      title: 'Events Manager',
      description: 'From Business Manager menu, go to "Events Manager" to start setup. This is your data dashboard.',
      icon: <Settings className="w-10 h-10 text-white" />,
      color: 'bg-slate-600',
      imageHint: 'Look for the gear icon or side menu.'
    },
    {
      title: 'Connect Data',
      description: 'Select "Web" as your data source to track a website, then click the blue "Connect" button.',
      icon: <Globe className="w-10 h-10 text-white" />,
      color: 'bg-blue-500',
      imageHint: 'You will see options like App and CRM, choose Web.'
    },
    {
      title: 'Name Your Pixel',
      description: 'Enter a clear name for your pixel (e.g., "My Store Pixel") and click "Create". Naming helps organize accounts later.',
      icon: <MousePointerClick className="w-10 h-10 text-white" />,
      color: 'bg-indigo-500',
      imageHint: 'You can change the name later if you want.'
    },
    {
      title: 'Install Code',
      description: 'For beginners: Choose "Partner Integration" to connect automatically with platforms like Shopify or WordPress without coding.',
      icon: <Code className="w-10 h-10 text-white" />,
      color: 'bg-purple-500',
      imageHint: 'If you have a developer, choose Manual Install.'
    },
    {
      title: 'Verify Setup',
      description: 'Use "Test Events" tool in Facebook, or open your site to check if the status indicator becomes "Active" (Green).',
      icon: <CheckCircle className="w-10 h-10 text-white" />,
      color: 'bg-green-500',
      imageHint: 'Install Facebook Pixel Helper extension to help.'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
          <Code className="w-6 h-6 text-meta-blue" />
          {isAr ? 'دليل تثبيت البكسل التفاعلي' : 'Interactive Pixel Guide'}
        </h4>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {isAr ? `خطوة ${currentStep + 1} من ${steps.length}` : `Step ${currentStep + 1} of ${steps.length}`}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-8 overflow-hidden">
        <div 
          className="bg-meta-blue h-full transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Content */}
      <div className="flex flex-col items-center text-center animate-fade-in py-4">
        <div className={`
          w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-6 transform transition-transform duration-300 hover:scale-105
          ${step.color}
        `}>
          {step.icon}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-3">{step.title}</h3>
        <p className="text-slate-600 leading-relaxed max-w-lg mb-4 text-lg">
          {step.description}
        </p>
        
        <div className="bg-yellow-50 text-yellow-800 text-sm px-4 py-2 rounded-lg border border-yellow-100 flex items-center gap-2 mb-8">
           <span className="text-xl">💡</span> {step.imageHint}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`
              flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors
              ${currentStep === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
            `}
          >
            {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {isAr ? 'السابق' : 'Previous'}
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className={`
              flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors min-w-[140px]
              ${currentStep === steps.length - 1 
                ? 'bg-green-500 text-white cursor-default' 
                : 'bg-meta-blue text-white hover:bg-blue-700'}
            `}
          >
            {currentStep === steps.length - 1 ? (
              <>
                {isAr ? 'تم الإكمال' : 'Completed'} <Check className="w-5 h-5" />
              </>
            ) : (
              <>
                {isAr ? 'التالي' : 'Next'} {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Steps Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {steps.map((_, idx) => (
          <div 
            key={idx}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentStep ? 'bg-meta-blue' : 'bg-slate-200'}`}
          />
        ))}
      </div>
    </div>
  );
};
