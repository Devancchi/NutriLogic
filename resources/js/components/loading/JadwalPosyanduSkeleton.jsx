import React from "react";
import Shimmer from "../ui/Shimmer";

export default function JadwalPosyanduSkeleton({ scheduleCount = 6 }) {
    return (
        <div className="flex flex-1 w-full h-full overflow-auto bg-gray-50/50">
            <div className="w-full flex flex-col gap-6 p-4 md:p-8">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div>
                        <Shimmer className="h-4 w-24 mb-2" variant="text" delay={0} />
                        <Shimmer className="h-8 w-48 mb-2" delay={50} />
                    </div>
                    <Shimmer className="hidden md:block h-11 w-36" variant="button" delay={100} />
                </div>

                {/* Filters & Search Skeleton */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 grid grid-cols-2 lg:flex lg:flex-row gap-3 md:gap-4">
                    {/* Search */}
                    <div className="col-span-2 lg:flex-1">
                        <Shimmer className="h-11 w-full" variant="button" delay={0} />
                    </div>
                    {/* Type Filter */}
                    <div className="w-full lg:w-48">
                        <Shimmer className="h-11 w-full" variant="button" delay={50} />
                    </div>
                    {/* Status Filter */}
                    <div className="w-full lg:w-48">
                        <Shimmer className="h-11 w-full" variant="button" delay={100} />
                    </div>
                    {/* Child Filter */}
                    <div className="col-span-2 lg:w-56">
                        <Shimmer className="h-11 w-full" variant="button" delay={150} />
                    </div>
                </div>

                {/* Mobile View (Cards) Skeleton */}
                <div className="md:hidden flex flex-col gap-4">
                    {Array.from({ length: scheduleCount }).map((_, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <Shimmer className="w-10 h-10 shrink-0" variant="circle" delay={i * 75} />
                                    <div>
                                        <Shimmer className="h-4 w-28 mb-1" delay={i * 75 + 25} />
                                        <Shimmer className="h-3 w-20" variant="text" delay={i * 75 + 50} />
                                    </div>
                                </div>
                                <Shimmer className="h-5 w-20" variant="button" delay={i * 75 + 75} />
                            </div>

                            <div className="space-y-2">
                                <Shimmer className="h-4 w-3/4" delay={i * 75 + 100} />
                                <div className="grid grid-cols-2 gap-2">
                                    <Shimmer className="h-3 w-full" variant="text" delay={i * 75 + 125} />
                                    <Shimmer className="h-3 w-full" variant="text" delay={i * 75 + 150} />
                                </div>
                                <Shimmer className="h-3 w-full" variant="text" delay={i * 75 + 175} />
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <Shimmer className="h-4 w-20" variant="text" delay={i * 75 + 200} />
                                <div className="flex items-center gap-2">
                                    <Shimmer className="h-8 w-8" variant="rectangle" delay={i * 75 + 225} />
                                    <Shimmer className="h-8 w-8" variant="rectangle" delay={i * 75 + 250} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop View (Table) Skeleton */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-8" variant="text" delay={0} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-20" variant="text" delay={25} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-16" variant="text" delay={50} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-16" variant="text" delay={75} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-16" variant="text" delay={100} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-16" variant="text" delay={125} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-16" variant="text" delay={150} /></th>
                                    <th className="px-6 py-4 text-right"><Shimmer className="h-4 w-12 ml-auto" variant="text" delay={175} /></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {Array.from({ length: scheduleCount }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-4 w-6" variant="text" delay={i * 60} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Shimmer className="w-8 h-8 shrink-0" variant="circle" delay={i * 60 + 10} />
                                                <div>
                                                    <Shimmer className="h-4 w-28 mb-1" delay={i * 60 + 20} />
                                                    <Shimmer className="h-3 w-20" variant="text" delay={i * 60 + 30} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-4 w-20" variant="text" delay={i * 60 + 40} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-4 w-32" delay={i * 60 + 50} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <Shimmer className="h-4 w-24 mb-1" delay={i * 60 + 60} />
                                                <Shimmer className="h-3 w-16" variant="text" delay={i * 60 + 70} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-4 w-28" variant="text" delay={i * 60 + 80} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-6 w-24" variant="button" delay={i * 60 + 90} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Shimmer className="h-7 w-7" variant="rectangle" delay={i * 60 + 100} />
                                                <Shimmer className="h-7 w-7" variant="rectangle" delay={i * 60 + 110} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
