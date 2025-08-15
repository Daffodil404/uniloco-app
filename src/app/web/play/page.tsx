'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/ui/Header';

export default function HowToPlayPage() {
    const [activeSection, setActiveSection] = useState('how-to');
    const [isLoaded, setIsLoaded] = useState(false);
    const [bandImagesLoaded, setBandImagesLoaded] = useState<boolean[]>([false, false, false, false]);
    const handleBandImageLoad = (index: number) => {
        setBandImagesLoaded(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };
    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100);
    }, []);

    const handleNavigation = (section: string) => {
        setActiveSection(section);
    };

    const steps = [
        {
            number: 1,
            icon: '🔐',
            title: 'Choose Registration',
            description:
                'Sign up with Google account or phone number. Double verification for enhanced security and user protection.',
        },
        {
            number: 2,
            icon: '💼',
            title: 'Select Wallet Type',
            description:
                'Connect existing Web3 wallet (MetaMask, WalletConnect) or create seamless custodial wallet for easier onboarding.',
        },
        {
            number: 3,
            icon: '🔑',
            title: 'Secure Your Keys',
            description:
                'For custodial wallets: platform holds one private key, you keep one private key. Double security protection system.',
        },
        {
            number: 4,
            icon: '🎮',
            title: 'Start Gaming',
            description:
                'Complete profile setup, choose your starter Travel Band, and begin your travel-to-earn journey with Uniloco ecosystem.',
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
                    <div className="absolute top-20 left-20 w-32 h-32 bg-[#fe585f]/10 rounded-full animate-bounce"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 bg-[#fe585f]/15 rounded-full animate-pulse"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <div className="flex-1 text-left space-y-3">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                                <span className="block text-[#fe585f]">How To Play</span>
                                <span className="block bg-gradient-to-r from-[#fe585f] to-[#ff7a80] bg-clip-text text-transparent">
                                    Start Your Journey
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-lg">
                                Follow these simple steps to start your travel-to-earn adventure
                                with Uniloco.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Travel Band */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-[#fe585f] mb-4">
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
                                gradient: 'from-red-500 to-red-700'
                            }
                        ].map((band, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#fe585f] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center"
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
                                <p className="text-[#fe585f] font-semibold mb-2">{band.price}</p>
                                <p className="text-gray-600 mb-6">Base UNC Boost {band.boost}</p>
                                <button className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${band.action === 'Coming Soon'
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : 'bg-[#fe585f] text-white hover:bg-[#ff7a80] hover:scale-105'
                                    }`}>
                                    {band.action}
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Travel Stories */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex-1 order-2 lg:order-1 space-y-4">
                        <h2 className="text-4xl font-bold text-[#fe585f]">Travel Stories</h2>
                        <p className="text-gray-600 text-lg">
                            Capture your journey and share with the Uniloco community. Post
                            photos, videos, and stories to inspire other travelers and earn
                            extra rewards.
                        </p>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                            <li>Document each adventure in your own style</li>
                            <li>Share with friends and followers</li>
                            <li>Earn bonuses for high-engagement posts</li>
                        </ul>
                    </div>
                    <div className="flex-1 order-1 lg:order-2">
                        <img
                            src="/images/travel-stories.png"
                            alt="Travel Stories"
                            className="rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
