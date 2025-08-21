'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/ui/Header';

export default function HowToPlayPage() {
    const [activeSection, setActiveSection] = useState('how-to');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100);
    }, []);

    const handleNavigation = (section: string) => {
        setActiveSection(section);
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
    };

    const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        console.error('Video error:', e);
        setVideoError(true);
        setVideoLoaded(false);
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
            });
        }
    };

    const steps = [
        {
            number: 1,
            icon: '🎯',
            title: 'Share your preferences',
            description: 'Tell us about your travel style, interests, and what you want to experience on your journey.',
        },
        {
            number: 2,
            icon: '🤖',
            title: 'AI generates your itinerary',
            description: 'Our intelligent AI creates a personalized travel plan based on your preferences and local insights.',
        },
        {
            number: 3,
            icon: '❤️',
            title: 'Add your favorite activities',
            description: 'Browse through the AI suggestions and add the activities that excite you most to your itinerary.',
        },
        {
            number: 4,
            icon: '✅',
            title: 'Review details and finalize your trip',
            description: 'Review your complete itinerary, make any final adjustments, and confirm your perfect travel plan.',
        },
    ];

    return (
        <div className="min-h-screen bg-white overflow-x-hidden relative">
            {/* Header */}
            <Header
                activeSection={activeSection}
                onNavigation={handleNavigation}
                navItems={['home', 'how-to', 'web3 hub', 'partnership']}
            />

            {/* Hero Section */}
            <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-[#fe5a5e]/10 rounded-full animate-bounce"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 bg-[#fe5a5e]/15 rounded-full animate-pulse"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Side - Steps Content */}
                        <div className="flex-1 text-left space-y-8">
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    <span className="block text-[#fe5a5e]">How It Works</span>
                            </h1>
                                <p className="text-xl text-gray-600 max-w-2xl">
                                    Get your personalized travel itinerary in just 4 simple steps
                                </p>
                            </div>

                            <div className="space-y-8">
                                {steps.map((step, index) => (
                                    <div 
                                        key={step.number}
                                        className={`flex items-start gap-6 ${
                                            isLoaded ? 'animate-fade-in' : 'opacity-0'
                                        }`}
                                        style={{
                                            animationDelay: `${index * 0.2}s`
                                        }}
                                    >
                                        {/* Step Number */}
                                        <div className="flex-shrink-0 w-16 h-16 bg-[#fe5a5e] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                                            {step.number}
                                        </div>
                                        
                                        {/* Step Content */}
                                        <div className="flex-1 space-y-3">
                                            <h3 className="text-3xl font-bold text-gray-800">
                                                {step.title}
                                            </h3>
                                            <p className="text-base text-gray-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Video */}
                        <div className="flex-1">
                            <div className="relative group">
                                <div
                                    className="w-full h-[32rem] lg:h-[40rem] rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 overflow-hidden bg-transparent cursor-pointer"
                                    onClick={handlePlayButtonClick}
                                >
                                    {/* Video Loading State */}
                                    {!videoLoaded && !videoError && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-[#0B0B0B] z-10">
                                            <div className="text-center text-white">
                                                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                                <p className="text-lg font-semibold">Loading Video...</p>
                                                <p className="text-sm opacity-80 mt-2">Please wait...</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Video Error State */}
                                    {videoError && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-[#0B0B0B] z-10">
                                            <div className="text-center text-white">
                                                <div className="text-6xl mb-4">⚠️</div>
                                                <p className="text-lg font-semibold mb-2">Video Unavailable</p>
                                                <p className="text-sm opacity-80 mb-4">Please try again later</p>
                                                <button
                                                    onClick={() => {
                                                        setVideoError(false);
                                                        setVideoLoaded(false);
                                                        const video = document.querySelector('video') as HTMLVideoElement;
                                                        if (video) video.load();
                                                    }}
                                                    className="px-6 py-2 bg-white text-[#fe5a5e] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
                                                >
                                                    🔄 Retry
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Video Player */}
                                    <video
                                        className="w-full h-full object-cover rounded-2xl"
                                        controls
                                        preload="auto"
                                        playsInline
                                        onPlay={handleVideoPlay}
                                        onPause={handleVideoPause}
                                        onEnded={handleVideoPause}
                                        onLoadedData={handleVideoLoad}
                                        onError={handleVideoError}
                                    >
                                        <source src="/video/travel_hero_video.webm" type="video/webm" />
                                        <source src="/video/uniloco.mov" type="video/quicktime" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* Play Button Overlay */}
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

                                    {/* Playing Indicator */}
                                    {isVideoPlaying && videoLoaded && !videoError && (
                                        <div className="absolute top-4 right-4 bg-[#fe5a5e] text-white px-3 py-1 rounded-full text-sm font-semibold z-20">
                                            ▶️ Playing
                                        </div>
                                    )}

                                    {/* Fullscreen Hint */}
                                    {videoLoaded && !videoError && (
                                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs z-20">
                                            Double-click for fullscreen
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CSS Styles */}
            <style jsx>{`
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                
                @keyframes fadeIn {
                    from { 
                        opacity: 0; 
                        transform: translateY(30px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
                
                /* Video Player Optimization */
                video {
                    border-radius: 1rem;
                    background: transparent;
                }
                
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
                
                video::-webkit-media-controls-enclosure {
                    background: transparent;
                }
                
                video::-moz-media-controls {
                    background-color: rgba(0, 0, 0, 0.3);
                }
                
                @media (max-width: 768px) {
                    video {
                        width: 100%;
                        height: auto;
                        max-height: 300px;
                    }
                }
            `}</style>
        </div>
    );
}
