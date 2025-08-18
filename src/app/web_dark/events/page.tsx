'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/Header';

export default function EventsPage() {
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
            {/* Left Side - Slogan */}
            <div className="flex-1 text-left space-y-3 lg:space-y-4 pl-8 lg:pl-12">
              {/* Main Slogan */}
              <div className="space-y-1 lg:space-y-2">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight">
                  <span className={`block ${isLoaded ? 'slide-in-left' : 'opacity-100'} text-[#2563EB] text-4xl md:text-6xl lg:text-7xl xl:text-8xl`}>Featured</span>
                  <span className={`block ${isLoaded ? 'slide-in-left-delay' : 'opacity-100'} bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent text-4xl md:text-6xl lg:text-7xl xl:text-8xl`}>Events</span>
                </h1>
              </div>

              {/* Subtitle */}
              <h2 className={`text-lg md:text-xl lg:text-2xl text-gray-700 font-light ${isLoaded ? 'slide-in-left-delay-4' : 'opacity-0'}`}>
                🌟 Join Epic Travel Adventures & Earn Rewards 🌟
              </h2>

              {/* Description */}
              <p className={`text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg ${isLoaded ? 'slide-in-left-delay-5' : 'opacity-0'}`}>
                Discover unique blockchain travel events, participate in digital treasure hunts, 
                and earn exclusive NFTs and UNC tokens while exploring the world.
              </p>

              {/* Action Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? 'slide-in-left-delay-6' : 'opacity-0'}`}>
                <button
                  onClick={() => document.getElementById('main-event')?.scrollIntoView({ behavior: 'smooth' })}
                  className="game-button group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold text-base lg:text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="w-5 h-5 lg:w-6 lg:h-6 bg-white/20 rounded-full flex items-center justify-center text-sm lg:text-base">🍄</span>
                    <span>Join Adventure</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button
                  onClick={() => document.getElementById('upcoming')?.scrollIntoView({ behavior: 'smooth' })}
                  className="game-button group relative px-6 lg:px-8 py-3 lg:py-4 border-2 border-[#2563EB] text-[#2563EB] font-bold text-base lg:text-lg rounded-full hover:bg-[#2563EB] hover:text-white transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <span>📅</span>
                    <span>View All Events</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side - Event Stats */}
            <div className={`flex flex-col items-center space-y-4 ${isLoaded ? 'slide-in-right' : 'opacity-0'}`}>
              {/* Event Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                {[
                  { 
                    icon: '🎯',
                    title: 'Active Events', 
                    desc: '3 Upcoming',
                    value: 'Join Now'
                  },
                  { 
                    icon: '🌍',
                    title: 'Global Reach', 
                    desc: '15 Countries',
                    value: 'Worldwide'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#2563EB] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
                  >
                    <div className="text-4xl mb-3 text-center animate-bounce group-hover:animate-pulse">{item.icon}</div>
                    <h3 className="text-lg font-bold mb-2 text-[#2563EB] text-center">{item.title}</h3>
                    <p className="text-gray-600 text-sm text-center leading-relaxed mb-2">{item.desc}</p>
                    <p className="text-[#2563EB] text-xs text-center font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Small floating elements */}
              <div className="relative">
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#2563EB] rounded-full animate-bounce"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Event Section */}
      <section id="main-event" className="py-24 bg-white text-gray-800 relative">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-5 animate-pulse">🍄</div>
          <div className="absolute top-20 right-20 text-5xl opacity-5 animate-pulse" style={{animationDelay: '1s'}}>🌲</div>
          <div className="absolute bottom-20 left-20 text-5xl opacity-5 animate-pulse" style={{animationDelay: '2s'}}>🗺️</div>
          <div className="absolute bottom-10 right-10 text-6xl opacity-5 animate-pulse" style={{animationDelay: '3s'}}>🏆</div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2563EB] mb-6 animate-fade-in">
              🍄 Luxembourg Forest Mushroom Hunt 2025
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              Hidden in the mysterious forests of Luxembourg, various rare mushrooms await discovery by explorers. 
              This special blockchain travel event will lead participants deep into the forest depths, recording 
              every mushroom discovery point through our 3D check-in system.
            </p>
          </div>
          
                     <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
             {/* Event Details Grid */}
             {[
               {
                 icon: '📍',
                 title: 'Location',
                 main: 'Luxembourg National Forest Parks',
                 sub: 'Mullerthal Trail & Grünewald Forest'
               },
               {
                 icon: '📅',
                 title: 'Duration',
                 main: 'September 15-17, 2025',
                 sub: '3-day 2-night adventure journey'
               },
               {
                 icon: '🎯',
                 title: 'Goal',
                 main: 'Discover 15 mushroom species',
                 sub: 'Including rare Chanterelle and Porcini'
               },
               {
                 icon: '🏆',
                 title: 'Rewards',
                 main: 'Rare NFT + 1000 UNC',
                 sub: '+ Exclusive "Mushroom Hunter" title'
               }
             ].map((detail, index) => (
               <div 
                 key={index}
                 className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#2563EB] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
               >
                 <div className="text-3xl mb-4">{detail.icon}</div>
                 <h3 className="text-xl font-bold mb-3 text-[#2563EB]">{detail.title}</h3>
                 <p className="text-lg mb-2 text-gray-800">{detail.main}</p>
                 <p className="text-gray-600 text-sm">{detail.sub}</p>
               </div>
             ))}
           </div>

                     {/* Detailed Route Information */}
           <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 mb-16">
             <h3 className="text-2xl font-bold mb-8 text-center text-[#2563EB]">🗺️ Detailed Route: Mullerthal Trail & Grünewald Forest</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 {
                   day: 'Day 1: Mullerthal Trail',
                   items: [
                     'Start: Echternach (9:00 AM)',
                     'Gorge du Loup - Golden Chanterelles',
                     'Schiessentümpel Waterfall - Oyster Mushrooms',
                     'Hohllay Cave - Hidden Porcini spots',
                     'End: Berdorf village (5:00 PM)'
                   ]
                 },
                 {
                   day: 'Day 2: Grünewald Forest',
                   items: [
                     'Start: Luxembourg City (8:30 AM)',
                     'Bambësch Forest - Shiitake varieties',
                     'Kockelscheuer - Morel mushrooms',
                     'Hesperange Woods - Button mushrooms',
                     'End: Hesperange (6:00 PM)'
                   ]
                 },
                 {
                   day: 'Day 3: Expert Hunt',
                   items: [
                     'Start: Secret locations (7:00 AM)',
                     'Advanced foraging techniques',
                     'Rare species identification',
                     'Final challenge checkpoints',
                     'Victory ceremony (4:00 PM)'
                   ]
                 }
               ].map((day, index) => (
                 <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#2563EB] transition-all duration-300 hover:shadow-lg">
                   <h4 className="text-xl font-bold mb-4 text-[#2563EB]">{day.day}</h4>
                   <ul className="space-y-3">
                     {day.items.map((item, i) => (
                       <li key={i} className="text-gray-700 text-sm flex items-start">
                         <span className="text-[#2563EB] mr-2 mt-1">•</span>
                         {item}
                       </li>
                     ))}
                   </ul>
                 </div>
               ))}
             </div>
           </div>

                     {/* Event Highlights */}
           <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 mb-16">
             <h3 className="text-2xl font-bold mb-8 text-center text-[#2563EB]">🌟 Event Highlights</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { icon: '🗺️', text: '3D AR Mushroom Navigation' },
                 { icon: '👥', text: 'Expert Mycologist Guidance' },
                 { icon: '📱', text: 'Real-time Team Leaderboard' },
                 { icon: '🍽️', text: 'Forest Picnic Experience' },
                 { icon: '🏕️', text: 'Eco-friendly Accommodation' },
                 { icon: '🎁', text: 'Daily Surprise Rewards' }
               ].map((highlight, index) => (
                 <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:border-[#2563EB] transition-all duration-300 hover:shadow-md">
                   <div className="w-12 h-12 bg-[#2563EB]/10 rounded-full flex items-center justify-center text-xl">
                     {highlight.icon}
                   </div>
                   <span className="font-medium text-gray-800">{highlight.text}</span>
                 </div>
               ))}
             </div>
           </div>

                     {/* Registration Section */}
           <div className="text-center">
             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
               <button className="bg-[#2563EB] text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-[#7C3AED] transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                 🚀 Join Adventure
               </button>
               <button className="bg-transparent border-2 border-[#2563EB] text-[#2563EB] px-8 py-4 rounded-full text-xl font-bold hover:bg-[#2563EB] hover:text-white transition-all duration-300 flex items-center gap-3">
                 📋 View Details
               </button>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-600">
               <div className="text-center">
                 <p className="text-lg font-semibold">💰 Entry Fee: 50 UNC</p>
               </div>
               <div className="text-center">
                 <p className="text-lg font-semibold">👥 Spots Remaining: 23/100</p>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Event Statistics Section */}
      <section className="py-24 bg-white relative">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 text-5xl opacity-5 animate-pulse">📊</div>
          <div className="absolute bottom-20 right-20 text-5xl opacity-5 animate-pulse" style={{animationDelay: '1s'}}>🌍</div>
          <div className="absolute top-1/2 left-10 text-4xl opacity-5 animate-pulse" style={{animationDelay: '2s'}}>👥</div>
          <div className="absolute top-1/2 right-10 text-4xl opacity-5 animate-pulse" style={{animationDelay: '3s'}}>⏰</div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-3xl p-8 border-2 border-[#2563EB]/20">
              <h3 className="text-2xl font-bold text-[#2563EB] mb-8 text-center">Event Statistics</h3>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-semibold">Registration Progress</span>
                  <span className="text-[#2563EB] font-bold text-xl">77%</span>
                </div>
                <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] h-full rounded-full transition-all duration-1000" style={{width: '77%'}}></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { number: '77', label: 'Registered Participants' },
                  { number: '15', label: 'Countries Represented' },
                  { number: '12', label: 'Days Countdown' }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#2563EB] transition-all duration-300">
                    <p className="text-3xl font-bold text-[#2563EB] mb-2">{stat.number}</p>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Participants */}
              <div className="border-t border-gray-200 pt-8">
                <h4 className="text-lg font-bold text-[#2563EB] mb-4 text-center">Recent Participants</h4>
                <div className="flex justify-center gap-2 mb-4">
                  {['🌍', '🗺️', '🎯', '⭐'].map((emoji, index) => (
                    <div key={index} className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center text-lg text-white">
                      {emoji}
                    </div>
                  ))}
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-sm text-gray-600 font-bold">
                    +73
                  </div>
                </div>
                <p className="text-center text-gray-600 text-sm">Adventurers from Germany, France, Belgium and more</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Adventures Section */}
      <section id="upcoming" className="py-24 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white relative">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-10 animate-pulse">🏰</div>
          <div className="absolute top-20 right-20 text-5xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}>🍷</div>
          <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}>❄️</div>
          <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-pulse" style={{animationDelay: '3s'}}>🎯</div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Upcoming Adventures
            </h2>
            <p className="text-white/90 text-xl leading-relaxed">
              Discover our exciting lineup of blockchain travel events for 2025
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏰',
                title: 'German Castle Mystery Tour',
                date: 'October 2025',
                description: 'Explore Bavaria\'s mysterious castles and collect medieval NFT badges',
                gradient: 'from-purple-400 to-purple-600'
              },
              {
                icon: '🍷',
                title: 'French Vineyard Tasting Route',
                date: 'November 2025',
                description: 'Deep dive into Champagne region, taste the perfect blend of history and tradition',
                gradient: 'from-red-400 to-red-600'
              },
              {
                icon: '❄️',
                title: 'Swiss Winter Fantasy Adventure',
                date: 'December 2025',
                description: 'Alps snow mountain hiking, experience the pure beauty of the ice and snow world',
                gradient: 'from-blue-400 to-blue-600'
              }
            ].map((event, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-4 group"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${event.gradient} rounded-full flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {event.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-center">{event.title}</h3>
                <p className="text-white/70 text-center mb-4">{event.date}</p>
                <p className="text-white/80 text-center mb-6 leading-relaxed">{event.description}</p>
                
                <button className="w-full bg-white/20 text-white border border-white/30 px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#2563EB] transition-all duration-300 transform hover:scale-105">
                  Get Notified
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white">
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
