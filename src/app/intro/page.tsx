'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IntroPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // 模拟加载完成
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      
      // 添加点击音效（模拟）
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.volume = 0.1;
      audio.play().catch(() => {}); // 忽略可能的错误
      
      setTimeout(() => {
        button.classList.remove('downloading');
        alert('Download started! 🚀');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100 overflow-x-hidden relative">
      {/* Mouse Follow Effect */}
      <div 
        className="fixed w-4 h-4 bg-[#fe585f]/30 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div 
        className="fixed w-8 h-8 bg-[#fe585f]/20 rounded-full pointer-events-none z-50 transition-transform duration-200 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#fe585f] to-[#ff7a80] z-[100] flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
            <h1 className="text-4xl font-bold mb-4 animate-pulse">Uniloco</h1>
            <p className="text-xl opacity-80">Loading your adventure...</p>
            <div className="mt-8 flex justify-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-red-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#fe585f] to-[#ff7a80] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse">
                ✈️
              </div>
              <span className="text-2xl font-bold text-[#fe585f]">Uniloco</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'how-to', 'marketplace', 'tokens', 'events', 'whitepaper'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavigation(item)}
                  className={`text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-110 ${
                    activeSection === item 
                      ? 'text-[#fe585f] border-b-2 border-[#fe585f]' 
                      : 'text-gray-600 hover:text-[#fe585f]'
                  }`}
                >
                  {item.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {activeSection === 'home' && (
        <section className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50 to-red-100">
            <div className="absolute top-20 left-20 w-32 h-32 bg-[#fe585f]/10 rounded-full animate-bounce animate-float"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-[#fe585f]/15 rounded-full animate-pulse"></div>
            <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-[#fe585f]/20 rounded-full animate-spin"></div>
            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#fe585f]/5 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-[#fe585f]/8 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-[#fe585f]/12 rounded-full animate-spin" style={{animationDelay: '0.5s'}}></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-black text-[#fe585f] mb-6 leading-tight animate-fade-in">
              Own Your <span className="bg-gradient-to-r from-[#fe585f] to-[#ff7a80] bg-clip-text text-transparent">Journey</span>
              <br />
              Earn Your Adventures
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-gray-700 mb-8 font-light">
              Your Ultimate Travel App
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Building the world's first decentralized travel ecosystem, powered by AI-driven personalization to craft unique adventures and unlock multiple earning streams.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                             <button
                 onClick={() => handleNavigation('how-to')}
                 className="game-button group relative px-8 py-4 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
               >
                <span className="relative z-10 flex items-center space-x-2">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">✈️</span>
                  <span>How to Start</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff7a80] to-[#fe585f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
                             <button
                 onClick={handleDownload}
                 className="game-button download-btn group relative px-8 py-4 border-2 border-[#fe585f] text-[#fe585f] font-bold text-lg rounded-full hover:bg-[#fe585f] hover:text-white transform hover:scale-105 transition-all duration-300"
               >
                <span className="flex items-center space-x-2">
                  <span>📱</span>
                  <span>Download Now</span>
                </span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {activeSection === 'home' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#fe585f] mb-16">
              Your Ultimate Travel Experience
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🤖',
                  title: 'AI-Powered Planning',
                  description: 'Intelligent AI creates personalized travel routes and discovers unique travel experiences tailored to your preferences.'
                },
                {
                  icon: '📝',
                  title: 'Create Travel Stories',
                  description: 'Create your exclusive travel stories, design 3D check-in routes, and earn UNC rewards when others follow your paths.'
                },
                {
                  icon: '👥',
                  title: 'Social Travel',
                  description: 'Team up for check-ins, collaborate on content creation, and share your exciting journeys with global travelers.'
                },
                {
                  icon: '🏪',
                  title: 'Merchant Partnership',
                  description: 'Partner with local merchants, co-design routes, and earn UNC token rewards through collaborative partnerships.'
                },
                {
                  icon: '✈️',
                  title: 'Points Exchange',
                  description: 'Easily convert airline miles and hotel points into UNC tokens for seamless travel rewards integration.'
                },
                {
                  icon: '💰',
                  title: 'Earn While Travel',
                  description: 'Earn UNC rewards with every check-in. Turn your travel adventures into a rewarding mining experience.'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border border-red-200 hover:border-[#fe585f] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#fe585f] to-[#ff7a80] rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#fe585f] mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Section */}
      {activeSection === 'home' && (
        <section className="py-20 bg-gradient-to-br from-red-50 to-red-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fe585f] mb-8">
              Watch How Uniloco Works
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Discover the revolutionary travel-to-earn ecosystem in action
            </p>
            
            <div className="relative group cursor-pointer">
              <div className="w-full h-96 bg-gradient-to-br from-[#fe585f] to-[#ff7a80] rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 flex items-center justify-center">
                <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                  ▶️
                </div>
              </div>
              <p className="text-gray-600 mt-4 italic">
                See AI personalization, 3D travel stories, NFT bands, and UNC earning in action
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Travel Bands Section */}
      {activeSection === 'home' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#fe585f] mb-4">
              Travel Band NFTs
            </h2>
            <p className="text-xl text-gray-600 text-center mb-16">
              Using UNC/ANT, level up your Travel Band and unlock greater rewards
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🤍',
                  name: 'Basic Band',
                  price: 'Free to Get',
                  boost: '+10%',
                  action: 'Free Mint',
                  gradient: 'from-gray-200 to-gray-300'
                },
                {
                  icon: '💙',
                  name: 'Rare Band',
                  price: '100 UNC',
                  boost: '+25%',
                  action: 'Mint Now',
                  gradient: 'from-blue-400 to-blue-600'
                },
                {
                  icon: '🧡',
                  name: 'Epic Band',
                  price: '500 UNC',
                  boost: '+50%',
                  action: 'Mint Now',
                  gradient: 'from-orange-400 to-orange-600'
                },
                {
                  icon: '❤️',
                  name: 'Legendary Band',
                  price: 'Rare Drop',
                  boost: '+100%',
                  action: 'Coming Soon',
                  gradient: 'from-red-500 to-red-700'
                }
              ].map((band, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#fe585f] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center"
                >
                  <div className={`w-32 h-32 bg-gradient-to-br ${band.gradient} rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                    {band.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{band.name}</h3>
                  <p className="text-[#fe585f] font-semibold mb-2">{band.price}</p>
                  <p className="text-gray-600 mb-6">Base UNC Boost {band.boost}</p>
                  <button className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${
                    band.action === 'Coming Soon'
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-[#fe585f] text-white hover:bg-[#ff7a80] hover:scale-105'
                  }`}>
                    {band.action}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <p className="text-xl text-gray-600 mb-8">
                Choose your Travel Band to start earning UNC tokens through your adventures
              </p>
              
              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 border border-red-200 hover:border-[#fe585f] transition-all duration-300 hover:shadow-lg">
                  <div className="text-4xl font-bold text-[#fe585f] mb-2 animate-glow">50K+</div>
                  <div className="text-gray-600">Active Travelers</div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 border border-red-200 hover:border-[#fe585f] transition-all duration-300 hover:shadow-lg">
                  <div className="text-4xl font-bold text-[#fe585f] mb-2 animate-glow">1M+</div>
                  <div className="text-gray-600">UNC Tokens Earned</div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 border border-red-200 hover:border-[#fe585f] transition-all duration-300 hover:shadow-lg">
                  <div className="text-4xl font-bold text-[#fe585f] mb-2 animate-glow">200+</div>
                  <div className="text-gray-600">Cities Covered</div>
                </div>
              </div>
              
              <button
                onClick={() => handleNavigation('marketplace')}
                className="game-button px-8 py-4 bg-[#fe585f] text-white font-bold text-lg rounded-full hover:bg-[#ff7a80] transform hover:scale-105 transition-all duration-300"
              >
                Explore Marketplace
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {activeSection === 'home' && (
        <section className="py-20 bg-gradient-to-br from-red-50 to-red-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#fe585f] mb-16">
              Uniloco Community Stories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  avatar: '☕',
                  name: '@CafeOwner_Maria',
                  time: '2 hours ago · 892 Views',
                  content: 'My little coffee shop in Prague was struggling, almost ready to close after 3 slow months 😢 Then @SoloTraveler_Jake featured us in his Uniloco travel story "Hidden Prague Gems". In just 2 weeks, 180+ travelers found us through his route! Now we\'re busier than ever and I\'m earning UNC from our partnership. Uniloco literally saved my business! 🙏'
                },
                {
                  avatar: '🌍',
                  name: '@Wanderlust_Emma',
                  time: '4 hours ago · 1.5K Views',
                  content: 'Just completed my 50th travel story on Uniloco! Started in my hometown Barcelona, now creating routes across Europe. Last month earned 2,800 UNC, met incredible people, and my "Barcelona Secret Spots" story has 1,200+ followers! Never thought my love for exploring could become my side income 💫'
                },
                {
                  avatar: '💼',
                  name: '@Designer_Alex',
                  time: 'Yesterday · 2.3K Views',
                  content: 'Plot twist: Got hired as UX Designer at a travel startup because of my Uniloco portfolio! 🎉 The CEO saw my 3D travel stories and NFT designs, loved my creativity. Started as a hobby creating routes in Amsterdam, now it\'s my career!'
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-red-200 hover:border-[#fe585f] transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fe585f] to-[#ff7a80] rounded-full flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#fe585f]">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.time}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* CSS Styles */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-bounce {
          animation: bounce 3s infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        .animate-spin {
          animation: spin 4s linear infinite;
        }
        
        .download-btn.downloading {
          animation: downloading 2s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes downloading {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}
