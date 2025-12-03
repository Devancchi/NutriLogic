import React from "react";
import Shimmer from "../ui/Shimmer";

export default function PenimbanganMassalSkeleton({ childCount = 5 }) {
    return (
        <div className="flex flex-1 w-full h-full overflow-auto bg-gray-50/50">
            <div className="w-full flex flex-col gap-6 p-4">
                {/* Header Skeleton */}
                <div className="mb-2">
                    <Shimmer className="h-4 w-24 mb-2" variant="text" delay={0} />
                    <Shimmer className="h-8 w-56 mb-2" delay={50} />
                    <Shimmer className="h-4 w-72" variant="text" delay={100} />
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Toolbar Skeleton */}
                    <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-end md:items-center bg-gray-50/50">
                        <div className="w-full md:w-auto">
                            <Shimmer className="h-3 w-32 mb-2" variant="text" delay={0} />
                            <Shimmer className="h-11 w-full md:w-64" variant="button" delay={50} />
                        </div>
                        <Shimmer className="h-8 w-48" variant="button" delay={100} />
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden flex flex-col divide-y divide-gray-100">
                        {Array.from({ length: childCount }).map((_, i) => (
                            <div key={i} className="p-4 bg-white flex flex-col gap-4">
                                {/* Child Info */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Shimmer className="h-5 w-32 mb-2" delay={i * 100} />
                                        <div className="flex items-center gap-2 mt-1">
                                            <Shimmer className="h-4 w-16" variant="button" delay={i * 100 + 50} />
                                            <Shimmer className="h-4 w-20" variant="text" delay={i * 100 + 75} />
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Shimmer className="h-3 w-20 mb-2" variant="text" delay={i * 100 + 100} />
                                        <Shimmer className="h-4 w-24" delay={i * 100 + 125} />
                                    </div>
                                </div>

                                {/* Inputs */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[0, 1, 2].map((j) => (
                                        <div key={j}>
                                            <Shimmer className="h-3 w-16 mb-1" variant="text" delay={i * 100 + 150 + j * 25} />
                                            <Shimmer className="h-10 w-full" variant="button" delay={i * 100 + 175 + j * 25} />
                                        </div>
                                    ))}
                                </div>
                                <Shimmer className="h-10 w-full" variant="button" delay={i * 100 + 250} />
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-8" variant="text" delay={0} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-16" variant="text" delay={25} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-24" variant="text" delay={50} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-20" variant="text" delay={75} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-20" variant="text" delay={100} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-20" variant="text" delay={125} /></th>
                                    <th className="px-6 py-4"><Shimmer className="h-4 w-16" variant="text" delay={150} /></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {Array.from({ length: childCount }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-4 w-6" variant="text" delay={i * 75} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <Shimmer className="h-5 w-32 mb-1" delay={i * 75 + 10} />
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Shimmer className="h-4 w-16" variant="button" delay={i * 75 + 20} />
                                                    <Shimmer className="h-3 w-16" variant="text" delay={i * 75 + 30} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <Shimmer className="h-4 w-24" variant="text" delay={i * 75 + 40} />
                                                <Shimmer className="h-3 w-16" variant="text" delay={i * 75 + 50} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-10 w-full" variant="button" delay={i * 75 + 60} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-10 w-full" variant="button" delay={i * 75 + 70} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-10 w-full" variant="button" delay={i * 75 + 80} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Shimmer className="h-10 w-full" variant="button" delay={i * 75 + 90} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Skeleton */}
                    <div className="hidden md:flex p-6 border-t border-gray-100 bg-gray-50 justify-end">
                        <Shimmer className="h-12 w-48" variant="button" delay={0} />
                    </div>
                </div>
            </div>
        </div>
    );
}
