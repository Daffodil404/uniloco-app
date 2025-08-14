'use client';

import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Globe,
  TrendingUp,
  DollarSign,
  Smartphone,
  Store,
  Check,
  MapPin,
  MessageCircle,
  Mail,
  ChevronDown,
  Star
} from 'lucide-react';
import Header from '@/components/ui/Header';

export default function PartnershipPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle scroll events for section highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Determine active section based on scroll position
      const sections = ['home', 'types', 'how-it-works', 'stories', 'contact', 'cta'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial load animation
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation (same as intro page)
  const handleNavigation = (section: string) => {
    setIsAnimating(true);
    setActiveSection(section);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="font-sans text-gray-800 bg-white overflow-x-hidden">
      {/* Navigation */}
      <Header 
        activeSection={activeSection}
        onNavigation={handleNavigation}
        navItems={['home', 'how-to', 'web3 hub', 'partnership']}
      />

      {/* Hero Section */}
      <section 
        id="home"
        className="pt-16 min-h-screen flex items-center relative overflow-hidden bg-white"
      >
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
                  <span className={`block ${isLoaded ? 'slide-in-left' : 'opacity-100'} text-[#fe585f] text-4xl md:text-6xl lg:text-7xl xl:text-8xl`}>Partner with</span>
                  <span className={`block ${isLoaded ? 'slide-in-left-delay' : 'opacity-100'} bg-gradient-to-r from-[#fe585f] to-[#ff7a80] bg-clip-text text-transparent text-4xl md:text-6xl lg:text-7xl xl:text-8xl`}>Uniloco</span>
                </h1>
              </div>

              {/* Subtitle */}
              <h2 className={`text-lg md:text-xl lg:text-2xl text-gray-700 font-light ${isLoaded ? 'slide-in-left-delay-4' : 'opacity-0'}`}>
                🌟 Join the Travel-to-Earn Revolution 🌟
              </h2>

              {/* Description */}
              <p className={`text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg ${isLoaded ? 'slide-in-left-delay-5' : 'opacity-0'}`}>
                Whether you&apos;re an influencer with a passionate audience or a local business wanting to attract travelers, 
                Uniloco offers proven partnership programs that drive real results and sustainable income.
              </p>

              {/* Action Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? 'slide-in-left-delay-6' : 'opacity-0'}`}>
                <button
                  onClick={() => scrollToSection('types')}
                  className="game-button group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white font-bold text-base lg:text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="w-5 h-5 lg:w-6 lg:h-6 bg-white/20 rounded-full flex items-center justify-center text-sm lg:text-base">🚀</span>
                    <span>Explore Programs</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff7a80] to-[#fe585f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button
                  onClick={() => scrollToSection('cta')}
                  className="game-button group relative px-6 lg:px-8 py-3 lg:py-4 border-2 border-[#fe585f] text-[#fe585f] font-bold text-base lg:text-lg rounded-full hover:bg-[#fe585f] hover:text-white transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <span>💼</span>
                    <span>Apply Now</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side - Stats Cards */}
            <div className={`flex flex-col items-center space-y-4 ${isLoaded ? 'slide-in-right' : 'opacity-0'}`}>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
                {[
                  { 
                    icon: <TrendingUp size={32} className="text-[#fe585f]" />, 
                    emoji: '📈',
                    title: 'Proven Results', 
                    desc: '40-60% revenue increase' 
                  },
                  { 
                    icon: <Globe size={32} className="text-[#fe585f]" />, 
                    emoji: '🌐',
                    title: 'Global Reach', 
                    desc: '50K+ active travelers' 
                  },
                  { 
                    icon: <DollarSign size={32} className="text-[#fe585f]" />, 
                    emoji: '💰',
                    title: 'Multiple Streams', 
                    desc: 'UNC tokens & commissions' 
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#fe585f] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
                  >
                    <div className="text-4xl mb-3 text-center animate-bounce group-hover:animate-pulse">{item.emoji}</div>
                    <div className="mb-3 text-center group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <h3 className="text-lg font-bold mb-2 text-[#fe585f] text-center">{item.title}</h3>
                    <p className="text-gray-600 text-sm text-center leading-relaxed">{item.desc}</p>
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

      {/* Partnership Types Section */}
      <section id="types" className="py-24 bg-white relative">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-10 animate-pulse">🏢</div>
          <div className="absolute top-20 right-20 text-5xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}>📱</div>
          <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}>💼</div>
          <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-pulse" style={{animationDelay: '3s'}}>🎯</div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fe585f] mb-6 animate-fade-in">
              🎯 Two Partnership Programs
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              Choose the program that matches your expertise and start earning with Uniloco&apos;s ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Influencer Program */}
            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#fe585f] group transform hover:-translate-y-2">
              <div className="relative mb-10">
                <div className="text-8xl mb-6 text-center animate-bounce group-hover:animate-pulse">📱</div>
                <div className="w-24 h-24 bg-gradient-to-br from-[#fe585f] to-[#ff7a82] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <Smartphone size={48} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#fe585f] text-center mb-3">Content Creators</h3>
                <p className="text-gray-500 text-center text-lg">🎬 Influencers & Digital Creators</p>
              </div>
              
              <p className="text-gray-600 text-center mb-10 leading-relaxed text-lg">
                Transform your travel content into sustainable income. Earn through our affiliate program, 
                get sponsored travel opportunities, and provide exclusive value to your audience with UNC rewards.
              </p>

              <div className="mb-10">
                <h4 className="text-xl font-bold text-[#fe585f] mb-6 text-center">💎 Creator Benefits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    '20-35% commission on every referral sale',
                    'Sponsored trips to create authentic content',
                    'Exclusive UNC token rewards',
                    'Early access to new features',
                    'Custom discount codes for your audience',
                    'Featured on Uniloco social channels'
                  ].map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 border border-transparent hover:border-[#fe585f]/30"
                    >
                      <div className="mr-3 mt-1 w-6 h-6 bg-gradient-to-br from-[#fe585f] to-[#ff7a82] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={14} className="text-white" />
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-[#fe585f] mb-10">
                <h4 className="font-bold text-[#fe585f] mb-4 text-lg">📋 Requirements</h4>
                <ul className="space-y-3">
                  {[
                    'Minimum 10K followers on at least one platform',
                    'High-quality travel or lifestyle content',
                    'Active engagement with your audience',
                    'Alignment with Uniloco brand values'
                  ].map((req, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="text-[#fe585f] mr-3 text-lg">✓</span>
                      <span className="font-medium">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-gradient-to-r from-[#fe585f] to-[#ff7a82] text-white py-4 px-8 rounded-2xl font-bold text-xl hover:shadow-xl hover:shadow-[#fe585f]/30 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-3 group">
                🚀 Apply Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Merchant Program */}
            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#fe585f] group transform hover:-translate-y-2">
              <div className="text-8xl mb-6 text-center animate-bounce group-hover:animate-pulse">🏪</div>
              <div className="w-24 h-24 bg-gradient-to-br from-[#fe585f] to-[#ff7a82] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
                <Store size={48} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#fe585f] text-center mb-3">Local Merchants</h3>
              <p className="text-gray-500 text-center mb-10 text-lg">🏨 Restaurants, Hotels & Experiences</p>
              
              <p className="text-gray-600 text-center mb-10 leading-relaxed text-lg">
                Attract travelers to your business with our targeted marketing tools. Increase foot traffic, 
                boost sales, and gain valuable exposure to our community of global explorers.
              </p>

              <div className="mb-10">
                <h4 className="text-xl font-bold text-[#fe585f] mb-6 text-center">💎 Merchant Benefits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Increased visibility to targeted travelers',
                    'No monthly fees - pay only for results',
                    'UNC token payment options',
                    'Detailed analytics dashboard',
                    'Promotion in Uniloco app and website',
                    'Exclusive merchant events and training'
                  ].map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 border border-transparent hover:border-[#fe585f]/30"
                    >
                      <div className="mr-3 mt-1 w-6 h-6 bg-gradient-to-br from-[#fe585f] to-[#ff7a82] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={14} className="text-white" />
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-[#fe585f] mb-10">
                <h4 className="font-bold text-[#fe585f] mb-4 text-lg">📋 Requirements</h4>
                <ul className="space-y-3">
                  {[
                    'Registered business with valid licenses',
                    'Physical location open to the public',
                    'High customer satisfaction ratings',
                    'Ability to accept digital payments'
                  ].map((req, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="text-[#fe585f] mr-3 text-lg">✓</span>
                      <span className="font-medium">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-gradient-to-r from-[#fe585f] to-[#ff7a82] text-white py-4 px-8 rounded-2xl font-bold text-xl hover:shadow-xl hover:shadow-[#fe585f]/30 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-3 group">
                🤝 Join Our Network <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white relative">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 text-5xl opacity-5 animate-pulse">⚡</div>
          <div className="absolute bottom-20 right-20 text-5xl opacity-5 animate-pulse" style={{animationDelay: '1s'}}>🎯</div>
          <div className="absolute top-1/2 left-10 text-4xl opacity-5 animate-pulse" style={{animationDelay: '2s'}}>🚀</div>
          <div className="absolute top-1/2 right-10 text-4xl opacity-5 animate-pulse" style={{animationDelay: '3s'}}>💡</div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fe585f] mb-6">
              ⚡ How Partnership Works
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              A simple 4-step process to start earning with Uniloco&apos;s partnership ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:border-[#fe585f]/30">
              <h3 className="text-3xl font-bold text-[#fe585f] text-center mb-10">📱 For Content Creators</h3>
              
              <ul className="space-y-8">
                {[
                  {
                    step: 1,
                    emoji: '📝',
                    title: 'Submit Your Application',
                    desc: 'Fill out our simple application form with your details and social media profiles'
                  },
                  {
                    step: 2,
                    emoji: '✅',
                    title: 'Get Approved',
                    desc: 'Our team reviews your application and approves within 3-5 business days'
                  },
                  {
                    step: 3,
                    emoji: '🛠️',
                    title: 'Receive Your Tools',
                    desc: 'Get access to your affiliate dashboard, tracking links, and creative assets'
                  },
                  {
                    step: 4,
                    emoji: '💰',
                    title: 'Start Earning',
                    desc: 'Create content, share your links, and earn commissions on every successful referral'
                  }
                ].map((step) => (
                  <li key={step.step} className="flex items-start p-6 bg-white rounded-2xl border border-transparent hover:border-[#fe585f]/30 transition-all duration-500 hover:translate-x-4 hover:shadow-lg group">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fe585f] to-[#ff7a82] rounded-full flex items-center justify-center text-white font-bold mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{step.emoji}</span>
                        <h4 className="font-bold text-[#fe585f] text-lg">{step.title}</h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:border-[#fe585f]/30">
              <h3 className="text-3xl font-bold text-[#fe585f] text-center mb-10">🏪 For Local Merchants</h3>
              
              <ul className="space-y-8">
                {[
                  {
                    step: 1,
                    emoji: '🏢',
                    title: 'Create Your Business Profile',
                    desc: 'Sign up and provide details about your business, offerings, and location'
                  },
                  {
                    step: 2,
                    emoji: '🔍',
                    title: 'Verify Your Business',
                    desc: 'Complete our verification process to ensure quality for our users'
                  },
                  {
                    step: 3,
                    emoji: '🎯',
                    title: 'Set Up Your Offers',
                    desc: 'Create special deals and promotions exclusively for Uniloco users'
                  },
                  {
                    step: 4,
                    emoji: '👥',
                    title: 'Welcome Travelers',
                    desc: 'Start receiving customers through the platform and track your performance'
                  }
                ].map((step) => (
                  <li key={step.step} className="flex items-start p-6 bg-white rounded-2xl border border-transparent hover:border-[#fe585f]/30 transition-all duration-500 hover:translate-x-4 hover:shadow-lg group">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fe585f] to-[#ff7a82] rounded-full flex items-center justify-center text-white font-bold mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{step.emoji}</span>
                        <h4 className="font-bold text-[#fe585f] text-lg">{step.title}</h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="stories" className="py-24 bg-white relative">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-10 animate-pulse">🏆</div>
          <div className="absolute top-20 right-20 text-5xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
          <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}>🎉</div>
          <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-pulse" style={{animationDelay: '3s'}}>💎</div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fe585f] mb-6">
              🏆 Success Stories
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              See how our partners are growing their businesses with Uniloco
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                type: 'Creator',
                emoji: '📱',
                name: 'Emma Rodriguez',
                details: 'Travel Blogger • 120K Followers',
                quote: 'Uniloco transformed my hobby into a full-time career. I&apos;ve doubled my income while creating content about places I love.',
                metrics: ['42% Conversion Rate', '35K UNC Earned', '8 Sponsored Trips']
              },
              {
                type: 'Merchant',
                emoji: '🏪',
                name: 'Bali Beach Cafe',
                details: 'Restaurant • Seminyak, Bali',
                quote: 'Since joining Uniloco, we&apos;ve seen a 65% increase in foreign customers. The platform brings exactly the crowd we want.',
                metrics: ['+65% Foreign Customers', '12% Revenue Growth', '4.8/5 Rating']
              },
              {
                type: 'Creator',
                emoji: '📹',
                name: 'James Wilson',
                details: 'Travel Vlogger • 350K Subscribers',
                quote: 'The analytics dashboard helps me understand what my audience loves. My engagement has never been higher.',
                metrics: ['28% Commission Rate', '120K UNC Earned', '15 Brand Collaborations']
              }
            ].map((story, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-[#fe585f]/30 relative group hover:-translate-y-4"
              >
                <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-[#fe585f] to-[#ff7a82] text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  {story.type}
                </div>
                
                <div className="text-6xl mb-6 text-center animate-bounce group-hover:animate-pulse">{story.emoji}</div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-[#fe585f] to-[#ff7a82] rounded-full flex items-center justify-center mb-6 text-white text-2xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {story.name.charAt(0)}
                </div>
                
                <h3 className="text-2xl font-bold text-[#fe585f] mb-2 text-center">{story.name}</h3>
                <p className="text-[#fe585f]/70 text-sm mb-6 text-center">{story.details}</p>
                
                <p className="text-gray-600 italic mb-8 text-sm leading-relaxed text-center">&ldquo;{story.quote}&rdquo;</p>
                
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {story.metrics.map((metric, i) => (
                    <span key={i} className="bg-gray-100 text-[#fe585f] text-xs px-4 py-2 rounded-full font-bold border border-[#fe585f]/20">
                      {metric}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-center text-[#fe585f]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#fe585f" stroke="#fe585f" className="animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 text-5xl opacity-5 animate-pulse">📧</div>
          <div className="absolute bottom-20 right-20 text-5xl opacity-5 animate-pulse" style={{animationDelay: '1s'}}>💬</div>
          <div className="absolute top-1/2 left-10 text-4xl opacity-5 animate-pulse" style={{animationDelay: '2s'}}>📍</div>
          <div className="absolute top-1/2 right-10 text-4xl opacity-5 animate-pulse" style={{animationDelay: '3s'}}>📞</div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fe585f] mb-6">
              📞 Get In Touch
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              Have questions about our partnership programs? Our team is here to help
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: <Mail size={32} />,
                emoji: '📧',
                title: 'Email Us',
                desc: 'Send us your questions and we&apos;ll get back to you within 24 hours',
                btnText: 'Send Message'
              },
              {
                icon: <MessageCircle size={32} />,
                emoji: '💬',
                title: 'Live Chat',
                desc: 'Chat with our partnership specialists in real-time during business hours',
                btnText: 'Start Chat'
              },
              {
                icon: <MapPin size={32} />,
                emoji: '📍',
                title: 'Visit Us',
                desc: 'Drop by our offices for a face-to-face consultation about partnerships',
                btnText: 'See Locations'
              }
            ].map((contact, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-10 text-center border border-gray-200 hover:border-[#fe585f]/30 transition-all duration-500 hover:-translate-y-4 hover:shadow-xl group"
              >
                <div className="text-6xl mb-6 animate-bounce group-hover:animate-pulse">{contact.emoji}</div>
                <div className="w-20 h-20 bg-gradient-to-br from-[#fe585f] to-[#ff7a82] rounded-full flex items-center justify-center mx-auto mb-8 text-white group-hover:scale-110 transition-transform duration-300">
                  {contact.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-[#fe585f] mb-4">{contact.title}</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">{contact.desc}</p>
                
                <button className="bg-gradient-to-r from-[#fe585f] to-[#ff7a82] text-white px-8 py-3 rounded-full text-lg font-bold hover:shadow-lg hover:shadow-[#fe585f]/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                  {contact.btnText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 bg-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#fe585f]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-[#ff7a80]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#fe585f]/3 rounded-full blur-3xl"></div>
        </div>
        
        {/* Floating emojis */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🚀</div>
          <div className="absolute top-40 right-20 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>💎</div>
          <div className="absolute bottom-40 left-20 text-3xl animate-bounce" style={{animationDelay: '2.5s'}}>⭐</div>
          <div className="absolute bottom-20 right-20 text-4xl animate-bounce" style={{animationDelay: '3s'}}>🎯</div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#fe585f]">🚀 Ready to Join the Revolution?</h2>
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
              Start earning more with your travel content or attract more customers to your business. 
              Join hundreds of successful partners already growing with Uniloco.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="bg-[#fe585f] text-white px-10 py-5 rounded-full text-xl font-bold hover:shadow-xl hover:shadow-[#fe585f]/30 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center gap-3 group">
                📱 Apply as Creator <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-transparent border-2 border-[#fe585f] text-[#fe585f] px-10 py-5 rounded-full text-xl font-bold hover:bg-[#fe585f] hover:text-white transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center gap-3 group">
                🏪 Join as Merchant <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="flex justify-center items-center text-gray-600 text-lg">
              <span>Have questions?</span>
              <button className="ml-3 text-[#fe585f] underline hover:text-[#fe585f]/80 flex items-center gap-2">
                Schedule a call <ChevronDown size={20} className="animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-4xl opacity-10">🌍</div>
          <div className="absolute bottom-10 right-10 text-4xl opacity-10">🚀</div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#fe585f] mb-6 flex items-center gap-2">
                🚀 Uniloco
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                The world&apos;s first travel-to-earn platform connecting travelers, creators, and local businesses.
              </p>
            </div>
            
            {[
              {
                title: 'Programs',
                emoji: '🎯',
                links: ['Creator Program', 'Merchant Program', 'Affiliate Program', 'Referral Program']
              },
              {
                title: 'Resources',
                emoji: '📚',
                links: ['Help Center', 'Guides', 'Success Stories', 'Blog']
              },
              {
                title: 'Company',
                emoji: '🏢',
                links: ['About Us', 'Careers', 'Press', 'Contact']
              }
            ].map((col, index) => (
              <div key={index}>
                <h4 className="font-bold mb-6 text-gray-300 text-lg flex items-center gap-2">
                  {col.emoji} {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-400 hover:text-[#fe585f] text-lg transition-colors duration-300 hover:translate-x-2 inline-block">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-lg mb-6 md:mb-0">
              © 2023 Uniloco. All rights reserved.
            </p>
            <div className="flex space-x-8">
              {['Terms', 'Privacy', 'Cookies'].map((item) => (
                <a key={item} href="#" className="text-gray-500 hover:text-[#fe585f] text-lg transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

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
      `}</style>
    </main>
  );
}