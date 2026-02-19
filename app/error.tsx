'use client';

import { useEffect } from 'react';

/**
 * Custom Error Boundary Page
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <main className="h-screen text-white flex items-center justify-center relative">
            <div className="text-center space-y-6 animate-fade-in max-w-lg">
                {/* Error Icon */}
                <div className="text-7xl">⚠️</div>

                {/* Message */}
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        कुछ गलत हो गया
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Something went wrong
                    </p>
                </div>

                {/* Description */}
                <p className="text-gray-500">
                    एक अनपेक्षित त्रुटि हुई है। कृपया पुनः प्रयास करें।
                </p>

                {/* Retry Button */}
                <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                   hover:from-blue-700 hover:to-purple-700
                   text-white font-semibold rounded-xl transition-all duration-300
                   shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    पुनः प्रयास करें
                </button>
            </div>
        </main>
    );
}
