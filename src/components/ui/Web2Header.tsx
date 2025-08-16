'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function Web2Header() {
    const router = useRouter();
    const pathname = usePathname();

    const navigationItems = [
        { name: 'Curated Experience', path: '/web2/curated_experience' },
        { name: 'Exclusive Service', path: '/web2/exclusive_service' },
        { name: 'Tailored Journey', path: '/web2/tailored_travel' }
    ];

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <header className="bg-white shadow-sm py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div
                    className="text-2xl font-bold text-[#fe585f] cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => router.push('/web2')}
                >
                    Uniloco
                </div>
                <nav className="hidden md:flex space-x-6">
                    {navigationItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => router.push(item.path)}
                            className={`text-gray-600 hover:text-[#fe585f] transition-colors font-medium relative group ${
                                isActive(item.path) ? 'text-[#fe585f]' : ''
                            }`}
                        >
                            {item.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#fe585f] transition-all ${
                                isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}></span>
                        </button>
                    ))}
                    <button className="text-gray-600 hover:text-[#fe585f] transition-colors font-medium">
                        Profile
                    </button>
                </nav>
            </div>
        </header>
    );
}
