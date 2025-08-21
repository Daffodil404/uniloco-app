'use client';

import { Star } from 'lucide-react';

interface Review {
    name: string;
    role?: string;
    avatar: string;
    rating: number;
    date: string;
    type?: string;
    text: string;
    photos?: string;
}

interface ReviewsProps {
    reviews: Review[];
    totalReviews: number;
    averageRating: number;
    showStats?: boolean;
    title?: string;
}

export default function Reviews({ reviews, totalReviews, averageRating, showStats = true, title }: ReviewsProps) {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {title || `⭐ ${totalReviews} reviews`}
            </h3>
            
            {showStats && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#fe5a5e] mb-2">{averageRating}</div>
                        <div className="flex justify-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                        </div>
                        <div className="text-gray-600">{totalReviews} reviews</div>
                    </div>
                    
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Professional Skills</span>
                            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                            </div>
                            <span className="text-sm font-semibold">4.95</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Communication</span>
                            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                            <span className="text-sm font-semibold">4.92</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Service Quality</span>
                            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '96%' }}></div>
                            </div>
                            <span className="text-sm font-semibold">4.96</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        {/* Review Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                                    {review.avatar}
                                </div>
                                <div>
                                    <h5 className="font-semibold text-gray-900">{review.name}</h5>
                                    {review.role && (
                                        <p className="text-sm text-gray-500">{review.role}</p>
                                    )}
                                    <p className="text-xs text-gray-400">{review.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                        </div>

                        {/* Review Type Badge */}
                        {review.type && (
                            <div className="mb-3">
                                <span className="inline-block bg-[#fe5a5e]/10 text-[#fe5a5e] px-3 py-1 rounded-full text-xs font-medium">
                                    {review.type}
                                </span>
                            </div>
                        )}

                        {/* Review Text */}
                        <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4">
                            {review.text}
                        </p>

                        {/* Review Photos */}
                        {review.photos && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/50 rounded-lg px-3 py-2">
                                <span className="text-lg">📸</span>
                                <span className="italic">{review.photos}</span>
                            </div>
                        )}

                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 opacity-10">
                            <div className="w-8 h-8 bg-[#fe5a5e] rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View More Button */}
            <div className="text-center mt-8">
                <button className="bg-[#fe5a5e] hover:bg-[#e04a50] text-white px-6 py-3 rounded-xl font-medium transition-colors">
                    View All Reviews
                </button>
            </div>
        </div>
    );
}
