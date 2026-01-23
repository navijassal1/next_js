"use client";

export default function UserDetailsPage() {
  return (
    <section className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            User Details
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View and manage user information and permissions
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-2 rounded-lg font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition">
            Save Changes
          </button>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-2">
        <p>
          <strong>Name:</strong> John Doe
        </p>
        <p>
          <strong>Email:</strong> john.doe@example.com
        </p>
        <p>
          <strong>Role:</strong> Admin
        </p>
      </div>

      {/* Permissions Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-100 dark:bg-slate-700 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-200">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-200">
                Resource
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-200">
                View
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-200">
                Edit
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-200">
                Delete
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-200">
                All
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {/* Row 1 */}
            <tr className="transition-colors hover:bg-indigo-50 dark:hover:bg-slate-700 bg-white dark:bg-slate-800">
              <td className="px-6 py-4 text-slate-700 dark:text-slate-200">1</td>
              <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200">Users</td>
              <td className="px-6 py-4 text-center">
                <input type="checkbox" checked readOnly className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600" />
              </td>
              <td className="px-6 py-4 text-center">
                <input type="checkbox" checked readOnly className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600" />
              </td>
              <td className="px-6 py-4 text-center">
                <input type="checkbox" checked readOnly className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600" />
              </td>
              <td className="px-6 py-4 text-center">
                <button className="px-4 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition">
                  Select All
                </button>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="transition-colors hover:bg-indigo-50 dark:hover:bg-slate-700 bg-slate-50 dark:bg-slate-900">
              <td className="px-6 py-4 text-slate-700 dark:text-slate-200">2</td>
              <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200">Posts</td>
              <td className="px-6 py-4 text-center">
                <input type="checkbox" checked readOnly className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600" />
              </td>
              <td className="px-6 py-4 text-center">
                <input type="checkbox" readOnly className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600" />
              </td>
              <td className="px-6 py-4 text-center">
                <input type="checkbox" readOnly className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600" />
              </td>
              <td className="px-6 py-4 text-center">
                <button className="px-4 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition">
                  Select All
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
