import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, AlertTriangle, AlertCircle, Clock, TrendingDown } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import DashboardLayout from "../dashboard/DashboardLayout";
import api from "../../lib/api";
import { useDataCache } from "../../contexts/DataCacheContext";
import { formatAge } from "../../lib/utils";
import kepalaBayi from "../../assets/kepala_bayi.png";
import kepalaBayiCewe from "../../assets/kepala_bayi_cewe.png";
import AnakPrioritasSkeleton from "../loading/AnakPrioritasSkeleton";

export default function AnakPrioritas() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [atRiskChildren, setAtRiskChildren] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterLevel, setFilterLevel] = useState("all");
    const navigate = useNavigate();

    // Data caching
    const { getCachedData, setCachedData } = useDataCache();

    useEffect(() => {
        fetchAtRiskChildren();
    }, []);

    const fetchAtRiskChildren = async (forceRefresh = false) => {
        if (!forceRefresh) {
            const cachedData = getCachedData('kader_at_risk_children');
            if (cachedData) {
                setAtRiskChildren(cachedData);
                setLoading(false);
                return;
            }
        }

        try {
            if (!forceRefresh) {
                setLoading(true);
            }
            setError(null);

            const response = await api.get('/kader/children/at-risk');
            setAtRiskChildren(response.data.data);
            setCachedData('kader_at_risk_children', response.data.data);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Gagal memuat data anak prioritas. Silakan coba lagi.';
            setError(errorMessage);
            console.error('At-risk children fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredChildren = atRiskChildren.filter(item => {
        const matchesSearch = item.child.full_name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = filterLevel === "all" || item.risk_level === filterLevel;
        return matchesSearch && matchesLevel;
    });

    const getRiskLevelStyle = (level) => {
        switch (level) {
            case 'high':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-700',
                    badge: 'bg-red-100 text-red-700',
                    icon: 'text-red-500',
                    label: 'RISIKO TINGGI'
                };
            case 'medium':
                return {
                    bg: 'bg-orange-50',
                    border: 'border-orange-200',
                    text: 'text-orange-700',
                    badge: 'bg-orange-100 text-orange-700',
                    icon: 'text-orange-500',
                    label: 'PERLU PERHATIAN'
                };
            default:
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    text: 'text-yellow-700',
                    badge: 'bg-yellow-100 text-yellow-700',
                    icon: 'text-yellow-500',
                    label: 'PANTAU'
                };
        }
    };

    const getRiskIcon = (type) => {
        switch (type) {
            case 'zscore_drop':
                return <TrendingDown className="w-3.5 h-3.5" />;
            case 'status_worsening':
            case 'critical_status':
            case 'at_risk_status':
                return <AlertCircle className="w-3.5 h-3.5" />;
            case 'no_update':
            case 'no_data':
                return <Clock className="w-3.5 h-3.5" />;
            default:
                return <AlertTriangle className="w-3.5 h-3.5" />;
        }
    };

    // Count by risk level
    const countByLevel = {
        high: atRiskChildren.filter(c => c.risk_level === 'high').length,
        medium: atRiskChildren.filter(c => c.risk_level === 'medium').length,
        low: atRiskChildren.filter(c => c.risk_level === 'low').length,
    };

    if (loading) {
        return <AnakPrioritasSkeleton cardCount={6} />;
    }

    return (
        <DashboardLayout
            header={
                <PageHeader
                    title="Anak Prioritas"
                    subtitle="Portal Kader"
                    description="Daftar anak dengan kondisi gizi yang memerlukan perhatian khusus"
                    showProfile={true}
                />
            }
        >

            {/* Error Alert */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">{error}</span>
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-50 rounded-2xl p-4 border border-red-100 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setFilterLevel(filterLevel === 'high' ? 'all' : 'high')}>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 rounded-bl-full -mr-2 -mt-2"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <p className="text-xs font-medium text-red-600">Risiko Tinggi</p>
                        </div>
                        <h3 className="text-2xl font-bold text-red-700">{countByLevel.high}</h3>
                    </div>
                    {filterLevel === 'high' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500"></div>}
                </div>

                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setFilterLevel(filterLevel === 'medium' ? 'all' : 'medium')}>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-bl-full -mr-2 -mt-2"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                            <p className="text-xs font-medium text-orange-600">Perlu Perhatian</p>
                        </div>
                        <h3 className="text-2xl font-bold text-orange-700">{countByLevel.medium}</h3>
                    </div>
                    {filterLevel === 'medium' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"></div>}
                </div>

                <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setFilterLevel(filterLevel === 'low' ? 'all' : 'low')}>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-100 rounded-bl-full -mr-2 -mt-2"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <p className="text-xs font-medium text-yellow-700">Pantau</p>
                        </div>
                        <h3 className="text-2xl font-bold text-yellow-700">{countByLevel.low}</h3>
                    </div>
                    {filterLevel === 'low' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500"></div>}
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari nama anak..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all sm:text-sm"
                    />
                </div>
            </div>

            {/* Filter indicator */}
            {filterLevel !== 'all' && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Filter aktif:</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${getRiskLevelStyle(filterLevel).badge}`}>
                        {getRiskLevelStyle(filterLevel).label}
                    </span>
                    <button
                        onClick={() => setFilterLevel('all')}
                        className="text-xs text-gray-400 hover:text-gray-600"
                    >
                        Hapus filter
                    </button>
                </div>
            )}

            {/* Children List */}
            {filteredChildren.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 text-center z-0">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-10 h-10 text-green-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {searchQuery || filterLevel !== 'all' ? 'Tidak ada data ditemukan' : 'Semua anak dalam kondisi baik!'}
                    </h3>
                    <p className="text-gray-500">
                        {searchQuery || filterLevel !== 'all'
                            ? "Coba ubah kata kunci pencarian atau filter."
                            : "Tidak ada anak yang memerlukan perhatian khusus saat ini."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 z-0">
                    {filteredChildren.map((item) => {
                        const { child, risks, risk_level, latest_weighing } = item;
                        const style = getRiskLevelStyle(risk_level);

                        return (
                            <div
                                key={child.id}
                                className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all cursor-pointer group ${style.border} hover:shadow-lg`}
                                onClick={() => navigate(`/dashboard/data-anak/${child.id}`)}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-full overflow-hidden border-2 shadow-sm shrink-0 ${style.border}`}>
                                            <img
                                                src={child.gender === 'L' ? kepalaBayi : kepalaBayiCewe}
                                                alt={child.full_name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className={`font-bold line-clamp-1 transition-colors text-gray-900 group-hover:${style.text}`}>
                                                {child.full_name}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {child.gender === 'L' ? 'Laki-laki' : 'Perempuan'} • {formatAge(child.age_in_months)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${style.badge}`}>
                                        {style.label}
                                    </span>
                                </div>

                                {/* Risk Indicators */}
                                <div className={`rounded-xl p-4 mb-4 ${style.bg} border ${style.border}`}>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                                        Indikator Risiko
                                    </p>
                                    <div className="space-y-2">
                                        {risks.map((risk, idx) => (
                                            <div key={idx} className={`flex items-start gap-2 text-xs ${style.text}`}>
                                                <div className={`mt-0.5 ${style.icon}`}>
                                                    {getRiskIcon(risk.type)}
                                                </div>
                                                <span>{risk.message}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Latest Data */}
                                <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Data Terakhir</span>
                                        <span className="text-[10px] text-gray-400">
                                            {latest_weighing
                                                ? new Date(latest_weighing.measured_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
                                                : '-'}
                                        </span>
                                    </div>

                                    {latest_weighing ? (
                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-0.5">Berat</p>
                                                <p className="text-sm font-bold text-gray-900">{latest_weighing.weight_kg} kg</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-0.5">Tinggi</p>
                                                <p className="text-sm font-bold text-gray-900">{latest_weighing.height_cm} cm</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-0.5">Status</p>
                                                <p className={`text-xs font-bold ${style.text}`}>
                                                    {latest_weighing.nutritional_status || '-'}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic text-center py-1">Belum ada data penimbangan</p>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-400">Orang Tua</span>
                                        <span className="text-xs font-medium text-gray-700 truncate max-w-[120px]">
                                            {child.parent?.name || '-'}
                                        </span>
                                    </div>
                                    <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${style.text} ${style.bg} hover:opacity-80`}>
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </DashboardLayout>
    );
}
