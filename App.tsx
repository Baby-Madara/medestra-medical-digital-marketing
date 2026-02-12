import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MetaAdsPage from './MetaAdsPage';
import { LanguageProvider } from './LanguageContext';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  return (
    <HashRouter>
      <CustomCursor />

      <LanguageProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/meta-ads-master" element={<MetaAdsPage />} />
        </Routes>
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;