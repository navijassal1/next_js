"use client"

import { userContext } from "@/context/user-context";
import { adminContext } from "@/context/admin-context";
import Link from "next/link";
import { Suspense, useContext, useEffect, useState } from "react";
import { ROLES, CAN_ACTION, CAN_RESOURCE } from "@/enums/enums"
import DataTable from "@/components/common/dataTable.component";

export default function ListUsers() {
    const [roleValue, setRoleValue] = useState('ALL')
    const { can } = useContext(userContext);
    const {
        listUsers,
        listRoles,
        handleListRoles,
        fetchListUsersViaRole,
        loading

    } = useContext(adminContext);

    useEffect(() => {
        fetchListUsersViaRole()
        handleListRoles()
    }, [])
    // console.log(listUsers, 'listUsers ')
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

                        onChange={(e) => {
                            const role = e.target.value
                            setRoleValue(role)


                            console.log(roleValue, 'in else', role)
                            fetchListUsersViaRole(role, 1)

                        }}
                    >
                        <option value="ALL">All Roles</option>
                        {listRoles.map(r => <option key={r.id} value={`${r.name}`} >{r.name}</option>)}

                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <Suspense fallback={loading}> 

                <DataTable {...{
                    can,
                    listUsers,
                    listRoles,
                    handleListRoles,
                    fetchListUsersViaRole,
                    roleValue,
                    setRoleValue
                    }} />
                    </Suspense>
            </div>
        </div>
    )
}
