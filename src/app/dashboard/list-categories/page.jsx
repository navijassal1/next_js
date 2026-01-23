"use client";

import { useUserContext } from "@/context/user-context";
import { useAdminContext } from "@/context/admin-context";
import {  useRef, useState } from "react";
import DataTable from "@/components/common/dataTable.component";

export default function ListUsers() {
  const {
    listUsers,
    listRoles,
  } = useAdminContext();

  const { can } = useUserContext();

  // const [roleValue, setRoleValue] = useState("ALL");
  const timeoutRef = useRef(null)
  // ✅ SINGLE source of truth
  const [sortConfig, setSortConfig] = useState({
    column: "id",
    order: "asc",
    page: 1,
    limit: 10,
    role: 'ALL',
    search: ''
  });

  const columns = [
        { key: "id", label: "ID" },
        { key: "user_id", label: "USER ID" },
        { key: "category_name", label: "CATEGORY NAME" }
    ];
const data=[
    {id:1,user_id:2,category_name:'electronics'},
    {id:1,user_id:2,category_name:'electronics'},
    {id:1,user_id:2,category_name:'electronics'},
    {id:1,user_id:2,category_name:'electronics'},
    {id:1,user_id:2,category_name:'electronics'}
]
  // ✅ ONE handler for sort / pagination / limit
  const handleTableChange = (changes) => {
    const newConfig = { ...sortConfig, ...changes };
    setSortConfig(newConfig);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">

      {/* ================= TOOLBAR ================= */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 border-b">

        {/* Search (optional later) */}
        <input
          type="search"
          placeholder="Search users..."
          
          onChange={(e) => {
            const value = e.target.value.trim();

            // Clear the previous timer
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }

            // Set a new timer
            timeoutRef.current = setTimeout(() => {
              // console.log(value); // This is your "debounced" search
              const resetConfig = { search: value, page: 1 };
              handleTableChange(resetConfig);
            }, 1000); // 1000ms = 1s
          }}
          className="w-full md:w-72 px-4 py-2 rounded-lg border dark:bg-slate-700"
        />

        {/* Role filter */}
        <select
          className="w-full md:w-48 px-4 py-2 rounded-lg border dark:bg-slate-700"
          value={sortConfig.role}
          onChange={(e) => {
            // console.log(e.target.value)
            const resetConfig = { role: e.target.value, page: 1 };
            handleTableChange(resetConfig);
          }}
        >
          <option value="ALL">All Roles</option>
          {listRoles.map((r) => (
            r.name !== 'SUPER_ADMIN' &&
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
      </div>  

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <DataTable
          can={can}
          columns={columns}
          data={data || []}
          meta={listUsers.data_details}
          sortConfig={sortConfig}
          onMetaChange={handleTableChange}
        />
      </div>
    </div>
  );
}
