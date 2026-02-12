import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { CheckCircle, XCircle, MousePointerClick } from 'lucide-react';

interface ChartProps {
  instruction: string;
  correctDayIndex: number;
  feedback: string;
  onComplete: (success: boolean) => void;
}

const data = [
  { day: 'يوم 1', spend: 50, sales: 60 },
  { day: 'يوم 2', spend: 55, sales: 70 },
  { day: 'يوم 3', spend: 60, sales: 90 },
  { day: 'يوم 4', spend: 70, sales: 110 },
  { day: 'يوم 5', spend: 75, sales: 250 }, // Correct day (Index 4)
  { day: 'يوم 6', spend: 150, sales: 180 }, // Efficiency drops
  { day: 'يوم 7', spend: 200, sales: 210 },
];

export const InteractiveChart: React.FC<ChartProps> = ({ instruction, correctDayIndex, feedback, onComplete }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    
    // Check answer
    if (index === correctDayIndex) {
      onComplete(true);
    }
  };

  const getFeedbackMessage = (index: number) => {
      if (index === correctDayIndex) return feedback;
      if (index > correctDayIndex) return 'خطأ: لاحظ أن المصاريف (الخط الأزرق) ارتفعت بشكل حاد في هذا اليوم، لكن المبيعات (الخط الأخضر) لم ترتفع بنفس القوة. هذا يعني أن "تكلفة النتيجة" زادت والعائد قل (ROAS انخفض).';
      return 'خطأ: النتائج هنا جيدة وتتصاعد باستقرار، لكننا لم نصل للذروة الحقيقية بعد. ابحث عن اليوم الذي حقق أكبر قفزة في المبيعات مع ثبات نسبي في المصاريف.';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-4 animate-fade-in">
      <div className="flex items-start gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600 shrink-0">
            <MousePointerClick className="w-6 h-6" />
        </div>
        <div>
             <h3 className="font-bold text-slate-800 text-lg leading-snug">{instruction}</h3>
             <p className="text-sm text-slate-500 mt-2 font-medium">اضغط على أزرار الأيام بالأسفل لاختيار إجابتك:</p>
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-64 w-full select-none mb-6" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ top: 20, right: 30, left: -10, bottom: 0 }}
            onClick={(e: any) => {
              if (e && e.activeTooltipIndex !== undefined) {
                  handleSelect(e.activeTooltipIndex);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
                dataKey="day" 
                tick={{fontSize: 12, fill: '#64748b'}} 
                tickMargin={10}
                axisLine={false}
                tickLine={false}
            />
            <YAxis 
                tick={{fontSize: 12, fill: '#64748b'}} 
                axisLine={false}
                tickLine={false}
            />
            <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', direction: 'rtl', textAlign: 'right', fontFamily: 'Tajawal' }}
                cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#10b981" 
                strokeWidth={3} 
                name="المبيعات (Sales)" 
                activeDot={{ r: 8 }} 
            />
            <Line 
                type="monotone" 
                dataKey="spend" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                name="المصاريف (Spend)" 
                activeDot={{ r: 8 }} 
            />
            {/* Visual feedback on chart */}
            {selectedIndex !== null && (
                <ReferenceDot 
                    x={data[selectedIndex].day} 
                    y={data[selectedIndex].sales} 
                    r={6} 
                    fill={selectedIndex === correctDayIndex ? "#10b981" : "#ef4444"} 
                    stroke="white" 
                    strokeWidth={2} 
                />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Day Selection Buttons */}
      <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
          {data.map((d, idx) => {
              const isSelected = selectedIndex === idx;
              const isCorrect = idx === correctDayIndex;
              
              let btnClass = "bg-white border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600";
              
              if (isSelected) {
                  if (isCorrect) {
                      btnClass = "bg-green-500 text-white border-green-600 shadow-lg shadow-green-200 scale-105 ring-2 ring-offset-1 ring-green-300";
                  } else {
                      btnClass = "bg-red-500 text-white border-red-600 shadow-lg shadow-red-200 scale-105 ring-2 ring-offset-1 ring-red-300";
                  }
              }

              return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`py-3 px-1 rounded-xl border-2 text-sm font-bold transition-all duration-200 flex flex-col items-center justify-center gap-1 ${btnClass}`}
                  >
                      <span>{d.day}</span>
                      {isSelected && (
                          <div className="bg-white/20 rounded-full p-0.5">
                              {isCorrect ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          </div>
                      )}
                  </button>
              )
          })}
      </div>

      {/* Feedback Message */}
      {selectedIndex !== null && (
        <div className={`mt-6 p-4 rounded-xl border animate-slide-up flex items-start gap-3 ${selectedIndex === correctDayIndex ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <div className={`mt-1 p-1 rounded-full shrink-0 ${selectedIndex === correctDayIndex ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                {selectedIndex === correctDayIndex ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </div>
            <div>
                <p className="font-bold mb-1 text-lg">{selectedIndex === correctDayIndex ? 'إجابة صحيحة! 🎉' : 'إجابة خاطئة'}</p>
                <p className="text-sm opacity-90 leading-relaxed font-medium">
                    {getFeedbackMessage(selectedIndex)}
                </p>
            </div>
        </div>
      )}
    </div>
  );
};
