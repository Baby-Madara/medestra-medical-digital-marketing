import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MetaAdsManagerPage from './MetaAdsManagerPage';
import MetaAdsPage from './MetaAdsPage';
import { LanguageProvider } from './LanguageContext';
import { AudioProvider } from './AudioContext';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  return (
    <HashRouter>
      <CustomCursor />

      <AudioProvider>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/meta-ads-master" element={<MetaAdsPage />} />
            <Route path="/meta-ads-manager" element={<MetaAdsManagerPage />} />
          </Routes>
        </LanguageProvider>
      </AudioProvider>
    </HashRouter>
  );
};

export default App;