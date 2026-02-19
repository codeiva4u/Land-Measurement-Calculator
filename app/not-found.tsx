'use client';

import Link from 'next/link';

/**
 * Custom 404 - Page Not Found
 */
export default function NotFound() {
    return (
        <main className="h-screen text-white flex items-center justify-center relative">
            <div className="text-center space-y-6 animate-fade-in">
                {/* 404 Number */}
                <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 
                       bg-clip-text text-transparent">
                    404
                </h1>

                {/* Message */}
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        पृष्ठ नहीं मिला
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Page Not Found
                    </p>
                </div>

                {/* Description */}
                <p className="text-gray-500 max-w-md mx-auto">
                    जो पृष्ठ आप ढूंढ रहे हैं वह मौजूद नहीं है या हटा दिया गया है।
                </p>

                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                   hover:from-blue-700 hover:to-purple-700
                   text-white font-semibold rounded-xl transition-all duration-300
                   shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    होम पेज पर जाएं
                </Link>
            </div>
        </main>
    );
}
