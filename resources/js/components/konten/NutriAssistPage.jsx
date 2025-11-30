
import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import { assets } from "../../assets/assets";
import { formatAge } from "../../lib/utils";
import PageHeader from "../dashboard/PageHeader";
import NutriAssistSkeleton from "../loading/NutriAssistSkeleton";
import { useDataCache } from "../../contexts/DataCacheContext";

// TODO: Integrate with AI/n8n for advanced recommendations in future version

export default function NutriAssistPage() {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [children, setChildren] = useState([]);
    const [selectedChildId, setSelectedChildId] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [recommendations, setRecommendations] = useState(null);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const { getCachedData, setCachedData } = useDataCache();

    useEffect(() => {
        fetchChildren();

        // Load cached recommendations if available
        const cachedRecommendations = getCachedData('nutriAssistRecommendations');
        if (cachedRecommendations) {
            setRecommendations(cachedRecommendations);
        }
    }, []);

    useEffect(() => {
        if (recommendations) {
            // Trigger animation after recommendations are set
            setTimeout(() => setShowRecommendations(true), 100);
        } else {
            setShowRecommendations(false);
        }
    }, [recommendations]);

    const fetchChildren = async () => {
        try {
            setLoading(true);
            setError(null);

            // Check cache first (reuse children cache)
            const cachedData = getCachedData('children');
            if (cachedData) {
                setChildren(cachedData);
                if (cachedData.length > 0) {
                    setSelectedChildId(cachedData[0].id.toString());
                }
                setLoading(false);
                return;
            }

            // Fetch from API if no cache
            const response = await api.get('/parent/children');
            const data = response.data.data;
            setChildren(data);
            setCachedData('children', data);

            // Auto-select first child if available
            if (data.length > 0) {
                setSelectedChildId(data[0].id.toString());
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Gagal memuat data anak. Silakan coba lagi.';
            setError(errorMessage);
            console.error('Children fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!selectedChildId) {
            setError('Silakan pilih anak terlebih dahulu.');
            return;
        }

        if (!ingredients.trim()) {
            setError('Silakan masukkan bahan makanan yang tersedia.');
            return;
        }

        // Parse ingredients from string to array
        // Support both comma-separated and newline-separated
        const ingredientsArray = ingredients
            .split(/[,\n]/)
            .map(item => item.trim())
            .filter(item => item.length > 0);

        if (ingredientsArray.length === 0) {
            setError('Silakan masukkan minimal satu bahan makanan.');
            return;
        }

        try {
            setSubmitting(true);
            setError(null);
            // Don't clear recommendations here - keep them until new results arrive

            const payload = {
                ingredients: ingredientsArray,
            };

            if (date) {
                payload.date = date;
            }

            if (notes.trim()) {
                payload.notes = notes.trim();
            }

            const response = await api.post(`/parent/children/${selectedChildId}/nutri-assist`, payload);
            const newRecommendations = response.data.data;
            setRecommendations(newRecommendations);
            setCachedData('nutriAssistRecommendations', newRecommendations); // Cache the recommendations
            setExpandedCardIndex(null); // Reset expanded card when new recommendations arrive

            // Scroll to recommendations smoothly
            setTimeout(() => {
                document.getElementById('recommendations-section')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 200);
        } catch (err) {
            if (err.response?.status === 403) {
                setError('Anda tidak memiliki akses untuk mendapatkan rekomendasi untuk anak ini.');
            } else if (err.response?.status === 404) {
                setError('Data anak tidak ditemukan.');
            } else {
                const errorMessage = err.response?.data?.message || 'Gagal mendapatkan rekomendasi. Silakan coba lagi.';
                setError(errorMessage);
            }
            console.error('Nutri-assist submit error:', err);
        } finally {
            setSubmitting(false);
        }
    };

    // Loading state (initial fetch)
    if (loading) {
        return <NutriAssistSkeleton />;
    }

    return (
        <div className="flex flex-1 w-full h-full overflow-auto">
            <div className="p-4 md:p-10 w-full h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col gap-6">
                {/* Header with gradient */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-5"></div>
                    <div className="relative p-6 rounded-2xl">
                        <PageHeader title="Nutri-Assist" subtitle="Portal Orang Tua" />
                        <p className="text-gray-600 mt-2 flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Asisten pintar untuk membantu memantau gizi dan kesehatan anak Anda.
                        </p>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-center justify-between shadow-sm animate-shake">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-100 rounded-full p-2">
                                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-red-800 font-medium">{error}</p>
                        </div>
                        <button
                            onClick={() => setError(null)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Empty State - No Children */}
                {children.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Data Anak</h3>
                        <p className="text-gray-600 mb-6">Silakan daftarkan anak terlebih dahulu untuk menggunakan fitur Nutri-Assist.</p>
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium">
                            Daftarkan Anak
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Form Section - Enhanced Design */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Form Rekomendasi Menu
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Select Child */}
                                <div className="group">
                                    <label htmlFor="child" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Pilih Anak <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="child"
                                        value={selectedChildId}
                                        onChange={(e) => setSelectedChildId(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200 hover:border-blue-300"
                                        required
                                        disabled={submitting}
                                    >
                                        <option value="">-- Pilih Anak --</option>
                                        {children.map((child) => (
                                            <option key={child.id} value={child.id}>
                                                {child.full_name} ({formatAge(child.age_in_months)})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Ingredients Input */}
                                <div className="group">
                                    <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Bahan Makanan yang Tersedia <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="ingredients"
                                        value={ingredients}
                                        onChange={(e) => setIngredients(e.target.value)}
                                        placeholder="Contoh: beras, ayam, wortel, bayam&#10;atau&#10;beras&#10;ayam&#10;wortel&#10;bayam"
                                        rows={6}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-blue-300"
                                        required
                                        disabled={submitting}
                                    />
                                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        Pisahkan setiap bahan dengan koma atau baris baru
                                    </p>
                                </div>

                                {/* Date and Notes in Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Date Input */}
                                    <div className="group">
                                        <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Tanggal (Opsional)
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200 hover:border-blue-300"
                                            disabled={submitting}
                                        />
                                    </div>

                                    {/* Notes Input */}
                                    <div className="group">
                                        <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Catatan Khusus (Opsional)
                                        </label>
                                        <textarea
                                            id="notes"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Contoh: Alergi seafood"
                                            rows={3}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-blue-300"
                                            disabled={submitting}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button - Enhanced */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    {submitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white relative z-10"></div>
                                            <span className="relative z-10">Memproses Rekomendasi...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span className="relative z-10">Dapatkan Rekomendasi Terbaik</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Recommendations Section - Enhanced */}
                        {recommendations && (
                            <div
                                id="recommendations-section"
                                className={`transition-all duration-700 ${showRecommendations
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-4'
                                    }`}
                            >
                                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-xl border border-blue-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                Rekomendasi Menu
                                            </h2>
                                            <p className="text-sm text-gray-600">untuk {recommendations.child.full_name}</p>
                                        </div>
                                    </div>

                                    {/* AI Advice Section */}
                                    {recommendations.advice && (recommendations.advice.general || recommendations.advice.nutritional_focus) && (
                                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-5 mb-4 border border-amber-200">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-amber-100 rounded-full p-2 mt-1">
                                                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-amber-900 mb-2">Saran Ahli Gizi</h3>
                                                    {recommendations.advice.general && (
                                                        <p className="text-sm text-amber-800 mb-2">{recommendations.advice.general}</p>
                                                    )}
                                                    {recommendations.advice.nutritional_focus && (
                                                        <p className="text-sm text-amber-700">
                                                            <strong>Fokus Nutrisi:</strong> {recommendations.advice.nutritional_focus}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* AI Powered Badge */}
                                    {recommendations.metadata?.ai_powered && (
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full border border-purple-200">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M13 7H7v6h6V7z" />
                                                        <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-xs font-semibold text-purple-700">
                                                        Dibuat dengan AI {recommendations.metadata.model || 'Gemini'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {recommendations.recommendations.length === 0 ? (
                                        <div className="text-center py-12 bg-white rounded-xl">
                                            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-700 font-medium mb-2">Tidak ada rekomendasi yang cocok</p>
                                            <p className="text-sm text-gray-500">Coba masukkan bahan makanan lain atau konsultasikan dengan kader.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {recommendations.recommendations.map((rec, index) => {
                                                // Handle both AI (new) and fallback (old) response structures
                                                const menuData = rec.menu || rec; // rec.menu dari fallback, rec langsung dari AI
                                                const matchPercentage = rec.match_percentage || 0;
                                                const isExpanded = expandedCardIndex === index;

                                                const isBest = index === 0 && matchPercentage >= 50;
                                                const matchColor = matchPercentage >= 70
                                                    ? 'from-green-500 to-emerald-600'
                                                    : matchPercentage >= 50
                                                        ? 'from-yellow-500 to-orange-500'
                                                        : 'from-gray-400 to-gray-500';

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${showRecommendations ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                                            }`}
                                                        style={{ transitionDelay: `${index * 100}ms` }}
                                                    >
                                                        {/* Gradient Border Effect */}
                                                        <div className={`absolute inset-0 bg-gradient-to-r ${matchColor} opacity-20 blur-xl`}></div>

                                                        <div className={`relative bg-white rounded-2xl border-2 transition-all duration-300 ${isBest
                                                            ? 'border-blue-300 shadow-lg'
                                                            : 'border-gray-200 shadow-md'
                                                            } ${isExpanded ? 'shadow-xl' : ''}`}>

                                                            {/* Clickable Header - Always Visible */}
                                                            <button
                                                                onClick={() => setExpandedCardIndex(isExpanded ? null : index)}
                                                                className="w-full p-6 text-left hover:bg-gray-50 transition-colors rounded-2xl"
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-3 mb-2">
                                                                            {isBest && (
                                                                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-md">
                                                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                                    </svg>
                                                                                </div>
                                                                            )}
                                                                            <h3 className="text-xl font-bold text-gray-900">{menuData.name}</h3>
                                                                        </div>
                                                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                                                            <span className="flex items-center gap-1">
                                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                </svg>
                                                                                {menuData.meal_type ? menuData.meal_type.replace('_', ' ').charAt(0).toUpperCase() + menuData.meal_type.slice(1).replace('_', ' ') : 'Menu Sehat'}
                                                                            </span>
                                                                            {menuData.nutrition && (
                                                                                <span className="flex items-center gap-1">
                                                                                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                                                                    </svg>
                                                                                    {menuData.nutrition.calories} kcal
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex items-center gap-3">
                                                                        {/* Match Percentage Badge */}
                                                                        {matchPercentage > 0 && (
                                                                            <div className={`px-3 py-1 bg-gradient-to-r ${matchColor} text-white rounded-lg font-bold text-sm shadow-md`}>
                                                                                {matchPercentage.toFixed(0)}%
                                                                            </div>
                                                                        )}

                                                                        {/* Expand/Collapse Icon */}
                                                                        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </button>

                                                            {/* Expandable Content */}
                                                            <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                                                                    {/* Best Recommendation Badge */}
                                                                    {isBest && (
                                                                        <div className="flex items-center gap-2 mb-4 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                                                                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                            </svg>
                                                                            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                                                ⭐ Rekomendasi Terbaik Untuk Anda
                                                                            </span>
                                                                        </div>
                                                                    )}

                                                                    {/* Description */}
                                                                    <p className="text-gray-700 mb-4 leading-relaxed">{menuData.description}</p>

                                                                    {/* Instructions - from AI */}
                                                                    {menuData.instructions && (
                                                                        <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-200">
                                                                            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                                                </svg>
                                                                                Cara Membuat
                                                                            </h4>
                                                                            <p className="text-sm text-blue-800 whitespace-pre-line">{menuData.instructions}</p>
                                                                        </div>
                                                                    )}

                                                                    {/* Nutrition Info Cards */}
                                                                    {menuData.nutrition && (
                                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                                                            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
                                                                                <div className="flex items-center gap-2 mb-1">
                                                                                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                                                                    </svg>
                                                                                    <span className="text-xs font-medium text-orange-700">Kalori</span>
                                                                                </div>
                                                                                <p className="text-2xl font-bold text-orange-900">{menuData.nutrition.calories}</p>
                                                                                <p className="text-xs text-orange-600">kcal</p>
                                                                            </div>

                                                                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                                                                                <div className="flex items-center gap-2 mb-1">
                                                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                                                    </svg>
                                                                                    <span className="text-xs font-medium text-blue-700">Protein</span>
                                                                                </div>
                                                                                <p className="text-2xl font-bold text-blue-900">{menuData.nutrition.protein}</p>
                                                                                <p className="text-xs text-blue-600">gram</p>
                                                                            </div>

                                                                            {menuData.nutrition.carbs !== undefined && (
                                                                                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-200">
                                                                                    <div className="flex items-center gap-2 mb-1">
                                                                                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                                                                        </svg>
                                                                                        <span className="text-xs font-medium text-yellow-700">Karbo</span>
                                                                                    </div>
                                                                                    <p className="text-2xl font-bold text-yellow-900">{menuData.nutrition.carbs}</p>
                                                                                    <p className="text-xs text-yellow-600">gram</p>
                                                                                </div>
                                                                            )}

                                                                            {menuData.nutrition.fat !== undefined && (
                                                                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                                                                                    <div className="flex items-center gap-2 mb-1">
                                                                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                        </svg>
                                                                                        <span className="text-xs font-medium text-purple-700">Lemak</span>
                                                                                    </div>
                                                                                    <p className="text-2xl font-bold text-purple-900">{menuData.nutrition.fat}</p>
                                                                                    <p className="text-xs text-purple-600">gram</p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}

                                                                    {/* Ingredients Used - from AI or fallback */}
                                                                    {((rec.matched_ingredients && rec.matched_ingredients.length > 0) ||
                                                                        (menuData.ingredients && menuData.ingredients.length > 0)) && (
                                                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 mb-4">
                                                                                <div className="flex items-center gap-2 mb-3">
                                                                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                    </svg>
                                                                                    <p className="text-sm font-bold text-green-800">
                                                                                        {rec.matched_ingredients ? 'Bahan yang Cocok:' : 'Bahan yang Dibutuhkan:'}
                                                                                    </p>
                                                                                </div>
                                                                                <div className="flex flex-wrap gap-2">
                                                                                    {(rec.matched_ingredients || menuData.ingredients).map((ingredient, idx) => (
                                                                                        <span
                                                                                            key={idx}
                                                                                            className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-full font-medium shadow-sm hover:shadow-md transition-shadow"
                                                                                        >
                                                                                            ✓ {ingredient}
                                                                                        </span>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                    {/* Portion & Age Info */}
                                                                    {(menuData.portion || menuData.age_appropriate !== undefined) && (
                                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                                            {menuData.portion && (
                                                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                                                                                    📏 Porsi: {menuData.portion}
                                                                                </span>
                                                                            )}
                                                                            {menuData.age_appropriate && (
                                                                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                                                                                    ✓ Sesuai Usia
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    )}

                                                                    {/* Notes from AI */}
                                                                    {menuData.notes && (
                                                                        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                                            <p className="text-sm text-purple-800">
                                                                                <strong>💡 Tips:</strong> {menuData.notes}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
