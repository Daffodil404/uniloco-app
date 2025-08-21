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
                    <div className="absolute top-20 left-20 w-32 h-32 bg-[#2563EB]/10 rounded-full animate-bounce"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 bg-[#2563EB]/15 rounded-full animate-pulse"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <div className="flex-1 text-left space-y-3">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                                <span className="block text-[#2563EB]">            Empty  page                                </span>
                            </h1>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
