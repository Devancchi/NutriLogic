import React from 'react';
import ChildProfileCard from './ChildProfileCard';
import { Calendar } from '../ui/calendar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';
import { logoutWithApi } from '../../lib/auth';
import { useProfileModal } from '../../contexts/ProfileModalContext';
import { useSettingsModal } from '../../contexts/SettingsModalContext';

export default function RightSection({ user, childrenData, schedules }) {
    const navigate = useNavigate();
    const { openProfileModal } = useProfileModal();
    const { openSettingsModal } = useSettingsModal();

    // Get the first child or the one needing attention
    const featuredChild = childrenData?.find(c => c.latest_nutritional_status.is_at_risk) || childrenData?.[0];

    const handleLogout = async () => {
        await logoutWithApi();
        navigate("/auth");
    };

    return (
        <div className="flex flex-col gap-10">
            {/* User Profile Mini Header (Desktop Right Sidebar) */}
            <div className="hidden xl:flex items-center justify-end gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-4 outline-none cursor-pointer">
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role || 'Orang Tua'}</p>
                        </div>
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <img
                                src={user?.profile_photo_url || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={openProfileModal}>
                            <Icon icon="lucide:user" className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={openSettingsModal}>
                            <Icon icon="lucide:settings" className="mr-2 h-4 w-4" />
                            <span>Setting</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50" onClick={handleLogout}>
                            <Icon icon="lucide:log-out" className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="shrink-0">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Kartu Anak</h3>
                {featuredChild ? (
                    <ChildProfileCard child={featuredChild} />
                ) : (
                    <div className="bg-blue-50 rounded-[30px] p-8 text-center border border-blue-100 border-dashed">
                        <p className="text-blue-600 font-medium">Belum ada data anak</p>
                    </div>
                )}
            </div>

            {/* Calendar with Schedule Integration */}
            <div>
                <Calendar />
            </div>
        </div>
    );

}
