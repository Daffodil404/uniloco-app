'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ExperienceItem {
  id: string;
  name: string;
  type: string;
  emoji: string;
  description: string;
  location: string;
  price: number;
  duration: string;
  rating: number;
  tags: string[];
  x: number;
  y: number;
  color: string;
  website?: string;
  booking?: string;
  phone?: string;
  details?: string;
  unilocoInfo?: {
    highlights: string[];
    bestTime: string;
    tips: string;
    nearby: string[];
  };
}

interface ItineraryItem extends ExperienceItem {
  scheduledDay?: number;
  scheduledTime?: string;
  scheduledTimeSlot?: string;
}

interface DayRoute {
  day: number;
  title: string;
  startLocation: string;
  endLocation: string;
  totalDuration: string;
  walkingDistance: string;
  activities: {
    time: string;
    activity: string;
    emoji: string;
    id: string;
    selected: boolean;
    location: string;
    duration: string;
    phone?: string;
    details?: string;
    price?: string;
    website?: string;
  }[];
}

export default function RomePlanner() {
  const [currentMapView, setCurrentMapView] = useState<'3D' | '2D'>('3D');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('category');
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [pendingExperience, setPendingExperience] = useState<ExperienceItem | null>(null);
  const [currentDayView, setCurrentDayView] = useState(1);
  const [aiItineraryGenerated, setAiItineraryGenerated] = useState(false);
  const [suggestedItinerary, setSuggestedItinerary] = useState<DayRoute[] | null>(null);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showMapDayControls, setShowMapDayControls] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{
    type: 'ai' | 'user' | 'uniloco';
    content: string;
    timestamp: number;
  }>>([
    {
      type: 'ai',
      content: `🎯 欢迎来到罗马！我是你的专属AI旅行规划师。
      
      我看到你是独自旅行1-3天，喜欢街头美食和文化体验。作为单人旅行者应该更喜欢高质量的个人体验。
      
      右侧有四种体验类型供你选择，告诉我你想尝试什么吧！
      
      💡 选择体验后可直接加入你的行程安排`,
      timestamp: Date.now()
    }
  ]);

  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // 数据定义
  const allData: Record<string, ExperienceItem[]> = {
    service: [
      {
        id: 'spa1',
        name: '罗马古典SPA中心',
        type: 'service',
        emoji: '💆‍♀️',
        description: '正宗罗马式温泉浴，私密包间，古典音乐伴奏',
        location: 'Via dei Cappuccini, 9',
        price: 120,
        duration: '90分钟',
        rating: 4.9,
        tags: ['私密', '放松', '古典'],
        x: 45, y: 35,
        color: '#ff7675',
        unilocoInfo: {
          highlights: ['古罗马风格装潢', '私人按摩师', '草药精油', '热石疗法'],
          bestTime: '下午2-4点人流较少',
          tips: '提前预约可享受9折优惠',
          nearby: ['万神殿(步行5分钟)', '纳沃纳广场(步行8分钟)']
        }
      },
      {
        id: 'chef1',
        name: '马里奥私厨工作室',
        type: 'service',
        emoji: '👨‍🍳',
        description: '学习制作正宗意大利面，一对一教学',
        location: 'Via del Corso, 123',
        price: 85,
        duration: '120分钟',
        rating: 4.8,
        tags: ['一对一', '教学', '美食'],
        x: 60, y: 25,
        color: '#fdcb6e',
        unilocoInfo: {
          highlights: ['米其林主厨亲授', '意式家庭秘方', '可带走食谱', '小班授课'],
          bestTime: '上午10-12点体验最佳',
          tips: '穿着围裙和舒适鞋子',
          nearby: ['西班牙阶(步行3分钟)', '特莱维喷泉(步行7分钟)']
        }
      }
    ],
    script: [
      {
        id: 'escape1',
        name: '古罗马密室逃脱',
        type: 'script',
        emoji: '🗝️',
        description: '角斗士主题沉浸式密室，还原古罗马竞技场',
        location: 'Via del Teatro, 12',
        price: 45,
        duration: '90分钟',
        rating: 4.4,
        tags: ['角斗士', '历史', '解谜'],
        x: 75, y: 60,
        color: '#6c5ce7',
        website: 'https://rome-escape.com',
        unilocoInfo: {
          highlights: ['沉浸式角斗士体验', '专业演员互动', '多重结局设计', '团队合作挑战'],
          bestTime: '傍晚时段氛围最佳',
          tips: '建议2-4人组队，穿着舒适运动装',
          nearby: ['斗兽场(步行10分钟)', '古罗马遗址(步行12分钟)']
        }
      },
      {
        id: 'mystery1',
        name: '凯撒谋杀案调查',
        type: 'script',
        emoji: '🔍',
        description: '扮演古罗马侦探，调查凯撒遇刺真相',
        location: 'Forum Romanum',
        price: 55,
        duration: '120分钟',
        rating: 4.6,
        tags: ['角色扮演', '推理', '历史'],
        x: 50, y: 45,
        color: '#a29bfe',
        website: 'https://rome-escape.com',
        unilocoInfo: {
          highlights: ['实地古罗马遗址探索', '历史学家导游', '多条调查线索', '互动推理环节'],
          bestTime: '上午9-11点光线最佳',
          tips: '建议了解一些古罗马历史背景',
          nearby: ['古罗马广场(现场)', '帕拉蒂尼山(步行5分钟)']
        }
      }
    ],
    activity: [
      {
        id: 'cooking1',
        name: '意大利烹饪课',
        type: 'activity',
        emoji: '🍝',
        description: '学习制作传统罗马菜肴，包含市场采购体验',
        location: 'Trastevere区',
        price: 75,
        duration: '180分钟',
        rating: 4.8,
        tags: ['文化', '美食', '体验'],
        x: 30, y: 55,
        color: '#ffeaa7',
        unilocoInfo: {
          highlights: ['当地市场采购', '传统家庭食谱', '品尝自制美食', '结识当地人'],
          bestTime: '上午9点开始，含午餐',
          tips: '空腹参加，会有丰盛午餐',
          nearby: ['圣玛丽教堂(步行2分钟)', '台伯河(步行8分钟)']
        }
      },
      {
        id: 'opera1',
        name: '罗马歌剧院经典演出',
        type: 'activity',
        emoji: '🎭',
        description: '在历史悠久的罗马歌剧院欣赏意大利经典歌剧或芭蕾舞剧',
        location: 'Teatro dell\'Opera di Roma',
        price: 85,
        duration: '150分钟',
        rating: 4.9,
        tags: ['歌剧', '舞剧', '文化', '艺术'],
        x: 65, y: 35,
        color: '#a29bfe',
        phone: '+39 06 481 601',
        details: '意大利顶级歌剧院，威尔第、普契尼经典剧目，世界级歌唱家演出',
        website: 'https://operaroma.it',
        unilocoInfo: {
          highlights: ['19世纪历史剧院', '世界级歌唱家', '意大利经典剧目', '华丽服装道具'],
          bestTime: '晚上8点演出，提前30分钟入场',
          tips: '建议正装出席，可租用歌剧望远镜',
          nearby: ['共和国广场(步行5分钟)', '戴克里先浴场(步行8分钟)']
        }
      }
    ],
    dining: [
      {
        id: 'restaurant1',
        name: 'Da Armando al Pantheon',
        type: 'dining',
        emoji: '🍽️',
        description: '百年家族餐厅，传统罗马菜，万神殿旁',
        location: 'Via degli Orfani, 114',
        price: 45,
        duration: '90分钟',
        rating: 4.7,
        tags: ['传统', '家族', '历史'],
        x: 55, y: 40,
        color: '#ff6b9d',
        unilocoInfo: {
          highlights: ['1961年开业至今', '传统罗马菜肴', '本地人聚集地', '万神殿最佳观景'],
          bestTime: '午餐12:30-14:00，晚餐19:30-21:30',
          tips: '强烈建议预约，尝试Cacio e Pepe',
          nearby: ['万神殿(步行1分钟)', '纳沃纳广场(步行5分钟)']
        }
      }
    ],
    attractions: [
      {
        id: 'colosseum1',
        name: '斗兽场快速通道票',
        type: 'attraction',
        emoji: '🏛️',
        description: '免排队门票，含语音导览，地下层参观',
        location: 'Piazza del Colosseo',
        price: 35,
        duration: '120分钟',
        rating: 4.9,
        tags: ['免排队', '导览', '历史'],
        x: 70, y: 50,
        color: '#74b9ff',
        booking: 'https://coopculture.it',
        unilocoInfo: {
          highlights: ['跳过长队直接入场', '地下层和竞技场层', '多语言音频导览', '古罗马遗址联票'],
          bestTime: '早上8:30开门时人最少',
          tips: '建议购买包含古罗马遗址的联票',
          nearby: ['古罗马遗址(步行3分钟)', '君士坦丁凯旋门(步行2分钟)']
        }
      }
    ]
  };

  // 计算总费用
  const calculateTotalCost = () => {
    return itineraryItems.reduce((total, item) => total + item.price, 0);
  };

  // 添加消息
  const addMessage = (type: 'ai' | 'user' | 'uniloco', content: string) => {
    setChatMessages(prev => [...prev, { type, content, timestamp: Date.now() }]);
  };

  // 选择类别
  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'itinerary') {
      generateAIItinerary();
    } else {
      setShowTimeSelection(true);
      setShowSearchResults(false);
    }

    const responses: Record<string, string> = {
      'activity': '🎪 活动体验！很好的选择。罗马有丰富的文化活动，请选择想要参加活动的具体天数？',
      'script': '🎭 剧本体验！太棒了，沉浸式的历史体验会很精彩。请选择想要体验剧本的天数？',
      'service': '💼 服务体验！享受高品质的个人服务会让旅行更特别。请选择想要享受服务的天数？',
      'itinerary': '🗺️ 让我为你制定一个完整的3天罗马行程！我会根据你的I人特质，安排一些深度而不拥挤的体验...'
    };

    addMessage('ai', responses[category] || '请选择体验类型');
  };

  // 生成AI行程
  const generateAIItinerary = () => {
    setShowSearchResults(true);
    setShowMapDayControls(true);
    
    const itinerary: DayRoute[] = [
      {
        day: 1,
        title: '第一天 - 古典罗马',
        startLocation: 'Colosseo地铁站',
        endLocation: 'Via dei Cappuccini SPA中心',
        totalDuration: '约8小时',
        walkingDistance: '2.5公里',
        activities: [
          {
            time: '09:00-11:15',
            activity: '斗兽场快速通道参观',
            emoji: '🏛️',
            id: 'colosseum1',
            selected: true,
            location: 'Piazza del Colosseo, 1',
            duration: '2小时15分钟',
            phone: '+39 06 3996 7700',
            details: '免排队门票，含中文语音导览，地下层和竞技场层参观',
            price: '€35',
            website: 'https://coopculture.it'
          },
          {
            time: '11:30-12:45',
            activity: '古罗马遗址漫步',
            emoji: '🚶‍♂️',
            id: 'forum_walk',
            selected: true,
            location: 'Via della Salaria Vecchia, 5/6',
            duration: '1小时15分钟',
            phone: '+39 06 3996 7700',
            details: '帝国广场核心区域，凯撒神庙、维斯塔神庙等重要遗址',
            price: '包含在斗兽场联票中',
            website: 'https://coopculture.it'
          }
        ]
      }
    ];

    setSuggestedItinerary(itinerary);
    setAiItineraryGenerated(true);
  };

  // 切换地图视图
  const toggleMap = () => {
    setCurrentMapView(prev => prev === '3D' ? '2D' : '3D');
  };

  // 显示天数路线
  const showDayRoute = (day: number) => {
    setCurrentDayView(day);
  };

  // 发送消息
  const sendMessage = () => {
    if (!chatInputRef.current) return;
    
    const message = chatInputRef.current.value.trim();
    if (message === '') return;

    addMessage('user', message);
    chatInputRef.current.value = '';

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      addMessage('ai', aiResponse);
    }, 1000);
  };

  // 生成AI回复
  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('spa') || message.includes('按摩') || message.includes('放松')) {
      selectCategory('service');
      return '🛀 我理解你想要放松！罗马的SPA体验非常棒，特别推荐古典罗马式温泉浴。请先选择想要体验的时间。';
    } else if (message.includes('美食') || message.includes('餐厅') || message.includes('吃')) {
      return '🍝 罗马的美食文化太丰富了！除了传统餐厅，我特别推荐私厨体验和烹饪课程，这样你可以学会制作正宗的意大利面。想试试哪种？';
    } else if (message.includes('密室') || message.includes('游戏') || message.includes('剧本')) {
      selectCategory('script');
      return '🎭 太有趣了！罗马有一些独特的历史主题剧本体验，可以让你穿越回古罗马时代。请选择想要体验的时间。';
    } else if (message.includes('行程') || message.includes('规划') || message.includes('安排')) {
      selectCategory('itinerary');
      return '📋 让我为你制定一个完美的3天行程！我会结合历史文化、美食体验和放松时光，确保每一天都充实而不匆忙。';
    } else {
      return '🤔 听起来很有趣！你可以从右侧选择体验类型，或者告诉我更具体的需求，比如：想要放松、美食体验、文化活动等。我会为你推荐最合适的选择！';
    }
  };

  // 处理回车键
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // 滚动到底部
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white overflow-hidden">
      <div className="flex w-full h-full">
                 {/* 左侧聊天面板 */}
         <div className="w-full md:w-[420px] h-full bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col">
                     <div className="p-4 md:p-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] border-b border-white/10">
             <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">🤖 Uniloco旅行规划师</h2>
             <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/10 rounded-2xl">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#ff6b6b] to-[#feca57] rounded-full flex items-center justify-center text-xl md:text-2xl">
                 🧳
               </div>
               <div className="flex-1">
                 <div className="font-bold mb-1 text-sm md:text-base">独行旅人</div>
                 <div className="text-xs md:text-sm opacity-90">📍 Rome | 🗓️ 1-3Day | 🍜 Street Food | 👤 Single | 🎭 Cultural</div>
               </div>
             </div>
           </div>

                     {/* 行程编码区域 */}
           <div className="p-3 md:p-5 border-b border-white/10 bg-white/5">
             <div className="text-xs md:text-sm font-bold mb-2 md:mb-3 text-[#4ecdc4]">🗓️ 我的行程安排</div>
             <div className="bg-black/30 p-2 md:p-3 rounded-lg font-mono text-xs text-[#00ff88] border border-[#00ff88]/30 mb-2 md:mb-3">
               IT-ROME-2025-001
             </div>
             <div className="max-h-28 md:max-h-36 overflow-y-auto">
              {itineraryItems.length === 0 ? (
                <div className="text-center text-white/50 text-xs py-5">
                  暂无安排项目<br />
                  <small>选择服务并点击"加入行程"</small>
                </div>
              ) : (
                <div className="space-y-2">
                  {itineraryItems.map((item, index) => (
                    <div key={index} className="bg-[#667eea]/10 border border-[#667eea]/30 rounded-lg p-2 text-xs flex justify-between items-center">
                      <span>{item.emoji} {item.name} - €{item.price}</span>
                      <button 
                        className="bg-[#ff4757]/70 border-none rounded text-white text-xs px-2 py-1"
                        onClick={() => {
                          setItineraryItems(prev => prev.filter((_, i) => i !== index));
                        }}
                      >
                        移除
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

                     {/* 聊天消息区域 */}
           <div className="flex-1 overflow-y-auto p-3 md:p-5" ref={chatMessagesRef}>
            {chatMessages.map((message, index) => (
              <div
                key={index}
                                 className={`mb-3 md:mb-4 p-3 md:p-4 rounded-2xl max-w-[90%] ${
                  message.type === 'ai' 
                    ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] mr-auto' 
                    : message.type === 'user'
                    ? 'bg-gradient-to-r from-[#43cea2] to-[#185a9d] ml-auto text-right'
                    : 'bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] mr-auto border-l-4 border-[#e74c3c]'
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br/>') }} />
              </div>
            ))}
          </div>

                     {/* 聊天输入区域 */}
           <div className="p-3 md:p-5 border-t border-white/10">
             <input
               ref={chatInputRef}
               type="text"
               placeholder="告诉我你想要什么体验..."
               className="w-full p-3 md:p-4 bg-white/10 border border-white/20 rounded-full text-white outline-none focus:border-[#667eea] focus:bg-white/15 transition-all text-sm md:text-base"
               onKeyPress={handleKeyPress}
             />
           </div>
        </div>

        {/* 中间地图区域 */}
        <div className="flex-1 relative overflow-hidden">
                     <button
             onClick={toggleMap}
             className="absolute top-3 md:top-5 left-3 md:left-5 z-50 bg-black/20 backdrop-blur-lg border border-white/20 text-white px-3 md:px-5 py-2 md:py-3 rounded-full hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] transition-all text-xs md:text-sm"
           >
             {currentMapView === '3D' ? '🌍 2D' : '🌍 3D'}
           </button>

                     {/* 地图信息面板 */}
           <div className="absolute top-16 md:top-20 left-3 md:left-5 bg-black/20 backdrop-blur-lg border border-white/20 p-3 md:p-4 rounded-xl z-40 min-w-[160px] md:min-w-[200px]">
             <h4 className="text-[#4ecdc4] mb-2 text-xs md:text-sm font-bold">📍 罗马历史中心区</h4>
             <p className="text-xs mb-1 opacity-80">🗺️ 总面积: 约3.2公里²</p>
             <p className="text-xs mb-1 opacity-80">⏱️ 步行穿越: 45-60分钟</p>
             <p className="text-xs mb-1 opacity-80">🚇 地铁覆盖: A线、B线</p>
             <p className="text-xs opacity-80">📌 已标记: {Object.values(allData).flat().length} 个推荐地点</p>
           </div>

          {/* 3D地图 */}
          <div 
            className={`absolute inset-0 transition-opacity duration-800 ${
              currentMapView === '3D' ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'radial-gradient(circle at center, #2c3e50 0%, #1a252f 100%)'
            }}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white/60">
                🌍 3D罗马城市视图<br />
                <small>浮动的光点代表各种体验服务</small>
              </div>
            </div>
          </div>

          {/* 2D地图 */}
          <div 
            className={`absolute inset-0 transition-opacity duration-800 ${
              currentMapView === '2D' ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, #2d5a3d 0%, #1a3d2e 50%, #0f2419 100%)'
            }}
          >
            {/* 用户位置标记 */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#ff4757] border-3 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-40 animate-pulse" />
            
            {/* 活动标记 */}
            {Object.entries(allData).map(([category, items]) =>
              items.map((item) => (
                <div
                  key={item.id}
                  className="absolute w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs cursor-pointer transition-all hover:scale-125 z-30"
                  style={{
                    backgroundColor: item.color,
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    opacity: selectedCategory === category || !selectedCategory ? 0.7 : 0.3
                  }}
                  title={item.name}
                >
                  {item.emoji}
                </div>
              ))
            )}

                         {/* 天数控制面板 */}
             {showMapDayControls && (
               <div className="absolute top-16 md:top-20 right-3 md:right-5 bg-black/20 backdrop-blur-lg border border-white/20 p-3 md:p-4 rounded-xl z-40">
                 <button
                   className={`block w-full bg-white/10 border border-white/20 text-white p-1.5 md:p-2 mb-1.5 md:mb-2 rounded-lg text-xs transition-all ${
                     currentDayView === 1 ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2]' : 'hover:bg-white/20'
                   }`}
                   onClick={() => showDayRoute(1)}
                 >
                   第1天
                 </button>
                 <button
                   className={`block w-full bg-white/10 border border-white/20 text-white p-1.5 md:p-2 mb-1.5 md:mb-2 rounded-lg text-xs transition-all ${
                     currentDayView === 2 ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2]' : 'hover:bg-white/20'
                   }`}
                   onClick={() => showDayRoute(2)}
                 >
                   第2天
                 </button>
                 <button
                   className={`block w-full bg-white/10 border border-white/20 text-white p-1.5 md:p-2 rounded-lg text-xs transition-all ${
                     currentDayView === 3 ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2]' : 'hover:bg-white/20'
                   }`}
                   onClick={() => showDayRoute(3)}
                 >
                   第3天
                 </button>
               </div>
             )}
          </div>
        </div>

                 {/* 右侧控制面板 */}
         <div className="hidden md:block w-[380px] h-full bg-black/20 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto">
          {/* 体验类型选择 */}
          <div className="bg-white/5 rounded-2xl p-5 mb-5 border border-white/10">
            <div className="text-[#4ecdc4] font-bold mb-4">🎯 体验类型选择</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { category: 'activity', emoji: '🎪', title: '活动体验', desc: '运动、户外、文化' },
                { category: 'script', emoji: '🎭', title: '剧本体验', desc: '密室、角色扮演' },
                { category: 'service', emoji: '💼', title: '服务体验', desc: 'SPA、私厨、摄影' },
                { category: 'itinerary', emoji: '🗺️', title: 'AI行程', desc: '完整规划方案' }
              ].map((item) => (
                <button
                  key={item.category}
                  className={`p-4 rounded-xl text-center transition-all ${
                    selectedCategory === item.category
                      ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] border-[#667eea]'
                      : 'bg-gradient-to-r from-white/10 to-white/5 border border-white/20 hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] hover:-translate-y-0.5'
                  } border text-white text-sm font-medium`}
                  onClick={() => selectCategory(item.category)}
                >
                  {item.emoji} {item.title}<br />
                  <small className="text-xs opacity-80">{item.desc}</small>
                </button>
              ))}
            </div>
          </div>

          {/* 时间选择 */}
          {showTimeSelection && (
            <div className="bg-white/5 rounded-2xl p-5 mb-5 border border-white/10">
              <div className="text-[#4ecdc4] font-bold mb-4">📅 选择体验天数</div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <select 
                  className="bg-white/10 border border-white/20 text-white p-3 rounded-xl text-sm outline-none focus:border-[#667eea]"
                  value={selectedDay || ''}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                >
                  <option value="">请选择天数</option>
                  <option value="1">第1天</option>
                  <option value="2">第2天</option>
                  <option value="3">第3天</option>
                </select>
                <select 
                  className="bg-white/10 border border-white/20 text-white p-3 rounded-xl text-sm outline-none focus:border-[#667eea]"
                  value={selectedTimeSlot || ''}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                >
                  <option value="">请选择时间段</option>
                  <option value="morning">🌅 上午 (9:00-12:00)</option>
                  <option value="afternoon">☀️ 下午 (14:00-17:00)</option>
                  <option value="evening">🌆 傍晚 (18:00-21:00)</option>
                </select>
              </div>
              {selectedDay && selectedTimeSlot && (
                <button className="w-full bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black p-4 rounded-xl font-bold transition-all hover:-translate-y-0.5">
                  确认天数安排
                </button>
              )}
            </div>
          )}

          {/* 搜索结果 */}
          {showSearchResults && (
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="text-[#4ecdc4] font-bold mb-4">🔍 搜索结果</div>
              <div className="space-y-3">
                {selectedCategory && allData[selectedCategory]?.map((item) => (
                  <div key={item.id} className="bg-white/5 rounded-xl p-4 border border-white/10 transition-all hover:bg-white/10 hover:-translate-y-0.5">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-3">{item.emoji}</span>
                      <span className="font-bold text-sm flex-1">{item.name}</span>
                    </div>
                    <div className="text-xs opacity-80 mb-3">
                      {item.description}<br />
                      📍 {item.location} | 💰 €{item.price} | ⏰ {item.duration} | ⭐ {item.rating}
                    </div>
                    <div className="flex gap-2 mb-3">
                      {item.tags?.map((tag, index) => (
                        <span key={index} className="bg-[#667eea]/20 text-[#667eea] px-2 py-1 rounded-full text-xs border border-[#667eea]/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {item.website && (
                        <button className="bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] text-white px-3 py-1 rounded text-xs">
                          官网
                        </button>
                      )}
                      <button className="bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black px-3 py-1 rounded text-xs font-bold">
                        选择时间
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
