'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import InteractiveMap from '@/components/features/InteractiveMap';
import CheckInModal from '@/components/features/CheckInModal';
import SuccessModal from '@/components/features/SuccessModal';
import Drawer from '@/components/ui/Drawer';
import type { TravelPlan, MapPoint } from '@/types/travel';

interface CheckInData {
  pointId?: string;
  timestamp?: string;
  location?: string;
  notes: string;
  photos: string[];
  unc?: string;
}

export default function TravelPlanPage() {
  const searchParams = useSearchParams();
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [checkInData, setCheckInData] = useState<CheckInData | null>(null);

  // 生成旅行计划数据
  useEffect(() => {
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
  }, [searchParams]);

  const handleSaveMap = () => {
    // 保存地图为PNG的逻辑
    console.log('Saving map as PNG...');
    // 这里可以集成html2canvas或其他库来保存地图
  };

  const handlePointClick = (point: MapPoint) => {
    console.log('Point clicked:', point.name);
    setSelectedPoint(point);
    setIsCheckInModalOpen(true);
  };

  const handleEditPlan = () => {
    // 返回编辑页面
    window.history.back();
  };

  const handleCheckInSubmit = (data: CheckInData) => {
    setCheckInData(data);
    setIsCheckInModalOpen(false);
    setIsSuccessModalOpen(true);
    
    // 3秒后自动关闭成功提示
    setTimeout(() => {
      setIsSuccessModalOpen(false);
      setCheckInData(null);
    }, 3000);
  };

  const handleCheckInModalClose = () => {
    setIsCheckInModalOpen(false);
    setSelectedPoint(null);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    setCheckInData(null);
  };

  // 跳转到AI Chat页面并保留当前选择
  const handleNavigateToChat = (questionIndex: number) => {
    const params = new URLSearchParams();
    params.set('destination', travelPlan?.destination || '');
    params.set('duration', travelPlan?.duration || '');
    params.set('food', travelPlan?.food || '');
    params.set('companion', travelPlan?.companion || '');
    params.set('atmosphere', travelPlan?.atmosphere || '');
    params.set('startIndex', questionIndex.toString());
    
    window.location.href = `/ai-chat?${params.toString()}`;
  };

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
    <div className="min-h-screen bg-gradient-to-b from-[#64D8EF] to-[#000000] from-10% to-100% flex flex-col">
      {/* 顶部导航 */}
      <header className="relative z-20 px-6 py-4 flex-shrink-0">
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

      {/* 用户需求回顾 - 紧凑版本 */}
      <div className="px-6 py-4 flex-shrink-0">
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-3">Your Preferences</h2>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => handleNavigateToChat(0)}
              className="bg-white/10 rounded-xl p-2 text-center hover:bg-white/20 transition-colors cursor-pointer"
            >
              <div className="text-white/60 text-xs mb-1">Destination</div>
              <div className="text-white font-medium text-xs truncate">{travelPlan.destination}</div>
            </button>
            <button
              onClick={() => handleNavigateToChat(1)}
              className="bg-white/10 rounded-xl p-2 text-center hover:bg-white/20 transition-colors cursor-pointer"
            >
              <div className="text-white/60 text-xs mb-1">Duration</div>
              <div className="text-white font-medium text-xs truncate">{travelPlan.duration}</div>
            </button>
            <button
              onClick={() => handleNavigateToChat(2)}
              className="bg-white/10 rounded-xl p-2 text-center hover:bg-white/20 transition-colors cursor-pointer"
            >
              <div className="text-white/60 text-xs mb-1">Food</div>
              <div className="text-white font-medium text-xs truncate">{travelPlan.food}</div>
            </button>
            <button
              onClick={() => handleNavigateToChat(3)}
              className="bg-white/10 rounded-xl p-2 text-center hover:bg-white/20 transition-colors cursor-pointer"
            >
              <div className="text-white/60 text-xs mb-1">Style</div>
              <div className="text-white font-medium text-xs truncate">{travelPlan.atmosphere}</div>
            </button>
          </div>
        </div>
      </div>

      {/* 地图区域 - 放大占比 */}
      <div className="flex-1 px-6 pb-6">
        <InteractiveMap
          mapPoints={travelPlan.mapPoints}
          onPointClick={handlePointClick}
          onSaveMap={handleSaveMap}
        />
      </div>

      {/* 抽屉组件 */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Your Itinerary"
        tabLabel="View Plan"
      >
        <div className="p-6 space-y-4">
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
      </Drawer>

      {/* AI助手按钮 */}
      <button
        onClick={() => setIsAIChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-200 z-50"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* 打卡Modal */}
      <CheckInModal
        isOpen={isCheckInModalOpen}
        onClose={handleCheckInModalClose}
        selectedPoint={selectedPoint}
        onSubmit={handleCheckInSubmit}
      />

      {/* 成功提示Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        checkInData={checkInData}
      />

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