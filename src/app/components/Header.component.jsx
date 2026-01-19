import { userContext } from "@/context/user-context";
import { useContext } from "react";

export default function Header() {
  const { user, handleLogout } = useContext(userContext);

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Insta
          <span className="text-indigo-600 dark:text-indigo-400">Clone</span>
        </h1>

        {/* User Info */}
        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold uppercase">
            {user?.first_name?.[0]}
            {user?.last_name?.[0]}
          </div>
          {/* username */}
          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              {user.first_name} {user.last_name}
            </span>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}
