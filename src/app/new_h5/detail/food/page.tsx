'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Clock, MapPin, Users, Check, X, ChevronLeft, ChevronRight, Utensils, Phone, Wifi, Car } from 'lucide-react';
import InteractiveMap from '@/components/features/InteractiveMap';
import type { MapPoint } from '@/types/travel';

export default function FoodDetailPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock restaurant data - 罗马传统餐厅
  const restaurant = {
    id: 'trattoria-roma',
    name: 'Trattoria da Mario',
    subtitle: '罗马老城区最地道的传统意式餐厅，传承三代家族秘制配方，以正宗罗马菜和手工意面闻名。',
    category: '意式餐厅',
    price: 45,
    currency: '€',
    rating: 4.8,
    reviewCount: 324,
    avgPrice: '€25-35',
    openHours: '12:00 - 15:00, 19:00 - 23:00',
    location: 'Via del Corso, 123, 00186 Roma RM, 意大利',
    phone: '+39 06 1234 5678',
    features: ['WiFi', '停车位', '外送', '包厢'],
    images: [
      '/static/1.jpg',
      '/static/2.png',
      '/static/3.png'
    ]
  };

  // 招牌菜品
  const signatureDishes = [
    {
      id: 'carbonara',
      name: '正宗罗马卡波纳拉意面',
      price: '€18',
      description: '传统配方，使用新鲜鸡蛋、佩科里诺奶酪和意式培根',
      image: '/static/1.jpg',
      isRecommended: true
    },
    {
      id: 'cacio-e-pepe',
      name: '奶酪胡椒意面',
      price: '€16',
      description: '罗马经典，简单却美味的奶酪与黑胡椒组合',
      image: '/static/2.png',
      isRecommended: true
    },
    {
      id: 'osso-buco',
      name: '米兰式炖牛膝',
      price: '€28',
      description: '慢炖牛膝配藏红花烩饭，经典米兰风味',
      image: '/static/3.png',
      isRecommended: false
    },
    {
      id: 'tiramisu',
      name: '提拉米苏',
      price: '€8',
      description: '自制马斯卡彭奶酪，咖啡香浓',
      image: '/static/1.jpg',
      isRecommended: true
    }
  ];

  // 用户评价
  const reviews = [
    {
      id: 1,
      userName: '张小明',
      userAvatar: '张',
      rating: 5,
      date: '2024年8月',
      dish: '正宗罗马卡波纳拉意面',
      text: '太棒了！这是我吃过最正宗的卡波纳拉意面，奶酪和培根的比例刚刚好，面条也很有嚼劲。服务员很热情，环境也很温馨。',
      images: ['/static/1.jpg']
    },
    {
      id: 2,
      userName: 'Maria Chen',
      userAvatar: 'M',
      rating: 4,
      date: '2024年7月',
      dish: '奶酪胡椒意面',
      text: '经典的罗马风味，简单但很美味。价格合理，分量足。唯一的小问题是等位时间有点长，建议提前预约。',
      images: []
    },
    {
      id: 3,
      userName: '李旅行',
      userAvatar: '李',
      rating: 5,
      date: '2024年7月',
      dish: '提拉米苏',
      text: '提拉米苏非常棒！咖啡味浓郁，奶酪很香滑，不会太甜。餐厅的装修很有意大利风情，拍照很好看。',
      images: ['/static/2.png', '/static/3.png']
    }
  ];

  // 地图点位
  const mapPoints: MapPoint[] = [
    {
      id: 'restaurant',
      name: 'Trattoria da Mario',
      lat: 41.9028,
      lng: 12.4964,
      type: 'restaurant',
      notes: '传统意式餐厅',
      rating: 4.8
    },
    {
      id: 'pantheon',
      name: '万神殿',
      lat: 41.8986,
      lng: 12.4769,
      type: 'attraction',
      notes: '步行5分钟',
      rating: 4.7
    },
    {
      id: 'trevi',
      name: '许愿池',
      lat: 41.9009,
      lng: 12.4833,
      type: 'attraction',
      notes: '步行8分钟',
      rating: 4.6
    }
  ];

  const handleBooking = () => {
    setShowBooking(false);
    setShowSuccess(true);
  };

  const nextImage = () => {
    setCurrentImage((prev) => Math.min(restaurant.images.length - 1, prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => Math.max(0, prev - 1));
  };

  const handlePointClick = (point: MapPoint) => {
    console.log('点击地点:', point.name);
  };

  // 成功提示自动消失
  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => setShowSuccess(false), 2200);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'WiFi': return <Wifi className="h-4 w-4" />;
      case '停车位': return <Car className="h-4 w-4" />;
      case '外送': return <Utensils className="h-4 w-4" />;
      case '包厢': return <Users className="h-4 w-4" />;
      default: return <Check className="h-4 w-4" />;
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
          <h1 className="text-lg font-semibold text-[#333333]">美食详情</h1>
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
              style={{ backgroundImage: `url(${restaurant.images[currentImage]})` }}
            />
            <div className="absolute inset-0 bg-black/20" />
            
            {/* 图片指示器 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {restaurant.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImage ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* 翻页按钮 */}
            {restaurant.images.length > 1 && (
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
                  disabled={currentImage === restaurant.images.length - 1}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    currentImage === restaurant.images.length - 1
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
              <Utensils className="h-4 w-4 text-[#4A90E2]" />
              <span className="text-sm font-medium text-[#333333]">{restaurant.category}</span>
            </div>

            {/* 评分标签 */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-[#333333]">{restaurant.rating}</span>
            </div>
          </div>

          <div className="p-4">
            <div className="bg-gradient-to-r from-[#4A90E2] to-[#66D2A0] text-white px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
              🍝 Uniloco 精选美食
            </div>
            
            <h2 className="text-xl font-bold text-[#333333] mb-2">
              {restaurant.name}
            </h2>
            
            <p className="text-[#9B9B9B] text-sm leading-relaxed mb-4">
              {restaurant.subtitle}
            </p>

            {/* 元信息 */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <Star className="h-4 w-4" />
                <span>{restaurant.rating} ({restaurant.reviewCount} 评价)</span>
              </div>
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <Clock className="h-4 w-4" />
                <span>{restaurant.avgPrice}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{restaurant.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#9B9B9B]">
                <Phone className="h-4 w-4" />
                <span>{restaurant.phone}</span>
              </div>
            </div>

            {/* 营业时间 */}
            <div className="bg-[#F9F7F5] p-3 rounded-xl mb-4">
              <div className="flex items-center space-x-2 text-[#333333] text-sm">
                <Clock className="h-4 w-4 text-[#4A90E2]" />
                <span className="font-medium">营业时间：</span>
                <span>{restaurant.openHours}</span>
              </div>
            </div>

            {/* 餐厅特色 */}
            <div className="flex flex-wrap gap-2">
              {restaurant.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-1 px-3 py-1 bg-[#4A90E2]/10 rounded-full">
                  {getFeatureIcon(feature)}
                  <span className="text-xs text-[#4A90E2]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 招牌菜品 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-4">🍽️ 招牌菜品</h3>
          
          <div className="space-y-3">
            {signatureDishes.map((dish, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-[#F9F7F5] rounded-xl">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${dish.image})` }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-[#333333] text-sm">{dish.name}</h4>
                    {dish.isRecommended && (
                      <span className="px-2 py-0.5 bg-[#FF9E4A] text-white text-xs rounded-full">
                        推荐
                      </span>
                    )}
                  </div>
                  <p className="text-[#9B9B9B] text-xs leading-relaxed mb-2">{dish.description}</p>
                  <div className="text-[#4A90E2] font-semibold text-sm">{dish.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 用户评价 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-4">⭐ 用户评价</h3>
          
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-[#E8E8E8] pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#4A90E2] to-[#66D2A0] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {review.userAvatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-[#333333] text-sm">{review.userName}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-[#9B9B9B] text-xs">{review.date} · {review.dish}</div>
                  </div>
                </div>
                <p className="text-[#333333] text-sm leading-relaxed mb-2">{review.text}</p>
                {review.images.length > 0 && (
                  <div className="flex space-x-2">
                    {review.images.map((img, imgIndex) => (
                      <div key={imgIndex} className="w-16 h-16 rounded-lg overflow-hidden">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${img})` }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 地图区域 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8]">
          <h3 className="text-lg font-bold text-[#333333] mb-4">🗺️ 位置信息</h3>
          <div className="h-64 rounded-xl overflow-hidden">
            <InteractiveMap
              mapPoints={mapPoints}
              onPointClick={handlePointClick}
              center={[41.9028, 12.4964]}
              zoom={15}
            />
          </div>
        </div>

        {/* 预订按钮 */}
        <div className="sticky bottom-4">
          <button
            onClick={() => setShowBooking(true)}
            className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] text-white py-4 text-lg font-semibold rounded-2xl shadow-lg active:scale-95 transition-all"
          >
            立即预订桌位
          </button>
        </div>
      </div>

      {/* 预订弹窗 */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 z-[9998] flex items-end">
          <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-[#E8E8E8]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#333333]">预订桌位</h3>
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
                  {restaurant.name}
                </div>
                <div className="text-[#9B9B9B] text-sm">人均 {restaurant.avgPrice}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  用餐日期
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
                  用餐时间
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90E2] text-[#333333]"
                >
                  <option value="">选择时间段</option>
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30</option>
                  <option value="20:00">20:00</option>
                  <option value="20:30">20:30</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  用餐人数
                </label>
                <select
                  value={selectedPeople}
                  onChange={(e) => setSelectedPeople(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90E2] text-[#333333]"
                >
                  <option value="">选择人数</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
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
                🍝 Uniloco 精选美食 | 预订成功后短信确认
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
                <div className="text-[#9B9B9B] text-sm mt-0.5">我们已收到你的桌位预订请求，稍后将通过短信与您确认。</div>
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
