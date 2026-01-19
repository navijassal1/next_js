"use client"

import { userContext } from "@/context/user-context";
import { useContext } from "react";

export default function ListUsers() {
    const { listUsers, buttonClasses, can } = useContext(userContext);
    // console.log(listUsers, 'in list users')
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">

            {/* Header / Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">

                {/* Left: Search + Filter */}
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <input
                        type="search"
                        placeholder="Search users..."
                        className="w-full md:w-72 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                    />

                    <select
                        className="w-full md:w-48 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                    >
                        <option value="">All Roles</option>
                        <option value="ADMIN">Admins</option>
                        <option value="USER">Users</option>
                        <option value="VENDOR">Vendors</option>
                    </select>
                </div>

                {/* Right: Create User Button */}

                {can("USER", "CREATE") && (
                    <button className={`${buttonClasses} bg-indigo-600 hover:bg-indigo-700`}>
                        + Create User
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 uppercase tracking-wide">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">First Name</th>
                            <th className="px-6 py-3">Last Name</th>
                            <th className="px-6 py-3">Username</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {listUsers.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`hover:bg-indigo-50 dark:hover:bg-slate-700 transition ${index % 2 === 0
                                    ? "bg-white dark:bg-slate-800"
                                    : "bg-slate-50 dark:bg-slate-900"
                                    }`}
                            >
                                <td className="px-6 py-4 font-medium">{user.id}</td>
                                <td className="px-6 py-4">{user.first_name}</td>
                                <td className="px-6 py-4">{user.last_name}</td>
                                <td className="px-6 py-4">{user.username}</td>
                                <td className="px-6 py-4">{user.email}</td>

                                {/* Role Badge */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${user.roles.includes("SUPER_ADMIN")
                                                ? "bg-red-100 text-red-600"
                                                : user.roles.includes("ADMIN")
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : user.roles.includes("VENDOR")
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-blue-100 text-blue-600"

                                            }`}
                                    >
                                        {user.roles}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        {can("USER", "READ") && (
                                            <button className="px-3 py-1 text-xs rounded bg-blue-500 hover:bg-blue-600 text-white">
                                                View
                                            </button>
                                        )}

                                        {can("USER", "UPDATE") && (
                                            <button className="px-3 py-1 text-xs rounded bg-amber-500 hover:bg-amber-600 text-white">
                                                Edit
                                            </button>
                                        )}
                                        {can("USER", "DELETE") && (
                                            <button className="px-3 py-1 text-xs rounded bg-red-500 hover:bg-red-600 text-white">
                                                Delete
                                            </button>
                                        )}

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
