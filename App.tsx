import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import { AudioProvider } from './AudioContext';
import CustomCursor from './components/CustomCursor';
import GlobalBackground from './components/GlobalBackground';
import SplashScreen from './components/SplashScreen';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./components/LandingPage'));
const MetaAdsManagerPage = lazy(() => import('./MetaAdsManagerPage'));
const MetaAdsPage = lazy(() => import('./MetaAdsPage'));
const ServiceLanding = lazy(() => import('./components/ServiceLanding'));
const FAQPage = lazy(() => import('./components/FAQPage'));
const AcademyLanding = lazy(() => import('./components/AcademyLanding'));
const CertificateVerification = lazy(() => import('./components/CertificateVerification'));
const PharmacySalesCourse = lazy(() => import('./components/PharmacySalesCourse'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <HashRouter>
      <ScrollToTop />
      <CustomCursor />
      <GlobalBackground />

      <LanguageProvider>
        <AudioProvider>
          <Suspense fallback={<SplashScreen />}>
            <Routes>
              <Route path="/service/:slug" element={<ServiceLanding />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/meta-ads-master" element={<MetaAdsPage />} />
              <Route path="/meta-ads-manager" element={<MetaAdsManagerPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/academy" element={<AcademyLanding />} />
              <Route path="/verify-certificate" element={<CertificateVerification />} />
              <Route path="/pharmacy-sales" element={<PharmacySalesCourse />} />
            </Routes>
          </Suspense>
        </AudioProvider>
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;