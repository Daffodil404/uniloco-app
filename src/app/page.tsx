'use client';

import { useState, useEffect } from 'react';

export default function SplashPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

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

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#64D8EF] to-[#000000] from-10% to-100% relative">
      {/* 主要内容容器 - 使用绝对定位 */}
      <div className="absolute left-1/2 -translate-x-1/2 w-full px-8 z-10" style={{ top: '20%' }}>
        <div className="flex flex-col items-center">
          {/* 组合图标 - 使用图片 */}
          <div className={`mb-16 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="flex justify-center">
              <img
                src="/static/locate.png"
                alt="Location with speech bubble icon"
                className="w-[80%] drop-shadow-2xl"
              />
            </div>
          </div>

          {/* 主标题 "Unilloco" */}
          <div className={`mb-8 transition-all duration-1000 delay-200 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-[3rem] leading-tight font-[900] text-[#F9F7F5] tracking-wide drop-shadow-lg">
              Unilloco+
            </div>
          </div>

          {/* 副标题 "Travel with Stories" */}
          <div className={`mb-24 transition-all duration-1000 delay-400 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-[1.2rem] font-[500] text-[#F9F7F5] drop-shadow-md">
              Travel with Stories
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
