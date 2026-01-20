import { createContext, useCallback, useState } from "react"
import cookies from "js-cookie"
import { axiosInstance } from "@/utils/axiosInstance"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


 const userContext = createContext(null)

 function UserProvider({ children }) {
  const router = useRouter()

  const [user, setUser] = useState([])
  const [listUsers, setListUsers] = useState([])

  const [listRoles, setListRoles] = useState([])

   const fetchUserDetails = async () => {
        try {
            const res = await axiosInstance.get("/api/users/user-role"); //fetch user details
            console.log(res.data.data)
            if (res.status === 200) {
                setUser(res.data.data);
            }

        } catch (error) {
            console.error(error);
        } 
    };

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
  const handleListUsers = useCallback(async () => {
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
  },[])
  const fetchUsersWithRoles = async (role) => {
    try {
      console.log(role,'role in handleRoleWithUsers')
      const res = await axiosInstance.get(`/api/admin/users/${role}`)

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
  const HandleListRoles = async () => {
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
  }
  const can = (resource, action) =>
    user?.permissions?.some((p) => p.resource === resource && p.action === action);
  const canHaveResource = (resource) =>
    user?.permissions?.some((p) => p.resource === resource)

  const sectionClasses =
    "flex justify-center bg-white dark:bg-slate-800 rounded-xl shadow p-4 mb-4 w-full max-w-xs hover:text-white shadow-lg transition-shadow ";

  const buttonClasses =
    "px-4 py-2 rounded text-white text-sm font-medium transition-colors hover:scale-105";

  const iconClasses = "w-5 h-5 text-slate-600 dark:text-slate-300";
  const provide = {
    buttonClasses,
    can,
    canHaveResource,
    handleListUsers,
    handleLogout,
    fetchUsersWithRoles,
    fetchUserDetails,
    HandleListRoles,
    iconClasses,
    listUsers,
    listRoles,
    setUser,
    sectionClasses,
    user,
  }
  return (
    <userContext.Provider value={provide}>
      {children}
    </userContext.Provider>
  );
}

export {userContext,UserProvider}