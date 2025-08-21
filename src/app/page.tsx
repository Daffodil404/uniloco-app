'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import InteractiveMap from '@/components/features/InteractiveMap';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { MapPoint } from '@/types/travel';

export default function SplashPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    // 记录访问状态
    localStorage.setItem('Uniloco-splash-visited', 'true');

    // 模拟加载过程
    const timer1 = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    const timer2 = setTimeout(() => {
      setShowContent(true);
    }, 600);

    // 3秒倒计时
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          // 跳转到主页
          router.push('/h5/home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(countdownTimer);
    };
  }, [router]);

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 70%, rgba(254, 88, 95, 0.1) 85%, rgba(254, 88, 95, 0.3) 100%)'
      }}
    >
      {/* 主要内容容器 - 使用绝对定位 */}
      <div className="absolute left-1/2 -translate-x-1/2 w-full px-8 z-10" style={{ top: '20%' }}>
        <div className="flex flex-col items-center">
          {/* 组合图标 - 使用图片 */}
          <div className={`mb-16 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="flex justify-center">
              <Image
                src="/static/logo.jpeg"
                alt="Uniloco Logo"
                width={320}
                height={320}
                className="w-[80%]"
                priority
              />
            </div>
          </div>

          {/* 主标题 "Uniloco" */}
          <div className={`mb-8 transition-all duration-1000 delay-200 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-[3rem] leading-tight font-[900] text-[#fe585f] tracking-wide drop-shadow-lg">
              Uniloco+
            </div>
          </div>

          {/* 副标题 "Travel with Stories" */}
          <div className={`mb-12 transition-all duration-1000 delay-400 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-[1.2rem] font-[500] text-slate-700 drop-shadow-md">
              Travel with Stories
            </p>
          </div>

          {/* 倒计时 */}
          <div className={`transition-all duration-1000 delay-600 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-[2rem] font-bold text-[#FF9E4A] drop-shadow-lg">
              {countdown}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
