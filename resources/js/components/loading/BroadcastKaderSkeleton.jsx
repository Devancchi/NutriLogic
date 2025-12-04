import React from "react";
import Shimmer from "../ui/Shimmer";

export default function BroadcastKaderSkeleton({ historyCount = 3 }) {
    return (
        <div className="flex flex-1 w-full h-full overflow-auto bg-gray-50">
            <div className="p-4 md:p-8 w-full h-full flex flex-col gap-6">
                {/* Header Skeleton */}
                <div>
                    <Shimmer className="h-4 w-24 mb-2" variant="text" delay={0} />
                    <Shimmer className="h-8 w-56" delay={50} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
                    {/* Send Broadcast Form Skeleton - 8 columns */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <Shimmer className="w-12 h-12" variant="rectangle" delay={0} />
                                    <div>
                                        <Shimmer className="h-6 w-40 mb-2" delay={25} />
                                        <Shimmer className="h-4 w-64" variant="text" delay={50} />
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <Shimmer className="h-4 w-32 mb-3" variant="text" delay={75} />
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {[0, 1, 2, 3].map((i) => (
                                                <Shimmer 
                                                    key={i} 
                                                    className="h-20 w-full" 
                                                    variant="button" 
                                                    delay={100 + i * 25} 
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <Shimmer className="h-4 w-24 mb-3" variant="text" delay={200} />
                                        <Shimmer className="h-32 w-full" variant="rectangle" delay={225} />
                                    </div>

                                    <Shimmer className="h-12 w-full md:w-40 mt-2" variant="button" delay={250} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats & Info Skeleton - 4 columns */}
                    <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                        {/* Stats Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex-1 flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-4">
                                <Shimmer className="w-4 h-4" variant="rectangle" delay={0} />
                                <Shimmer className="h-4 w-32" variant="text" delay={25} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <Shimmer className="h-7 w-12 mb-1" delay={50} />
                                    <Shimmer className="h-3 w-20" variant="text" delay={75} />
                                </div>
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <Shimmer className="h-7 w-8 mb-1" delay={100} />
                                    <Shimmer className="h-3 w-16" variant="text" delay={125} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Shimmer className="h-3 w-24 mb-2" variant="text" delay={150} />
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Shimmer className="w-2 h-2" variant="circle" delay={175 + i * 25} />
                                            <Shimmer className="h-4 w-16" variant="text" delay={200 + i * 25} />
                                        </div>
                                        <Shimmer className="h-4 w-8" delay={225 + i * 25} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Tips */}
                        <div className="bg-gray-200 rounded-2xl shadow-sm p-6">
                            <div className="flex items-start gap-3">
                                <Shimmer className="w-9 h-9 bg-white/30" variant="rectangle" delay={0} />
                                <div className="flex-1">
                                    <Shimmer className="h-4 w-24 mb-2 bg-white/30" delay={25} />
                                    <Shimmer className="h-3 w-full mb-1 bg-white/30" variant="text" delay={50} />
                                    <Shimmer className="h-3 w-4/5 bg-white/30" variant="text" delay={75} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Section Skeleton */}
                <div className="mt-2">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <Shimmer className="h-6 w-32" delay={0} />
                        <div className="flex items-center gap-2">
                            <Shimmer className="w-4 h-4" variant="rectangle" delay={25} />
                            <Shimmer className="h-4 w-40" variant="text" delay={50} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: historyCount }).map((_, i) => (
                            <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col h-full">
                                <div className="flex items-start justify-between mb-4">
                                    <Shimmer className="w-8 h-8" variant="rectangle" delay={i * 75} />
                                    <div className="flex items-center gap-2">
                                        <Shimmer className="h-4 w-16" variant="text" delay={i * 75 + 25} />
                                        <Shimmer className="w-6 h-6" variant="rectangle" delay={i * 75 + 50} />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <Shimmer className="h-5 w-20 mb-3" variant="button" delay={i * 75 + 75} />
                                    <div className="space-y-2">
                                        <Shimmer className="h-3 w-full" variant="text" delay={i * 75 + 100} />
                                        <Shimmer className="h-3 w-4/5" variant="text" delay={i * 75 + 125} />
                                        <Shimmer className="h-3 w-3/4" variant="text" delay={i * 75 + 150} />
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Shimmer className="w-6 h-6" variant="circle" delay={i * 75 + 175} />
                                        <Shimmer className="h-3 w-20" variant="text" delay={i * 75 + 200} />
                                    </div>
                                    <Shimmer className="h-3 w-12" variant="text" delay={i * 75 + 225} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
