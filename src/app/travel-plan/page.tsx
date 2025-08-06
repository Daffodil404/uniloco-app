'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import InteractiveMap from '@/components/features/InteractiveMap';
import type { TravelPlan, MapPoint } from '@/types/travel';

export default function TravelPlanPage() {
  const searchParams = useSearchParams();
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pointNotes, setPointNotes] = useState<Record<string, string>>({});

  // 模拟AI生成旅行计划
  useEffect(() => {
    const generatePlan = async () => {
      setIsLoading(true);
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 从URL参数获取用户选择
      const destination = searchParams.get('destination') || 'Tokyo';
      const duration = searchParams.get('duration') || '4-7 days';
      const food = searchParams.get('food') || 'Local specialties';
      const companion = searchParams.get('companion') || 'Solo travel';
      const atmosphere = searchParams.get('atmosphere') || 'Cultural';

      // 生成模拟数据
      const mockPlan: TravelPlan = {
        id: 'plan-001',
        destination,
        duration,
        food,
        companion,
        atmosphere,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        itinerary: [
          {
            day: 1,
            title: 'Arrival & City Introduction',
            activities: [
              'Arrive at Tokyo Haneda Airport',
              'Check into hotel in Shibuya',
              'Explore Shibuya Crossing',
              'Visit Meiji Shrine',
              'Evening at Tokyo Skytree'
            ],
            locations: ['Shibuya', 'Meiji Shrine', 'Tokyo Skytree'],
            estimatedCost: 150,
            weather: 'Sunny, 22°C'
          },
          {
            day: 2,
            title: 'Traditional Tokyo',
            activities: [
              'Morning at Senso-ji Temple',
              'Explore Asakusa district',
              'Lunch at traditional ramen shop',
              'Visit Tokyo National Museum',
              'Evening at Akihabara'
            ],
            locations: ['Asakusa', 'Ueno', 'Akihabara'],
            estimatedCost: 120,
            weather: 'Partly cloudy, 20°C'
          },
          {
            day: 3,
            title: 'Modern Tokyo',
            activities: [
              'Visit TeamLab Planets',
              'Explore Odaiba',
              'Lunch at Tsukiji Outer Market',
              'Shopping in Ginza',
              'Dinner at Michelin-starred restaurant'
            ],
            locations: ['Odaiba', 'Tsukiji', 'Ginza'],
            estimatedCost: 200,
            weather: 'Sunny, 24°C'
          }
        ],
        mapPoints: [
          {
            id: '1',
            name: 'Shibuya Crossing',
            lat: 35.6595,
            lng: 139.7004,
            type: 'attraction',
            rating: 4.5,
            openingHours: '24/7'
          },
          {
            id: '2',
            name: 'Meiji Shrine',
            lat: 35.6762,
            lng: 139.6993,
            type: 'attraction',
            rating: 4.8,
            openingHours: '6:00 AM - 5:00 PM'
          },
          {
            id: '3',
            name: 'Senso-ji Temple',
            lat: 35.7148,
            lng: 139.7967,
            type: 'attraction',
            rating: 4.6,
            openingHours: '6:00 AM - 5:00 PM'
          },
          {
            id: '4',
            name: 'Tsukiji Outer Market',
            lat: 35.6654,
            lng: 139.7702,
            type: 'restaurant',
            rating: 4.7,
            openingHours: '5:00 AM - 2:00 PM'
          }
        ]
      };

      setTravelPlan(mockPlan);
      setIsLoading(false);
    };

    generatePlan();
  }, [searchParams]);

  const handleSaveMap = () => {
    // 保存地图为PNG的逻辑
    console.log('Saving map as PNG...');
    // 这里可以集成html2canvas或其他库来保存地图
  };

  const handlePointClick = (point: MapPoint) => {
    setSelectedPoint(point);
  };

  const handleEditPlan = () => {
    // 返回编辑页面
    window.history.back();
  };

  const handleSavePointNotes = () => {
    if (selectedPoint) {
      setPointNotes(prev => ({
        ...prev,
        [selectedPoint.id]: (document.getElementById('point-notes') as HTMLTextAreaElement)?.value || ''
      }));
      setSelectedPoint(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#64D8EF] to-[#000000] from-10% to-100% flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-white mb-2">Generating Your Travel Plan</h3>
          <p className="text-white/80">AI is creating your personalized journey...</p>
        </div>
      </div>
    );
  }

  if (!travelPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#64D8EF] to-[#000000] from-10% to-100% flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Plan Not Found</h3>
          <p className="text-white/80">Unable to load your travel plan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#64D8EF] to-[#000000] from-10% to-100%">
      {/* 顶部导航 */}
      <header className="relative z-20 px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => window.history.back()}
            className="text-white hover:text-white/80 transition-colors text-lg font-medium"
          >
            ← Back
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-white">Your Travel Plan</h1>
            <p className="text-xs text-white/80">{travelPlan.destination}</p>
          </div>
          <button
            onClick={handleEditPlan}
            className="text-white hover:text-white/80 transition-colors text-sm font-medium"
          >
            Edit
          </button>
        </div>
      </header>

      <div className="px-6 pb-6">
        {/* 用户需求回顾 */}
        <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Your Preferences</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-white/60 text-xs mb-1">Destination</div>
              <div className="text-white font-medium">{travelPlan.destination}</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-white/60 text-xs mb-1">Duration</div>
              <div className="text-white font-medium">{travelPlan.duration}</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-white/60 text-xs mb-1">Food Preference</div>
              <div className="text-white font-medium">{travelPlan.food}</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-white/60 text-xs mb-1">Travel Style</div>
              <div className="text-white font-medium">{travelPlan.atmosphere}</div>
            </div>
          </div>
        </div>

        {/* 地图区域 */}
        <div className="mb-6">
          <InteractiveMap
            mapPoints={travelPlan.mapPoints}
            onPointClick={handlePointClick}
            onSaveMap={handleSaveMap}
          />
        </div>

        {/* 行程安排 */}
        <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Your Itinerary</h2>
          <div className="space-y-4">
            {travelPlan.itinerary.map((day) => (
              <div key={day.day} className="bg-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">Day {day.day}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-white/60 text-sm">{day.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FF9E4A] text-sm">${day.estimatedCost}</span>
                      <span className="text-white/40 text-xs">{day.weather}</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {day.activities.map((activity, index) => (
                    <li key={index} className="text-white/80 text-sm flex items-start">
                      <span className="w-2 h-2 bg-[#FF9E4A] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* AI助手按钮 */}
        <button
          onClick={() => setIsAIChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-200"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>

      {/* 地图标记点详情弹窗 */}
      {selectedPoint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-6 border border-white/20 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedPoint.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#FF9E4A] text-sm">★ {selectedPoint.rating}</span>
                  <span className="text-white/60 text-xs">{selectedPoint.openingHours}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-white/60 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Add Notes</label>
                <textarea
                  id="point-notes"
                  placeholder="Share your thoughts about this place..."
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  rows={3}
                  defaultValue={pointNotes[selectedPoint.id] || ''}
                />
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-2">Upload Photos</label>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center">
                  <svg className="w-8 h-8 text-white/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-white/60 text-sm">Tap to upload photos</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleSavePointNotes}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white rounded-xl text-sm font-medium"
                >
                  Save
                </button>
                <button 
                  onClick={() => setSelectedPoint(null)}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI对话弹窗 */}
      {isAIChatOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-6 border border-white/20 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">AI Travel Assistant</h3>
              <button
                onClick={() => setIsAIChatOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-white/80 text-sm">
                  Hi! I'm your AI travel assistant. I can help you refine your itinerary, 
                  suggest alternatives, or answer any questions about your trip to {travelPlan.destination}.
                </p>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-2">Ask me anything</label>
                <textarea
                  placeholder="e.g., Can you suggest more restaurants? What's the best time to visit temples?"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white rounded-xl text-sm font-medium">
                  Send
                </button>
                <button 
                  onClick={() => setIsAIChatOpen(false)}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 