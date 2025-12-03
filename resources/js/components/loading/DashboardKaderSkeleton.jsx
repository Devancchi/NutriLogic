import React from "react";
import Shimmer from "../ui/Shimmer";

export default function DashboardKaderSkeleton() {
    return (
        <div className="flex flex-1 w-full min-h-full font-montserrat bg-gray-50">
            <div className="p-4 md:p-8 w-full flex flex-col gap-4 md:gap-8">
                {/* Header Skeleton */}
                <div className="mb-2">
                    <Shimmer className="h-4 w-24 mb-2" variant="text" delay={0} />
                    <Shimmer className="h-8 w-56 mb-3" delay={50} />
                    <div className="flex items-center gap-2 mt-1">
                        <Shimmer className="w-7 h-7" variant="circle" delay={100} />
                        <Shimmer className="h-4 w-48" variant="text" delay={150} />
                    </div>
                </div>

                {/* Bento Grid Layout Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {/* Hero Section (Span 2) */}
                    <div className="col-span-2 md:col-span-2 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl p-5 md:p-6 relative overflow-hidden">
                        <div className="relative z-10 h-full flex flex-col justify-between min-h-[180px]">
                            <div>
                                <Shimmer className="h-6 w-32 mb-3 bg-white/30" delay={0} />
                                <Shimmer className="h-7 w-40 mb-2 bg-white/30" delay={50} />
                                <Shimmer className="h-5 w-64 bg-white/30" variant="text" delay={100} />
                            </div>
                            <div className="mt-6">
                                <Shimmer className="h-12 w-20 mb-2 bg-white/30" delay={150} />
                                <Shimmer className="h-5 w-36 bg-white/30" variant="text" delay={200} />
                            </div>
                        </div>
                    </div>

                    {/* Priority Action Card (Span 1) */}
                    <div className="col-span-1 bg-white rounded-3xl p-4 md:p-5 border border-gray-100 flex flex-col min-h-[200px]">
                        <div className="flex items-center gap-4 mb-6">
                            <Shimmer className="w-10 h-10" variant="rectangle" delay={50} />
                            <div className="flex-1">
                                <Shimmer className="h-5 w-24 mb-1" delay={100} />
                                <Shimmer className="h-3 w-16" variant="text" delay={150} />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end">
                            <Shimmer className="h-10 w-12 mb-2" delay={200} />
                            <Shimmer className="h-4 w-32" variant="text" delay={250} />
                        </div>
                        <Shimmer className="h-4 w-24 mt-6" variant="text" delay={300} />
                    </div>

                    {/* Consultation Action Card (Span 1) */}
                    <div className="col-span-1 bg-white rounded-3xl p-4 md:p-5 border border-gray-100 flex flex-col min-h-[200px]">
                        <div className="flex items-center gap-4 mb-6">
                            <Shimmer className="w-10 h-10" variant="rectangle" delay={100} />
                            <div className="flex-1">
                                <Shimmer className="h-5 w-24 mb-1" delay={150} />
                                <Shimmer className="h-3 w-16" variant="text" delay={200} />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end">
                            <Shimmer className="h-10 w-12 mb-2" delay={250} />
                            <Shimmer className="h-4 w-32" variant="text" delay={300} />
                        </div>
                        <Shimmer className="h-4 w-24 mt-6" variant="text" delay={350} />
                    </div>

                    {/* Nutrition Distribution (Span 2) */}
                    <div className="col-span-2 md:col-span-2 bg-white rounded-3xl p-5 md:p-6 border border-gray-100 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <Shimmer className="h-6 w-40 mb-2" delay={0} />
                                <Shimmer className="h-4 w-56" variant="text" delay={50} />
                            </div>
                            <Shimmer className="h-7 w-24" variant="button" delay={100} />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {/* Normal Stats */}
                            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <Shimmer className="w-2.5 h-2.5" variant="circle" delay={150} />
                                    <Shimmer className="h-4 w-20" variant="text" delay={200} />
                                </div>
                                <Shimmer className="h-8 w-12 mb-2" delay={250} />
                                <Shimmer className="h-3 w-24" variant="text" delay={300} />
                                <Shimmer className="h-2 w-full mt-4" delay={350} />
                            </div>

                            {/* Issues Stats */}
                            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <Shimmer className="w-2.5 h-2.5" variant="circle" delay={200} />
                                    <Shimmer className="h-4 w-20" variant="text" delay={250} />
                                </div>
                                <Shimmer className="h-8 w-12 mb-2" delay={300} />
                                <Shimmer className="h-3 w-24" variant="text" delay={350} />
                                <Shimmer className="h-2 w-full mt-4" delay={400} />
                            </div>
                        </div>

                        {/* Detailed Breakdown */}
                        <div className="space-y-3">
                            {[0, 1, 2].map((idx) => (
                                <div key={idx} className="flex items-center text-sm">
                                    <Shimmer className="h-4 w-36" variant="text" delay={450 + idx * 50} />
                                    <Shimmer className="flex-1 mx-4 h-2.5" delay={500 + idx * 50} />
                                    <Shimmer className="h-4 w-8" delay={550 + idx * 50} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Schedule Card (Span 2) */}
                    <div className="col-span-2 md:col-span-2 bg-white rounded-3xl p-0 border border-gray-100 flex flex-col relative overflow-hidden">
                        <div className="h-1.5 w-full bg-gray-200"></div>
                        <div className="p-5 md:p-6 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <Shimmer className="w-9 h-9" variant="rectangle" delay={0} />
                                    <div>
                                        <Shimmer className="h-5 w-32 mb-1" delay={50} />
                                        <Shimmer className="h-3 w-24" variant="text" delay={100} />
                                    </div>
                                </div>
                                <Shimmer className="h-8 w-24" variant="button" delay={150} />
                            </div>

                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Left Side: Schedule Items */}
                                <div className="flex-1 space-y-3">
                                    {[0, 1, 2].map((idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                                            <div className="flex flex-col items-center min-w-[50px] bg-white rounded-lg px-2 py-1.5 border border-gray-200">
                                                <Shimmer className="h-2 w-8 mb-1" variant="text" delay={200 + idx * 100} />
                                                <Shimmer className="h-6 w-6" delay={250 + idx * 100} />
                                                <Shimmer className="h-2 w-6 mt-1" variant="text" delay={300 + idx * 100} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Shimmer className="h-4 w-3/4 mb-2" delay={350 + idx * 100} />
                                                <Shimmer className="h-3 w-1/2 mb-2" variant="text" delay={400 + idx * 100} />
                                                <div className="flex gap-2">
                                                    <Shimmer className="h-5 w-16" variant="button" delay={450 + idx * 100} />
                                                    <Shimmer className="h-5 w-20" variant="button" delay={500 + idx * 100} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Side: Calendar Placeholder */}
                                <div className="hidden lg:block w-px bg-gray-100"></div>
                                <div className="hidden lg:flex flex-1 justify-center items-start">
                                    <div className="w-full max-w-[280px] p-4 bg-gray-50 rounded-xl">
                                        <div className="flex justify-between items-center mb-4">
                                            <Shimmer className="h-5 w-24" delay={0} />
                                            <div className="flex gap-2">
                                                <Shimmer className="w-6 h-6" variant="circle" delay={50} />
                                                <Shimmer className="w-6 h-6" variant="circle" delay={100} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-7 gap-1">
                                            {Array.from({ length: 35 }).map((_, i) => (
                                                <Shimmer 
                                                    key={i} 
                                                    className="w-8 h-8" 
                                                    variant="circle" 
                                                    delay={150 + (i % 7) * 20} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
