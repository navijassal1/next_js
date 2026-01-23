import { axiosInstance } from "@/utils/axiosInstance"
import { createContext, useContext, useState } from "react"
import { toast } from "sonner"

const adminContext = createContext(null)

function AdminProvider({ children }) {

    const [listPermissions, setListPermissions] = useState([])
    const [listUsers, setListUsers] = useState({
        users: [],
        data_details: {
            current: 1,
            total_pages: 1,
            from: 0,
            to: 0,
            total_data: 0,
            total_records:0,
        }
    },);
    const [listRoles, setListRoles] = useState([]);
    const [userPermissions, setUserPermissions] = useState([])
    const [loading, setLoading] = useState(true)

    const handleListPermissions = async () => {
        try {
            const res = await axiosInstance.get(`/api/admin/list-permissions`)
            // console.log(res.data,'in admin provider permissions lists')
            if (res.status === 200) {
                // console.log(res.data.data)
                setListPermissions(res.data.data)

                return true
            } else {
                console.log('fetching list permissions Failed')
                return false
            }
        } catch (error) {
            console.error(error)
        }
    }
    const handleListRoles = async () => {
        try {
            const res = await axiosInstance.get(`/api/admin/list-roles/`)
            // console.log(res.data)
            if (res.status === 200) {
                // console.log(res.data.data)
                setListRoles(res.data.data)
                return true
            } else {
                console.log('fetching list users Failed')
                return false
            }
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }
    const fetchListUsersViaRole = async (
        role,
        page,
        column,
        order,
        limit,
        search) => {
        try {
            console.log('function called')
            // console.log({ role, page, column, order, limit, search }, 'before role in handleRoleWithUsers')
            page = page ?? 1;
            role = role ?? "ALL";
            column = column ?? "id";
            order = order ?? 'asc';
            limit = limit ?? 5;
            search = search ?? '';

            // console.log({ role, page, column, order, limit, search }, 'after role in handleRoleWithUsers')
            const res = await axiosInstance.get(`/api/admin/users/${role}?search=${search}&page=${page}&sort_by=${column.toLowerCase()}&sort_order=${order}&limit=${limit}`)

            // console.log(res.data)
            if (res.status === 200) {
                // console.log(res.data.data)
                setListUsers(res.data.data)
                return true
            } else {
                console.log('fetching list users Failed')
                return false
            }
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }
    const fetchUsersWithPermissions = async (userId) => {
        try {
            // console.log(userId, 'userid in handleRoleWithUsers')
            const res = await axiosInstance.get(`/api/admin/users/${userId}/permissions`)

            // console.log(res.data)
            if (res.status === 200) {
                console.log(res.data.data, 'response data')

                const permissions = res.data.data.map((p) => p.permission)
                console.log(permissions, 'permissions permissions')
                setUserPermissions(permissions)

                return true
            } else {
                console.log('fetching list users Failed')
                return false
            }
        } catch (error) {
            console.error(error)

        }
    }
    const updateUserPermissions = async (userId) => {
        try {
            // console.log(userId, 'userid in this')
            const localPermissions = userPermissions.map(permission => permission.id)
            // console.log(localPermissions, 'localPermissions')
            if (localPermissions.length === 0) {
                toast.error("At least one permission must be selected")
                return
            }
            const res = await axiosInstance.put(`/api/admin/permissions`, {
                user_id: userId,
                permission_ids: localPermissions
            })

            console.log(res.data, 'response data')
            if (res.status === 200) {

                toast.success('User Permissions Updated')

            } else {
                toast.error('Updated Failed')
                return false
            }
        } catch (error) {
            console.error(error)
        }
    }
    function toggleCheckboxValue(actionID) {
        setUserPermissions(prev => {
            // Check if permission is already selected
            const exists = prev.find(p => p.id === actionID);
            if (exists) {
                // Remove it
                return prev.filter(p => p.id !== actionID);
            }
            // Add it
            const permissionToAdd = listPermissions.find(p => p.id === actionID);
            return permissionToAdd ? [...prev, permissionToAdd] : prev;
        });
    }
    function SelectAllResourceValue(resource) {
        console.log("--------Start Select All--------", resource)

        const resourcePermissions = listPermissions.filter(
            p => p.resource === resource
        )

        setUserPermissions(prev => {
            // IDs already selected
            const selectedIds = new Set(prev.map(p => p.id))

            // Check if ALL permissions for this resource are already selected
            const hasAll = resourcePermissions.every(p =>
                selectedIds.has(p.id)
            )

            if (hasAll) {
                return prev.filter(p => p.resource !== resource)
            }
            const missingPermissions = resourcePermissions.filter(
                p => !selectedIds.has(p.id)
            )
            return [...prev, ...missingPermissions]
        })
        console.log("--------END Select All--------")
    }

    const provide = {
        listUsers,
        listRoles,
        listPermissions,
        loading,

        userPermissions,
        updateUserPermissions,

        setListPermissions,
        setUserPermissions,
        SelectAllResourceValue,

        handleListRoles,
        handleListPermissions,

        fetchUsersWithPermissions,
        fetchListUsersViaRole,

        toggleCheckboxValue,

    }
    return (
        <adminContext.Provider value={provide}>
            {children}
        </adminContext.Provider>
    )
}

function useAdminContext() {
    const context = useContext(adminContext)

    if (!context) throw new Error("useAdminContext must be used within AdminProvider");

    return context
}

export { useAdminContext, AdminProvider }