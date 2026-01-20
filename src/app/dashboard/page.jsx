"use client";

import { userContext } from "@/context/user-context";
import Link from "next/link";
import { useContext, useEffect } from "react";


export default function Dashboard() {
    const {  handleListUsers ,listUsers} = useContext(userContext)
    useEffect(()=>{
        handleListUsers()
    },[])
    return (
        <div className="flex flex-col min-h-screen bg-linear-to-br bg-slate-900 p-8">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                    Welcome Back!
                </h1>
                <p className="text-white text-lg">
                    Here's an overview of your dashboard.
                </p>
            </header>

            {/* Cards / Overview Section */}
            <div className="grid grid-cols-1 gap-6 mb-8">
                {/* Users Card */}
                <div className="bg-slate-800 shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow">
                    <h2 className="text-lg font-semibold text-white mb-2">Total Users</h2>
                    <p className="text-3xl font-bold text-indigo-500">{listUsers.length}</p>
                    <p className="text-sm text-indigo-400 mt-1">Users in the system</p>
                </div>
               
            </div>

            {/* Welcome Illustration / Call-to-Action */}
        
                <div className="flex flex-col md:flex-row items-center justify-between bg-indigo-50 rounded-xl p-6 shadow-md">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                            Ready to manage your users?
                        </h2>
                        <p className="text-indigo-500 mb-4">
                            You can add new users, manage roles, and assign permissions with ease.
                        </p>
                        <Link
                        href={'/dashboard/users/list-users'} className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
                            Go to Users
                        </Link>
                    </div>
                    
                </div>
            
        </div>
    );
}
