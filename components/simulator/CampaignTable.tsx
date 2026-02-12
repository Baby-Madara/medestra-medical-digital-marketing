
import React from 'react';
import { Pen, BarChart3, Clock, ChevronDown, ArrowUpDown, PlusCircle, Trash2, Copy } from 'lucide-react';
import { Campaign, AdSet, Ad } from '../../utils/simulator/mockData';

interface CampaignTableProps {
  data: (Campaign | AdSet | Ad)[];
  activeTab: 'Campaigns' | 'Ad Sets' | 'Ads';
  selectedIds: Set<string>;
  visibleColumns: Record<string, boolean>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: (checked: boolean) => void;
  onStatusChange: (id: string) => void;
  onAdClick?: (ad: Ad) => void;
}

const CampaignTable: React.FC<CampaignTableProps> = ({
  data,
  activeTab,
  selectedIds,
  visibleColumns,
  onToggleSelect,
  onToggleSelectAll,
  onStatusChange,
  onAdClick
}) => {

  const allSelected = data.length > 0 && data.every(item => selectedIds.has(item.id));
  const isIndeterminate = selectedIds.size > 0 && !allSelected;

  const getNameLabel = () => {
    switch (activeTab) {
      case 'Campaigns': return 'Campaign';
      case 'Ad Sets': return 'Ad set';
      case 'Ads': return 'Ad';
      default: return 'Name';
    }
  };

  // Helper to check if a specific optional column should be shown
  const showCol = (key: string) => visibleColumns[key] !== false;

  if (data.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#F0F2F5] text-center p-8">
        <div className="bg-gray-200 p-4 rounded-full mb-4">
          <PlusCircle size={48} className="text-gray-400" />
        </div>
        <h3 className="text-[18px] font-bold text-[#1C1E21] mb-2">No results found</h3>
        <p className="text-[14px] text-gray-500 mb-6">You haven't created any ads yet.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-white">
      {/* Table Content */}
      <div className="overflow-auto flex-1 custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1400px]">
          <thead className="bg-[#F7F8FA] sticky top-0 z-20 text-[12px] font-bold text-[#65676B] shadow-[0_1px_0_#DADDE1]">
            <tr>
              <th className="p-2 w-10 text-center border-r border-gray-300">
                <input
                  type="checkbox"
                  className="rounded border-gray-400 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4 cursor-pointer"
                  checked={allSelected}
                  ref={input => { if (input) input.indeterminate = isIndeterminate; }}
                  onChange={(e) => onToggleSelectAll(e.target.checked)}
                />
              </th>
              <th className="p-2 w-16 border-r border-gray-300">
                <div className="flex items-center cursor-pointer hover:bg-gray-200/50 -m-2 p-2">
                  Off / On <ArrowUpDown size={12} className="ml-1" />
                </div>
              </th>
              <th className="p-2 min-w-[300px] border-r border-gray-300">
                <div className="flex items-center justify-between cursor-pointer hover:bg-gray-200/50 -m-2 p-2">
                  {getNameLabel()} <ArrowUpDown size={12} className="ml-1" />
                </div>
              </th>
              <th className="p-2 w-32 border-r border-gray-300">
                <div className="flex items-center cursor-pointer hover:bg-gray-200/50 -m-2 p-2">
                  Delivery <ArrowUpDown size={12} className="ml-1" />
                </div>
              </th>

              {/* Conditional Columns */}
              {activeTab !== 'Ads' && showCol('budget') && (
                <th className="p-2 border-r border-gray-300">
                  <div className="flex items-center cursor-pointer hover:bg-gray-200/50 -m-2 p-2">
                    Budget <ArrowUpDown size={12} className="ml-1" />
                  </div>
                </th>
              )}
              {activeTab === 'Campaigns' && showCol('bidStrategy') && (
                <th className="p-2 border-r border-gray-300">
                  <div className="flex items-center cursor-pointer hover:bg-gray-200/50 -m-2 p-2">
                    Bid Strategy
                  </div>
                </th>
              )}
              {activeTab === 'Ads' && showCol('qualityRanking') && (
                <th className="p-2 border-r border-gray-300">
                  <div className="flex items-center cursor-pointer hover:bg-gray-200/50 -m-2 p-2">
                    Quality Ranking
                  </div>
                </th>
              )}

              {showCol('results') && <th className="p-2 border-r border-gray-300 text-right">Results</th>}
              {showCol('reach') && <th className="p-2 border-r border-gray-300 text-right">Reach</th>}
              {showCol('impressions') && <th className="p-2 border-r border-gray-300 text-right">Impressions</th>}
              {showCol('costPerResult') && <th className="p-2 border-r border-gray-300 text-right">Cost per result</th>}
              {showCol('amountSpent') && <th className="p-2 border-r border-gray-300 text-right">Amount spent</th>}
              {showCol('ends') && <th className="p-2 border-r border-gray-300">Ends</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-[13px] text-[#1C1E21]">
            {data.map((item) => {
              const isSelected = selectedIds.has(item.id);
              return (
                <tr
                  key={item.id}
                  className={`group ${isSelected ? 'bg-[#F0F7FF]' : 'hover:bg-gray-50'}`}
                >
                  <td className="p-2 text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      className="rounded border-gray-400 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4 cursor-pointer"
                      checked={isSelected}
                      onChange={() => onToggleSelect(item.id)}
                    />
                  </td>
                  <td className="p-2 border-r border-gray-200 text-center">
                    <label className="inline-flex relative items-center cursor-pointer group/toggle" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.delivery === 'Active' || item.delivery === 'Learning'}
                        onChange={() => onStatusChange(item.id)}
                      />
                      <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm peer-checked:bg-[#1877F2] hover:after:scale-95 transition-colors"></div>
                    </label>
                  </td>
                  <td className="p-2 border-r border-gray-200 relative group-hover:pr-24">
                    <div className="flex items-center">
                      {/* Status Bar */}
                      <div className={`w-1 h-8 mr-2 rounded-full ${item.delivery === 'Active' ? 'bg-[#31A24C]' : item.delivery === 'Learning' ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                      <div>
                        <div
                          className="font-semibold text-[#1877F2] hover:underline cursor-pointer text-[13px]"
                          onClick={() => activeTab === 'Ads' && onAdClick && onAdClick(item as Ad)}
                        >
                          {item.name}
                        </div>
                        <div className="text-[11px] text-gray-500 hidden group-hover:block transition-opacity">ID: {item.id}</div>
                      </div>
                    </div>

                    {/* Action Overlay */}
                    <div className="absolute right-0 top-0 h-full items-center pr-2 bg-gradient-to-l from-gray-50 via-gray-50 to-transparent w-auto pl-8 hidden group-hover:flex z-10">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <div className="flex items-center mr-2 text-gray-500 hover:text-[#1877F2] cursor-pointer relative group/chart">
                          <span className="text-[11px] hover:underline">View Charts</span>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-medium text-white bg-[#1C1E21] rounded opacity-0 group-hover/chart:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm z-50">
                            View Performance
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#1C1E21]"></div>
                          </div>
                        </div>

                        <RowActionButton icon={<Pen size={12} />} label="Edit" />
                        <RowActionButton icon={<Copy size={12} />} label="Duplicate" />
                        <RowActionButton icon={<Trash2 size={12} />} label="Delete" />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border-r border-gray-200">
                    <div className="flex flex-col justify-center h-full">
                      <span className="text-[13px] text-[#1C1E21]">{item.delivery}</span>
                      {item.delivery === 'Active' && <span className="text-[11px] text-gray-500">Run consistently</span>}
                      {item.delivery === 'Learning' && <span className="text-[11px] text-orange-600 font-medium">Learning limited</span>}
                      {item.delivery === 'In Draft' && <span className="text-[11px] text-gray-500">Not published</span>}
                    </div>
                  </td>

                  {activeTab !== 'Ads' && showCol('budget') && (
                    <td className="p-2 border-r border-gray-200 text-gray-600">
                      {'budget' in item ? (item as any).budget : '-'}
                    </td>
                  )}

                  {activeTab === 'Campaigns' && showCol('bidStrategy') && (
                    <td className="p-2 border-r border-gray-200 text-gray-600">
                      {'bidStrategy' in item ? (item as any).bidStrategy : '-'}
                    </td>
                  )}

                  {activeTab === 'Ads' && showCol('qualityRanking') && (
                    <td className="p-2 border-r border-gray-200 text-gray-600">
                      {'qualityRanking' in item ? (item as any).qualityRanking : '-'}
                    </td>
                  )}

                  {showCol('results') && <td className="p-2 border-r border-gray-200 text-right">{item.results}</td>}
                  {showCol('reach') && <td className="p-2 border-r border-gray-200 text-right tabular-nums">{item.reach}</td>}
                  {showCol('impressions') && <td className="p-2 border-r border-gray-200 text-right tabular-nums">{item.impressions}</td>}
                  {showCol('costPerResult') && <td className="p-2 border-r border-gray-200 text-right tabular-nums">{item.costPerResult}</td>}
                  {showCol('amountSpent') && <td className="p-2 border-r border-gray-200 text-right tabular-nums">{item.amountSpent}</td>}
                  {showCol('ends') && <td className="p-2 border-r border-gray-200 text-gray-500">{item.ends}</td>}
                </tr>
              )
            })}
            {/* Total Row */}
            <tr className="bg-[#F7F8FA] font-bold text-[#1C1E21] text-[12px] border-t border-gray-300 shadow-inner">
              <td className="p-2 border-r border-gray-300"></td>
              <td className="p-2 border-r border-gray-300"></td>
              <td className="p-2 border-r border-gray-300 text-right pr-4">Total</td>
              <td className="p-2 border-r border-gray-300"></td>
              {activeTab !== 'Ads' && showCol('budget') && <td className="p-2 border-r border-gray-300"></td>}
              {activeTab === 'Campaigns' && showCol('bidStrategy') && <td className="p-2 border-r border-gray-300"></td>}
              {activeTab === 'Ads' && showCol('qualityRanking') && <td className="p-2 border-r border-gray-300"></td>}
              {showCol('results') && <td className="p-2 border-r border-gray-300 text-right">19,629</td>}
              {showCol('reach') && <td className="p-2 border-r border-gray-300 text-right">68,700</td>}
              {showCol('impressions') && <td className="p-2 border-r border-gray-300 text-right">87,200</td>}
              {showCol('costPerResult') && <td className="p-2 border-r border-gray-300 text-right">$3.21</td>}
              {showCol('amountSpent') && <td className="p-2 border-r border-gray-300 text-right">$3,171.90</td>}
              {showCol('ends') && <td className="p-2 border-r border-gray-300"></td>}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="h-8 border-t border-gray-300 text-[12px] text-[#1C1E21] bg-[#F7F8FA] flex justify-between items-center px-4 z-20">
        <span className={`font-medium ${selectedIds.size > 0 ? "text-[#1877F2]" : ""}`}>
          {selectedIds.size > 0 ? `${selectedIds.size} selected` : `${data.length} ${activeTab.toLowerCase()}`}
        </span>
        <div className="flex space-x-6 items-center">
          <span className="cursor-pointer">Rows per page: 20 <ChevronDown size={10} className="inline ml-1" /></span>
          <span>1-{data.length} of {data.length}</span>
        </div>
      </div>
    </div>
  );
};

const RowActionButton = ({ icon, label, onClick }: any) => (
  <button
    className="p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-800 relative group/btn transition-colors"
    onClick={(e) => {
      e.stopPropagation();
      if (onClick) onClick();
    }}
  >
    {icon}
    {/* Tooltip */}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-medium text-white bg-[#1C1E21] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-sm">
      {label}
      {/* Arrow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#1C1E21]"></div>
    </div>
  </button>
);

export default CampaignTable;
