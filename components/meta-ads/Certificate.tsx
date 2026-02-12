import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, Loader, X, Award } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

interface CertificateProps {
  recipientName: string;
  onClose: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({ recipientName, onClose }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    setIsGenerating(true);

    try {
      // Create canvas from the certificate element
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Higher quality
        useCORS: true, // For images to work cross-origin
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        imageTimeout: 15000, // Wait longer for images
      });

      const imgData = canvas.toDataURL('image/png');
      
      // A4 Landscape size: 297mm x 210mm
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Meta_Ads_Certificate_${recipientName.replace(/\s+/g, '_')}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(isAr ? 'حدث خطأ أثناء إنشاء الشهادة. يرجى المحاولة مرة أخرى.' : 'Error generating certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 overflow-y-auto" dir={isAr ? "rtl" : "ltr"}>
      <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header / Toolbar */}
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">{isAr ? 'معاينة الشهادة' : 'Certificate Preview'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-meta-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              {isGenerating ? <Loader className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isGenerating ? (isAr ? 'جاري التحميل...' : 'Downloading...') : (isAr ? 'تحميل PDF' : 'Download PDF')}
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container for Certificate */}
        <div className="flex-1 overflow-auto bg-slate-100 p-8 flex justify-center">
          
          {/* Certificate Design - A4 Landscape */}
          <div 
            ref={certificateRef}
            className="w-[1000px] h-[707px] bg-white relative shadow-xl shrink-0 text-slate-900 flex flex-col"
            style={{ direction: 'ltr' }} 
          >
             {/* Border Layer */}
             <div className="absolute inset-4 border-4 border-double border-meta-blue/30 pointer-events-none"></div>
             <div className="absolute inset-6 border border-meta-gold pointer-events-none"></div>

             {/* Corner Ornaments */}
             <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-meta-blue/20 via-transparent to-transparent"></div>
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-meta-blue/20 via-transparent to-transparent"></div>

             {/* Content */}
             <div className="flex-1 flex flex-col items-center justify-between py-16 px-16 relative z-10 font-sans">
                
                {/* Header Logos */}
                <div className="flex justify-between w-full items-center mb-4">
                   <div className="text-left">
                      <h2 className="text-2xl font-bold text-slate-800 tracking-widest uppercase font-serif">Medestra</h2>
                      <p className="text-xs text-slate-500 tracking-[0.2em] uppercase">Online Academy</p>
                   </div>
                   {/* Logo Container - Using flex centering + max-width/height prevents distortion in html2canvas */}
                   <div className="w-32 h-24 flex items-center justify-end">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1sBR2GW-CwhHfpREEl8cXdYX3tNbBzb6g" 
                        alt="Logo" 
                        className="max-w-full max-h-full"
                        crossOrigin="anonymous"
                      />
                   </div>
                </div>

                {/* Title */}
                <div className="text-center space-y-2">
                  <h1 className="text-5xl font-extrabold text-meta-blue mb-1 tracking-tight font-serif uppercase">Certificate</h1>
                  <p className="text-xl text-slate-500 font-medium tracking-[0.3em] uppercase">Of Completion</p>
                </div>

                {/* Body Text */}
                <div className="text-center w-full max-w-3xl space-y-6">
                  <p className="text-lg text-slate-600 font-serif italic">
                    This certificate is proudly presented to
                  </p>
                  
                  <div className="py-2 border-b-2 border-slate-200 w-full min-h-[80px] flex items-end justify-center">
                    <h2 className="text-5xl font-script text-slate-900 leading-tight pb-2">
                      {recipientName}
                    </h2>
                  </div>

                  <div className="text-lg text-slate-600 leading-relaxed font-serif">
                    <p className="mb-2">For successfully completing the comprehensive training course</p>
                    <p className="font-bold text-meta-blue text-2xl font-sans mb-2">Meta Ads Master Class</p>
                    <p>and demonstrating exceptional skills in digital advertising strategy and campaign management.</p>
                  </div>
                </div>

                {/* Signatures & Date */}
                <div className="flex justify-between items-end w-full mt-10 px-8">
                   
                   {/* Date */}
                   <div className="text-center w-48">
                      <div className="border-b border-slate-400 pb-2 mb-2 text-lg font-bold text-slate-800 font-serif">
                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Date</p>
                   </div>
                   
                   {/* Signature */}
                   <div className="text-center w-64">
                      <div className="border-b border-slate-400 pb-2 mb-2 relative h-20 flex items-end justify-center">
                         <img 
                           src="https://lh3.googleusercontent.com/d/1UhcX3cRqK73ZiPyM9SC8ZYd9joicnXL5" 
                           className="max-h-full max-w-full"
                           alt="Signature"
                           crossOrigin="anonymous"
                         />
                      </div>
                      <p className="font-bold text-slate-800 font-serif">Dr. Mahmoud Hussein</p>
                      <p className="text-xs text-meta-blue font-bold uppercase tracking-wider">CEO, Medestra</p>
                   </div>
                </div>

                {/* Footer ID */}
                <div className="absolute bottom-4 w-full text-center">
                   <p className="text-[10px] text-slate-300 font-mono">
                      ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} • Medestra Online Academy
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
