import React, { useState, useEffect, useCallback, useRef } from "react";
import api from "../../lib/api";
import { fetchMe } from "../../lib/auth";
import GenericFormSkeleton from "../loading/GenericFormSkeleton";
import { useDataCache } from "../../contexts/DataCacheContext";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog";
import { Camera, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useProfileModal } from "../../contexts/ProfileModalContext";

export default function ProfileModal({ isOpen, onClose }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const { notifyProfileUpdate } = useProfileModal();
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        profile_photo_url: null,
    });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const fileInputRef = useRef(null);

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });
    const [passwordError, setPasswordError] = useState(null);
    const [passwordSaving, setPasswordSaving] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(null);
    const { getCachedData, setCachedData, invalidateCache } = useDataCache();

    const fetchProfile = useCallback(async () => {
        try {
            setError(null);
            setSuccessMessage(null);

            const cachedData = getCachedData('profile');
            if (cachedData) {
                setProfileData(cachedData);
                setLoading(false);
                // Don't return here, fetch fresh data in background to get latest photo
            } else {
                setLoading(true);
            }

            const user = await fetchMe();
            const data = {
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                profile_photo_url: user.profile_photo_url || null,
            };
            setProfileData(data);
            setCachedData('profile', data);
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                "Gagal memuat data profil. Silakan coba lagi.";
            setError(errorMessage);
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    }, [getCachedData, setCachedData]);

    useEffect(() => {
        if (isOpen) {
            fetchProfile();
            setPhotoPreview(null);
            setSelectedPhoto(null);
            setShowPasswordForm(false);
        }
    }, [isOpen, fetchProfile]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError(null);
            setSuccessMessage(null);

            const formData = new FormData();
            formData.append('name', profileData.name);
            formData.append('email', profileData.email);
            if (profileData.phone) formData.append('phone', profileData.phone);
            if (selectedPhoto) {
                formData.append('profile_photo', selectedPhoto);
            }
            // Method spoofing for PUT request with FormData
            formData.append('_method', 'PUT');

            const response = await api.post("/parent/profile", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage("Profil berhasil diperbarui!");
            setProfileData(response.data.data);
            setPhotoPreview(null);
            setSelectedPhoto(null);

            invalidateCache('profile');
            notifyProfileUpdate();
            await fetchMe();

            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                "Gagal memperbarui profil. Silakan coba lagi.";
            setError(errorMessage);
            console.error("Error updating profile:", err);
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        try {
            setPasswordSaving(true);
            setPasswordError(null);
            setPasswordSuccess(null);

            await api.put("/parent/profile/password", {
                current_password: passwordForm.current_password,
                new_password: passwordForm.new_password,
                new_password_confirmation: passwordForm.new_password_confirmation,
            });

            setPasswordSuccess("Password berhasil diubah!");
            setPasswordForm({
                current_password: "",
                new_password: "",
                new_password_confirmation: "",
            });

            setTimeout(() => {
                setShowPasswordForm(false);
                setPasswordSuccess(null);
            }, 2000);

        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                "Gagal mengubah password. Silakan coba lagi.";
            setPasswordError(errorMessage);
            console.error("Error updating password:", err);
        } finally {
            setPasswordSaving(false);
        }
    };

    const handleInputChange = (field, value) => {
        setProfileData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handlePasswordInputChange = (field, value) => {
        setPasswordForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent hideClose={true} className="sm:max-w-[425px] p-0 overflow-hidden bg-white border-none shadow-2xl rounded-3xl flex flex-col max-h-[90vh]">
                <div className="flex-1 overflow-y-auto">
                    {/* Fixed Blue Banner */}
                    <div className="h-32 bg-gradient-to-r from-[#4481EB] to-[#04BEFE] w-full relative shrink-0">
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 p-2 bg-black/20 hover:bg-black/30 rounded-full text-white transition-colors backdrop-blur-sm"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="px-6 pb-6 -mt-12 relative">
                        {/* Profile Photo */}
                        <div className="flex justify-center mb-6">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                                    <img
                                        src={photoPreview || profileData.profile_photo_url || `https://ui-avatars.com/api/?name=${profileData.name}&background=random`}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors border-2 border-white"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="py-8 flex justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Main Form */}
                                <form id="profile-form" onSubmit={handleProfileSubmit} className="space-y-4">
                                    {successMessage && (
                                        <div className="p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium text-center">
                                            {successMessage}
                                        </div>
                                    )}
                                    {error && (
                                        <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm font-medium text-center">
                                            {error}
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Nama Lengkap</label>
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium text-gray-900"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium text-gray-900"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Nomor Telepon</label>
                                            <input
                                                type="text"
                                                value={profileData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium text-gray-900"
                                                placeholder="Opsional"
                                            />
                                        </div>
                                    </div>
                                </form>

                                {/* Password Section */}
                                <div className="border-t border-gray-100 pt-4">
                                    <button
                                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                                        className="w-full flex items-center justify-between text-sm font-medium text-gray-600 hover:text-gray-900 py-2 group"
                                    >
                                        <span>Ganti Password</span>
                                        <span className={`transform transition-transform duration-200 ${showPasswordForm ? 'rotate-180' : ''}`}>
                                            ▼
                                        </span>
                                    </button>

                                    <AnimatePresence>
                                        {showPasswordForm && (
                                            <motion.form
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="space-y-3 pt-3 overflow-hidden"
                                                onSubmit={handlePasswordSubmit}
                                            >
                                                {passwordSuccess && (
                                                    <div className="p-2 bg-green-50 text-green-700 rounded-lg text-xs font-medium text-center">
                                                        {passwordSuccess}
                                                    </div>
                                                )}
                                                {passwordError && (
                                                    <div className="p-2 bg-red-50 text-red-700 rounded-lg text-xs font-medium text-center">
                                                        {passwordError}
                                                    </div>
                                                )}

                                                <input
                                                    type="password"
                                                    placeholder="Password Saat Ini"
                                                    value={passwordForm.current_password}
                                                    onChange={(e) => handlePasswordInputChange("current_password", e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900"
                                                    required
                                                />
                                                <div className="grid grid-cols-2 gap-3">
                                                    <input
                                                        type="password"
                                                        placeholder="Password Baru"
                                                        value={passwordForm.new_password}
                                                        onChange={(e) => handlePasswordInputChange("new_password", e.target.value)}
                                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900"
                                                        required
                                                        minLength={8}
                                                    />
                                                    <input
                                                        type="password"
                                                        placeholder="Konfirmasi"
                                                        value={passwordForm.new_password_confirmation}
                                                        onChange={(e) => handlePasswordInputChange("new_password_confirmation", e.target.value)}
                                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900"
                                                        required
                                                        minLength={8}
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={passwordSaving}
                                                    className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-colors font-medium text-sm"
                                                >
                                                    {passwordSaving ? "Memproses..." : "Update Password"}
                                                </button>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fixed Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                    <button
                        type="submit"
                        form="profile-form"
                        disabled={saving}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all font-semibold shadow-lg shadow-blue-200 active:scale-[0.98]"
                    >
                        {saving ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
                            </span>
                        ) : "Simpan Perubahan"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
