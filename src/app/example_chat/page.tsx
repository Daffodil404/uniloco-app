// 添加一个固定页面，用于展示AI聊天生成藏宝图的示例
"use client";
import React, { useState } from "react";

interface Message {
  role: "ai" | "user";
  content: string;
}

export default function TripPlannerPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello! Where would you like to travel?" },
    { role: "user", content: "I want to visit Paris." },
    { role: "ai", content: "Great choice! What kind of activities do you enjoy?" },
    { role: "user", content: "I love art museums and local food." },
    { role: "ai", content: "Perfect! I'll prepare your personalized itinerary." },
    { role: "ai", content: "map_placeholder" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    // Demo: Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Got it! Adding that to your plan..." },
      ]);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#fe585f] to-[#ff7a80] px-4 py-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="text-white hover:text-white/80 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">
            AI Trip Planner
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center px-4 py-8 flex-1">

      {/* Chat Box */}
      <div className="w-full max-w-2xl flex-1 border border-gray-200 rounded-xl p-4 mb-6 bg-gray-50 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.content === "map_placeholder" ? (
              // AI 发送的地图占位符
              <div className="w-full max-w-[80%] bg-white border border-gray-200 rounded-lg rounded-bl-none p-4">
                <p className="text-gray-800 text-sm mb-3">Here&apos;s your personalized Paris itinerary:</p>
                <div className="border-2 border-dashed border-[#fe585f] rounded-xl h-48 flex items-center justify-center text-gray-400 bg-gray-50">
                  🗺️ Your personalized itinerary map will appear here
                </div>
              </div>
            ) : (
              // 普通消息
              <div
                className={`px-4 py-2 rounded-lg max-w-[80%] text-sm ${
                  msg.role === "user"
                    ? "bg-[#fe585f] text-white rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="w-full max-w-2xl flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:border-[#fe585f]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-[#fe585f] text-white px-4 py-2 rounded-r-lg hover:opacity-90"
        >
          Send
        </button>
      </div>
      </div>
    </main>
  );
}
