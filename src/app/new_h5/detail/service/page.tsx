'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Clock, Users, MapPin, Check, X, ChevronLeft, ChevronRight, Camera, Utensils, HeartPulse, Brush, Dumbbell } from 'lucide-react';

export default function ServiceDetailPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock service data - 专业旅行摄影服务
  const service = {
    id: 'photo-1',
    title: '专业旅行摄影服务',
    subtitle: '专业摄影师为您记录旅途中的美好瞬间，提供高质量的照片和视频，让您的旅行回忆更加珍贵。',
    category: 'photography',
    price: 120,
    currency: '¥',
    rating: 4.9,
    reviewCount: 89,
    duration: '2小时',
    groupSize: '1-4人',
    difficulty: '简单',
    location: '罗马，意大利',
    availability: '今日可预订',
    timeSlots: ['09:00 - 11:00', '14:00 - 16:00', '17:00 - 19:00'],
    icon: '📸',
    images: [
      '/static/1.jpg',
      '/static/2.png',
      '/static/3.png'
    ]
  };

  // 服务详情
  const serviceDetails = {
    description: '我们的专业摄影师拥有丰富的旅行摄影经验，擅长捕捉城市风光、人文景观和您的精彩瞬间。无论是单人照、情侣照还是家庭照，我们都能为您提供最优质的服务。',
    highlights: [
      '专业摄影师全程跟拍',
      '提供50-100张精修照片',
      '包含视频短片制作',
      '24小时内交付原片',
      '支持多种拍摄风格',
      '免费提供拍摄道具'
    ],
    process: [
      {
        step: 1,
        title: '预约确认',
        description: '确认拍摄时间、地点和风格偏好'
      },
      {
        step: 2,
        title: '现场拍摄',
        description: '专业摄影师现场指导，捕捉最佳角度'
      },
      {
        step: 3,
        title: '后期制作',
        description: '专业修图师精修照片，制作视频短片'
      },
      {
        step: 4,
        title: '交付成品',
        description: '24小时内通过云端链接交付所有作品'
      }
    ]
  };

  // 摄影师信息
  const photographer = {
    name: 'Marco Rossi',
    experience: '5年专业摄影经验',
    specialties: ['旅行摄影', '人像摄影', '城市风光'],
    rating: 4.9,
    completedJobs: 156,
    languages: ['中文', '英文', '意大利语']
  };

  const handleBooking = () => {
    setShowBooking(false);
    setShowSuccess(true);
  };

  const nextImage = () => {
    setCurrentImage((prev) => Math.min(service.images.length - 1, prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => Math.max(0, prev - 1));
  };

  // 成功提示自动消失
  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => setShowSuccess(false), 2200);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'photography': return <Camera className="h-5 w-5" />;
      case 'private-chef': return <Utensils className="h-5 w-5" />;
      case 'spa': return <HeartPulse className="h-5 w-5" />;
      case 'makeup': return <Brush className="h-5 w-5" />;
      case 'fitness': return <Dumbbell className="h-5 w-5" />;
      default: return <Camera className="h-5 w-5" />;
    }
  };

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
          <h1 className="text-lg font-semibold text-[#333333]">专业服务</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* 主要内容 */}
      <div className="px-4 py-4 space-y-4">
        {/* 图片轮播区域 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8E8E8]">
          <div className="relative h-64">
            <div 
              className="w-full h-full bg-cover bg-center transition-all duration-300"
              style={{ backgroundImage: `url(${service.images[currentImage]})` }}
            />
            <div className="absolute inset-0 bg-black/20" />
            
            {/* 图片指示器 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {service.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImage ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* 翻页按钮 */}
            {service.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={currentImage === 0}
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    currentImage === 0
                      ? "bg-black/30 text-white/50 cursor-not-allowed"
                      : "bg-black/50 text-white active:scale-95"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  disabled={currentImage === service.images.length - 1}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    currentImage === service.images.length - 1
                      ? "bg-black/30 text-white/50 cursor-not-allowed"
                      : "bg-black/50 text-white active:scale-95"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* 分类标签 */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
              {getCategoryIcon(service.category)}
              <span className="text-sm font-medium text-[#333333]">摄影服务</span>
            </div>

            {/* 评分标签 */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-[#333333]">{service.rating}</span>
            </div>
          </div>

          <div className="p-4">
            <div className="bg-gradient-to-r from-[#4A90E2] to-[#66D2A0] text-white px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
              🎯 Uniloco 专业服务
            </div>
            
            <h2 className="text-xl font-bold text-[#333333] mb-2">
              {service.title}
            </h2>
            
            <p className="text-[#9B9B9B] text-sm leading-relaxed mb-4">
              {service.subtitle}
            </p>

            {/* 元信息 */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{service.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <Users className="h-4 w-4" />
                <span className="text-sm">{service.groupSize}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{service.location}</span>
              </div>
            </div>

            {/* 评分 */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-semibold text-[#333333]">{service.rating}</span>
                <span className="text-[#9B9B9B] text-sm">({service.reviewCount} 评价)</span>
              </div>
              <div className="w-1 h-1 bg-[#9B9B9B] rounded-full"></div>
              <span className="text-[#9B9B9B] text-sm">{service.difficulty}</span>
            </div>
          </div>
        </div>

        {/* 服务详情 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-3">📋 服务详情</h3>
          <div className="bg-[#F9F7F5] p-4 rounded-xl border-l-4 border-[#4A90E2]">
            <p className="text-[#333333] text-sm leading-relaxed mb-4">{serviceDetails.description}</p>
            
            <div>
              <h4 className="text-sm font-semibold text-[#333333] mb-2">服务亮点：</h4>
              <ul className="space-y-1">
                {serviceDetails.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span className="text-[#333333] text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 服务流程 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-4">🔄 服务流程</h3>
          
          <div className="space-y-3">
            {serviceDetails.process.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-[#F9F7F5] rounded-xl">
                <div className="w-8 h-8 bg-[#4A90E2] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#333333] text-sm mb-1">{step.title}</h4>
                  <p className="text-[#9B9B9B] text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 摄影师信息 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-4">👨‍💼 摄影师信息</h3>
          
          <div className="bg-[#F9F7F5] rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#4A90E2] to-[#66D2A0] rounded-full flex items-center justify-center text-white font-semibold">
                {photographer.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-[#333333]">{photographer.name}</h4>
                <p className="text-[#9B9B9B] text-sm">{photographer.experience}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[#9B9B9B]">评分：</span>
                <span className="font-semibold text-[#333333]">{photographer.rating}</span>
              </div>
              <div>
                <span className="text-[#9B9B9B]">完成订单：</span>
                <span className="font-semibold text-[#333333]">{photographer.completedJobs}</span>
              </div>
            </div>
            
            <div className="mt-3">
              <span className="text-[#9B9B9B] text-sm">专长：</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {photographer.specialties.map((specialty, index) => (
                  <span key={index} className="px-2 py-1 bg-[#4A90E2]/10 text-[#4A90E2] text-xs rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 预订按钮 */}
        <div className="sticky bottom-4">
          <button
            onClick={() => setShowBooking(true)}
            className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] text-white py-4 text-lg font-semibold rounded-2xl shadow-lg active:scale-95 transition-all"
          >
            立即预订服务
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
                  {service.currency}{service.price}
                </div>
                <div className="text-[#9B9B9B] text-sm">每次服务</div>
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
                  {service.timeSlots.map((slot, index) => (
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
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                  <option value="3">3人</option>
                  <option value="4">4人</option>
                </select>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] text-white py-4 text-lg font-semibold rounded-xl active:scale-95 transition-all"
              >
                确认预订
              </button>

              <p className="text-center text-sm text-[#9B9B9B]">
                📸 Uniloco 专业服务 | 品质保证
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
                <div className="text-[#9B9B9B] text-sm mt-0.5">我们已收到你的服务预订请求，稍后将有客服与您确认。</div>
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
