import React from 'react';
import { useLanguage } from '../LanguageContext';

const AboutUs: React.FC = () => {
  const { t, language } = useLanguage();

  const teamMembers = [
    {
      name: t.aboutUs.founder.name,
      title: t.aboutUs.founder.title,
      image: './photos/يبليبليلي.png', // Photo of Dr. Mahmoud Hussein
      position: 'center',
    },
    {
      name: t.aboutUs.cofounder1.name,
      title: t.aboutUs.cofounder1.title,
      image: './photos/لابلرلات.jpeg', // Photo of Dr. Ameema
      position: 'right',
    },
    {
      name: t.aboutUs.cofounder2.name,
      title: t.aboutUs.cofounder2.title,
      image: './photos/WhatsApp Image 2026-02-19 at 4.59.18 PM.jpeg', // Photo of Dr. Khulood Khaled
      position: 'left',
    },
  ];

  // Premium gradient border style using all 4 brand colors
  const gradientBorderStyle = {
    background: 'linear-gradient(135deg, #00AEEF, #EF4136, #FFD037, #8DC63F)',
    borderRadius: '50%',
    padding: '5px',
    boxShadow: '0 8px 32px rgba(0, 174, 239, 0.35)',
  };

  return (
    <section
      id="aboutUs"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.aboutUs.heading}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {t.aboutUs.description}
          </p>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t.aboutUs.team}
          </h3>

          {/* Team Members Grid */}
          <div className="relative">
            {/* Centered layout with responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start justify-items-center mb-16">
              {/* Right Member (Dr. Ameema) - Appears on Right on Desktop */}
              <div className="flex flex-col items-center w-full md:order-3 order-2">
                <div className="relative mb-6 w-full flex justify-center group">
                  <div className="relative p-1.5 bg-white/[0.05] backdrop-blur-[32px] rounded-full border-t-[1.5px] border-l-[1.5px] border-white/80 border-b border-r border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.1),_inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-700 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.15),_inset_0_1px_2px_rgba(255,255,255,1)]">
                    <div className="w-48 h-48 rounded-full overflow-hidden bg-transparent border border-white/10">
                      <img
                        src={teamMembers[1].image}
                        alt={teamMembers[1].name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
                <div className={`text-center ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {teamMembers[1].name}
                  </h4>
                  <p className="text-sm text-brand-blue font-semibold mb-2">
                    {teamMembers[1].title}
                  </p>
                </div>
              </div>

              {/* Center Member (Dr. Mahmoud Hussein) - Always Center */}
              <div className="flex flex-col items-center w-full md:order-2 order-1">
                <div className="relative mb-6 w-full flex justify-center group">
                  <div className="relative p-2 bg-white/[0.05] backdrop-blur-[40px] rounded-full border-t-[2px] border-l-[2px] border-white/90 border-b border-r border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.15),_inset_0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-700 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.2),_inset_0_1px_3px_rgba(255,255,255,1)]">
                    <div className="w-56 h-56 rounded-full overflow-hidden bg-transparent border border-white/20">
                      <img
                        src={teamMembers[0].image}
                        alt={teamMembers[0].name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
                <div className={`text-center ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {teamMembers[0].name}
                  </h4>
                  <p className="text-sm text-brand-blue font-semibold mb-2">
                    {teamMembers[0].title}
                  </p>
                </div>
              </div>

              {/* Left Member (Dr. Khulood Khaled) - Appears on Left on Desktop */}
              <div className="flex flex-col items-center w-full md:order-1 order-3">
                <div className="relative mb-6 w-full flex justify-center group">
                  <div className="relative p-1.5 bg-white/[0.05] backdrop-blur-[32px] rounded-full border-t-[1.5px] border-l-[1.5px] border-white/80 border-b border-r border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.1),_inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-700 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.15),_inset_0_1px_2px_rgba(255,255,255,1)]">
                    <div className="w-48 h-48 rounded-full overflow-hidden bg-transparent border border-white/10">
                      <img
                        src={teamMembers[2].image}
                        alt={teamMembers[2].name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
                <div className={`text-center ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {teamMembers[2].name}
                  </h4>
                  <p className="text-sm text-brand-blue font-semibold mb-2">
                    {teamMembers[2].title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission and Vision Section */}
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card - Glass Morphism */}
              <div className="backdrop-blur-[40px] bg-white/[0.05] border-t-[2.5px] border-l-[2.5px] border-white/90 border-b border-r border-white/5 rounded-[3rem] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_35px_80px_rgba(0,0,0,0.15),_inset_0_1px_3px_rgba(255,255,255,1)] transition-all duration-700">
                <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {t.aboutUs.mission}
                </h4>
                <p className={`text-gray-700 leading-relaxed text-center ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                  {t.aboutUs.missionDescription}
                </p>
              </div>

              {/* Vision Card - Glass Morphism */}
              <div className="backdrop-blur-[40px] bg-white/[0.05] border-t-[2.5px] border-l-[2.5px] border-white/90 border-b border-r border-white/5 rounded-[3rem] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_35px_80px_rgba(0,0,0,0.15),_inset_0_1px_3px_rgba(255,255,255,1)] transition-all duration-700">
                <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {t.aboutUs.vision}
                </h4>
                <p className={`text-gray-700 leading-relaxed text-center ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                  {t.aboutUs.visionDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
