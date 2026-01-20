import { axiosInstance } from "@/utils/axiosInstance"
import { useRouter } from "next/navigation"
import { createContext, useCallback, useState } from "react"

const adminContext = createContext(null)

function AdminProvider({ children }) {

    const router = useRouter()

    const [listPermissions, setListPermissions] = useState([])
    const [userPermissions, setUserPermissions] = useState([])

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
    },[])
    const fetchUsersWithPermissions = async (userId) => {
        try {
            console.log(userId, 'userid in handleRoleWithUsers')
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
    const provide = {
        listPermissions,
        userPermissions,
        setListPermissions,
        setUserPermissions,
        handleListPermissions,
        fetchUsersWithPermissions
    }
    return (
        <adminContext.Provider value={provide}>
            {children}
        </adminContext.Provider>
    )
}

export { adminContext, AdminProvider }