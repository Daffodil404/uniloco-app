'use client';

import { useState, useEffect, useRef } from 'react';

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: string[];
  key: string;
}

const questions: Question[] = [
  {
    id: 'destination',
    title: '你想去哪里？',
    subtitle: '选择一个让你心动的地方',
    options: ['东京', '巴黎', '京都', '威尼斯', '巴厘岛', '圣托里尼', '纽约', '伦敦'],
    key: 'destination'
  },
  {
    id: 'duration',
    title: '你计划几天？',
    subtitle: '根据时间安排行程',
    options: ['1-3天', '4-7天', '8-14天', '15天以上'],
    key: 'duration'
  },
  {
    id: 'food',
    title: '你喜欢什么美食？',
    subtitle: '美食是旅行的重要部分',
    options: ['当地特色', '米其林餐厅', '街边小吃', '素食', '海鲜', '甜点'],
    key: 'food'
  },
  {
    id: 'companion',
    title: '你和谁一起旅行？',
    subtitle: '不同的旅伴需要不同的安排',
    options: ['独自旅行', '情侣', '朋友', '家庭', '团队'],
    key: 'companion'
  },
  {
    id: 'atmosphere',
    title: '你在寻找什么氛围？',
    subtitle: '选择你想要的旅行体验',
    options: ['浪漫', '历史', '放松', '冒险', '文化', '小众'],
    key: 'atmosphere'
  }
];

export default function AIChatPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (option: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.key]: option
    }));

    // 添加选择动画
    setTimeout(() => {
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
    }, 200);
  };

  const handlePrevious = () => {
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
      // 跳转到结果页面
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#64D8EF] to-[#000000] from-10% to-100%">
      {/* 顶部导航 */}
      <header className="relative z-20 px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => window.history.back()}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            ←
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-white">AI行程规划</h1>
            <p className="text-xs text-white/80">创建专属旅行计划</p>
          </div>
          <div className="w-10 h-10"></div>
        </div>
      </header>

      {/* 进度条 */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between text-white/80 text-sm mb-2">
          <span>进度</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-1">
          <div 
            className="bg-white h-1 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

             {/* 问题卡片容器 */}
       <div className="flex-1 px-6 relative overflow-hidden">
         <div 
           ref={containerRef}
           className={`transition-all duration-300 ease-out ${
             slideDirection === 'left' ? 'translate-x-[-100%]' : 
             slideDirection === 'right' ? 'translate-x-[100%]' : 'translate-x-0'
           }`}
         >
           {/* 问题卡片 */}
           <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
             {/* 问题序号 */}
             <div className="flex items-center justify-center mb-6">
               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                 <span className="text-white font-bold text-lg">{currentIndex + 1}</span>
               </div>
             </div>

             <div className="text-center mb-8">
               <h2 className="text-2xl font-bold text-white mb-2">
                 {currentQuestion.title}
               </h2>
               <p className="text-white/80 text-sm">
                 {currentQuestion.subtitle}
               </p>
             </div>

             {/* 选项网格 */}
             <div className="grid grid-cols-2 gap-4">
               {currentQuestion.options.map((option, index) => (
                 <button
                   key={option}
                   onClick={() => handleOptionSelect(option)}
                   className={`
                     relative p-4 rounded-2xl text-left transition-all duration-200
                     ${answers[currentQuestion.key] === option
                       ? 'bg-white/30 border-2 border-white text-white'
                       : 'bg-white/10 border border-white/20 text-white/90 hover:bg-white/20'
                     }
                   `}
                   style={{ animationDelay: `${index * 0.1}s` }}
                 >
                   <span className="text-sm font-medium">{option}</span>
                   {answers[currentQuestion.key] === option && (
                     <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                       <div className="w-2 h-2 bg-[#64D8EF] rounded-full"></div>
                     </div>
                   )}
                 </button>
               ))}
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
                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30'
              }
            `}
          >
            上一题
          </button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
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
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-white mb-2">正在生成行程</h3>
            <p className="text-white/80">AI正在为你创建专属旅行计划...</p>
          </div>
        </div>
      )}
    </div>
  );
} 