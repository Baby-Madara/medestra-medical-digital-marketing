import React from 'react';
import {
    Menu,
    Grid,
    Settings,
    BarChart2,
    Briefcase,
    Search,
    Bell,
    HelpCircle,
    Home,
    LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    activeTool: string;
    setActiveTool: (tool: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool }) => {
    const navigate = useNavigate();

    return (
        <div className="w-[60px] bg-[#303030] border-r border-[#444] flex flex-col items-center py-2 h-screen fixed left-0 top-0 z-50 transition-all duration-300">
            {/* Meta/Business Logo - Click to go back to Main App */}
            <div
                onClick={() => navigate('/')}
                className="mb-6 mt-2 p-2 text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                title="Exit Simulator"
            >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-[#303030] font-bold text-xs">∞</span>
                </div>
            </div>

            <div className="flex flex-col space-y-4 w-full px-2 items-center">
                <NavItem
                    icon={<Home size={20} />}
                    label="Home"
                    isActive={activeTool === 'Home'}
                    onClick={() => setActiveTool('Home')}
                />
                <NavItem
                    icon={<Briefcase size={20} />}
                    label="Campaigns"
                    isActive={activeTool === 'Campaigns'}
                    onClick={() => setActiveTool('Campaigns')}
                />
                <NavItem
                    icon={<BarChart2 size={20} />}
                    label="Ads Reporting"
                    isActive={activeTool === 'Ads Reporting'}
                    onClick={() => setActiveTool('Ads Reporting')}
                />
                <NavItem
                    icon={<Grid size={20} />}
                    label="All Tools"
                    isActive={activeTool === 'All Tools'}
                    onClick={() => setActiveTool('All Tools')}
                />
            </div>

            <div className="mt-auto flex flex-col space-y-4 w-full mb-4 px-2 items-center">
                <NavItem icon={<Settings size={20} />} label="Settings" isActive={activeTool === 'Settings'} onClick={() => setActiveTool('Settings')} />
                <NavItem icon={<HelpCircle size={20} />} label="Help" isActive={activeTool === 'Help'} onClick={() => setActiveTool('Help')} />

                <div
                    onClick={() => navigate('/')}
                    className="w-full flex justify-center mt-2 pt-2 border-t border-gray-600 cursor-pointer group"
                    title="Back to Medestra"
                >
                    <div className="p-2 text-gray-400 group-hover:text-white transition-colors">
                        <LogOut size={20} />
                    </div>
                </div>

                <div className="relative w-full flex justify-center mt-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all">
                        <img src="https://ui-avatars.com/api/?name=Meta+User&background=random" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
            relative p-2.5 rounded-lg cursor-pointer transition-all duration-200 group
            ${isActive
                    ? 'bg-[#444] text-white'
                    : 'text-gray-400 hover:bg-[#444] hover:text-white'
                }
        `}
        >
            {icon}
            {/* Tooltip */}
            <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-black text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[60]">
                {label}
            </div>
        </div>
    );
};

export default Sidebar;
