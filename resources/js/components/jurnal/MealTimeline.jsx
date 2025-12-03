import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit, Circle } from 'lucide-react';
import TimelineSkeleton from './TimelineSkeleton';
import NoMealsEmptyState from './NoMealsEmptyState';

const MealTimeline = memo(function MealTimeline({ meals, loading, onDelete, onEdit }) {
    if (loading) return <TimelineSkeleton />;
    // Sort meals by time (newest first)
    const sortedMeals = [...meals].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <section>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Timeline Hari Ini</h3>

            <div className="space-y-8 relative">
                {sortedMeals.length === 0 ? (
                    <NoMealsEmptyState />
                ) : (
                    <>
                        {/* Vertical Line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200"></div>

                        <AnimatePresence>
                            {sortedMeals.map((meal, index) => (
                                <motion.div
                                    key={meal.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="relative pl-8 group"
                                >
                                    {/* Dot Marker */}
                                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-gray-300 z-10 group-hover:border-blue-500 transition-colors"></div>

                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-mono text-gray-400">
                                                    {new Date(meal.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                                    {meal.time_of_day}
                                                </span>
                                            </div>

                                            <h4 className="text-base font-semibold text-gray-900">
                                                {meal.description}
                                            </h4>

                                            {(meal.ingredients || meal.notes) && (
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {meal.ingredients && <span>{meal.ingredients}</span>}
                                                    {meal.ingredients && meal.notes && <span className="mx-1.5 text-gray-300">•</span>}
                                                    {meal.notes && <span className="italic text-gray-500">{meal.notes}</span>}
                                                </p>
                                            )}

                                            <div className="pt-1">
                                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${meal.portion === 'habis' ? 'border-green-200 text-green-700 bg-green-50' :
                                                    meal.portion === 'setengah' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                                                        'border-red-200 text-red-700 bg-red-50'
                                                    }`}>
                                                    Porsi: {meal.portion}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {onEdit && (
                                                <button
                                                    onClick={() => onEdit(meal)}
                                                    className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button
                                                    onClick={() => onDelete(meal.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </section>
    );
});

export default MealTimeline;
