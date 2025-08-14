'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/Header';

export default function Web3HubPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#fe585f]/10 rounded-full animate-bounce animate-float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-[#fe585f]/15 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-[#fe585f]/20 rounded-full animate-spin"></div>
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#fe585f]/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-[#fe585f]/8 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-[#fe585f]/12 rounded-full animate-spin" style={{ animationDelay: '0.5s' }}></div>

          {/* Particle Effects */}
          <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-[#fe585f]/30 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-[#ff7a80]/40 rounded-full animate-ping" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-[#fe585f]/50 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>

          {/* Geometric Shapes */}
          <div className="absolute top-1/3 left-1/6 w-6 h-6 bg-[#fe585f]/20 rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-[#ff7a80]/25 rounded-full animate-bounce" style={{ animationDelay: '0.7s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
            {/* Left Side - Slogan */}
            <div className="flex-1 text-left space-y-3 lg:space-y-4 pl-8 lg:pl-12">
              {/* Main Slogan */}
              <div className="space-y-1 lg:space-y-2">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight">
                  <span className={`block ${isLoaded ? 'slide-in-left' : 'opacity-100'} text-[#fe585f] text-4xl md:text-6xl lg:text-7xl xl:text-8xl`}>Web3</span>
                  <span className={`block ${isLoaded ? 'slide-in-left-delay' : 'opacity-100'} bg-gradient-to-r from-[#fe585f] to-[#ff7a80] bg-clip-text text-transparent text-4xl md:text-6xl lg:text-7xl xl:text-8xl`}>Token Hub</span>
                </h1>
              </div>

              {/* Subtitle */}
              <h2 className={`text-lg md:text-xl lg:text-2xl text-gray-700 font-light ${isLoaded ? 'slide-in-left-delay-4' : 'opacity-0'}`}>
                🌟 Dual-Token Ecosystem for Travel & Governance 🌟
              </h2>

              {/* Description */}
              <p className={`text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg ${isLoaded ? 'slide-in-left-delay-5' : 'opacity-0'}`}>
                Explore UNC utility tokens for travel rewards and ANT governance tokens for platform decisions. 
                Convert between tokens seamlessly and participate in the decentralized travel ecosystem.
              </p>

              {/* Action Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? 'slide-in-left-delay-6' : 'opacity-0'}`}>
                <button
                  onClick={() => document.getElementById('tokens')?.scrollIntoView({ behavior: 'smooth' })}
                  className="game-button group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white font-bold text-base lg:text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="w-5 h-5 lg:w-6 lg:h-6 bg-white/20 rounded-full flex items-center justify-center text-sm lg:text-base">🪙</span>
                    <span>Explore Tokens</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff7a80] to-[#fe585f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button
                  onClick={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}
                  className="game-button group relative px-6 lg:px-8 py-3 lg:py-4 border-2 border-[#fe585f] text-[#fe585f] font-bold text-base lg:text-lg rounded-full hover:bg-[#fe585f] hover:text-white transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <span>🏪</span>
                    <span>Visit Marketplace</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side - Token Stats */}
            <div className={`flex flex-col items-center space-y-4 ${isLoaded ? 'slide-in-right' : 'opacity-0'}`}>
              {/* Token Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                {[
                  { 
                    icon: '🪙',
                    title: 'UNC Token', 
                    desc: 'Unlimited Supply',
                    value: 'Utility & Rewards'
                  },
                  { 
                    icon: '🏛️',
                    title: 'ANT Token', 
                    desc: '1,000,000 Max',
                    value: 'Governance & Staking'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#fe585f] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
                  >
                    <div className="text-4xl mb-3 text-center animate-bounce group-hover:animate-pulse">{item.icon}</div>
                    <h3 className="text-lg font-bold mb-2 text-[#fe585f] text-center">{item.title}</h3>
                    <p className="text-gray-600 text-sm text-center leading-relaxed mb-2">{item.desc}</p>
                    <p className="text-[#fe585f] text-xs text-center font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Small floating elements */}
              <div className="relative">
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#fe585f] rounded-full animate-bounce"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#ff7a80] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Token Economics Section */}
      <section id="tokens" className="py-24 bg-white relative">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-10 animate-pulse">🪙</div>
          <div className="absolute top-20 right-20 text-5xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}>🏛️</div>
          <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}>💰</div>
          <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-pulse" style={{animationDelay: '3s'}}>💎</div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fe585f] mb-6 animate-fade-in">
              🪙 Token Economics
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              Dual-token system designed for sustainable growth and community governance
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* UNC Token Card */}
            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#fe585f] group transform hover:-translate-y-2">
              <div className="text-center mb-8">
                <div className="text-8xl mb-6 animate-bounce group-hover:animate-pulse">🪙</div>
                <h3 className="text-3xl font-bold text-[#fe585f] mb-3">UNC Token</h3>
                <p className="text-gray-500 text-lg">Utility & Rewards Token</p>
              </div>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-[#fe585f] mb-6 text-center">💎 Primary Functions</h4>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    '🎯 Earned through travel check-ins',
                    '💰 Used to upgrade Travel Bands',
                    '🏪 Merchant partnership rewards',
                    '✈️ Convert from airline/hotel points',
                    '🤝 Team collaboration bonuses',
                    '🔄 Convert to ANT for governance rights'
                  ].map((function_, index) => (
                    <div 
                      key={index}
                      className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 border border-transparent hover:border-[#fe585f]/30"
                    >
                      <span className="text-[#fe585f] mr-3 text-lg">•</span>
                      <p className="text-sm text-gray-600 font-medium">{function_}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-[#fe585f]">
                <h4 className="font-bold text-[#fe585f] mb-4 text-lg">📊 Token Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Supply:</span>
                    <span className="font-semibold text-[#fe585f]">Unlimited</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-semibold text-[#fe585f]">Utility/Rewards Token</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distribution:</span>
                    <span className="font-semibold text-[#fe585f]">Travel-to-Earn</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ICO:</span>
                    <span className="font-semibold text-[#fe585f]">No ICO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ANT Token Card */}
            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#fe585f] group transform hover:-translate-y-2">
              <div className="text-center mb-8">
                <div className="text-8xl mb-6 animate-bounce group-hover:animate-pulse">🏛️</div>
                <h3 className="text-3xl font-bold text-[#fe585f] mb-3">ANT Token</h3>
                <p className="text-gray-500 text-lg">Governance & Staking Token</p>
              </div>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-[#fe585f] mb-6 text-center">💎 Governance Rights</h4>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    '🗳️ Vote on platform updates',
                    '📍 Propose new travel destinations',
                    '💎 Access exclusive events',
                    '🎨 Curate featured travel stories',
                    '💰 Revenue sharing proposals',
                    '📈 Staking rewards distribution'
                  ].map((right, index) => (
                    <div 
                      key={index}
                      className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 border border-transparent hover:border-[#fe585f]/30"
                    >
                      <span className="text-[#fe585f] mr-3 text-lg">•</span>
                      <p className="text-sm text-gray-600 font-medium">{right}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-[#fe585f]">
                <h4 className="font-bold text-[#fe585f] mb-4 text-lg">📊 Token Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Max Supply:</span>
                    <span className="font-semibold text-[#fe585f]">1,000,000 ANT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-semibold text-[#fe585f]">Governance/Staking Token</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Staking Rewards:</span>
                    <span className="font-semibold text-[#fe585f]">5-15% APY</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ICO:</span>
                    <span className="font-semibold text-[#fe585f]">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Token Conversion Ecosystem */}
          <div className="bg-gray-50 rounded-3xl p-10 border-2 border-[#fe585f]/20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-[#fe585f] mb-4">🔄 Token Conversion Ecosystem</h3>
              <div className="text-2xl font-bold text-gray-700 mb-4">
                UNC ↔ ANT ↔ USDC
              </div>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                Seamless conversion between utility tokens, governance tokens, and stable currencies. 
                Convert your travel rewards into governance power or real-world value.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-[#fe585f]/20 hover:border-[#fe585f] transition-all duration-300 hover:-translate-y-2">
                <h4 className="text-xl font-bold text-[#fe585f] mb-3 text-center">🪙 UNC → ANT</h4>
                <p className="text-center text-gray-600 mb-2"><strong>1000 UNC = 1 ANT</strong></p>
                <p className="text-center text-gray-500 text-sm">Convert utility tokens to governance power</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#fe585f]/20 hover:border-[#fe585f] transition-all duration-300 hover:-translate-y-2">
                <h4 className="text-xl font-bold text-[#fe585f] mb-3 text-center">🏛️ ANT → USDC</h4>
                <p className="text-center text-gray-600 mb-2"><strong>Market Rate</strong></p>
                <p className="text-center text-gray-500 text-sm">Trade governance tokens for stable value</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#fe585f]/20 hover:border-[#fe585f] transition-all duration-300 hover:-translate-y-2">
                <h4 className="text-xl font-bold text-[#fe585f] mb-3 text-center">💱 UNC → USDC</h4>
                <p className="text-center text-gray-600 mb-2"><strong>Direct Swap</strong></p>
                <p className="text-center text-gray-500 text-sm">Convert travel rewards to stable currency</p>
              </div>
            </div>

            {/* ANT Token ICO Information */}
            <div className="bg-gradient-to-r from-[#fe585f]/10 to-[#ff7a80]/10 rounded-2xl p-8 border-2 border-[#fe585f]/30">
              <h4 className="text-2xl font-bold text-[#fe585f] mb-6 text-center">🚀 ANT Token ICO Information</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">ICO Price</p>
                  <p className="text-[#fe585f] font-bold text-xl">$0.10 per ANT</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">Total Supply</p>
                  <p className="text-[#fe585f] font-bold text-xl">1,000,000 ANT</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">ICO Allocation</p>
                  <p className="text-[#fe585f] font-bold text-xl">40% (400,000 ANT)</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">Min Staking</p>
                  <p className="text-[#fe585f] font-bold text-xl">100 ANT</p>
                </div>
              </div>
              
              <div className="text-center">
                <button className="bg-[#fe585f] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#ff7a80] transition-all duration-300 transform hover:scale-105 mr-4">
                  🎯 Join ANT ICO
                </button>
                <button className="bg-transparent border-2 border-[#fe585f] text-[#fe585f] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#fe585f] hover:text-white transition-all duration-300 transform hover:scale-105">
                  📊 View Tokenomics
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Download Section */}
      <section className="py-20 bg-gradient-to-br from-[#fe585f] to-[#ff7a80] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            DOWNLOAD NOW
          </h2>
          <p className="text-2xl mb-12">
            Start your travel-to-earn adventure today
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleDownload}
              className="download-btn group bg-white text-[#fe585f] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🍎</span>
              <span>Download on App Store</span>
            </button>

            <button
              onClick={handleDownload}
              className="download-btn group bg-white text-[#fe585f] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
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
        
        .animate-fade-in:nth-child(2) {
          animation-delay: 0.3s;
        }
        
        .animate-fade-in:nth-child(3) {
          animation-delay: 0.6s;
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
