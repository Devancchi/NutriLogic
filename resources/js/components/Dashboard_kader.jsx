import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  Home,
  User,
  Settings,
  FileText,
  BarChart,
  Users,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Dashboard_kader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Data Anak",
      href: "/dashboard/data-anak",
      icon: (
        <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Input Data",
      href: "/dashboard/input-data",
      icon: (
        <ClipboardList className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Laporan",
      href: "/dashboard/reports",
      icon: (
        <FileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Statistik",
      href: "/dashboard/statistics",
      icon: (
        <BarChart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Profil",
      href: "/dashboard/profile",
      icon: (
        <User className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Pengaturan",
      href: "/dashboard/settings",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Keluar",
      href: "#",
      icon: (
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      onClick: () => {
        // TODO: Clear authentication/localStorage
        navigate("/");
      },
    },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-white w-full h-screen overflow-hidden">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Kader Posyandu",
                href: "#",
                icon: (
                  <img
                    src="https://ui-avatars.com/api/?name=Kader+Posyandu&background=667eea&color=fff"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <DashboardContent />
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="font-normal flex flex-col space-y-1 items-start text-sm text-black py-1 relative z-20"
    >
      <div className="flex space-x-2 items-center">
        <img src={assets.logo_das} alt="NutriLogic" className="h-8 w-8 shrink-0" />
        <span className="font-medium text-white whitespace-pre">
          NutriLogic
        </span>
      </div>
      <span className="text-xs text-gray-500 ml-10">
        Portal Kader
      </span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img src={assets.logo_das} alt="NutriLogic" className="h-8 w-8 shrink-0" />
    </a>
  );
};

// Dashboard content for Kader
const DashboardContent = () => {
  return (
    <div className="flex flex-1 w-full h-full overflow-auto">
      <div className="p-4 md:p-10 w-full h-full bg-gray-50 flex flex-col gap-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Kader
          </h1>
          <p className="text-gray-600 mt-2">
            Selamat datang Kader! Pantau perkembangan anak-anak di wilayah Anda.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Total Anak", value: "124", change: "+8", color: "bg-blue-500" },
            { title: "Stunting", value: "12", change: "-2", color: "bg-red-500" },
            { title: "Gizi Baik", value: "98", change: "+5", color: "bg-green-500" },
            { title: "Perlu Perhatian", value: "14", change: "+1", color: "bg-yellow-500" }
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-lg mb-4 flex items-center justify-center`}>
                <span className="text-white text-xl font-bold">{i + 1}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-2">{stat.change} dari bulan lalu</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistik Stunting</h2>
            <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h2>
            <div className="space-y-3">
              {[
                { name: "Ahmad Fauzi", action: "Data baru ditambahkan", time: "5 menit lalu" },
                { name: "Siti Aminah", action: "Pemeriksaan rutin", time: "15 menit lalu" },
                { name: "Budi Santoso", action: "Update status gizi", time: "1 jam lalu" },
                { name: "Rina Putri", action: "Imunisasi lengkap", time: "2 jam lalu" },
                { name: "Dodi Wijaya", action: "Konsultasi gizi", time: "3 jam lalu" }
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">{activity.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{activity.name}</div>
                    <div className="text-sm text-gray-500">{activity.action}</div>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
