"use client";

import { RefObject } from 'react';
import type { ChatMessage, ItineraryItem } from './types';

interface ConversationProps {
  chatMessages: ChatMessage[];
  chatMessagesRef: RefObject<HTMLDivElement | null>;
  chatInputRef: RefObject<HTMLInputElement | null>;
  itineraryItems: ItineraryItem[];
  onRemoveItineraryItem: (index: number) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export default function Conversation({
  chatMessages,
  chatMessagesRef,
  chatInputRef,
  itineraryItems,
  onRemoveItineraryItem,
  onKeyPress
}: ConversationProps) {
  return (
    <div className="w-full md:w-[420px] h-full bg-white/80 backdrop-blur-xl border-r border-gray-200 flex flex-col shadow-lg">
      <div className="p-4 md:p-6 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] border-b border-[#fe585f]/20">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">🤖 Uniloco旅行规划师</h2>
        <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/20 rounded-2xl">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-xl md:text-2xl text-[#fe585f]">🧳</div>
          <div className="flex-1">
            <div className="font-bold mb-1 text-sm md:text-base text-white">独行旅人</div>
            <div className="text-xs md:text-sm text-white/90">📍 Rome | 🗓️ 1-3Day | 🍜 Street Food | 👤 Single | 🎭 Cultural</div>
          </div>
        </div>
      </div>

      <div className="p-3 md:p-5 border-b border-gray-200 bg-gray-50">
        <div className="text-xs md:text-sm font-bold mb-2 md:mb-3 text-[#fe585f]">🗓️ 我的行程安排</div>
        <div className="bg-white p-2 md:p-3 rounded-lg font-mono text-xs text-[#fe585f] border border-[#fe585f]/30 mb-2 md:mb-3 shadow-sm">IT-ROME-2025-001</div>
        <div className="max-h-28 md:max-h-36 overflow-y-auto">
          {itineraryItems.length === 0 ? (
            <div className="text-center text-gray-500 text-xs py-5">
              暂无安排项目<br />
              <small>选择服务并点击"加入行程"</small>
            </div>
          ) : (
            <div className="space-y-2">
              {itineraryItems.map((item, index) => (
                <div key={index} className="bg-white border border-[#fe585f]/20 rounded-lg p-2 text-xs flex justify-between items-center shadow-sm">
                  <span className="text-gray-700">{item.emoji} {item.name} - €{item.price}</span>
                  <button className="bg-[#fe585f] border-none rounded text-white text-xs px-2 py-1 hover:bg-[#e54d55] transition-colors" onClick={() => onRemoveItineraryItem(index)}>
                    移除
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 md:p-5 bg-white" ref={chatMessagesRef}>
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 md:mb-4 p-3 md:p-4 rounded-2xl max-w-[90%] ${
              message.type === 'ai'
                ? 'bg-gradient-to-r from-[#fe585f] to-[#ff7a80] mr-auto text-white'
                : message.type === 'user'
                ? 'bg-gray-200 ml-auto text-right text-gray-800'
                : 'bg-gradient-to-r from-[#fe585f] to-[#ff7a80] mr-auto text-white border-l-4 border-white'
            }`}
          >
            <div dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br/>') }} />
          </div>
        ))}
      </div>

      <div className="p-3 md:p-5 border-t border-gray-200 bg-white">
        <input
          ref={chatInputRef}
          type="text"
          placeholder="告诉我你想要什么体验..."
          className="w-full p-3 md:p-4 bg-gray-50 border border-gray-300 rounded-full text-gray-800 outline-none focus:border-[#fe585f] focus:bg-white focus:ring-2 focus:ring-[#fe585f]/20 transition-all text-sm md:text-base"
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
}


