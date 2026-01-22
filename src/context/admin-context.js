import { axiosInstance } from "@/utils/axiosInstance"
import { createContext, useCallback, useState } from "react"
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
        }
    },);
    const [listRoles, setListRoles] = useState([]);
    const [userPermissions, setUserPermissions] = useState([])
    const [loading, setLoading] = useState(true)

    const handleListPermissions = useCallback(async () => {
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
    }, [])
    const handleListUsers = useCallback(async () => {
        try {

            // console.log(pageNumber, 'current page')
            // if (!pageNumber ) {
            //     pageNumber = 1
            // }
            const res = await axiosInstance.get(`/api/admin/list-users`)
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
    }, [])
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
    const fetchListUsersViaRole = async (role, pageNumber, sort_by, sort_order) => {
        try {
            console.log(role, 'role in handleRoleWithUsers')
            if (!pageNumber || !role || !sort_by || !sort_order) {
                pageNumber = 1
                role = "ALL"
            }
            const res = await axiosInstance.get(`/api/admin/users/${role}?page=${pageNumber}&sort_by=id&sort_order=asc`)

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
                // console.log(res.data.data)

                setUserPermissions(res.data.data)

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
            const localPermissions = userPermissions.map(user => user.permission.id)
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
            const exists = prev.find(p => p.permission.id === actionID);
            if (exists) {
                // Remove it
                return prev.filter(p => p.permission.id !== actionID);
            }
            // Add it
            const permissionToAdd = listPermissions.find(p => p.id === actionID);
            return permissionToAdd ? [...prev, { permission: permissionToAdd }] : prev;
        });
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

        handleListRoles,
        handleListPermissions,
        handleListUsers,

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

export { adminContext, AdminProvider }