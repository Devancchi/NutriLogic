import React from "react";
import Shimmer from "../ui/Shimmer";

export default function TableSkeleton({ itemCount = 6 }) {
    return (
        <div className="flex flex-1 w-full h-full overflow-auto bg-gray-50/50">
            <div className="w-full flex flex-col gap-6 p-4">
                {/* Header Skeleton */}
                <div className="flex justify-between items-end">
                    <div>
                        <Shimmer className="h-4 w-24 mb-2" variant="text" delay={0} />
                        <Shimmer className="h-8 w-36" delay={50} />
                    </div>
                </div>

                {/* Search/Filter Bar Skeleton */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex flex-col xl:flex-row gap-4 items-end xl:items-center justify-between">
                        <div className="flex flex-col md:flex-row gap-4 items-end md:items-center flex-1 w-full">
                            <div className="w-full md:flex-1">
                                <Shimmer className="h-3 w-20 mb-2" variant="text" delay={0} />
                                <Shimmer className="h-11 w-full" variant="button" delay={25} />
                            </div>
                            <div className="flex flex-row gap-4 w-full md:w-auto">
                                <div className="flex-1 md:w-48">
                                    <Shimmer className="h-3 w-20 mb-2" variant="text" delay={50} />
                                    <Shimmer className="h-11 w-full" variant="button" delay={75} />
                                </div>
                                <div className="flex-1 md:w-40">
                                    <Shimmer className="h-3 w-20 mb-2" variant="text" delay={100} />
                                    <Shimmer className="h-11 w-full" variant="button" delay={125} />
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block w-full xl:w-auto flex-shrink-0">
                            <Shimmer className="h-3 w-16 mb-2 opacity-0" variant="text" />
                            <Shimmer className="h-11 w-36" variant="button" delay={150} />
                        </div>
                    </div>
                </div>

                {/* Mobile Card View Skeleton */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {Array.from({ length: itemCount }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Shimmer className="w-12 h-12 shrink-0" variant="circle" delay={i * 50} />
                                    <div>
                                        <Shimmer className="h-5 w-28 mb-1" delay={i * 50 + 15} />
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <Shimmer className="h-4 w-16" variant="button" delay={i * 50 + 30} />
                                            <Shimmer className="h-3 w-16" variant="text" delay={i * 50 + 45} />
                                        </div>
                                    </div>
                                </div>
                                <Shimmer className="h-5 w-14" variant="button" delay={i * 50 + 60} />
                            </div>

                            <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-50">
                                <div>
                                    <Shimmer className="h-3 w-16 mb-1" variant="text" delay={i * 50 + 75} />
                                    <Shimmer className="h-4 w-24" delay={i * 50 + 90} />
                                    <Shimmer className="h-3 w-20 mt-1" variant="text" delay={i * 50 + 105} />
                                </div>
                                <div>
                                    <Shimmer className="h-3 w-16 mb-1" variant="text" delay={i * 50 + 120} />
                                    <Shimmer className="h-6 w-20" variant="button" delay={i * 50 + 135} />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Shimmer className="flex-1 h-9" variant="button" delay={i * 50 + 150} />
                                <Shimmer className="flex-1 h-9" variant="button" delay={i * 50 + 165} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table Skeleton */}
                <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="px-6 py-4 text-left"><Shimmer className="h-4 w-12" variant="text" delay={0} /></th>
                                    <th className="px-6 py-4 text-left"><Shimmer className="h-4 w-20" variant="text" delay={25} /></th>
                                    <th className="px-6 py-4 text-left"><Shimmer className="h-4 w-12" variant="text" delay={50} /></th>
                                    <th className="px-6 py-4 text-left"><Shimmer className="h-4 w-20" variant="text" delay={75} /></th>
                                    <th className="px-6 py-4 text-left"><Shimmer className="h-4 w-20" variant="text" delay={100} /></th>
                                    <th className="px-6 py-4 text-right"><Shimmer className="h-4 w-12 ml-auto" variant="text" delay={125} /></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {Array.from({ length: itemCount }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <Shimmer className="w-12 h-12" variant="circle" delay={i * 50} />
                                                <div>
                                                    <Shimmer className="h-5 w-32 mb-1" delay={i * 50 + 10} />
                                                    <Shimmer className="h-4 w-16" variant="button" delay={i * 50 + 20} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <Shimmer className="h-4 w-28" delay={i * 50 + 30} />
                                                <Shimmer className="h-3 w-20" variant="text" delay={i * 50 + 40} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-7 w-20" variant="button" delay={i * 50 + 50} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-6 w-24" variant="button" delay={i * 50 + 60} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-6 w-16" variant="button" delay={i * 50 + 70} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Shimmer className="h-8 w-16" variant="button" delay={i * 50 + 80} />
                                                <Shimmer className="h-8 w-12" variant="button" delay={i * 50 + 90} />
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
