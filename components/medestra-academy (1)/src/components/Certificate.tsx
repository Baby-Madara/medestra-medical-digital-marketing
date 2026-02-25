import React, { useRef, useMemo, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Award, CheckCircle, Star, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';

interface CertificateProps {
  studentName: string;
  courseName: string;
  date: string;
  onClose: () => void;
}

export function Certificate({ studentName, courseName, date, onClose }: CertificateProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const certificateId = useMemo(() => {
    const random3 = Math.floor(100 + Math.random() * 900); // 3 random numbers
    const dateObj = new Date();
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const month = monthNames[dateObj.getMonth()].substring(0, 2); // First 2 letters of current month
    const year = dateObj.getFullYear().toString().slice(-2); // Last 2 numbers of the year
    const initial = studentName.charAt(0).toUpperCase(); // First letter of student name
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let random4 = '';
    for (let i = 0; i < 4; i++) {
      random4 += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `MED-${random3}-${month}ra${year}@${initial}/${random4}`;
  }, [studentName]);

  const handleDownload = async () => {
    if (!certRef.current) return;
    setIsDownloading(true);

    try {
      const elementToCapture = certRef.current;
      
      // Ensure all images are loaded before capturing
      const images = Array.from(elementToCapture.querySelectorAll('img'));
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails
        });
      }));

      // Small delay to ensure rendering is stable
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(elementToCapture, {
        scale: 4, // High resolution (approx 384 DPI if base is 96)
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        // Force desktop viewport
        windowWidth: 1920,
        windowHeight: 1080,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        onclone: (clonedDoc) => {
          // 1. Remove all style tags and link tags to prevent parsing of Tailwind CSS
          const styles = clonedDoc.getElementsByTagName('style');
          const links = clonedDoc.getElementsByTagName('link');
          
          Array.from(styles).forEach(style => style.remove());
          Array.from(links).forEach(link => {
            if (link.href.includes('fonts.googleapis.com')) return;
            link.remove();
          });

          // 2. Re-inject the font stylesheet explicitly
          const fontLink = clonedDoc.createElement('link');
          fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;700;900&family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap';
          fontLink.rel = 'stylesheet';
          clonedDoc.head.appendChild(fontLink);

          // 3. CRITICAL: Re-apply box-sizing: border-box globally
          const resetStyle = clonedDoc.createElement('style');
          resetStyle.innerHTML = `
            * {
              box-sizing: border-box !important;
              margin: 0;
              padding: 0;
            }
          `;
          clonedDoc.head.appendChild(resetStyle);

          // 4. Clean up the container styles for capture
          const container = clonedDoc.getElementById('certificate-container');
          if (container) {
            container.removeAttribute('class');
            const allElements = container.getElementsByTagName('*');
            for (let i = 0; i < allElements.length; i++) {
              allElements[i].removeAttribute('class');
            }

            // Force exact A4 landscape dimensions (at 96 DPI)
            // 297mm = 1122.5px, 210mm = 793.7px
            const a4Width = 1123;
            const a4Height = 794;

            container.style.width = `${a4Width}px`;
            container.style.height = `${a4Height}px`;
            container.style.minWidth = `${a4Width}px`;
            container.style.minHeight = `${a4Height}px`;
            container.style.maxWidth = `${a4Width}px`;
            container.style.maxHeight = `${a4Height}px`;
            
            container.style.position = 'absolute';
            container.style.left = '0';
            container.style.top = '0';
            container.style.transform = 'none';
            container.style.margin = '0';
            container.style.borderRadius = '0';
            container.style.boxShadow = 'none';
            container.style.backgroundColor = '#ffffff';
            
            // Ensure inner content fills the container
            const innerDiv = container.firstElementChild as HTMLElement;
            if (innerDiv) {
                innerDiv.style.width = '100%';
                innerDiv.style.height = '100%';
            }
          }
        }
      });

      // Use PNG for better quality (lossless)
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // A4 Landscape dimensions in mm
      const pageWidth = 297;
      const pageHeight = 210;

      // Force the image to fill the page exactly
      // Since we forced the capture to match A4 aspect ratio, this will not distort
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
      pdf.save(`Medestra-Certificate-${studentName.replace(/\s+/g, '_')}.pdf`);

    } catch (error) {
      console.error('PDF Generation failed:', error);
      alert('Sorry, there was an error generating the PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl flex flex-col gap-6"
      >
        {/* Controls */}
        <div className="flex justify-between items-center text-white">
          <h2 className="text-2xl font-display font-bold">Your Certification</h2>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition font-medium"
            >
              Close
            </button>
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-6 py-2 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition flex items-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </span>
              ) : (
                <><Download size={18} /> Save as PDF</>
              )}
            </button>
          </div>
        </div>

        {/* Certificate Preview */}
        <div 
          id="certificate-container"
          ref={certRef}
          style={{ 
            position: 'relative',
            width: '100%',
            aspectRatio: '1.414/1',
            backgroundColor: '#ffffff',
            minWidth: '1000px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
            <div style={{ flex: 1, padding: '40px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                
                {/* Watermark */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.04, pointerEvents: 'none' }}>
                    <BrandLogo className="" style={{ height: '500px', width: 'auto', filter: 'grayscale(100%)' }} />
                </div>

                {/* Header Section */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', zIndex: 10 }}>
                    <BrandLogo className="" style={{ height: '60px', width: 'auto' }} />
                    <div style={{ textAlign: 'right' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#009FE3', margin: 0, fontFamily: "'Outfit', sans-serif" }}>MEDESTRA ACADEMY</h2>
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0', letterSpacing: '1px' }}>EXCELLENCE IN MEDICAL EDUCATION</p>
                    </div>
                </div>

                {/* Title */}
                <div style={{ textAlign: 'center', zIndex: 10, marginBottom: '20px' }}>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '56px', fontWeight: 'bold', color: '#111827', margin: 0, lineHeight: 1 }}>Certificate</h1>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '16px', color: '#009FE3', letterSpacing: '6px', textTransform: 'uppercase', marginTop: '8px', fontWeight: 600 }}>Of Completion</p>
                </div>

                {/* Recipient */}
                <div style={{ textAlign: 'center', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B7280', marginBottom: '8px' }}>This is to certify that</p>
                    <h2 style={{ fontFamily: "'Dancing Script', cursive", fontSize: '64px', color: '#111827', margin: '8px 0 16px' }}>{studentName}</h2>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B7280', marginBottom: '16px' }}>Has successfully completed the course</p>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 'bold', color: '#009FE3', margin: '0 auto 24px', maxWidth: '800px', lineHeight: 1.3 }}>{courseName}</h3>
                    
                    {/* Skills Text */}
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280', marginBottom: '8px', fontStyle: 'italic' }}>
                            And has demonstrated proficiency in the following skills:
                        </p>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', color: '#1F2937', fontWeight: 500, lineHeight: '1.6' }}>
                            Consultative Sales <span style={{ color: '#009FE3', margin: '0 4px' }}>•</span> Needs Assessment <span style={{ color: '#FF4057', margin: '0 4px' }}>•</span> Ethical Cross-Selling <span style={{ color: '#FFC72C', margin: '0 4px' }}>•</span> Objection Handling
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', marginTop: '30px', zIndex: 10 }}>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', borderBottom: '2px solid #E5E7EB', paddingBottom: '8px', minWidth: '180px', marginBottom: '6px' }}>{date}</div>
                            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#9CA3AF', letterSpacing: '2px', fontWeight: 'bold' }}>Date Issued</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         <div style={{ 
                            width: '70px', height: '70px', 
                            backgroundColor: '#009FE3',
                            borderRadius: '50%', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            color: '#fff', 
                            marginBottom: '8px',
                            boxShadow: '0 4px 10px rgba(0, 159, 227, 0.3)'
                        }}>
                            <Award size={36} />
                        </div>
                        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#6B7280' }}>ID: {certificateId}</div>
                        <div style={{ fontSize: '9px', color: '#9CA3AF', marginTop: '4px' }}>https://medestra.me/#/verify-certificate</div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '50px', borderBottom: '2px solid #E5E7EB', paddingBottom: '8px', minWidth: '200px', marginBottom: '6px' }}>
                                    <img 
                                    src={`https://lh3.googleusercontent.com/d/1UhcX3cRqK73ZiPyM9SC8ZYd9joicnXL5?t=${new Date().getTime()}`}
                                    alt="Signature" 
                                    style={{ maxHeight: '100%', width: 'auto', objectFit: 'contain' }}
                                    crossOrigin="anonymous"
                                />
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>Dr. Mahmoud Hussein</div>
                            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#9CA3AF', letterSpacing: '2px', fontWeight: 'bold' }}>Founder & CEO</div>
                        </div>
                    </div>
                </div>

            </div>
            
            {/* Bottom Brand Bar */}
            <div style={{ height: '20px', width: '100%', background: 'linear-gradient(90deg, #009FE3 0%, #FF4057 35%, #FFC72C 65%, #8CC63F 100%)' }}></div>
        </div>
      </motion.div>
    </div>
  );
}
