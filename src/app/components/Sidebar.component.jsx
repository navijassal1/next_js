import { userContext } from "@/context/user-context";
import { useContext, useEffect } from "react";

export default function Sidebar() {
    const { user } = useContext(userContext)
    useEffect(()=>{
        
    },[user])
    // Helper to check if user has a specific permission
    const can = (resource, action) =>
        user.permissions.some(p => p.resource === resource && p.action === action);
    return (
        <div className="h-100 w-100 grid grid-cols-1 justify-center items-center">
            {/* //  Show system management section if user can READ SYSTEM  */}
            {can("SYSTEM", "READ") && (
                <div className="bg-indigo-50 p-4 rounded-lg w-full max-w-md">
                    <h3 className="text-black font-semibold mb-2">System Management</h3>
                    {can("SYSTEM", "READ") && <button className="bg-green-500 text-white px-3 py-1 rounded">Read System</button>}
                    {can("SYSTEM", "CREATE") && <button className="bg-yellow-500 text-white px-3 py-1 rounded">Add System</button>}
                    {can("SYSTEM", "UPDATE") && <button className="bg-blue-500 text-white px-3 py-1 rounded ml-2">Update System</button>}
                    {can("SYSTEM", "DELETE") && <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete System</button>}
                </div>
            )}

            {/* Users section */}
            {can("USER", "READ") && (
                <div className="bg-indigo-50 p-4 rounded-lg w-full max-w-md">
                    <h3 className="text-black font-semibold mb-2">User Management</h3>
                    {can("USER", "READ") && <button className="bg-green-500 text-white px-3 py-1 rounded">Read User</button>}
                    {can("USER", "CREATE") && <button className="bg-yellow-500 text-white px-3 py-1 rounded">Add User</button>}
                    {can("USER", "UPDATE") && <button className="bg-blue-500 text-white px-3 py-1 rounded ml-2">Update User</button>}
                    {can("USER", "DELETE") && <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete User</button>}
                </div>
            )}

            {/* Categories section */}
            {can("CATEGORY", "READ") && (
                <div className="bg-indigo-50 p-4 rounded-lg w-full max-w-md">
                    <h3 className="text-black font-semibold mb-2">Category Management</h3>
                    {can("CATEGORY", "READ") && <button className="bg-green-500 text-white px-3 py-1 rounded">Read Category</button>}
                    {can("CATEGORY", "CREATE") && <button className="bg-yellow-500 text-white px-3 py-1 rounded">Add Category</button>}
                    {can("CATEGORY", "UPDATE") && <button className="bg-blue-500 text-white px-3 py-1 rounded ml-2">Update Category</button>}
                    {can("CATEGORY", "DELETE") && <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete Category</button>}
                </div>
            )}
        </div>
    )
}