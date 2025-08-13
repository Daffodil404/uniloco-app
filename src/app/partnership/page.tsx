// app/page.tsx
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

export default function PartnershipPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll events for navbar and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-[#fe585f] font-bold text-xl">Uniloco</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'types', 'how-it-works', 'stories', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-medium transition-colors hover:text-[#fe585f] ${
                  activeSection === item ? 'text-[#fe585f]' : 'text-gray-700'
                }`}
              >
                {item.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('cta')}
              className="bg-[#fe585f] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#e64a51] transition-all transform hover:-translate-y-0.5"
            >
              Apply Now
            </button>
          </div>
          
          <button className="md:hidden text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home"
        className="bg-gradient(135deg, #fe585f 0%, #ff7a82 100%) text-white pt-32 pb-20 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Partner with Uniloco
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-light">
              Join the Travel-to-Earn Revolution
            </p>
            <p className="text-lg mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
              Whether you're an influencer with a passionate audience or a local business wanting to attract travelers, 
              Uniloco offers proven partnership programs that drive real results and sustainable income.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { icon: <TrendingUp size={32} />, title: 'Proven Results', desc: 'Partners average 40-60% revenue increase within 3 months' },
                { icon: <Globe size={32} />, title: 'Global Reach', desc: 'Access to 50K+ active travelers across 150+ countries' },
                { icon: <DollarSign size={32} />, title: 'Multiple Revenue Streams', desc: 'Earn through commissions, UNC tokens, and exclusive opportunities' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mb-4 text-white">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="w-full h-16 md:h-24 text-white"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,165.07,111.28,321.39,56.44Z" 
              fill="currentColor">
            </path>
          </svg>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section id="types" className="py-20 bg-gradient(135deg, #fff5f5 0%, #ffebeb 100%)">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#fe585f] mb-4">Two Partnership Programs</h2>
            <p className="text-gray-600 text-lg">
              Choose the program that matches your expertise and start earning with Uniloco's ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Influencer Program */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#fe585f] group">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#fe585f] text-white text-sm font-semibold px-4 py-1 rounded-full">
                Most Popular
              </div>
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient(135deg, #fe585f, #ff7a82) rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Smartphone size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#fe585f] text-center mb-2">Content Creators</h3>
                <p className="text-gray-500 text-center">Influencers & Digital Creators</p>
              </div>
              
              <p className="text-gray-600 text-center mb-8 leading-relaxed">
                Transform your travel content into sustainable income. Earn through our affiliate program, 
                get sponsored travel opportunities, and provide exclusive value to your audience with UNC rewards.
              </p>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-[#fe585f] mb-4 text-center">💎 Creator Benefits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      className="flex items-start p-3 bg-gray-50 rounded-xl hover:bg-[#fff5f5] transition-colors duration-200"
                    >
                      <div className="mr-3 mt-0.5 w-5 h-5 bg-[#fe585f] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      <p className="text-sm text-gray-600">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#fff5f5] p-5 rounded-2xl border-l-4 border-[#fe585f] mb-8">
                <h4 className="font-semibold text-[#fe585f] mb-3">Requirements</h4>
                <ul className="space-y-2">
                  {[
                    'Minimum 10K followers on at least one platform',
                    'High-quality travel or lifestyle content',
                    'Active engagement with your audience',
                    'Alignment with Uniloco brand values'
                  ].map((req, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="text-[#fe585f] mr-2">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-gradient(135deg, #fe585f, #ff7a82) text-white py-3 px-6 rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-[#fe585f]/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                Apply Now <ArrowRight size={18} />
              </button>
            </div>

            {/* Merchant Program */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#fe585f] group">
              <div className="w-20 h-20 bg-gradient(135deg, #fe585f, #ff7a82) rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Store size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#fe585f] text-center mb-2">Local Merchants</h3>
              <p className="text-gray-500 text-center mb-8">Restaurants, Hotels & Experiences</p>
              
              <p className="text-gray-600 text-center mb-8 leading-relaxed">
                Attract travelers to your business with our targeted marketing tools. Increase foot traffic, 
                boost sales, and gain valuable exposure to our community of global explorers.
              </p>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-[#fe585f] mb-4 text-center">💎 Merchant Benefits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      className="flex items-start p-3 bg-gray-50 rounded-xl hover:bg-[#fff5f5] transition-colors duration-200"
                    >
                      <div className="mr-3 mt-0.5 w-5 h-5 bg-[#fe585f] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      <p className="text-sm text-gray-600">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#fff5f5] p-5 rounded-2xl border-l-4 border-[#fe585f] mb-8">
                <h4 className="font-semibold text-[#fe585f] mb-3">Requirements</h4>
                <ul className="space-y-2">
                  {[
                    'Registered business with valid licenses',
                    'Physical location open to the public',
                    'High customer satisfaction ratings',
                    'Ability to accept digital payments'
                  ].map((req, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="text-[#fe585f] mr-2">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-gradient(135deg, #fe585f, #ff7a82) text-white py-3 px-6 rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-[#fe585f]/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                Join Our Network <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#fe585f] mb-4">How Partnership Works</h2>
            <p className="text-gray-600 text-lg">
              A simple 4-step process to start earning with Uniloco's partnership ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient(135deg, #fff5f5 0%, #ffebeb 100%) rounded-3xl p-8 border border-[#fe585f]/10">
              <h3 className="text-2xl font-bold text-[#fe585f] text-center mb-8">For Content Creators</h3>
              
              <ul className="space-y-6">
                {[
                  {
                    step: 1,
                    title: 'Submit Your Application',
                    desc: 'Fill out our simple application form with your details and social media profiles'
                  },
                  {
                    step: 2,
                    title: 'Get Approved',
                    desc: 'Our team reviews your application and approves within 3-5 business days'
                  },
                  {
                    step: 3,
                    title: 'Receive Your Tools',
                    desc: 'Get access to your affiliate dashboard, tracking links, and creative assets'
                  },
                  {
                    step: 4,
                    title: 'Start Earning',
                    desc: 'Create content, share your links, and earn commissions on every successful referral'
                  }
                ].map((step) => (
                  <li key={step.step} className="flex items-start p-4 bg-white rounded-xl border border-transparent hover:border-[#fe585f]/30 transition-all duration-300 hover:translate-x-2">
                    <div className="w-8 h-8 bg-gradient(135deg, #fe585f, #ff7a82) rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#fe585f] mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient(135deg, #fff5f5 0%, #ffebeb 100%) rounded-3xl p-8 border border-[#fe585f]/10">
              <h3 className="text-2xl font-bold text-[#fe585f] text-center mb-8">For Local Merchants</h3>
              
              <ul className="space-y-6">
                {[
                  {
                    step: 1,
                    title: 'Create Your Business Profile',
                    desc: 'Sign up and provide details about your business, offerings, and location'
                  },
                  {
                    step: 2,
                    title: 'Verify Your Business',
                    desc: 'Complete our verification process to ensure quality for our users'
                  },
                  {
                    step: 3,
                    title: 'Set Up Your Offers',
                    desc: 'Create special deals and promotions exclusively for Uniloco users'
                  },
                  {
                    step: 4,
                    title: 'Welcome Travelers',
                    desc: 'Start receiving customers through the platform and track your performance'
                  }
                ].map((step) => (
                  <li key={step.step} className="flex items-start p-4 bg-white rounded-xl border border-transparent hover:border-[#fe585f]/30 transition-all duration-300 hover:translate-x-2">
                    <div className="w-8 h-8 bg-gradient(135deg, #fe585f, #ff7a82) rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#fe585f] mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="stories" className="py-20 bg-gradient(135deg, #ffebeb 0%, #fff5f5 100%)">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#fe585f] mb-4">Success Stories</h2>
            <p className="text-gray-600 text-lg">
              See how our partners are growing their businesses with Uniloco
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                type: 'Creator',
                name: 'Emma Rodriguez',
                details: 'Travel Blogger • 120K Followers',
                quote: 'Uniloco transformed my hobby into a full-time career. I\'ve doubled my income while creating content about places I love.',
                metrics: ['42% Conversion Rate', '35K UNC Earned', '8 Sponsored Trips']
              },
              {
                type: 'Merchant',
                name: 'Bali Beach Cafe',
                details: 'Restaurant • Seminyak, Bali',
                quote: 'Since joining Uniloco, we\'ve seen a 65% increase in foreign customers. The platform brings exactly the crowd we want.',
                metrics: ['+65% Foreign Customers', '12% Revenue Growth', '4.8/5 Rating']
              },
              {
                type: 'Creator',
                name: 'James Wilson',
                details: 'Travel Vlogger • 350K Subscribers',
                quote: 'The analytics dashboard helps me understand what my audience loves. My engagement has never been higher.',
                metrics: ['28% Commission Rate', '120K UNC Earned', '15 Brand Collaborations']
              }
            ].map((story, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#fe585f]/30 relative group hover:-translate-y-2"
              >
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-[#fe585f] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {story.type}
                </div>
                
                <div className="w-12 h-12 bg-gradient(135deg, #fe585f, #ff7a82) rounded-full flex items-center justify-center mb-4 text-white text-xl font-bold">
                  {story.name.charAt(0)}
                </div>
                
                <h3 className="text-xl font-bold text-[#fe585f] mb-1">{story.name}</h3>
                <p className="text-[#fe585f]/70 text-sm mb-4">{story.details}</p>
                
                <p className="text-gray-600 italic mb-6 text-sm leading-relaxed">"{story.quote}"</p>
                
                <div className="flex flex-wrap gap-2">
                  {story.metrics.map((metric, i) => (
                    <span key={i} className="bg-[#fff5f5] text-[#fe585f] text-xs px-3 py-1 rounded-full font-medium">
                      {metric}
                    </span>
                  ))}
                </div>
                
                <div className="flex mt-4 text-[#fe585f]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#fe585f" stroke="#fe585f" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#fe585f] mb-4">Get In Touch</h2>
            <p className="text-gray-600 text-lg">
              Have questions about our partnership programs? Our team is here to help
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Mail size={24} />,
                title: 'Email Us',
                desc: 'Send us your questions and we\'ll get back to you within 24 hours',
                btnText: 'Send Message'
              },
              {
                icon: <MessageCircle size={24} />,
                title: 'Live Chat',
                desc: 'Chat with our partnership specialists in real-time during business hours',
                btnText: 'Start Chat'
              },
              {
                icon: <MapPin size={24} />,
                title: 'Visit Us',
                desc: 'Drop by our offices for a face-to-face consultation about partnerships',
                btnText: 'See Locations'
              }
            ].map((contact, index) => (
              <div 
                key={index}
                className="bg-gradient(135deg, #fff5f5 0%, #ffebeb 100%) rounded-3xl p-8 text-center border border-[#fe585f]/10 hover:border-[#fe585f]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient(135deg, #fe585f, #ff7a82) rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  {contact.icon}
                </div>
                
                <h3 className="text-xl font-bold text-[#fe585f] mb-3">{contact.title}</h3>
                <p className="text-gray-600 mb-6 text-sm">{contact.desc}</p>
                
                <button className="bg-[#fe585f] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#ff7a82] transition-colors duration-300">
                  {contact.btnText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 bg-gradient(135deg, #fe585f 0%, #ff7a82 100%) text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Revolution?</h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Start earning more with your travel content or attract more customers to your business. 
              Join hundreds of successful partners already growing with Uniloco.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#fe585f] px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg hover:shadow-white/20 transition-all duration-300 transform hover:-translate-y-1">
                Apply as Creator
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                Join as Merchant
              </button>
            </div>
            
            <div className="mt-12 flex justify-center items-center text-white/80 text-sm">
              <span>Have questions?</span>
              <button className="ml-2 text-white underline hover:text-white/90">Schedule a call <ChevronDown size={16} className="inline ml-1" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-[#fe585f] mb-4">Uniloco</h3>
              <p className="text-gray-400 text-sm">
                The world's first travel-to-earn platform connecting travelers, creators, and local businesses.
              </p>
            </div>
            
            {[
              {
                title: 'Programs',
                links: ['Creator Program', 'Merchant Program', 'Affiliate Program', 'Referral Program']
              },
              {
                title: 'Resources',
                links: ['Help Center', 'Guides', 'Success Stories', 'Blog']
              },
              {
                title: 'Company',
                links: ['About Us', 'Careers', 'Press', 'Contact']
              }
            ].map((col, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4 text-gray-300">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-400 hover:text-[#fe585f] text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2023 Uniloco. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Terms', 'Privacy', 'Cookies'].map((item) => (
                <a key={item} href="#" className="text-gray-500 hover:text-[#fe585f] text-sm transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}