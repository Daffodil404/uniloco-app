'use client';

import { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import CitySearch from '@/components/ui/CitySearch';
import DurationSlider from '@/components/ui/DurationSlider';
import { useSearchParams } from 'next/navigation';

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: string[];
  key: string;
  type?: 'city-search' | 'duration-slider' | 'default';
}

const questions: Question[] = [
  {
    id: 'destination',
    title: 'Where do you want to go?',
    subtitle: 'Choose a destination that excites you',
    options: ['Tokyo', 'Paris', 'Kyoto', 'Venice', 'Bali', 'Santorini', 'New York', 'London'],
    key: 'destination',
    type: 'city-search'
  },
  {
    id: 'duration',
    title: 'How many days do you plan?',
    subtitle: 'Plan your itinerary based on time',
    options: ['1-3 days', '4-7 days', '8-14 days', '15+ days'],
    key: 'duration',
    type: 'duration-slider'
  },
  {
    id: 'food',
    title: 'What cuisine do you prefer?',
    subtitle: 'Food is an essential part of travel',
    options: ['Local specialties', 'Michelin restaurants', 'Street food', 'Vegetarian', 'Seafood', 'Desserts'],
    key: 'food'
  },
  {
    id: 'companion',
    title: 'Who are you traveling with?',
    subtitle: 'Different companions need different arrangements',
    options: ['Solo travel', 'Couple', 'Friends', 'Family', 'Group'],
    key: 'companion'
  },
  {
    id: 'atmosphere',
    title: 'What atmosphere are you seeking?',
    subtitle: 'Choose your desired travel experience',
    options: ['Romantic', 'Historical', 'Relaxing', 'Adventure', 'Cultural', 'Offbeat'],
    key: 'atmosphere'
  }
];

