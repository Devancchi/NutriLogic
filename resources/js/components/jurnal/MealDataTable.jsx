import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Utensils, FileText, Trash2 } from 'lucide-react';

export default function MealDataTable({ meals, loading, onDelete }) {
    if (loading) {
        return (
            <div className="w-full p-8 text-center text-gray-500">
                Memuat data...
            </div>
        );
    }

    if (!meals || meals.length === 0) {
        return null; // Don't show table if empty (EmptyState is already shown above)
    }

    return (
        <div className="w-full bg-white border-t border-gray-200 mt-0">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Waktu
                                </div>
                            </th>
                            <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[25%]">
                                <div className="flex items-center gap-2">
                                    <Utensils className="w-4 h-4" />
                                    Menu
                                </div>
                            </th>
                            <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">
                                Porsi
                            </th>
                            <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[25%]">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Catatan / Bahan
                                </div>
                            </th>
                            <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[10%] text-right">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {meals.map((meal, index) => (
                            <motion.tr
                                key={meal.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-blue-50/50 transition-colors group"
                            >
                                <td className="py-4 px-6 align-top">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {meal.time_of_day}
                                    </span>
                                    <div className="text-xs text-gray-400 mt-1 font-mono">
                                        {new Date(meal.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </td>
                                <td className="py-4 px-6 align-top">
                                    <div className="font-medium text-gray-900">{meal.description}</div>
                                </td>
                                <td className="py-4 px-6 align-top">
                                    <div className="text-sm text-gray-600">{meal.portion}</div>
                                </td>
                                <td className="py-4 px-6 align-top">
                                    <div className="space-y-1">
                                        {meal.ingredients && (
                                            <div className="text-xs text-gray-500">
                                                <span className="font-semibold">Bahan:</span> {meal.ingredients}
                                            </div>
                                        )}
                                        {meal.notes && (
                                            <div className="text-xs text-gray-500 italic">
                                                "{meal.notes}"
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-6 align-top text-right">
                                    <button
                                        onClick={() => onDelete(meal.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                        title="Hapus Catatan"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
