import React, { useState } from 'react';
import { QuizOption } from '../../types/meta-ads';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuizProps {
  question: string;
  options: QuizOption[];
  onComplete: (success: boolean) => void;
}

export const QuizComponent: React.FC<QuizProps> = ({ question, options, onComplete }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedId) return;
    setIsSubmitted(true);
    const selected = options.find(o => o.id === selectedId);
    if (selected?.isCorrect) {
      onComplete(true);
    }
  };

  const selectedOption = options.find(o => o.id === selectedId);

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-bold mb-6 text-slate-800 leading-snug">{question}</h3>
      <div className="space-y-4">
        {options.map((option) => {
           const isSelected = selectedId === option.id;
           const showCorrect = isSubmitted && option.isCorrect;
           const showWrong = isSubmitted && isSelected && !option.isCorrect;
           
           let borderColor = 'border-slate-200';
           let bgColor = 'bg-white';
           let textColor = 'text-slate-700';
           
           if (showCorrect) {
               borderColor = 'border-green-500';
               bgColor = 'bg-green-50';
               textColor = 'text-green-800';
           } else if (showWrong) {
               borderColor = 'border-red-500';
               bgColor = 'bg-red-50';
               textColor = 'text-red-800';
           } else if (isSelected) {
               borderColor = 'border-meta-blue';
               bgColor = 'bg-blue-50';
               textColor = 'text-meta-blue';
           }

           return (
              <button
                key={option.id}
                onClick={() => !isSubmitted && setSelectedId(option.id)}
                disabled={isSubmitted}
                className={`w-full text-right p-5 rounded-xl border-2 transition-all duration-300 flex items-center justify-between group relative overflow-hidden
                  ${borderColor} ${bgColor} ${textColor}
                  ${!isSubmitted && !isSelected ? 'hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5' : ''}
                `}
              >
                <span className="font-medium text-lg relative z-10">{option.text}</span>
                <div className="relative z-10">
                    {showCorrect && <CheckCircle className="w-6 h-6 text-green-500 animate-bounce-in" />}
                    {showWrong && <XCircle className="w-6 h-6 text-red-500 animate-bounce-in" />}
                    {!isSubmitted && <div className={`w-5 h-5 rounded-full border-2 ${isSelected ? 'border-meta-blue bg-meta-blue' : 'border-slate-300 group-hover:border-blue-400'}`}></div>}
                </div>
              </button>
           );
        })}
      </div>

      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={!selectedId}
          className="mt-8 w-full bg-meta-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-meta-hover shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 active:translate-y-0"
        >
          تحقق من الإجابة
        </button>
      )}

      {isSubmitted && selectedOption && (
        <div className={`mt-6 p-6 rounded-2xl border animate-slide-up ${selectedOption.isCorrect ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
          <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full shrink-0 ${selectedOption.isCorrect ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                  {selectedOption.isCorrect ? <CheckCircle className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
              </div>
              <div>
                  <p className="font-bold text-lg mb-1">{selectedOption.isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة'}</p>
                  <p className="opacity-90 leading-relaxed">{selectedOption.feedback}</p>
                  {!selectedOption.isCorrect && (
                    <button
                       onClick={() => {
                         setIsSubmitted(false);
                         setSelectedId(null);
                       }}
                       className="text-sm font-bold underline mt-3 hover:opacity-75"
                    >
                      حاول مرة أخرى
                    </button>
                  )}
              </div>
          </div>
        </div>
      )}
    </div>
  );
};
