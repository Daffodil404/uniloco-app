'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const [activeTab, setActiveTab] = useState<'profile' | 'journeys' | 'equipment'>('profile');

  const handleBackToHome = () => {
    router.push('/home');
  };

  const handleNavigateToEquipment = () => {
    router.push('/equipment');
  };

  // Mock data
  const userProfile = {
    name: 'Alex Chen',
    userId: 'UNI123456',
    joinDate: '2024-01-15',
    avatar: '/static/locate.png',
    uncBalance: 2847,
    totalCheckIns: 23,
    completedJourneys: 8,
    totalPoints: 1560
  };

  const unlockedJourneys: UnlockedJourney[] = [
    {
      id: '1',
      title: 'Tokyo Adventure',
      destination: 'Tokyo, Japan',
      completedAt: '2024-03-15',
      checkIns: 12,
      totalPoints: 15
    },
    {
      id: '2',
      title: 'Paris Discovery',
      destination: 'Paris, France',
      completedAt: '2024-02-28',
      checkIns: 8,
      totalPoints: 12
    },
    {
      id: '3',
      title: 'Kyoto Heritage',
      destination: 'Kyoto, Japan',
      completedAt: '2024-01-20',
      checkIns: 6,
      totalPoints: 10
    }
  ];

  const equipment: Equipment[] = [
    {
      id: '1',
      name: 'Explorer Backpack',
      type: 'tool',
      rarity: 'common',
      image: '/static/locate.png',
      isOwned: true
    },
    {
      id: '2',
      name: 'Golden Compass',
      type: 'tool',
      rarity: 'rare',
      image: '/static/locate.png',
      isOwned: true
    },
    {
      id: '3',
      name: 'Adventure Hat',
      type: 'avatar',
      rarity: 'epic',
      image: '/static/locate.png',
      isOwned: false,
      price: 500
    },
    {
      id: '4',
      name: 'Legendary Wings',
      type: 'badge',
      rarity: 'legendary',
      image: '/static/locate.png',
      isOwned: false,
      price: 2000
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-b from-[#64D8EF] to-[#000000] from-10% to-100%">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToHome}
            className="text-white/80 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white">Profile</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-4">
        {/* Profile Card */}
        <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-6 border border-white/10 mb-6">
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <div className="w-16 h-16 bg-gradient-to-r from-[#4A90E2] to-[#64D8EF] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{userProfile.name}</h2>
              <p className="text-white/60 text-sm">ID: {userProfile.userId}</p>
              <p className="text-white/60 text-sm">Joined: {userProfile.joinDate}</p>
            </div>
          </div>

          {/* UNC Balance */}
          <div className="bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">UNC Balance</p>
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
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{userProfile.totalCheckIns}</div>
              <div className="text-white/60 text-sm">Check-ins</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{userProfile.completedJourneys}</div>
              <div className="text-white/60 text-sm">Journeys</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{userProfile.totalPoints}</div>
              <div className="text-white/60 text-sm">Points</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('journeys')}
            className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'journeys'
                ? 'bg-gradient-to-r from-[#66D2A0] to-[#4A90E2] text-white'
                : 'bg-white/10 text-white/60'
            }`}
          >
            Unlocked Journeys
          </button>
          <button
            onClick={handleNavigateToEquipment}
            className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'equipment'
                ? 'bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white'
                : 'bg-white/10 text-white/60'
            }`}
          >
            Equipment
          </button>
        </div>

        {/* Unlocked Journeys */}
        {activeTab === 'journeys' && (
          <div className="space-y-3">
            {unlockedJourneys.map((journey) => (
              <div key={journey.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{journey.title}</h3>
                  <span className="text-[#FF9E4A] text-sm">★ {journey.totalPoints}</span>
                </div>
                <p className="text-white/60 text-sm mb-3">{journey.destination}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-white/60">Check-ins: {journey.checkIns}</span>
                    <span className="text-white/60">Completed: {journey.completedAt}</span>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-[#66D2A0] to-[#4A90E2] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Equipment Preview */}
        {activeTab === 'equipment' && (
          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">My Equipment</h3>
                <span className="text-white/60 text-sm">{equipment.filter(e => e.isOwned).length}/{equipment.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {equipment.slice(0, 4).map((item) => (
                  <div key={item.id} className={`bg-white/5 rounded-xl p-3 border ${
                    item.isOwned ? 'border-[#66D2A0]' : 'border-white/20'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#4A90E2] to-[#64D8EF] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <span className={`text-xs font-medium ${getRarityColor(item.rarity)}`}>
                        {item.rarity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-white text-sm font-medium">{item.name}</p>
                    {!item.isOwned && item.price && (
                      <p className="text-[#FF9E4A] text-xs mt-1">{item.price} UNC</p>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={handleNavigateToEquipment}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white rounded-xl text-sm font-medium"
              >
                View All Equipment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}