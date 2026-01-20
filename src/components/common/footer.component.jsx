import { useContext } from "react";
import { userContext } from "@/context/user-context";

export default function Footer() {
  const { user } = useContext(userContext);

  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">

        {/* Branding */}
        <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          &copy; {new Date().getFullYear()} InstaClone
        </span>

        {/* Optional User Info */}
        {user && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs uppercase">
              {user.first_name?.[0]}
              {user.last_name?.[0]}
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              {user.first_name} {user.last_name}
            </span>
          </div>
        )}
      </div>
    </footer>
  );
}
