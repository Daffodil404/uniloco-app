'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/Header';

export default function SetupPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Trigger initial load animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleNavigation = (section: string) => {
    setIsAnimating(true);
    setActiveSection(section);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleDownload = () => {
    // 模拟下载动画和触觉反馈
    const button = document.querySelector('.download-btn');
    if (button) {
      button.classList.add('downloading');

      // 模拟触觉反馈
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }

      setTimeout(() => {
        button.classList.remove('downloading');
        alert('Download started! 🚀');
      }, 2000);
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    // 添加触觉反馈
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };

  const setupSteps = [
    {
      number: 1,
      icon: '🔐',
      title: 'Choose Registration',
      description: 'Sign up with Google account or phone number. Double verification for enhanced security and user protection.',
      details: [
        'Google Account Integration',
        'Phone Number Verification',
        'Two-Factor Authentication',
        'Enhanced Security Protocol'
      ]
    },
    {
      number: 2,
      icon: '💼',
      title: 'Select Wallet Type',
      description: 'Connect existing Web3 wallet (MetaMask, WalletConnect) or create seamless custodial wallet for easier onboarding.',
      details: [
        'MetaMask Integration',
        'WalletConnect Support',
        'Custodial Wallet Creation',
        'Easy Onboarding Process'
      ]
    },
    {
      number: 3,
      icon: '🔑',
      title: 'Secure Your Keys',
      description: 'For custodial wallets: platform holds one private key, you keep one private key. Double security protection system.',
      details: [
        'Dual Key System',
        'Private Key Management',
        'Security Verification',
        'Backup & Recovery'
      ]
    },
    {
      number: 4,
      icon: '🎮',
      title: 'Start Gaming',
      description: 'Complete profile setup, choose your starter Travel Band, and begin your travel-to-earn journey with Uniloco ecosystem.',
      details: [
        'Profile Customization',
        'Travel Band Selection',
        'Ecosystem Introduction',
        'First Adventure Setup'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fff] overflow-x-hidden relative">
      {/* Navigation */}
      <Header 
        activeSection={activeSection}
        onNavigation={handleNavigation}
        navItems={['home', 'how-to', 'web3 hub', 'partnership']}
      />

      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[#fff]">
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#2563EB]/10 rounded-full animate-bounce animate-float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-[#2563EB]/15 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-[#2563EB]/20 rounded-full animate-spin"></div>
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#2563EB]/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-[#2563EB]/8 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-[#2563EB]/12 rounded-full animate-spin" style={{ animationDelay: '0.5s' }}></div>

          {/* Particle Effects */}
          <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-[#2563EB]/30 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-[#7C3AED]/40 rounded-full animate-ping" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-[#2563EB]/50 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>

          {/* Geometric Shapes */}
          <div className="absolute top-1/3 left-1/6 w-6 h-6 bg-[#2563EB]/20 rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-[#7C3AED]/25 rounded-full animate-bounce" style={{ animationDelay: '0.7s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
            {/* Left Side - Title */}
            <div className="flex-1 text-left space-y-3 lg:space-y-4 pl-8 lg:pl-12">
              {/* Main Title */}
              <div className="space-y-1 lg:space-y-2">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight">
                  <span className={`block ${isLoaded ? 'slide-in-left' : 'opacity-100'} text-[#2563EB] text-4xl md:text-6xl lg:text-7xl xl:text-8xl`}>Set Up</span>
                  <span className={`block ${isLoaded ? 'slide-in-left-delay' : 'opacity-100'} bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent text-4xl md:text-6xl lg:text-7xl xl:text-8xl`}>Your Account</span>
                </h1>
              </div>

              {/* Subtitle */}
              <h2 className={`text-lg md:text-xl lg:text-2xl text-gray-700 font-light ${isLoaded ? 'slide-in-left-delay-4' : 'opacity-0'}`}>
                🌟 Complete Your Journey Setup in 4 Simple Steps 🌟
              </h2>

              {/* Description */}
              <p className={`text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg ${isLoaded ? 'slide-in-left-delay-5' : 'opacity-0'}`}>
                Get started with Uniloco in minutes. Follow our secure setup process to create your account, 
                connect your wallet, and begin your travel-to-earn adventure.
              </p>

              {/* Action Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? 'slide-in-left-delay-6' : 'opacity-0'}`}>
                <button
                  onClick={() => document.getElementById('setup-steps')?.scrollIntoView({ behavior: 'smooth' })}
                  className="game-button group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold text-base lg:text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="w-5 h-5 lg:w-6 lg:h-6 bg-white/20 rounded-full flex items-center justify-center text-sm lg:text-base">🚀</span>
                    <span>Start Setup</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button
                  onClick={handleDownload}
                  className="game-button download-btn group relative px-6 lg:px-8 py-3 lg:py-4 border-2 border-[#2563EB] text-[#2563EB] font-bold text-base lg:text-lg rounded-full hover:bg-[#2563EB] hover:text-white transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <span>📱</span>
                    <span>Download App</span>
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* All Steps Overview */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 text-5xl opacity-5 animate-pulse">📋</div>
          <div className="absolute bottom-20 right-20 text-5xl opacity-5 animate-pulse" style={{animationDelay: '1s'}}>✅</div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2563EB] mb-6">
              Complete Setup Overview
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              All steps in one view for easy reference
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {setupSteps.map((step, index) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#2563EB] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
                onClick={() => handleStepClick(step.number)}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 bg-[#2563EB] text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-[#2563EB] mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            READY TO START?
          </h2>
          <p className="text-2xl mb-12">
            Download the app and begin your setup journey
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleDownload}
              className="download-btn group bg-white text-[#2563EB] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🍎</span>
              <span>Download on App Store</span>
            </button>

            <button
              onClick={handleDownload}
              className="download-btn group bg-white text-[#2563EB] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🤖</span>
              <span>Get it on Google Play</span>
            </button>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .download-btn.downloading {
          animation: downloading 2s ease-in-out;
        }
        
        @keyframes downloading {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        
        /* Hero Section Animations */
        .slide-in-left {
          animation: slideInLeft 1s ease-out forwards;
          opacity: 0;
          transform: translateX(-100px);
        }
        
        .slide-in-left-delay {
          animation: slideInLeft 1s ease-out 0.2s forwards;
          opacity: 0;
          transform: translateX(-100px);
        }
        
        .slide-in-left-delay-4 {
          animation: slideInLeft 1s ease-out 0.8s forwards;
          opacity: 0;
          transform: translateX(-100px);
        }
        
        .slide-in-left-delay-5 {
          animation: slideInLeft 1s ease-out 1s forwards;
          opacity: 0;
          transform: translateX(-100px);
        }
        
        .slide-in-left-delay-6 {
          animation: slideInLeft 1s ease-out 1.2s forwards;
          opacity: 0;
          transform: translateX(-100px);
        }
        
        .slide-in-right {
          animation: slideInRight 1.2s ease-out 0.5s forwards;
          opacity: 0;
          transform: translateX(100px);
        }
        
        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
