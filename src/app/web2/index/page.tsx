'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Web2Header from '@/components/ui/Web2Header';

export default function Web2HomePage() {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState({
        region: '',
        date: '',
        people: ''
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would trigger search results
        alert(`Searching for: 
Region: ${searchParams.region || 'Any Region'}
Date: ${searchParams.date || 'Any Date'}
People: ${searchParams.people || 'Any Number'}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    const mainCategories = [
        {
            title: "Curated Experience",
            description: "Handpicked unique experiences, each carefully selected to provide unforgettable cultural, culinary, adventure and artistic experiences.",
            icon: "🌟",
            bgClass: "bg-gradient-to-br from-[#667eea] to-[#764ba2]"
        },
        {
            title: "Exclusive Service",
            description: "Professional personal service team including photographers, private chefs, SPA therapists, makeup artists, and fitness coaches.",
            icon: "💎",
            bgClass: "bg-gradient-to-br from-[#f093fb] to-[#f5576c]"
        },
        {
            title: "Tailored Journey",
            description: "Immersive themed experiences like mystery games, historical reenactments, and romantic dates with professional NPC actors.",
            icon: "🎭",
            bgClass: "bg-gradient-to-br from-[#4facfe] to-[#00f2fe]"
        }
    ];

    const regions = [
        { value: "europe", label: "🌍 Europe" },
        { value: "asia", label: "🌏 Asia" },
        { value: "north-america", label: "🌎 North America" },
        { value: "south-america", label: "🌎 South America" },
        { value: "africa", label: "🌍 Africa" },
        { value: "oceania", label: "🌏 Oceania" }
    ];

    const peopleOptions = [
        { value: "1", label: "👤 1 Person" },
        { value: "2", label: "👥 2 People" },
        { value: "3", label: "👥 3 People" },
        { value: "4", label: "👥 4 People" },
        { value: "5", label: "👥 5 People" },
        { value: "6", label: "👥 6 People" },
        { value: "7", label: "👥 7 People" },
        { value: "8", label: "👥 8 People" },
        { value: "9", label: "👥 9+ People" }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Web2Header />

            {/* Hero Section */}
            <section className="pt-16 pb-24 bg-gradient-to-br from-[#fe585f] to-[#ff7a80] text-white relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-bounce animate-float"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 bg-white/15 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-white/20 rounded-full animate-spin"></div>
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-white/8 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                        Every moment, exclusively yours.
                    </h1>
                    <p className="text-xl mb-10 max-w-2xl mx-auto animate-fade-in-delay">
                        Discover premium experiences, enjoy personalized services, and create your perfect journey
                    </p>

                    {/* Search Bar */}
                    <form
                        onSubmit={handleSearch}
                        className="bg-white rounded-xl shadow-xl p-3 max-w-4xl mx-auto animate-fade-in-delay-2"
                    >
                        <div className="flex flex-col md:flex-row gap-3">
                            {/* Region Selector */}
                            <div className="flex-1 relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <Select value={searchParams.region} onValueChange={(value) => handleSelectChange('region', value)}>
                                    <SelectTrigger className="text-left pl-10">
                                        <SelectValue placeholder="Select Region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regions.map((region) => (
                                            <SelectItem key={region.value} value={region.value}>
                                                {region.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Date Picker */}
                            <div className="flex-1 relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                                    <Calendar className="h-4 w-4" />
                                </div>
                                <input
                                    type="date"
                                    name="date"
                                    value={searchParams.date}
                                    onChange={handleInputChange}
                                    className="w-full h-12 pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe585f] focus:ring-offset-2 text-gray-800 placeholder:text-gray-400"
                                    placeholder="Select Date"
                                />
                            </div>

                            {/* People Selector */}
                            <div className="flex-1 relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                                    <Users className="h-4 w-4" />
                                </div>
                                <Select value={searchParams.people} onValueChange={(value) => handleSelectChange('people', value)}>
                                    <SelectTrigger className="text-left pl-10">
                                        <SelectValue placeholder="Select People" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {peopleOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Search Button */}
                            <Button type="submit" className="flex items-center justify-center hover:scale-105 transition-transform px-8">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Main Categories */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                        Explore Our Core Services
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {mainCategories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                                onClick={() => router.push(`#${category.title.replace(/\s+/g, '-').toLowerCase()}`)}
                            >
                                <div className={`h-48 ${category.bgClass} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#fe585f] transition-colors">{category.title}</h3>
                                    <p className="text-gray-600">{category.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }
                
                .animate-fade-in-delay {
                    animation: fade-in 1s ease-out 0.3s forwards;
                    opacity: 0;
                }
                
                .animate-fade-in-delay-2 {
                    animation: fade-in 1s ease-out 0.6s forwards;
                    opacity: 0;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}