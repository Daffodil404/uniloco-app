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
                    className="text-2xl font-bold text-[#fe5a5e] cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => router.push('/web2')}
                >
                    Uniloco
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    {navigationItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => router.push(item.path)}
                            className={`px-4 py-2 rounded-full text-gray-700 hover:text-[#fe5a5e] hover:bg-[#fe5a5e]/10 transition-colors font-medium relative ${
                                isActive(item.path) ? 'text-[#fe5a5e] bg-[#fe5a5e]/10' : ''
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                    <button className="px-4 py-2 rounded-full text-gray-700 hover:text-[#fe5a5e] hover:bg-[#fe5a5e]/10 transition-colors font-medium">
                        Profile
                    </button>
                </nav>
            </div>
        </header>
    );
}
