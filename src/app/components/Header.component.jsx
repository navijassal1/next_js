export default function Header() {
  return (
    <header className="w-full h-16 bg-indigo-700 text-white grid grid-cols-12 items-center px-6">
      {/* Logo */}
      <div className="col-span-2">
        <h1 className="text-xl font-bold">MyApp</h1>
      </div>
      {/* Navigation */}
      <nav className="col-span-8 flex justify-center space-x-6">
        <button>Dashboard</button>
        <button>Users</button>
        <button>Categories</button>
      </nav>
      {/* User Info / Logout */}
      <div className="col-span-2 flex justify-end items-center space-x-4">
        <div className="font-medium">John Doe</div>
        <button className="bg-red-500 px-3 py-1 rounded">Logout</button>
      </div>
    </header>
  );
}
