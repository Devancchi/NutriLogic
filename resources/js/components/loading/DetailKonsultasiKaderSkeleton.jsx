import React from "react";
import Shimmer from "../ui/Shimmer";

export default function DetailKonsultasiKaderSkeleton() {
    return (
        <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
            {/* Header Skeleton */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
                    <div className="flex items-center gap-3">
                        <Shimmer variant="circle" className="w-8 h-8" delay={0} />
                        <div className="flex items-center gap-3">
                            <Shimmer variant="circle" className="w-10 h-10" delay={0.05} />
                            <div>
                                <Shimmer className="h-4 w-40 mb-1" delay={0.1} />
                                <Shimmer className="h-3 w-28" delay={0.15} />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shimmer className="h-9 w-24 rounded-xl hidden sm:block" delay={0.2} />
                        <Shimmer variant="circle" className="w-8 h-8" delay={0.25} />
                    </div>
                </div>
            </div>

            {/* Messages Area Skeleton */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div className="max-w-5xl mx-auto w-full space-y-6">
                    {/* Date Badge */}
                    <div className="flex justify-center">
                        <Shimmer className="h-6 w-48 rounded-full" delay={0.3} />
                    </div>

                    {/* Message bubbles - alternating left/right */}
                    {[
                        { isRight: false, delay: 0.35, width: "w-64" },
                        { isRight: true, delay: 0.4, width: "w-56" },
                        { isRight: false, delay: 0.45, width: "w-72" },
                        { isRight: true, delay: 0.5, width: "w-48" },
                        { isRight: false, delay: 0.55, width: "w-60" },
                    ].map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.isRight ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex flex-col ${msg.isRight ? 'items-end' : 'items-start'}`}>
                                <Shimmer 
                                    className={`h-12 ${msg.width} ${msg.isRight ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm'}`} 
                                    delay={msg.delay} 
                                />
                                <Shimmer className="h-3 w-16 mt-1.5" delay={msg.delay + 0.05} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Input Area Skeleton */}
            <div className="bg-white border-t border-slate-200 p-4">
                <div className="max-w-5xl mx-auto w-full">
                    <div className="flex items-end gap-3">
                        <Shimmer variant="circle" className="w-10 h-10 shrink-0" delay={0.6} />
                        <Shimmer className="h-12 flex-1 rounded-xl" delay={0.65} />
                        <Shimmer variant="circle" className="w-10 h-10 shrink-0" delay={0.7} />
                    </div>
                </div>
            </div>
        </div>
    );
}
