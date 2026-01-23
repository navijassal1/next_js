import { axiosInstance } from "@/utils/axiosInstance"
import { useRouter } from "next/navigation"
import { createContext, useContext, useState } from "react"

const categoryContext = createContext(null)

function CategoryProvider({ children }) {

    const router = useRouter()

    const [categories, setCategories] = useState([])

    const handleListCategories = async (username) => {
        try {
            const res = await axiosInstance.get(`/api/categories/${username}`)

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
    }
    const fetchUsersWithcategories = async (role) => {
        try {
            // console.log(role, 'role in handleRoleWithUsers')
            const res = await axiosInstance.get(`/api/admin/users/vendor`)

            // console.log(res.data)
            if (res.status === 200) {
                // console.log(res.data.data)

                setCategories(res.data.data)

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
        categories,
        setCategories,
        handleListCategories
    }
    return (
        <categoryContext.Provider value={provide}>
            {children}
        </categoryContext.Provider>
    )
}

function useCategoryContext() {
    const context = useContext(categoryContext)

    if (!context) throw new Error("useCategoryContext must be used within AdminProvider");

    return context
}
export { useCategoryContext, CategoryProvider }