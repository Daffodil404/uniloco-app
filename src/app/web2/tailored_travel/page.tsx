'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Star, MapPin, Clock, Users, ChevronRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Web2Header from '@/components/ui/Web2Header';

export default function TailoredTravelPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [likedScripts, setLikedScripts] = useState<Set<string>>(new Set());

    const handleLike = (scriptId: string) => {
        setLikedScripts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(scriptId)) {
                newSet.delete(scriptId);
            } else {
                newSet.add(scriptId);
            }
            return newSet;
        });
    };

    const handleScriptClick = (scriptId: string) => {
        router.push(`/web2/experience_detail?id=${scriptId}&type=script`);
    };

    const filters = [
        { id: 'all', label: 'All Experiences', icon: '🎭', description: 'Browse all immersive experiences' },
        { id: 'mystery', label: 'Mystery & Intrigue', icon: '🔍', description: 'Solve supernatural mysteries' },
        { id: 'romance', label: 'Romance & Elegance', icon: '💕', description: 'Timeless love stories' },
        { id: 'adventure', label: 'Adventure & Discovery', icon: '⚔️', description: 'Epic treasure hunts' },
        { id: 'fantasy', label: 'Fantasy & Magic', icon: '🧙‍♂️', description: 'Mythical quests' },
        { id: 'historical', label: 'Historical & Cultural', icon: '👑', description: 'Court intrigue' },
        { id: 'thriller', label: 'Thriller & Suspense', icon: '🎩', description: 'Espionage missions' }
    ];

    const scripts = [
        {
            id: 'york-ghost',
            title: 'The York Ghost Legend',
            category: 'mystery',
            description: 'Immerse yourself in the ancient mysteries of York, a city with over two millennia of history. Unravel supernatural enigmas that span centuries while interacting with masterfully crafted characters in authentic historical settings.',
            image: '/static/1.jpg',
            price: 95,
            currency: '£',
            rating: 4.9,
            reviews: 127,
            duration: '4 hours',
            groupSize: '4-6 guests',
            location: 'York, England',
            difficulty: 'Intermediate',
            tags: ['Mystery', 'Historical', 'Supernatural'],
            bgImage: 'linear-gradient(135deg, rgba(44, 62, 80, 0.9) 0%, rgba(52, 73, 94, 0.9) 100%)'
        },
        {
            id: 'paris-romance',
            title: 'Montmartre: A Love Story',
            category: 'romance',
            description: 'Experience the timeless romance of 19th century Montmartre, where artists and their muses created legendary love stories. Wander through art-filled streets and recreate the most enchanting moments of Parisian romance.',
            image: '/static/2.png',
            price: 120,
            currency: '€',
            rating: 4.8,
            reviews: 89,
            duration: '3 hours',
            groupSize: '2-4 guests',
            location: 'Paris, France',
            difficulty: 'Beginner',
            tags: ['Romance', 'Art & Culture', 'Exclusive'],
            bgImage: 'linear-gradient(135deg, rgba(255, 154, 158, 0.9) 0%, rgba(254, 207, 239, 0.9) 100%)'
        },
        {
            id: 'arden-forest',
            title: 'The Arden Forest Quest',
            category: 'adventure',
            description: 'Embark on a legendary treasure hunt through the mystical Arden Forest of Luxembourg. Master the art of medieval puzzle-solving while experiencing the grandeur of knightly adventures in pristine natural surroundings.',
            image: '/static/3.png',
            price: 85,
            currency: '€',
            rating: 4.7,
            reviews: 156,
            duration: '5 hours',
            groupSize: '4-8 guests',
            location: 'Luxembourg',
            difficulty: 'Intermediate',
            tags: ['Adventure', 'Treasure Hunt', 'Outdoor'],
            bgImage: 'linear-gradient(135deg, rgba(168, 237, 234, 0.9) 0%, rgba(254, 214, 227, 0.9) 100%)'
        },
        {
            id: 'rhine-legend',
            title: 'The Rhine Valley Chronicles',
            category: 'fantasy',
            description: 'Journey through the mystical German Rhine Valley in search of the legendary Nibelungen treasure. Enhanced with authentic magical artifacts, experience the grandeur of Norse mythology in its most authentic form.',
            image: '/static/4.png',
            price: 130,
            currency: '€',
            rating: 4.9,
            reviews: 98,
            duration: '6 hours',
            groupSize: '4-10 guests',
            location: 'Germany',
            difficulty: 'Advanced',
            tags: ['Fantasy', 'Mythology', 'Premium'],
            bgImage: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)'
        },
        {
            id: 'versailles-court',
            title: 'Versailles: Court of Secrets',
            category: 'historical',
            description: 'Return to the opulent era of Louis XIV at the magnificent Versailles Palace. Navigate intricate court politics while adorned in authentic period attire, interacting with masterfully portrayed noble characters.',
            image: '/static/5.jpeg',
            price: 150,
            currency: '€',
            rating: 4.8,
            reviews: 203,
            duration: '6 hours',
            groupSize: '6-12 guests',
            location: 'Versailles, France',
            difficulty: 'Intermediate',
            tags: ['Historical', 'Court Politics', 'Luxury'],
            bgImage: 'linear-gradient(135deg, rgba(255, 236, 210, 0.9) 0%, rgba(252, 182, 159, 0.9) 100%)'
        },
        {
            id: 'vienna-cafe',
            title: 'Vienna: Espionage Elegance',
            category: 'thriller',
            description: 'Navigate the sophisticated world of Cold War espionage in Vienna\'s most prestigious coffee houses. Assume the role of a master spy, engaging in high-stakes psychological warfare in the most elegant of settings.',
            image: '/static/1.jpg',
            price: 110,
            currency: '€',
            rating: 4.6,
            reviews: 167,
            duration: '4 hours',
            groupSize: '3-6 guests',
            location: 'Vienna, Austria',
            difficulty: 'Advanced',
            tags: ['Thriller', 'Espionage', 'Exclusive'],
            bgImage: 'linear-gradient(135deg, rgba(67, 67, 67, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%)'
        }
    ];

    const filteredScripts = scripts.filter(script => {
        const matchesCategory = activeFilter === 'all' || script.category === activeFilter;
        const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             script.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             script.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const stats = [
        { number: '15+', label: 'Exclusive Scripts' },
        { number: '2,847', label: 'Successful Experiences' },
        { number: '4.94', label: 'Guest Satisfaction' }
    ];

    const features = [
        { 
            icon: '🎭', 
            title: 'Masterful Performances', 
            description: 'Professional actors with extensive theatrical backgrounds deliver authentic, immersive character portrayals' 
        },
        { 
            icon: '🏛️', 
            title: 'Authentic Venues', 
            description: 'Experiences conducted at Europe\'s most prestigious historical landmarks and cultural institutions' 
        },
        { 
            icon: '📖', 
            title: 'Exclusive Narratives', 
            description: 'Uniloco\'s proprietary scripts, meticulously crafted to blend historical authenticity with engaging storytelling' 
        },
        { 
            icon: '🛡️', 
            title: 'Uncompromising Quality', 
            description: 'Dedicated concierge service with our satisfaction guarantee - complete refund if expectations are not met' 
        }
    ];

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <Web2Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#fe585f] to-[#ff7a80] text-white py-20 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-bounce animate-float"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 bg-white/15 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-white/20 rounded-full animate-spin"></div>
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-white/8 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
                
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                        Tailored Journey
                    </h2>
                    <p className="text-xl mb-12 max-w-3xl mx-auto animate-fade-in-delay">
                        Immersive themed experiences crafted for discerning travelers, featuring professional actors and authentic historical settings
                    </p>
                    
                    {/* Stats */}
                    <div className="flex justify-center space-x-16 mb-12 animate-fade-in-delay-2">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold">{stat.number}</div>
                                <div className="text-sm opacity-90">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="bg-white py-12 shadow-sm">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">
                        Select Your Preferred Experience
                    </h3>
                    
                    {/* Search and Filter Bar */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search Input */}
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Search className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search experiences..."
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe585f] focus:border-transparent"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            
                            {/* Category Filter */}
                            <div>
                                <Select value={activeFilter} onValueChange={setActiveFilter}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filters.map(filter => (
                                            <SelectItem key={filter.id} value={filter.id}>
                                                <div className="flex items-center space-x-2">
                                                    <span>{filter.icon}</span>
                                                    <span>{filter.label}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            {/* Reset Button */}
                            <Button 
                                variant="outline" 
                                className="h-12 border-[#fe585f] text-[#fe585f] hover:bg-[#fe585f] hover:text-white"
                                onClick={() => {
                                    setActiveFilter('all');
                                    setSearchQuery('');
                                }}
                            >
                                Reset Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scripts Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {filteredScripts.map((script) => (
                            <div
                                key={script.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                                onClick={() => handleScriptClick(script.id)}
                            >
                                {/* Script Header */}
                                <div 
                                    className="h-64 relative overflow-hidden"
                                    style={{ background: script.bgImage }}
                                >
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    
                                    {/* Difficulty Badge */}
                                    <div className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-semibold text-white ${
                                        script.difficulty === 'Beginner' ? 'bg-emerald-600' :
                                        script.difficulty === 'Intermediate' ? 'bg-amber-600' : 'bg-red-600'
                                    }`}>
                                        {script.difficulty}
                                    </div>

                                    {/* Like Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLike(script.id);
                                        }}
                                        className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                                    >
                                        <Heart
                                            className={`h-5 w-5 transition-all duration-300 ${
                                                likedScripts.has(script.id)
                                                    ? 'text-[#fe585f] fill-current'
                                                    : 'text-white'
                                            }`}
                                        />
                                    </button>

                                    {/* Location Badge */}
                                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="h-4 w-4 text-gray-600" />
                                            <span className="text-sm font-medium text-gray-700">{script.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Script Content */}
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#fe585f] transition-colors">
                                        {script.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 text-base mb-6 leading-relaxed">
                                        {script.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {script.tags.map((tag, index) => (
                                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < Math.floor(script.rating) ? 'fill-current' : ''}`} />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500 font-medium">
                                            {script.rating} ({script.reviews} reviews)
                                        </span>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-8 font-medium">
                                        <div className="flex items-center space-x-6">
                                            <div className="flex items-center space-x-2">
                                                <Users className="h-4 w-4" />
                                                <span>{script.groupSize}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Clock className="h-4 w-4" />
                                                <span>{script.duration}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price and Book Button */}
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                        <div className="text-3xl font-bold text-[#fe585f]">
                                            {script.currency}{script.price}
                                            <span className="text-sm font-normal text-gray-500 ml-2">per guest</span>
                                        </div>
                                        <Button className="bg-[#fe585f] hover:bg-[#e04a50] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 group-hover:scale-105">
                                            View Details
                                            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Empty State */}
                {filteredScripts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-2xl font-bold text-gray-700 mb-2">
                            No experiences found
                        </div>
                        <p className="text-gray-500 mb-4">
                            Try adjusting your search or filter criteria
                        </p>
                        <Button 
                            variant="outline"
                            className="border-[#fe585f] text-[#fe585f] hover:bg-[#fe585f] hover:text-white"
                            onClick={() => {
                                setActiveFilter('all');
                                setSearchQuery('');
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                )}
            </section>

            {/* Features Section */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-4">
                    <h3 className="text-4xl font-bold text-center mb-16 text-gray-800">
                        The Uniloco Difference
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                <h4 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h4>
                                <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coming Soon */}
            <section className="bg-gray-50 py-24">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl font-bold text-gray-800 mb-6">
                            Upcoming Experiences
                        </h3>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            We are currently developing additional exclusive experiences including "The Edinburgh Castle Mystery", "The Prague Alchemist's Laboratory", and "The Venetian Masquerade Ball".
                        </p>
                        <Button variant="outline" className="border-gray-400 text-gray-600 hover:bg-gray-600 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300">
                            Join the Waitlist
                        </Button>
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
