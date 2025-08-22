'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import VideoPlayer from '@/components/features/VideoPlayer';

export default function HowToPlayPage() {
    const [activeSection, setActiveSection] = useState('how-to');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 50);
    }, []);

    const handleNavigation = (section: string) => {
        setActiveSection(section);
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
                navItems={['home', 'how-to', 'events', 'partnership', 'web3 hub']}
            />

            {/* Hero Section */}
            <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-[#fe5a5e]/10 rounded-full animate-bounce"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 bg-[#fe5a5e]/15 rounded-full animate-pulse"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Left Side - Steps Content */}
                        <div className="flex-1 lg:flex-[0.4] text-left space-y-8">
                            <div className={`space-y-2 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    <span className="block text-[#fe5a5e]">How It Works</span>
                                </h1>
                                <p className="text-xl text-gray-600 max-w-2xl">
                                    Get your personalized travel itinerary in just 4 simple steps
                                </p>
                            </div>

                            <div className={`space-y-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                                {steps.map((step, index) => (
                                    <div
                                        key={step.number}
                                        className={`flex items-center gap-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'
                                            }`}
                                        style={{
                                            animationDelay: `${0.5 + index * 0.15}s`
                                        }}
                                    >
                                        {/* Step Number */}
                                        <div className={`flex-shrink-0 w-12 h-12 bg-[#fe5a5e] text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${isLoaded ? 'animate-scale-in' : 'opacity-0'
                                            }`}
                                            style={{
                                                animationDelay: `${0.6 + index * 0.15}s`
                                            }}>
                                            {step.number}
                                        </div>

                                        {/* Step Title Only */}
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            {step.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Video */}
                        <div className={`flex-1 lg:flex-[0.6] ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                            <div className="relative group rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 bg-transparent" >
                                <video
                                    className="rounded-2xl"
                                    controls
                                    preload="auto"
                                    playsInline
                                    muted
                                    loop
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        filter: 'brightness(1.5) contrast(1.02) saturate(1.05)',
                                        colorScheme: 'light',
                                        objectFit: 'contain'
                                    }}
                                >
                                    <source src="/video/play.mp4" type="video/mp4" />
                                    <source src="/video/play.mp4" type="video/quicktime" />
                                    Your browser does not support the video tag.
                                </video>

                                {/* Fullscreen Hint */}
                                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs z-20">
                                    Double-click for fullscreen
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
                
                /* 为不同元素添加不同的动画效果 */
                .animate-fade-in[style*="animationDelay: 0.1s"] {
                    animation: slideInLeft 0.8s ease-out 0.1s forwards;
                }
                
                .animate-fade-in[style*="animationDelay: 0.2s"] {
                    animation: slideInRight 0.8s ease-out 0.2s forwards;
                }
                
                .animate-fade-in[style*="animationDelay: 0.3s"] {
                    animation: fadeInUp 0.8s ease-out 0.3s forwards;
                }
                
                @keyframes slideInLeft {
                    from { 
                        opacity: 0; 
                        transform: translateX(-50px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateX(0); 
                    }
                }
                
                @keyframes slideInRight {
                    from { 
                        opacity: 0; 
                        transform: translateX(50px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateX(0); 
                    }
                }
                
                @keyframes fadeInUp {
                    from { 
                        opacity: 0; 
                        transform: translateY(40px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                .animate-scale-in {
                    animation: scaleIn 0.6s ease-out forwards;
                }
                
                @keyframes scaleIn {
                    from { 
                        opacity: 0; 
                        transform: scale(0.5); 
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1); 
                    }
                }
                
                /* 视频样式 */
                video {
                    background: transparent;
                }
                
                /* 视频控件样式 */
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
            `}</style>
        </div>
    );
}
