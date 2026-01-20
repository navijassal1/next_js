"use client";

import { UserProvider } from "@/context/user-context";
import { CategoryProvider } from "@/context/category-context";
import { AdminProvider } from "@/context/admin-context";

export default function Providers({ children }) {
    return (
        <AdminProvider>
            <UserProvider>
                <CategoryProvider>

                    {children}
                </CategoryProvider>
            </UserProvider>
        </AdminProvider>
    )
}


