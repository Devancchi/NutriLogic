import React from "react";
import Dashboard_orang_tua from "./Dashboard_orang_tua";
import Dashboard_kader from "./Dashboard_kader";

export default function Dashboard() {
  // TODO: Get user role from authentication/context/localStorage
  const userRole = 'Orang Tua'; // This should come from auth context
  
  // Render component based on role without redirect
  if (userRole === 'Kader') {
    return <Dashboard_kader />;
  }
  
  return <Dashboard_orang_tua />;
}
