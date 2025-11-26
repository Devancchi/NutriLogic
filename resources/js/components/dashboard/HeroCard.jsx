import React from 'react';

export default function HeroCard({ userName }) {
    return (
        <div className="relative w-full rounded-[24px] md:rounded-[30px] overflow-hidden bg-gradient-to-r from-[#4481EB] to-[#04BEFE] shadow-lg shadow-blue-200/50 p-6 md:p-10 text-white">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                    <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">
                        Selamat Datang, <br /> {userName}!
                    </h2>
                    <p className="text-blue-50 text-lg mb-8 max-w-md">
                        Pantau tumbuh kembang buah hati Anda dengan mudah dan akurat bersama NutriLogic.
                    </p>

                    <button className="bg-white text-[#4481EB] px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                        Lihat Detail
                    </button>
                </div>

                {/* Illustration Placeholder - Can be replaced with an actual image */}
                <div className="hidden md:block relative w-64 h-48">
                    {/* Simple CSS illustration representing the phone/dashboard in the design */}
                    <div className="absolute right-4 bottom-0 w-32 h-48 bg-white/20 backdrop-blur-md rounded-t-3xl border-t border-l border-r border-white/30 transform rotate-[-5deg] translate-x-4"></div>
                    <div className="absolute right-12 bottom-0 w-32 h-56 bg-white rounded-t-3xl shadow-2xl transform rotate-[5deg] flex flex-col items-center p-3">
                        <div className="w-8 h-1 bg-gray-200 rounded-full mb-4"></div>
                        <div className="w-full h-24 bg-blue-100 rounded-xl mb-2"></div>
                        <div className="w-full h-2 bg-gray-100 rounded-full mb-1"></div>
                        <div className="w-2/3 h-2 bg-gray-100 rounded-full self-start"></div>
                    </div>
                    {/* Floating elements */}
                    <div className="absolute top-10 right-0 w-12 h-12 bg-yellow-400 rounded-xl shadow-lg transform rotate-12 flex items-center justify-center text-2xl">👶</div>
                    <div className="absolute bottom-10 left-0 w-10 h-10 bg-green-400 rounded-xl shadow-lg transform -rotate-12 flex items-center justify-center text-xl">⚖️</div>
                </div>
            </div>
        </div>
    );
}
