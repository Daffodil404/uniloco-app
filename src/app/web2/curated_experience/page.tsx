'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Star, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Web2Header from '@/components/ui/Web2Header';

export default function CuratedExperiencePage() {
    const router = useRouter();
    const [likedExperiences, setLikedExperiences] = useState<Set<string>>(new Set());

    const handleLike = (experienceId: string) => {
        setLikedExperiences(prev => {
            const newSet = new Set(prev);
            if (newSet.has(experienceId)) {
                newSet.delete(experienceId);
            } else {
                newSet.add(experienceId);
            }
            return newSet;
        });
    };

    const handleExperienceClick = (experienceId: string) => {
        router.push(`/web2/experience_detail?id=${experienceId}`);
    };

    const cities = [
        {
            name: "Strasbourg",
            country: "France",
            experiences: [
                {
                    id: "strasbourg-1",
                    title: "Visit Strasbourg's Popular Attractions and Curiosities",
                    image: "/static/1.jpg",
                    price: 252,
                    rating: 5.0,
                    duration: "2.5 hours",
                    groupSize: "1-8 people",
                    isHot: true,
                    description: "Explore the iconic Strasbourg Cathedral and discover hidden gems in the historic quarter"
                },
                {
                    id: "strasbourg-2",
                    title: "Free Tour of Strasbourg (Spanish)",
                    image: "/static/2.png",
                    price: 0,
                    rating: 4.85,
                    duration: "2 hours",
                    groupSize: "1-15 people",
                    isHot: false,
                    description: "Discover the city's rich history and culture with a local Spanish-speaking guide"
                },
                {
                    id: "strasbourg-3",
                    title: "Experience Strasbourg Like a Local",
                    image: "/static/3.png",
                    price: 227,
                    rating: 4.97,
                    duration: "3 hours",
                    groupSize: "1-6 people",
                    isHot: true,
                    description: "Immerse yourself in local culture with authentic experiences and insider knowledge"
                },
                {
                    id: "strasbourg-4",
                    title: "Create Your Song in the Recording Studio",
                    image: "/static/4.png",
                    price: 504,
                    rating: 5.0,
                    duration: "2 hours",
                    groupSize: "1-4 people",
                    isHot: false,
                    description: "Professional recording session with experienced producers and musicians"
                },
                {
                    id: "strasbourg-5",
                    title: "Bike Tour of Strasbourg",
                    image: "/static/5.jpeg",
                    price: 328,
                    rating: 4.92,
                    duration: "3 hours",
                    groupSize: "1-10 people",
                    isHot: true,
                    description: "Cycle through the picturesque streets and discover the city's architectural wonders"
                },
                {
                    id: "strasbourg-6",
                    title: "Explore Strasbourg's Christmas Market with a Local",
                    image: "/static/1.jpg",
                    price: 294,
                    rating: 4.6,
                    duration: "2.5 hours",
                    groupSize: "1-8 people",
                    isHot: false,
                    description: "Experience the magical Christmas atmosphere with traditional treats and crafts"
                },
                {
                    id: "strasbourg-7",
                    title: "Locals Take You to Taste Strasbourg Cuisine (Full Meal)",
                    image: "/static/2.png",
                    price: 630,
                    rating: 4.85,
                    duration: "3 hours",
                    groupSize: "1-6 people",
                    isHot: true,
                    description: "Savor authentic Alsatian dishes and learn about local culinary traditions"
                }
            ]
        },
        {
            name: "Marseille",
            country: "France",
            experiences: [
                {
                    id: "marseille-1",
                    title: "Explore the Calanques of the French Riviera by Kayak",
                    image: "/static/3.png",
                    price: 420,
                    rating: 4.86,
                    duration: "4 hours",
                    groupSize: "1-6 people",
                    isHot: true,
                    description: "Paddle through crystal-clear waters and discover hidden coves along the stunning coastline"
                },
                {
                    id: "marseille-2",
                    title: "Explore the Blue Coast Coves, Stroll and Swim",
                    image: "/static/4.png",
                    price: 328,
                    rating: 4.94,
                    duration: "3 hours",
                    groupSize: "1-8 people",
                    isHot: false,
                    description: "Relax on pristine beaches and swim in the Mediterranean's turquoise waters"
                },
                {
                    id: "marseille-3",
                    title: "Catamaran from Mucem",
                    image: "/static/5.jpeg",
                    price: 748,
                    rating: 4.96,
                    duration: "5 hours",
                    groupSize: "1-12 people",
                    isHot: true,
                    description: "Sail along the coast with breathtaking views of Marseille's iconic landmarks"
                },
                {
                    id: "marseille-4",
                    title: "No-Diet Club: Marseille Local Food Tour",
                    image: "/static/1.jpg",
                    price: 521,
                    rating: 4.95,
                    duration: "3.5 hours",
                    groupSize: "1-10 people",
                    isHot: false,
                    description: "Taste the best local specialties and discover Marseille's vibrant food scene"
                },
                {
                    id: "marseille-5",
                    title: "Cassis Calanques Stand-up Paddleboard Experience",
                    image: "/static/2.png",
                    price: 462,
                    rating: 4.9,
                    duration: "3 hours",
                    groupSize: "1-6 people",
                    isHot: true,
                    description: "Glide over crystal-clear waters and explore the dramatic limestone cliffs"
                },
                {
                    id: "marseille-6",
                    title: "From Esta...",
                    image: "/static/3.png",
                    price: 741,
                    rating: 4.99,
                    duration: "4 hours",
                    groupSize: "1-8 people",
                    isHot: false,
                    description: "Discover the hidden gems of the French Riviera with expert local guides"
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Web2Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#fe585f] to-[#ff7a80] text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Curated Experience
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Handpicked unique experiences, each carefully selected to provide unforgettable cultural, culinary, adventure and artistic experiences.
                    </p>
                    <div className="flex items-center justify-center space-x-8 text-sm">
                        <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 fill-current" />
                            <span>4.9+ Average Rating</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>50K+ Happy Travelers</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>200+ Cities Worldwide</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experiences by City */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {cities.map((city, cityIndex) => (
                        <div key={city.name} className="mb-16">
                            {/* City Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                                        Experiences in {city.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        Discover the best of {city.name}, {city.country}
                                    </p>
                                </div>
                                <Button variant="outline" className="text-[#fe585f] border-[#fe585f] hover:bg-[#fe585f] hover:text-white">
                                    View All →
                                </Button>
                            </div>

                            {/* Experience Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {city.experiences.map((experience) => (
                                    <div
                                        key={experience.id}
                                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                                        onClick={() => handleExperienceClick(experience.id)}
                                    >
                                        {/* Image Container */}
                                        <div className="relative aspect-square bg-gray-200 overflow-hidden">
                                            <div
                                                className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-500"
                                                style={{
                                                    backgroundImage: `url(${experience.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                {/* Hot Badge */}
                                                {experience.isHot && (
                                                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                        Hot
                                                    </div>
                                                )}

                                                {/* Like Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleLike(experience.id);
                                                    }}
                                                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200"
                                                >
                                                    <Heart
                                                        className={`h-4 w-4 transition-all duration-200 ${
                                                            likedExperiences.has(experience.id)
                                                                ? 'text-[#fe585f] fill-current'
                                                                : 'text-gray-600'
                                                        }`}
                                                    />
                                                </button>

                                                {/* Overlay on hover */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#fe585f] transition-colors">
                                                {experience.title}
                                            </h4>
                                            
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                {experience.description}
                                            </p>

                                            {/* Meta Info */}
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{experience.duration}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Users className="h-3 w-3" />
                                                    <span>{experience.groupSize}</span>
                                                </div>
                                            </div>

                                            {/* Price and Rating */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg font-bold text-[#fe585f]">
                                                        ¥{experience.price}
                                                    </span>
                                                    <span className="text-sm text-gray-500">per person</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    <span className="text-sm font-semibold text-gray-700">
                                                        {experience.rating}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Book Button */}
                                            <Button className="w-full mt-3 bg-[#fe585f] hover:bg-[#e04a50] text-white">
                                                Book Now
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                        Ready to Start Your Adventure?
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of travelers who have discovered unique experiences through our curated selection.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-[#fe585f] hover:bg-[#e04a50] text-white">
                            Explore More Experiences
                        </Button>
                        <Button size="lg" variant="outline" className="border-[#fe585f] text-[#fe585f] hover:bg-[#fe585f] hover:text-white">
                            Create Your Own Experience
                        </Button>
                    </div>
                </div>
            </section>

            {/* Custom CSS */}
            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
