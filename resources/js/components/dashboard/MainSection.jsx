import React from 'react';
import HeroCard from './HeroCard';
import UnifiedStatsGroup from './UnifiedStatsGroup';


export default function MainSection({ user, summary }) {
    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-gray-500 text-xs md:text-sm font-medium">Dashboard Orang Tua</p>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Overview</h1>
                </div>

                {/* Mobile/Tablet Profile (Hidden on Desktop XL) */}
                <div className="flex items-center gap-3 xl:hidden">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role || 'Orang Tua'}</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <img
                            src={user?.profile_photo_url || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <HeroCard userName={user?.name || 'Parents'} />

            <UnifiedStatsGroup summary={summary} />

        </div>
    );
}
