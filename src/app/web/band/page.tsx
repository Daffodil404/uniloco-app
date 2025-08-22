'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/Header';
import { image } from 'framer-motion/client';
import DownloadSection from '@/components/features/DownloadSection';
import GDPRSection from '@/components/features/GDPRSection';

export default function TravelBandNFTsPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const [activeTravelers, setActiveTravelers] = useState(0);
  const [tokensEarned, setTokensEarned] = useState(0);
  const [citiesCovered, setCitiesCovered] = useState(0);

  useEffect(() => {
    // Trigger initial load animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Reveal on scroll + stats animation
  useEffect(() => {
    const revealEls = Array.from(document.querySelectorAll('.reveal')) as HTMLElement[];
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    const statsEl = document.getElementById('travel-stats');
    let statsObserver: IntersectionObserver | null = null;
    if (statsEl) {
      statsObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setStatsInView(true);
            statsObserver && statsObserver.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      statsObserver.observe(statsEl);
    }

    return () => {
      revealObserver.disconnect();
      statsObserver && statsObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!statsInView) return;
    const target = { travelers: 50000, tokens: 1000000, cities: 200 };
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t;
      setActiveTravelers(Math.round(target.travelers * eased));
      setTokensEarned(Math.round(target.tokens * eased));
      setCitiesCovered(Math.round(target.cities * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [statsInView]);

  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  const travelBands = [
    {
      id: 1,
      name: 'Explorer Band',
      rarity: 'Common',
      color: 'from-blue-400 to-blue-600',
      stats: { power: 10, luck: 5, charm: 3 },
      description: 'Perfect for beginners starting their travel journey',
      image: '/static/band/band1.jpeg'
    },
    {
      id: 2,
      name: 'Adventurer Band',
      rarity: 'Uncommon',
      color: 'from-green-400 to-green-600',
      stats: { power: 15, luck: 8, charm: 6 },      description: 'Enhanced capabilities for experienced travelers',
      image: '/static/band/band2.jpeg'
    },
    {
      id: 3,
      name: 'Voyager Band',
      rarity: 'Rare',
      color: 'from-purple-400 to-purple-600',
      stats: { power: 20, luck: 12, charm: 10 },
      description: 'Rare band with exceptional travel bonuses',
      image: '/static/band/band3.jpeg'
    },
    {
      id: 4,
      name: 'Legendary Band',
      rarity: 'Epic',
      color: 'from-orange-400 to-orange-600',
      stats: { power: 25, luck: 15, charm: 12 },
      description: 'Epic band with legendary travel powers',
      image: '/static/band/band4.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      {/* Navigation */}
      <Header
        activeSection={activeSection}
        onNavigation={handleNavigation}
        navItems={['home', 'how-to', 'events', 'partnership', 'web3 hub']}
      />

      {/* Hero removed per request */}

      {/* Travel Statistics Section */}
      <section id="travel-stats" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fe5a5e] mb-3">Start Game with your Travel Band</h2>
            <p className="text-gray-600 text-lg md:text-xl">Start your Travel to Earn journey, choose your exclusive Travel Band, and upgrade to unlock more rewards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto reveal">
            {/* Active Travelers */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#fe5a5e] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fe5a5e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="text-5xl font-bold text-[#fe5a5e] mb-4 leading-none">
                  {activeTravelers.toLocaleString()}+
                </div>
                <div className="text-gray-700 font-medium">Active Travelers</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#fe5a5e] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fe5a5e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="text-5xl font-bold text-[#fe5a5e] mb-4 leading-none">
                  {tokensEarned.toLocaleString()}+
                </div>
                <div className="text-gray-700 font-medium">Tokens Earned</div>
              </div>
            </div>

            {/* Cities Covered */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#fe5a5e] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fe5a5e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="text-5xl font-bold text-[#fe5a5e] mb-4 leading-none">
                  {citiesCovered}+
                </div>
                <div className="text-gray-700 font-medium">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Band Mechanism Section */}
      <section id="mechanism" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 reveal">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] bg-clip-text text-transparent mb-4">
                Travel Band Mechanism
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover how to unlock and obtain different Travel Bands to enhance your journey
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Basic Band Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 reveal">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Basic Band</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-lg">Free for all users</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-lg">Essential travel features</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-lg">Basic community access</span>
                  </div>
                </div>
              </div>

              {/* Premium Bands Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 reveal">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Premium Bands</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-lg">Timed sales events</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-lg">Exclusive features</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-lg">Enhanced benefits</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Band Acquisition Methods */}
            <div className="bg-gradient-to-r from-[#fe5a5e]/5 to-[#ff7a80]/5 rounded-2xl p-8 border border-[#fe5a5e]/20 reveal">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">How to Obtain Premium Bands</h3>
              
              <div className="space-y-6">
                {/* Staking Method */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">Stake UNC</h4>
                  </div>
                  <p className="text-gray-600 mb-3">Stake your UNC tokens to earn guaranteed access to corresponding Travel Bands.</p>
                  <div className="flex items-center text-[#fe5a5e] font-medium">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Guaranteed Band Access
                  </div>
                </div>

                {/* Holding Method */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">Hold More UNC</h4>
                  </div>
                  <p className="text-gray-600 mb-3">Increase your UNC holdings to improve your chances of obtaining premium bands.</p>
                  <div className="flex items-center text-blue-500 font-medium">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Chance-based Access
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8">
                <button className="bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Bands Section */}
      <section id="bands" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-16 reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fe5a5e] mb-6">
              Choose Your Travel Band
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              Each band has unique stats and abilities that enhance your travel experience and rewards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {travelBands.map((band, index) => (
              <div key={band.id} className="reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-[#fe5a5e] transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 group">
                  <img
                    src={band.image}
                    alt={band.name}
                    width={100}
                    height={100}
                    className="mx-auto mb-4 rounded-full object-cover"
                    loading="lazy"
                  />

                  {/* Band Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{band.name}</h3>
                    <div className="inline-block px-3 py-1 bg-[#fe5a5e] text-white text-sm font-semibold rounded-full mb-3">
                      {band.rarity}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{band.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-[#fe5a5e] mb-4 text-center">Stats</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Power:</span>
                        <span className="font-bold text-[#fe5a5e]">{band.stats.power}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Luck:</span>
                        <span className="font-bold text-[#fe5a5e]">{band.stats.luck}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Charm:</span>
                        <span className="font-bold text-[#fe5a5e]">{band.stats.charm}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <DownloadSection />

      {/* GDPR Section */}
      <GDPRSection />

      {/* Custom CSS for animations */}
      <style jsx>{`
        .reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
        .reveal.in-view { opacity: 1; transform: translateY(0); }
        
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
        
        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
