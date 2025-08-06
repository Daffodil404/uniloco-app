'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // 记录访问状态
    localStorage.setItem('uniloco-splash-visited', 'true');
    
    // 模拟加载过程
    const timer1 = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    const timer2 = setTimeout(() => {
      setShowContent(true);
    }, 600);

    // 进度条动画
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(progressInterval);
    };
  }, []);

  const handleEnterApp = () => {
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
      {/* 动态背景 */}
      <div className="absolute inset-0">
        {/* 星空效果 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse"></div>
        
        {/* 浮动光球 */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float opacity-60 blur-sm"></div>
        <div className="absolute top-3/4 right-1/4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float opacity-60 blur-sm" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-float opacity-60 blur-sm" style={{ animationDelay: '3s' }}></div>
        
        {/* 渐变光效 */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse"></div>
        
        {/* 动态波浪 */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 text-center px-8 max-w-sm mx-auto">
        {/* Logo 容器 */}
        <div className={`mb-12 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="w-32 h-32 bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/30 shadow-2xl relative overflow-hidden">
            {/* Logo 背景光效 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
            <span className="text-6xl relative z-10 animate-bounce" style={{ animationDuration: '2s' }}>🧭</span>
          </div>
        </div>

        {/* 品牌名称 - 艺术字体效果 */}
        <div className={`mb-8 transition-all duration-1000 delay-200 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-6xl font-black mb-4 tracking-tight relative">
            <span className="artistic-text-glow">
              UniLoco
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mx-auto shadow-lg"></div>
        </div>

        {/* 主 Slogan */}
        <div className={`mb-8 transition-all duration-1000 delay-400 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-3xl font-bold text-white mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 drop-shadow-lg">
              Every Journey
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 drop-shadow-lg">
              Tells a Story
            </span>
          </p>
          <p className="text-base text-white/90 font-medium leading-relaxed">
            AI-powered travel adventures that transform your experiences into unforgettable stories
          </p>
        </div>

        {/* 进度条 */}
        <div className={`mb-8 transition-all duration-1000 delay-600 ease-out ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full bg-white/20 rounded-full h-3 mb-4 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-white/70 font-medium">
            Preparing your adventure... {progress}%
          </p>
        </div>

        {/* 特色标签 */}
        <div className={`transition-all duration-1000 delay-800 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-5 py-3 bg-gradient-to-r from-blue-500/40 to-purple-500/40 backdrop-blur-sm rounded-full text-sm font-bold text-white border border-white/30 shadow-lg">
              🤖 AI-Powered
            </span>
            <span className="px-5 py-3 bg-gradient-to-r from-purple-500/40 to-pink-500/40 backdrop-blur-sm rounded-full text-sm font-bold text-white border border-white/30 shadow-lg">
              🎮 Gamified
            </span>
            <span className="px-5 py-3 bg-gradient-to-r from-pink-500/40 to-red-500/40 backdrop-blur-sm rounded-full text-sm font-bold text-white border border-white/30 shadow-lg">
              🌐 Web3 Ready
            </span>
          </div>
        </div>

        {/* 手动进入按钮 */}
        <div className={`mt-8 transition-all duration-1000 delay-1000 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={handleEnterApp}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/30 backdrop-blur-sm"
          >
            🚀 Enter Adventure
          </button>
        </div>
      </div>

      {/* 底部版权信息 */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <div className={`transition-all duration-1000 delay-1200 ease-out ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs text-white/50 font-light">
            © 2024 UniLoco. Crafting digital adventures.
          </p>
        </div>
      </div>

      {/* 版本信息 */}
      <div className="absolute top-8 left-6">
        <span className="text-xs text-white/40 font-light">v1.0.0</span>
      </div>
    </div>
  );
}
