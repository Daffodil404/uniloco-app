'use client';

// 添加一个固定页面，用于展示合作商户的列表
// app/page.tsx
import React from "react";
import { MapPin, Star, Phone } from "lucide-react";

interface Merchant {
    name: string;
    description: string;
    price: string;
    location: string;
    rating: number;
    phone: string;
    commission: string;
}

const merchants: Merchant[] = [
    {
        name: "Ceramic Museum",
        description: "Explore ancient pottery and ceramics",
        price: "50 UNC",
        location: "Old Town, City Center",
        rating: 4.8,
        phone: "+1 234 567 890",
        commission: "10%"
    },
    {
        name: "Museum Official Store",
        description: "Exclusive souvenirs and books",
        price: "30 UNC",
        location: "Museum Square",
        rating: 4.6,
        phone: "+1 234 888 666",
        commission: "12%"
    },
    {
        name: "Museum Cafe",
        description: "Local coffee & fresh pastries",
        price: "20 UNC",
        location: "Riverside Street 12",
        rating: 4.4,
        phone: "+1 222 345 678",
        commission: "8%"
    },
    {
        name: "Nearby Souvenir Shop",
        description: "Handcrafted gifts & collectibles",
        price: "20 UNC",
        location: "Market Road 5",
        rating: 4.5,
        phone: "+1 333 987 654",
        commission: "9%"
    },
    {
        name: "Local Transport Services",
        description: "Shuttle & guided tours",
        price: "15 UNC",
        location: "Central Station",
        rating: 4.3,
        phone: "+1 111 456 789",
        commission: "15%"
    },
];

export default function Page() {
    return (
        <main className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#fe585f] to-[#ff7a80] px-4 py-6">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => window.history.back()}
                        className="text-white hover:text-white/80 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-2xl font-bold text-white">
                        Partner Merchants
                    </h1>
                </div>
            </div>

            <div className="px-4 py-8 flex-1">

            {/* Merchant List */}
            <div className="space-y-4">
                {merchants.map((m, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow p-4"
                    >
                        {/* Top Row: Name + Price & Commission */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">{m.name}</h2>
                                <p className="text-sm text-gray-500">{m.description}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-[#fe585f] font-bold text-lg block">{m.price}</span>
                                <span className="text-xs text-gray-500">Commission: {m.commission}</span>
                            </div>
                        </div>

                        {/* Middle Row: Location */}
                        <div className="flex items-center text-sm text-gray-600 mt-2">
                            <MapPin className="text-[#fe585f] w-4 h-4 mr-1" />
                            {m.location}
                        </div>

                        {/* Bottom Row: Phone + Rating */}
                        <div className="flex justify-between items-center mt-3 text-sm">
                            <div className="flex items-center text-gray-600">
                                <Phone className="text-[#fe585f] w-4 h-4 mr-1" />
                                {m.phone}
                            </div>
                            <div className="flex items-center text-yellow-500">
                                <Star className="w-4 h-4 mr-1" />
                                {m.rating.toFixed(1)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </main>
    );
}
