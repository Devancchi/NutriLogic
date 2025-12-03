import React from "react";
import Shimmer from "../ui/Shimmer";

export default function LaporanKaderSkeleton({ rowCount = 6 }) {
    return (
        <div className="flex flex-col w-full h-full bg-white overflow-x-hidden">
            {/* Header */}
            <div className="px-4 pt-5 md:px-10 md:pt-10 pb-2 bg-white z-20">
                <div className="mb-4">
                    <Shimmer className="h-4 w-24 mb-2" variant="text" delay={0} />
                    <Shimmer className="h-8 w-48" delay={50} />
                </div>

                {/* Filter Bar Skeleton */}
                <div className="mt-6 flex flex-col md:flex-row gap-3 items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <Shimmer className="h-10 w-32 shrink-0" variant="button" delay={0} />
                        <Shimmer className="h-10 w-28 shrink-0" variant="button" delay={50} />
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center gap-2 w-full md:w-auto flex-wrap md:flex-nowrap">
                        <div className="flex items-center gap-2 flex-1 md:flex-none">
                            <Shimmer className="h-10 w-32" variant="button" delay={100} />
                            <Shimmer className="h-4 w-4" variant="text" delay={125} />
                            <Shimmer className="h-10 w-32" variant="button" delay={150} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-white px-4 md:px-10 pb-8">
                {/* Mobile Card View Skeleton */}
                <div className="md:hidden divide-y divide-gray-50">
                    {Array.from({ length: rowCount }).map((_, i) => (
                        <div key={i} className="bg-white p-4 border-b border-gray-100">
                            <div className="flex items-start gap-3 mb-3">
                                <Shimmer className="w-10 h-10 shrink-0" variant="circle" delay={i * 75} />
                                <div className="flex-1 min-w-0">
                                    <Shimmer className="h-5 w-32 mb-1" delay={i * 75 + 25} />
                                    <Shimmer className="h-3 w-40" variant="text" delay={i * 75 + 50} />
                                </div>
                                <Shimmer className="h-6 w-20" variant="button" delay={i * 75 + 75} />
                            </div>

                            <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-xl p-3">
                                <div>
                                    <Shimmer className="h-3 w-16 mb-1" variant="text" delay={i * 75 + 100} />
                                    <Shimmer className="h-5 w-14" delay={i * 75 + 125} />
                                </div>
                                <div>
                                    <Shimmer className="h-3 w-16 mb-1" variant="text" delay={i * 75 + 150} />
                                    <Shimmer className="h-5 w-14" delay={i * 75 + 175} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table View Skeleton */}
                <div className="hidden md:block mt-4">
                    <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/80 sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-12" variant="text" delay={0} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-28" variant="text" delay={25} /></th>
                                    <th className="px-6 py-4 text-center"><Shimmer className="h-4 w-12 mx-auto" variant="text" delay={50} /></th>
                                    <th className="px-6 py-4 text-center"><Shimmer className="h-4 w-12 mx-auto" variant="text" delay={75} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-20" variant="text" delay={100} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-16" variant="text" delay={125} /></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 bg-white">
                                {Array.from({ length: rowCount }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Shimmer className="w-9 h-9 shrink-0" variant="circle" delay={i * 60} />
                                                <Shimmer className="h-4 w-28" delay={i * 60 + 15} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <Shimmer className="h-4 w-24 mb-1" delay={i * 60 + 30} />
                                                <Shimmer className="h-3 w-12" variant="text" delay={i * 60 + 45} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Shimmer className="h-4 w-14 mx-auto" delay={i * 60 + 60} />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Shimmer className="h-4 w-14 mx-auto" delay={i * 60 + 75} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-6 w-20" variant="button" delay={i * 60 + 90} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-4 w-32" variant="text" delay={i * 60 + 105} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Skeleton */}
                <div className="py-6 flex justify-center">
                    <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                        <Shimmer className="w-8 h-8" variant="rectangle" delay={0} />
                        <Shimmer className="w-32 h-5 mx-2" variant="text" delay={25} />
                        <Shimmer className="w-8 h-8" variant="rectangle" delay={50} />
                    </div>
                </div>
            </div>
        </div>
    );
}
