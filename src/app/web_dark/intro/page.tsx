'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/ui/Header';

export default function IntroPage() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('home');
    const [isAnimating, setIsAnimating] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [videoLoadingTimeout, setVideoLoadingTimeout] = useState<NodeJS.Timeout | null>(null);
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
            }, 500);
        }, 2000);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Carousel auto-play
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 4);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // 视频加载超时处理
    useEffect(() => {
        if (!videoLoaded && !videoError) {
            const timeout = setTimeout(() => {
                console.log('Video loading timeout - forcing error state');
                setVideoError(true);
                setVideoLoaded(false);
            }, 30000); // 30秒超时，给视频更多时间加载

            setVideoLoadingTimeout(timeout);

            return () => {
                if (timeout) clearTimeout(timeout);
            };
        }
    }, [videoLoaded, videoError]);

    // 强制视频加载检测
    useEffect(() => {
        const checkVideoLoad = () => {
            const video = document.querySelector('video') as HTMLVideoElement;
            if (video) {
                console.log('Video element found, ready state:', video.readyState);
                if (video.readyState >= 2) { // HAVE_CURRENT_DATA
                    console.log('Video ready state:', video.readyState);
                    setVideoLoaded(true);
                    setVideoError(false);
                } else {
                    // 如果视频还没准备好，继续检查
                    setTimeout(checkVideoLoad, 1000);
                }
            } else {
                // 如果视频元素还没找到，继续检查
                setTimeout(checkVideoLoad, 500);
            }
        };

        // 延迟检查视频状态
        const timer = setTimeout(checkVideoLoad, 1000);

        return () => clearTimeout(timer);
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

    const handleVideoPlay = () => {
        setIsVideoPlaying(true);
        // 模拟触觉反馈
        if ('vibrate' in navigator) {
            navigator.vibrate(100);
        }
    };

    const handleVideoPause = () => {
        setIsVideoPlaying(false);
    };

    const handleVideoLoad = () => {
        console.log('Video loaded successfully');
        setVideoLoaded(true);
        setVideoError(false);

        // 清除加载超时
        if (videoLoadingTimeout) {
            clearTimeout(videoLoadingTimeout);
            setVideoLoadingTimeout(null);
        }
    };

    const handleVideoCanPlay = () => {
        console.log('Video can play');
        setVideoLoaded(true);
        setVideoError(false);
    };

    const handlePlayButtonClick = () => {
        const video = document.querySelector('video') as HTMLVideoElement;
        if (video) {
            console.log('Play button clicked, attempting to play video');

            // 添加触觉反馈
            if ('vibrate' in navigator) {
                navigator.vibrate(100);
            }

            video.play().then(() => {
                console.log('Video started playing');
                setIsVideoPlaying(true);
            }).catch((error) => {
                console.error('Failed to play video:', error);
                // 如果自动播放失败，显示友好的提示
                const playButton = document.querySelector('.play-button') as HTMLElement;
                if (playButton) {
                    playButton.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        playButton.style.animation = '';
                    }, 500);
                }

                // 显示提示信息
                const message = document.createElement('div');
                message.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#212743] text-white px-4 py-2 rounded-lg z-50';
                message.textContent = 'Click the play button in video controls to start playback';
                document.body.appendChild(message);

                setTimeout(() => {
                    document.body.removeChild(message);
                }, 3000);
            });
        }
    };

    const handleVideoDoubleClick = () => {
        const video = document.querySelector('video') as HTMLVideoElement;
        if (video && video.requestFullscreen) {
            video.requestFullscreen().catch((error) => {
                console.log('Fullscreen request failed:', error);
            });
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
            heart.className = 'absolute inset-0 flex items-center justify-center text-6xl text-[#212743] pointer-events-none z-10 heart-beat';
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

    const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        console.error('Video error:', e);
        setVideoError(true);
        setVideoLoaded(false);

        // 清除加载超时
        if (videoLoadingTimeout) {
            clearTimeout(videoLoadingTimeout);
            setVideoLoadingTimeout(null);
        }
    };

    const handleVideoRetry = () => {
        console.log('Retrying video load...');
        setVideoError(false);
        setVideoLoaded(false);
        // 重新加载视频
        const video = document.querySelector('video') as HTMLVideoElement;
        if (video) {
            video.load();
            // 强制触发加载事件
            setTimeout(() => {
                if (!videoLoaded && !videoError) {
                    console.log('Video still not loaded after retry');
                }
            }, 5000);
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
                navItems={['home', 'how-to', 'web3 hub', 'partnership']}
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
                            <source src="/video/hero_video.webm" type="video/webm" />
                        </video>
                        
                        {/* Overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/70 via-[#000000]/60 to-[#000000]/70"></div>
                        
                        {/* Subtle geometric elements */}
                        <div className="absolute top-20 right-20 w-32 h-32 border border-white/20 rounded-full"></div>
                        <div className="absolute bottom-20 left-20 w-24 h-24 border border-[#D97706]/30 rounded-full"></div>
                    </div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center space-y-6 lg:space-y-8">
                            {/* Main Slogan */}
                            <div className="space-y-3 lg:space-y-6">
                                <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight">
                                    <span className={`block ${heroLoaded ? 'slide-in-left' : 'opacity-100'} text-white text-5xl md:text-7xl lg:text-8xl xl:text-9xl`}>Own Your Journey</span>
                                </h1>
                            </div>

                            {/* Subtitle */}
                            <h2 className={`text-xl md:text-2xl lg:text-3xl text-white font-medium ${heroLoaded ? 'slide-in-left-delay-4' : 'opacity-0'}`}>
                                The World&apos;s First Travel-to-Earn Platform
                            </h2>

                            {/* Description */}
                            <p className={`text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto ${heroLoaded ? 'slide-in-left-delay-5' : 'opacity-0'}`}>
                                Experience luxury travel with Dragon Pass benefits, powered by AI-driven personalization and blockchain technology.
                            </p>

                            {/* Action Buttons */}
                            <div className={`flex flex-col sm:flex-row gap-6 justify-center ${heroLoaded ? 'slide-in-left-delay-6' : 'opacity-0'}`}>
                                <button
                                    onClick={() => handleNavigation('how-to')}
                                    className="px-8 lg:px-12 py-4 lg:py-5 bg-[#212743] text-white font-semibold text-lg lg:text-xl rounded-lg hover:bg-[#2A2F52] transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <span className="flex items-center space-x-3">
                                        <span>✈️</span>
                                        <span>Explore Platform</span>
                                    </span>
                                </button>

                                <button
                                    onClick={handleDownload}
                                    className="px-8 lg:px-12 py-4 lg:py-5 border-2 border-[#D97706] text-[#D97706] font-semibold text-lg lg:text-xl rounded-lg hover:bg-[#D97706] hover:text-white transition-all duration-300"
                                >
                                    <span className="flex items-center space-x-3">
                                        <span>📱</span>
                                        <span>Get Started</span>
                                    </span>
                                </button>
                            </div>

                            {/* Stats */}
                            <div className={`flex gap-8 lg:gap-12 justify-center mt-12 ${heroLoaded ? 'slide-in-right' : 'opacity-0'}`}>
                                <div className="text-center">
                                    <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2">50K+</div>
                                    <div className="text-sm lg:text-base text-white/80 font-medium">Global Travelers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#D97706] mb-2">1M+</div>
                                    <div className="text-sm lg:text-base text-white/80 font-medium">UNC Tokens Earned</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2">100+</div>
                                    <div className="text-sm lg:text-base text-white/80 font-medium">Countries</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Features Carousel Section */}
            {activeSection === 'home' && (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#212743] mb-16">
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
                                            image: '/static/ai_powered.webp'
                                        },
                                        {
                                            title: 'Create Travel Stories',
                                            description: 'Create your exclusive travel stories, design 3D check-in routes, and earn UNC rewards when others follow your paths.',
                                            image: '/static/travel_story.webp'
                                        },
                                        {
                                            title: 'Social Travel',
                                            description: 'Team up for check-ins, collaborate on content creation, and share your exciting journeys with global travelers.',
                                            image: '/static/social_travel.webp'
                                        },
                                        {
                                            title: 'Earn While Travel',
                                            description: 'Earn UNC rewards with every check-in. Turn your travel adventures into a rewarding mining experience.',
                                            image: '/static/earn_euro.webp'
                                        }
                                    ].map((feature, index) => (
                                        <div key={index} className="w-full flex-shrink-0">
                                            <div className="max-w-4xl mx-auto">
                                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                                        {/* Image Section */}
                                                        <div className="relative h-64 lg:h-96">
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
                                                                <div className="w-full h-full bg-gradient-to-br from-[#111827] to-[#1F2937]" />
                                                            )}
                                                            <div className="absolute inset-0 bg-black/20"></div>
                                                        </div>
                                                        
                                                        {/* Content Section */}
                                                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                                                            <h3 className="text-3xl font-bold mb-4 text-[#1F2937]">{feature.title}</h3>
                                                            <p className="text-lg text-[#6B7280] leading-relaxed">{feature.description}</p>
                                                            <button className="mt-6 px-6 py-3 bg-[#212743] text-white rounded-lg hover:bg-[#2A2F52] transition-colors duration-300 w-fit">
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
                                {[0, 1, 2, 3].map((index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            currentSlide === index 
                                                ? 'bg-[#212743] w-8' 
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev - 1 + 4) % 4)}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300"
                            >
                                <span className="text-2xl text-[#212743]">‹</span>
                            </button>
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev + 1) % 4)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300"
                            >
                                <span className="text-2xl text-[#212743]">›</span>
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Video Section */}
            {activeSection === 'home' && (
                <section className="py-20 bg-gradient-to-br bg-[#fff]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#212743] mb-8">
                            See Uniloco in Action
                        </h2>
                        <p className="text-xl text-gray-600 mb-12">
                            Discover the revolutionary travel-to-earn ecosystem in action
                        </p>

                        <div className="relative group">
                            <div
                                className="w-full h-96 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 overflow-hidden bg-transparent cursor-pointer"
                                onClick={handlePlayButtonClick}
                            >
                                {/* 简化的视频加载状态 - 只在最初显示 */}
                                {!videoLoaded && !videoError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#0B0B0B] z-10">
                                        <div className="text-center text-white">
                                            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                            <p className="text-lg font-semibold">Loading Video...</p>
                                            <p className="text-sm opacity-80 mt-2">Please wait...</p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setVideoLoaded(true);
                                                }}
                                                className="mt-4 px-4 py-2 bg-white text-[#212743] rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all duration-300"
                                            >
                                                Skip Loading
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* 视频错误状态 */}
                                {videoError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#0B0B0B] z-10">
                                        <div className="text-center text-white">
                                            <div className="text-6xl mb-4">⚠️</div>
                                            <p className="text-lg font-semibold mb-2">Video Unavailable</p>
                                            <p className="text-sm opacity-80 mb-4">Please try again later</p>
                                            <button
                                                onClick={handleVideoRetry}
                                                className="px-6 py-2 bg-white text-[#212743] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
                                            >
                                                🔄 Retry
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* 视频播放器 */}
                                <video
                                    className="w-full h-full object-cover rounded-2xl"
                                    controls
                                    preload="auto"
                                    playsInline
                                    onPlay={handleVideoPlay}
                                    onPause={handleVideoPause}
                                    onEnded={handleVideoPause}
                                    onLoadedData={handleVideoLoad}
                                    onCanPlay={handleVideoCanPlay}
                                    onError={handleVideoError}
                                    onLoadStart={() => console.log('Video load started')}
                                    onDoubleClick={handleVideoDoubleClick}
                                >
                                    <source src="/video/uniloco.mov" type="video/quicktime" />
                                    <source src="/video/uniloco.mov" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>



                                {!isVideoPlaying && videoLoaded && !videoError && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-all duration-300 cursor-pointer z-20"
                                        onClick={handlePlayButtonClick}
                                    >
                                        <div className="play-button w-24 h-24 bg-white/95 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 shadow-lg hover:bg-white">
                                            ▶️
                                        </div>
                                        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                            Click to Play
                                        </div>
                                    </div>
                                )}



                                {isVideoPlaying && videoLoaded && !videoError && (
                                    <div className="absolute top-4 right-4 bg-[#2563EB] text-white px-3 py-1 rounded-full text-sm font-semibold z-20">
                                        ▶️ Playing
                                    </div>
                                )}

                                {videoLoaded && !videoError && (
                                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs z-20">
                                        Double-click for fullscreen
                                    </div>
                                )}
                            </div>


                            <div className="mt-6 text-center">
                                <p className="text-gray-600 italic mb-2">
                                    See AI personalization, 3D travel stories, NFT bands, and UNC earning in action
                                </p>
                                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                                    <span>🎬 HD Quality</span>
                                    <span>⏱️ 2:30 min</span>
                                    <span>🔊 With Audio</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Travel Bands Section */}
            {activeSection === 'home' && (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2563EB] mb-4">
                            Travel Band NFTs
                        </h2>
                        <p className="text-xl text-gray-600 text-center mb-16">
                            Using UNC/ANT, level up your Travel Band and unlock greater rewards
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    image: '/static/band1.jpg',
                                    name: 'Basic Band',
                                    price: 'Free to Get',
                                    boost: '+10%',
                                    action: 'Free Mint',
                                },
                                {
                                    image: '/static/band2.jpg',
                                    name: 'Rare Band',
                                    price: '100 UNC',
                                    boost: '+25%',
                                    action: 'Mint Now',
                                    gradient: 'from-blue-400 to-blue-600'
                                },
                                {
                                    image: '/static/band3.jpg',
                                    name: 'Epic Band',
                                    price: '500 UNC',
                                    boost: '+50%',
                                    action: 'Mint Now',
                                    gradient: 'from-orange-400 to-orange-600'
                                },
                                {
                                    image: '/static/band4.jpg',
                                    name: 'Legendary Band',
                                    price: 'Rare Drop',
                                    boost: '+100%',
                                    action: 'Coming Soon',
                                    gradient: 'from-[#1E3A8A] to-[#3B82F6]'
                                }
                            ].map((band, index) => (
                                <div
                                    key={index}
                                    className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#2563EB] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center"
                                >
                                    <div
                                        className="band-image-container mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto relative"
                                    >
                                        {/* 加载状态指示器 */}
                                        {!bandImagesLoaded[index] && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                        <Image
                                            src={band.image}
                                            alt={band.name}
                                            fill
                                            className="object-contain p-3"
                                            priority={index < 2}
                                            sizes="(max-width: 768px) 96px, 128px"
                                            onLoad={() => handleBandImageLoad(index)}
                                            onError={() => console.error(`Failed to load image: ${band.image}`)}
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{band.name}</h3>
                                    <p className="text-[#2563EB] font-semibold mb-2">{band.price}</p>
                                    <p className="text-gray-600 mb-6">Base UNC Boost {band.boost}</p>
                                    <button className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${band.action === 'Coming Soon'
                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                        : 'bg-[#2563EB] text-white hover:bg-[#7C3AED] hover:scale-105'
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
                                <div className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#1E3A8A] transition-all duration-300 hover:shadow-lg">
                                    <div className="text-4xl font-bold text-[#1E3A8A] mb-2 animate-glow">50K+</div>
                                    <div className="text-gray-600">Active Travelers</div>
                                </div>
                                <div className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#1E3A8A] transition-all duration-300 hover:shadow-lg">
                                    <div className="text-4xl font-bold text-[#1E3A8A] mb-2 animate-glow">1M+</div>
                                    <div className="text-gray-600">UNC Tokens Earned</div>
                                </div>
                                <div className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#1E3A8A] transition-all duration-300 hover:shadow-lg">
                                    <div className="text-4xl font-bold text-[#1E3A8A] mb-2 animate-glow">200+</div>
                                    <div className="text-gray-600">Cities Covered</div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleNavigation('marketplace')}
                                className="game-button px-8 py-4 bg-[#2563EB] text-white font-bold text-lg rounded-full hover:bg-[#7C3AED] transform hover:scale-105 transition-all duration-300"
                            >
                                Explore Marketplace
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials Section */}
            {activeSection === 'home' && (
                <section className="py-20 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2563EB] mb-8">
                            Real Stories from Our Community
                        </h2>
                        <p className="text-xl text-gray-600 text-center mb-16">
                            See how travelers are earning UNC tokens and building amazing experiences
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
                                    content: 'My little coffee shop was struggling, almost ready to close after 3 slow months 😢 Then @SoloTraveler_Jake featured us in his Uniloco travel story "Hidden Prague Gems". In just 2 weeks, 180+ travelers found us through his route! Now we\'re busier than ever and I\'m earning UNC from our partnership. Uniloco literally saved my business! 🙏 #Prague #CoffeeShop #TravelToEarn #Uniloco',
                                    image: '/static/real_pic1.png',
                                    earnings: '+2,450 UNC'
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
                                    content: 'Just completed my 50th travel story on Uniloco! Started in my hometown Barcelona, now creating routes across Europe. Last month earned 2,800 UNC, met incredible people, and my "Barcelona Secret Spots" story has 1,200+ followers! Never thought my love for exploring could become my side income 💫 #Barcelona #TravelCreator #UNC #Europe',
                                    image: '/static/real_pic2.png',
                                    earnings: '+2,800 UNC'
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
                                    earnings: '+5,200 UNC'
                                }
                            ].map((post, index) => (
                                <div
                                    key={index}
                                    className="instagram-card group bg-white rounded-xl border border-gray-200 hover:border-[#2563EB] overflow-hidden"
                                >
                                    {/* Header */}
                                    <div className="flex items-center p-4 border-b border-gray-100">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center text-lg mr-3">
                                            {post.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <h4 className="font-semibold text-gray-900 text-sm">{post.name}</h4>
                                                <span className="ml-1 text-[#2563EB] text-xs">•</span>
                                                <span className="ml-1 text-[#2563EB] text-xs font-medium">{post.earnings}</span>
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
                                                    className={`transition-all duration-300 transform hover:scale-110 ${likedPosts[index] ? 'text-[#2563EB]' : 'text-gray-600 hover:text-[#2563EB]'
                                                        }`}
                                                >
                                                    <svg className={`w-6 h-6 transition-all duration-300 ${likedPosts[index] ? 'fill-current animate-pulse' : 'fill-none'
                                                        }`} stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                </button>
                                                <button className="text-gray-600 hover:text-[#2563EB] transition-colors">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                </button>
                                                <button className="text-gray-600 hover:text-[#2563EB] transition-colors">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <button className="text-gray-600 hover:text-[#2563EB] transition-colors">
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
