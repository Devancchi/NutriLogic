import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { ArrowLeft, Send, CheckCircle, Clock, User, MoreVertical, Phone, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DetailKonsultasiKader() {
    const { id } = useParams();
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);
    const [consultation, setConsultation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        fetchConsultationDetail();
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchConsultationDetail = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.get(`/kader/consultations/${id}`);
            setConsultation(response.data.data.consultation);
            setMessages(response.data.data.messages);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Gagal memuat detail konsultasi.';
            setError(errorMessage);
            console.error('Consultation detail fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setSending(true);
        try {
            const response = await api.post(`/kader/consultations/${id}/messages`, {
                message: newMessage
            });

            setMessages([...messages, response.data.data]);
            setNewMessage("");
        } catch (err) {
            alert('Gagal mengirim pesan. Silakan coba lagi.');
        } finally {
            setSending(false);
        }
    };

    const handleClose = async () => {
        if (!window.confirm('Apakah Anda yakin ingin menutup konsultasi ini?')) return;

        try {
            await api.put(`/kader/consultations/${id}/close`);
            navigate('/dashboard/konsultasi');
        } catch (err) {
            alert('Gagal menutup konsultasi.');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-1 w-full h-full items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">Memuat percakapan...</p>
                </div>
            </div>
        );
    }

    if (error || !consultation) {
        return (
            <div className="flex flex-1 w-full h-full items-center justify-center bg-slate-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md mx-4">
                    <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Terjadi Kesalahan</h3>
                    <p className="text-slate-600 mb-6">{error || 'Konsultasi tidak ditemukan'}</p>
                    <button
                        onClick={() => navigate('/dashboard/konsultasi')}
                        className="px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium"
                    >
                        Kembali ke Daftar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/dashboard/konsultasi')}
                            className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-blue-200 text-blue-700 font-bold text-sm">
                                {consultation.parent?.name?.substring(0, 2).toUpperCase() || 'OR'}
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-800 leading-tight">
                                    {consultation.parent?.name}
                                </h2>
                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        Anak: {consultation.child?.full_name || '-'}
                                    </span>
                                    {consultation.status === 'open' ? (
                                        <span className="flex items-center gap-1 text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded-full">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            Aktif
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
                                            <CheckCircle className="w-3 h-3" />
                                            Selesai
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {consultation.status === 'open' && (
                            <button
                                onClick={handleClose}
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-medium shadow-sm"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Akhiri Sesi
                            </button>
                        )}
                        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth">
                <div className="max-w-5xl mx-auto w-full space-y-6">
                    <div className="flex justify-center">
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                            {new Date(consultation.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>

                    <AnimatePresence initial={false}>
                        {messages.map((message, index) => {
                            const isKader = message.sender_id !== consultation.parent_id;
                            const isLast = index === messages.length - 1;

                            return (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${isKader ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isKader ? 'items-end' : 'items-start'}`}>
                                        <div
                                            className={`px-5 py-3 shadow-sm relative text-sm leading-relaxed ${isKader
                                                ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                                                : 'bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-tl-sm'
                                                }`}
                                        >
                                            <p className="whitespace-pre-wrap">{message.message}</p>
                                        </div>
                                        <div className={`flex items-center gap-1 mt-1.5 text-[10px] font-medium ${isKader ? 'text-blue-900/40' : 'text-slate-400'}`}>
                                            {isKader && <span>Anda</span>}
                                            {!isKader && <span>{message.sender?.name?.split(' ')[0]}</span>}
                                            <span>•</span>
                                            <span>
                                                {new Date(message.created_at).toLocaleTimeString('id-ID', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-slate-200 p-4 pb-6 sm:p-4 sticky bottom-0 z-10">
                <div className="max-w-5xl mx-auto w-full">
                    {consultation.status === 'open' ? (
                        <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                            <div className="flex-1 bg-slate-100 rounded-2xl flex items-center p-1 border border-transparent focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                                <textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Ketik pesan balasan..."
                                    rows="1"
                                    className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-slate-800 placeholder:text-slate-400 resize-none max-h-32 min-h-[48px]"
                                    style={{ height: 'auto', minHeight: '48px' }}
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage(e);
                                        }
                                    }}
                                    disabled={sending}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={sending || !newMessage.trim()}
                                className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all transform active:scale-95"
                            >
                                {sending ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5 ml-0.5" />
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                            <div className="flex items-center justify-center gap-2 text-slate-500 mb-1">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-semibold">Sesi Selesai</span>
                            </div>
                            <p className="text-sm text-slate-400">Percakapan ini telah ditutup dan diarsipkan.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
