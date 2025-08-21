"use client";

import type { ExperienceItem, DayRoute } from './types';
import { mockSearchResults } from './constants';

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
  // new props
  aiItineraryGenerated?: boolean;
  suggestedItinerary?: DayRoute[] | null;
  onConfirmSelection?: () => void;
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
  onSetTimeSlot,
  aiItineraryGenerated,
  suggestedItinerary,
  onConfirmSelection
}: SelectionPanelProps) {
  const currentResults: ExperienceItem[] = selectedCategory
    ? (mockSearchResults[selectedCategory] || allData[selectedCategory] || [])
    : [];

  const isItineraryTab = selectedCategory === 'itinerary';

  return (
    <div className="hidden md:block w-[380px] h-full bg-white/80 backdrop-blur-xl border-l border-gray-200 p-6 overflow-y-auto shadow-lg">
      <div className="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-200">
        <div className="text-[#fe585f] font-bold mb-4">🎯 Experience Type</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { category: 'activity', emoji: '🎪', title: 'Activities', desc: 'Sports, Outdoor, Culture' },
            { category: 'script', emoji: '🎭', title: 'Scripted', desc: 'Escape room, Role-play' },
            { category: 'service', emoji: '💼', title: 'Services', desc: 'SPA, Private Chef, Photography' },
            { category: 'itinerary', emoji: '🗺️', title: 'AI Itinerary', desc: 'Full planning' }
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

      {showTimeSelection &&  (
        <div className="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-200">
          <div className="text-[#fe585f] font-bold mb-4">📅 Select Day & Time</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              className="bg-white border border-gray-300 text-gray-700 p-3 rounded-xl text-sm outline-none focus:border-[#fe585f] focus:ring-2 focus:ring-[#fe585f]/20"
              value={selectedDay || ''}
              onChange={(e) => onSetDay(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Choose Day</option>
              <option value="1">Day 1</option>
              <option value="2">Day 2</option>
              <option value="3">Day 3</option>
            </select>
            <select
              className="bg-white border border-gray-300 text-gray-700 p-3 rounded-xl text-sm outline-none focus:border-[#fe585f] focus:ring-2 focus:ring-[#fe585f]/20"
              value={selectedTimeSlot || ''}
              onChange={(e) => onSetTimeSlot(e.target.value || null)}
            >
              <option value="">Choose Time Slot</option>
              <option value="morning">🌅 Morning (9:00–12:00)</option>
              <option value="afternoon">☀️ Afternoon (14:00–17:00)</option>
              <option value="evening">🌆 Evening (18:00–21:00)</option>
            </select>
          </div>
          <button
            className={`w-full bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white p-4 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-lg ${selectedDay && selectedTimeSlot ? '' : 'opacity-60 cursor-not-allowed'}`}
            onClick={onConfirmSelection}
            disabled={!selectedDay || !selectedTimeSlot}
          >
            Confirm Selection
          </button>
        </div>
      )}

      {/* AI 3-day itinerary only when itinerary tab selected AND user confirmed (showSearchResults used as confirmation flag) */}
      {isItineraryTab && showSearchResults && aiItineraryGenerated && suggestedItinerary && (
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-5">
          <div className="text-[#fe585f] font-bold mb-3">🗺️ AI 3-Day Itinerary</div>
          <div className="space-y-3">
            {suggestedItinerary.map(day => (
              <div key={day.day} className="bg-white rounded-xl border border-gray-200 p-3">
                <div className="font-semibold text-gray-800 mb-2">{day.title}</div>
                <div className="text-xs text-gray-600 mb-2">Start: {day.startLocation} · End: {day.endLocation}</div>
                <div className="text-xs text-gray-500 mb-2">Duration: {day.totalDuration} · Walk: {day.walkingDistance}</div>
                <ul className="space-y-1">
                  {day.activities.map((act, idx) => (
                    <li key={idx} className="text-xs text-gray-700">{act.time} · {act.emoji} {act.activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generic results visible only for non-itinerary tabs once confirmed */}
      {!isItineraryTab && showSearchResults && (
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <div className="text-[#fe585f] font-bold mb-4">🔍 Results</div>
          <div className="space-y-3">
            {currentResults.map((item) => (
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
                    <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors">Website</button>
                  )}
                  <button className="bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white px-3 py-1 rounded text-xs font-bold hover:shadow-lg transition-all">Pick a time</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


