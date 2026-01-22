"use client"

import Link from "next/link";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

import { ROLES, CAN_ACTION, CAN_RESOURCE } from "@/enums/enums"

export default function DataTable({
    can,
    listUsers,
    roleValue,
    fetchListUsersViaRole,
}) {
    console.log(listUsers, 'in datatable')
    return (
        <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 uppercase tracking-wide">
                <tr>
                    <th className="px-6 py-3">
                        <ChevronUpIcon className="w-4 h-4 text-slate-600 hover:text-black cursor-pointer" />

                        ID
                        <ChevronDownIcon className="w-4 h-4 text-slate-600 hover:text-black cursor-pointer" />  </th>
                    <th className="px-6 py-3">
                        First Name
                        <ChevronUpIcon className="w-4 h-4 text-slate-600 hover:text-black cursor-pointer" />

                        ID
                        <ChevronDownIcon className="w-4 h-4 text-slate-600 hover:text-black cursor-pointer" />
                    </th>
                    <th className="px-6 py-3">
                        Last Name
                    </th>
                    <th className="px-6 py-3">
                        Username
                    </th>
                    <th className="px-6 py-3">
                        Email
                    </th>
                    <th className="px-6 py-3">
                        Role
                    </th>
                    <th className="px-6 py-3 text-center">
                        Actions
                    </th>
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {listUsers.users.length === 0 ? (
                    <tr>
                        <td
                            colSpan={7}
                            className="px-6 py-4 text-center text-slate-500 dark:text-slate-400"
                        >
                            No data available
                        </td>
                    </tr>
                ) : listUsers.users.map((user, index) => (
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
                      ${user.roles.includes(ROLES.SUPER_ADMIN)
                                        ? "bg-red-100 text-red-600"
                                        : user.roles.includes(ROLES.ADMIN)
                                            ? "bg-yellow-100 text-yellow-700"
                                            : user.roles.includes(ROLES.VENDOR)
                                                ? "bg-green-100 text-green-600"
                                                : "bg-blue-100 text-blue-600"

                                    }`}
                            >
                                {user.roles.includes(ROLES.SUPER_ADMIN)
                                    ? "SUPERADMIN"
                                    : user.roles.includes(ROLES.ADMIN)
                                        ? "ADMIN"
                                        : user.roles.includes(ROLES.VENDOR)
                                            ? "VENDOR"
                                            : "USER"
                                }
                            </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                            <div className="flex justify-center gap-2">
                                {can(CAN_RESOURCE.USER, CAN_ACTION.READ) && (
                                    <button className="px-3 py-1 text-xs rounded bg-blue-500 hover:bg-blue-600 text-white">
                                        View
                                    </button>
                                )}

                                {can(CAN_RESOURCE.USER, CAN_ACTION.UPDATE) && (
                                    <button className="px-3 py-1 text-xs rounded bg-amber-500 hover:bg-amber-600 text-white">
                                        Edit
                                    </button>
                                )}
                                {can(CAN_RESOURCE.USER, CAN_ACTION.DELETE) && (
                                    <button className="px-3 py-1 text-xs rounded bg-red-500 hover:bg-red-600 text-white">
                                        Delete
                                    </button>
                                )}

                                {can(CAN_RESOURCE.SYSTEM, CAN_ACTION.READ) && (
                                    <Link
                                        className="px-3 py-1 text-xs rounded bg-green-500 hover:bg-green-600 text-white "
                                        href={`/dashboard/users/${user.id}/permissions`}>
                                        permissions
                                    </Link>
                                )}

                            </div>
                        </td>

                    </tr>
                ))}
            </tbody>
            <tfoot>
                {listUsers.users.length !== 0 && (
                    <tr>
                        <td colSpan={7} className="px-6 py-4">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                    Total Records <strong>{listUsers.data_details.total_data}</strong>
                                </span>
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                    Page <strong>{listUsers.data_details.current}</strong> of{" "}
                                    <strong>{listUsers.data_details.total_pages}</strong>
                                </span>

                                <div className="flex items-center gap-2">
                                    <button
                                        disabled={listUsers.data_details.current === 1}
                                        onClick={() => {
                                            console.log(roleValue, 'role value')

                                            fetchListUsersViaRole(roleValue, listUsers.data_details.current - 1)
                                        }
                                        }
                                        className="px-3 py-1.5 text-sm rounded-md border transition
                border-slate-300 dark:border-slate-700
                text-slate-700 dark:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-800
                disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        ← Prev
                                    </button>

                                    <span className="px-3 py-1.5 text-sm rounded-md bg-slate-100 dark:bg-slate-800
                             text-slate-700 dark:text-slate-200">
                                        {listUsers.data_details.from} – {listUsers.data_details.to}
                                    </span>

                                    <button
                                        disabled={
                                            listUsers.data_details.current ===
                                            listUsers.data_details.total_pages
                                        }
                                        onClick={() => {
                                            console.log(roleValue, 'role value')

                                            fetchListUsersViaRole(roleValue, listUsers.data_details.current + 1)
                                        }
                                        }
                                        className="px-3 py-1.5 text-sm rounded-md border transition
                border-slate-300 dark:border-slate-700
                text-slate-700 dark:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-800
                disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
            </tfoot>


        </table>
    )
}
