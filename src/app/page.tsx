'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import DownloadSection from '@/components/features/DownloadSection';
import VideoPlayer from '@/components/features/VideoPlayer';

export default function IntroPage() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('home');
    const [isAnimating, setIsAnimating] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [bandImagesLoaded, setBandImagesLoaded] = useState<boolean[]>([false, false, false, false]);
    const [likedPosts, setLikedPosts] = useState<boolean[]>([false, false, false]);
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // 模拟加载完成
        setTimeout(() => {
            setIsLoading(false);
            // 延迟启动Hero动画
            setTimeout(() => {
                setHeroLoaded(true);
            }, 300);
        }, 1500);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Carousel auto-play
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 3000);

        return () => clearInterval(interval);
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
            audio.play().catch(() => { }); // 忽略可能的错误

            setTimeout(() => {
                button.classList.remove('downloading');
                alert('Download started! 🚀');
            }, 2000);
        }
    };



    const handleBandImageLoad = (index: number) => {
        setBandImagesLoaded(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleLikePost = (index: number) => {
        setLikedPosts(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });

        // 添加触觉反馈
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    };

    const handleDoubleClickLike = (index: number) => {
        if (!likedPosts[index]) {
            setLikedPosts(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
            });

            // 添加触觉反馈
            if ('vibrate' in navigator) {
                navigator.vibrate(100);
            }

            // 显示点赞动画
            const heart = document.createElement('div');
            heart.className = 'absolute inset-0 flex items-center justify-center text-6xl text-[#fe5a5e] pointer-events-none z-10 heart-beat';
            heart.innerHTML = '❤️';
            const card = document.querySelector(`[data-post-index="${index}"]`);
            if (card) {
                card.appendChild(heart);
                setTimeout(() => {
                    if (card.contains(heart)) {
                        card.removeChild(heart);
                    }
                }, 1300);
            }
        }
    };



    return (
        <div className="min-h-screen bg-[#fff] overflow-x-hidden relative">
            {/* Minimal mouse effect - removed for cleaner design */}

            {/* Loading Screen */}
            {isLoading && (
                <div className="fixed inset-0 bg-[#0B0B0B] z-[100] flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                        <h1 className="text-3xl font-bold mb-3">Uniloco</h1>
                        <p className="text-lg opacity-80">Loading your adventure...</p>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <Header 
                activeSection={activeSection}
                onNavigation={handleNavigation}
                navItems={['home', 'how-to', 'events', 'partnership', 'web3 hub']}
                forceWebDark={true}
            />

            {/* Hero Section */}
            {activeSection === 'home' && (
                <section className="hero-section pt-16 min-h-screen flex items-center relative overflow-hidden">
                    {/* Video Background */}
                    <div className="absolute inset-0 overflow-hidden">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source src="/video/travel_hero_video.webm" type="video/webm" />
                        </video>
                        
                        {/* Overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#1a0f0f]/70 to-black/75"></div>
                        
                        {/* Subtle geometric elements */}
                        <div className="absolute top-20 right-20 w-32 h-32 border border-white/20 rounded-full"></div>
                        <div className="absolute bottom-20 left-20 w-24 h-24 border border-[#fe5a5e]/30 rounded-full"></div>
                    </div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center space-y-5 lg:space-y-7">
                            {/* Main Slogan */}
                            <div className="space-y-2 lg:space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                                    <span className={`inline ${heroLoaded ? 'slide-in-left' : 'opacity-100'} text-white`}>Own Your&nbsp;</span>
                                    <span className={`inline ${heroLoaded ? 'slide-in-left-delay' : 'opacity-100'} text-[#fe5a5e]`}>Journey</span>
                                </h1>
                            </div>

                            {/* Subtitle */}
                            <h2 className={`text-lg md:text-xl lg:text-2xl text-white font-medium ${heroLoaded ? 'slide-in-left-delay-4' : 'opacity-0'}`}>
                                Your Ultimate Travel App
                            </h2>

                            {/* Description */}
                            <p className={`text-sm md:text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto ${heroLoaded ? 'slide-in-left-delay-5' : 'opacity-0'}`}>
                                Building the world&apos;s first decentralized travel ecosystem, powered by AI-driven personalization to craft unique adventures and unlock multiple earning streams.
                            </p>

                            <div className={`mt-4 ${heroLoaded ? 'slide-in-left-delay-6' : 'opacity-0'}`}>
                                <DownloadSection buttonOnly={true} textColor='#ffffff'/>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Features Carousel Section */}
            {activeSection === 'home' && (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#fe5a5e] mb-16">
                            Premium Travel Experience
                        </h2>

                        <div className="relative">
                            {/* Carousel Container */}
                            <div className="overflow-hidden">
                                <div 
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {[
                                        {
                                            title: 'AI-Powered Planning',
                                            description: 'Intelligent AI creates personalized travel routes and discovers unique travel experiences tailored to your preferences.',
                                            image: '/static/online_resource/ai_powered.png'
                                        },
                                        {
                                            title: 'Create Travel Stories',
                                            description: 'Create your exclusive travel stories, design 3D check-in routes, and earn rewards when others follow your paths.',
                                            image: '/static/online_resource/create_story.png'
                                        },
                                        {
                                            title: 'Social Travel',
                                            description: 'Team up for check-ins, collaborate on content creation, and share your exciting journeys with global travelers.',
                                            image: '/static/online_resource/social_travel.png'
                                        }
                                    ].map((feature, index) => (
                                        <div key={index} className="w-full flex-shrink-0">
                                            <div className="max-w-6xl mx-auto">
                                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                                        {/* Image Section */}
                                                        <div className="relative h-80 lg:h-[32rem]">
                                                            {feature.image ? (
                                                                <Image
                                                                    src={feature.image}
                                                                    alt={feature.title}
                                                                    fill
                                                                    className="object-cover"
                                                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                                                    priority={index === 0}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-gradient-to-br from-black to-[#111827]" />
                                                            )}
                                                            <div className="absolute inset-0 bg-black/20"></div>
                                                        </div>
                                                        
                                                        {/* Content Section */}
                                                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                                                            <h3 className="text-3xl font-bold mb-4 text-[#1F2937]">{feature.title}</h3>
                                                            <p className="text-lg text-[#6B7280] leading-relaxed">{feature.description}</p>
                                                            <button className="mt-6 px-6 py-3 bg-[#fe5a5e] text-white rounded-lg hover:bg-[#e14b52] transition-colors duration-300 w-fit">
                                                                Learn More
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Dots */}
                            <div className="flex justify-center mt-8 space-x-3">
                                {[0, 1, 2].map((index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            currentSlide === index 
                                                ? 'bg-[#fe5a5e] w-8' 
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300"
                            >
                                <span className="text-2xl text-[#fe5a5e]">‹</span>
                            </button>
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300"
                            >
                                <span className="text-2xl text-[#fe5a5e]">›</span>
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Video Section */}
            {activeSection === 'home' && (
                <section className="py-20 bg-gradient-to-br bg-[#fff]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#fe5a5e] mb-8">
                            Watch How Uniloco Works
                        </h2>
                        <p className="text-xl text-gray-600 mb-12">
                            Discover the revolutionary travel-to-earn ecosystem in action
                        </p>

                        <VideoPlayer
                            src="/video/uniloco.mov"
                            fallbackSrc="/video/uniloco.mov"
                            aspectRatio="h-[32rem] lg:h-[40rem]"
                            brightness={1.5}
                        />
                    </div>
                </section>
            )}


            {/* Testimonials Section */}
            {activeSection === 'home' && (
                <section className="py-20 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#fe5a5e] mb-8">
                        See how travelers are building amazing experiences                        </h2>
                        <p className="text-xl text-gray-600 text-center mb-16">
                            See how travelers are earning tokens and building amazing experiences
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    avatar: '☕',
                                    name: 'Maria Santos',
                                    username: '@cafe_prague',
                                    location: 'Prague, Czech Republic',
                                    time: '2 hours ago',
                                    likes: '892',
                                    comments: '45',
                                    shares: '23',
                                    content: 'My little coffee shop was struggling, almost ready to close after 3 slow months 😢 Then @SoloTraveler_Jake featured us in his Uniloco travel story "Hidden Prague Gems". In just 2 weeks, 180+ travelers found us through his route! Now we\'re busier than ever and I\'m earning from our partnership. Uniloco literally saved my business! 🙏 #Prague #CoffeeShop #TravelToEarn #Uniloco',
                                    image: '/static/real_pic1.png',
                                    earnings: '+2,450 Euro'
                                },
                                {
                                    avatar: '🌍',
                                    name: 'Emma Rodriguez',
                                    username: '@wanderlust_emma',
                                    location: 'Barcelona, Spain',
                                    time: '4 hours ago',
                                    likes: '1.5K',
                                    comments: '89',
                                    shares: '67',
                                    content: 'Just completed my 50th travel story on Uniloco! Started in my hometown Barcelona, now creating routes across Europe. Last month earned 2,800 EUR, met incredible people, and my "Barcelona Secret Spots" story has 1,200+ followers! Never thought my love for exploring could become my side income 💫 #Barcelona #TravelCreator #EUR #Europe',
                                    image: '/static/real_pic2.png',
                                    earnings: '+2,800 Euro'
                                },
                                {
                                    avatar: '💼',
                                    name: 'Alex Chen',
                                    username: '@designer_alex',
                                    location: 'Amsterdam, Netherlands',
                                    time: 'Yesterday',
                                    likes: '2.3K',
                                    comments: '156',
                                    shares: '89',
                                    content: 'Plot twist: Got hired as UX Designer at a travel startup because of my Uniloco portfolio! 🎉 The CEO saw my 3D travel stories and NFT designs, loved my creativity. Started as a hobby creating routes in Amsterdam, now it\'s my career! #CareerChange #UXDesign #Amsterdam #Uniloco',
                                    image: '/static/real_pic3.png',
                                    earnings: '+5,200 Euro'
                                }
                            ].map((post, index) => (
                                <div
                                    key={index}
                                    className="instagram-card group bg-white rounded-xl border border-gray-200 hover:border-[#fe5a5e] overflow-hidden"
                                >
                                    {/* Header */}
                                    <div className="flex items-center p-4 border-b border-gray-100">
                                        <div className="w-10 h-10 bg-[#fe5a5e] rounded-full flex items-center justify-center text-lg mr-3 text-white">
                                            {post.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <h4 className="font-semibold text-gray-900 text-sm">{post.name}</h4>
                                                <span className="ml-1 text-[#fe5a5e] text-xs">•</span>
                                                <span className="ml-1 text-[#fe5a5e] text-xs font-medium">{post.earnings}</span>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <span>{post.username}</span>
                                                <span className="mx-1">•</span>
                                                <span>{post.location}</span>
                                                <span className="mx-1">•</span>
                                                <span>{post.time}</span>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Image */}
                                    <div
                                        className="relative aspect-square bg-gray-100 cursor-pointer"
                                        onDoubleClick={() => handleDoubleClickLike(index)}
                                        data-post-index={index}
                                    >
                                        <Image
                                            src={post.image}
                                            alt="Travel story"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {/* Overlay with location */}
                                        <div className="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                                            📍 {post.location.split(',')[0]}
                                        </div>
                                        {/* Double-click hint */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                            <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                                                Double-click to like
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() => handleLikePost(index)}
                                                    className={`transition-all duration-300 transform hover:scale-110 ${likedPosts[index] ? 'text-[#fe5a5e]' : 'text-gray-600 hover:text-[#fe5a5e]'
                                                        }`}
                                                >
                                                    <svg className={`w-6 h-6 transition-all duration-300 ${likedPosts[index] ? 'fill-current animate-pulse' : 'fill-none'
                                                        }`} stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                </button>
                                                <button className="text-gray-600 hover:text-[#fe5a5e] transition-colors">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                </button>
                                                <button className="text-gray-600 hover:text-[#fe5a5e] transition-colors">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <button className="text-gray-600 hover:text-[#fe5a5e] transition-colors">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Likes */}
                                        <div className="text-sm font-semibold text-gray-900 mb-2">
                                            {post.likes} likes
                                        </div>

                                        {/* Content */}
                                        <div className="text-sm text-gray-900 mb-2">
                                            <span className="font-semibold">{post.username}</span>{' '}
                                            {post.content}
                                        </div>

                                        {/* Comments and time */}
                                        <div className="text-xs text-gray-500">
                                            View all {post.comments} comments • {post.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <div className={`${heroLoaded ? 'slide-in-left-delay-6' : 'opacity-0'}`}>
                <DownloadSection />
            </div>

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
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes heartBeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.3); }
          28% { transform: scale(1); }
          42% { transform: scale(1.3); }
          70% { transform: scale(1); }
        }
        
        .heart-beat {
          animation: heartBeat 1.3s ease-in-out;
        }
        
        .instagram-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .instagram-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
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
        
        .slide-in-left-delay-2 {
          animation: slideInLeft 1s ease-out 0.4s forwards;
          opacity: 0;
          transform: translateX(-100px);
        }
        
        .slide-in-left-delay-3 {
          animation: slideInLeft 1s ease-out 0.6s forwards;
          opacity: 0;
          transform: translateX(-100px);
        }
        
        .slide-in-left-delay-4 {
          animation: slideInLeft 0.8s ease-out 0.6s forwards;
          opacity: 0;
          transform: translateX(-100px);
        }
        
        .slide-in-left-delay-5 {
          animation: slideInLeft 0.8s ease-out 0.8s forwards;
          opacity: 0;
          transform: translateX(-100px);
        }
        
        .slide-in-left-delay-6 {
          animation: slideInLeft 0.8s ease-out 1s forwards;
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
        
        /* Glow effect for stats */
        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from {
            text-shadow: 0 0 5px rgba(254, 88, 95, 0.5), 0 0 10px rgba(254, 88, 95, 0.3);
          }
          to {
            text-shadow: 0 0 10px rgba(254, 88, 95, 0.8), 0 0 20px rgba(254, 88, 95, 0.5);
          }
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        /* 视频播放器优化 */
        video {
          border-radius: 1rem;
          background: transparent;
        }
        
        /* 移除默认的黑色背景 */
        video::-webkit-media-controls {
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 0 0 1rem 1rem;
        }
        
        video::-webkit-media-controls-panel {
          background-color: rgba(0, 0, 0, 0.3);
        }
        
        video::-webkit-media-controls-play-button {
          background-color: rgba(254, 88, 95, 0.9);
          border-radius: 50%;
          color: white;
        }
        
        video::-webkit-media-controls-timeline {
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 2px;
        }
        
        video::-webkit-media-controls-current-time-display,
        video::-webkit-media-controls-time-remaining-display {
          color: white;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        }
        
        /* 确保视频没有额外的黑色背景 */
        video::-webkit-media-controls-enclosure {
          background: transparent;
        }
        
        /* Firefox 视频控件样式 */
        video::-moz-media-controls {
          background-color: rgba(0, 0, 0, 0.3);
        }
        
        /* 确保视频在移动端也能正常显示 */
        @media (max-width: 768px) {
          video {
            width: 100%;
            height: auto;
            max-height: 300px;
          }
        }
        
        /* 手环图片优化 */
        .band-image-container {
          position: relative;
          width: 128px;
          height: 128px;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .band-image-container img {
          transition: transform 0.3s ease;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        
        .band-image-container:hover img {
          transform: scale(1.05);
        }
        
        .band-image-container:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        
        @media (max-width: 768px) {
          .band-image-container {
            width: 96px;
            height: 96px;
          }
        }
      `}</style>
        </div>
    );
}
