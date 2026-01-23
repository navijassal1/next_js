"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/context/user-context";
import Header from "@/components/common/Header.component";
import Sidebar from "@/components/admin/Sidebar.component";
import { ROLES } from "@/enums/enums";


export default function DashboardLayout({ children }) {

  const { user ,loading, fetchUserDetails } = useUserContext();

  useEffect(() => {
    
      fetchUserDetails();
      
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <section className="flex flex-col h-screen w-screen">
          {/* Center spinner */}
          <main className="flex-1 py-6 px-4 overflow-auto bg-slate-900">

            <div className="flex justify-center pt-4">
              <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </main>
        </section>
      </>
    );
  }
  //   console.log(user,'user in admin layout')
  // 🔒 Admin-only layout guard
  if (!user?.roles?.some((r) => [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.VENDOR].includes(r))) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 text-lg">Access denied</p>
    </div>;
  }
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />

      <div className="flex flex-1 min-h-0">
        <Sidebar />

        <main className="flex-1 py-6 px-4 overflow-auto bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
}
