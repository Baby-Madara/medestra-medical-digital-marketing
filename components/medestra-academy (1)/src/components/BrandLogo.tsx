import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  style?: React.CSSProperties;
  forceFallback?: boolean;
}

export function BrandLogo({ className = "w-10 h-10", style, forceFallback = false }: BrandLogoProps) {
  const [error, setError] = useState(false);
  
  // Try a more direct Google content link, but fallback gracefully
  // Add timestamp to bypass cache and ensure CORS headers are received
  const logoUrl = "https://lh3.googleusercontent.com/d/1sBR2GW-CwhHfpREEl8cXdYX3tNbBzb6g?t=" + new Date().getTime();

  if (error || forceFallback) {
    return (
      <div 
        className={`${className} flex items-center justify-center overflow-hidden`}
        style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#ffffff', 
          borderRadius: '0.75rem', 
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          ...style 
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 80V40C20 30 25 20 40 20C50 20 55 30 55 40V80" stroke="#0EA5E9" strokeWidth="12" strokeLinecap="round"/>
          <path d="M55 40C55 30 60 20 75 20C90 20 95 30 95 40V60C95 75 85 80 75 80C65 80 55 70 55 60" stroke="#0EA5E9" strokeWidth="12" strokeLinecap="round"/>
          <path d="M55 60H85" stroke="#0EA5E9" strokeWidth="12" strokeLinecap="round"/>
          {/* Colorful accents to match the requested logo vibe */}
          <circle cx="20" cy="80" r="6" fill="#EF4444" />
          <circle cx="55" cy="80" r="6" fill="#EAB308" />
          <circle cx="95" cy="40" r="6" fill="#22C55E" />
        </svg>
      </div>
    );
  }

  return (
    <img 
      src={logoUrl} 
      alt="Medestra Academy" 
      className={`${className} object-contain`}
      style={{
        objectFit: 'contain',
        ...style
      }}
      onError={() => setError(true)}
      crossOrigin="anonymous"
    />
  );
}
