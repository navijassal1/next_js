import { createContext, useState } from "react"
import cookies from "js-cookie"
import { axiosInstance } from "@/utils/axiosInstance"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


export const userContext = createContext(null)

export function UserProvider({ children }) {
  const router = useRouter()

  const [user, setUser] = useState([])
  const [listUsers, setListUsers] = useState([])

  const handleLogout = async () => {
    let deviceId = localStorage.getItem("device_id");
    try {
      const res = await axiosInstance.post('/api/users/logout', { device_id: deviceId })

      if (res.status === 200) {
        cookies.remove('access_token')
        cookies.remove('refresh_token')
        toast.success('Logout Successfull')
        router.push('/login')
      } else {
        console.log('logoutFailed')
      }
    } catch (error) {
      console.error(error)

    }
  }
  const handleListUsers = async () => {
    try {
      const res = await axiosInstance.get('/api/admin/list-users')

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
  const can = (resource, action) =>
    user?.permissions?.some((p) => p.resource === resource && p.action === action);
  const canHaveResoure = (resource) =>
    user?.permissions?.some((p) => p.resource === resource)

  const sectionClasses =
    "bg-white dark:bg-slate-800 rounded-xl shadow p-4 mb-4 w-full max-w-xs hover:shadow-lg transition-shadow";

  const buttonClasses =
    "px-4 py-2 rounded text-white text-sm font-medium transition-colors hover:scale-105";

  const iconClasses = "w-5 h-5 text-slate-600 dark:text-slate-300";
  const provide = {
    can,
    canHaveResoure,
    user,
    setUser,
    handleLogout,
    listUsers,
    handleListUsers,
    sectionClasses,
    buttonClasses,
    iconClasses
  }
  return (
    <userContext.Provider value={provide}>
      {children}
    </userContext.Provider>
  );
}

