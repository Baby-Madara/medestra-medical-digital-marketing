import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', phone: '', clinic: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', phone: '', clinic: '', message: '' });
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="min-h-screen md:h-screen md:overflow-hidden snap-start pt-20 pb-0 md:pt-24 md:pb-4 bg-blue-50 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center">
        
        {/* Mobile Icon Banner */}
        <div className="lg:hidden flex justify-between items-center bg-brand-blue text-white p-4 rounded-t-2xl shadow-lg mb-0 z-10 shrink-0">
           <div className="font-bold text-lg">{t.contact.heading}</div>
           <div className="flex gap-3">
              <a href="https://wa.me/201118080265" target="_blank" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"><Phone className="w-5 h-5"/></a>
              <a href="mailto:marketing@medestra.me" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"><Mail className="w-5 h-5"/></a>
              <a href="https://www.google.com/maps" target="_blank" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"><MapPin className="w-5 h-5"/></a>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 bg-white rounded-b-2xl lg:rounded-3xl shadow-xl overflow-hidden h-auto lg:h-auto shrink flex-1 lg:flex-none">
          
          {/* Desktop Contact Info (Hidden on Mobile) */}
          <div className="hidden lg:flex bg-brand-blue p-8 text-white flex-col justify-between relative overflow-hidden h-full">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">{t.contact.heading}</h2>
              <p className="text-blue-100 mb-10 text-lg">
                {t.contact.subheading}
              </p>
              
              <div className="space-y-4">
                {/* WhatsApp Button */}
                <a 
                  href="https://wa.me/201118080265" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-green-500/30 w-full"
                >
                  <Phone className="w-5 h-5 fill-current" />
                  <span>{t.contact.whatsappBtn}</span>
                </a>

                <div className="h-px bg-white/20 my-4"></div>

                <a href="https://wa.me/201118080265" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-100 uppercase">{t.contact.call}</p>
                    <p className="font-bold text-lg" dir="ltr">+20 111 808 0265</p>
                  </div>
                </a>
                
                <a href="mailto:marketing@medestra.me" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-100 uppercase">{t.contact.email}</p>
                    <p className="font-bold text-lg">marketing@medestra.me</p>
                  </div>
                </a>

                <a href="https://www.google.com/maps/search/?api=1&query=Medestra+Marketing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-100 uppercase">{t.contact.addressTitle}</p>
                    <p className="font-bold text-lg">{t.contact.address}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Decor */}
            <div className="absolute -bottom-10 -right-10 opacity-20 z-0 pointer-events-none">
               <div className="text-[12rem] font-extrabold text-white leading-none">me</div>
            </div>
          </div>

          {/* Form */}
          <div className="p-4 md:p-8 flex flex-col justify-center h-full overflow-y-auto">
            <h3 className="hidden lg:block text-2xl font-bold text-gray-900 mb-8">{t.contact.formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">{t.contact.nameLabel}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-sm"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">{t.contact.phoneLabel}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-sm"
                    placeholder={t.contact.phonePlaceholder}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="clinic" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">{t.contact.clinicLabel}</label>
                <input
                  type="text"
                  id="clinic"
                  name="clinic"
                  value={formState.clinic}
                  onChange={handleChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-sm"
                  placeholder={t.contact.clinicPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">{t.contact.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formState.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all resize-none text-sm"
                  placeholder={t.contact.messagePlaceholder}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg flex items-center justify-center gap-2 transition-all ${
                  isSuccess 
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-brand-red text-white hover:bg-red-600 shadow-lg hover:shadow-red-200'
                }`}
              >
                {isSuccess ? (
                  t.contact.success
                ) : (
                  <>
                    {isSubmitting ? t.contact.submitting : t.contact.submit}
                    {!isSubmitting && <Send className="w-4 h-4 md:w-5 md:h-5" />}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;