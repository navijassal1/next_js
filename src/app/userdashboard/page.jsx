"use client"

import { useContext  } from "react";
import { userContext } from "@/context/user-context";


export default function UserDashboard() {
  const { user } = useContext(userContext);

  return (
    <div className="min-h-screen min-w-screen bg-slate-50 dark:bg-slate-900">
      {/* Dashboard Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
          Welcome, {user?.first_name}!
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Manage your profile and account settings below.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

        {/* View Profile */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl uppercase mb-4">
            {user?.first_name?.[0]}
            {user?.last_name?.[0]}
          </div>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
            View Profile
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            See your full profile details
          </p>
        </div>

        {/* Edit Profile */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <svg
            className="w-10 h-10 mb-4 text-indigo-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20h9"
            />
          </svg>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
            Edit Profile
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Update your name, email or avatar
          </p>
        </div>

        {/* Change Password */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
                                                                                     <svg
            className="w-10 h-10 mb-4 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c1.38 0 2.5-1.12 2.5-2.5S13.38 6 12 6s-2.5 1.12-2.5 2.5S10.62 11 12 11zM12 13v6"
            />
          </svg>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
            Change Password
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Secure your account by updating password
          </p>
        </div>

        {/* Account Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <svg
            className="w-10 h-10 mb-4 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
            Account Settings
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Manage your notifications and preferences
          </p>
        </div>
      </div>
    </div>
  );
}
