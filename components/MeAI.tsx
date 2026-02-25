import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Send, Bot, Loader2, Sparkles, User, MessageCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const API_KEY = process.env.VITE_GEMINI_API_KEY || '';

interface Message {
    role: 'user' | 'model';
    text: string;
}

export const MeAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { language } = useLanguage();
    const isAr = language === 'ar';

    // Tooltip auto-hide after some time
    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(false), 8000);
        return () => clearTimeout(timer);
    }, []);

    // Initial greeting
    useEffect(() => {
        setMessages([
            {
                role: 'model',
                text: isAr
                    ? "مرحباً! أنا me، مساعدك الذكي في ميديسترا. أنا هنا لأجيب على استفساراتك حول التسويق الطبي وكيف يمكننا مساعدتك في نمو مؤسستك الصحية. كيف يمكنني مساعدتك اليوم؟"
                    : "Hello! I'm me, your Medestra AI assistant. I'm here to answer your questions about medical marketing and how we can help your healthcare organization grow. How can I assist you today?"
            }
        ]);
    }, [language]);

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
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            const model = 'gemini-1.5-flash';

            const systemInstruction = isAr
                ? `أنت مساعد ذكي اسمك "me" خبير في التسويق الرقمي الطبي (Medical Digital Marketing) وتعمل لدى شركة ميديسترا (Medestra).
         هدفك الأساسي هو:
         1. تقديم معلومات دقيقة وقيمة حول التسويق الطبي (نمو العيادات، المحتوى الطبي، إدارة السوشيال ميديا للمستشفيات، إلخ).
         2. الترويج لخدمات شركة ميديسترا بشكل ذكي وجذاب. 
         3. تشجيع المستخدمين على طلب استشارة أو عرض سعر من ميديسترا.
         4. أخبر المستخدم دائماً أن ميديسترا هي الشريك الأمثل للنجاح في الخليج والشرق الأوسط.
         - أجب باختصار وودود.
         - استخدم لغة عربية مهنية وسهلة.
         - إذا كان السؤال تافهاً أو خارج النطاق، وجه المستخدم بلطف للحديث عن التسويق الطبي.`
                : `You are an AI assistant named "me", an expert in Medical Digital Marketing working for Medestra.
         Your primary goals are:
         1. Provide accurate and valuable information about medical marketing (clinic growth, medical content, social media management for hospitals, etc.).
         2. Promote Medestra's services in a smart and engaging way.
         3. Encourage users to request a consultation or quote from Medestra.
         4. Always tell the user that Medestra is the ideal partner for success in the Gulf and Middle East.
         - Answer concisely and friendly.
         - Use professional yet accessible language.
         - If the question is irrelevant or out of scope, gently redirect the user to talk about medical marketing.`;

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
            <div className={`fixed bottom-6 left-6 z-50 flex flex-col items-center`}>
                {/* Tooltip / Speech Bubble */}
                <AnimatePresence>
                    {showTooltip && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`absolute bottom-full mb-4 px-4 py-2 bg-white border border-brand-blue/20 rounded-2xl shadow-xl text-brand-blue font-bold whitespace-nowrap text-sm flex items-center gap-2`}
                        >
                            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-brand-blue/20 rotate-45"></div>
                            <span>{isAr ? 'مرحباً تحدث مع me' : 'Hello, talk with me'}</span>
                            <Sparkles className="w-4 h-4" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mascot Button */}
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        onMouseEnter={() => setShowTooltip(true)}
                        className={`relative group transition-all duration-300 transform hover:scale-110 active:scale-95`}
                    >
                        <div className="absolute inset-0 bg-brand-blue/20 blur-2xl rounded-full animate-pulse group-hover:bg-brand-blue/30"></div>
                        <img
                            src="/mascots/h4.png"
                            alt="Me Mascot"
                            className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10 drop-shadow-2xl"
                        />
                        <div className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white z-20"></div>
                    </button>
                )}
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: isAr ? 'bottom left' : 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className={`fixed bottom-6 ${isAr ? 'left-6' : 'right-6'} z-[60] w-[90vw] sm:w-96 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.15)] border border-white/40 flex flex-col overflow-hidden h-[600px] max-h-[85vh]`}
                        dir={isAr ? "rtl" : "ltr"}
                    >

                        {/* Header */}
                        <div className="bg-brand-blue p-6 flex items-center justify-between text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
                                    <img src="/mascots/h4.png" alt="" className="w-10 h-10 object-contain" />
                                </div>
                                <div>
                                    <h3 className="font-black text-lg leading-none mb-1">{isAr ? 'المساعد الذكي' : 'AI Assistant'}</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-xs text-white/80 font-bold uppercase tracking-wider">{isAr ? 'متصل الآن' : 'Online Now'}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-xl transition-colors relative z-10">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                            {messages.map((msg, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={index}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-brand-blue text-white' : 'bg-white text-brand-blue border border-slate-100'
                                        }`}>
                                        {msg.role === 'user' ? <User className="w-6 h-6" /> : <img src="/mascots/h4.png" className="w-8 h-8 object-contain" />}
                                    </div>
                                    <div className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm font-medium ${msg.role === 'user'
                                        ? 'bg-brand-blue text-white rounded-tr-none'
                                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 text-brand-blue flex items-center justify-center shrink-0">
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    </div>
                                    <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-2">
                                        <span className="text-xs text-slate-400 font-bold">{isAr ? 'جاري التفكير...' : 'Thinking...'}</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-slate-100">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={isAr ? "اسأل me عن التسويق الطبي..." : "Ask me about medical marketing..."}
                                    className={`w-full bg-slate-100 text-slate-800 ${isAr ? 'pr-5 pl-14' : 'pl-5 pr-14'} py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium border border-transparent focus:border-brand-blue/20`}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    className={`absolute top-1/2 -translate-y-1/2 ${isAr ? 'left-3' : 'right-3'} p-2.5 bg-brand-blue text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-brand-blue/20`}
                                >
                                    <Send className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                            <p className="mt-4 text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                                Powered by Medestra Intelligence
                            </p>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
