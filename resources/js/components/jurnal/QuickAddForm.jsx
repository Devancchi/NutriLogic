import React, { useState, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2, Check, AlertCircle, Clock, Utensils } from 'lucide-react';
import api from '../../lib/api';

const QuickAddForm = memo(function QuickAddForm({ childId, onSuccess }) {
    const [formData, setFormData] = useState({
        time_of_day: 'pagi',
        description: '',
        ingredients: '',
        portion: 'habis',
        notes: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const descriptionRef = useRef(null);

    const timeOptions = [
        { value: 'pagi', label: 'Pagi' },
        { value: 'siang', label: 'Siang' },
        { value: 'malam', label: 'Malam' },
        { value: 'snack', label: 'Snack' },
    ];

    const portionOptions = [
        { value: 'habis', label: 'Habis' },
        { value: 'setengah', label: 'Setengah' },
        { value: 'sedikit', label: 'Sedikit' },
        { value: 'tidak_mau', label: 'Tidak Mau' },
    ];

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!formData.description.trim()) {
            setError('Nama makanan harus diisi');
            if (descriptionRef.current) {
                descriptionRef.current.focus();
            }
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            await api.post('/meal-logs', {
                child_id: childId,
                eaten_at: new Date().toISOString().split('T')[0],
                time_of_day: formData.time_of_day,
                description: formData.description,
                ingredients: formData.ingredients || null,
                portion: formData.portion,
                notes: formData.notes || null,
                source: 'ortu',
            });

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2500);

            setFormData({
                time_of_day: 'pagi',
                description: '',
                ingredients: '',
                portion: 'habis',
                notes: '',
            });

            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('Error adding meal log:', err);
            // Show a more user-friendly error message
            let errorMessage = 'Gagal menyimpan data. Silakan coba lagi.';

            if (err.response?.data?.message) {
                // If it's a specific SQL error that shouldn't be shown to users
                if (err.response.data.message.includes('SQLSTATE')) {
                    errorMessage = 'Terjadi kesalahan sistem. Mohon hubungi admin.';
                } else {
                    errorMessage = err.response.data.message;
                }
            }

            setError(errorMessage);
        } finally {
            setSubmitting(false);
        }
    }, [childId, formData, onSuccess]);

    return (
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-gray-400" />
                Catat Makanan
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Top Row: Time & Portion */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Waktu</label>
                        <div className="flex gap-2">
                            {timeOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, time_of_day: option.value })}
                                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${formData.time_of_day === option.value
                                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                                        : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Porsi</label>
                        <select
                            value={formData.portion}
                            onChange={(e) => setFormData({ ...formData, portion: e.target.value })}
                            className="w-full p-2 bg-gray-50 border-none rounded-lg text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-200 cursor-pointer hover:bg-blue-50 transition-colors"
                        >
                            {portionOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Main Input: Description */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Menu Makanan</label>
                    <div className="relative">
                        <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            ref={descriptionRef}
                            type="text"
                            value={formData.description}
                            onChange={(e) => {
                                setFormData({ ...formData, description: e.target.value });
                                if (error) setError(null);
                            }}
                            placeholder="Apa yang dimakan si kecil?"
                            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-base font-medium text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-blue-50/30 transition-all ${error ? 'ring-2 ring-red-500/20 bg-red-50/50' : ''
                                }`}
                        />
                    </div>
                </div>

                {/* Secondary Inputs: Ingredients & Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bahan (Opsional)</label>
                        <input
                            type="text"
                            value={formData.ingredients}
                            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                            placeholder="Contoh: Bayam, Wortel"
                            className="w-full px-3 py-2 bg-transparent border-b border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Catatan (Opsional)</label>
                        <input
                            type="text"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Ada catatan khusus?"
                            className="w-full px-3 py-2 bg-transparent border-b border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* Feedback & Action */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex-1 mr-4">
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-red-600 text-xs font-medium flex items-center gap-1"
                                >
                                    <AlertCircle className="w-3 h-3" />
                                    {error}
                                </motion.div>
                            )}
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-green-600 text-xs font-medium flex items-center gap-1"
                                >
                                    <Check className="w-3 h-3" />
                                    Tersimpan
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all shadow-lg shadow-blue-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Simpan
                    </button>
                </div>
            </form>
        </section>
    );
});

export default QuickAddForm;
