'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Equipment {
  id: string;
  name: string;
  description: string;
  type: 'avatar' | 'badge' | 'tool';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  isOwned: boolean;
  price?: number;
  stats?: {
    checkInBonus?: number;
    pointMultiplier?: number;
    specialEffect?: string;
  };
}

export default function EquipmentPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'owned' | 'available'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'avatar' | 'badge' | 'tool'>('all');

  const handleBackToProfile = () => {
    router.push('/profile');
  };

  const handlePurchase = (item: Equipment) => {
    console.log('Purchase:', item.name);
    // 这里可以添加购买逻辑
  };

  const handleEquip = (item: Equipment) => {
    console.log('Equip:', item.name);
    // 这里可以添加装备逻辑
  };

  // Mock data
  const equipment: Equipment[] = [
    {
      id: '1',
      name: 'Explorer Backpack',
      description: 'Increases check-in bonus by 10%',
      type: 'tool',
      rarity: 'common',
      image: '/static/locate.png',
      isOwned: true,
      stats: {
        checkInBonus: 10
      }
    },
    {
      id: '2',
      name: 'Golden Compass',
      description: 'Reveals hidden locations on the map',
      type: 'tool',
      rarity: 'rare',
      image: '/static/locate.png',
      isOwned: true,
      stats: {
        specialEffect: 'Hidden locations revealed'
      }
    },
    {
      id: '3',
      name: 'Adventure Hat',
      description: 'Stylish hat that boosts your avatar',
      type: 'avatar',
      rarity: 'epic',
      image: '/static/locate.png',
      isOwned: false,
      price: 500,
      stats: {
        pointMultiplier: 1.2
      }
    },
    {
      id: '4',
      name: 'Legendary Wings',
      description: 'Rare wings that grant flight ability',
      type: 'badge',
      rarity: 'legendary',
      image: '/static/locate.png',
      isOwned: false,
      price: 2000,
      stats: {
        checkInBonus: 25,
        pointMultiplier: 1.5,
        specialEffect: 'Flight ability unlocked'
      }
    },
    {
      id: '5',
      name: 'Treasure Map',
      description: 'Shows rare item locations',
      type: 'tool',
      rarity: 'rare',
      image: '/static/locate.png',
      isOwned: false,
      price: 800,
      stats: {
        specialEffect: 'Rare items revealed'
      }
    },
    {
      id: '6',
      name: 'Crystal Necklace',
      description: 'Beautiful necklace with magical properties',
      type: 'avatar',
      rarity: 'epic',
      image: '/static/locate.png',
      isOwned: true,
      stats: {
        pointMultiplier: 1.3
      }
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getRarityBgColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-400/20';
      case 'rare': return 'bg-blue-400/20';
      case 'epic': return 'bg-purple-400/20';
      case 'legendary': return 'bg-yellow-400/20';
      default: return 'bg-gray-400/20';
    }
  };

  const filteredEquipment = equipment.filter(item => {
    if (selectedFilter === 'owned' && !item.isOwned) return false;
    if (selectedFilter === 'available' && item.isOwned) return false;
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#64D8EF] to-[#000000] from-10% to-100%">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToProfile}
            className="text-white/80 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white">Equipment</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-4">
        {/* Stats Card */}
        <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-4 border border-white/10 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/80 text-sm">Total Equipment</p>
              <p className="text-white text-xl font-bold">{equipment.filter(e => e.isOwned).length}/{equipment.length}</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">UNC Balance</p>
              <p className="text-[#FF9E4A] text-xl font-bold">2,847</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-4">
          {/* Status Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-gradient-to-r from-[#66D2A0] to-[#4A90E2] text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter('owned')}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedFilter === 'owned'
                  ? 'bg-gradient-to-r from-[#66D2A0] to-[#4A90E2] text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              Owned
            </button>
            <button
              onClick={() => setSelectedFilter('available')}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedFilter === 'available'
                  ? 'bg-gradient-to-r from-[#66D2A0] to-[#4A90E2] text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              Available
            </button>
          </div>

          {/* Type Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedType === 'all'
                  ? 'bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedType('avatar')}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedType === 'avatar'
                  ? 'bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              Avatar
            </button>
            <button
              onClick={() => setSelectedType('badge')}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedType === 'badge'
                  ? 'bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              Badge
            </button>
            <button
              onClick={() => setSelectedType('tool')}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedType === 'tool'
                  ? 'bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              Tool
            </button>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredEquipment.map((item) => (
            <div key={item.id} className={`bg-black/80 backdrop-blur-sm rounded-2xl p-4 border ${
              item.isOwned ? 'border-[#66D2A0]' : 'border-white/20'
            }`}>
              {/* Item Header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#4A90E2] to-[#64D8EF] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${getRarityColor(item.rarity)}`}>
                      {item.rarity.toUpperCase()}
                    </span>
                    <span className="text-white/60 text-xs capitalize">{item.type}</span>
                  </div>
                </div>
              </div>

              {/* Item Info */}
              <div className="mb-3">
                <h3 className="text-white font-semibold text-sm mb-1">{item.name}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{item.description}</p>
              </div>

              {/* Stats */}
              {item.stats && (
                <div className="mb-3 space-y-1">
                  {item.stats.checkInBonus && (
                    <div className="flex items-center gap-1">
                      <span className="text-[#66D2A0] text-xs">✓</span>
                      <span className="text-white/80 text-xs">+{item.stats.checkInBonus}% Check-in Bonus</span>
                    </div>
                  )}
                  {item.stats.pointMultiplier && (
                    <div className="flex items-center gap-1">
                      <span className="text-[#FF9E4A] text-xs">★</span>
                      <span className="text-white/80 text-xs">x{item.stats.pointMultiplier} Point Multiplier</span>
                    </div>
                  )}
                  {item.stats.specialEffect && (
                    <div className="flex items-center gap-1">
                      <span className="text-[#4A90E2] text-xs">⚡</span>
                      <span className="text-white/80 text-xs">{item.stats.specialEffect}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Button */}
              <div className="flex gap-2">
                {item.isOwned ? (
                  <button
                    onClick={() => handleEquip(item)}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-[#66D2A0] to-[#4A90E2] text-white rounded-xl text-xs font-medium"
                  >
                    Equip
                  </button>
                ) : (
                  <button
                    onClick={() => handlePurchase(item)}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white rounded-xl text-xs font-medium"
                  >
                    {item.price ? `${item.price} UNC` : 'Free'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEquipment.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-white/60 text-sm">No equipment found</p>
          </div>
        )}
      </div>
    </div>
  );
}