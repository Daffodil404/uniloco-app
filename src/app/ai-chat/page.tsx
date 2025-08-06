'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
  isTyping?: boolean;
}

interface ChatStep {
  id: string;
  question: string;
  options: string[];
  key: string;
}

const chatSteps: ChatStep[] = [
  {
    id: 'destination',
    question: '你想去哪里？',
    options: ['东京', '巴黎', '京都', '威尼斯', '巴厘岛', '圣托里尼', '纽约', '伦敦'],
    key: 'destination'
  },
  {
    id: 'duration',
    question: '你计划几天？',
    options: ['1-3天', '4-7天', '8-14天', '15天以上'],
    key: 'duration'
  },
  {
    id: 'food',
    question: '你喜欢什么美食？',
    options: ['当地特色', '米其林餐厅', '街边小吃', '素食', '海鲜', '甜点'],
    key: 'food'
  },
  {
    id: 'companion',
    question: '你和谁一起旅行？',
    options: ['独自旅行', '情侣', '朋友', '家庭', '团队'],
    key: 'companion'
  },
  {
    id: 'atmosphere',
    question: '你在寻找什么氛围？',
    options: ['浪漫', '历史', '放松', '冒险', '文化', '小众'],
    key: 'atmosphere'
  }
];

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 初始化聊天
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'ai',
      content: '🎯 欢迎来到AI旅行助手！我是你的专属旅行规划师，让我为你创建独一无二的藏宝图之旅！',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    
    // 延迟显示第一个问题
    setTimeout(() => {
      addAIMessage(chatSteps[0].question, chatSteps[0].options);
    }, 1000);
  }, []);

  const addAIMessage = (content: string, options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content,
      timestamp: new Date(),
      options,
      isTyping: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // 模拟打字效果
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, isTyping: false }
            : msg
        )
      );
    }, 1500);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionSelect = (option: string) => {
    const currentStepData = chatSteps[currentStep];
    
    // 添加用户选择的消息
    addUserMessage(option);
    
    // 保存答案
    setUserAnswers(prev => ({
      ...prev,
      [currentStepData.key]: option
    }));
    
    // 延迟显示下一个问题
    setTimeout(() => {
      if (currentStep < chatSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
        const nextStep = chatSteps[currentStep + 1];
        addAIMessage(nextStep.question, nextStep.options);
      } else {
        // 所有问题已回答，开始生成藏宝图
        generateTreasureMap();
      }
    }, 800);
  };

  const generateTreasureMap = () => {
    setIsGenerating(true);
    
    // 添加生成消息
    addAIMessage('🎉 太棒了！基于你的回答，我正在生成专属藏宝图...');
    
    // 模拟生成过程
    setTimeout(() => {
      addAIMessage('🗺️ 你的专属藏宝图已生成！点击发光点位进行打卡，完成旅程获得丰厚奖励！');
      setIsGenerating(false);
      
      // 这里可以跳转到藏宝图页面
      setTimeout(() => {
        // router.push('/treasure-map');
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 顶部导航栏 */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.history.back()}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              ←
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">AI旅行助手</h1>
              <p className="text-xs text-gray-500">创建你的专属藏宝图</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">在线</span>
          </div>
        </div>
      </header>

      {/* 聊天容器 */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* 消息列表 */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  {/* AI头像 */}
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold mb-2">
                      🤖
                    </div>
                  )}
                  
                  {/* 消息气泡 */}
                  <div className={`
                    rounded-2xl px-4 py-3 shadow-sm transition-all duration-300
                    ${message.type === 'ai' 
                      ? 'bg-white/90 backdrop-blur-sm border border-gray-200/50' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    }
                  `}>
                    <div className="text-sm leading-relaxed">
                      {message.isTyping ? (
                        <div className="flex items-center gap-1">
                          <span>正在输入</span>
                          <div className="flex gap-1">
                            <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                  
                  {/* 选项按钮 */}
                  {message.options && !message.isTyping && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(option)}
                          className="w-full text-left px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-white/90 hover:border-purple-300 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-600 animate-slide-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* 用户头像 */}
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold ml-2">
                    👤
                  </div>
                )}
              </div>
            ))}
            
            {/* 生成状态 */}
            {isGenerating && (
              <div className="flex justify-center animate-fade-in">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm border border-gray-200/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">正在生成藏宝图...</p>
                      <p className="text-xs text-gray-500">这可能需要几秒钟</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* 进度指示器 */}
          <div className="px-4 py-3 bg-white/50 backdrop-blur-sm border-t border-gray-200/50">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>进度</span>
              <span>{currentStep + 1} / {chatSteps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / chatSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
} 