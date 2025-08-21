"use client";

import { RefObject, useState } from 'react';
import type { ChatMessage, ItineraryItem, DayRoute } from './types';
import { useRouter } from 'next/navigation';

interface ConversationProps {
  chatMessages: ChatMessage[];
  chatMessagesRef: RefObject<HTMLDivElement | null>;
  chatInputRef: RefObject<HTMLInputElement | null>;
  itineraryItems: ItineraryItem[];
  onRemoveItineraryItem: (index: number) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onAddActivityToItinerary?: (activity: DayRoute['activities'][0]) => void;
  onRemoveActivityFromItinerary?: (activityId: string) => void;
}

export default function Conversation({
  chatMessages,
  chatMessagesRef,
  chatInputRef,
  itineraryItems,
  onRemoveItineraryItem,
  onKeyPress,
  onAddActivityToItinerary,
  onRemoveActivityFromItinerary
}: ConversationProps) {
  const [isItineraryExpanded, setIsItineraryExpanded] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full md:w-[420px] h-full bg-white/80 backdrop-blur-xl border-r border-gray-200 flex flex-col shadow-lg relative">
      <div className="p-4 md:p-6 bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] border-b border-[#fe5a5e]/20">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">🤖 Uniloco Travel Planner</h2>
        <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/20 rounded-2xl">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-xl md:text-2xl text-[#fe5a5e]">🧳</div>
          <div className="flex-1 cursor-pointer" onClick={() => router.push('/h5/ai-chat')}>
            <div className="font-bold mb-1 text-sm md:text-base text-white">Solo Traveler</div>
            <div className="text-xs md:text-sm text-white/90">📍 Rome | 🗓️ 1–3 Days | 🍜 Street Food | 👤 Single | 🎭 Cultural</div>
          </div>
        </div>
      </div>

      {/* Conversation area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-5 bg-white" ref={chatMessagesRef}>
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 md:mb-4 p-3 md:p-4 rounded-2xl max-w-[90%] ${
              message.type === 'ai'
                ? 'bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] mr-auto text-white'
                : message.type === 'user'
                ? 'bg-gray-200 ml-auto text-right text-gray-800'
                : 'bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] mr-auto text-white border-l-4 border-white'
            }`}
          >
            <div dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br/>') }} />
          </div>
        ))}
      </div>

      {/* Floating Itinerary Drawer - positioned below user info card */}
      <div className="absolute top-47 left-0 right-0 z-20">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl rounded-b-lg mx-3">
          <button
            onClick={() => setIsItineraryExpanded(!isItineraryExpanded)}
            className="w-full p-3 md:p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-b-lg"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base font-bold text-[#fe5a5e]">🗓️ My Itinerary</span>
              {itineraryItems.length > 0 && (
                <span className="bg-[#fe5a5e] text-white text-xs px-2 py-1 rounded-full">
                  {itineraryItems.length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 p-1 md:p-2 rounded-lg font-mono text-xs text-[#fe5a5e] border border-[#fe5a5e]/30">
                IT-ROME-2025-001
              </div>
              <svg
                className={`w-4 h-4 text-[#fe5a5e] transition-transform duration-200 ${
                  isItineraryExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          {/* Expandable Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isItineraryExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-3 md:p-5 pt-0">
              {itineraryItems.length === 0 ? (
                <div className="text-center text-gray-500 text-xs py-5">
                  No items yet<br />
                  <small>Select a service and click &quot;Add to itinerary&quot;</small>
                </div>
              ) : (
                <div className="space-y-2">
                  {itineraryItems.map((item, index) => (
                    <div key={index} className="bg-white border border-[#fe5a5e]/20 rounded-lg p-2 text-xs flex justify-between items-center shadow-sm">
                      <span className="text-gray-700">{item.emoji} {item.name} - €{item.price}</span>
                      <button 
                        className="bg-[#fe5a5e] border-none rounded text-white text-xs px-2 py-1 hover:bg-[#e54d55] transition-colors" 
                        onClick={() => onRemoveItineraryItem(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 md:p-5 border-t border-gray-200 bg-white">
        <input
          ref={chatInputRef}
          type="text"
          placeholder="Tell me what experience you want..."
          className="w-full p-3 md:p-4 bg-gray-50 border border-gray-300 rounded-full text-gray-800 outline-none focus:border-[#fe5a5e] focus:bg-white focus:ring-2 focus:ring-[#fe5a5e]/20 transition-all text-sm md:text-base"
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
}


