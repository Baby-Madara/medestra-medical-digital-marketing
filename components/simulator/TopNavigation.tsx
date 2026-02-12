
import React, { useState } from 'react';
import { ChevronDown, RefreshCw, RotateCcw, MoreHorizontal, CheckCircle } from 'lucide-react';

interface TopNavigationProps {
  draftCount: number;
  onDiscard: () => void;
  onPublish: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ 
  draftCount, 
  onDiscard, 
  onPublish, 
  onRefresh,
  isRefreshing 
}) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  return (
    <div className="h-[60px] bg-[#FFFFFF] border-b border-gray-300 flex items-center justify-between px-4 sticky top-0 z-40 shadow-sm shrink-0">
      <div className="flex items-center">
        {/* Context Title */}
        <div className="text-[20px] font-medium text-[#1C1E21] mr-3">Campaigns</div>
        
        {/* Account Selector */}
        <div 
          className="relative"
          onClick={() => setShowAccountMenu(!showAccountMenu)}
        >
          <div className="flex items-center bg-[#F0F2F5] hover:bg-[#E4E6EB] cursor-pointer px-2 py-1.5 rounded-md transition-colors border border-transparent hover:border-gray-300">
            <div className="w-6 h-6 bg-gray-600 rounded text-[10px] flex items-center justify-center font-bold text-white mr-2">
              M
            </div>
            <div className="text-[14px] font-semibold text-[#1C1E21] mr-2">
              Medestra Ad (608896791...
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
          
          {/* Mock Account Dropdown */}
          {showAccountMenu && (
            <div className="absolute top-full left-0 mt-1 w-[280px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2">
                <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">Select Account</div>
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center">
                    <div className="w-6 h-6 bg-gray-600 rounded text-[10px] flex items-center justify-center font-bold text-white mr-3">M</div>
                    <div className="text-sm font-medium">Medestra Ad</div>
                    <CheckCircle size={14} className="ml-auto text-blue-500" />
                </div>
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center">
                    <div className="w-6 h-6 bg-purple-600 rounded text-[10px] flex items-center justify-center font-bold text-white mr-3">A</div>
                    <div className="text-sm font-medium">Acme Backup</div>
                </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={onRefresh}
          className={`p-2 hover:bg-gray-100 rounded-md transition-colors text-gray-500 border border-gray-300 ${isRefreshing ? 'animate-spin' : ''}`}
          title="Refresh Data"
        >
            <RefreshCw size={16} />
        </button>
        
        <button 
          onClick={onDiscard}
          disabled={draftCount === 0}
          className={`flex items-center px-3 py-1.5 rounded-md text-[14px] font-semibold border transition-colors
            ${draftCount > 0 
              ? 'bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#1C1E21] border-gray-300 cursor-pointer' 
              : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'}
          `}
        >
             <RotateCcw size={14} className="mr-2" />
             Discard drafts
        </button>

        <button 
          onClick={onPublish}
          disabled={draftCount === 0}
          className={`flex items-center px-4 py-1.5 rounded-md text-[14px] font-bold shadow-sm transition-colors
            ${draftCount > 0 
              ? 'bg-[#1877F2] hover:bg-[#166fe5] text-white cursor-pointer' 
              : 'bg-[#E4E6EB] text-gray-400 cursor-not-allowed'}
          `}
        >
            {draftCount > 0 ? `Review and publish (${draftCount})` : 'Review and publish'}
        </button>

        <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-500">
            <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopNavigation;
