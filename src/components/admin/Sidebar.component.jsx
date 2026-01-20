"use client"

import { userContext } from "@/context/user-context";
import { useContext, useState } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { HiOutlineUser, HiOutlineCog, HiOutlineCollection } from "react-icons/hi";
import ListUsers from "../../app/dashboard/users/list-users/page";
import ListUsersBaseOnRoles from "./listRoles.component";
import Link from "next/link";

export default function Sidebar() {
    const {
        buttonClasses,
        can,
        canHaveResource,
        handleListUsers,
        iconClasses,
        listUsers,
        listRoles,
        sectionClasses,
    } = useContext(userContext);
    const [openSections, setOpenSections] = useState({
        SYSTEM: false,
        USER: false,
        CATEGORY: false,
    });
    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    //   return (
    //     // Sidebar container fixed width + full height (screen height)
    //     <aside className="flex flex-col bg-slate-50 dark:bg-slate-900 min-h-full w-72 p-6 top-0">


    //       {/* Sections */}
    //       <nav className="flex flex-col grow overflow-auto">
    //         {can("SYSTEM", "READ") && (
    //           <div className={sectionClasses}>
    //             <div
    //               className="flex justify-between items-center cursor-pointer mb-2"
    //               onClick={() => toggleSection("SYSTEM")}
    //             >
    //               <div className="flex items-center gap-2">
    //                 <HiOutlineCog className={iconClasses} />
    //                 <h3 className="text-black dark:text-white font-semibold text-lg">
    //                   Admin
    //                 </h3>
    //               </div>
    //               {openSections.SYSTEM ? (
    //                 <HiChevronDown className={iconClasses} />
    //               ) : (
    //                 <HiChevronRight className={iconClasses} />
    //               )}
    //             </div>
    //             {openSections.SYSTEM && (
    //               <div className="flex flex-wrap gap-2 mt-2">
    //                 {can("SYSTEM", "READ") && (
    //                   <button className={`${buttonClasses} bg-green-500`}>List Admins</button>
    //                 )}
    //                 {can("SYSTEM", "CREATE") && (
    //                   <button className={`${buttonClasses} bg-yellow-500`}>Create Admin</button>
    //                 )}
    //                 {can("SYSTEM", "UPDATE") && (
    //                   <button className={`${buttonClasses} bg-blue-500`}>Edit Admin</button>
    //                 )}
    //                 {can("SYSTEM", "DELETE") && (
    //                   <button className={`${buttonClasses} bg-red-500`}>Delete Admin</button>
    //                 )}
    //               </div>
    //             )}
    //           </div>
    //         )}

    //         {can("USER", "READ") && (
    //           <div className={sectionClasses}>
    //             <div
    //               className="flex justify-between items-center cursor-pointer mb-2"
    //               onClick={() => toggleSection("USER")}
    //             >
    //               <div className="flex items-center gap-2">
    //                 <HiOutlineUser className={iconClasses} />
    //                 <h3 className="text-black dark:text-white font-semibold text-lg">
    //                   Users
    //                 </h3>
    //               </div>
    //               {openSections.USER ? (
    //                 <HiChevronDown className={iconClasses} />
    //               ) : (
    //                 <HiChevronRight className={iconClasses} />
    //               )}
    //             </div>
    //             {openSections.USER && (
    //               <div className="flex flex-wrap gap-2 mt-2">
    //                 {can("USER", "READ") && (
    //                   <button className={`${buttonClasses} bg-green-500`}>List Users</button>
    //                 )}
    //                 {can("USER", "CREATE") && (
    //                   <button className={`${buttonClasses} bg-yellow-500`}>Create Users</button>
    //                 )}
    //                 {can("USER", "UPDATE") && (
    //                   <button className={`${buttonClasses} bg-blue-500`}>Update Users</button>
    //                 )}
    //                 {can("USER", "DELETE") && (
    //                   <button className={`${buttonClasses} bg-red-500`}>Delete Users</button>
    //                 )}
    //               </div>
    //             )}
    //           </div>
    //         )}

    //         {can("CATEGORY", "READ") && (
    //           <div className={sectionClasses}>
    //             <div
    //               className="flex justify-between items-center cursor-pointer mb-2"
    //               onClick={() => toggleSection("CATEGORY")}
    //             >
    //               <div className="flex items-center gap-2">
    //                 <HiOutlineCollection className={iconClasses} />
    //                 <h3 className="text-black dark:text-white font-semibold text-lg">
    //                   Category
    //                 </h3>
    //               </div>
    //               {openSections.CATEGORY ? (
    //                 <HiChevronDown className={iconClasses} />
    //               ) : (
    //                 <HiChevronRight className={iconClasses} />
    //               )}
    //             </div>
    //             {openSections.CATEGORY && (
    //               <div className="flex flex-wrap gap-2 mt-2">
    //                 {can("CATEGORY", "READ") && (
    //                   <button className={`${buttonClasses} bg-green-500`}>List Category</button>
    //                 )}
    //                 {can("CATEGORY", "CREATE") && (
    //                   <button className={`${buttonClasses} bg-yellow-500`}>Create Category</button>
    //                 )}
    //                 {can("CATEGORY", "UPDATE") && (
    //                   <button className={`${buttonClasses} bg-blue-500`}>Update Category</button>
    //                 )}
    //                 {can("CATEGORY", "DELETE") && (
    //                   <button className={`${buttonClasses} bg-red-500`}>Delete Category</button>
    //                 )}
    //               </div>
    //             )}
    //           </div>
    //         )}
    //       </nav>
    //     </aside>
    //   );

    return (
        <div className="h-full bg-amber-200 flex">
            <aside className="flex flex-col bg-slate-50 dark:bg-slate-900 h-full w-90 p-6 top-0 border-amber-100">


                {/* Sections
                {canHaveResource("SYSTEM")
                    && (
                        <button className={sectionClasses} onClick={HandleListRoles}>List Admins</button>
                    )
                } */}

                <nav className="flex flex-col grow overflow-auto border-amber-50">
                    {/* {can("SYSTEM", "READ") && (
                        <div className={sectionClasses}>
                            <div
                                className="flex justify-between items-center cursor-pointer mb-2"
                                onClick={() => toggleSection("SYSTEM")}
                            >
                                <div className="flex items-center gap-2">
                                    <HiOutlineCog className={iconClasses} />
                                    <h3 className="text-black dark:text-white font-semibold text-lg">
                                        Admin
                                    </h3>
                                </div>
                                {openSections.SYSTEM ? (
                                    <HiChevronDown className={iconClasses} />
                                ) : (
                                    <HiChevronRight className={iconClasses} />
                                )}
                            </div>
                            {openSections.SYSTEM && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {can("SYSTEM", "READ") && (
                                        <button className={`${buttonClasses} bg-green-500`}>List Admins</button>
                                    )}
                                    {can("SYSTEM", "CREATE") && (
                                        <button className={`${buttonClasses} bg-yellow-500`}>Create Admin</button>
                                    )}
                                    {can("SYSTEM", "UPDATE") && (
                                        <button className={`${buttonClasses} bg-blue-500`}>Edit Admin</button>
                                    )}
                                    {can("SYSTEM", "DELETE") && (
                                        <button className={`${buttonClasses} bg-red-500`}>Delete Admin</button>
                                    )}
                                </div>
                            )}
                        </div>
                    )} */}

                    {/* {can('SYSTEM', 'READ')
                            && (<button className={sectionClasses} onClick={handleListUsers}>List Users</button>)
                        } */}

                    {/* <div className="flex flex-wrap gap-2 mt-2">
                        {can("CATEGORY", "READ") && (
                            <button className={`${buttonClasses} bg-green-500`}>List Categories</button>
                        )}
                        {can("SYSTEM", "CREATE") && (
                            <button className={`${buttonClasses} bg-yellow-500`}>Create Admin</button>
                        )}
                        {can("SYSTEM", "UPDATE") && (
                            <button className={`${buttonClasses} bg-blue-500`}>Edit Admin</button>
                        )}
                        {can("SYSTEM", "DELETE") && (
                            <button className={`${buttonClasses} bg-red-500`}>Delete Admin</button>
                        )}
                    </div> */}

                    {canHaveResource("USER")
                        && (
                            <Link className={sectionClasses} onClick={handleListUsers} href={'/dashboard/users/list-users'} >List Users</Link>
                        )
                    }
                    {canHaveResource("SYSTEM")
                        && (
                            <button className={sectionClasses} >User Permissions</button>
                        )
                    }
                    {can("USER", "CREATE") && (
                        <button className={`${buttonClasses} bg-indigo-600 hover:bg-indigo-700`}>
                            + Create User
                        </button>
                    )}
                </nav>
            </aside>
            {/* <div className="w-full h-full bg-slate-100 dark:bg-slate-900 p-6">
                {listUsers
                    &&
                    <ListUsers />
                }
                {listRoles.length > 0
                    &&
                    <ListUsersBaseOnRoles />
                }
            </div> */}
        </div>
    )
}
