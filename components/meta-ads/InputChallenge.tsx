import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface InputProps {
    prompt: string;
    placeholder: string;
    expectedKeywords: string[];
    successMessage: string;
    onComplete: (success: boolean) => void;
}

export const InputChallenge: React.FC<InputProps> = ({ prompt, placeholder, expectedKeywords, successMessage, onComplete }) => {
    const [value, setValue] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [completed, setCompleted] = useState(false);

    const handleSubmit = () => {
        const lowerVal = value.toLowerCase();
        // Check if at least one keyword is present (very basic validation for demo purposes)
        // In a real app, AI could validate this.
        const hasKeyword = expectedKeywords.some(k => lowerVal.includes(k.toLowerCase()));

        if (hasKeyword && value.length > 5) {
            setFeedback(successMessage);
            setCompleted(true);
            onComplete(true);
        } else {
            setFeedback('حاول كتابة عنوان أكثر جاذبية يحتوي على كلمات مثل "خصم" أو "عرض".');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-4">
            <h3 className="font-bold mb-4 text-slate-800">{prompt}</h3>
            <div className="relative">
                <input 
                    type="text" 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    disabled={completed}
                    className="w-full p-4 pl-12 rounded-lg border border-slate-300 focus:border-meta-blue focus:ring-1 focus:ring-meta-blue outline-none"
                />
                <button 
                    onClick={handleSubmit}
                    disabled={completed || !value}
                    className="absolute left-2 top-2 bottom-2 bg-meta-blue text-white px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
            {feedback && (
                <div className={`mt-4 p-3 rounded text-sm ${completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {feedback}
                </div>
            )}
        </div>
    );
}
