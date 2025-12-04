import React from "react";
import Shimmer from "../ui/Shimmer";

export default function EditAnakKaderFormSkeleton() {
    return (
        <div className="flex flex-1 w-full h-full overflow-auto">
            <div className="p-4 md:p-10 w-full h-full bg-gray-50 flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Shimmer className="h-9 w-48" delay={0} />
                        <Shimmer className="h-5 w-32 mt-2" delay={0.05} />
                    </div>
                    <Shimmer className="h-10 w-20 rounded-lg" delay={0.1} />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    <div className="flex flex-col gap-4 md:gap-8 items-center pb-10">
                        {/* Form Card */}
                        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                            {/* Parent Info Section */}
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6">
                                <Shimmer className="h-4 w-24 mb-3" delay={0.15} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Shimmer className="h-3 w-24 mb-1" delay={0.2} />
                                        <Shimmer className="h-5 w-40" delay={0.25} />
                                    </div>
                                    <div>
                                        <Shimmer className="h-3 w-20 mb-1" delay={0.3} />
                                        <Shimmer className="h-5 w-32" delay={0.35} />
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-5">
                                {/* Nama Lengkap */}
                                <div>
                                    <Shimmer className="h-4 w-32 mb-2" delay={0.4} />
                                    <Shimmer className="h-12 w-full rounded-xl" delay={0.45} />
                                </div>

                                {/* NIK */}
                                <div>
                                    <Shimmer className="h-4 w-20 mb-2" delay={0.5} />
                                    <Shimmer className="h-12 w-full rounded-xl" delay={0.55} />
                                </div>

                                {/* Grid 2 cols - Tanggal Lahir & Jenis Kelamin */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Shimmer className="h-4 w-28 mb-2" delay={0.6} />
                                        <Shimmer className="h-12 w-full rounded-xl" delay={0.65} />
                                    </div>
                                    <div>
                                        <Shimmer className="h-4 w-28 mb-2" delay={0.7} />
                                        <Shimmer className="h-12 w-full rounded-xl" delay={0.75} />
                                    </div>
                                </div>

                                {/* Grid 2 cols - Berat Lahir & Tinggi Lahir */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Shimmer className="h-4 w-28 mb-2" delay={0.8} />
                                        <Shimmer className="h-12 w-full rounded-xl" delay={0.85} />
                                    </div>
                                    <div>
                                        <Shimmer className="h-4 w-28 mb-2" delay={0.9} />
                                        <Shimmer className="h-12 w-full rounded-xl" delay={0.95} />
                                    </div>
                                </div>

                                {/* Alamat */}
                                <div>
                                    <Shimmer className="h-4 w-16 mb-2" delay={1} />
                                    <Shimmer className="h-24 w-full rounded-xl" delay={1.05} />
                                </div>

                                {/* Button */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <Shimmer className="h-12 w-24 rounded-xl" delay={1.1} />
                                    <Shimmer className="h-12 w-40 rounded-xl" delay={1.15} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
