"use client"

import { userContext } from "@/context/user-context";
import Link from "next/link";
import { useContext } from "react";

export default function ListUsersBaseOnRoles() {
    const { listRoles,handleRoleWithUsers, buttonClasses, can } = useContext(userContext);
    console.log(listRoles, 'listRoles')
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">

            {/* Header / Toolbar*/}
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

            Table
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 uppercase tracking-wide">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Role Name</th>
                            <th className="px-6 py-3">Users</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {listRoles.map((role, index) => (
                            <tr
                                key={role.id}
                                className={`hover:bg-indigo-50 dark:hover:bg-slate-700 transition ${index % 2 === 0
                                    ? "bg-white dark:bg-slate-800"
                                    : "bg-slate-50 dark:bg-slate-900"
                                    }`}
                            >
                                <td className="px-6 py-4 font-medium">{role.id}</td>
                                <td className="px-6 py-4">{role.name}</td>
                                <td className="px-6 py-4">
                                    <button onClick={()=>{handleRoleWithUsers(role.name)}} >users</button>
                                    </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
