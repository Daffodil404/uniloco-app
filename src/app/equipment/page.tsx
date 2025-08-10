// src/app/equipment/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, Zap, Check, SlidersHorizontal, X } from 'lucide-react';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleBackToProfile = () => {
    router.push('/profile');
  };

  const handlePurchase = (item: Equipment) => {
    console.log('Purchase:', item.name);
  };

  const handleEquip = (item: Equipment) => {
    console.log('Equip:', item.name);
  };

  // Mock data
  const equipment: Equipment[] = [
    // 新增手环装备
    {
      id: '4',
      name: 'Smart Fitness Band',
      description: 'This band tracks your fitness data to help you stay healthy.',
      type: 'tool',
      rarity: 'common',
      image: '/static/1.jpg',
      isOwned: false,
      price: 29.99,
    },
    {
      id: '5',
      name: 'Heart Rate Monitor Band',
      description: 'Monitors your heart rate in real-time to ensure safe and effective workouts.',
      type: 'tool',
      rarity: 'rare',
      image: '/static/2.png',
      isOwned: false,
      price: 39.99,
    },
    {
      id: '6',
      name: 'Waterproof Fitness Band',
      description: 'Perfect for swimming and water sports, with a waterproof design for worry-free use.',
      type: 'tool',
      rarity: 'epic',
      image: '/static/3.png',
      isOwned: false,
      price: 49.99,
    },
    {
      id: '7',
      name: 'Multi-Function Smart Band',
      description: 'Integrates multiple features, including step tracking, sleep monitoring, and message alerts.',
      type: 'tool',
      rarity: 'legendary',
      image: '/static/4.png',
      isOwned: false,
      price: 59.99,
    },
    {
      id: '8',
      name: 'Stylish Health Band',
      description: 'Combines style and functionality, perfect for everyday wear.',
      type: 'tool',
      rarity: 'common',
      image: '/static/5.jpeg',
      isOwned: false,
      price: 34.99,
    },
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

  const filteredEquipment = equipment.filter(item => {
    if (selectedFilter === 'owned' && !item.isOwned) return false;
    if (selectedFilter === 'available' && item.isOwned) return false;
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FF9E4A]/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#fe585f] to-[#ff7a80] p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={handleBackToProfile} className="text-white/80 hover:text-white">
            ←
          </button>
          <h1 className="text-xl font-bold text-white">Equipment</h1>
        </div>
        {/* Filter Drawer Trigger */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
        >
          <SlidersHorizontal />
        </button>
        {/* Filter Drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-end z-[9999]">
            <div className="bg-white/95 backdrop-blur-md text-slate-800 shadow-xl border-l border-slate-200 p-4 w-72">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-1 rounded hover:bg-slate-100">
                  <X />
                </button>
              </div>
              {/* Filter by Status */}
              <div className="mb-6">
                <p className="text-sm text-slate-600 mb-2">Status</p>
                <div className="space-y-2">
                  {['all', 'owned', 'available'].map(f => (
                    <button
                      key={f}
                      onClick={() => {
                        setSelectedFilter(f as 'all' | 'owned' | 'available');
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg ${selectedFilter === f
                        ? 'bg-[#fe585f] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {/* Filter by Type */}
              <div>
                <p className="text-sm text-slate-600 mb-2">Type</p>
                <div className="space-y-2">
                  {['all', 'avatar', 'badge', 'tool'].map(t => (
                    <button
                      key={t}
                      onClick={() => {
                        setSelectedType(t as 'all' | 'avatar' | 'badge' | 'tool');
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg ${selectedType === t
                        ? 'bg-[#fe585f] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Stats */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200 mb-4 flex justify-between shadow-lg">
          <div>
            <p className="text-slate-600 text-sm">Total Equipment</p>
            <p className="text-slate-800 text-xl font-bold">
              {equipment.filter(e => e.isOwned).length}/{equipment.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-600 text-sm">UNC Balance</p>
            <p className="text-[#FF9E4A] text-xl font-bold">2,847</p>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredEquipment.map(item => (
            <div
              key={item.id}
              className={`bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden border shadow-lg ${item.isOwned ? 'border-[#66D2A0]' : 'border-slate-200'
                }`}
            >
              {/* Image */}
              <div className="relative w-full h-28 bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              {/* Info */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${getRarityColor(item.rarity)}`}>
                    {item.rarity.toUpperCase()}
                  </span>
                  <span className="text-slate-500 text-xs capitalize">{item.type}</span>
                </div>
                <h3 className="text-slate-800 font-semibold text-sm">{item.name}</h3>
                <p className="text-slate-600 text-xs">{item.description}</p>
                {/* Stats */}
                <div className="mt-2 space-y-1">
                  {item.stats?.checkInBonus && (
                    <div className="flex items-center gap-1 text-[#66D2A0] text-xs">
                      <Check /> +{item.stats.checkInBonus}% Check-in Bonus
                    </div>
                  )}
                  {item.stats?.pointMultiplier && (
                    <div className="flex items-center gap-1 text-[#FF9E4A] text-xs">
                      <Star /> x{item.stats.pointMultiplier} Points
                    </div>
                  )}
                  {item.stats?.specialEffect && (
                    <div className="flex items-center gap-1 text-[#4A90E2] text-xs">
                      <Zap /> {item.stats.specialEffect}
                    </div>
                  )}
                </div>
                {/* Action */}
                <button
                  onClick={() => (item.isOwned ? handleEquip(item) : handlePurchase(item))}
                  className={`mt-3 w-full py-2 rounded-xl text-xs font-medium ${item.isOwned
                    ? 'bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white'
                    : 'bg-gradient-to-r from-[#fe585f] to-[#FFB366] text-white'
                    }`}
                >
                  {item.isOwned ? 'Equip' : `${item.price || 0} UNC`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}