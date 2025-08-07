'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InteractiveMap from '@/components/features/InteractiveMap';
import type { MapPoint } from '@/types/travel';

// Mock数据
const mockMapPoints: MapPoint[] = [
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
    rating: 4.7,
    openingHours: '6:00-17:00'
  },
  {
    id: '3',
    name: 'Senso-ji Temple',
    lat: 35.7148,
    lng: 139.7967,
    type: 'attraction',
    rating: 4.6,
    openingHours: '6:00-17:00'
  },
  {
    id: '4',
    name: 'Tsukiji Outer Market',
    lat: 35.6654,
    lng: 139.7702,
    type: 'restaurant',
    rating: 4.4,
    openingHours: '5:00-14:00'
  }
];

export default function HomePage() {
  const router = useRouter();

  const handlePointClick = (point: MapPoint) => {
    console.log('Point clicked:', point.name);
    // 这里可以添加点击处理逻辑
  };

  const handleSaveMap = () => {
    console.log('Save map');
  };

  const handleNavigateToProfile = () => {
    router.push('/profile');
  };

  const handleNavigateToAIPlan = () => {
    router.push('/travel-plan');
  };

  const handleNavigateToStoryLibrary = () => {
    router.push('/bookshelf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#64D8EF] to-[#000000] from-10% to-100% flex flex-col">
      {/* 地图区域 - 占据更多空间 */}
      <div className="flex-1 p-3 flex">
        <InteractiveMap
          mapPoints={mockMapPoints}
          onPointClick={handlePointClick}
          onSaveMap={handleSaveMap}
        />
      </div>

      {/* 底部导航卡片 - 减少高度 */}
      <div className="p-2 pb-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/20">
          {/* 用户信息行 */}
          <div className="flex items-center gap-3 mb-3">
            {/* 头像 */}
            <div className="w-10 h-10 bg-gradient-to-r from-[#4A90E2] to-[#64D8EF] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            {/* 用户信息 */}
            <div className="flex-1">
              <div className="text-white font-semibold text-sm">用户名</div>
              <div className="text-white/60 text-xs">余额: ¥1,234</div>
            </div>
            
            {/* 个人中心按钮 */}
            <button
              onClick={handleNavigateToProfile}
              className="px-3 py-1.5 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white rounded-xl text-xs font-medium hover:shadow-lg transition-all"
            >
              个人中心
            </button>
          </div>

          {/* 功能按钮行 */}
          <div className="flex gap-3">
            {/* AI行程规划 */}
            <button
              onClick={handleNavigateToAIPlan}
              className="flex-1 px-3 py-2.5 bg-gradient-to-r from-[#66D2A0] to-[#4A90E2] text-white rounded-xl text-xs font-medium hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                AI行程规划
              </div>
            </button>

            {/* 旅途故事 */}
            <button
              onClick={handleNavigateToStoryLibrary}
              className="flex-1 px-3 py-2.5 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white rounded-xl text-xs font-medium hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                旅途故事
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 