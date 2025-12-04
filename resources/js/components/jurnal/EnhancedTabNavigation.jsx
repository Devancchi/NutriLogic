import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const EnhancedTabNavigation = memo(function EnhancedTabNavigation({
    activeTab,
    onTabChange,
    mealCount,
    pmtStatus
}) {
    const tabs = [
        { id: 'jurnal', label: 'Jurnal Harian', count: mealCount },
        { id: 'pmt', label: 'Pantau PMT', count: null },
    ];

    return (
        <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                            isActive
                                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                : "text-gray-500 hover:bg-blue-50 hover:text-blue-700"
                        )}
                    >
                        <span>{tab.label}</span>
                        {tab.count !== null && tab.count > 0 && (
                            <span className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-bold",
                                isActive ? "bg-white/20 text-white" : "bg-blue-100 text-blue-600"
                            )}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </nav>
    );
});

export default EnhancedTabNavigation;
