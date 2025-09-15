'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Clock, Users, MapPin, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import InteractiveMap from '@/components/features/InteractiveMap';
import type { MapPoint } from '@/types/travel';

export default function ScriptDetailPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock script data - 约克幽灵传说
  const script = {
    id: 'york-ghost',
    title: '约克幽灵传说',
    subtitle: '沉浸式体验约克千年历史的神秘传说，在真实历史场景中与精心打造的角色互动，解开跨越数个世纪的超自然谜团。',
    category: '神秘悬疑',
    image: '/static/online_resource/york.png',
    price: 95,
    currency: '£',
    rating: 4.9,
    reviewCount: 127,
    duration: '4小时',
    groupSize: '4-6人',
    difficulty: '中等',
    location: '约克，英格兰',
    availability: '明日可预订',
    timeSlots: ['14:00 - 18:00', '19:00 - 23:00'],
    icon: '🏰'
  };

  // 故事背景
  const storyBackground = {
    title: '故事背景',
    content: '一位神秘的考古学家在约克大教堂发现了一份古老的羊皮纸卷轴，其中包含了关于城市创始人离奇死亡的真相。然而，就在破译关键信息的前夜，这位考古学家神秘失踪，在约克各处留下了散落的线索。作为特别调查小组，你们必须在幽灵苏醒之前，解开这个跨越千年的谜团，涉及背叛、酷刑和谋杀。'
  };

  // 游戏流程
  const gameFlow = [
    {
      step: 1,
      time: '14:00 - 14:30',
      title: '开场仪式与团队集结',
      location: '罗马柱，大教堂庭院',
      description: '在约克大教堂前的历史罗马柱集合，接收神秘委托。分发线索包、调查工具和游戏手册。团队成员相互了解，制定初步调查策略。'
    },
    {
      step: 2,
      time: '14:30 - 15:30',
      title: '约克大教堂探索',
      location: '约克大教堂内部',
      description: '深入千年大教堂寻找建筑师的幽灵线索。与NPC神父威廉互动，破译古代铭文，发现第一个重要证据。探索教堂地下室和古代石雕。'
    },
    {
      step: 3,
      time: '15:30 - 16:30',
      title: '肉铺街解谜挑战',
      location: '肉铺街',
      description: '在保存完好的中世纪街道追踪失踪考古学家的足迹。与商人NPC玛格丽特对话，在古老店铺中搜寻散落的羊皮纸碎片，拼凑历史真相。'
    },
    {
      step: 4,
      time: '16:30 - 17:30',
      title: '地下密室最终对决',
      location: '约克城堡博物馆地下',
      description: '进入神秘地下空间面对终极挑战——千年复仇幽灵。团队协作解决最终谜题，完成拯救约克的使命。'
    },
    {
      step: 5,
      time: '17:30 - 18:00',
      title: '总结与庆祝',
      location: '金羊毛酒馆',
      description: '在600年历史的传统英式酒馆进行游戏总结，领取完成证书，享用正宗英式下午茶，与NPC演员合影留念。'
    }
  ];

  // 地图点位
  const mapPoints: MapPoint[] = [
    {
      id: 'minster',
      name: '约克大教堂',
      lat: 53.9619,
      lng: -1.0819,
      type: 'attraction',
      notes: '千年大教堂，游戏起点',
      rating: 4.8
    },
    {
      id: 'shambles',
      name: '肉铺街',
      lat: 53.9596,
      lng: -1.0803,
      type: 'attraction',
      notes: '中世纪街道，解谜地点',
      rating: 4.7
    },
    {
      id: 'castle',
      name: '约克城堡博物馆',
      lat: 53.9556,
      lng: -1.0803,
      type: 'attraction',
      notes: '地下密室，最终对决',
      rating: 4.6
    },
    {
      id: 'inn',
      name: '金羊毛酒馆',
      lat: 53.9603,
      lng: -1.0831,
      type: 'restaurant',
      notes: '600年历史酒馆，游戏结束',
      rating: 4.5
    }
  ];

  const handleBooking = () => {
    setShowBooking(false);
    setShowSuccess(true);
  };

  const handlePointClick = (point: MapPoint) => {
    console.log('点击地点:', point.name);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(gameFlow.length - 1, prev + 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  // 成功提示自动消失
  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => setShowSuccess(false), 2200);
    return () => clearTimeout(timer);
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
          <h1 className="text-lg font-semibold text-[#333333]">约克幽灵传说</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* 主要内容 */}
      <div className="px-4 py-4 space-y-4">
        {/* 英雄区域 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8E8E8]">
          <div className="relative h-48">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: 'url(/static/online_resource/york.png)' }}
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-semibold text-[#333333]">{script.difficulty}</span>
            </div>
          </div>

          <div className="p-4">
            <div className="bg-gradient-to-r from-[#4A90E2] to-[#66D2A0] text-white px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
              🎭 Uniloco 定制旅程
            </div>
            
            <h2 className="text-xl font-bold text-[#333333] mb-2">
              {script.title}
            </h2>
            
            <p className="text-[#9B9B9B] text-sm leading-relaxed mb-4">
              {script.subtitle}
            </p>

            {/* 元信息 */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{script.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <Users className="h-4 w-4" />
                <span className="text-sm">{script.groupSize}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{script.location}</span>
              </div>
            </div>

            {/* 评分 */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-semibold text-[#333333]">{script.rating}</span>
                <span className="text-[#9B9B9B] text-sm">({script.reviewCount} 评价)</span>
              </div>
              <div className="w-1 h-1 bg-[#9B9B9B] rounded-full"></div>
              <span className="text-[#9B9B9B] text-sm">{script.category}</span>
            </div>
          </div>
        </div>

        {/* 故事背景 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-3">🔍 故事背景</h3>
          <div className="bg-[#F9F7F5] p-4 rounded-xl border-l-4 border-[#4A90E2]">
            <p className="text-[#333333] text-sm leading-relaxed">{storyBackground.content}</p>
          </div>
        </div>

        {/* 游戏流程 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-4">🎮 游戏流程</h3>
          
          {/* 当前步骤显示 */}
          <div className="bg-[#F9F7F5] rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#4A90E2] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {gameFlow[currentStep].step}
                </div>
                <div>
                  <div className="text-[#4A90E2] font-medium text-sm">{gameFlow[currentStep].time}</div>
                  <h4 className="font-semibold text-[#333333]">{gameFlow[currentStep].title}</h4>
                </div>
              </div>
            </div>
            <p className="text-[#9B9B9B] text-sm mb-2">
              <strong>地点：</strong> {gameFlow[currentStep].location}
            </p>
            <p className="text-[#333333] text-sm leading-relaxed">
              {gameFlow[currentStep].description}
            </p>
          </div>

          {/* 翻页控制 */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                currentStep === 0
                  ? "bg-[#E8E8E8] text-[#9B9B9B] cursor-not-allowed"
                  : "bg-[#4A90E2] text-white active:scale-95"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 步骤指示器 */}
            <div className="flex gap-1">
              {gameFlow.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep ? "bg-[#4A90E2]" : "bg-[#E8E8E8]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              disabled={currentStep === gameFlow.length - 1}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                currentStep === gameFlow.length - 1
                  ? "bg-[#E8E8E8] text-[#9B9B9B] cursor-not-allowed"
                  : "bg-[#4A90E2] text-white active:scale-95"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 地图区域 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-4">🗺️ 游戏地点</h3>
          <div className="h-64 rounded-xl overflow-hidden">
            <InteractiveMap
              mapPoints={mapPoints}
              onPointClick={handlePointClick}
              center={[53.9603, -1.0831]}
              zoom={14}
            />
          </div>
        </div>

        {/* 包含内容 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-4">💼 包含内容</h3>
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold text-green-600 mb-2 flex items-center">
                <Check className="h-4 w-4 mr-2" />
                包含项目
              </h4>
              <ul className="space-y-2">
                {[
                  '专业NPC演员（3人）',
                  '所有景点门票（约克大教堂+城堡博物馆）',
                  '游戏道具和调查工具',
                  '游戏手册和线索系统',
                  '金羊毛酒馆英式下午茶',
                  '完成证书和纪念品',
                  '专业摄影师服务',
                  '免费接送服务（市中心酒店）'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-[#333333] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 预订按钮 */}
        <div className="sticky bottom-4">
          <button
            onClick={() => setShowBooking(true)}
            className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] text-white py-4 text-lg font-semibold rounded-2xl shadow-lg active:scale-95 transition-all"
          >
            立即预订体验
          </button>
        </div>
      </div>

      {/* 预订弹窗 */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 z-[9998] flex items-end">
          <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-[#E8E8E8]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#333333]">预订详情</h3>
                <button
                  onClick={() => setShowBooking(false)}
                  className="w-8 h-8 rounded-full bg-[#F9F7F5] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-[#333333] mb-1">
                  {script.currency}{script.price}
                </div>
                <div className="text-[#9B9B9B] text-sm">每人</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  首选日期
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min="2024-08-16"
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90E2] text-[#333333]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  开始时间
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90E2] text-[#333333]"
                >
                  <option value="">选择时间段</option>
                  {script.timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  参与人数
                </label>
                <select
                  value={selectedPeople}
                  onChange={(e) => setSelectedPeople(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90E2] text-[#333333]"
                >
                  <option value="">选择人数</option>
                  <option value="1">1人（与他人组队）</option>
                  <option value="2">2人</option>
                  <option value="3">3人</option>
                  <option value="4">4人（最少团队）</option>
                  <option value="5">5人</option>
                  <option value="6">6人（推荐）</option>
                </select>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] text-white py-4 text-lg font-semibold rounded-xl active:scale-95 transition-all"
              >
                确认预订
              </button>

              <p className="text-center text-sm text-[#9B9B9B]">
                🎭 Uniloco 原创剧本 | 专业NPC表演保证
              </p>
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
                <div className="text-[#333333] font-semibold">预订成功</div>
                <div className="text-[#9B9B9B] text-sm mt-0.5">我们已收到你的预订请求，稍后将有客服与您确认。</div>
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
