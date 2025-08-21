"use client";

import type { ExperienceItem } from './types';

interface SelectionPanelProps {
  selectedCategory: string | null;
  showTimeSelection: boolean;
  showSearchResults: boolean;
  selectedDay: number | null;
  selectedTimeSlot: string | null;
  allData: Record<string, ExperienceItem[]>;
  onSelectCategory: (c: string) => void;
  onSetDay: (day: number | null) => void;
  onSetTimeSlot: (slot: string | null) => void;
}

export default function SelectionPanel({
  selectedCategory,
  showTimeSelection,
  showSearchResults,
  selectedDay,
  selectedTimeSlot,
  allData,
  onSelectCategory,
  onSetDay,
  onSetTimeSlot
}: SelectionPanelProps) {
  return (
    <div className="hidden md:block w-[380px] h-full bg-white/80 backdrop-blur-xl border-l border-gray-200 p-6 overflow-y-auto shadow-lg">
      <div className="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-200">
        <div className="text-[#fe585f] font-bold mb-4">🎯 体验类型选择</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { category: 'activity', emoji: '🎪', title: '活动体验', desc: '运动、户外、文化' },
            { category: 'script', emoji: '🎭', title: '剧本体验', desc: '密室、角色扮演' },
            { category: 'service', emoji: '💼', title: '服务体验', desc: 'SPA、私厨、摄影' },
            { category: 'itinerary', emoji: '🗺️', title: 'AI行程', desc: '完整规划方案' }
          ].map((item) => (
            <button
              key={item.category}
              className={`p-4 rounded-xl text-center transition-all ${
                selectedCategory === item.category
                  ? 'bg-gradient-to-r from-[#fe585f] to-[#ff7a80] border-[#fe585f] text-white'
                  : 'bg-white border border-gray-200 hover:bg-[#fe585f] hover:text-white hover:-translate-y-0.5'
              } border text-gray-700 text-sm font-medium shadow-sm`}
              onClick={() => onSelectCategory(item.category)}
            >
              {item.emoji} {item.title}<br />
              <small className="text-xs opacity-80">{item.desc}</small>
            </button>
          ))}
        </div>
      </div>

      {showTimeSelection && (
        <div className="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-200">
          <div className="text-[#fe585f] font-bold mb-4">📅 选择体验天数</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              className="bg-white border border-gray-300 text-gray-700 p-3 rounded-xl text-sm outline-none focus:border-[#fe585f] focus:ring-2 focus:ring-[#fe585f]/20"
              value={selectedDay || ''}
              onChange={(e) => onSetDay(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">请选择天数</option>
              <option value="1">第1天</option>
              <option value="2">第2天</option>
              <option value="3">第3天</option>
            </select>
            <select
              className="bg-white border border-gray-300 text-gray-700 p-3 rounded-xl text-sm outline-none focus:border-[#fe585f] focus:ring-2 focus:ring-[#fe585f]/20"
              value={selectedTimeSlot || ''}
              onChange={(e) => onSetTimeSlot(e.target.value || null)}
            >
              <option value="">请选择时间段</option>
              <option value="morning">🌅 上午 (9:00-12:00)</option>
              <option value="afternoon">☀️ 下午 (14:00-17:00)</option>
              <option value="evening">🌆 傍晚 (18:00-21:00)</option>
            </select>
          </div>
          {selectedDay && selectedTimeSlot && (
            <button className="w-full bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white p-4 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-lg">
              确认天数安排
            </button>
          )}
        </div>
      )}

      {showSearchResults && (
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <div className="text-[#fe585f] font-bold mb-4">🔍 搜索结果</div>
          <div className="space-y-3">
            {selectedCategory && allData[selectedCategory]?.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-200 transition-all hover:bg-gray-50 hover:-translate-y-0.5 shadow-sm">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-3">{item.emoji}</span>
                  <span className="font-bold text-sm flex-1 text-gray-800">{item.name}</span>
                </div>
                <div className="text-xs text-gray-600 mb-3">
                  {item.description}<br />
                  📍 {item.location} | 💰 €{item.price} | ⏰ {item.duration} | ⭐ {item.rating}
                </div>
                <div className="flex gap-2 mb-3">
                  {item.tags?.map((tag, index) => (
                    <span key={index} className="bg-[#fe585f]/10 text-[#fe585f] px-2 py-1 rounded-full text-xs border border-[#fe585f]/30">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {item.website && (
                    <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors">官网</button>
                  )}
                  <button className="bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white px-3 py-1 rounded text-xs font-bold hover:shadow-lg transition-all">选择时间</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


