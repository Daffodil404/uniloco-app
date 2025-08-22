'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import VideoPlayer from '@/components/features/VideoPlayer';

export default function HowToPlayPage() {
    const [activeSection, setActiveSection] = useState('how-to');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100);
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
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    <span className="block text-[#fe5a5e]">How It Works</span>
                                </h1>
                                <p className="text-xl text-gray-600 max-w-2xl">
                                    Get your personalized travel itinerary in just 4 simple steps
                                </p>
                            </div>

                            <div className="space-y-6">
                                {steps.map((step, index) => (
                                    <div 
                                        key={step.number}
                                        className={`flex items-center gap-6 ${
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
                                        
                                        {/* Step Title Only */}
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            {step.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Video */}
                        <div className="flex-1 lg:flex-[0.6]">
                            <VideoPlayer
                                src="/video/play.mp4"
                                fallbackSrc="/video/play.mp4"
                                brightness={1.5}
                            />
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
            `}</style>
        </div>
    );
}
