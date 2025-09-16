'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface UnlockedJourney {
  id: string;
  title: string;
  destination: string;
  completedAt: string;
  checkIns: number;
  totalPoints: number;
}

interface Equipment {
  id: string;
  name: string;
  type: 'avatar' | 'badge' | 'tool';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  isOwned: boolean;
  price?: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, userData, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'journeys' | 'equipment'>('profile');

  const handleBackToHome = () => {
    router.push('/new_h5/index');
  };

  const handleNavigateToEquipment = () => {
    router.push('/h5/equipment');
  };

  const handleLogout = () => {
    logout();
  };

  // Mock data
  const userProfile = {
    name: isLoggedIn ? userData?.username || 'User' : 'Guest',
    userId: isLoggedIn ? 'UNI123456' : 'GUEST',
    joinDate: isLoggedIn ? '2024-01-15' : 'Not logged in',
    avatar: '/static/locate.png',
    uncBalance: isLoggedIn ? 2847 : 0,
    totalCheckIns: isLoggedIn ? 23 : 0,
    completedJourneys: isLoggedIn ? 8 : 0,
    totalPoints: isLoggedIn ? 1560 : 0
  };



  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="mobile-screen bg-gradient-to-b from-white to-slate-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToHome}
            className="text-slate-600 hover:text-slate-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-slate-800">Profile</h1>
                      {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-slate-500 hover:text-slate-700 text-sm"
              >
                Logout
              </button>
            )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 mobile-content-safe">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-3xl p-6 border border-slate-200 mb-6">
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <div className="w-16 h-16 bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-800">{userProfile.name}</h2>
              <p className="text-slate-500 text-sm">ID: {userProfile.userId}</p>
              <p className="text-slate-500 text-sm">Joined: {userProfile.joinDate}</p>
            </div>
          </div>

          {/* UNC Balance */}
          <div className="bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm">EUR Balance</p>
                <p className="text-white text-2xl font-bold">{userProfile.uncBalance.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-slate-800">{userProfile.totalCheckIns}</div>
              <div className="text-slate-500 text-sm">Check-ins</div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-slate-800">{userProfile.completedJourneys}</div>
              <div className="text-slate-500 text-sm">Journeys</div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-slate-800">{userProfile.totalPoints}</div>
              <div className="text-slate-500 text-sm">Points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}