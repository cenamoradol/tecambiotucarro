import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface VehicleSkeletonProps {
    viewMode: 'grid' | 'list';
}

export default function VehicleSkeleton({ viewMode }: VehicleSkeletonProps) {
    if (viewMode === 'list') {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row group animate-pulse">
                <div className="relative w-full sm:w-[320px] aspect-[4/3] sm:aspect-auto sm:h-[240px] shrink-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1 w-full relative">
                    <div>
                        <div className="flex justify-between items-start gap-4 mb-2">
                            <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                        <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                                    <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="h-6 w-1/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Grid View Skeleton
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col group animate-pulse">
            <div className="relative aspect-[4/3] w-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-700" />
            </div>
            <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                </div>
                <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded mb-6"></div>

                <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                            <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
