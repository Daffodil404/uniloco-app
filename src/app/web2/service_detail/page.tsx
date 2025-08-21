'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Reviews from '@/components/ui/reviews';
import Calendar from '@/components/ui/calendar';
import Web2Header from '@/components/ui/Web2Header';
import Image from 'next/image';
import TimeLineSteps from '@/components/ui/TimeLineSteps';

export default function ServiceDetailPage() {
    const router = useRouter();
    const [selectedPackage, setSelectedPackage] = useState('classic');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const [currentMonth, setCurrentMonth] = useState(new Date());

    // 服务提供者信息
    const serviceProvider = {
        name: "Laurent Dubois",
        title: "Professional Fashion Photographer",
        avatarImg: "/static/online_resource/photographer.png",
        description: "I'm Laurent, a professional fashion photographer with over 12 years of experience in Paris. I've worked with Vogue, Elle, Marie Claire and other prestigious magazines. I specialize in capturing beautiful moments in natural light. I believe every photo should tell a story, and every shoot is a unique artistic creation.",
        stats: {
            completed: 342,
            rating: 4.98,
            experience: 12
        },
        specialties: [
            "Portrait Photography",
            "Fashion Photography",
            "Wedding Photography",
            "Travel Photography",
            "Commercial Photography",
            "Art Photography"
        ],
        credentials: [
            "Certified Member of French Photographers Association",
            "Contracted Photographer for Vogue, Elle Magazines",
            "Official Photographer for Paris Fashion Week",
            "Recipient of French Ministry of Culture Art Photography Award",
            "Uniloco Exclusive Service Gold Certification"
        ]
    };

    // 服务套餐
    const packages = [
        {
            id: 'classic',
            name: 'Classic Portrait Package',
            price: 280,
            duration: '2 hours',
            description: 'Includes: 2-hour shoot + 20 edited photos + online gallery',
            isSelected: true
        },
        {
            id: 'fashion',
            name: 'Fashion Editorial Package',
            price: 450,
            duration: '4 hours',
            description: 'Includes: 4-hour shoot + makeup artist + 50 edited photos + physical album',
            isSelected: false
        },
        {
            id: 'wedding',
            name: 'Complete Wedding Package',
            price: 1200,
            duration: '8 hours',
            description: 'Includes: 8-hour shoot + assistant photographer + 200 edited photos + wedding album',
            isSelected: false
        }
    ];

    // 作品集
    const portfolio = [
        { id: 1, type: 'Portrait', icon: '👩‍🦰', description: 'Elegant portraits in natural light' },
        { id: 2, type: 'Fashion', icon: '👗', description: 'Vogue magazine editorial work' },
        { id: 3, type: 'Wedding', icon: '💒', description: 'Capturing precious moments' },
        { id: 4, type: 'Travel', icon: '🌍', description: 'Beautiful memories from around the world' },
        { id: 5, type: 'Commercial', icon: '👨‍💼', description: 'Professional corporate portraits' },
        { id: 6, type: 'Art', icon: '📸', description: 'Creative and aesthetic photography' }
    ];

    // 服务流程
    const processSteps = [
        {
            step: 1,
            title: "Consultation & Booking",
            description: "After submitting your booking request, I'll contact you within 2 hours to understand your photography needs, style preferences, and specific requirements in detail."
        },
        {
            step: 2,
            title: "Customized Planning",
            description: "Based on your needs, I'll create a personalized photography plan including location selection, wardrobe suggestions, and shooting style to ensure every detail meets your expectations."
        },
        {
            step: 3,
            title: "Professional Shooting",
            description: "Using professional equipment for photography, I'll guide poses and expressions throughout, creating a relaxed and enjoyable shooting atmosphere to capture the most natural and beautiful moments."
        },
        {
            step: 4,
            title: "Post-Production",
            description: "Professional retouching team performs fine post-processing including color correction, blemish removal, artistic effects, etc., ensuring every photo reaches professional standards."
        },
        {
            step: 5,
            title: "Delivery",
            description: "Deliver all photos within the agreed time, providing high-definition digital versions and online galleries. Premium packages also include beautiful physical albums."
        }
    ];

    // 客户评价
    const reviews = [
        {
            name: "Sophie Chen",
            role: "CEO",
            avatar: "S",
            rating: 5,
            date: "July 2024",
            type: "Commercial Photography",
            text: "Laurent photographed a complete set of corporate image photos for our company. His professionalism was impressive! He not only has excellent technical skills but more importantly understands our brand philosophy. The photos perfectly showcase the professional image we want to convey. The entire shooting process was very pleasant, highly recommended!",
            photos: "📸 Includes 12 corporate image photos"
        },
        {
            name: "Marie & Pierre",
            role: "Newlyweds",
            avatar: "M",
            rating: 5,
            date: "June 2024",
            type: "Wedding Photography",
            text: "This was the most important day of our lives, and Laurent captured every precious moment with his lens. His professionalism made us completely relaxed and naturally enjoy every moment of the wedding. When we received the photos, we were moved to tears. Every photo tells our love story. Thank you Laurent for capturing our love so beautifully!",
            photos: "📸 Includes complete wedding album (200+ photos)"
        },
        {
            name: "Julia Martinez",
            role: "Fashion Blogger",
            avatar: "J",
            rating: 5,
            date: "June 2024",
            type: "Fashion Photography",
            text: "As a fashion blogger, I've collaborated with many photographers, but Laurent is absolutely top-tier! His control of lighting and composition reaches artistic levels. During the shoot, he provided many professional suggestions that made me more confident in front of the camera. The photos received crazy likes from fans after posting, and I've already booked the next collaboration!",
            photos: "📸 Includes 50 fashion editorial photos"
        }
    ];

    // 可用性日历
    const availabilityCalendar = [
        { date: "8/16", status: "available" as const, label: "Available", price: 280 },
        { date: "8/17", status: "limited" as const, label: "Only 2 spots", price: 280 },
        { date: "8/18", status: "full" as const, label: "Full", price: 280 },
        { date: "8/19", status: "available" as const, label: "Available", price: 280 },
        { date: "8/20", status: "limited" as const, label: "Only 1 spot", price: 280 },
        { date: "8/21", status: "available" as const, label: "Available", price: 280 },
        { date: "8/22", status: "available" as const, label: "Available", price: 280 },
        { date: "8/23", status: "available" as const, label: "Available", price: 280 },
        { date: "8/24", status: "limited" as const, label: "Only 3 spots", price: 280 },
        { date: "8/25", status: "available" as const, label: "Available", price: 280 },
        { date: "8/26", status: "available" as const, label: "Available", price: 280 },
        { date: "8/27", status: "available" as const, label: "Available", price: 280 },
        { date: "8/28", status: "limited" as const, label: "Only 2 spots", price: 280 },
        { date: "8/29", status: "available" as const, label: "Available", price: 280 },
        { date: "8/30", status: "available" as const, label: "Available", price: 280 },
        { date: "8/31", status: "available" as const, label: "Available", price: 280 }
    ];

    const handleBooking = () => {
        alert('Booking request submitted!\n\nUniloco exclusive customer service will contact you within 2 hours:\n- Confirm photography needs and style preferences\n- Coordinate specific time and location\n- Provide professional advice and solutions\n- Confirm final pricing and payment methods\n\nThank you for choosing Uniloco exclusive services!');
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
                            {/* Service Provider Header */}
                            <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white p-8 text-center">
                                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 border-4 border-white/30 relative overflow-hidden">
                                    <Image src={serviceProvider.avatarImg} alt={serviceProvider.name} fill className="object-cover" />
                                </div>
                                <h1 className="text-3xl font-bold mb-2">{serviceProvider.name}</h1>
                                <p className="text-xl opacity-90 mb-6">{serviceProvider.title}</p>

                                <div className="flex justify-center gap-8">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">{serviceProvider.stats.completed}</div>
                                        <div className="text-sm opacity-80">Completed</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">{serviceProvider.stats.rating}</div>
                                        <div className="text-sm opacity-80">Rating</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">{serviceProvider.stats.experience} years</div>
                                        <div className="text-sm opacity-80">Experience</div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    {serviceProvider.description}
                                </p>

                                {/* Location Info */}
                                <div className="bg-gray-50 p-6 rounded-xl mb-8 border-l-4 border-[#fe585f]">
                                    <h4 className="font-semibold text-gray-900 mb-4">📍 Service Location</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <strong className="text-[#fe585f]">Main Studio</strong>
                                            <p className="text-gray-600 mt-1">Paris 9th District - Pigalle Studio</p>
                                            <p className="text-gray-600 text-sm">Professional lighting equipment and backgrounds</p>
                                        </div>
                                        <div>
                                            <strong className="text-[#fe585f]">Service Range</strong>
                                            <p className="text-gray-600 mt-1">Paris and surrounding 50km</p>
                                            <p className="text-gray-600 text-sm">On-location shooting available upon request</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <strong className="text-[#fe585f]">Popular Shooting Locations:</strong>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {['Eiffel Tower', 'Louvre Museum', 'Montmartre', 'Seine River', 'Champs-Élysées', 'Versailles Palace'].map(location => (
                                                <span key={location} className="bg-white px-3 py-1 rounded-full text-sm text-gray-600">
                                                    {location}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Specialties */}
                                <div className="mb-8">
                                    <h4 className="font-semibold text-gray-900 mb-4">💫 Specialties</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {serviceProvider.specialties.map(specialty => (
                                            <span key={specialty} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Credentials */}
                                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#fe585f]">
                                    <h4 className="font-semibold text-gray-900 mb-4">🏆 Professional Certifications</h4>
                                    <ul className="space-y-2">
                                        {serviceProvider.credentials.map(credential => (
                                            <li key={credential} className="flex items-center gap-3 text-gray-700">
                                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                {credential}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 sticky top-24">
                            <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-xl text-center mb-6">
                                <div className="font-semibold">🔥 High demand this month</div>
                                <div className="text-sm mt-1">Book early to secure your spot</div>
                            </div>

                            {/* Package Selection */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-4">📋 Service Packages</h4>
                                <div className="space-y-3">
                                    {packages.map(pkg => (
                                        <div
                                            key={pkg.id}
                                            onClick={() => setSelectedPackage(pkg.id)}
                                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedPackage === pkg.id
                                                    ? 'border-[#fe585f] bg-[#fe585f]/5'
                                                    : 'border-gray-200 hover:border-[#fe585f]/50'
                                                }`}
                                        >
                                            <div className="font-semibold text-gray-900">{pkg.name}</div>
                                            <div className="text-2xl font-bold text-[#fe585f]">€{pkg.price}</div>
                                            <div className="text-sm text-gray-600">{pkg.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Booking Form */}
                            <form className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min="2024-08-16"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fe585f] focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Shooting Location
                                    </label>
                                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Choose location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="studio">Paris Studio (Pigalle District)</SelectItem>
                                            <SelectItem value="eiffel">Eiffel Tower Area (+€50)</SelectItem>
                                            <SelectItem value="louvre">Louvre/Tuileries Garden (+€30)</SelectItem>
                                            <SelectItem value="montmartre">Montmartre (+€40)</SelectItem>
                                            <SelectItem value="seine">Seine River (+€30)</SelectItem>
                                            <SelectItem value="versailles">Versailles Palace (+€80)</SelectItem>
                                            <SelectItem value="custom">Custom Location (Price TBD)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Shooting Type
                                    </label>
                                    <Select value={selectedType} onValueChange={setSelectedType}>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="portrait">Portrait</SelectItem>
                                            <SelectItem value="couple">Couple</SelectItem>
                                            <SelectItem value="family">Family</SelectItem>
                                            <SelectItem value="commercial">Commercial</SelectItem>
                                            <SelectItem value="event">Event</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Special Requirements
                                    </label>
                                    <textarea
                                        placeholder="Describe your photography needs, style preferences, special requirements..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fe585f] focus:border-transparent h-24 resize-none"
                                    />
                                </div>
                            </form>

                            <Button
                                onClick={handleBooking}
                                className="w-full bg-[#fe585f] hover:bg-[#e04a50] text-white py-4 text-lg font-semibold mb-4 rounded-xl"
                            >
                                Submit Booking Request
                            </Button>

                            <p className="text-center text-sm text-gray-600">
                                💎 Uniloco exclusive customer service will contact you within 2 hours
                            </p>
                        </div>
                    </div>
                </section>

                {/* Portfolio Gallery */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">📷 Portfolio Showcase</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {portfolio.map(item => {
                            const imagePath = `/static/web2/${item.type.toLowerCase()}.png`;
                            return (
                                <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group bg-gray-100">
                                    <Image
                                        src={imagePath}
                                        alt={item.type}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(min-width: 1024px) 16.66vw, (min-width: 768px) 33.33vw, 50vw"
                                        priority={item.id <= 2}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
                                        <h4 className="text-white text-sm font-semibold">{item.type}</h4>
                                        <p className="text-white/80 text-xs">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-center text-gray-600 mt-4">
                        💡 Click to view complete portfolio or contact me for more case studies
                    </p>
                </section>

                {/* Enhanced Calendar */}
                <section className="mb-8">
                    <Calendar
                        days={availabilityCalendar}
                        currentMonth={currentMonth}
                        onMonthChange={handleMonthChange}
                        onDateSelect={handleDateSelect}
                        selectedDate={selectedDate}
                        title="📅 Recent Availability"
                    />
                </section>

                {/* Service Process */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">📋 Service Process</h3>
                    <TimeLineSteps
                        steps={processSteps.map(s => ({
                            title: `${s.step}. ${s.title}`,
                            description: s.description,
                            bottom: null
                        }))}
                    />
                </section>

                {/* Enhanced Reviews */}
                <section className="mb-8">
                    <Reviews
                        reviews={reviews}
                        totalReviews={serviceProvider.stats.completed}
                        averageRating={serviceProvider.stats.rating}
                        title="⭐ Client Reviews"
                    />
                </section>

                {/* Uniloco Guarantee */}
                <section className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🛡️ Uniloco Exclusive Service Guarantee</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                            <div className="text-3xl mb-3">🎯</div>
                            <h5 className="font-semibold text-gray-900 mb-2">Professional Certification</h5>
                            <p className="text-sm text-gray-600">All service providers undergo strict background checks and professional skill certification</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                            <div className="text-3xl mb-3">👨‍💼</div>
                            <h5 className="font-semibold text-gray-900 mb-2">Exclusive Customer Service</h5>
                            <p className="text-sm text-gray-600">One-on-one exclusive customer service follows up throughout to ensure service quality</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                            <div className="text-3xl mb-3">💰</div>
                            <h5 className="font-semibold text-gray-900 mb-2">Satisfaction Guarantee</h5>
                            <p className="text-sm text-gray-600">100% refund if not satisfied, zero risk to enjoy high-quality services</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                            <div className="text-3xl mb-3">🔒</div>
                            <h5 className="font-semibold text-gray-900 mb-2">Privacy Protection</h5>
                            <p className="text-sm text-gray-600">Strict privacy protection agreements, your information and photos are absolutely safe</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 text-center">
                        <h4 className="text-xl font-bold text-[#fe585f] mb-4">🌟 Why Choose Uniloco Exclusive Services?</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div>
                                <strong>VS Freelance Platforms:</strong>
                                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                    <li>✓ Strict screening, not open registration</li>
                                    <li>✓ Professional certification, quality guarantee</li>
                                    <li>✓ Exclusive customer service, worry-free after-sales</li>
                                </ul>
                            </div>
                            <div>
                                <strong>VS Traditional Studios:</strong>
                                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                    <li>✓ Flexible scheduling, personalized customization</li>
                                    <li>✓ Transparent pricing, no hidden fees</li>
                                    <li>✓ Diverse choices, rich styles</li>
                                </ul>
                            </div>
                            <div>
                                <strong>VS Regular Booking Platforms:</strong>
                                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                    <li>✓ Deep understanding, precise matching</li>
                                    <li>✓ Full follow-up, quality monitoring</li>
                                    <li>✓ Satisfaction guarantee, risk protection</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
