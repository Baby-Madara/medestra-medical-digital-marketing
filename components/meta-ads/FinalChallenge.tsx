import React, { useState } from 'react';
import { QuizOption } from '../../types/meta-ads';
import { Award } from 'lucide-react';

interface Step {
  question: string;
  options: QuizOption[];
}

interface FinalProps {
  steps: Step[];
  onComplete: (success: boolean) => void;
}

export const FinalChallenge: React.FC<FinalProps> = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const handleOptionSelect = (isCorrect: boolean, feedback: string) => {
    setLastFeedback(feedback);
    if (isCorrect) {
      setScore(s => s + 1);
    }
    
    setTimeout(() => {
        setLastFeedback(null);
        if (currentStep < steps.length - 1) {
            setCurrentStep(c => c + 1);
        } else {
            setShowResult(true);
            onComplete(true); // Always complete to show badge, but UI might differ based on score
        }
    }, 2500);
  };

  if (showResult) {
    const passed = score >= steps.length - 1; // Allow 1 mistake
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 mt-4 text-center">
        {passed ? (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-12 h-12 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">مبروك! لقد أتممت الدورة بنجاح</h2>
            <p className="text-slate-600 mb-6">لقد أثبتت مهارتك في إدارة إعلانات Meta.</p>
            <div className="p-4 bg-slate-50 border rounded-lg w-full max-w-md">
                <p className="font-bold text-lg">شهادة إتمام: Meta Ads Master</p>
                <p className="text-sm text-slate-500">النتيجة: {score} / {steps.length}</p>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">حاول مرة أخرى</h2>
            <p className="text-slate-600 mb-4">تحتاج لتركيز أكثر في القرارات الاستراتيجية.</p>
            <button 
                onClick={() => {
                    setCurrentStep(0);
                    setScore(0);
                    setShowResult(false);
                }}
                className="bg-meta-blue text-white px-6 py-2 rounded-lg"
            >
                إعادة التحدي
            </button>
          </div>
        )}
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-4">
      <div className="flex justify-between items-center mb-4 text-sm text-slate-500">
        <span>السؤال {currentStep + 1} من {steps.length}</span>
        <span>النقاط: {score}</span>
      </div>
      
      <h3 className="text-xl font-bold mb-6 text-slate-800">{step.question}</h3>
      
      {lastFeedback ? (
          <div className="p-6 bg-slate-50 rounded-lg text-center animate-fade-in">
              <p className="font-medium text-lg mb-2">{lastFeedback}</p>
              <p className="text-sm text-slate-400">جاري الانتقال للسؤال التالي...</p>
          </div>
      ) : (
        <div className="space-y-4">
            {step.options.map((option) => (
            <button
                key={option.id}
                onClick={() => handleOptionSelect(option.isCorrect, option.feedback)}
                className="w-full text-right p-5 rounded-lg border border-slate-200 hover:border-meta-blue hover:bg-meta-light transition-all flex items-center justify-between group"
            >
                <span className="font-medium text-slate-700 group-hover:text-meta-blue">{option.text}</span>
            </button>
            ))}
        </div>
      )}
    </div>
  );
};
