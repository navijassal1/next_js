export default function CreateUser() {
  return (
    <section className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          Create User
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          A temporary password will be assigned. The user must change it after login.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
        <form className="p-8 space-y-10">
          {/* User Details */}
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
              User Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600
                             bg-white dark:bg-slate-900 px-4 py-2.5 text-sm
                             text-slate-700 dark:text-slate-100
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600
                             bg-white dark:bg-slate-900 px-4 py-2.5 text-sm
                             text-slate-700 dark:text-slate-100
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600
                             bg-white dark:bg-slate-900 px-4 py-2.5 text-sm
                             text-slate-700 dark:text-slate-100
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Role */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Role
                </label>
                <select
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600
                             bg-white dark:bg-slate-900 px-4 py-2.5 text-sm
                             text-slate-700 dark:text-slate-100
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>User</option>
                  <option>Vendor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Temporary Password */}
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
              Temporary Password
            </h2>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Password
              </label>
              <input
                type="password"
                placeholder="Temporary password"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600
                           bg-white dark:bg-slate-900 px-4 py-2.5 text-sm
                           text-slate-700 dark:text-slate-100
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                User will be required to change this password after first login.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              className="px-5 py-2.5 rounded-lg text-sm font-medium
                         text-slate-600 dark:text-slate-300
                         hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg text-sm font-medium
                         bg-indigo-600 text-white
                         hover:bg-indigo-700 transition
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
