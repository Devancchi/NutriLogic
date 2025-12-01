import React from "react";
import Shimmer from "../ui/Shimmer";

export default function NutriAssistSkeleton() {
    return (
        <div className="flex flex-1 w-full h-full overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50">
            <div className="w-full h-full overflow-y-auto custom-scrollbar">
                <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">

                    {/* Header Skeleton */}
                    <div className="mb-8">
                        <Shimmer className="h-10 w-64 mb-3" />
                        <Shimmer className="h-6 w-96" variant="text" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: Form Skeleton */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/50 shadow-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <Shimmer className="w-12 h-12 rounded-xl" />
                                    <div>
                                        <Shimmer className="h-6 w-32 mb-2" variant="text" />
                                        <Shimmer className="h-4 w-48" variant="text" />
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <Shimmer className="h-5 w-24" variant="text" />
                                        <Shimmer className="h-12 w-full rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Shimmer className="h-5 w-32" variant="text" />
                                        <Shimmer className="h-32 w-full rounded-xl" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Shimmer className="h-5 w-20" variant="text" />
                                            <Shimmer className="h-12 w-full rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <Shimmer className="h-5 w-20" variant="text" />
                                            <Shimmer className="h-12 w-full rounded-xl" />
                                        </div>
                                    </div>
                                    <Shimmer className="h-14 w-full rounded-xl mt-4" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Results Skeleton */}
                        <div className="lg:col-span-7">
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/40 border-dashed">
                                <Shimmer className="w-32 h-32 rounded-full mb-6" />
                                <Shimmer className="h-8 w-48 mb-3" variant="text" />
                                <Shimmer className="h-5 w-64" variant="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
