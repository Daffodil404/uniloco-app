'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Clock, Users, MapPin, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Reviews from '@/components/ui/reviews';
import Calendar from '@/components/ui/calendar';
import Web2Header from '@/components/ui/Web2Header';
import NormalMap from '@/components/ui/normalMap';

export default function ExperienceDetailPage() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedPeople, setSelectedPeople] = useState('');

    const [currentMonth, setCurrentMonth] = useState(new Date());

    const experience = {
        id: "strasbourg-local-experience",
        title: "Experience Strasbourg Like a Local",
        subtitle: "Cycle through Strasbourg's old town, taste local cuisine, and explore hidden spots that tourists don't know about. Follow a local guide to deeply understand the true face of this European capital.",
        image: "/static/webp/strasbourg.webp",
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
            type: "Local Experience",
            text: "This experience completely exceeded my expectations! Pierre really took us around Strasbourg like a local friend. We visited several places that aren't in any travel guide and tasted the most authentic Alsatian cuisine. The cycling route was cleverly designed, both safe and fun. Highly recommended for friends who want to deeply experience this city!"
        },
        {
            name: "David Wilson",
            avatar: "D",
            rating: 5,
            date: "June 2024",
            type: "Cultural Tour",
            text: "Amazing experience! As someone who has been to Strasbourg multiple times, I was surprised by how many new places Pierre showed us. The local market visit was a highlight - we tried foods I would never have discovered on my own. The pace was perfect and Pierre's knowledge of the city's history is impressive."
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
        { date: "8/16", status: "available" as const, label: "Available", price: 227 },
        { date: "8/17", status: "limited" as const, label: "Only 2 spots", price: 227 },
        { date: "8/18", status: "full" as const, label: "Full", price: 227 },
        { date: "8/19", status: "available" as const, label: "Available", price: 227 },
        { date: "8/20", status: "limited" as const, label: "Only 1 spot", price: 227 },
        { date: "8/21", status: "available" as const, label: "Available", price: 227 },
        { date: "8/22", status: "available" as const, label: "Available", price: 227 },
        { date: "8/23", status: "available" as const, label: "Available", price: 227 },
        { date: "8/24", status: "limited" as const, label: "Only 3 spots", price: 227 },
        { date: "8/25", status: "available" as const, label: "Available", price: 227 },
        { date: "8/26", status: "available" as const, label: "Available", price: 227 },
        { date: "8/27", status: "available" as const, label: "Available", price: 227 },
        { date: "8/28", status: "limited" as const, label: "Only 2 spots", price: 227 },
        { date: "8/29", status: "available" as const, label: "Available", price: 227 },
        { date: "8/30", status: "available" as const, label: "Available", price: 227 },
        { date: "8/31", status: "available" as const, label: "Available", price: 227 }
    ];

    const handleBooking = () => {
        alert('Redirecting to Uniloco exclusive booking system\nIncluding:\n- Uniloco member benefits\n- Dedicated customer service\n- Personalized needs customization\n- Quality guarantee commitment');
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
    };

    const handleMonthChange = (date: Date) => {
        setCurrentMonth(date);
    };

    return (
        <div className="min-h-screen bg-white">
            <Web2Header />

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

                {/* Enhanced Calendar */}
                <section className="mb-8">
                    <Calendar
                        days={availabilityCalendar}
                        currentMonth={currentMonth}
                        onMonthChange={handleMonthChange}
                        onDateSelect={handleDateSelect}
                        selectedDate={selectedDate}
                        title="📅 Check availability"
                    />
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
                    
                    <div className="rounded-xl overflow-hidden mb-4">
                        <NormalMap
                            center={{ lat: 48.573405, lng: 7.752111 }}
                            zoom={13}
                            heightClassName="h-80"
                        />
                    </div>
                    
                    <p className="text-gray-600 text-sm">
                        📍 Meeting point is located at Place Kléber in Strasbourg city center, 10 minutes walk from the train station, convenient transportation.
                    </p>
                </section>

                {/* Itinerary */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">🗓️ What you&apos;ll do</h3>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">💼 What&apos;s included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                                <Check className="h-5 w-5 mr-2" />
                                What&apos;s Included
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

                {/* Enhanced Reviews */}
                <section className="mb-8">
                    <Reviews
                        reviews={reviews}
                        totalReviews={experience.reviewCount}
                        averageRating={experience.rating}
                        title="⭐ Client Reviews"
                    />
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
                            <p className="text-gray-600 italic">&quot;Every moment, exclusively yours.&quot;</p>
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
