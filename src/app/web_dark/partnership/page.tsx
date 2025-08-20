'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import Image from 'next/image';
import { ConfigProvider, Steps } from 'antd';
import DownloadSection from '@/components/features/DownloadSection';

export default function PartnershipPage() {
  const [activeSection, setActiveSection] = useState('home');
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
      audio.play().catch(() => { }); // 忽略可能的错误

      setTimeout(() => {
        button.classList.remove('downloading');
        alert('Download started! 🚀');
      }, 2000);
    }
  };
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

    // Initial load placeholder (removed unused state)

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // reveal-on-scroll for fade-in effects
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal')) as HTMLElement[];
    if (elements.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Handle navigation (same as intro page)
  const handleNavigation = (section: string) => {
    setActiveSection(section);
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

      {/* Hero Section with video background (intro style) */}
      <section id="home" className="pt-16 relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/video/bussiness_partnership.webm" type="video/webm" />
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#1a0f0f]/70 to-black/75"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36 text-center reveal">
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mb-6">
            Join the Travel-to-Earn Revolution 🌍
          </h1>
          <p className="mx-auto max-w-[700px] text-xl text-white/80 leading-relaxed mb-10">
            Transform your local expertise into sustainable income.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 reveal">
            <button onClick={() => scrollToSection('cta')} className="bg-[#fe585f] text-white px-6 py-3 rounded-full text-base md:text-lg font-bold hover:bg-[#e14b52] transition-colors flex items-center gap-2">
              Apply Now
            </button>
            <button onClick={() => scrollToSection('types')} className="bg-[#fe585f] text-white px-6 py-3 rounded-full text-base md:text-lg font-bold hover:bg-[#e14b52] transition-colors flex items-center gap-2">
              Learn More
            </button>
            <button onClick={() => scrollToSection('contact')} className="bg-[#fe585f] text-white px-6 py-3 rounded-full text-base md:text-lg font-bold hover:bg-[#e14b52] transition-colors flex items-center gap-2">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section id="why" className="py-24 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#fe585f] mb-12 reveal">
            Why Partner with Uniloco?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto reveal">
            {[
              {
                image: '/static/partnership/undraw_mind-map_i9bv.svg',
                title: 'Smart Customer Matching',
                oldTitle: 'The old way',
                old: ' Endless scrolling, generic searches, missed connections.',
                withTitle: 'Uniloco’s advantage',
                with: 'AI pairs your unique expertise with travelers who truly value it.'
              },
              {
                image: '/static/partnership/undraw_all-the-data_5lil.svg',
                title: 'All-in-One Business Tools',
                oldTitle: 'Typical solutions',
                old: 'Juggling multiple tools, manual processes, no support. ',
                withTitle: 'Uniloco’s advantage',
                with: 'One seamless platform—automated payments, real-time analytics, and expert support. '
              },
              {
                image: '/static/partnership/undraw_investment-data_frxx.svg',
                title: 'Keep More, Earn More',
                oldTitle: 'Industry standard',
                old: 'High fees eating into your profits.',
                withTitle: 'Uniloco’s model',
                with: 'You keep 75-95% of earnings + performance bonuses.'
              }
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-transparent hover:border-[#fe585f] p-8"
              >
                <div className="mb-6 flex justify-center">
                  <div className="relative w-28 h-28">
                    <Image src={card.image} alt={card.title} fill className="object-contain" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-6">{card.title}</h3>

                {/* Comparison */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">{card.oldTitle}</p>
                    <p className="text-gray-600">{card.old}</p>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#fe585f] mb-1">{card.withTitle}</p>
                    <p className="text-gray-800">{card.with}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Partnership Programs */}
      <section id="programs" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-[#fe585f]">Two Partnership Programs</h2>
            <div className="mt-3 flex justify-center">
              <span className="inline-block h-1 w-24 bg-[#fe585f] rounded-full"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto reveal">
            {/* Content Creators Card */}
            <div className="rounded-2xl border border-[#fe585f]/30 p-8 shadow-sm hover:shadow-md transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">📱 Affiliate Program</h3>
                <p className="text-sm text-gray-500">Influencers & Digital Creators</p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Transform your travel content into sustainable income. Earn through our affiliate program, get sponsored travel opportunities, and provide exclusive value to your audience with UNC rewards.              </p>

              <div className="mb-6">
                <p className="text-sm font-semibold text-[#fe585f] mb-3">Perfect for:</p>
                <ul className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <li className="flex items-center gap-2"><span>📝</span><span>Travel bloggers and vloggers</span></li>
                  <li className="flex items-center gap-2"><span>📣</span><span>Social media influencers</span></li>
                  <li className="flex items-center gap-2"><span>🎬</span><span>Digital content creators</span></li>
                  <li className="flex items-center gap-2"><span>📸</span><span>Photography enthusiasts</span></li>
                </ul>
              </div>

              {/* Illustration */}
              <div className="mt-6 rounded-xl border border-[#fe585f]/30 bg-[#fff0f0]/50 flex items-center justify-center p-4">
                <div className="relative w-full h-40 md:h-56">
                  <Image
                    src="/static/partnership/content-creation-91.svg"
                    alt="Content creation illustration"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Local Merchants Card */}
            <div className="rounded-2xl border border-[#fe585f]/30 p-8 shadow-sm hover:shadow-md transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">🏪 Merchant Collobration</h3>
                <p className="text-sm text-gray-500">Restaurants, Hotels & Experiences</p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Attract travelers to your business with our targeted marketing tools. Increase foot traffic, boost sales, and gain valuable exposure to our community of adventure seekers.              </p>

              <div className="mb-6">
                <p className="text-sm font-semibold text-[#fe585f] mb-3">Perfect for:</p>
                <ul className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <li className="flex items-center gap-2"><span>🍽️</span><span>Restaurants and cafes</span></li>
                  <li className="flex items-center gap-2"><span>🏨</span><span>Hotels and accommodations</span></li>
                  <li className="flex items-center gap-2"><span>🎟️</span><span> Experience providers</span></li>
                  <li className="flex items-center gap-2"><span>🧭</span><span> Local tour operators</span></li>
                </ul>
              </div>

              {/* Illustration */}
              <div className="mt-6 rounded-xl border border-[#fe585f]/30 bg-[#fff0f0]/50 flex items-center justify-center p-4">
                <div className="relative w-full h-40 md:h-56">
                  <Image
                    src="/static/partnership/online-store-10.svg"
                    alt="Online store illustration"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section (with Ant Design Steps) */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-[#fff7f7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-[#fe585f]">How we Work together</h2>
            <div className="mt-3 flex justify-center">
              <span className="inline-block h-1 w-24 bg-[#fe585f] rounded-full"></span>
            </div>
            <p className="mt-4 text-lg md:text-xl text-gray-700">You Apply, We Support, You Earn</p>
          </div>
          <ConfigProvider theme={{ token: { colorPrimary: '#fe585f' }, components: { Steps: { iconSize: 36 } } }}>
            {/* Track: Content Creators */}
            <div className="max-w-6xl mx-auto mb-14 reveal">
              <h3 className="text-lg font-semibold text-[#fe585f] mb-6">For Content Creators</h3>
              <div className="px-1">
                <Steps
                  current={0}
                  items={[
                    { status: 'wait', title: 'You Apply', description: 'Submit your profile and content expertise' },
                    { status: 'wait', title: 'We Amplify', description: 'AI matches your audience + global exposure + premium brand connections' },
                    { status: 'wait', title: 'You Monetize', description: 'Transform followers into sustainable income streams' }
                  ]}
                />
              </div>
            </div>
            {/* Track: Local Merchants */}
            <div className="max-w-6xl mx-auto reveal">
              <h3 className="text-lg font-semibold text-[#fe585f] mb-6">For Local Merchants</h3>
              <div className="px-1">
                <Steps
                  current={0}
                  items={[
                    { status: 'wait', title: 'You Apply', description: 'Share your business and unique experiences' },
                    { status: 'wait', title: 'We Connect', description: 'Target international travelers + featured placement + booking automation' },
                    { status: 'wait', title: 'You Scale', description: 'Convert visitors into loyal customers and recurring revenue' }
                  ]}
                />
              </div>
            </div>
          </ConfigProvider>
        </div>
      </section>

      {/* Success Stories Section (testimonials) */}
      <section id="stories" className="py-24 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-[#fe585f]">Success Stories</h2>
            <div className="mt-3 flex justify-center"><span className="inline-block h-1 w-16 bg-[#fe585f] rounded-full"></span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto reveal">
            {[
              {
                name: 'Emma Rodriguez',
                role: 'Travel Blogger',
                meta: '120K Followers',
                quote: 'Uniloco transformed my hobby into a full-time career. I\'ve doubled my income while creating content about places I love.',
                resultsTitle: 'Results in 6 months:',
                results: ['42% Conversion Rate', '35K EUR Earned', '8 Sponsored Trips']
              },
              {
                name: 'Bali Beach Cafe',
                role: 'Restaurant',
                meta: 'Seminyak, Bali',
                quote: 'Since joining Uniloco, we\'ve seen a 65% increase in foreign customers. The platform brings exactly the crowd we want.',
                resultsTitle: 'Results in 4 months:',
                results: ['+65% Foreign Customers', '12% Revenue Growth', '4.8/5 Rating']
              },
              {
                name: 'James Wilson',
                role: 'Travel Vlogger',
                meta: '350K Subscribers',
                quote: 'The analytics dashboard helps me understand what my audience loves. My engagement has never been higher.',
                resultsTitle: 'Results in 8 months:',
                results: ['28% Commission Rate', '120K EUR Earned', '15 Brand Collaborations']
              }
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border-t-4 border-[#fe585f] p-8">
                <div className="w-16 h-16 rounded-full bg-[#fff0f0] border border-[#fe585f]/30 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 text-center">{s.name}</h3>
                <p className="text-sm text-gray-500 text-center">{s.role}</p>
                {s.meta && (<p className="text-xs text-gray-500 text-center mb-4">{s.meta}</p>)}
                <p className="italic text-gray-700 text-center mb-4">“{s.quote}”</p>
                {s.resultsTitle && (<p className="text-xs text-gray-500 text-center mb-2">{s.resultsTitle}</p>)}
                <ul className="space-y-2 text-sm text-gray-700 mb-4">
                  {s.results.map((r, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#fe585f]">✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center text-yellow-500">⭐⭐⭐⭐⭐</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta" className="py-28 bg-white relative overflow-hidden">
        {/* faint illustration placeholder */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -left-10 w-80 h-80 rounded-full bg-[#fff7f7] blur-3xl" />
          <div className="absolute top-24 right-[-60px] w-[28rem] h-[28rem] rounded-full bg-[#fff7f7] blur-3xl" />
          <div className="absolute bottom-[-40px] left-1/3 w-[36rem] h-40 bg-[#fff7f7] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center reveal">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#fe585f] mb-6">Join 10,000+ partners already earning with Uniloco </h2>
            <p className="text-lg md:text-xl text-[#444] leading-relaxed mb-10">
              Every encounter is destiny&apos;s arrangement, every journey is the beginning of a legend. Join Uniloco and let&apos;s redefine the meaning of travel together!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="px-10 py-5 bg-[#fe585f] text-white rounded-xl text-lg md:text-xl font-bold shadow-xl hover:bg-[#e14b52] transition-colors">
                Apply Now
              </button>
              <button className="px-8 py-4 border-2 border-[#fe585f] text-[#fe585f] rounded-xl font-semibold hover:bg-[#fe585f] hover:text-white transition-colors">
                Learn More
              </button>
              <button className="px-8 py-4 border-2 border-[#fe585f] text-[#fe585f] rounded-xl font-semibold hover:bg-[#fe585f] hover:text-white transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>


      <DownloadSection />
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

        .reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
        .reveal.in-view { opacity: 1; transform: translateY(0); }
        /* Antd Steps size adjustments */
        :global(.ant-steps) { --step-title-size: 16px; --step-desc-size: 14px; }
        :global(.ant-steps .ant-steps-item-title) { font-size: var(--step-title-size); }
        :global(.ant-steps .ant-steps-item-description) { font-size: var(--step-desc-size); }
        :global(.ant-steps .ant-steps-item-icon) { width: 40px; height: 40px; }
        :global(.ant-steps .ant-steps-icon) { font-size: 18px; }
      `}</style>
    </main>
  );
}