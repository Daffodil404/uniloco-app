'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import DownloadSection from '@/components/features/DownloadSection';

export default function UncEconomicPage() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('home');
    const [isAnimating, setIsAnimating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [heroLoaded, setHeroLoaded] = useState(false);

    useEffect(() => {
        // 模拟加载完成
        setTimeout(() => {
            setIsLoading(false);
            // 延迟启动Hero动画
            setTimeout(() => {
                setHeroLoaded(true);
            }, 500);
        }, 2000);
    }, []);

    // Intersection Observer for reveal animations
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, observerOptions);

            // Observe all reveal elements
            const revealElements = document.querySelectorAll('.reveal');
            revealElements.forEach(el => observer.observe(el));

            return () => {
                revealElements.forEach(el => observer.unobserve(el));
            };
        }
    }, []);

    const handleNavigation = (section: string) => {
        setIsAnimating(true);
        setActiveSection(section);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <div className="min-h-screen bg-[#fff] overflow-x-hidden relative">
            {/* Loading Screen */}
            {isLoading && (
                <div className="fixed inset-0 bg-[#0B0B0B] z-[100] flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                        <h1 className="text-3xl font-bold mb-3">Uniloco</h1>
                        <p className="text-lg opacity-80">Loading UNC Economic...</p>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <Header
                activeSection={activeSection}
                onNavigation={handleNavigation}
                navItems={['home', 'how-to', 'events', 'partnership', 'web3 hub']}
            />

            {/* Hero Section */}
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
                        <source src="/video/network_unc_token.webm" type="video/webm" />
                    </video>

                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#1a0f0f]/70 to-black/75"></div>

                    {/* Subtle geometric elements */}
                    <div className="absolute top-20 right-20 w-32 h-32 border border-white/20 rounded-full"></div>
                    <div className="absolute bottom-20 left-20 w-24 h-24 border border-[#fe585f]/30 rounded-full"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-6 lg:space-y-8">
                        {/* Main Slogan */}
                        <div className="space-y-3 lg:space-y-6">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight">
                                <span className={`inline ${heroLoaded ? 'slide-in-left' : 'opacity-100'} text-white`}>UNC&nbsp;</span>
                                <span className={`inline ${heroLoaded ? 'slide-in-left-delay' : 'opacity-100'} text-[#fe585f]`}>Economic</span>
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <h2 className={`text-xl md:text-2xl lg:text-3xl text-white font-medium ${heroLoaded ? 'slide-in-left-delay-4' : 'opacity-0'}`}>
                            Complete Ecosystem & Transaction Process
                        </h2>

                        {/* Description */}
                        <p className={`text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto ${heroLoaded ? 'slide-in-left-delay-5' : 'opacity-0'}`}>
                            Discover the revolutionary token conversion process and user ecosystem cycle that powers the Uniloco travel-to-earn platform.
                        </p>
                    </div>
                </div>
            </section>



            {/* Token Conversion Process Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#fe585f] mb-4">
                            📈 Token Conversion Process
                        </h2>
                        <p className="text-xl text-gray-600">
                            Seamless conversion from traditional currencies to UNC governance tokens
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 reveal">
                        {/* Input Currency */}
                        <div className="bg-gradient-to-br from-[#fe585f] to-[#d94a51] text-white rounded-2xl p-8 text-center min-w-[280px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <h3 className="text-2xl font-bold mb-3">Airline Points / Fiat</h3>
                            <p className="text-lg opacity-90">Input Currency</p>
                        </div>

                        {/* Arrow */}
                        <div className="text-4xl text-[#fe585f] animate-pulse">→</div>

                        {/* USDC Bridge */}
                        <div className="bg-gradient-to-br from-[#fe585f] to-[#d94a51] text-white rounded-2xl p-8 text-center min-w-[280px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
                            <div className="absolute -top-3 -right-3 bg-white text-[#fe585f] px-3 py-1 rounded-full text-sm font-semibold">
                                Invisible
                            </div>
                            <h3 className="text-2xl font-bold mb-3">USDC Bridge</h3>
                            <p className="text-lg opacity-90">Auto Conversion</p>
                            <p className="text-sm opacity-75 mt-2">Seamless Wallet</p>
                        </div>

                        {/* Arrow */}
                        <div className="text-4xl text-[#fe585f] animate-pulse">→</div>

                        {/* UNC Token */}
                        <div className="bg-gradient-to-br from-[#fe585f] to-[#d94a51] text-white rounded-2xl p-8 text-center min-w-[280px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <h3 className="text-2xl font-bold mb-3">UNC Token</h3>
                            <p className="text-lg opacity-90">Governance Token</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* User Ecosystem Cycle Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#fe585f] mb-4">
                            🔄 User Ecosystem Cycle
                        </h2>
                        <p className="text-xl text-gray-600">
                            Complete cycle of token flow and platform interactions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
                        {/* Step 1: User Payment */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                            <div className="absolute -top-4 left-8 bg-gradient-to-r from-[#fe585f] to-[#d94a51] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-[#fe585f] mb-4 mt-4">User Payment</h3>
                            <p className="text-gray-600 mb-4">
                                Users pay UNC tokens for platform services, travel tasks, and exclusive activities
                            </p>
                            <div className="text-[#fe585f] font-semibold">→ Platform Services</div>
                        </div>

                        {/* Step 2: Expert Income */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                            <div className="absolute -top-4 left-8 bg-gradient-to-r from-[#fe585f] to-[#d94a51] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-[#fe585f] mb-4 mt-4">Expert Income</h3>
                            <p className="text-gray-600 mb-4">
                                Content creators earn UNC through platform activities and user engagement
                            </p>
                            <div className="text-[#fe585f] font-semibold">→ UNC Rewards</div>
                        </div>

                        {/* Step 3: User Interaction */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                            <div className="absolute -top-4 left-8 bg-gradient-to-r from-[#fe585f] to-[#d94a51] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-[#fe585f] mb-4 mt-4">User Interaction</h3>
                            <p className="text-gray-600 mb-4">
                                Users earn UNC through likes, comments, shares, and content creation
                            </p>
                            <div className="text-[#fe585f] font-semibold">→ Social Rewards</div>
                        </div>

                        {/* Step 4: Merchant Staking */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                            <div className="absolute -top-4 left-8 bg-gradient-to-r from-[#fe585f] to-[#d94a51] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                4
                            </div>
                            <h3 className="text-xl font-bold text-[#fe585f] mb-4 mt-4">Merchant Staking</h3>
                            <p className="text-gray-600 mb-4">
                                Merchants stake fiat amount to join platform and receive proportional UNC allocation
                            </p>
                            <div className="text-[#fe585f] font-semibold">→ Platform Access</div>
                        </div>

                        {/* Step 5: Payment Processing */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                            <div className="absolute -top-4 left-8 bg-gradient-to-r from-[#fe585f] to-[#d94a51] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                5
                            </div>
                            <h3 className="text-xl font-bold text-[#fe585f] mb-4 mt-4">Payment Processing</h3>
                            <p className="text-gray-600 mb-4">
                                Merchants & experts receive USDC payments via Coinpay / Ethereum sidechain
                            </p>
                            <div className="text-[#fe585f] font-semibold">→ USDC Settlement</div>
                        </div>

                        {/* Step 6: Platform Revenue */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
                            <div className="absolute -top-4 left-8 bg-gradient-to-r from-[#fe585f] to-[#d94a51] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                6
                            </div>
                            <h3 className="text-xl font-bold text-[#fe585f] mb-4 mt-4">Platform Revenue</h3>
                            <p className="text-gray-600 mb-4">
                                Platform earns commission to cover transaction costs and ecosystem maintenance
                            </p>
                            <div className="text-[#fe585f] font-semibold">→ Sustainable Growth</div>
                        </div>
                    </div>

                    {/* Platform Fee Box */}
                    <div className="mt-12 reveal">
                        <div className="bg-gradient-to-r from-[#fe585f] to-[#d94a51] text-white rounded-2xl p-8 text-center max-w-2xl mx-auto shadow-xl">
                            <h3 className="text-2xl font-bold mb-2">💰 Platform Fee: 3% - 5%</h3>
                            <p className="text-lg opacity-90">
                                Covers transaction costs, platform maintenance, and ecosystem development
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Token Benefits Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#fe585f] mb-4">
                            🚀 UNC Token Benefits
                        </h2>
                        <p className="text-xl text-gray-600">
                            Why UNC tokens are the backbone of our ecosystem
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
                        <div className="bg-gradient-to-br from-[#fe585f] to-[#d94a51] text-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-bold mb-4">Governance Rights</h3>
                            <p className="opacity-90">
                                Holders can participate in platform decisions and vote on new features
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-[#fe585f] to-[#d94a51] text-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="text-4xl mb-4">💎</div>
                            <h3 className="text-xl font-bold mb-4">Staking Rewards</h3>
                            <p className="opacity-90">
                                Earn additional UNC tokens by staking and participating in the ecosystem
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-[#fe585f] to-[#d94a51] text-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="text-4xl mb-4">🌟</div>
                            <h3 className="text-xl font-bold mb-4">Premium Access</h3>
                            <p className="opacity-90">
                                Unlock exclusive travel experiences and premium platform features
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Section - Moved outside Hero */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#fe585f] mb-4">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Download Uniloco and begin your travel-to-earn adventure today
                        </p>
                    </div>
                    <DownloadSection textColor='#fe585f' />
                </div>
            </section>

            {/* CSS Styles */}
            <style jsx>{`
                .reveal {
                    opacity: 1;
                    transform: translateY(0);
                    transition: all 0.8s ease;
                }
                
                .reveal:not(.active) {
                    opacity: 0;
                    transform: translateY(30px);
                }
                
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
                
                @keyframes slideInLeft {
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>

            {/* Intersection Observer for reveal animations */}
            <script dangerouslySetInnerHTML={{
                __html: `
                    // Intersection Observer for reveal animations
                    if (typeof window !== 'undefined') {
                        const observerOptions = {
                            threshold: 0.1,
                            rootMargin: '0px 0px -50px 0px'
                        };

                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    entry.target.classList.add('active');
                                }
                            });
                        }, observerOptions);

                        // Observe all reveal elements
                        const observeRevealElements = () => {
                            const revealElements = document.querySelectorAll('.reveal');
                            revealElements.forEach(el => observer.observe(el));
                        };

                        if (document.readyState === 'loading') {
                            document.addEventListener('DOMContentLoaded', observeRevealElements);
                        } else {
                            observeRevealElements();
                        }
                    }
                `
            }} />
        </div>
    );
}
