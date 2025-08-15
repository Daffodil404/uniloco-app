'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Star, Clock, Users, MapPin, Heart, Calendar, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ExperienceDetailPage() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedPeople, setSelectedPeople] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const experience = {
        id: "strasbourg-local-experience",
        title: "Experience Strasbourg Like a Local",
        subtitle: "Cycle through Strasbourg's old town, taste local cuisine, and explore hidden spots that tourists don't know about. Follow a local guide to deeply understand the true face of this European capital.",
        image: "/static/3.png",
        price: 227,
        rating: 4.97,
        reviewCount: 134,
        duration: "4 hours",
        groupSize: "2-8 people",
        languages: "French/English",
        location: "Place Kléber, 67000 Strasbourg, France",
        availability: "Available tomorrow",
        timeSlots: ["09:00 - 13:00", "14:00 - 18:00"]
    };

    const itinerary = [
        {
            time: "09:00 - 09:30",
            title: "Kléber Square Meeting & Bicycle Equipment",
            description: "Meet at Strasbourg's most famous square, collect professional bicycles and safety equipment. The guide introduces today's itinerary and safety precautions, sharing local cycling route secrets."
        },
        {
            time: "09:30 - 11:00",
            title: "Deep Cycling Exploration of Old Town",
            description: "Cycle through the UNESCO World Heritage site - Strasbourg's old town. Visit the canals and traditional half-timbered houses of Petite France, understanding the architectural features and historical stories of the medieval city."
        },
        {
            time: "11:00 - 12:00",
            title: "Hidden Spots & Local Market",
            description: "Visit hidden gems that few tourists know: the ancient Jewish quarter, artist studio district. Taste Alsatian specialties at traditional markets, experiencing authentic local life atmosphere."
        },
        {
            time: "12:00 - 13:00",
            title: "Traditional Restaurant Lunch Experience",
            description: "Enjoy authentic Alsatian lunch at a traditional restaurant (Winstub) frequented by locals. Taste choucroute, Alsatian tarts and other regional specialties, paired with local white wine."
        }
    ];

    const includes = [
        "Professional bicycle rental",
        "Safety helmet and equipment",
        "Local professional guide service",
        "Traditional lunch (including drinks)",
        "Market food tasting",
        "Attraction tickets (if needed)",
        "Accident insurance coverage"
    ];

    const excludes = [
        "Round-trip transportation costs",
        "Personal expenses and souvenirs",
        "Additional drinks and tips",
        "Dinner costs"
    ];

    const reviews = [
        {
            name: "Marie Chen",
            avatar: "M",
            rating: 5,
            date: "July 2024",
            text: "This experience completely exceeded my expectations! Pierre really took us around Strasbourg like a local friend. We visited several places that aren't in any travel guide and tasted the most authentic Alsatian cuisine. The cycling route was cleverly designed, both safe and fun. Highly recommended for friends who want to deeply experience this city!"
        },
        {
            name: "David Wilson",
            avatar: "D",
            rating: 5,
            date: "June 2024",
            text: "Amazing experience! As someone who has been to Strasbourg multiple times, I was surprised by how many new places Pierre showed us. The local market visit was a highlight - we tried foods I would never have discovered on my own. The pace was perfect and Pierre's knowledge of the city's history is impressive."
        },
        {
            name: "Sophie Dubois",
            avatar: "S",
            rating: 5,
            date: "June 2024",
            text: "Uniloco's service is really thoughtful! From booking to the end of the experience, every aspect was professional. Pierre is not only an excellent guide but more like an enthusiastic local friend. The restaurant choice for lunch was great, completely a place where locals go. This kind of authentic experience is exactly what I wanted!"
        }
    ];

    const host = {
        name: "Pierre Dubois",
        avatar: "👨‍🦱",
        description: "I'm a native of Strasbourg, born and raised in this city. As a certified tour guide, I've been leading visitors to explore my hometown for over 8 years. I love sharing Strasbourg's history, culture, and secret spots that only locals know about.",
        stats: {
            experiences: 268,
            rating: 4.9,
            years: 8
        }
    };

    // Enhanced availability calendar with more realistic data
    const availabilityCalendar = [
        { date: "8/16", status: "available", label: "Available", price: 227 },
        { date: "8/17", status: "limited", label: "Only 2 spots", price: 227 },
        { date: "8/18", status: "full", label: "Full", price: 227 },
        { date: "8/19", status: "available", label: "Available", price: 227 },
        { date: "8/20", status: "limited", label: "Only 1 spot", price: 227 },
        { date: "8/21", status: "available", label: "Available", price: 227 },
        { date: "8/22", status: "available", label: "Available", price: 227 },
        { date: "8/23", status: "available", label: "Available", price: 227 },
        { date: "8/24", status: "limited", label: "Only 3 spots", price: 227 },
        { date: "8/25", status: "available", label: "Available", price: 227 },
        { date: "8/26", status: "available", label: "Available", price: 227 },
        { date: "8/27", status: "available", label: "Available", price: 227 },
        { date: "8/28", status: "limited", label: "Only 2 spots", price: 227 },
        { date: "8/29", status: "available", label: "Available", price: 227 },
        { date: "8/30", status: "available", label: "Available", price: 227 },
        { date: "8/31", status: "available", label: "Available", price: 227 }
    ];

    const handleBooking = () => {
        alert('Redirecting to Uniloco exclusive booking system\nIncluding:\n- Uniloco member benefits\n- Dedicated customer service\n- Personalized needs customization\n- Quality guarantee commitment');
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available':
                return 'border-gray-300 hover:border-[#fe585f] hover:bg-[#fe585f]/5';
            case 'limited':
                return 'border-orange-300 bg-orange-50 hover:border-orange-400 hover:bg-orange-100';
            case 'full':
                return 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed';
            default:
                return 'border-gray-300';
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case 'available':
                return 'text-gray-900';
            case 'limited':
                return 'text-orange-700';
            case 'full':
                return 'text-gray-400';
            default:
                return 'text-gray-900';
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="text-gray-600 hover:text-[#fe585f] hover:bg-gray-100 rounded-full p-2"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-semibold text-[#fe585f]">Uniloco</h1>
                            <p className="text-xs text-gray-500">Every moment, exclusively yours.</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLiked(!isLiked)}
                        className={`rounded-full p-2 ${isLiked ? 'text-[#fe585f]' : 'text-gray-600 hover:text-[#fe585f]'}`}
                    >
                        <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Left Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            {/* Hero Image */}
                            <div 
                                className="h-96 bg-gradient-to-br from-[#667eea] to-[#764ba2] relative flex items-center justify-center text-6xl"
                                style={{
                                    backgroundImage: `url(${experience.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="relative z-10">🚴‍♂️</div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white px-3 py-1 rounded-full text-xs font-medium inline-block mb-4">
                                    🌟 Uniloco Curated Experience
                                </div>
                                
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {experience.title}
                                </h1>
                                
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    {experience.subtitle}
                                </p>

                                {/* Meta Information */}
                                <div className="flex flex-wrap gap-6 mb-6">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Clock className="h-5 w-5" />
                                        <span className="font-medium">{experience.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Users className="h-5 w-5" />
                                        <span className="font-medium">{experience.groupSize}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <MapPin className="h-5 w-5" />
                                        <span className="font-medium">{experience.languages}</span>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-1">
                                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                        <span className="font-semibold text-gray-900">{experience.rating}</span>
                                        <span className="text-gray-600">({experience.reviewCount} reviews)</span>
                                    </div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                    <span className="text-gray-600">Strasbourg, France</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 sticky top-24">
                            <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-xl text-center mb-6">
                                <div className="font-semibold">🔥 Only 3 spots left this week!</div>
                                <div className="text-sm mt-1">Book now to secure your spot</div>
                            </div>

                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    ¥{experience.price}
                                </div>
                                <div className="text-gray-600 text-sm">per person</div>
                            </div>

                            <form className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min="2024-08-16"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fe585f] focus:border-transparent text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Time
                                    </label>
                                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Choose time slot" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {experience.timeSlots.map((slot, index) => (
                                                <SelectItem key={index} value={slot}>
                                                    {slot}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of People
                                    </label>
                                    <Select value={selectedPeople} onValueChange={setSelectedPeople}>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Select people" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[2, 3, 4, 5, 6, 7, 8].map(num => (
                                                <SelectItem key={num} value={num.toString()}>
                                                    {num} people
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </form>

                            <Button 
                                onClick={handleBooking}
                                className="w-full bg-[#fe585f] hover:bg-[#e04a50] text-white py-4 text-lg font-semibold mb-4 rounded-xl"
                            >
                                Book Now
                            </Button>
                            
                            <p className="text-center text-sm text-gray-600 mb-4">
                                💝 Uniloco Quality Guarantee | Free cancellation within 24 hours
                            </p>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span>Instant confirmation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Availability Calendar */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">📅 Check availability</h3>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="font-semibold text-gray-900">
                                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Calendar Header */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2">
                        {availabilityCalendar.map((day, index) => (
                            <div
                                key={index}
                                onClick={() => day.status !== 'full' && handleDateSelect(day.date)}
                                className={`relative p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                    getStatusColor(day.status)
                                } ${day.status === 'full' ? 'cursor-not-allowed' : 'hover:shadow-md'}`}
                            >
                                <div className={`text-center ${getStatusTextColor(day.status)}`}>
                                    <div className="font-semibold text-sm mb-1">{day.date.split('/')[1]}</div>
                                    <div className="text-xs opacity-75">{day.label}</div>
                                    {day.status === 'available' && (
                                        <div className="text-xs font-medium text-[#fe585f] mt-1">
                                            ¥{day.price}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Status indicator */}
                                {day.status === 'limited' && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
                                )}
                                {day.status === 'full' && (
                                    <div className="absolute inset-0 bg-gray-100 rounded-xl opacity-50"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                            <span className="text-sm text-gray-600">Available</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-orange-300 bg-orange-50 rounded relative">
                                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full"></div>
                            </div>
                            <span className="text-sm text-gray-600">Limited</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-gray-200 bg-gray-100 rounded"></div>
                            <span className="text-sm text-gray-600">Full</span>
                        </div>
                    </div>
                </section>

                {/* Location & Map */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">📍 Meeting Point</h3>
                            <p className="text-gray-600">{experience.location}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-gray-900">{experience.availability}</p>
                            <p className="text-gray-600">09:00 - 18:00</p>
                        </div>
                    </div>
                    
                    <div className="h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-gray-200 flex items-center justify-center relative mb-4 overflow-hidden">
                        <div className="text-center text-gray-600 z-10">
                            <p className="text-lg mb-2 font-medium">🗺️ Strasbourg City Center Map</p>
                            <p className="text-sm">Click to view detailed location and route</p>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#fe585f] rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-700">
                            📍 You are here
                        </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm">
                        📍 Meeting point is located at Place Kléber in Strasbourg city center, 10 minutes walk from the train station, convenient transportation.
                    </p>
                </section>

                {/* Itinerary */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">🗓️ What you'll do</h3>
                    <div className="space-y-6">
                        {itinerary.map((step, index) => (
                            <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-xl border-l-4 border-[#fe585f] hover:bg-gray-100 transition-colors">
                                <div className="w-10 h-10 bg-[#fe585f] text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                                    {index + 1}
                                </div>
                                <div>
                                    <div className="text-[#fe585f] font-medium text-sm mb-2">{step.time}</div>
                                    <h4 className="font-semibold text-lg mb-2 text-gray-900">{step.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* What's Included */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">💼 What's included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                                <Check className="h-5 w-5 mr-2" />
                                What's Included
                            </h4>
                            <ul className="space-y-3">
                                {includes.map((item, index) => (
                                    <li key={index} className="flex items-center space-x-3">
                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                                <X className="h-5 w-5 mr-2" />
                                Not Included
                            </h4>
                            <ul className="space-y-3">
                                {excludes.map((item, index) => (
                                    <li key={index} className="flex items-center space-x-3">
                                        <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Booking Notice */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">📋 Important information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 border-l-4 border-[#fe585f] bg-gray-50 rounded-r-xl hover:bg-gray-100 transition-colors">
                            <h4 className="font-semibold text-lg mb-3 flex items-center">
                                ⏰ Booking Time
                            </h4>
                            <p className="text-gray-600">Book 24 hours in advance, 3 days for holidays. Instant confirmation available, detailed meeting information will be sent after booking.</p>
                        </div>
                        <div className="p-6 border-l-4 border-[#fe585f] bg-gray-50 rounded-r-xl hover:bg-gray-100 transition-colors">
                            <h4 className="font-semibold text-lg mb-3 flex items-center">
                                🌦️ Weather Policy
                            </h4>
                            <p className="text-gray-600">In case of severe weather, we will notify you in advance to reschedule or provide indoor alternatives. Safety first is our principle.</p>
                        </div>
                        <div className="p-6 border-l-4 border-[#fe585f] bg-gray-50 rounded-r-xl hover:bg-gray-100 transition-colors">
                            <h4 className="font-semibold text-lg mb-3 flex items-center">
                                💳 Cancellation Policy
                            </h4>
                            <p className="text-gray-600">Free cancellation 24 hours before the experience, 50% fee for cancellation within 24 hours. Special circumstances can be negotiated.</p>
                        </div>
                        <div className="p-6 border-l-4 border-[#fe585f] bg-gray-50 rounded-r-xl hover:bg-gray-100 transition-colors">
                            <h4 className="font-semibold text-lg mb-3 flex items-center">
                                🚴‍♂️ Fitness Requirements
                            </h4>
                            <p className="text-gray-600">Suitable for all fitness levels, flat and easy cycling route. Different sized bicycles available, including electric bike options.</p>
                        </div>
                    </div>
                </section>

                {/* Reviews */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">⭐ {experience.reviewCount} reviews</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#fe585f] mb-2">{experience.rating}</div>
                            <div className="flex justify-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <div className="text-gray-600">{experience.reviewCount} reviews</div>
                        </div>
                        
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Cleanliness</span>
                                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                                </div>
                                <span className="text-sm font-semibold">4.95</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Accuracy</span>
                                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                                <span className="text-sm font-semibold">4.92</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Communication</span>
                                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '96%' }}></div>
                                </div>
                                <span className="text-sm font-semibold">4.96</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white font-semibold">
                                        {review.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-semibold text-gray-900">{review.name}</h5>
                                        <p className="text-sm text-gray-600">{review.date}</p>
                                    </div>
                                    <div className="flex">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{review.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Host Information */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">👨‍🏫 Your guide</h3>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-3xl">
                            {host.avatar}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">{host.name}</h4>
                            <p className="text-gray-600 leading-relaxed mb-4">{host.description}</p>
                            <div className="flex gap-6">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-[#fe585f]">{host.stats.experiences}</div>
                                    <div className="text-sm text-gray-600">Experiences</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-[#fe585f]">{host.stats.rating}</div>
                                    <div className="text-sm text-gray-600">Average Rating</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-[#fe585f]">{host.stats.years} years</div>
                                    <div className="text-sm text-gray-600">Guide Experience</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Company Information */}
                <section className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#fe585f] to-[#ff7a80] rounded-2xl flex items-center justify-center text-3xl text-white">
                            🌟
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-2">Uniloco - Every moment, exclusively yours.</h4>
                            <p className="text-gray-600 italic">"Every moment, exclusively yours."</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="text-2xl font-bold text-[#fe585f]">2,847</div>
                            <div className="text-sm text-gray-600">Curated Experiences</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="text-2xl font-bold text-[#fe585f]">4.94</div>
                            <div className="text-sm text-gray-600">Average Rating</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="text-2xl font-bold text-[#fe585f]">15,634</div>
                            <div className="text-sm text-gray-600">Satisfied Customers</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="text-2xl font-bold text-[#fe585f]">267</div>
                            <div className="text-sm text-gray-600">Professional Guides</div>
                        </div>
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 mb-4">🚀 Why Choose Uniloco?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">🎯</div>
                            <h5 className="font-semibold text-gray-900 mb-2">Curated Selection</h5>
                            <p className="text-sm text-gray-600">Every experience is carefully selected and inspected by our professional team</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">👨‍🏫</div>
                            <h5 className="font-semibold text-gray-900 mb-2">Professional Certification</h5>
                            <p className="text-sm text-gray-600">All guides are professionally trained and background verified</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">🛡️</div>
                            <h5 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h5>
                            <p className="text-sm text-gray-600">Dedicated customer service, full insurance coverage, 100% refund if not satisfied</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">✨</div>
                            <h5 className="font-semibold text-gray-900 mb-2">Customized Experience</h5>
                            <p className="text-sm text-gray-600">Tailored to your interests and needs, creating unique travel memories</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
