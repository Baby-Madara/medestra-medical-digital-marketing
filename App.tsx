import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MetaAdsManagerPage from './MetaAdsManagerPage';
import MetaAdsPage from './MetaAdsPage';
import ServiceLanding from './components/ServiceLanding';
import { LanguageProvider } from './LanguageContext';
import { AudioProvider } from './AudioContext';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  return (
    <HashRouter>
      <CustomCursor />

      <LanguageProvider>
        <AudioProvider>
          <Routes>
            <Route path="/service/:slug" element={<ServiceLanding />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/meta-ads-master" element={<MetaAdsPage />} />
            <Route path="/meta-ads-manager" element={<MetaAdsManagerPage />} />
          </Routes>
        </AudioProvider>
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;