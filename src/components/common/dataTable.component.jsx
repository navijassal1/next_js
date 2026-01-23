"use client";

import Link from "next/link";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { ROLES, CAN_ACTION, CAN_RESOURCE, SORT_ORDER } from "@/enums/enums";

export default function DataTable({
    can,
    columns,
    data = [],
    meta,
    sortConfig,
    onMetaChange,
}) {
    const isActive = (col, order) =>
        sortConfig.column === col && sortConfig.order === order;

    return (
        <table className="min-w-full text-sm text-left border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">

            {/* =================== HEADER =================== */}
            <thead className="bg-slate-100 dark:bg-slate-700 text-xs uppercase">
                <tr>
                    {columns.map((col) => (
                        <th key={col.key} className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                                <span>{col.label}</span>
                                {col.label !== 'ROLE' && (
                                    <div className="flex flex-col ml-1">
                                        <ChevronUpIcon
                                            onClick={() =>
                                                onMetaChange({ column: col.key, order: SORT_ORDER.ASC, page: 1 })
                                            }
                                            className={`w-4 h-4 cursor-pointer ${isActive(col.key, "asc") ? "text-indigo-600" : "text-slate-300"}`}
                                        />
                                        <ChevronDownIcon
                                            onClick={() =>
                                                onMetaChange({ column: col.key, order: SORT_ORDER.DESC, page: 1 })
                                            }
                                            className={`w-4 h-4 cursor-pointer ${isActive(col.key, "desc") ? "text-indigo-600" : "text-slate-300"}`}
                                        />
                                    </div>
                                )}
                            </div>
                        </th>
                    ))}
                    <th className="px-4 py-3 text-center">Actions</th>
                </tr>
            </thead>

            {/* =================== BODY =================== */}
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-slate-500">
                            No data available
                        </td>
                    </tr>
                ) : (
                    data.map((row, index) => (
                        <tr
                            key={index}
                            className={`transition ${index % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-slate-50 dark:bg-slate-900"} hover:bg-indigo-50 dark:hover:bg-slate-700`}
                        >
                            {columns.map((col) => (
                                <td key={col.key} className="px-4 py-3">
                                    {row[col.key]}
                                </td>
                            ))}

                            {/* Role Badge */}
                            {row.roles && (
                                <td className="px-4 py-3">
                                    <div className="flex flex-wrap gap-1">
                                        {row.roles.map((role) => (
                                            <span
                                                key={role}
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                          ${role === ROLES.SUPER_ADMIN
                                                        ? "bg-red-100 text-red-600"
                                                        : role === ROLES.ADMIN
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : role === ROLES.VENDOR
                                                                ? "bg-green-100 text-green-600"
                                                                : "bg-blue-100 text-blue-600"
                                                    }`}
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            )}

                            {/* Actions */}
                            <td className="px-4 py-3">
                                <div className="flex justify-center gap-2 flex-wrap">
                                    {can(CAN_RESOURCE.USER, CAN_ACTION.READ) && (
                                        <Link
                                            href={`/dashboard/users/${row.id}/details`}
                                            className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition"
                                        >
                                            View
                                        </Link>
                                    )}
                                    {can(CAN_RESOURCE.USER, CAN_ACTION.UPDATE) && (
                                        <Link
                                            href={`/dashboard/users/${row.id}/permissions`}
                                            className="px-3 py-1.5 text-xs font-medium rounded-md bg-amber-500 hover:bg-amber-600 text-white transition"
                                        >
                                            Edit
                                        </Link>
                                    )}
                                    {can(CAN_RESOURCE.USER, CAN_ACTION.DELETE) && (
                                        <Link
                                            href={`/dashboard/users/${row.id}/permissions`}
                                            className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-500 hover:bg-red-600 text-white transition"
                                        >
                                            Delete
                                        </Link>
                                    )}
                                    {can(CAN_RESOURCE.SYSTEM, CAN_ACTION.READ) && (
                                        <Link
                                            href={`/dashboard/users/${row.id}/permissions`}
                                            className="px-3 py-1.5 text-xs font-medium rounded-md bg-emerald-500 hover:bg-emerald-600 text-white transition"
                                        >
                                            Permissions
                                        </Link>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>

            {/* =================== FOOTER =================== */}
            {meta && (
                <tfoot>
                    <tr>
                        <td colSpan={columns.length + 1} className="px-4 py-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">

                                <span className="text-sm">
                                    Total: <strong>{meta.total_records}</strong>
                                </span>

                                <select
                                    value={sortConfig.limit}
                                    onChange={(e) =>
                                        onMetaChange({ limit: Number(e.target.value), page: 1 })
                                    }
                                    className="px-3 py-2 border rounded-md dark:bg-slate-700"
                                >
                                    {[5, 10, 20, 50].map((v) => (
                                        <option key={v} value={v}>
                                            {v} / page
                                        </option>
                                    ))}
                                </select>

                                <div className="flex items-center gap-3">
                                    <button
                                        disabled={meta.current === 1}
                                        onClick={() => onMetaChange({ page: meta.current - 1 })}
                                        className="btn-secondary hover:cursor-pointer"
                                    >
                                        ← Prev
                                    </button>

                                    <span className="text-sm">
                                        Page <strong>{meta.current}</strong> of{" "}
                                        <strong>{meta.total_pages}</strong>
                                    </span>

                                    <button
                                        disabled={meta.current === meta.total_pages}
                                        onClick={() => onMetaChange({ page: meta.current + 1 })}
                                        className="btn-secondary hover:cursor-pointer"
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            )}
        </table>
    );
}