function AIChatContent() {
  const searchParams = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedCity, setSelectedCity] = useState<{ id: string; name: string; country: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  // 初始化用户选择
  useEffect(() => {
    const startIndex = parseInt(searchParams.get('startIndex') || '0');
    setCurrentIndex(startIndex);
    
    // 从URL参数恢复用户选择
    const destination = searchParams.get('destination');
    const duration = searchParams.get('duration');
    const food = searchParams.get('food');
    const companion = searchParams.get('companion');
    const atmosphere = searchParams.get('atmosphere');
    
    const savedAnswers: Record<string, string> = {};
    if (destination) savedAnswers.destination = destination;
    if (duration) savedAnswers.duration = duration;
    if (food) savedAnswers.food = food;
    if (companion) savedAnswers.companion = companion;
    if (atmosphere) savedAnswers.atmosphere = atmosphere;
    
    setAnswers(savedAnswers);
  }, [searchParams]);

  // 清除自动跳转定时器
  const clearAutoAdvanceTimer = useCallback(() => {
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
  }, [autoAdvanceTimer]);

  // 通用自动跳转函数
  const autoAdvance = (delay: number = 1500) => {
    clearAutoAdvanceTimer();
    
    const timer = setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setSlideDirection('left');
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setSlideDirection(null);
        }, 300);
      } else {
        // 所有问题已回答，开始生成
        generatePlan();
      }
    }, delay);
    
    setAutoAdvanceTimer(timer);
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      clearAutoAdvanceTimer();
    };
  }, [clearAutoAdvanceTimer]);

  const handleOptionSelect = (option: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.key]: option
    }));

    // 添加选择动画和自动跳转
    autoAdvance();
  };

  const handleCitySelect = (city: { id: string; name: string; country: string }) => {
    setSelectedCity(city);
    setAnswers(prev => ({
      ...prev,
      destination: city.name
    }));

    // 城市选择后延迟跳转
    autoAdvance(2000); // 给用户更多时间查看选择结果
  };

  const handleDurationSelect = (duration: { min: number; max: number; label: string }) => {
    setAnswers(prev => ({
      ...prev,
      duration: duration.label
    }));

    // 滑块选择后延迟跳转，给用户时间调整
    autoAdvance(1500); // 减少延迟时间，让跳转更快
  };

  const handlePrevious = () => {
    clearAutoAdvanceTimer(); // 清除自动跳转
    
    if (currentIndex > 0) {
      setSlideDirection('right');
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setSlideDirection(null);
      }, 300);
    }
  };

  const generatePlan = () => {
    setIsGenerating(true);
    // 这里可以添加生成逻辑
    setTimeout(() => {
      setIsGenerating(false);
      // 跳转到结果页面，并传递用户选择
      const params = new URLSearchParams();
      params.set('destination', answers.destination || 'Tokyo');
      params.set('duration', answers.duration || '4-7 days');
      params.set('food', answers.food || 'Local specialties');
      params.set('companion', answers.companion || 'Solo travel');
      params.set('atmosphere', answers.atmosphere || 'Cultural');
      
      window.location.href = `/travel-plan?${params.toString()}`;
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 relative z-10">
      {/* 顶部导航 */}
      <header className="bg-gradient-to-r from-[#fe585f] to-[#ff7a80] relative z-20 px-6 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="text-white hover:text-white/80 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white">AI Travel Planner</h1>
            <p className="text-xs text-white/80">Create your personalized journey</p>
          </div>
        </div>
      </header>

      {/* 进度条 */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between text-slate-600 text-sm mb-3">
          <span>Progress</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#fe585f] to-[#ff7a80] h-2 rounded-full transition-all duration-700 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 问题卡片容器 */}
      <div className="flex-1 px-6 relative">
        <div 
          ref={containerRef}
          className={`transition-all duration-300 ease-out ${
            slideDirection === 'left' ? 'translate-x-[-100%]' : 
            slideDirection === 'right' ? 'translate-x-[100%]' : 'translate-x-0'
          }`}
        >
          {/* 问题卡片 */}
          <div className="bg-white shadow-lg rounded-3xl p-6 border border-slate-200 min-h-[520px] flex flex-col">
            {/* 问题序号 */}
            <div className="flex items-center justify-center mb-6">
              <div className="px-4 py-2 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] rounded-full">
                <span className="text-white font-bold text-lg">{currentIndex + 1} / {questions.length}</span>
              </div>
            </div>

            <div className="text-center mb-8 flex-1 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                {currentQuestion.title}
              </h2>
              <p className="text-slate-600 text-sm">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* 选项内容 */}
            <div className="mt-auto">
              {currentQuestion.type === 'city-search' ? (
                <CitySearch 
                  onSelect={handleCitySelect}
                  selectedCity={answers.destination ? { id: '1', name: answers.destination, country: '' } : selectedCity || undefined}
                />
              ) : currentQuestion.type === 'duration-slider' ? (
                <DurationSlider
                  onSelect={handleDurationSelect}
                  selectedRange={answers.duration ? { min: 0, max: 0, label: answers.duration } : undefined}
                />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className={`
                        relative p-6 rounded-2xl text-left transition-all duration-200
                        ${answers[currentQuestion.key] === option
                          ? 'bg-gradient-to-r from-[#fe585f]/10 to-[#ff7a80]/10 border-2 border-[#fe585f] text-slate-800 shadow-lg'
                          : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }
                      `}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="text-base font-medium">{option}</span>
                      {answers[currentQuestion.key] === option && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-[#fe585f] rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`
              px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-200
              ${currentIndex === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }
            `}
          >
            Previous
          </button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-[#fe585f]' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          <div className="w-20"></div>
        </div>
      </div>

      {/* 生成状态覆盖层 */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded-3xl p-8 border border-slate-200 text-center">
            <div className="w-16 h-16 border-4 border-slate-300 border-t-[#fe585f] rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Generating Travel Plan</h3>
            <p className="text-slate-600">AI is creating your personalized journey...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AIChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-300 border-t-[#fe585f] rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Loading...</h3>
          <p className="text-slate-600">Preparing AI chat interface</p>
        </div>
      </div>
    }>
      <AIChatContent />
    </Suspense>
  );
} 