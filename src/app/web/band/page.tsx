'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/Header';
import { image } from 'framer-motion/client';
import DownloadSection from '@/components/features/DownloadSection';

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
        navItems={['home', 'how-to', 'web3 hub', 'events', 'partnership']}
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
      <section id="mechanism" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8 reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-[#fe5a5e]">Travel Band Mechanism</h2>
          </div>
          <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-sm reveal">
            <ul className="space-y-3 text-gray-700 text-lg">
              <li>Get Basic Band for free</li>
              <li>Purchase other Bands through timed sales</li>
            </ul>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ways to obtain Premium Bands</h3>
              <ul className="space-y-3 text-gray-700">
                <li>Stake UNC → Guaranteed to get corresponding Band</li>
                <li>Hold more UNC → Chance to obtain (not guaranteed)</li>
              </ul>
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
