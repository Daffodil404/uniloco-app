'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Clock, MapPin, Users, X, ChevronLeft, ChevronRight, Landmark } from 'lucide-react';
import InteractiveMap from '@/components/features/InteractiveMap';
import type { MapPoint } from '@/types/travel';

export default function SpotDetailPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock 景点数据 - 罗马斗兽场
  const spot = {
    id: 'colosseum-rome',
    title: '罗马斗兽场（Colosseum）',
    subtitle:
      '世界上最大的古罗马圆形竞技场，建于公元72-80年。这里曾上演角斗士对决与历史传奇，如今是罗马最具代表性的文化遗产之一。',
    imageList: [
      '/static/real_pic1.png',
      '/static/real_pic2.png',
      '/static/real_pic3.png'
    ],
    rating: 4.9,
    reviewCount: 2481,
    duration: '建议游玩 2-3 小时',
    bestTime: '清晨或傍晚（避开人流与高温）',
    openInfo: '每日 09:00 - 19:00（最后入场 18:00）',
    location: 'Piazza del Colosseo, 1, 00184 Roma RM, 意大利',
    price: 26,
    currency: '€',
    highlights: ['免排队快速通道', '专业讲解导览', '地穴与上层视角', '含古罗马广场联票']
  };

  // 地图点位（斗兽场与周边）
  const mapPoints: MapPoint[] = [
    {
      id: 'colosseum',
      name: '罗马斗兽场',
      lat: 41.8902,
      lng: 12.4922,
      type: 'attraction',
      notes: '罗马地标，必游景点',
      rating: 4.9
    },
    {
      id: 'palatine',
      name: '帕拉蒂尼山',
      lat: 41.8894,
      lng: 12.4884,
      type: 'attraction',
      notes: '可俯瞰古罗马广场',
      rating: 4.7
    },
    {
      id: 'forum',
      name: '古罗马广场',
      lat: 41.8925,
      lng: 12.4853,
      type: 'attraction',
      notes: '古罗马政治与商业中心',
      rating: 4.8
    }
  ];

  const nextPhoto = () => setCurrentPhoto((prev) => Math.min(spot.imageList.length - 1, prev + 1));
  const prevPhoto = () => setCurrentPhoto((prev) => Math.max(0, prev - 1));

  const handlePointClick = (point: MapPoint) => {
    console.log('点击地点:', point.name);
  };

  const handleBooking = () => {
    setShowBooking(false);
    setShowSuccess(true);
  };

  useEffect(() => {
    if (!showSuccess) return;
    const t = setTimeout(() => setShowSuccess(false), 2200);
    return () => clearTimeout(t);
  }, [showSuccess]);

  return (
    <div className="min-h-screen bg-[#F9F7F5]">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E8E8E8]">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F9F7F5]"
          >
            <ChevronLeft className="w-5 h-5 text-[#333333]" />
          </button>
          <h1 className="text-lg font-semibold text-[#333333]">景点详情</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* 主体内容 */}
      <div className="px-4 py-4 space-y-4">
        {/* 图片轮播 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8E8E8]">
          <div className="relative h-56">
            <div
              className="w-full h-full bg-cover bg-center transition-all"
              style={{ backgroundImage: `url(${spot.imageList[currentPhoto]})` }}
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* 指示点 */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {spot.imageList.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === currentPhoto ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>

            {/* 翻页按钮 */}
            {spot.imageList.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  disabled={currentPhoto === 0}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center ${
                    currentPhoto === 0 ? 'bg-black/30 text-white/50' : 'bg-black/50 text-white active:scale-95'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextPhoto}
                  disabled={currentPhoto === spot.imageList.length - 1}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center ${
                    currentPhoto === spot.imageList.length - 1 ? 'bg-black/30 text-white/50' : 'bg-black/50 text-white active:scale-95'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* 角标 */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-[#4A90E2]" />
              <span className="text-xs font-medium text-[#333333]">世界文化遗产</span>
            </div>
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              <span className="text-xs font-medium text-[#333333]">{spot.rating}</span>
            </div>
          </div>

          <div className="p-4">
            <div className="bg-gradient-to-r from-[#4A90E2] to-[#66D2A0] text-white px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
              🏛️ Uniloco 精选景点
            </div>

            <h2 className="text-xl font-bold text-[#333333] mb-2">{spot.title}</h2>
            <p className="text-[#9B9B9B] text-sm leading-relaxed mb-4">{spot.subtitle}</p>

            {/* 元信息 */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-2 text-[#9B9B9B]">
                <Clock className="w-4 h-4" />
                <span>{spot.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-[#9B9B9B]">
                <Users className="w-4 h-4" />
                <span>建议错峰参观</span>
              </div>
              <div className="flex items-center gap-2 text-[#9B9B9B]">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{spot.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[#9B9B9B]">
                <Clock className="w-4 h-4" />
                <span>{spot.openInfo}</span>
              </div>
            </div>

            {/* 评分与标签 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold text-[#333333]">{spot.rating}</span>
                <span className="text-[#9B9B9B] text-sm">({spot.reviewCount} 条评价)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 游玩建议 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-3">💡 游玩建议</h3>
          <div className="bg-[#F9F7F5] p-4 rounded-xl border-l-4 border-[#4A90E2] text-sm text-[#333333]">
            最佳参观时间：{spot.bestTime}。建议提前预约导览或购买联票，体验地穴与上层观景平台，避开高峰排队。
          </div>
        </div>

        {/* 精选亮点 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-3">✨ 精选亮点</h3>
          <div className="flex flex-wrap gap-2">
            {spot.highlights.map((h) => (
              <span key={h} className="px-3 py-1 rounded-full text-xs bg-[#4A90E2]/10 text-[#4A90E2]">
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* 地图 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-4">🗺️ 地点与周边</h3>
          <div className="h-64 rounded-xl overflow-hidden">
            <InteractiveMap
              mapPoints={mapPoints}
              onPointClick={handlePointClick}
              center={[41.8902, 12.4922]}
              zoom={15}
            />
          </div>
        </div>

        {/* 预约导览/购票 */}
        <div className="sticky bottom-4">
          <button
            onClick={() => setShowBooking(true)}
            className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] text-white py-4 text-lg font-semibold rounded-2xl shadow-lg active:scale-95 transition-all"
          >
            预约导览 / 购票提醒
          </button>
        </div>
      </div>

      {/* 预约弹窗 */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 z-[9998] flex items-end">
          <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-[#E8E8E8]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#333333]">预约导览 / 购票提醒</h3>
                <button
                  onClick={() => setShowBooking(false)}
                  className="w-8 h-8 rounded-full bg-[#F9F7F5] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="text-center mb-2">
                <div className="text-2xl font-bold text-[#333333] mb-1">
                  {spot.currency}{spot.price}
                </div>
                <div className="text-[#9B9B9B] text-sm">基础门票（参考价）</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">首选日期</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min="2024-08-16"
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90E2] text-[#333333]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">入场时间</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90E2] text-[#333333]"
                >
                  <option value="">选择时间段</option>
                  {['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'].map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">参观人数</label>
                <select
                  value={selectedPeople}
                  onChange={(e) => setSelectedPeople(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90E2] text-[#333333]"
                >
                  <option value="">选择人数</option>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n.toString()}>{n}人</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] text-white py-4 text-lg font-semibold rounded-xl active:scale-95 transition-all"
              >
                提交预约
              </button>

              <p className="text-center text-sm text-[#9B9B9B]">🏛️ Uniloco 精选景点 | 预约成功后短信提醒</p>
            </div>
          </div>
        </div>
      )}

      {/* 成功提示 Toast */}
      {showSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center pointer-events-none">
          <div className="mb-[calc(env(safe-area-inset-bottom)_+_24px)] px-4 w-full max-w-sm pointer-events-auto">
            <div className="bg-white border border-[#E8E8E8] rounded-2xl shadow-xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#66D2A0] flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[#333333] font-semibold">预约已提交</div>
                <div className="text-[#9B9B9B] text-sm mt-0.5">我们已收到你的预约请求，稍后将通过短信或邮件与您确认。</div>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-[#9B9B9B] hover:text-[#333333] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


