import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  Home,
  User,
  Settings,
  FileText,
  Baby,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Dashboard_orang_tua() {
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
      href: "/dashboard/anak",
      icon: (
        <Baby className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
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
      label: "Riwayat",
      href: "/dashboard/riwayat",
      icon: (
        <FileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
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
                label: "Orang Tua",
                href: "#",
                icon: (
                  <img
                    src="https://ui-avatars.com/api/?name=Orang+Tua&background=00BFEF&color=fff"
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
      className="font-normal flex flex-col space-y-1 items-start text-sm text-white py-1 relative z-20"
    >
      <div className="flex space-x-2 items-center">
        <img src={assets.logo_das} alt="NutriLogic" className="h-8 w-8 shrink-0" />
        <span className="font-bold text-white whitespace-pre">
          NutriLogic
        </span>
      </div>
      <span className="text-xs text-gray-300 ml-10 -mt-3">
        Portal Orang Tua
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

// Dashboard content for Orang Tua
const DashboardContent = () => {
  return (
    <div className="flex flex-1 w-full h-full overflow-auto">
      <div className="p-4 md:p-10 w-full h-full bg-gray-50 flex flex-col gap-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Orang Tua
          </h1>
          <p className="text-gray-600 mt-2">
            Selamat datang! Pantau perkembangan kesehatan buah hati Anda.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Jumlah Anak", value: "2", color: "bg-blue-500" },
            { title: "Status Gizi", value: "Baik", color: "bg-green-500" },
            { title: "Kunjungan Bulan Ini", value: "3", color: "bg-purple-500" }
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
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Grafik Pertumbuhan Anak</h2>
            <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Jadwal Posyandu</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Kunjungan Posyandu</div>
                    <div className="text-sm text-gray-500">Minggu ke-{i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
