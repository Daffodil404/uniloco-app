// 原有的home 页面，为了展示暂时修改路由
'use client';
import { useRouter } from 'next/navigation';
import InteractiveMap from '@/components/features/InteractiveMap';
import type { MapPoint } from '@/types/travel';
import { useAuth } from '@/hooks/useAuth';

// Mock数据
const mockMapPoints: MapPoint[] = [
  {
    id: '1',
    name: 'Notre-Dame Cathedral',
    lat: 49.6106,
    lng: 6.1319,
    type: 'attraction',
    rating: 4.6,
    openingHours: '8:00-18:00'
  },
  {
    id: '2',
    name: 'Palais Grand-Ducal',
    lat: 49.6119,
    lng: 6.1319,
    type: 'attraction',
    rating: 4.7,
    openingHours: '10:00-17:00'
  },
  {
    id: '3',
    name: 'Casemates du Bock',
    lat: 49.6125,
    lng: 6.1358,
    type: 'attraction',
    rating: 4.5,
    openingHours: '10:00-17:30'
  },
  {
    id: '4',
    name: 'Place d\'Armes',
    lat: 49.6111,
    lng: 6.1306,
    type: 'attraction',
    rating: 4.4,
    openingHours: '24/7'
  }
];

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn, userData, requireLogin } = useAuth();

  const handlePointClick = (point: MapPoint) => {
    console.log('Point clicked:', point.name);
    // 这里可以添加点击处理逻辑
  };

  const handleNavigateToProfile = () => {
    if (!requireLogin()) {
      return; // 如果未登录，requireLogin 会自动重定向
    }
    router.push('/h5/profile');
  };

  const handleNavigateToAIPlan = () => {
    if (!requireLogin('/h5/travel-plan')) {
      return; // 如果未登录，requireLogin 会自动重定向
    }
    router.push('/h5/travel-plan');
  };

  const handleNavigateToStoryLibrary = () => {
    if (!requireLogin('/h5/bookshelf')) {
      return; // 如果未登录，requireLogin 会自动重定向
    }
    router.push('/h5/bookshelf');
  };

  return (
    <div className="mobile-screen bg-gradient-to-b from-white to-slate-50 flex flex-col">
      {/* 地图区域 - 占据更多空间但有限制 */}
      <div className="flex-1 p-3 flex" style={{ minHeight: 0 }}>
        <InteractiveMap
          mapPoints={mockMapPoints}
          onPointClick={handlePointClick}
        />
      </div>

      {/* 底部导航卡片 - 确保不被压住 */}
      <div className="mobile-footer-safe p-2 flex-shrink-0">
        <div className="bg-white shadow-lg rounded-3xl p-4 border border-slate-200">
          {/* 用户信息行 */}
          <div className="flex items-center gap-3 mb-3">
            {/* 头像 */}
            <div className="w-10 h-10 bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            {/* 用户信息 */}
            <div className="flex-1">
              <div className="text-slate-800 font-semibold text-sm">
                {isLoggedIn ? userData?.username || '用户' : '游客'}
              </div>
              <div className="text-slate-500 text-xs">
                {isLoggedIn ? 'Balance: ¥1,234' : 'Login to access more features'}
              </div>
            </div>
            
            {/* 个人中心按钮 */}
            <button
              onClick={handleNavigateToProfile}
              className="px-3 py-1.5 bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] text-white rounded-xl text-xs font-medium hover:shadow-lg transition-all"
            >
              Profile
            </button>
          </div>

          {/* 功能按钮行 */}
          <div className="flex gap-3">
            {/* AI行程规划 */}
            <button
              onClick={handleNavigateToAIPlan}
              className={`flex-1 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isLoggedIn 
                  ? 'bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] text-white hover:shadow-lg' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                AI Travel Plan
                {!isLoggedIn && <span className="text-xs opacity-60">(Login Required)</span>}
              </div>
            </button>

            {/* 旅途故事 */}
            <button
              onClick={handleNavigateToStoryLibrary}
              className={`flex-1 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isLoggedIn 
                  ? 'bg-slate-600 text-white hover:bg-slate-700 hover:shadow-lg' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Travel Stories
                {!isLoggedIn && <span className="text-xs opacity-60">(Login Required)</span>}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 