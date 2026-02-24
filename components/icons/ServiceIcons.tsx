import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

// Document/Article Icon
export const DocumentIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="13" x2="8" y2="13" />
    <line x1="12" y1="17" x2="8" y2="17" />
    <polyline points="9 9 8 10 9 11" />
  </svg>
);

// Target/Goal Icon
export const TargetIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);

// Analytics/Bar Chart Icon
export const AnalyticsIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M17 8v12" />
    <path d="M9 14v6" />
    <path d="M5 18v2" />
    <path d="M21 4v16" />
  </svg>
);

// Refresh/Calendar Icon
export const RefreshIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <path d="M21.5 2v6h-6M2.5 22v-6h6" />
    <path d="M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
  </svg>
);

// Lightbulb/Infographic Icon
export const LightbulbIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="10" r="2" />
  </svg>
);

// Mobile/Multi-Platform Icon
export const MobileIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

// Phone/Call Icon
export const PhoneIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Chat/Message Icon
export const ChatIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <circle cx="9" cy="10" r="1" />
    <circle cx="12" cy="10" r="1" />
    <circle cx="15" cy="10" r="1" />
  </svg>
);

// Email/Envelope Icon
export const EmailIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// Calendar/Schedule Icon
export const CalendarIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// Checklist/Tasks Icon
export const ChecklistIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
  </svg>
);

// Shopping/Bag Icon  
export const ShoppingIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

// Credit Card Icon
export const CreditCardIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

// Package/Box Icon
export const PackageIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

// Lock/Security Icon
export const LockIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// Truck/Shipping Icon
export const TruckIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="1" y="6" width="22" height="12" rx="1" />
    <path d="M17 6V4a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v2" />
    <circle cx="7" cy="19" r="2" />
    <circle cx="17" cy="19" r="2" />
  </svg>
);

// People/Community Icon
export const PeopleIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Trending/Growth Icon  
export const TrendingIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

// Money/Dollar Icon
export const MoneyIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="12" y1="9" x2="12" y2="15" />
    <path d="M9 12h6" />
  </svg>
);

// Teacher/Trainer Icon
export const TrainerIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

// Book/Learn Icon
export const BookIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

// Computer/Desktop Icon
export const ComputerIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

// Award/Trophy Icon
export const AwardIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <path d="M6 9H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2m-4-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1m4-3h4" />
    <line x1="9" y1="18" x2="9" y2="22" />
    <line x1="15" y1="18" x2="15" y2="22" />
    <line x1="9" y1="22" x2="15" y2="22" />
  </svg>
);

// Globe/Website Icon
export const GlobeIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// Zap/Speed Icon
export const ZapIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// Star/Rating Icon
export const StarIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill={color} className={className}>
    <polygon points="12 2 15.09 10.26 23.77 10.26 17.44 15.41 19.53 23.68 12 18.53 4.47 23.68 6.56 15.41 0.23 10.26 8.91 10.26" />
  </svg>
);

// Mapping all emoji to their icon components
const iconMap: { [key: string]: React.FC<IconProps> } = {
  '📝': DocumentIcon,
  '🎯': TargetIcon,
  '📊': AnalyticsIcon,
  '🔄': RefreshIcon,
  '💡': LightbulbIcon,
  '📱': MobileIcon,
  '📞': PhoneIcon,
  '💬': ChatIcon,
  '📧': EmailIcon,
  '📅': CalendarIcon,
  '📋': ChecklistIcon,
  '✅': ChecklistIcon,
  '🛍️': ShoppingIcon,
  '💳': CreditCardIcon,
  '📦': PackageIcon,
  '🔐': LockIcon,
  '🚚': TruckIcon,
  '👥': PeopleIcon,
  '📈': TrendingIcon,
  '💰': MoneyIcon,
  '👨‍🏫': TrainerIcon,
  '📚': BookIcon,
  '📖': BookIcon,
  '💻': ComputerIcon,
  '🏆': AwardIcon,
  '🌐': GlobeIcon,
  '⚡': ZapIcon,
  '★': StarIcon,
};

// Main component to render icon by emoji
export const FeatureIcon: React.FC<IconProps & { emoji: string }> = ({ emoji, className = 'w-8 h-8', color = 'currentColor' }) => {
  const IconComponent = iconMap[emoji];
  
  if (!IconComponent) {
    // Fallback to displaying the emoji if not found
    return <span className={className}>{emoji}</span>;
  }
  
  return <IconComponent className={className} color={color} />;
};

export default FeatureIcon;
