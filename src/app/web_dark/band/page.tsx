'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/Header';

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
      price: 'Free',
      description: 'Perfect for beginners starting their travel journey'
    },
    {
      id: 2,
      name: 'Adventurer Band',
      rarity: 'Uncommon',
      color: 'from-green-400 to-green-600',
      stats: { power: 15, luck: 8, charm: 6 },
      price: '100 Euro',
      description: 'Enhanced capabilities for experienced travelers'
    },
    {
      id: 3,
      name: 'Voyager Band',
      rarity: 'Rare',
      color: 'from-purple-400 to-purple-600',
      stats: { power: 20, luck: 12, charm: 10 },
      price: '500 Euro',
      description: 'Rare band with exceptional travel bonuses'
    },
    {
      id: 4,
      name: 'Legendary Band',
      rarity: 'Epic',
      color: 'from-orange-400 to-orange-600',
      stats: { power: 25, luck: 15, charm: 12 },
      price: '1000 Euro',
      description: 'Epic band with legendary travel powers'
    },
    {
      id: 5,
      name: 'Mythic Band',
      rarity: 'Legendary',
      color: 'from-red-400 to-red-600',
      stats: { power: 30, luck: 18, charm: 15 },
      price: '2500 Euro',
      description: 'The ultimate travel companion with mythical abilities'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      {/* Navigation */}
      <Header
        activeSection={activeSection}
        onNavigation={handleNavigation}
        navItems={['home', 'how-to', 'web3 hub', 'events', 'partnership']}
      />

      {/* Hero removed per request */}

      {/* Travel Statistics Section */}
      <section id="travel-stats" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fe585f] mb-3">Start Game with your Travel Band</h2>
            <p className="text-gray-600 text-lg md:text-xl">Start your Travel to Earn journey, choose your exclusive Travel Band, and upgrade to unlock more rewards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto reveal">
            {/* Active Travelers */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#fe585f] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fe585f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="text-5xl font-bold text-[#fe585f] mb-4 leading-none">
                  {activeTravelers.toLocaleString()}+
                </div>
                <div className="text-gray-700 font-medium">Active Travelers</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#fe585f] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fe585f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="text-5xl font-bold text-[#fe585f] mb-4 leading-none">
                  {tokensEarned.toLocaleString()}+
                </div>
                <div className="text-gray-700 font-medium">Tokens Earned</div>
              </div>
            </div>

            {/* Cities Covered */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#fe585f] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fe585f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="text-5xl font-bold text-[#fe585f] mb-4 leading-none">
                  {citiesCovered}+
                </div>
                <div className="text-gray-700 font-medium">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Bands Section */}
      <section id="bands" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-16 reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fe585f] mb-6">
              Choose Your Travel Band
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              Each band has unique stats and abilities that enhance your travel experience and rewards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {travelBands.map((band, index) => (
              <div key={band.id} className="reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-[#fe585f] transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 group">
                  {/* Band Icon */}
                  <div className={`w-24 h-24 bg-gradient-to-br ${band.color} rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    🎯
                  </div>

                  {/* Band Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{band.name}</h3>
                    <div className="inline-block px-3 py-1 bg-[#fe585f] text-white text-sm font-semibold rounded-full mb-3">
                      {band.rarity}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{band.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-[#fe585f] mb-4 text-center">Stats</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Power:</span>
                        <span className="font-bold text-[#fe585f]">{band.stats.power}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Luck:</span>
                        <span className="font-bold text-[#fe585f]">{band.stats.luck}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Charm:</span>
                        <span className="font-bold text-[#fe585f]">{band.stats.charm}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#fe585f] mb-4">{band.price}</div>
                    <button className="w-full bg-[#fe585f] text-white py-3 rounded-full font-semibold hover:bg-[#e14b52] transition-colors">
                      {band.price === 'Free' ? 'Claim Now' : 'Purchase'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 bg-gradient-to-b from-[#fe585f]/85 to-[#d94a51]/85 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            START YOUR JOURNEY
          </h2>
          <p className="text-2xl mb-12">
            Download the app and choose your first Travel Band
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-[#fe585f] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
              <span>🍎</span>
              <span>Download on App Store</span>
            </button>

            <button className="bg-white text-[#fe585f] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
              <span>🤖</span>
              <span>Get it on Google Play</span>
            </button>
          </div>
        </div>
      </section>

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
