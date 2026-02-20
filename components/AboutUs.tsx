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

  // Gradient border style - blended from brand colors with transparency
  const gradientBorderStyle = {
    background: 'linear-gradient(135deg, rgba(26, 117, 255, 0.6), rgba(239, 68, 68, 0.6), rgba(245, 158, 11, 0.6))',
    borderRadius: '50%',
    padding: '3px',
  };

  return (
    <section
      id="aboutUs"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white"
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
                <div className="relative mb-6 w-full flex justify-center">
                  <div style={gradientBorderStyle} className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="w-48 h-48 rounded-full overflow-hidden bg-white">
                      <img
                        src={teamMembers[1].image}
                        alt={teamMembers[1].name}
                        className="w-full h-full object-cover"
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
                <div className="relative mb-6 w-full flex justify-center">
                  <div style={{...gradientBorderStyle, padding: '4px'}} className="shadow-2xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="w-56 h-56 rounded-full overflow-hidden bg-white">
                      <img
                        src={teamMembers[0].image}
                        alt={teamMembers[0].name}
                        className="w-full h-full object-cover"
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
                <div className="relative mb-6 w-full flex justify-center">
                  <div style={gradientBorderStyle} className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="w-48 h-48 rounded-full overflow-hidden bg-white">
                      <img
                        src={teamMembers[2].image}
                        alt={teamMembers[2].name}
                        className="w-full h-full object-cover"
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
              <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {t.aboutUs.mission}
                </h4>
                <p className={`text-gray-700 leading-relaxed text-center ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                  {t.aboutUs.missionDescription}
                </p>
              </div>

              {/* Vision Card - Glass Morphism */}
              <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
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
