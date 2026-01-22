"use client"

import { userContext } from "@/context/user-context";
import { useContext } from "react";
import Link from "next/link";
import { CAN_RESOURCE, CAN_ACTION } from "@/enums/enums"
import { adminContext } from "@/context/admin-context";

export default function Sidebar() {
    const {
        buttonClasses,
        can,
        sectionClasses,
    } = useContext(userContext);
    const {
        fetchListUsersViaRole,
    } = useContext(adminContext);
    return (
        <div className="h-full w-50 bg-amber-200 flex">
            <aside className="flex flex-col bg-slate-50 dark:bg-slate-900 h-full w-90 p-6 top-0 border-amber-100">
                <nav className="flex flex-col grow overflow-auto border-amber-50">
                    {can(CAN_RESOURCE.USER, CAN_ACTION.READ)
                        && (
                            <Link className={sectionClasses} href={'/dashboard/users/list-users'} >
                                List Persons
                            </Link>
                        )
                    }
                    {can(CAN_RESOURCE.USER, CAN_ACTION.CREATE) && (
                        <Link className={`${buttonClasses}  bg-indigo-600  hover:bg-indigo-700`}
                            href={'/dashboard/create-user'} >
                            + Create User
                        </Link>
                    )}
                </nav>
            </aside>
        </div>
    )
}
