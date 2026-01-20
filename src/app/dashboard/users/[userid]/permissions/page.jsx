"use client"

import { adminContext } from "@/context/admin-context";
import { userContext } from "@/context/user-context";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function UserPermissions({params}) {
    const { userId } = params;
    const { user } = useContext(userContext)
    const {
        listPermissions,
        handleListPermissions,
        fetchUsersWithPermissions
    } = useContext(adminContext);

    useEffect(() => {
        handleListPermissions()
        fetchUsersWithPermissions(userId)
    }, [])

    console.log(user, 'user in user permission')
    console.log(listPermissions, 'in user permission')

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            <div>welcome to permissions page </div>
            {/* Header / Toolbar */}
            {/* <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700"> */}

            {/* Left: Search + Filter */}
            {/* <div className="flex flex-col md:flex-row gap-3 w-full">
                    <input
                        type="search"
                        placeholder="Search users..."
                        className="w-full md:w-72 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                    />

                    <select
                        className="w-full md:w-48 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"

                        onChange={
                            (e) =>
                                e.target.value === "ALL" ? handleListUsers() :
                                    fetchUsersWithRoles(e.target.value)
                        }
                    >
                        <option value="ALL" >All Roles</option>
                        <option value="SUPER_ADMIN">Super Admin</option>
                        <option value="ADMIN">Admins</option>
                        <option value="USER" >Users</option>
                        <option value="VENDOR">Vendors</option>
                    </select>
                </div>
            </div> */}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 uppercase tracking-wide">
                        <tr>

                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Resource</th>
                            <th className="px-6 py-3">Actions</th>
                            <th className="px-6 py-3">have</th>
                            {/* <th className="px-6 py-3">Create</th>
                            <th className="px-6 py-3">Read</th>
                            <th className="px-6 py-3">Update</th>
                            <th className="px-6 py-3">Delete</th> */}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {listPermissions.map((permission, index) => (
                            // (permission.resource === "SYSTEM" &&
                            <tr
                                key={permission.id}
                                className={`hover:bg-indigo-50 dark:hover:bg-slate-700 transition ${index % 2 === 0
                                    ? "bg-white dark:bg-slate-800"
                                    : "bg-slate-50 dark:bg-slate-900"
                                    }`}
                            >
                                <td className="px-6 py-4 font-medium">{permission.id}</td>
                                <td className="px-6 py-4">{permission.resource}</td>
                                <td className="px-6 py-4">{permission.action}</td>

                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        value={permission.id}
                                        name="permissionid"
                                        id={permission.id}
                                        className="text-blue-500 size-5" 
                                        checked={user.permissions.some(up=>up.id === permission.id)}
                                        onChange={''}
                                        />
                                </td>
                            </tr>
                            // )
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
