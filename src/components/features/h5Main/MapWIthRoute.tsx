"use client";

import type { ExperienceItem } from './types';

interface MapWIthRouteProps {
  currentMapView: '3D' | '2D';
  selectedCategory: string | null;
  allData: Record<string, ExperienceItem[]>;
  showMapDayControls: boolean;
  currentDayView: number;
  onToggleMap: () => void;
  onShowDayRoute: (day: number) => void;
}

export default function MapWIthRoute({
  currentMapView,
  selectedCategory,
  allData,
  showMapDayControls,
  currentDayView,
  onToggleMap,
  onShowDayRoute
}: MapWIthRouteProps) {
  return (
    <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <button
        onClick={onToggleMap}
        className="absolute top-3 md:top-5 left-3 md:left-5 z-50 bg-white/90 backdrop-blur-lg border border-gray-200 text-gray-700 px-3 md:px-5 py-2 md:py-3 rounded-full hover:bg-[#fe585f] hover:text-white transition-all text-xs md:text-sm shadow-lg"
      >
        {currentMapView === '3D' ? '🌍 2D' : '🌍 3D'}
      </button>

      <div className="absolute top-16 md:top-20 left-3 md:left-5 bg-white/95 backdrop-blur-lg border border-gray-200 p-3 md:p-4 rounded-xl z-40 min-w-[160px] md:min-w-[200px] shadow-lg">
        <h4 className="text-[#fe585f] mb-2 text-xs md:text-sm font-bold">📍 罗马历史中心区</h4>
        <p className="text-xs mb-1 text-gray-600">🗺️ 总面积: 约3.2公里²</p>
        <p className="text-xs mb-1 text-gray-600">⏱️ 步行穿越: 45-60分钟</p>
        <p className="text-xs mb-1 text-gray-600">🚇 地铁覆盖: A线、B线</p>
        <p className="text-xs text-gray-600">📌 已标记: {Object.values(allData).flat().length} 个推荐地点</p>
      </div>

      {/* 3D */}
      <div
        className={`absolute inset-0 transition-opacity duration-800 ${currentMapView === '3D' ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'radial-gradient(circle at center, #f8f9fa 0%, #e9ecef 100%)' }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-600">
            🌍 3D罗马城市视图<br />
            <small>浮动的光点代表各种体验服务</small>
          </div>
        </div>
      </div>

      {/* 2D */}
      <div
        className={`absolute inset-0 transition-opacity duration-800 ${currentMapView === '2D' ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)' }}
      >
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#fe585f] border-3 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-40 animate-pulse shadow-lg" />
        {Object.entries(allData).map(([category, items]) =>
          items.map((item) => (
            <div
              key={item.id}
              className="absolute w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs cursor-pointer transition-all hover:scale-125 z-30 shadow-lg"
              style={{
                backgroundColor: item.color,
                left: `${item.x}%`,
                top: `${item.y}%`,
                opacity: selectedCategory === category || !selectedCategory ? 0.8 : 0.4
              }}
              title={item.name}
            >
              {item.emoji}
            </div>
          ))
        )}

        {showMapDayControls && (
          <div className="absolute top-16 md:top-20 right-3 md:right-5 bg-white/95 backdrop-blur-lg border border-gray-200 p-3 md:p-4 rounded-xl z-40 shadow-lg">
            {[1, 2, 3].map((d) => (
              <button
                key={d}
                className={`block w-full border border-gray-200 text-gray-700 p-1.5 md:p-2 ${d !== 3 ? 'mb-1.5 md:mb-2' : ''} rounded-lg text-xs transition-all ${
                  currentDayView === d ? 'bg-[#fe585f] text-white border-[#fe585f]' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => onShowDayRoute(d)}
              >
                第{d}天
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


