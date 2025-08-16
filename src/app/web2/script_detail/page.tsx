'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Star, Clock, Users, MapPin, Check, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Web2Header from '@/components/ui/Web2Header';

function ScriptDetailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const scriptId = searchParams.get('id');
    
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedPeople, setSelectedPeople] = useState('');


    // Mock script data based on the York Ghost Script
    const script = {
        id: scriptId || 'york-ghost',
        title: 'The York Ghost Legend',
        subtitle: 'Immerse yourself in the ancient mysteries of York, a city with over two millennia of history. Unravel supernatural enigmas that span centuries while interacting with masterfully crafted characters in authentic historical settings.',
        category: 'Mystery & Intrigue',
        image: '/static/1.jpg',
        price: 95,
        currency: '£',
        rating: 4.9,
        reviewCount: 127,
        duration: '4 hours',
        groupSize: '4-6 guests',
        difficulty: 'Intermediate',
        location: 'York, England',
        availability: 'Available tomorrow',
        timeSlots: ['14:00 - 18:00', '19:00 - 23:00'],
        bgImage: 'linear-gradient(135deg, rgba(44, 62, 80, 0.9) 0%, rgba(52, 73, 94, 0.9) 100%)',
        icon: '🏰'
    };

    const storyBackground = {
        title: 'Story Background',
        content: 'A mysterious archaeologist discovered an ancient parchment scroll in York Minster, containing the truth about the city founder\'s bizarre death. However, on the eve of deciphering the key information, the archaeologist mysteriously disappeared, leaving scattered clues throughout York. As a special investigation team, you must solve this thousand-year-old mystery spanning treason, torture, and murder before the ghosts awaken.'
    };

    const characterRoles = [
        {
            icon: '⛪',
            name: 'Father William',
            role: 'York Minster Priest',
            description: 'Guardian of thousand-year-old secrets, holding key information to ancient prophecies.'
        },
        {
            icon: '🛒',
            name: 'Margaret the Merchant',
            role: 'Shambles Street Vendor',
            description: 'A merchant who has lived here for generations, witnessing the archaeologist\'s final movements.'
        },
        {
            icon: '👻',
            name: 'Builder Ghost',
            role: 'Millennium Avenger',
            description: 'A craftsman who fell during the construction of York Minster, seeking justice and peace for a thousand years.'
        },
        {
            icon: '🔍',
            name: 'Dr. Emily Harrison',
            role: 'Missing Archaeologist',
            description: 'The mysteriously disappeared scholar who interacts with players remotely through recordings and diaries.'
        }
    ];

    const gameFlow = [
        {
            step: 1,
            time: '14:00 - 14:30',
            title: 'Opening Ceremony & Team Assembly',
            location: 'Roman Column, Minster Yard',
            description: 'Meet at the historic Roman column in front of York Minster to receive the mysterious commission. Distribute clue packages, investigation tools, and game manuals. Team members get to know each other and develop initial investigation strategies.'
        },
        {
            step: 2,
            time: '14:30 - 15:30',
            title: 'York Minster Exploration',
            location: 'York Minster Interior',
            description: 'Dive deep into the thousand-year-old cathedral to find ghostly clues from the builders. Interact with NPC priest Father William, decipher ancient inscriptions, and discover the first important evidence. Explore the church crypt and ancient stone carvings.'
        },
        {
            step: 3,
            time: '15:30 - 16:30',
            title: 'Shambles Street Puzzle Challenge',
            location: 'The Shambles',
            description: 'Track the missing archaeologist\'s footsteps in the well-preserved medieval street. Dialogue with merchant NPC Margaret, search for scattered parchment fragments in ancient shops, and piece together historical truth.'
        },
        {
            step: 4,
            time: '16:30 - 17:30',
            title: 'Underground Chamber Final Showdown',
            location: 'York Castle Museum Underground',
            description: 'Enter the mysterious underground space to face the ultimate challenge - the vengeful ghost from a thousand years ago. Team collaboration to solve the final puzzle and complete the mission to save York.'
        },
        {
            step: 5,
            time: '17:30 - 18:00',
            title: 'Debrief & Celebration',
            location: 'The Golden Fleece Inn',
            description: 'Game debrief at the 600-year-old traditional English pub, receive completion certificates, enjoy authentic English afternoon tea, and take photos with NPC actors.'
        }
    ];

    const locationInfo = {
        meetingPoint: {
            address: 'Roman Column, Minster Yard, York',
            time: '15 minutes before start',
            transport: '10 minutes walk from York Station'
        },
        mainScenes: [
            'York Minster (York Minster)',
            'The Shambles (Meat Street)',
            'York Castle Museum',
            'Mysterious Underground Chamber'
        ],
        highlights: [
            'Free shuttle service (city center hotels)',
            'All attraction tickets included',
            'Dedicated game app provided'
        ]
    };

    const includes = [
        'Professional NPC actors (3 people)',
        'All attraction tickets (York Minster + Castle Museum)',
        'Game props and investigation tools',
        'Game manual and clue system',
        'Golden Fleece Inn English afternoon tea',
        'Completion certificate and souvenirs',
        'Professional photographer service',
        'Free shuttle service (city center hotels)'
    ];

    const excludes = [
        'Round-trip transportation to York',
        'Personal expenses and additional food',
        'Accommodation costs',
        'Tips (optional)'
    ];

    const reviews = [
        {
            name: 'Lisa Chen',
            avatar: 'L',
            rating: 5,
            date: 'July 2024',
            type: 'History Enthusiast',
            text: 'This is the best script experience I\'ve ever had! It\'s not just a game, but a real historical adventure. The NPC actors\' professionalism is amazing, and Father William\'s performance made us completely believe in this character\'s existence.'
        },
        {
            name: 'Marcus Johnson',
            avatar: 'M',
            rating: 5,
            date: 'June 2024',
            type: 'Script Enthusiast',
            text: 'As someone who\'s played over 50 murder mystery games, I can confidently say this is world-class! The way they\'ve woven real York history into the narrative is brilliant. The ghost stories are based on actual local legends.'
        }
    ];

    const availabilitySessions = [
        {
            date: 'Today (August 16th Friday)',
            sessions: [
                { time: '14:00 - 18:00', status: 'full', spots: '6/6', note: 'No waiting list' },
                { time: '19:00 - 23:00', status: 'full', spots: '6/6', note: 'No waiting list' }
            ]
        },
        {
            date: 'Tomorrow (August 17th Saturday)',
            sessions: [
                { time: '14:00 - 18:00', status: 'limited', spots: '5/6', note: '🔥 Only 1 spot left' },
                { time: '19:00 - 23:00', status: 'available', spots: '3/6', note: '✅ Available now' }
            ]
        },
        {
            date: 'Day After Tomorrow (August 18th Sunday)',
            sessions: [
                { time: '14:00 - 18:00', status: 'available', spots: '2/6', note: '✅ Available now' },
                { time: '19:00 - 23:00', status: 'available', spots: '1/6', note: '✅ Available now' }
            ]
        }
    ];

    const handleBooking = () => {
        alert('Booking The York Ghost Legend Script Experience\n\n✨ You will receive:\n• Dedicated customer service within 2 hours\n• Detailed game preparation guide\n• York history and culture materials\n• Emergency contact and meeting details\n• Golden Fleece Inn booking confirmation\n• Group matching service (if needed)\n\n🏰 Ready to step into the millennium mystery?');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'full': return 'border-red-500 text-red-600';
            case 'limited': return 'border-yellow-500 text-yellow-600';
            case 'available': return 'border-green-500 text-green-600';
            default: return 'border-gray-300 text-gray-600';
        }
    };

    const getStatusBg = (status: string) => {
        switch (status) {
            case 'full': return 'bg-red-50';
            case 'limited': return 'bg-yellow-50';
            case 'available': return 'bg-green-50';
            default: return 'bg-gray-50';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Web2Header />

            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Left Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            {/* Hero Image */}
                            <div 
                                className="h-96 relative flex items-center justify-center text-6xl"
                                style={{ background: script.bgImage }}
                            >
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="relative z-10">{script.icon}</div>
                                
                                {/* Difficulty Badge */}
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <span className="text-sm font-semibold text-gray-700">{script.difficulty}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white px-3 py-1 rounded-full text-xs font-medium inline-block mb-4">
                                    🎭 Uniloco Tailored Journey
                                </div>
                                
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {script.title}
                                </h1>
                                
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    {script.subtitle}
                                </p>

                                {/* Meta Information */}
                                <div className="flex flex-wrap gap-6 mb-6">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Clock className="h-5 w-5" />
                                        <span className="font-medium">{script.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Users className="h-5 w-5" />
                                        <span className="font-medium">{script.groupSize}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <MapPin className="h-5 w-5" />
                                        <span className="font-medium">{script.location}</span>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-1">
                                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                        <span className="font-semibold text-gray-900">{script.rating}</span>
                                        <span className="text-gray-600">({script.reviewCount} reviews)</span>
                                    </div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                    <span className="text-gray-600">{script.category}</span>
                                </div>
                            </div>
                        </div>

                        {/* Story Background */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mt-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">🔍 Story Background</h3>
                            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#fe585f]">
                                <p className="text-gray-700 leading-relaxed">{storyBackground.content}</p>
                            </div>
                        </div>

                        {/* Character Roles */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mt-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">👥 Team Roles</h3>
                            <div className="bg-gray-50 p-6 rounded-xl mb-6">
                                <p className="text-lg mb-4 text-center font-semibold text-gray-800">
                                    <strong>You are a historical investigation team</strong>
                                </p>
                                <p className="text-gray-600 leading-relaxed text-center">
                                    Each member has unique skills and perspectives, but no specific role assignment is required. Team cooperation is key - some are good at observing details, some are knowledgeable about history, some are skilled at logical reasoning, and some have intuitive insights. Your different strengths will naturally come into play during exploration.
                                </p>
                                <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-[#fe585f]">
                                    <strong className="text-[#fe585f]">💡 Game Tip: </strong>
                                    <span className="text-gray-600">Keep an open mind, trust your intuition, and team communication is the key to solving puzzles!</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 sticky top-24">
                            <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-xl text-center mb-6">
                                <div className="font-semibold">🔥 Most Popular Script This Week!</div>
                                <div className="text-sm mt-1">Book now to secure your spot</div>
                            </div>

                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {script.currency}{script.price}
                                </div>
                                <div className="text-gray-600 text-sm">per guest</div>
                            </div>

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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fe585f] focus:border-transparent text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Start Time
                                    </label>
                                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Choose time slot" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {script.timeSlots.map((slot, index) => (
                                                <SelectItem key={index} value={slot}>
                                                    {slot}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Participants
                                    </label>
                                    <Select value={selectedPeople} onValueChange={setSelectedPeople}>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Select people" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 person (group with others)</SelectItem>
                                            <SelectItem value="2">2 people</SelectItem>
                                            <SelectItem value="3">3 people</SelectItem>
                                            <SelectItem value="4">4 people (minimum team)</SelectItem>
                                            <SelectItem value="5">5 people</SelectItem>
                                            <SelectItem value="6">6 people (recommended)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Game Pace Preference
                                    </label>
                                    <Select>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Choose pace" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="standard">Standard pace (recommended)</SelectItem>
                                            <SelectItem value="relaxed">Relaxed pace (for beginners)</SelectItem>
                                            <SelectItem value="fast">Fast pace (for experienced players)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Language Preference
                                    </label>
                                    <Select>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Choose language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bilingual">Chinese + English (bilingual)</SelectItem>
                                            <SelectItem value="english">English only</SelectItem>
                                            <SelectItem value="chinese">Chinese only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </form>

                            <Button 
                                onClick={handleBooking}
                                className="w-full bg-[#fe585f] hover:bg-[#e04a50] text-white py-4 text-lg font-semibold mb-4 rounded-xl"
                            >
                                Book Experience Now
                            </Button>
                            
                            <p className="text-center text-sm text-gray-600 mb-4">
                                🎭 Uniloco Original Script | Professional NPC Performance Guarantee
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

                {/* Available Sessions */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">📅 Available Sessions</h3>
                    <div className="text-sm text-gray-600 mb-8">
                        * Maximum 6 people per session, minimum 4 people to form a group (1-3 people can be grouped with other players)
                    </div>
                    
                    {/* Timeline Sessions */}
                    <div className="space-y-6">
                        {availabilitySessions.map((day, dayIndex) => (
                            <div key={dayIndex} className="relative">
                                {/* Timeline Line */}
                                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                                
                                {/* Day Header */}
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-[#fe585f] rounded-full flex items-center justify-center text-white font-semibold text-sm relative z-10">
                                        {dayIndex + 1}
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-semibold text-gray-800">{day.date}</h4>
                                        <p className="text-sm text-gray-500">
                                            {day.sessions.length} sessions available
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Sessions Grid */}
                                <div className="ml-16 space-y-3">
                                    {day.sessions.map((session, sessionIndex) => (
                                        <div
                                            key={sessionIndex}
                                            className={`group relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${
                                                session.status === 'full' 
                                                    ? 'border-gray-200 bg-gray-50 opacity-60' 
                                                    : session.status === 'limited'
                                                    ? 'border-yellow-300 bg-yellow-50 hover:border-yellow-400'
                                                    : 'border-green-300 bg-green-50 hover:border-green-400'
                                            }`}
                                        >
                                            {/* Status Indicator */}
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-3 h-3 rounded-full ${
                                                        session.status === 'full' ? 'bg-gray-400' :
                                                        session.status === 'limited' ? 'bg-yellow-400' : 'bg-green-400'
                                                    }`}></div>
                                                    <span className="font-semibold text-gray-800">{session.time}</span>
                                                </div>
                                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    session.status === 'full' ? 'bg-gray-200 text-gray-600' :
                                                    session.status === 'limited' ? 'bg-yellow-200 text-yellow-700' : 'bg-green-200 text-green-700'
                                                }`}>
                                                    {session.status === 'full' ? 'Full' :
                                                     session.status === 'limited' ? 'Limited' : 'Available'}
                                                </div>
                                            </div>
                                            
                                            {/* Session Details */}
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-gray-600">{session.spots} people</p>
                                                    <p className={`text-sm font-medium ${
                                                        session.status === 'full' ? 'text-gray-500' :
                                                        session.status === 'limited' ? 'text-yellow-600' : 'text-green-600'
                                                    }`}>
                                                        {session.note}
                                                    </p>
                                                </div>
                                                
                                                {session.status !== 'full' && (
                                                    <Button 
                                                        size="sm"
                                                        className={`ml-4 ${
                                                            session.status === 'limited' 
                                                                ? 'bg-yellow-500 hover:bg-yellow-600' 
                                                                : 'bg-green-500 hover:bg-green-600'
                                                        } text-white`}
                                                    >
                                                        Select
                                                    </Button>
                                                )}
                                            </div>
                                            
                                            {/* Hover Effect */}
                                            {session.status !== 'full' && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Next Week Preview - Collapsible */}
                    <div className="mt-8">
                        <details className="group">
                            <summary className="cursor-pointer list-none">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-[#fe585f] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                            📅
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Next Week Schedule (August 19-25)</h4>
                                            <p className="text-sm text-gray-600">14 sessions available, 60% booked</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-500 group-open:hidden">View Schedule</span>
                                        <span className="text-sm text-gray-500 hidden group-open:inline">Hide Schedule</span>
                                        <ChevronRight className="h-4 w-4 text-gray-500 transition-transform group-open:rotate-90" />
                                    </div>
                                </div>
                            </summary>
                            
                            <div className="mt-4 p-6 bg-gray-50 rounded-xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                                        <div key={day} className="text-center">
                                            <div className="font-semibold text-gray-800 mb-2">{day}</div>
                                            <div className="space-y-2">
                                                <div className="p-2 bg-green-100 border border-green-200 rounded text-xs">
                                                    <div className="font-medium text-green-700">14:00</div>
                                                    <div className="text-green-600">Available</div>
                                                </div>
                                                <div className="p-2 bg-yellow-100 border border-yellow-200 rounded text-xs">
                                                    <div className="font-medium text-yellow-700">19:00</div>
                                                    <div className="text-yellow-600">Limited</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 text-center">
                                    <Button variant="outline" className="border-[#fe585f] text-[#fe585f] hover:bg-[#fe585f] hover:text-white">
                                        Book Next Week Session
                                    </Button>
                                </div>
                            </div>
                        </details>
                    </div>

                    {/* Booking Tips - Collapsible */}
                    <div className="mt-6">
                        <details className="group">
                            <summary className="cursor-pointer list-none">
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">
                                            💡
                                        </div>
                                        <span className="font-semibold text-yellow-800">Booking Tips & Guidelines</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-yellow-600 transition-transform group-open:rotate-90" />
                                </div>
                            </summary>
                            
                            <div className="mt-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white/50 p-4 rounded-lg">
                                        <h5 className="font-semibold text-yellow-800 mb-2">Single Booking</h5>
                                        <p className="text-yellow-700 text-sm">
                                            System will automatically match you with other players to ensure optimal gaming experience
                                        </p>
                                    </div>
                                    <div className="bg-white/50 p-4 rounded-lg">
                                        <h5 className="font-semibold text-yellow-800 mb-2">Group Advantages</h5>
                                        <p className="text-yellow-700 text-sm">
                                            Teaming up with strangers often creates unexpected chemistry and enhances the experience
                                        </p>
                                    </div>
                                    <div className="bg-white/50 p-4 rounded-lg">
                                        <h5 className="font-semibold text-yellow-800 mb-2">Pace Adjustment</h5>
                                        <p className="text-yellow-700 text-sm">
                                            Director will adjust game pace based on team dynamics and experience level
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="mt-4 p-4 bg-white/30 rounded-lg">
                                    <h5 className="font-semibold text-yellow-800 mb-2">🎯 Quick Booking Guide</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                                        <div>
                                            <strong>For Beginners:</strong> Choose relaxed pace, any time slot
                                        </div>
                                        <div>
                                            <strong>For Experienced Players:</strong> Try fast pace, evening sessions
                                        </div>
                                        <div>
                                            <strong>For Groups:</strong> Book 4-6 people for best experience
                                        </div>
                                        <div>
                                            <strong>For Solo Travelers:</strong> 1-3 people, we&apos;ll match you with others
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </details>
                    </div>
                </section>

                {/* Location Information */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">🗺️ Game Location & Route</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-[#fe585f]">
                            <h4 className="text-lg font-semibold text-[#fe585f] mb-4">📍 Meeting Point</h4>
                            <p><strong>Address:</strong> Roman Column, Minster Yard, York</p>
                            <p><strong>Meeting Time:</strong> 15 minutes before start</p>
                            <p><strong>Transport:</strong> 10 minutes walk from York Station</p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center space-x-2">
                                    <span className="text-[#fe585f]">🚗</span>
                                    <span>Free shuttle service (city center hotels)</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-[#fe585f]">🎫</span>
                                    <span>All attraction tickets included</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-[#fe585f]">📱</span>
                                    <span>Dedicated game app provided</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-[#fe585f]">
                            <h4 className="text-lg font-semibold text-[#fe585f] mb-4">🏰 Main Scenes</h4>
                            <p><strong>Core Area:</strong> York Historic District</p>
                            <p><strong>Game Radius:</strong> Walking distance</p>
                            <p><strong>Ground Type:</strong> Ancient cobblestone (comfortable shoes needed)</p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center space-x-2">
                                    <span className="text-[#fe585f]">⛪</span>
                                    <span>York Minster</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-[#fe585f]">🏘️</span>
                                    <span>The Shambles</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-[#fe585f]">🏰</span>
                                    <span>York Castle Museum</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-[#fe585f]">👻</span>
                                    <span>Mysterious Underground Chamber</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Interactive Map */}
                    <div className="h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl relative overflow-hidden flex items-center justify-center text-white">
                        <div className="text-center relative z-10">
                            <p className="text-xl mb-2 font-medium">🗺️ York Old Town Game Map</p>
                            <p className="text-sm opacity-80">Click to view detailed game route and hidden locations</p>
                        </div>
                        {/* Location Pins */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#fe585f] rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                        <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white"></div>
                        <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white"></div>
                        <div className="absolute bottom-1/3 left-2/3 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white"></div>
                    </div>
                </section>

                {/* Game Flow */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">🎮 Game Flow</h3>
                    <div className="space-y-6">
                        {gameFlow.map((step, index) => (
                            <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-xl border-l-4 border-[#fe585f] hover:bg-gray-100 transition-colors">
                                <div className="w-12 h-12 bg-[#fe585f] text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                                    {step.step}
                                </div>
                                <div className="flex-1">
                                    <div className="text-[#fe585f] font-medium text-sm mb-2">{step.time}</div>
                                    <h4 className="font-semibold text-lg mb-2 text-gray-900">{step.title}</h4>
                                    <p className="text-gray-600 text-sm mb-2"><strong>Location:</strong> {step.location}</p>
                                    <p className="text-gray-600 leading-relaxed">{step.description.replace(/'/g, '&apos;')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* NPC Cast */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">🎭 Professional NPC Cast</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {characterRoles.map((character, index) => (
                            <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-xl text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border-2 border-white/30">
                                        {character.icon}
                                    </div>
                                    <h4 className="text-lg font-semibold mb-2">{character.name}</h4>
                                    <p className="text-sm opacity-80 mb-3">{character.role}</p>
                                    <p className="text-xs leading-relaxed opacity-90">{character.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 p-6 bg-gray-50 rounded-xl text-center">
                        <h4 className="text-lg font-semibold text-[#fe585f] mb-4">🎭 NPC Professional Guarantee</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <strong>Professional Actor Background</strong>
                                <p className="text-gray-600 text-sm mt-1">Average 2+ years professional theater experience</p>
                            </div>
                            <div>
                                <strong>Historical Knowledge Training</strong>
                                <p className="text-gray-600 text-sm mt-1">Trained by York local history experts</p>
                            </div>
                            <div>
                                <strong>Immersive Performance</strong>
                                <p className="text-gray-600 text-sm mt-1">Specialized in interactive script performance and improvisation</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What's Included */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">💼 What&apos;s Included</h3>
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

                {/* Reviews */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">⭐ Player Reviews ({script.reviewCount})</h3>
                    
                    <div className="flex items-center space-x-8 mb-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#fe585f]">{script.rating}</div>
                            <div className="flex text-yellow-400 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(script.rating) ? 'fill-current' : ''}`} />
                                ))}
                            </div>
                            <div className="text-sm text-gray-600">{script.reviewCount} reviews</div>
                        </div>
                        
                        <div className="flex-1">
                            <p className="text-gray-600 mb-4">
                                This is one of Uniloco&apos;s most popular immersive script experiences, praised by players for its historical authenticity and professional actor standards.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <strong>Immersion</strong>
                                    <div className="text-[#fe585f]">4.95/5.0</div>
                                </div>
                                <div>
                                    <strong>Script Quality</strong>
                                    <div className="text-[#fe585f]">4.92/5.0</div>
                                </div>
                                <div>
                                    <strong>NPC Acting</strong>
                                    <div className="text-[#fe585f]">4.88/5.0</div>
                                </div>
                                <div>
                                    <strong>Historical Authenticity</strong>
                                    <div className="text-[#fe585f]">4.94/5.0</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white font-semibold">
                                        {review.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-semibold text-gray-900">{review.name}</h5>
                                        <div className="text-sm text-gray-600">{review.date} · {review.type}</div>
                                    </div>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{review.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Uniloco Advantage */}
                <section className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎭 Uniloco Tailored Journey Exclusive Advantages</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">📚</div>
                            <h5 className="font-semibold text-gray-900 mb-2">Historical Authenticity</h5>
                            <p className="text-sm text-gray-600">Based on 200+ real York ghost stories, developed in collaboration with York University History Department</p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">🎭</div>
                            <h5 className="font-semibold text-gray-900 mb-2">Professional Actors</h5>
                            <p className="text-sm text-gray-600">Royal Shakespeare Company members as NPCs, 5+ years immersive experience performance</p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">🔧</div>
                            <h5 className="font-semibold text-gray-900 mb-2">High-Tech Support</h5>
                            <p className="text-sm text-gray-600">Dedicated App + AR Augmented Reality + Smart Clue System, perfect fusion of technology and history</p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">🛡️</div>
                            <h5 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h5>
                            <p className="text-sm text-gray-600">Uniloco exclusive original script, dedicated customer service, full refund if not satisfied</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6">
                        <h4 className="text-xl font-bold text-[#fe585f] mb-4 text-center">🌟 Difference from Regular Script Games</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <strong>VS Indoor Script Games:</strong>
                                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                    <li>✓ Real historical scenes, non-fictional background</li>
                                    <li>✓ Outdoor + indoor combined experience</li>
                                    <li>✓ Professional actors live interaction</li>
                                </ul>
                            </div>
                            <div>
                                <strong>VS City Exploration Games:</strong>
                                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                    <li>✓ Deep storyline and role-playing</li>
                                    <li>✓ Professional historical knowledge integration</li>
                                    <li>✓ High-quality service guarantee</li>
                                </ul>
                            </div>
                            <div>
                                <strong>VS Traditional City Tours:</strong>
                                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                    <li>✓ Interactive participation, not passive viewing</li>
                                    <li>✓ Immersive story experience</li>
                                    <li>✓ Team collaboration puzzle fun</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default function ScriptDetailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ScriptDetailContent />
        </Suspense>
    );
}
