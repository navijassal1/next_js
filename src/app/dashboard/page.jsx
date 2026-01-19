"use client"

import { useContext, useEffect, useState } from "react";
import { userContext } from "@/context/user-context";
import { axiosInstance } from "@/utils/axiosInstance";
import Header from "../components/Header.component";
import Sidebar from "../components/Sidebar.component";
import UserDashboard from "../components/userDashboard.component";
import Footer from "../components/footer.component";

export default function Dashboard() {
    const { user, setUser } = useContext(userContext);
    const [loading, setLoading] = useState(true);

    const fetchUserDetails = async () => {
        try {
            const res = await axiosInstance.get("/api/users/user-role");
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

    return (
        <div className="flex flex-col h-screen w-screen bg-amber-500">
            <Header />
            {/* Use flex-grow and flex container for sidebar + main */}
            <div className="flex grow min-h-0">

                {!user.roles.includes("USER") && <Sidebar />}
                {user.roles.includes("USER") && <UserDashboard />}

            </div>

            <Footer />
        </div>
    );
}
