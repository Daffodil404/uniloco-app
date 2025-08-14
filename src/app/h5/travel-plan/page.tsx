'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import InteractiveMap from '@/components/features/InteractiveMap';
import CheckInModal from '@/components/features/CheckInModal';
import SuccessModal from '@/components/features/SuccessModal';
import Drawer from '@/components/ui/Drawer';
import type { TravelPlan, MapPoint } from '@/types/travel';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface CheckInData {
  pointId?: string;
  timestamp?: string;
  location?: string;
  notes: string;
  photos: string[];
  unc?: string;
}

function TravelPlanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, isLoading } = useAuth();
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [checkInData, setCheckInData] = useState<CheckInData | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // 定义处理函数
  const handlePointClick = (point: MapPoint) => {
    // 处理点击事件
  };

  const handleCheckInRequest = useCallback((point: MapPoint) => {
    setSelectedPoint(point);
    setIsCheckInModalOpen(true);
  }, []);

  // 初始化旅行计划数据
  useEffect(() => {
    // 从URL参数获取用户选择
    const destination = searchParams.get('destination') || 'Luxembourg';
    const duration = searchParams.get('duration') || '4-7 days';
    const food = searchParams.get('food') || 'Local specialties';
    const companion = searchParams.get('companion') || 'Solo travel';
    const atmosphere = searchParams.get('atmosphere') || 'Cultural';

    // 模拟旅行计划数据
    const mockPlan: TravelPlan = {
      id: '1',
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
          title: 'Arrival & Orientation',
          activities: [
            'Arrive at Luxembourg Central Station',
            'Check into hotel in Ville Haute',
            'Explore Place d\'Armes',
            'Dinner at local Luxembourgish restaurant'
          ],
          locations: ['Luxembourg Central Station', 'Ville Haute', 'Place d\'Armes'],
          estimatedCost: 150,
          weather: 'Sunny, 18°C'
        },
        {
          day: 2,
          title: 'Historic Luxembourg',
          activities: [
            'Visit Notre-Dame Cathedral',
            'Explore Palais Grand-Ducal',
            'Lunch at traditional Luxembourgish restaurant',
            'Evening at Casemates du Bock'
          ],
          locations: ['Notre-Dame Cathedral', 'Palais Grand-Ducal', 'Casemates du Bock'],
          estimatedCost: 200,
          weather: 'Partly cloudy, 16°C'
        },
        {
          day: 3,
          title: 'Modern Luxembourg',
          activities: [
            'Visit Kirchberg district',
            'Explore European institutions',
            'Lunch at Place Guillaume II',
            'Evening shopping in Grand Rue'
          ],
          locations: ['Kirchberg', 'European institutions', 'Place Guillaume II', 'Grand Rue'],
          estimatedCost: 180,
          weather: 'Clear, 20°C'
        }
      ],
      mapPoints: [
        {
          id: '1',
          name: 'Place d\'Armes',
          lat: 49.6111,
          lng: 6.1306,
          type: 'attraction',
          rating: 4.5,
          openingHours: '24/7'
        },
        {
          id: '2',
          name: 'Notre-Dame Cathedral',
          lat: 49.6116,
          lng: 6.1319,
          type: 'attraction',
          rating: 4.7,
          openingHours: '8:00-18:00'
        },
        {
          id: '3',
          name: 'Casemates du Bock',
          lat: 49.6125,
          lng: 6.1358,
          type: 'attraction',
          rating: 4.6,
          openingHours: '10:00-17:30'
        },
        {
          id: '4',
          name: 'Palais Grand-Ducal',
          lat: 49.6119,
          lng: 6.1319,
          type: 'attraction',
          rating: 4.4,
          openingHours: '10:00-17:00'
        }
      ]
    };

    setTravelPlan(mockPlan);
  }, [searchParams, isLoggedIn]);



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

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="mobile-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-[#fe585f] rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Loading...</h3>
          <p className="text-slate-600">Checking login status</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="mobile-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Login Required</h3>
          <p className="text-slate-600 mb-4">This feature requires login to access</p>
          <button
            onClick={() => router.push('/login?redirect=/travel-plan')}
            className="px-6 py-2 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white rounded-xl font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (!travelPlan) {
    return (
      <div className="mobile-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Plan Not Found</h3>
          <p className="text-slate-600">Unable to load your travel plan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-screen bg-gradient-to-b from-white to-slate-50 flex flex-col">
      {/* 顶部导航 */}
      <header className="relative z-20 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => window.history.back()}
            className="text-slate-600 hover:text-slate-800 transition-colors text-lg font-medium"
          >
            ← Back
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-slate-800">Your Travel Plan</h1>
            <p className="text-xs text-slate-600">{travelPlan.destination}</p>
          </div>
          <button
            onClick={handleEditPlan}
            className="text-slate-600 hover:text-slate-800 transition-colors text-sm font-medium"
          >
            Edit
          </button>
        </div>
      </header>

      {/* 用户需求回顾 - 紧凑版本 */}
      <div className="px-6 py-4 flex-shrink-0">
        <div className="bg-white shadow-lg rounded-2xl p-4 border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-3">Your Preferences</h2>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => handleNavigateToChat(0)}
              className="bg-slate-50 rounded-xl p-2 text-center hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="text-slate-500 text-xs mb-1">Destination</div>
              <div className="text-slate-800 font-medium text-xs truncate">{travelPlan.destination}</div>
            </button>
            <button
              onClick={() => handleNavigateToChat(1)}
              className="bg-slate-50 rounded-xl p-2 text-center hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="text-slate-500 text-xs mb-1">Duration</div>
              <div className="text-slate-800 font-medium text-xs truncate">{travelPlan.duration}</div>
            </button>
            <button
              onClick={() => handleNavigateToChat(2)}
              className="bg-slate-50 rounded-xl p-2 text-center hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="text-slate-500 text-xs mb-1">Food</div>
              <div className="text-slate-800 font-medium text-xs truncate">{travelPlan.food}</div>
            </button>
            <button
              onClick={() => handleNavigateToChat(3)}
              className="bg-slate-50 rounded-xl p-2 text-center hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="text-slate-500 text-xs mb-1">Companion</div>
              <div className="text-slate-800 font-medium text-xs truncate">{travelPlan.companion}</div>
            </button>
          </div>
        </div>
      </div>

      {/* 地图区域 */}
      <div className="flex-1 p-3 mobile-content-safe">
        <InteractiveMap
          mapPoints={travelPlan.mapPoints}
          onPointClick={handlePointClick}
          onCheckInRequest={handleCheckInRequest}
        />
      </div>

      {/* 抽屉组件 */}
      <Drawer
        isOpen={false} // Drawer is not used in this component, so it's always closed
        onClose={() => {}}
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
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-200 z-50"
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
          <div className="bg-white rounded-3xl p-6 border border-slate-200 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">AI Travel Assistant</h3>
              <button
                onClick={() => setIsAIChatOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-slate-600 text-sm">
                  Hi! I&apos;m your AI travel assistant. I can help you refine your itinerary, 
                  suggest alternatives, or answer any questions about your trip to {travelPlan.destination}.
                </p>
              </div>
              
              <div>
                <label className="block text-slate-700 text-sm mb-2">Ask me anything</label>
                <textarea
                  placeholder="e.g., Can you suggest more restaurants? What's the best time to visit temples?"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#fe585f] focus:ring-2 focus:ring-[#fe585f]/20"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white rounded-xl text-sm font-medium">
                  Send
                </button>
                <button 
                  onClick={() => setIsAIChatOpen(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200"
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

export default function TravelPlanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-[#fe585f] rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Loading...</h3>
          <p className="text-slate-600">Preparing your travel plan</p>
        </div>
      </div>
    }>
      <TravelPlanContent />
    </Suspense>
  );
} 