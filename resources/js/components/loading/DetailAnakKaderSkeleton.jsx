import React from "react";
import Shimmer from "../ui/Shimmer";

export default function DetailAnakKaderSkeleton() {
    return (
        <div className="flex flex-1 w-full h-full overflow-auto no-scrollbar bg-gray-50">
            <div className="p-4 md:p-10 w-full h-full flex flex-col gap-6">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shimmer className="md:hidden w-8 h-8" variant="circle" delay={0} />
                        <div>
                            <Shimmer className="h-4 w-20 mb-2" variant="text" delay={25} />
                            <Shimmer className="h-7 w-32" delay={50} />
                        </div>
                    </div>
                    <div className="hidden md:flex gap-3">
                        <Shimmer className="h-10 w-20" variant="button" delay={75} />
                        <Shimmer className="h-10 w-24" variant="button" delay={100} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Child Info Card Skeleton */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 relative">
                            {/* Mobile Edit Button */}
                            <Shimmer className="md:hidden absolute top-4 right-4 w-8 h-8" variant="circle" delay={0} />

                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 text-center sm:text-left">
                                <Shimmer className="w-24 h-24 sm:w-20 sm:h-20 shrink-0" variant="circle" delay={25} />
                                <div className="flex-1 w-full">
                                    <Shimmer className="h-7 w-48 mb-2 mx-auto sm:mx-0" delay={50} />
                                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4 mt-2">
                                        <Shimmer className="h-4 w-20" variant="text" delay={75} />
                                        <Shimmer className="h-4 w-24" variant="text" delay={100} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[0, 1, 2, 3].map((i) => (
                                    <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <Shimmer className="h-3 w-20 mb-2" variant="text" delay={125 + i * 25} />
                                        <Shimmer className="h-5 w-32" delay={150 + i * 25} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Latest Nutritional Status Skeleton */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Shimmer className="w-5 h-5" variant="rectangle" delay={0} />
                                <Shimmer className="h-6 w-40" delay={25} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <div key={i} className={`p-3 bg-gray-50 rounded-lg border border-gray-100 ${i >= 3 ? 'sm:col-span-2' : ''}`}>
                                        <Shimmer className="h-3 w-20 mb-2" variant="text" delay={50 + i * 25} />
                                        <Shimmer className="h-5 w-24" delay={75 + i * 25} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Weighing History Skeleton */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Shimmer className="w-5 h-5" variant="rectangle" delay={0} />
                                <Shimmer className="h-6 w-44" delay={25} />
                            </div>

                            {/* Mobile View (Cards) */}
                            <div className="md:hidden flex flex-col gap-3">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                        <div className="flex justify-between items-start mb-3">
                                            <Shimmer className="h-4 w-32" delay={50 + i * 75} />
                                            <Shimmer className="h-5 w-16" variant="button" delay={75 + i * 75} />
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            {[0, 1, 2].map((j) => (
                                                <div key={j} className="bg-white p-2 rounded border border-gray-100">
                                                    <Shimmer className="h-2 w-10 mb-1 mx-auto" variant="text" delay={100 + i * 75 + j * 25} />
                                                    <Shimmer className="h-4 w-12 mx-auto" delay={125 + i * 75 + j * 25} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop View (Table) */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3"><Shimmer className="h-3 w-16" variant="text" delay={0} /></th>
                                            <th className="px-4 py-3"><Shimmer className="h-3 w-20" variant="text" delay={25} /></th>
                                            <th className="px-4 py-3"><Shimmer className="h-3 w-20" variant="text" delay={50} /></th>
                                            <th className="px-4 py-3"><Shimmer className="h-3 w-28" variant="text" delay={75} /></th>
                                            <th className="px-4 py-3"><Shimmer className="h-3 w-16" variant="text" delay={100} /></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <tr key={i}>
                                                <td className="px-4 py-3"><Shimmer className="h-4 w-24" delay={i * 50} /></td>
                                                <td className="px-4 py-3"><Shimmer className="h-4 w-12" delay={i * 50 + 10} /></td>
                                                <td className="px-4 py-3"><Shimmer className="h-4 w-12" delay={i * 50 + 20} /></td>
                                                <td className="px-4 py-3"><Shimmer className="h-4 w-10" delay={i * 50 + 30} /></td>
                                                <td className="px-4 py-3"><Shimmer className="h-6 w-20" variant="button" delay={i * 50 + 40} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Parent & Posyandu Info */}
                    <div className="space-y-6">
                        {/* Parent Info Skeleton */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <Shimmer className="h-5 w-32 mb-4" delay={0} />
                            <div className="space-y-3">
                                {[0, 1, 2].map((i) => (
                                    <div key={i}>
                                        <Shimmer className="h-3 w-16 mb-1" variant="text" delay={25 + i * 50} />
                                        <Shimmer className="h-5 w-full" delay={50 + i * 50} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Posyandu Info Skeleton */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <Shimmer className="h-5 w-24 mb-4" delay={0} />
                            <div className="space-y-3">
                                {[0, 1, 2].map((i) => (
                                    <div key={i}>
                                        <Shimmer className="h-3 w-24 mb-1" variant="text" delay={25 + i * 50} />
                                        <Shimmer className="h-5 w-full" delay={50 + i * 50} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Immunization Schedules Skeleton */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <Shimmer className="h-5 w-36 mb-4" delay={0} />
                            <div className="space-y-3">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <Shimmer className="h-4 w-32 mb-1" delay={25 + i * 75} />
                                            <Shimmer className="h-3 w-24" variant="text" delay={50 + i * 75} />
                                        </div>
                                        <Shimmer className="h-5 w-16" variant="button" delay={75 + i * 75} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
