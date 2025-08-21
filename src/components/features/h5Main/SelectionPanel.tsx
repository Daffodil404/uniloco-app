"use client";

import type { ExperienceItem, DayRoute, ItineraryItem } from './types';
import { mockSearchResults } from './constants';
import ActivityItem from './ActivityItem';

interface SelectionPanelProps {
    selectedCategory: string | null;
    showTimeSelection: boolean;
    showSearchResults: boolean;
    selectedDay: number | null;
    selectedTimeSlot: string | null;
    allData: Record<string, ExperienceItem[]>;
    itineraryItems: ItineraryItem[];
    onSelectCategory: (c: string) => void;
    onSetDay: (day: number | null) => void;
    onSetTimeSlot: (slot: string | null) => void;
    aiItineraryGenerated?: boolean;
    suggestedItinerary?: DayRoute[] | null;
    onConfirmSelection?: () => void;
    onAskUniloco?: (item: ExperienceItem) => void;
    onShowDetail?: (item: ExperienceItem) => void;
    onPickTime?: (item: ExperienceItem) => void;
    onAddActivityToItinerary?: (activity: DayRoute['activities'][0]) => void;
    onRemoveActivityFromItinerary?: (activityId: string) => void;
}

export default function SelectionPanel({
    selectedCategory,
    showTimeSelection,
    showSearchResults,
    selectedDay,
    selectedTimeSlot,
    allData,
    itineraryItems,
    onSelectCategory,
    onSetDay,
    onSetTimeSlot,
    aiItineraryGenerated,
    suggestedItinerary,
    onConfirmSelection,
    onAskUniloco,
    onShowDetail,
    onPickTime,
    onAddActivityToItinerary,
    onRemoveActivityFromItinerary
}: SelectionPanelProps) {
    const currentResults: ExperienceItem[] = selectedCategory
        ? (mockSearchResults[selectedCategory] || allData[selectedCategory] || [])
        : [];

    const isItineraryTab = selectedCategory === 'itinerary';

    return (
        <div className="hidden md:block w-[380px] h-full bg-white/80 backdrop-blur-xl border-l border-gray-200 p-6 overflow-y-auto shadow-lg">
            <div className="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-200">
                <div className="text-[#fe5a5e] font-bold mb-4">🎯 Experience Type</div>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { category: 'activity', emoji: '🎪', title: 'Activities'},
                        { category: 'script', emoji: '🎭', title: 'Scripted' },
                        { category: 'service', emoji: '💼', title: 'Services' },
                        { category: 'itinerary', emoji: '🗺️', title: 'AI Itinerary' }
                    ].map((item, index) => (
                        <button
                            key={item.category}
                            className={`cursor-pointer p-3 rounded-xl text-center transition-all ${selectedCategory === item.category
                                    ? 'bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] border-[#fe5a5e] text-white'
                                    : 'bg-white border border-gray-200 hover:bg-[#fe5a5e] hover:text-white hover:-translate-y-0.5'
                                } border text-gray-700 text-sm font-medium shadow-sm ${index === 3 ? 'col-span-3' : ''
                                }`}
                            onClick={() => onSelectCategory(item.category)}
                        >
                            {item.emoji} {item.title}<br />
                        </button>
                    ))}
                </div>

            </div>

            {showTimeSelection && (
                <div className="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-200">
                    <div className="text-[#fe5a5e] font-bold mb-4">📅 Select Day & Time</div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <select
                            className="bg-white border border-gray-300 text-gray-700 p-3 rounded-xl text-sm outline-none focus:border-[#fe5a5e] focus:ring-2 focus:ring-[#fe5a5e]/20"
                            value={selectedDay || ''}
                            onChange={(e) => onSetDay(e.target.value ? Number(e.target.value) : null)}
                        >
                            <option value="">Choose Day</option>
                            <option value="1">Day 1</option>
                            <option value="2">Day 2</option>
                            <option value="3">Day 3</option>
                        </select>
                        <select
                            className="bg-white border border-gray-300 text-gray-700 p-3 rounded-xl text-sm outline-none focus:border-[#fe5a5e] focus:ring-2 focus:ring-[#fe5a5e]/20"
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
                        className={`w-full bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] text-white p-4 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-lg ${selectedDay && selectedTimeSlot ? '' : 'opacity-60 cursor-not-allowed'}`}
                        onClick={onConfirmSelection}
                        disabled={!selectedDay || !selectedTimeSlot}
                    >
                        Confirm Selection
                    </button>
                </div>
            )}

            {isItineraryTab && showSearchResults && aiItineraryGenerated && suggestedItinerary && (
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-5">
                    <div className="text-[#fe5a5e] font-bold mb-3">🗺️ AI 3-Day Itinerary</div>
                    <div className="space-y-3">
                        {suggestedItinerary.map(day => (
                            <div key={day.day} className="bg-white rounded-xl border border-gray-200 p-3">
                                <div className="font-semibold text-gray-800 mb-2">{day.title}</div>
                                <div className="text-xs text-gray-600 mb-2">Start: {day.startLocation} · End: {day.endLocation}</div>
                                <div className="text-xs text-gray-500 mb-2">Duration: {day.totalDuration} · Walk: {day.walkingDistance}</div>
                                <div className="space-y-1">
                                    {day.activities.map((act, idx) => {
                                        const isInItinerary = itineraryItems.some(item => item.id === act.id);
                                        return (
                                            <ActivityItem
                                                key={idx}
                                                activity={act}
                                                isInItinerary={isInItinerary}
                                                onAddToItinerary={onAddActivityToItinerary || (() => {})}
                                                onRemoveFromItinerary={onRemoveActivityFromItinerary || (() => {})}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                        
                        {/* Add complete 3-day itinerary */}
                        <div className="bg-gradient-to-r from-[#fe5a5e]/10 to-[#ff7a80]/10 rounded-xl p-4 border border-[#fe5a5e]/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div className="text-md font-bold text-gray-800">Complete 3-Day Itinerary</div>
                                        <div className="text-sm text-gray-600">
                                            {suggestedItinerary.reduce((sum, day) => sum + day.activities.length, 0)} activities
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Total €{suggestedItinerary.reduce((sum, day) => 
                                                sum + day.activities.reduce((daySum, act) => daySum + (Number(act.price) || 0), 0), 0
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        // Add all unadded activities
                                        suggestedItinerary.forEach(day => {
                                            day.activities.forEach(activity => {
                                                const isInItinerary = itineraryItems.some(item => item.id === activity.id);
                                                if (!isInItinerary && onAddActivityToItinerary) {
                                                    onAddActivityToItinerary(activity);
                                                }
                                            });
                                        });
                                    }}
                                    className="bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-200 hover:-translate-y-1 hover:scale-105"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isItineraryTab && showSearchResults && (
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                    <div className="text-[#fe5a5e] font-bold mb-4">🔍 Results</div>
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
                                        <span key={index} className="bg-[#fe5a5e]/10 text-[#fe5a5e] px-2 py-1 rounded-full text-xs border border-[#fe5a5e]/30">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {(item.website || item.booking) && (
                                        <button
                                            className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                                            onClick={() => window.open(item.website || item.booking, '_blank')}
                                        >
                                            {item.website ? 'Website' : 'Booking'}
                                        </button>
                                    )}

                                    {item.unilocoInfo && (
                                        <button
                                            className="bg-gradient-to-r from-[#e74c3c] to-[#c0392b] text-white px-3 py-1 rounded text-xs font-bold hover:shadow-lg transition-all"
                                            onClick={() => onAskUniloco?.(item)}
                                        >
                                            Ask Uniloco
                                        </button>
                                    )}

                                    <button
                                        className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white px-3 py-1 rounded text-xs font-bold hover:shadow-lg transition-all"
                                        onClick={() => onShowDetail?.(item)}
                                    >
                                        Detail
                                    </button>

                                    <button
                                        className="bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] text-white px-3 py-1 rounded text-xs font-bold hover:shadow-lg transition-all"
                                        onClick={() => onPickTime?.(item)}
                                    >
                                        Pick a time
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}


