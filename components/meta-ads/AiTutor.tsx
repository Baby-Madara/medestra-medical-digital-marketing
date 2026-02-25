import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Send, Bot, Loader2, Sparkles, User, Minimize2, Maximize2 } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

const API_KEY = process.env.API_KEY || '';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AiTutor = ({ currentLevelTitle }: { currentLevelTitle: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { language } = useLanguage();
  const isAr = language === 'ar';

  // Instantiate client inside component or outside if key is static. 
  // Assuming GoogleGenAI constructor takes { apiKey: ... } based on typical usage or previous file.

  // Reset messages when language changes
  useEffect(() => {
    setMessages([
      {
        role: 'model',
        text: isAr
          ? `مرحباً بك! أنا مساعدك الذكي في رحلة تعلم إعلانات Meta. كيف يمكنني مساعدتك في "${currentLevelTitle}" اليوم؟`
          : `Welcome! I'm your AI assistant for learning Meta Ads. How can I help you with "${currentLevelTitle}" today?`
      }
    ]);
  }, [language, currentLevelTitle]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Initialize client
      // Note: The previous file used: const ai = new GoogleGenAI({ apiKey: ... }); 
      // and ai.models.generateContent(...)
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const model = 'gemini-1.5-flash';

      const systemInstruction = isAr
        ? `أنت مساعد ذكي خبير في إعلانات فيسبوك وانستجرام (Meta Ads). 
         دورك هو مساعدة الطالب الذي يتعلم حالياً في مستوى: "${currentLevelTitle}".
         - أجب باختصار ووضوح.
         - استخدم لغة عربية سهلة ومشجعة.
         - إذا سأل الطالب عن شيء خارج نطاق إعلانات ميتا، أخبره بلطف أنك متخصص فقط في هذا المجال.
         - قدم أمثلة عملية دائماً.`
        : `You are an expert AI assistant in Facebook and Instagram Ads (Meta Ads).
         Your role is to help the student currently learning at level: "${currentLevelTitle}".
         - Answer concisely and clearly.
         - Use simple and encouraging English.
         - If the student asks about something outside Meta Ads, gently inform them you specialize only in this field.
         - Always provide practical examples.`;

      const response = await ai.models.generateContent({
        model: model,
        contents: [
          ...messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const text = response.text || (isAr ? "عذراً، لم أستطع توليد إجابة." : "Sorry, I couldn't generate a response.");
      setMessages(prev => [...prev, { role: 'model', text: text }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { role: 'model', text: isAr ? "عذراً، حدث خطأ في الاتصال. حاول مرة أخرى." : "Sorry, connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 ${isAr ? 'left-6' : 'right-6'} z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg shadow-purple-500/30 hover:scale-110 transition-transform duration-300 animate-bounce-in`}
        >
          <Sparkles className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 ${isAr ? 'left-6' : 'right-6'} z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-purple-100 flex flex-col overflow-hidden animate-slide-up h-[500px]`} dir={isAr ? "rtl" : "ltr"}>

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <span className="font-bold">{isAr ? 'المساعد الذكي' : 'AI Assistant'}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                  <span className="text-xs text-slate-400">{isAr ? 'يفكر...' : 'Thinking...'}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isAr ? "اكتب سؤالك هنا..." : "Type your question here..."}
                className={`w-full bg-slate-100 text-slate-800 ${isAr ? 'pr-4 pl-12' : 'pl-4 pr-12'} py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`absolute top-1/2 -translate-y-1/2 ${isAr ? 'left-2' : 'right-2'} p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
              >
                <Send className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
