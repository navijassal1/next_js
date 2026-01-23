"use client";

import { useAdminContext } from "@/context/admin-context";
import { useUserContext } from "@/context/user-context";
import { CAN_ACTION, CAN_RESOURCE } from "@/enums/enums";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function UserPermissions() {

    const { userid } = useParams();
    const { buttonClasses, can } = useUserContext()
    const {
        listPermissions,
        userPermissions,
        updateUserPermissions,
        toggleCheckboxValue,
        handleListPermissions,
        fetchUsersWithPermissions,
        SelectAllResourceValue
    } = useAdminContext();

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

    console.log(userPermissions, 'userPermissions in permission')
    // console.log(listPermissions, 'listPermissions in permission')
    // console.log(matrix, 'matrix')
    function isAllSelected(resource) {
        const resourcePermissions = listPermissions.filter(
            p => p.resource === resource
        )

        if (resourcePermissions.length === 0) return false

        return resourcePermissions.every(p =>
            userPermissions.some(up => up.id === p.id)
        )
    }
    return (
        <section className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Title */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        User Permissions
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Manage access and actions for this user
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    {can(CAN_RESOURCE.SYSTEM, CAN_ACTION.UPDATE) &&
                        <button
                            onClick={() => updateUserPermissions(userid)}
                            className={`
                            ${buttonClasses}
                            px-6 py-2
                            rounded-lg
                            font-semibold
                            bg-emerald-600
                            text-white
                            hover:bg-emerald-700
                            shadow-md
                            transition
      `}
                        >
                            Submit
                        </button>
                    }
                </div>
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
                            {can(CAN_RESOURCE.SYSTEM, CAN_ACTION.UPDATE) &&
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-200">
                                    All
                                </th>
                            }
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {matrix.map((permission, index) => {
                            const allSelected = isAllSelected(permission.resource)

                            return (
                                <tr
                                    key={permission.resource}
                                    className={`transition-colors hover:bg-indigo-50 dark:hover:bg-slate-700 ${index % 2 === 0
                                        ? "bg-white dark:bg-slate-800"
                                        : "bg-slate-50 dark:bg-slate-900"
                                        }`}
                                >
                                    {/* Index */}
                                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                                        {index + 1}
                                    </td>

                                    {/* Resource */}
                                    <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200">
                                        {permission.resource}
                                    </td>

                                    {/* Actions (checkboxes) */}

                                    {can(CAN_RESOURCE.SYSTEM, CAN_ACTION.UPDATE) ?
                                        (
                                            permission.actions.map(action => (
                                                <td key={action.id} className="px-6 py-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={userPermissions.some(up => up.id === action.id)}
                                                        onChange={() => toggleCheckboxValue(action.id)}
                                                        className="h-5 w-5 cursor-pointer rounded
                                                border-slate-300 dark:border-slate-600
                                                text-indigo-600
                                                focus:ring-2 focus:ring-indigo-500
                                                focus:ring-offset-0 dark:focus:ring-offset-slate-800"
                                                    />
                                                </td>
                                            ))
                                        )
                                        :
                                        (
                                            permission.actions.map(action => (
                                                <td key={action.id} className="px-6 py-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={userPermissions.some(up => up.id === action.id)}
                                                        readOnly
                                                        className="h-5 w-5 cursor-pointer rounded
                                                border-slate-300 dark:border-slate-600
                                                text-indigo-600
                                                focus:ring-2 focus:ring-indigo-500
                                                focus:ring-offset-0 dark:focus:ring-offset-slate-800"
                                                    />
                                                </td>
                                            ))
                                        )
                                    }

                                    {/* Select All (per resource) */}

                                    {can(CAN_RESOURCE.SYSTEM, CAN_ACTION.UPDATE) &&
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => SelectAllResourceValue(permission.resource)}
                                                className={`
                                                ${buttonClasses}
                                                px-4 py-2
                                                rounded-lg
                                                font-medium
                                                transition
                                                ${allSelected
                                                        ? "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                                    }
                                                    `}
                                            >
                                                {allSelected ? "Deselect All" : "Select All"}
                                            </button>
                                        </td>
                                    }
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
        </section >

    );
}
