import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Calendar,
    Clock,
    MapPin,
    Plus,
    Search,
    Filter,
    ChevronDown,
    Check,
    MoreVertical,
    Trash2,
    CheckCircle,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../lib/api";
import { formatAge } from "../../lib/utils";
import AddScheduleModal from "./AddScheduleModal";
import kepalaBayi from "../../assets/kepala_bayi.png";
import kepalaBayiCewe from "../../assets/kepala_bayi_cewe.png";

export default function JadwalPosyandu() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [children, setChildren] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        type: "",
        status: "",
        child_id: "",
    });

    // Dropdown states
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const typeDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);
    const childDropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSchedules();
        fetchChildren();

        const handleClickOutside = (event) => {
            if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
                setIsTypeDropdownOpen(false);
            }
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
                setIsStatusDropdownOpen(false);
            }
            if (childDropdownRef.current && !childDropdownRef.current.contains(event.target)) {
                setIsChildDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchSchedules = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get('/kader/schedules');
            setSchedules(response.data.data);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Gagal memuat jadwal. Silakan coba lagi.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const fetchChildren = async () => {
        try {
            const response = await api.get('/kader/children?is_active=1');
            setChildren(response.data.data);
        } catch (err) {
            console.error('Failed to fetch children:', err);
        }
    };


    const handleMarkComplete = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm('Apakah Anda yakin ingin menandai jadwal ini sebagai selesai?')) return;

        try {
            await api.put(`/kader/schedules/${id}`, {
                completed_at: new Date().toISOString()
            });
            fetchSchedules();
        } catch (err) {
            alert('Gagal mengupdate status jadwal.');
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) return;

        try {
            await api.delete(`/kader/schedules/${id}`);
            fetchSchedules();
        } catch (err) {
            alert('Gagal menghapus jadwal.');
        }
    };

    const getStatusConfig = (status) => {
        const configs = {
            completed: {
                bg: 'bg-green-50',
                text: 'text-green-700',
                border: 'border-green-200',
                label: 'Selesai',
                icon: CheckCircle
            },
            upcoming: {
                bg: 'bg-blue-50',
                text: 'text-blue-700',
                border: 'border-blue-200',
                label: 'Akan Datang',
                icon: Calendar
            },
            overdue: {
                bg: 'bg-red-50',
                text: 'text-red-700',
                border: 'border-red-200',
                label: 'Terlewat',
                icon: AlertCircle
            },
        };
        return configs[status] || configs.upcoming;
    };

    const getTypeLabel = (type) => {
        const labels = {
            imunisasi: 'Imunisasi',
            vitamin: 'Vitamin',
            posyandu: 'Posyandu',
        };
        return labels[type] || type;
    };


    const filteredSchedules = schedules.filter(schedule => {
        const matchesSearch =
            schedule.child?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            schedule.title?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = filters.type ? schedule.type === filters.type : true;
        const matchesStatus = filters.status ? schedule.status === filters.status : true;
        const matchesChild = filters.child_id ? schedule.child?.id === parseInt(filters.child_id) : true;

        return matchesSearch && matchesType && matchesStatus && matchesChild;
    });


    const typeOptions = [
        { value: "", label: "Semua Jenis" },
        { value: "imunisasi", label: "Imunisasi" },
        { value: "vitamin", label: "Vitamin" },
        { value: "posyandu", label: "Posyandu" },
    ];

    const statusOptions = [
        { value: "", label: "Semua Status" },
        { value: "upcoming", label: "Akan Datang" },
        { value: "overdue", label: "Terlewat" },
        { value: "completed", label: "Selesai" },
    ];

    if (loading) {
        return (
            <div className="flex flex-1 w-full h-full overflow-auto">
                <div className="p-4 md:p-10 w-full h-full bg-gray-50 flex flex-col gap-4">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Memuat jadwal...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1 w-full h-full overflow-auto bg-gray-50/50">
            <div className="w-full flex flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Jadwal Kegiatan</h1>
                        <p className="text-gray-500 mt-1">Kelola jadwal posyandu dan imunisasi</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200 font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Jadwal
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col lg:flex-row gap-4 z-20 relative">
                    {/* Search */}
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari nama anak atau kegiatan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
                        />
                    </div>

                    {/* Type Filter */}
                    <div className="relative w-full lg:w-48" ref={typeDropdownRef}>
                        <button
                            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                            className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        >
                            <span className="truncate">
                                {typeOptions.find(opt => opt.value === filters.type)?.label || "Semua Jenis"}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isTypeDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50"
                                >
                                    {typeOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setFilters(prev => ({ ...prev, type: option.value }));
                                                setIsTypeDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${filters.type === option.value ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'
                                                }`}
                                        >
                                            <span>{option.label}</span>
                                            {filters.type === option.value && <Check className="w-4 h-4" />}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Status Filter */}
                    <div className="relative w-full lg:w-48" ref={statusDropdownRef}>
                        <button
                            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                            className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        >
                            <span className="truncate">
                                {statusOptions.find(opt => opt.value === filters.status)?.label || "Semua Status"}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isStatusDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50"
                                >
                                    {statusOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setFilters(prev => ({ ...prev, status: option.value }));
                                                setIsStatusDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${filters.status === option.value ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'
                                                }`}
                                        >
                                            <span>{option.label}</span>
                                            {filters.status === option.value && <Check className="w-4 h-4" />}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Child Filter */}
                    <div className="relative w-full lg:w-56" ref={childDropdownRef}>
                        <button
                            onClick={() => setIsChildDropdownOpen(!isChildDropdownOpen)}
                            className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        >
                            <span className="truncate">
                                {filters.child_id
                                    ? children.find(c => c.id === parseInt(filters.child_id))?.full_name || "Semua Anak"
                                    : "Semua Anak"}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isChildDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isChildDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 max-h-64 overflow-y-auto"
                                >
                                    <button
                                        onClick={() => {
                                            setFilters(prev => ({ ...prev, child_id: "" }));
                                            setIsChildDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${filters.child_id === "" ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'
                                            }`}
                                    >
                                        <span>Semua Anak</span>
                                        {filters.child_id === "" && <Check className="w-4 h-4" />}
                                    </button>
                                    {children.map((child) => (
                                        <button
                                            key={child.id}
                                            onClick={() => {
                                                setFilters(prev => ({ ...prev, child_id: child.id.toString() }));
                                                setIsChildDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${filters.child_id === child.id.toString() ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'
                                                }`}
                                        >
                                            <span className="truncate">{child.full_name}</span>
                                            {filters.child_id === child.id.toString() && <Check className="w-4 h-4" />}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Schedule List */}
                {filteredSchedules.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 text-center z-0">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Tidak ada jadwal ditemukan</h3>
                        <p className="text-gray-500">
                            {searchQuery || filters.type || filters.status
                                ? "Coba ubah filter atau kata kunci pencarian."
                                : "Belum ada jadwal kegiatan yang dibuat."}
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden z-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                        <th className="px-6 py-4">No</th>
                                        <th className="px-6 py-4">Nama Anak</th>
                                        <th className="px-6 py-4">Jenis</th>
                                        <th className="px-6 py-4">Judul</th>
                                        <th className="px-6 py-4">Waktu</th>
                                        <th className="px-6 py-4">Lokasi</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredSchedules.map((schedule, index) => {
                                        const statusConfig = getStatusConfig(schedule.status);
                                        const StatusIcon = statusConfig.icon;
                                        const scheduleDate = new Date(schedule.scheduled_for);

                                        return (
                                            <tr key={schedule.id} className="hover:bg-gray-50 transition-colors group">
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-100 shrink-0">
                                                            <img
                                                                src={schedule.child?.gender === 'L' ? kepalaBayi : kepalaBayiCewe}
                                                                alt={schedule.child?.full_name || 'Anak'}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {schedule.child?.full_name || 'Tidak ada nama'}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {schedule.child?.parent?.name || '-'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-700 capitalize">
                                                        {getTypeLabel(schedule.type)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-medium text-gray-900 line-clamp-1 max-w-[200px]">
                                                        {schedule.title}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col text-sm text-gray-600">
                                                        <span className="font-medium text-gray-900">
                                                            {scheduleDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {schedule.scheduled_time?.substring(0, 5) || '-'} WIB
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                        <span className="truncate max-w-[150px]">{schedule.location || '-'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {statusConfig.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {schedule.status !== 'completed' && (
                                                            <button
                                                                onClick={(e) => handleMarkComplete(schedule.id, e)}
                                                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                title="Tandai Selesai"
                                                            >
                                                                <CheckCircle className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={(e) => handleDelete(schedule.id, e)}
                                                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Hapus Jadwal"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Schedule Modal */}
            <AddScheduleModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    fetchSchedules();
                    setIsAddModalOpen(false);
                }}
            />
        </div>
    );
}
