import React, { useState, useEffect } from 'react';
import { DragItem, DropZone } from '../../types/meta-ads';
import { ArrowDown, GripVertical, Check } from 'lucide-react';

interface DragDropProps {
  instruction: string;
  items: DragItem[];
  zones: DropZone[];
  onComplete: (success: boolean) => void;
}

export const DragDropComponent: React.FC<DragDropProps> = ({ instruction, items, zones, onComplete }) => {
  const [unplacedItems, setUnplacedItems] = useState<DragItem[]>(items);
  const [placements, setPlacements] = useState<Record<string, string[]>>({}); // zoneId -> itemId[]
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const initialPlacements: Record<string, string[]> = {};
    zones.forEach(z => initialPlacements[z.id] = []);
    setPlacements(initialPlacements);
  }, [zones]);

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    setFeedback(null);
  };

  const handleZoneClick = (zoneId: string) => {
    if (!selectedItem) return;

    const item = items.find(i => i.id === selectedItem);
    if (!item) return;

    if (item.targetId === zoneId) {
      setPlacements(prev => ({
        ...prev,
        [zoneId]: [...(prev[zoneId] || []), item.id]
      }));
      setUnplacedItems(prev => prev.filter(i => i.id !== item.id));
      setSelectedItem(null);
      setFeedback(null);
    } else {
      setFeedback('هذا ليس المكان الصحيح لهذا العنصر، حاول مرة أخرى.');
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  useEffect(() => {
    if (unplacedItems.length === 0 && items.length > 0) {
      onComplete(true);
    }
  }, [unplacedItems, items.length, onComplete]);

  return (
    <div className="animate-fade-in select-none">
      <h3 className="text-xl font-bold mb-6 text-slate-800">{instruction}</h3>

      {/* Item Pool */}
      <div className="bg-slate-100/80 backdrop-blur rounded-2xl p-6 mb-8 border border-slate-200 min-h-[100px] flex flex-wrap gap-3 items-center justify-center shadow-inner">
        {unplacedItems.length === 0 ? (
          <div className="flex flex-col items-center animate-bounce-in">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                 <Check className="w-6 h-6" />
              </div>
              <p className="text-green-700 font-bold">أحسنت! تم تصنيف جميع العناصر.</p>
          </div>
        ) : (
          unplacedItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`
                group px-5 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm border
                flex items-center gap-2 transform hover:-translate-y-1
                ${
                  selectedItem === item.id
                    ? 'bg-meta-blue text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-105 ring-2 ring-offset-2 ring-blue-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:shadow-md'
                }
              `}
            >
              <GripVertical className={`w-4 h-4 opacity-50 ${selectedItem === item.id ? 'text-white' : 'group-hover:text-blue-500'}`} />
              {item.text}
            </button>
          ))
        )}
      </div>

      {feedback && (
        <div className="mb-6 text-center bg-red-50 text-red-600 font-medium py-2 px-4 rounded-lg inline-block mx-auto animate-pulse border border-red-100">
          {feedback}
        </div>
      )}

      {/* Zones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {zones.map(zone => (
          <div
            key={zone.id}
            onClick={() => handleZoneClick(zone.id)}
            className={`
                min-h-[180px] rounded-2xl p-4 flex flex-col items-center transition-all duration-300 relative overflow-hidden group
                ${
                  selectedItem
                    ? 'border-2 border-dashed border-blue-400 bg-blue-50/50 cursor-pointer hover:bg-blue-100'
                    : 'border border-slate-200 bg-white hover:shadow-md'
                }
            `}
          >
            <h4 className="font-bold text-slate-700 mb-4 border-b pb-3 w-full text-center relative z-10 group-hover:text-meta-blue transition-colors">
                {zone.title}
            </h4>
            
            <div className="w-full space-y-2 flex-grow relative z-10">
              {placements[zone.id]?.map(itemId => {
                const item = items.find(i => i.id === itemId);
                return (
                  <div key={itemId} className="bg-white border-l-4 border-green-500 shadow-sm px-4 py-3 rounded-r-lg text-sm text-slate-700 font-medium animate-slide-up flex items-center justify-between">
                    {item?.text}
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                );
              })}
              
              {placements[zone.id]?.length === 0 && selectedItem && (
                 <div className="flex flex-col items-center justify-center h-full opacity-30 text-blue-600 animate-pulse">
                    <ArrowDown className="w-8 h-8 mb-2" />
                    <span className="text-xs font-bold uppercase tracking-widest">ضع هنا</span>
                 </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
