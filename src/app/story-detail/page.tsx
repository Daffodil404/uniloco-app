'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Star, ArrowLeft, MapPin, Clock, User, ShoppingCart } from 'lucide-react';

// Mock story data - same as in bookshelf
const story = {
    id: 'luxembourg-city-tour',
    title: 'Luxembourg City Explorer',
    creator: 'Culture Enthusiast',
    location: 'Luxembourg City, Luxembourg',
    description: 'Discover the rich history and stunning architecture of Luxembourg City. This comprehensive tour takes you through UNESCO World Heritage sites, ancient fortifications, and charming old town streets.',
    rating: 4.9,
    reviews: 128,
    price: 0,
    emoji: '🏰',
    duration: '2 days',
    tags: ['History', 'Architecture', 'Culture'],
    difficulty: 'Easy',
    highlights: [
        'Notre-Dame Cathedral',
        'Palais Grand-Ducal',
        'Casemates du Bock',
        'Place d\'Armes',
        'Adolphe Bridge'
    ]
};

export default function StoryDetailPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex flex-col">
            {/* Header */}
            <div className="p-4 flex items-center justify-between bg-white shadow-sm">
                <button
                    onClick={() => router.back()}
                    className="text-slate-600 hover:text-slate-800"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-slate-800">Story Details</h1>
                <div className="w-6"></div>
            </div>

            {/* Story Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                    {/* Story Cover */}
                    <div className="w-full h-48 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] flex items-center justify-center text-6xl">
                        {story.emoji}
                    </div>

                    {/* Story Info */}
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">{story.title}</h2>
                                <p className="text-slate-600">by {story.creator}</p>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                                <Star size={16} className="text-amber-500 fill-amber-500" />
                                <span className="font-semibold">{story.rating}</span>
                                <span className="text-slate-500">({story.reviews})</span>
                            </div>
                        </div>

                        {/* Location and Duration */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center text-slate-600">
                                <MapPin size={16} className="mr-1" />
                                <span>{story.location}</span>
                            </div>
                            <div className="flex items-center text-slate-600">
                                <Clock size={16} className="mr-1" />
                                <span>{story.duration}</span>
                            </div>
                            <div className="flex items-center text-slate-600">
                                <User size={16} className="mr-1" />
                                <span>{story.difficulty}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-700 mb-6 leading-relaxed">
                            {story.description}
                        </p>

                        {/* Highlights */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">Highlights</h3>
                            <ul className="space-y-2">
                                {story.highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-[#fe585f] mr-2">•</span>
                                        <span className="text-slate-700">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tags */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {story.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-lg font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center bg-[#fe585f]"
                        >
                            {story.price === 0 ? (
                                'Start Adventure for FREE'
                            ) : (
                                <>
                                    <ShoppingCart size={20} className="mr-2" />
                                    Purchase for {story.price} UNC
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}