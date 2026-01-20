"use client";

import { useContext, useEffect, useState } from "react";
import { userContext } from "@/context/user-context";
import Header from "@/components/common/Header.component";
import Sidebar from "@/components/admin/Sidebar.component";
import Footer from "@/components/common/footer.component";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axiosInstance";

export default function DashboardLayout({ children }) {

  const { user, setUser } = useContext(userContext);
  const router = useRouter()
    const [loading, setLoading] = useState(true);

    const fetchUserDetails = async () => {
        try {
            const res = await axiosInstance.get("/api/users/user-role"); //fetch user details
            console.log(res.data.data)
            if (res.status === 200) {
                setUser(res.data.data);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500 text-lg">Loading profile...</p>
            </div>
        );
    }
    // console.log(user,'user in admin layout')
  // 🔒 Admin-only layout guard
  if (!user?.roles?.some((r) => ["ADMIN", "SUPER_ADMIN","VENDOR"].includes(r))) {
    return <p>Access denied</p>;
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

      <Footer />
    </div>
  );
}
