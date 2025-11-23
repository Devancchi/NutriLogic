import React from "react";
import OrangTua from "./OrangTua";
import Kader from "./Kader";

export default function Dashboard() {
  // TODO: Get user role from authentication/context/localStorage
  const userRole = 'Orang Tua'; // This should come from auth context
  
  // Render component based on role without redirect
  if (userRole === 'Kader') {
    return <Kader />;
  }
  
  return <OrangTua />;
}
