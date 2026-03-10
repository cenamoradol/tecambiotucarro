'use client';
import React from 'react';

export default function VehicleDetailSkeleton() {
    return (
        <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10 animate-pulse">
            <div className="pt-5 lg:pt-5 mb-6">
                <div className="h-9 w-48 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                {/* Gallery Skeleton */}
                <div className="w-full flex flex-col lg:w-[40%]">
                    <div className="w-full aspect-[9/16] bg-slate-200 dark:bg-slate-800 rounded-xl lg:rounded-2xl flex items-center justify-center">
                        <svg className="w-16 h-16 text-slate-300 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
                        </svg>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg" />
                        ))}
                    </div>
                </div>

                {/* Info Panel Skeleton */}
                <div className="w-full lg:w-[60%]">
                    <div className="flex flex-col gap-6 lg:gap-8 bg-surface dark:bg-[#1a2c22] rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-gray-100 dark:border-gray-800">
                        {/* Badge + Status */}
                        <div className="flex flex-col gap-2 border-b border-gray-100 dark:border-gray-800 pb-6">
                            <div className="flex items-start justify-between">
                                <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
                                <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                            </div>
                            <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded mt-2" />
                            <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-800 rounded mt-1" />
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-background-light dark:bg-background-dark/50 p-4 rounded-xl flex flex-col items-start gap-2">
                                    <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800" />
                                    <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                                    <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-3">
                            <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
                            <div className="p-4 bg-background-light dark:bg-background-dark/30 rounded-xl space-y-2">
                                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                                <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
                                <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded-full" />
                    </div>
                </div>
            </div>
        </main>
    );
}
