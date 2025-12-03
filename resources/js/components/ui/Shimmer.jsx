import React from "react";

export default function Shimmer({ className = "", variant = "rectangle", delay = 0 }) {
    const baseClasses = "relative overflow-hidden bg-gray-200/80";

    const variantClasses = {
        rectangle: "rounded-lg",
        circle: "rounded-full",
        text: "rounded h-4",
        card: "rounded-2xl",
        button: "rounded-xl",
    };

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant] || variantClasses.rectangle} ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div 
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"
                style={{ animationDelay: `${delay}ms` }}
            />
        </div>
    );
}

// Komponen skeleton untuk berbagai tipe konten
export function SkeletonCard({ className = "", delay = 0 }) {
    return (
        <div className={`bg-white rounded-2xl border border-gray-100 p-5 ${className}`}>
            <div className="flex items-start gap-4 mb-4">
                <Shimmer className="w-12 h-12 shrink-0" variant="circle" delay={delay} />
                <div className="flex-1 space-y-2">
                    <Shimmer className="h-5 w-3/4" delay={delay + 50} />
                    <Shimmer className="h-3 w-1/2" variant="text" delay={delay + 100} />
                </div>
            </div>
            <div className="space-y-2">
                <Shimmer className="h-3 w-full" variant="text" delay={delay + 150} />
                <Shimmer className="h-3 w-4/5" variant="text" delay={delay + 200} />
            </div>
        </div>
    );
}

export function SkeletonTableRow({ columns = 6, delay = 0 }) {
    return (
        <tr>
            {Array.from({ length: columns }).map((_, i) => (
                <td key={i} className="px-6 py-4">
                    <Shimmer className="h-4 w-full" variant="text" delay={delay + i * 50} />
                </td>
            ))}
        </tr>
    );
}

export function SkeletonStat({ delay = 0 }) {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
                <Shimmer className="w-10 h-10" variant="rectangle" delay={delay} />
                <Shimmer className="h-4 w-20" variant="text" delay={delay + 50} />
            </div>
            <Shimmer className="h-8 w-16 mb-2" delay={delay + 100} />
            <Shimmer className="h-3 w-24" variant="text" delay={delay + 150} />
        </div>
    );
}

export function SkeletonListItem({ delay = 0, hasAvatar = true }) {
    return (
        <div className="flex items-center gap-4 p-4">
            {hasAvatar && <Shimmer className="w-10 h-10 shrink-0" variant="circle" delay={delay} />}
            <div className="flex-1 space-y-2">
                <Shimmer className="h-4 w-2/3" delay={delay + 50} />
                <Shimmer className="h-3 w-1/3" variant="text" delay={delay + 100} />
            </div>
            <Shimmer className="h-6 w-16 shrink-0" variant="button" delay={delay + 150} />
        </div>
    );
}
