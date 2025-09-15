'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Clock, Users, MapPin, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import InteractiveMap from '@/components/features/InteractiveMap';
import type { MapPoint } from '@/types/travel';

export default function ExperienceDetailPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock experience data - 斯特拉斯堡本地体验
  const experience = {
    id: "strasbourg-local-experience",
    title: "像当地人一样体验斯特拉斯堡",
    subtitle: "骑行穿越斯特拉斯堡老城，品尝当地美食，探索游客不知道的隐秘景点。跟随本地向导深入了解这座欧洲首都的真实面貌。",
    image: "/static/online_resource/strasbourg.png",
    price: 227,
    currency: '¥',
    rating: 4.97,
    reviewCount: 134,
    duration: "4小时",
    groupSize: "2-8人",
    languages: "法语/英语",
    location: "斯特拉斯堡，法国",
    availability: "明日可预订",
    timeSlots: ["09:00 - 13:00", "14:00 - 18:00"],
    icon: "🚴‍♂️"
  };

  // 行程安排
  const itinerary = [
    {
      step: 1,
      time: "09:00 - 09:30",
      title: "克莱伯广场集合与自行车装备",
      description: "在斯特拉斯堡最著名的广场集合，领取专业自行车和安全装备。向导介绍今日行程和安全注意事项，分享本地骑行路线秘诀。"
    },
    {
      step: 2,
      time: "09:30 - 11:00",
      title: "老城区深度骑行探索",
      description: "骑行穿越联合国教科文组织世界遗产——斯特拉斯堡老城。参观小法兰西的运河和传统木筋屋，了解中世纪城市的建筑特色和历史故事。"
    },
    {
      step: 3,
      time: "11:00 - 12:00",
      title: "隐秘景点与本地市场",
      description: "探访游客鲜知的隐秘景点：古老的犹太区、艺术家工作室街区。在传统市场品尝阿尔萨斯特色美食，体验地道的本地生活氛围。"
    },
    {
      step: 4,
      time: "12:00 - 13:00",
      title: "传统餐厅午餐体验",
      description: "在当地人常去的传统餐厅（Winstub）享用正宗阿尔萨斯午餐。品尝酸菜、阿尔萨斯挞等地方特色美食，搭配当地白葡萄酒。"
    }
  ];

  // 地图点位
  const mapPoints: MapPoint[] = [
    {
      id: 'kleber',
      name: '克莱伯广场',
      lat: 48.5846,
      lng: 7.7507,
      type: 'attraction',
      notes: '集合地点，斯特拉斯堡市中心',
      rating: 4.8
    },
    {
      id: 'petite-france',
      name: '小法兰西',
      lat: 48.5800,
      lng: 7.7400,
      type: 'attraction',
      notes: '世界遗产，木筋屋建筑群',
      rating: 4.9
    },
    {
      id: 'cathedral',
      name: '斯特拉斯堡大教堂',
      lat: 48.5819,
      lng: 7.7508,
      type: 'attraction',
      notes: '哥特式建筑杰作',
      rating: 4.7
    },
    {
      id: 'market',
      name: '本地市场',
      lat: 48.5830,
      lng: 7.7480,
      type: 'restaurant',
      notes: '传统阿尔萨斯美食',
      rating: 4.6
    }
  ];

  // 包含内容
  const includes = [
    "专业自行车租赁",
    "安全头盔和装备",
    "本地专业向导服务",
    "传统午餐（含饮品）",
    "市场美食品尝",
    "景点门票（如需要）",
    "意外保险保障"
  ];

  const excludes = [
    "往返交通费用",
    "个人消费和纪念品",
    "额外饮品和小费",
    "晚餐费用"
  ];

  // 向导信息
  const host = {
    name: "Pierre Dubois",
    avatar: "👨‍🦱",
    description: "我是斯特拉斯堡本地人，在这座城市出生和长大。作为认证导游，我已经带领游客探索我的家乡超过8年。我喜欢分享斯特拉斯堡的历史、文化和只有本地人才知道的秘密景点。",
    stats: {
      experiences: 268,
      rating: 4.9,
      years: 8
    }
  };

  const handleBooking = () => {
    setShowBooking(false);
    setShowSuccess(true);
  };

  const handlePointClick = (point: MapPoint) => {
    console.log('点击地点:', point.name);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(itinerary.length - 1, prev + 1));
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
          <h1 className="text-lg font-semibold text-[#333333]">本地体验</h1>
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
              style={{ backgroundImage: 'url(/static/online_resource/strasbourg.png)' }}
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-semibold text-[#333333]">🔥 仅剩3个名额</span>
            </div>
          </div>

          <div className="p-4">
            <div className="bg-gradient-to-r from-[#4A90E2] to-[#66D2A0] text-white px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
              🌟 Uniloco 精选体验
            </div>
            
            <h2 className="text-xl font-bold text-[#333333] mb-2">
              {experience.title}
            </h2>
            
            <p className="text-[#9B9B9B] text-sm leading-relaxed mb-4">
              {experience.subtitle}
            </p>

            {/* 元信息 */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{experience.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <Users className="h-4 w-4" />
                <span className="text-sm">{experience.groupSize}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{experience.location}</span>
              </div>
            </div>

            {/* 评分 */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-semibold text-[#333333]">{experience.rating}</span>
                <span className="text-[#9B9B9B] text-sm">({experience.reviewCount} 评价)</span>
              </div>
              <div className="w-1 h-1 bg-[#9B9B9B] rounded-full"></div>
              <span className="text-[#9B9B9B] text-sm">{experience.languages}</span>
            </div>
          </div>
        </div>

        {/* 行程安排 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-4">🗓️ 行程安排</h3>
          
          {/* 当前步骤显示 */}
          <div className="bg-[#F9F7F5] rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#4A90E2] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {itinerary[currentStep].step}
                </div>
                <div>
                  <div className="text-[#4A90E2] font-medium text-sm">{itinerary[currentStep].time}</div>
                  <h4 className="font-semibold text-[#333333]">{itinerary[currentStep].title}</h4>
                </div>
              </div>
            </div>
            <p className="text-[#333333] text-sm leading-relaxed">
              {itinerary[currentStep].description}
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
              {itinerary.map((_, index) => (
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
              disabled={currentStep === itinerary.length - 1}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                currentStep === itinerary.length - 1
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
          <h3 className="text-lg font-bold text-[#333333] mb-4">🗺️ 体验地点</h3>
          <div className="h-64 rounded-xl overflow-hidden">
            <InteractiveMap
              mapPoints={mapPoints}
              onPointClick={handlePointClick}
              center={[48.5846, 7.7507]}
              zoom={13}
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
                {includes.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span className="text-[#333333] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-red-600 mb-2 flex items-center">
                <X className="h-4 w-4 mr-2" />
                不包含
              </h4>
              <ul className="space-y-2">
                {excludes.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <X className="h-3 w-3 text-red-500 flex-shrink-0" />
                    <span className="text-[#333333] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 向导信息 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-4">👨‍🏫 您的向导</h3>
          
          <div className="bg-[#F9F7F5] rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#4A90E2] to-[#66D2A0] rounded-full flex items-center justify-center text-white text-xl">
                {host.avatar}
              </div>
              <div>
                <h4 className="font-semibold text-[#333333]">{host.name}</h4>
                <p className="text-[#9B9B9B] text-sm">认证本地向导</p>
              </div>
            </div>
            
            <p className="text-[#333333] text-sm leading-relaxed mb-3">{host.description}</p>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="text-center">
                <div className="font-semibold text-[#4A90E2]">{host.stats.experiences}</div>
                <div className="text-[#9B9B9B] text-xs">体验次数</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-[#4A90E2]">{host.stats.rating}</div>
                <div className="text-[#9B9B9B] text-xs">平均评分</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-[#4A90E2]">{host.stats.years}年</div>
                <div className="text-[#9B9B9B] text-xs">向导经验</div>
              </div>
            </div>
          </div>
        </div>

        {/* 重要信息 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-4">📋 重要信息</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-[#F9F7F5] rounded-xl border-l-4 border-[#4A90E2]">
              <h4 className="font-semibold text-[#333333] text-sm mb-1">⏰ 预订时间</h4>
              <p className="text-[#9B9B9B] text-xs">提前24小时预订，节假日需提前3天。即时确认，预订后发送详细集合信息。</p>
            </div>
            <div className="p-3 bg-[#F9F7F5] rounded-xl border-l-4 border-[#4A90E2]">
              <h4 className="font-semibold text-[#333333] text-sm mb-1">🌦️ 天气政策</h4>
              <p className="text-[#9B9B9B] text-xs">恶劣天气情况下，我们会提前通知改期或提供室内替代方案。安全第一是我们的原则。</p>
            </div>
            <div className="p-3 bg-[#F9F7F5] rounded-xl border-l-4 border-[#4A90E2]">
              <h4 className="font-semibold text-[#333333] text-sm mb-1">💳 取消政策</h4>
              <p className="text-[#9B9B9B] text-xs">体验前24小时免费取消，24小时内取消收取50%费用。特殊情况可协商处理。</p>
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
                  {experience.currency}{experience.price}
                </div>
                <div className="text-[#9B9B9B] text-sm">每人</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  选择日期
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
                  选择时间
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90E2] text-[#333333]"
                >
                  <option value="">选择时间段</option>
                  {experience.timeSlots.map((slot, index) => (
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
                  {[2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num.toString()}>
                      {num}人
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] text-white py-4 text-lg font-semibold rounded-xl active:scale-95 transition-all"
              >
                确认预订
              </button>

              <p className="text-center text-sm text-[#9B9B9B]">
                💝 Uniloco 品质保证 | 24小时内免费取消
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
                <div className="text-[#9B9B9B] text-sm mt-0.5">我们已收到你的体验预订请求，稍后将有客服与您确认。</div>
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
