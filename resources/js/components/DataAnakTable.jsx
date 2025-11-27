"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Power, Pause, Play, RotateCcw, User, MapPin, Calendar, Activity } from "lucide-react";
import { formatAge, getStatusColor, getStatusLabel } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export function DataAnakTable({
    title = "Daftar Anak",
    data: initialChildren = [],
    onRefresh,
    onAdd,
    className = ""
}) {
    const [children, setChildren] = useState(initialChildren);
    const [hoveredChild, setHoveredChild] = useState(null);
    const [selectedChild, setSelectedChild] = useState(null);
    const shouldReduceMotion = useReducedMotion();
    const navigate = useNavigate();

    useEffect(() => {
        setChildren(initialChildren);
    }, [initialChildren]);

    const openChildModal = (child) => {
        setSelectedChild(child);
    };

    const closeChildModal = () => {
        setSelectedChild(null);
    };

    const getGenderIcon = (gender) => {
        if (gender === 'L') {
            return (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center p-1.5 border border-blue-200">
                    <span className="text-blue-600 font-bold text-xs">L</span>
                </div>
            );
        } else {
            return (
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center p-1.5 border border-pink-200">
                    <span className="text-pink-600 font-bold text-xs">P</span>
                </div>
            );
        }
    };

    const getStatusBadge = (statusObj) => {
        const status = statusObj?.status || 'tidak_diketahui';
        const label = getStatusLabel(status);

        // Define styles based on status
        let styles = {
            bg: 'bg-gray-100',
            text: 'text-gray-600',
            bar: 'bg-gray-400'
        };

        switch (status) {
            case 'normal':
                styles = { bg: 'bg-emerald-50', text: 'text-emerald-600', bar: 'bg-emerald-500' };
                break;
            case 'kurang':
            case 'kurus':
            case 'pendek':
                styles = { bg: 'bg-yellow-50', text: 'text-yellow-600', bar: 'bg-yellow-500' };
                break;
            case 'sangat_kurang':
            case 'sangat_kurus':
            case 'sangat_pendek':
                styles = { bg: 'bg-red-50', text: 'text-red-600', bar: 'bg-red-500' };
                break;
            case 'lebih':
            case 'gemuk':
            case 'obesitas':
            case 'risiko_lebih':
                styles = { bg: 'bg-blue-50', text: 'text-blue-600', bar: 'bg-blue-500' };
                break;
            default:
                styles = { bg: 'bg-gray-100', text: 'text-gray-600', bar: 'bg-gray-400' };
        }

        return (
            <div className={`px-4 py-1.5 rounded-full border border-gray-100 ${styles.bg} flex items-center gap-2 w-fit`}>
                <div className={`w-2 h-2 rounded-full ${styles.bar}`} />
                <span className={`text-xs font-bold tracking-wider uppercase ${styles.text}`}>{label}</span>
            </div>
        );
    };

    return (
        <div className={`w-full mx-auto font-poppins ${className}`}>
            <div className="relative border border-border/30 rounded-2xl p-6 bg-white shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <h1 className="text-xl font-medium text-gray-900">{title}</h1>
                        </div>
                        <div className="text-sm text-gray-500 ml-4">
                            {children.length} Anak Terdaftar
                        </div>
                    </div>

                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm shadow-blue-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="font-medium">Tambah Data Anak</span>
                        </button>
                    )}
                </div>

                {/* Table */}
                <motion.div
                    className="space-y-2"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.05,
                                delayChildren: 0.1,
                            }
                        }
                    }}
                    initial="hidden"
                    animate="visible">
                    {/* Headers */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="col-span-1">No</div>
                        <div className="col-span-3">Nama</div>
                        <div className="col-span-2">Gender</div>
                        <div className="col-span-2">Umur</div>
                        <div className="col-span-2">Posyandu</div>
                        <div className="col-span-2">Status Gizi</div>
                    </div>

                    {/* Rows */}
                    {children.map((child, index) => (
                        <motion.div
                            key={child.id}
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            className="relative cursor-pointer"
                            onMouseEnter={() => setHoveredChild(child.id)}
                            onMouseLeave={() => setHoveredChild(null)}
                            onClick={() => openChildModal(child)}>
                            <motion.div
                                className="relative bg-gray-50/50 border border-gray-100 rounded-xl p-4 overflow-hidden hover:bg-white hover:shadow-md transition-all"
                                whileHover={{ y: -2 }}>

                                <div className="relative grid grid-cols-12 gap-4 items-center">
                                    {/* No */}
                                    <div className="col-span-1">
                                        <span className="text-lg font-bold text-gray-600">{String(index + 1).padStart(2, '0')}</span>
                                    </div>

                                    {/* Nama */}
                                    <div className="col-span-3">
                                        <span className="text-gray-900 font-medium">{child.full_name}</span>
                                    </div>

                                    {/* Gender */}
                                    <div className="col-span-2 flex items-center gap-2">
                                        {getGenderIcon(child.gender)}
                                        <span className="text-sm text-gray-600">{child.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                                    </div>

                                    {/* Umur */}
                                    <div className="col-span-2">
                                        <span className="text-sm text-gray-600">{formatAge(child.age_in_months)}</span>
                                    </div>

                                    {/* Posyandu */}
                                    <div className="col-span-2 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600 truncate">{child.posyandu?.name || '-'}</span>
                                    </div>

                                    {/* Status */}
                                    <div className="col-span-2">
                                        {getStatusBadge(child.latest_nutritional_status)}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Modal */}
                <AnimatePresence>
                    {selectedChild && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col rounded-2xl z-10 overflow-hidden">

                            <div className="relative bg-gradient-to-r from-gray-50 to-transparent p-4 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {getGenderIcon(selectedChild.gender)}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{selectedChild.full_name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <MapPin className="w-3 h-3" />
                                            {selectedChild.posyandu?.name || '-'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/dashboard/anak/${selectedChild.id}`);
                                        }}
                                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                        Lihat Detail
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/dashboard/anak/edit/${selectedChild.id}`);
                                        }}
                                        className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                                        Edit
                                    </button>
                                    <button
                                        onClick={closeChildModal}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 p-6 overflow-y-auto">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Umur</div>
                                        <div className="text-lg font-medium">{formatAge(selectedChild.age_in_months)}</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status Gizi</div>
                                        <div>{getStatusBadge(selectedChild.latest_nutritional_status)}</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl col-span-2">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Info Tambahan</div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">Tanggal Lahir:</span>
                                                <div className="font-medium">{selectedChild.birth_date || '-'}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">NIK:</span>
                                                <div className="font-medium">{selectedChild.nik || '-'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
