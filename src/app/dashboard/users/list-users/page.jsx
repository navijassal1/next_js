"use client";

import { userContext } from "@/context/user-context";
import { adminContext } from "@/context/admin-context";
import { Suspense, useContext, useEffect, useState } from "react";
import DataTable from "@/components/common/dataTable.component";

export default function ListUsers() {
  const {
    listUsers,
    listRoles,
    handleListRoles,
    fetchListUsersViaRole,
    loading,
  } = useContext(adminContext);

  const { can } = useContext(userContext);

  const [roleValue, setRoleValue] = useState("ALL");

  // ✅ SINGLE source of truth
  const [sortConfig, setSortConfig] = useState({
    column: "id",
    order: "asc",
    page: 1,
    limit: 10,
  });

  const columns = ["ID", "FIRST_NAME", "LAST_NAME", "USERNAME", "EMAIL", "ROLE"];

  useEffect(() => {
    handleListRoles();
    fetchUsers();
  }, []);

  const fetchUsers = (config = sortConfig, role = roleValue) => {
    fetchListUsersViaRole(
      role,
      config.page,
      config.column,
      config.order,
      config.limit
    );
  };

  // ✅ ONE handler for sort / pagination / limit
  const handleTableChange = (changes) => {
    const newConfig = { ...sortConfig, ...changes };
    setSortConfig(newConfig);
    fetchUsers(newConfig);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">

      {/* ================= TOOLBAR ================= */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 border-b">

        {/* Search (optional later) */}
        <input
          type="search"
          placeholder="Search users..."
          className="w-full md:w-72 px-4 py-2 rounded-lg border dark:bg-slate-700"
        />

        {/* Role filter */}
        <select
          className="w-full md:w-48 px-4 py-2 rounded-lg border dark:bg-slate-700"
          value={roleValue}
          onChange={(e) => {
            const role = e.target.value;
            setRoleValue(role);

            const resetConfig = { ...sortConfig, page: 1 };
            setSortConfig(resetConfig);

            fetchUsers(resetConfig, role);
          }}
        >
          <option value="ALL">All Roles</option>
          {listRoles.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <Suspense fallback={loading}>
          <DataTable
            can={can}
            roleValue={roleValue}
            columns={columns}
            data={listUsers.users || []}
            meta={listUsers.data_details}
            sortConfig={sortConfig}
            onChange={handleTableChange}
          />
        </Suspense>
      </div>
    </div>
  );
}
