import React from "react";
import Shimmer from "../ui/Shimmer";

export default function AntrianPrioritasSkeleton({ cardCount = 6 }) {
    return (
        <div className="flex flex-1 w-full h-full overflow-auto no-scrollbar bg-gray-50/50">
            <div className="w-full flex flex-col gap-6 p-4">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div>
                        <Shimmer className="h-8 w-48 mb-2" delay={0} />
                        <Shimmer className="h-4 w-72" variant="text" delay={50} />
                    </div>
                </div>

                {/* Summary Card Skeleton */}
                <div className="bg-green-50 rounded-2xl p-4 md:p-5 border border-gray-100 relative overflow-hidden">
                    <div className="relative z-10">
                        <Shimmer className="h-4 w-48 mb-2" variant="text" delay={0} />
                        <Shimmer className="h-8 w-16" delay={50} />
                    </div>
                </div>

                {/* Search Skeleton */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                    <Shimmer className="h-11 w-full" variant="button" delay={0} />
                </div>

                {/* Children Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: cardCount }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Shimmer className="w-12 h-12 shrink-0" variant="circle" delay={i * 75} />
                                    <div>
                                        <Shimmer className="h-5 w-28 mb-1" delay={i * 75 + 25} />
                                        <Shimmer className="h-3 w-24" variant="text" delay={i * 75 + 50} />
                                    </div>
                                </div>
                            </div>

                            {/* PMT Badge */}
                            <div className="bg-green-50 rounded-xl p-4 mb-4 border border-green-100">
                                <Shimmer className="h-3 w-32 mb-2" variant="text" delay={i * 75 + 75} />
                                <Shimmer className="h-2 w-full mb-3" variant="button" delay={i * 75 + 100} />
                                <Shimmer className="h-8 w-full" variant="button" delay={i * 75 + 125} />
                            </div>

                            {/* Latest Data */}
                            <div className="bg-gray-50/80 rounded-xl p-3 mb-4 border border-gray-100">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[0, 1, 2, 3].map((j) => (
                                        <div key={j}>
                                            <Shimmer className="h-3 w-12 mb-1" variant="text" delay={i * 75 + 150 + j * 25} />
                                            <Shimmer className="h-5 w-14" delay={i * 75 + 175 + j * 25} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                <div className="flex flex-col">
                                    <Shimmer className="h-2 w-16 mb-1" variant="text" delay={i * 75 + 275} />
                                    <Shimmer className="h-4 w-24" delay={i * 75 + 300} />
                                </div>
                                <Shimmer className="h-8 w-24" variant="button" delay={i * 75 + 325} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
