import React from "react";
import Shimmer from "../ui/Shimmer";

export default function ProfilKaderSkeleton() {
    return (
        <div className="flex flex-1 w-full h-full overflow-auto">
            <div className="p-4 md:p-10 w-full max-w-4xl mx-auto bg-gray-50 flex flex-col gap-6">
                {/* Page Header */}
                <div className="flex flex-col gap-1">
                    <Shimmer className="h-8 w-48" delay={0} />
                    <Shimmer className="h-4 w-28 mt-1" delay={0.05} />
                </div>

                {/* Profile Card Skeleton */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Avatar and Name Section */}
                    <div className="flex items-center gap-6 mb-6">
                        <Shimmer 
                            variant="circle" 
                            className="w-20 h-20" 
                            delay={0.1} 
                        />
                        <div className="flex flex-col gap-2">
                            <Shimmer className="h-7 w-48" delay={0.15} />
                            <Shimmer className="h-4 w-32" delay={0.2} />
                            <Shimmer className="h-4 w-40 mt-1" delay={0.25} />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Nama Lengkap */}
                            <div>
                                <Shimmer className="h-4 w-28 mb-1" delay={0.3} />
                                <Shimmer className="h-10 w-full rounded-lg" delay={0.35} />
                            </div>

                            {/* Email */}
                            <div>
                                <Shimmer className="h-4 w-16 mb-1" delay={0.4} />
                                <Shimmer className="h-10 w-full rounded-lg" delay={0.45} />
                            </div>

                            {/* Nomor Telepon */}
                            <div>
                                <Shimmer className="h-4 w-32 mb-1" delay={0.5} />
                                <Shimmer className="h-10 w-full rounded-lg" delay={0.55} />
                            </div>

                            {/* Role */}
                            <div>
                                <Shimmer className="h-4 w-12 mb-1" delay={0.6} />
                                <Shimmer className="h-10 w-full rounded-lg" delay={0.65} />
                            </div>
                        </div>

                        {/* Edit Button */}
                        <Shimmer className="h-10 w-28 rounded-lg mt-4" delay={0.7} />
                    </div>
                </div>

                {/* Change Password Section Skeleton */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Section Title */}
                    <Shimmer className="h-6 w-36 mb-4" delay={0.75} />

                    {/* Password Fields */}
                    <div className="space-y-4">
                        {/* Current Password */}
                        <div>
                            <Shimmer className="h-4 w-36 mb-1" delay={0.8} />
                            <Shimmer className="h-10 w-full rounded-lg" delay={0.85} />
                        </div>

                        {/* New Password */}
                        <div>
                            <Shimmer className="h-4 w-32 mb-1" delay={0.9} />
                            <Shimmer className="h-10 w-full rounded-lg" delay={0.95} />
                            <Shimmer className="h-3 w-24 mt-1" delay={1} />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <Shimmer className="h-4 w-48 mb-1" delay={1.05} />
                            <Shimmer className="h-10 w-full rounded-lg" delay={1.1} />
                        </div>

                        {/* Submit Button */}
                        <Shimmer className="h-10 w-36 rounded-lg" delay={1.15} />
                    </div>
                </div>
            </div>
        </div>
    );
}
