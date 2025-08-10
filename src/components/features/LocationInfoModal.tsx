'use client';

import type { MapPoint } from '@/types/travel';

interface LocationInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPoint: MapPoint | null;
  onCheckIn: (point: MapPoint) => void;
}

export default function LocationInfoModal({ isOpen, onClose, selectedPoint, onCheckIn }: LocationInfoModalProps) {
  if (!isOpen || !selectedPoint) {
    return null;
  }

  const handleCheckIn = () => {
    console.log('LocationInfoModal: handleCheckIn called');
    console.log('LocationInfoModal: selectedPoint:', selectedPoint);
    onCheckIn(selectedPoint);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9997] pointer-events-auto flex items-center justify-center p-4">
      {/* 对话气泡 */}
      <div className="relative bg-white shadow-lg rounded-2xl p-4 border border-slate-200 max-w-[320px] w-full">
        {/* 气泡尾巴 */}
        <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-slate-200 transform rotate-45"></div>
        
        <div className="space-y-2">
          {/* 标题和关闭按钮 */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">{selectedPoint.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-amber-500 text-xs">★ {selectedPoint.rating}</span>
                <span className="text-slate-500 text-xs">{selectedPoint.openingHours}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* 地点类型和简介 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] rounded-full flex items-center justify-center">
              {selectedPoint.type === 'attraction' && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
              {selectedPoint.type === 'restaurant' && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 2v20" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v2c0 1.1-.9 2-2 2h-1a2 2 0 0 1-2-2v-6c0-1.1.9-2 2-2h4Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v-2a2 2 0 0 0-2-2H19" />
                </svg>
              )}
              {selectedPoint.type === 'hotel' && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 4v16" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 8h18a2 2 0 0 1 2 2v10" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 17h20" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 8v9" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-slate-600 text-xs capitalize">{selectedPoint.type}</p>
              <p className="text-slate-500 text-xs">{getLocationDescription(selectedPoint)}</p>
            </div>
          </div>

          {/* 打卡按钮 */}
          <button 
            onClick={handleCheckIn}
            className="w-full px-3 py-2 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white rounded-xl text-xs font-medium hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Check-in Here
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// 获取简化的地点描述
function getLocationDescription(point: MapPoint): string {
  const descriptions: Record<string, string> = {
    'Shibuya Crossing': 'World\'s busiest pedestrian crossing.',
    'Meiji Shrine': 'Peaceful shrine in lush forest.',
    'Senso-ji Temple': 'Tokyo\'s oldest temple.',
    'Tsukiji Outer Market': 'Vibrant food market.'
  };
  
  return descriptions[point.name] || `Discover ${point.name}.`;
} 