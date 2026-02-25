import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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
            </Routes>
          </Suspense>
        </AudioProvider>
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;