'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/Header';
import UpcomingAdventuresMarquee from '@/components/features/UpcomingAdventuresMarquee';
import DownloadSection from '@/components/features/DownloadSection';

export default function EventsPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEventDetailModal, setShowEventDetailModal] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [statsInView, setStatsInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);
  const [daysCount, setDaysCount] = useState(0);

  const categories = [
    {
      title: 'Signature Experience',
      description: 'Handpicked culture, cuisine, art, and adventure, guided by local experts.',
      image: '/static/online_resource/signature_experience.png',
      target: '/web2/experience_detail'
    },
    {
      title: 'Exclusive Services',
      description: 'Private chefs, photographers, spa and fitness coaches for a truly premium experience.',
      image: '/static/online_resource/events_customized_service.png',
      target: '/web2/service_detail'
    },
    {
      title: 'Tailored Journey',
      description: 'Mystery role-play, time-travel themes, or romantic stories brought to life by professional actors.',
      image: '/static/online_resource/events_tailored.png',
      target: '/web2/script_detail'
    }
  ];

  useEffect(() => {
    // Trigger initial load animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Reveal-on-scroll + statistics counting animation
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

    const statsEl = document.getElementById('event-stats');
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
    const target = { p: 77, participants: 77, countries: 15, days: 12 };
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t;
      setProgress(Math.round(target.p * eased));
      setParticipantsCount(Math.round(target.participants * eased));
      setCountriesCount(Math.round(target.countries * eased));
      setDaysCount(Math.round(target.days * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [statsInView]);

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
        navItems={['home', 'how-to', 'events', 'partnership', 'web3 hub']}
      />

      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/video/events_hero.webm" type="video/webm" />
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#1a0f0f]/70 to-black/75"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 lg:space-y-8">
            {/* Main Slogan */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight">
                <span className={`${isLoaded ? 'slide-in-left' : 'opacity-0'} inline text-white`}>Featured&nbsp;</span>
                <span className={`${isLoaded ? 'slide-in-left-delay' : 'opacity-0'} inline text-[#fe5a5e]`}>Events</span>
              </h1>
            </div>

            {/* Subtitle */}
            <h2 className={`text-xl md:text-2xl lg:text-3xl text-white font-medium ${isLoaded ? 'slide-in-left-delay-4' : 'opacity-0'}`}>
              Join Epic Travel Adventures & Earn Rewards
            </h2>

            {/* Description */}
            <p className={`text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto ${isLoaded ? 'slide-in-left-delay-5' : 'opacity-0'}`}>
              Discover unique blockchain travel events, participate in digital treasure hunts,
              and earn exclusive NFTs and UNC tokens while exploring the world.
            </p>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isLoaded ? 'slide-in-left-delay-6' : 'opacity-0'}`}>
              <button
                onClick={() => document.getElementById('main-event')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 lg:px-8 py-3 lg:py-4 bg-[#fe5a5e] text-white font-semibold text-base lg:text-lg rounded-full shadow-lg hover:bg-[#e14b52] transition-colors"
              >
                <span className="flex items-center space-x-2">🍄<span>Join Adventure</span></span>
              </button>
              <button
                onClick={() => document.getElementById('upcoming')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#fe5a5e] text-white px-6 py-3 rounded-full text-base md:text-lg font-bold hover:bg-[#e14b52] transition-colors flex items-center gap-2"                >
                <span className="flex items-center space-x-2">📅<span>View All Events</span></span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Event Categories Section (Vertical Carousel) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#fe5a5e] mb-12">Event Categories</h2>

          <div
            className="relative max-w-5xl lg:max-w-6xl mx-auto h-[34rem] overflow-hidden rounded-2xl border border-gray-200"
            onTouchStart={(e) => setTouchStartY(e.touches[0].clientY)}
            onTouchEnd={(e) => {
              if (touchStartY === null) return;
              const deltaY = e.changedTouches[0].clientY - touchStartY;
              if (Math.abs(deltaY) > 40) {
                if (deltaY > 0) {
                  setCategoryIndex((prev) => (prev - 1 + categories.length) % categories.length);
                } else {
                  setCategoryIndex((prev) => (prev + 1) % categories.length);
                }
              }
              setTouchStartY(null);
            }}
          >
            <div
              className="transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateY(-${categoryIndex * 100}%)` }}
            >
              {categories.map((card, index) => (
                <div key={index} className="w-full h-[34rem] bg-white">
                  <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                    {/* Image */}
                    <div className="relative h-64 lg:h-full lg:col-span-2">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority={index === categoryIndex}
                      />
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                    {/* Content */}
                    <div className="p-8 lg:p-14 flex flex-col justify-center lg:col-span-3">
                      <h3 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">{card.title}</h3>
                      <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 max-w-3xl">{card.description}</p>
                      <div className="flex gap-3">
                        <button
                          className="px-6 py-3 bg-[#fe5a5e] text-white rounded-lg hover:bg-[#e14b52] transition-colors"
                          onClick={() => router.push(card.target)}
                          type="button"
                        >
                          Explore
                        </button>
                        <button
                          className="px-6 py-3 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors"
                          type="button"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <button
              onClick={() => setCategoryIndex((prev) => (prev - 1 + categories.length) % categories.length)}
              className="absolute left-1/2 -translate-x-1/2 top-4 bg-white/90 hover:bg-white text-black w-10 h-10 rounded-full shadow flex items-center justify-center"
              aria-label="Previous"
            >
              ↑
            </button>
            <button
              onClick={() => setCategoryIndex((prev) => (prev + 1) % categories.length)}
              className="absolute left-1/2 -translate-x-1/2 bottom-4 bg-white/90 hover:bg-white text-black w-10 h-10 rounded-full shadow flex items-center justify-center"
              aria-label="Next"
            >
              ↓
            </button>

            {/* Dots */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              {categories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCategoryIndex(i)}
                  className={`w-2 h-6 rounded-full transition-colors ${i === categoryIndex ? 'bg-[#fe5a5e]' : 'bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Main Event Section */}
      <section id="main-event" className="py-16 bg-white text-gray-800">
        <div className="container mx-auto px-3 md:px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch reveal">
            {/* Left: Image */}
            <div className="relative h-72 sm:h-96 lg:h-[34rem] rounded-2xl overflow-hidden reveal">
              <Image
                src="/static/online_resource/mushroom_map.png"
                alt="Luxembourg Forest Mushroom Hunt"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-center reveal">
              <h2 className="text-4xl md:text-5xl font-bold text-[#fe5a5e] mb-4">🍄 Luxembourg Forest Mushroom Hunt 2025</h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Hidden in the mysterious forests of Luxembourg, various rare mushrooms await discovery by explorers.
                This special blockchain travel event will lead participants deep into the forest depths, recording
                every mushroom discovery point through our 3D check-in system.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-[#fe5a5e] text-white px-6 py-3 rounded-full text-base md:text-lg font-bold hover:bg-[#e14b52] transition-colors flex items-center gap-2">
                  🚀 Join Adventure
                </button>
                <button
                  onClick={() => setShowEventDetailModal(true)}
                  className="bg-[#fe5a5e] text-white px-6 py-3 rounded-full text-base md:text-lg font-bold hover:bg-[#e14b52] transition-colors flex items-center gap-2"                >
                  📋 View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showEventDetailModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-4 py-8" role="dialog" aria-modal="true">
          <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative h-56 sm:h-72 md:h-80">
              <Image src="/static/online_resource/mushroom.png" alt="Luxembourg Forest Mushroom Hunt" fill className="object-cover" sizes="100vw" priority />
              <div className="absolute inset-0 bg-black/20" />
              <button onClick={() => setShowEventDetailModal(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-black flex items-center justify-center shadow" aria-label="Close">✕</button>
            </div>
            <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Luxembourg Forest Mushroom Hunt 2025</h3>
              <p className="text-gray-600 mb-6">Hidden in the mysterious forests of Luxembourg. All details below.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-2xl mb-2">📍</div>
                  <h4 className="font-semibold text-[#fe5a5e] mb-1">Location</h4>
                  <p className="text-sm text-gray-700">Luxembourg National Forest Parks<br />Mullerthal Trail & Grünewald Forest</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-2xl mb-2">📅</div>
                  <h4 className="font-semibold text-[#fe5a5e] mb-1">Duration</h4>
                  <p className="text-sm text-gray-700">September 15-17, 2025<br />3-day 2-night journey</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="font-semibold text-[#fe5a5e] mb-1">Goal</h4>
                  <p className="text-sm text-gray-700">Discover 15 mushroom species<br />Including rare Chanterelle and Porcini</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-2xl mb-2">🏆</div>
                  <h4 className="font-semibold text-[#fe5a5e] mb-1">Rewards</h4>
                  <p className="text-sm text-gray-700">Rare NFT + 1000 UNC<br />Exclusive &quot;Mushroom Hunter&quot; title</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setShowEventDetailModal(false)} className="px-5 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100">Close</button>
                <button className="px-5 py-2 bg-[#fe5a5e] text-white rounded-lg hover:bg-[#e14b52]">Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Statistics Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div id="event-stats" className="bg-gray-50 rounded-3xl p-8 lg:p-10 border-2 border-[#fe5a5e]/20 reveal">
            <h3 className="text-2xl font-bold text-[#fe5a5e] mb-10 text-center">Event Statistics</h3>

            {/* Donut + Stat Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-center">
              {/* Donut Chart */}
              <div className="flex flex-col items-center">
                <div className="relative w-52 h-52">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundImage: `conic-gradient(#fe5a5e 0% ${progress}%, #e5e7eb ${progress}% 100%)` }}
                  />
                  <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                    <span className="text-5xl font-extrabold text-gray-800">{progress}%</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 font-semibold">Registration Progress</p>
              </div>

              {/* Stat Cards */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#fe5a5e] transition-colors">
                  <div className="flex items-center gap-3 mb-3 text-gray-600">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    <span className="font-medium">Participants</span>
                  </div>
                  <p className="text-4xl font-bold text-[#fe5a5e] leading-none">{participantsCount}</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#fe5a5e] transition-colors">
                  <div className="flex items-center gap-3 mb-3 text-gray-600">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                    <span className="font-medium">Countries</span>
                  </div>
                  <p className="text-4xl font-bold text-[#fe5a5e] leading-none">{countriesCount}</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#fe5a5e] transition-colors">
                  <div className="flex items-center gap-3 mb-3 text-gray-600">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <span className="font-medium">Days</span>
                  </div>
                  <p className="text-4xl font-bold text-[#fe5a5e] leading-none">{daysCount}</p>
                </div>
              </div>
            </div>

            {/* Recent Participants with subtle map-like background */}
            <div className="mt-12 relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6">
              <div className="pointer-events-none absolute inset-0 opacity-50">
                <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gray-100" />
                <div className="absolute right-6 top-6 w-40 h-40 rounded-full bg-gray-100" />
                <div className="absolute right-24 bottom-6 w-24 h-24 rounded-full bg-gray-100" />
              </div>
              <div className="relative">
                <h4 className="text-lg font-bold text-[#fe5a5e] mb-4">Recent Participants</h4>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-base text-gray-700">👤</div>
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-base">🇩🇪</div>
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-base">🇫🇷</div>
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-base">🇧🇪</div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 border border-gray-200 flex items-center justify-center text-sm font-bold">+73</div>
                </div>
                <p className="text-gray-600 text-sm">Adventurers from Germany, France, Belgium and more</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Upcoming Adventures Section (lighter bg + marquee) */}
      <section id="upcoming" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white text-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-12 reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Upcoming Adventures</h2>
            <p className="text-gray-600 text-lg">Discover our exciting lineup of blockchain travel events for 2025</p>
          </div>
          <div className="reveal">
            <UpcomingAdventuresMarquee />
          </div>
        </div>
      </section>

      <DownloadSection />

      {/* Custom CSS for animations */}
      <style jsx>{`
        .reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
        .reveal.in-view { opacity: 1; transform: translateY(0); }
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
