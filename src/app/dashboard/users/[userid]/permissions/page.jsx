"use client";

import { adminContext } from "@/context/admin-context";
import { userContext } from "@/context/user-context";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";

export default function UserPermissions() {
    const { userid } = useParams();
    const { buttonClasses } = useContext(userContext)
    const {
        listPermissions,
        userPermissions,
        updateUserPermissions,
        toggleCheckboxValue,
        handleListPermissions,
        fetchUsersWithPermissions,
    } = useContext(adminContext);

    useEffect(() => {
        handleListPermissions();
        fetchUsersWithPermissions(userid);
    }, [userid]);

    const matrix = Object.values(
        listPermissions.reduce((acc, { id, resource, action }) => {
            if (!acc[resource]) {
                acc[resource] = {
                    resource,
                    actions: []
                };
            }

            acc[resource].actions.push({ id, action });
            return acc;
        }, {})
    );

    // console.log(userPermissions, 'userPermissions')
    // console.log(listPermissions, 'listPermissions')
    // console.log(matrix, 'matrix')


    return (
        <section className="space-y-6 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        User Permissions
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Manage access and actions for this user
                    </p>
                </div>
                <button
                    className={`${buttonClasses} bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition`}
                    onClick={() => updateUserPermissions(userid)}
                >
                    Submit
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    {/* Table Head */}
                    <thead className="bg-slate-100 dark:bg-slate-700 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-200">
                                #
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-200">
                                Resource
                            </th>
                            {matrix[0]?.actions.map(a => (
                                <th
                                    key={a.id}
                                    className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-200"
                                >
                                    {a.action}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {matrix.map((permission, index) => (
                            <tr
                                key={permission.resource}
                                className={`transition-colors hover:bg-indigo-50 dark:hover:bg-slate-700 ${index % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-slate-50 dark:bg-slate-900"
                                    }`}
                            >
                                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200">
                                    {permission.resource}
                                </td>

                                {permission.actions.map(action => (
                                    <td key={action.id} className="px-6 py-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={userPermissions.some(up => up.permission?.id === action.id)}
                                            onChange={() => toggleCheckboxValue(action.id)}
                                            className="h-5 w-5 cursor-pointer rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 dark:focus:ring-offset-slate-800"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

    );
}
