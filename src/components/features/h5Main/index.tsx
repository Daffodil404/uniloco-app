'use client';

import { useState, useEffect, useRef } from 'react';
import Conversation from './Conversation';
import MapWIthRoute from './MapWIthRoute';
import SelectionPanel from './SelectionPanel';
import type { ExperienceItem, ItineraryItem, DayRoute, ChatMessage } from './types';
 

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
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
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
        location: "Teatro dell'Opera di Roma",
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
    <div className="h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800 overflow-hidden">
      <div className="flex w-full h-full">
        <Conversation
          chatMessages={chatMessages}
          chatMessagesRef={chatMessagesRef}
          chatInputRef={chatInputRef}
          itineraryItems={itineraryItems}
          onRemoveItineraryItem={(index) => setItineraryItems(prev => prev.filter((_, i) => i !== index))}
          onKeyPress={handleKeyPress}
        />
        <MapWIthRoute
          currentMapView={currentMapView}
          selectedCategory={selectedCategory}
          allData={allData}
          showMapDayControls={showMapDayControls}
          currentDayView={currentDayView}
          onToggleMap={toggleMap}
          onShowDayRoute={showDayRoute}
        />
        <SelectionPanel
          selectedCategory={selectedCategory}
          showTimeSelection={showTimeSelection}
          showSearchResults={showSearchResults}
          selectedDay={selectedDay}
          selectedTimeSlot={selectedTimeSlot}
          allData={allData}
          onSelectCategory={selectCategory}
          onSetDay={(d) => setSelectedDay(d)}
          onSetTimeSlot={(s) => setSelectedTimeSlot(s)}
        />
      </div>
    </div>
  );
}
