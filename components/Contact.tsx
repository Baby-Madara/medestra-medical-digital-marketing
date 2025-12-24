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
    <section id="contact" className="py-24 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Contact Info */}
          <div className="bg-brand-blue p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">{t.contact.heading}</h2>
              <p className="text-blue-100 mb-10 text-lg">
                {t.contact.subheading}
              </p>
              
              <div className="space-y-8">
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

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-100 uppercase">{t.contact.call}</p>
                    <p className="font-bold text-lg" dir="ltr">+20 111 808 0265</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-100 uppercase">{t.contact.email}</p>
                    <p className="font-bold text-lg">marketing@medestra.me</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-100 uppercase">{t.contact.addressTitle}</p>
                    <p className="font-bold text-lg">{t.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decor */}
            <div className="absolute -bottom-10 -right-10 opacity-20 z-0 pointer-events-none">
               <div className="text-[12rem] font-extrabold text-white leading-none">me</div>
            </div>
          </div>

          {/* Form */}
          <div className="p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">{t.contact.formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.nameLabel}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.phoneLabel}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                    placeholder={t.contact.phonePlaceholder}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="clinic" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.clinicLabel}</label>
                <input
                  type="text"
                  id="clinic"
                  name="clinic"
                  value={formState.clinic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  placeholder={t.contact.clinicPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  placeholder={t.contact.messagePlaceholder}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
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
                    {!isSubmitting && <Send className="w-5 h-5" />}
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