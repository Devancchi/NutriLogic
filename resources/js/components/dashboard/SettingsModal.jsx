import React, { useState, useEffect, useCallback } from "react";
import api from "../../lib/api";
import { useDataCache } from "../../contexts/DataCacheContext";
import {
    Dialog,
    DialogContent,
} from "../ui/dialog";
import { Switch } from "../ui/switch";
import { Select, SelectItem } from "../ui/select";
import { X, Loader2, Bell, Mail, Smartphone, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsModal({ isOpen, onClose }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [settings, setSettings] = useState({
        email_notifications: false,
        push_notifications: false,
        sms_notifications: false,
        marketing_emails: false,
        notification_frequency: "instant",
    });
    const { getCachedData, setCachedData, invalidateCache } = useDataCache();

    const fetchSettings = useCallback(async () => {
        try {
            setError(null);
            setSuccessMessage(null);

            const cachedData = getCachedData('settings');
            if (cachedData) {
                setSettings(cachedData);
                setLoading(false);
            } else {
                setLoading(true);
            }

            const response = await api.get("/parent/settings");
            const data = response.data.data;
            setSettings(data);
            setCachedData('settings', data);
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                "Gagal memuat pengaturan. Silakan coba lagi.";
            setError(errorMessage);
            console.error("Error fetching settings:", err);
        } finally {
            setLoading(false);
        }
    }, [getCachedData, setCachedData]);

    useEffect(() => {
        if (isOpen) {
            fetchSettings();
        }
    }, [isOpen, fetchSettings]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError(null);
            setSuccessMessage(null);

            const response = await api.put("/parent/settings", settings);

            setSuccessMessage("Pengaturan berhasil disimpan!");
            const data = response.data.data;
            setSettings(data);
            setCachedData('settings', data);

            setTimeout(() => {
                setSuccessMessage(null);
                onClose();
            }, 1500);

        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                "Gagal menyimpan pengaturan. Silakan coba lagi.";
            setError(errorMessage);
            console.error("Error saving settings:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = (key) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleFrequencyChange = (e) => {
        setSettings((prev) => ({
            ...prev,
            notification_frequency: e.target.value,
        }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent hideClose={true} className="sm:max-w-[500px] p-0 overflow-hidden bg-white border-none shadow-2xl rounded-3xl">
                {/* Fixed Blue Gradient Banner */}
                <div className="h-32 bg-gradient-to-r from-[#4481EB] to-[#04BEFE] w-full relative flex items-center justify-center shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-2 bg-black/20 hover:bg-black/30 rounded-full text-white transition-colors backdrop-blur-sm"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="text-center text-white">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                            <Bell className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-xl font-bold">Pengaturan</h2>
                        <p className="text-blue-100 text-sm">Kelola notifikasi Anda</p>
                    </div>
                </div>

                <div className="flex flex-col bg-white">
                    {loading ? (
                        <div className="py-12 flex justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <div className="px-6 py-6 overflow-y-auto max-h-[50vh] space-y-6">
                                {successMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium text-center flex items-center justify-center gap-2"
                                    >
                                        <span>✓</span> {successMessage}
                                    </motion.div>
                                )}
                                {error && (
                                    <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm font-medium text-center">
                                        {error}
                                    </div>
                                )}

                                {/* Notification Preferences Section */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900">Notification Preferences</h3>
                                        <p className="text-sm text-gray-500">Choose how you want to be notified</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start gap-3">
                                                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">Email Notifications</div>
                                                    <div className="text-xs text-gray-500">Receive notifications via email</div>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={settings.email_notifications}
                                                onCheckedChange={() => handleToggle('email_notifications')}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start gap-3">
                                                <Bell className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">Push Notifications</div>
                                                    <div className="text-xs text-gray-500">Receive push notifications on your devices</div>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={settings.push_notifications}
                                                onCheckedChange={() => handleToggle('push_notifications')}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start gap-3">
                                                <Smartphone className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">SMS Notifications</div>
                                                    <div className="text-xs text-gray-500">Receive notifications via text message</div>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={settings.sms_notifications}
                                                onCheckedChange={() => handleToggle('sms_notifications')}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start gap-3">
                                                <Megaphone className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">Marketing Emails</div>
                                                    <div className="text-xs text-gray-500">Receive emails about new features and updates</div>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={settings.marketing_emails}
                                                onCheckedChange={() => handleToggle('marketing_emails')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-gray-100 w-full" />

                                {/* Notification Settings Section */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900">Notification Settings</h3>
                                        <p className="text-sm text-gray-500">Configure when and how often you receive notifications</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-900">Notification Frequency</label>
                                        <Select
                                            value={settings.notification_frequency}
                                            onChange={handleFrequencyChange}
                                        >
                                            <SelectItem value="instant">Instant</SelectItem>
                                            <SelectItem value="daily">Daily Digest</SelectItem>
                                            <SelectItem value="weekly">Weekly Summary</SelectItem>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Fixed Footer */}
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all font-semibold shadow-lg shadow-blue-200 active:scale-[0.98]"
                                >
                                    {saving ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
                                        </span>
                                    ) : "Simpan Pengaturan"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
