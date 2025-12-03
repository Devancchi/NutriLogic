import React, { useState } from 'react';
import { ChevronDown, LayoutGrid, Activity, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function JurnalViewSelector({ activeTab, onTabChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { value: 'jurnal', label: 'Jurnal Harian', icon: LayoutGrid },
        { value: 'pmt', label: 'Pantau PMT', icon: Activity },
    ];

    const selectedOption = options.find(opt => opt.value === activeTab) || options[0];
    const Icon = selectedOption.icon;

    return (
        <div className="relative w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between",
                    "px-4 py-3.5",
                    "bg-white border border-gray-200 rounded-xl",
                    "text-gray-900 font-semibold",
                    "shadow-sm hover:border-blue-400 hover:shadow-md",
                    "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                    "transition-all duration-200"
                )}
            >
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "p-2 rounded-lg",
                        activeTab === 'jurnal' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                    )}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <span>{selectedOption.label}</span>
                </div>
                <ChevronDown className={cn(
                    "w-5 h-5 text-gray-400 transition-transform duration-200",
                    isOpen && "rotate-180"
                )} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-30"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-40 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
                        >
                            <div className="p-1.5 space-y-1">
                                {options.map((option) => {
                                    const OptionIcon = option.icon;
                                    const isSelected = activeTab === option.value;

                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                onTabChange(option.value);
                                                setIsOpen(false);
                                            }}
                                            className={cn(
                                                "w-full flex items-center justify-between",
                                                "px-3 py-2.5 rounded-lg",
                                                "text-sm font-medium transition-colors",
                                                isSelected
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <OptionIcon className={cn(
                                                    "w-4 h-4",
                                                    isSelected ? "text-blue-600" : "text-gray-400"
                                                )} />
                                                {option.label}
                                            </div>
                                            {isSelected && (
                                                <Check className="w-4 h-4 text-blue-600" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
