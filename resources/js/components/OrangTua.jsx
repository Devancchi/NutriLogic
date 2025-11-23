import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarOrangTua from "./sidebars/SidebarOrangTua";
import DashboardOrangTuaContent from "./konten/DashboardOrangTua";

export default function OrangTua() {
  return (
    <div className="flex flex-col md:flex-row bg-white w-full h-screen overflow-hidden">
      <SidebarOrangTua />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<DashboardOrangTuaContent />} />
          <Route path="anak" element={<DataAnakPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="riwayat" element={<RiwayatPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

// Placeholder pages - akan diganti dengan komponen sebenarnya nanti
const DataAnakPage = () => (
  <div className="p-4 md:p-10 w-full h-full bg-gray-50">
    <h1 className="text-3xl font-bold text-gray-800">Data Anak</h1>
    <p className="text-gray-600 mt-2">Halaman data anak</p>
  </div>
);

const ProfilePage = () => (
  <div className="p-4 md:p-10 w-full h-full bg-gray-50">
    <h1 className="text-3xl font-bold text-gray-800">Profil</h1>
    <p className="text-gray-600 mt-2">Halaman profil orang tua</p>
  </div>
);

const RiwayatPage = () => (
  <div className="p-4 md:p-10 w-full h-full bg-gray-50">
    <h1 className="text-3xl font-bold text-gray-800">Riwayat</h1>
    <p className="text-gray-600 mt-2">Halaman riwayat kunjungan</p>
  </div>
);

const SettingsPage = () => (
  <div className="p-4 md:p-10 w-full h-full bg-gray-50">
    <h1 className="text-3xl font-bold text-gray-800">Pengaturan</h1>
    <p className="text-gray-600 mt-2">Halaman pengaturan</p>
  </div>
);
