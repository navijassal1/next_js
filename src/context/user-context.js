import { createContext, useCallback, useContext, useState } from "react"
import cookies from "js-cookie"
import { axiosInstance } from "@/utils/axiosInstance"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const userContext = createContext(null)

function UserProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const res = await axiosInstance.get("/api/users/user-role"); //fetch user details
      // console.log(res.data.data)
      if (res.status === 200) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
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

  const can = (resource, action) =>
    user?.permissions?.some((p) => p.resource === resource && p.action === action);
  const canHaveResource = (resource) =>
    user?.permissions?.some((p) => p.resource === resource)

  const sectionClasses =
    "flex justify-center bg-white dark:bg-slate-800 rounded-xl shadow p-4 mb-4 w-full max-w-xs hover:text-white shadow-lg transition-shadow ";

  const buttonClasses =
    "flex justify-center px-4 py-2 rounded text-white text-sm font-medium transition-colors";

  const iconClasses = "w-5 h-5 text-slate-600 dark:text-slate-300";
  const provide = {
    buttonClasses,

    can,
    canHaveResource,

    handleLogout,

    fetchUserDetails,

    iconClasses,

    loading,

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

function useUserContext() {
  const context = useContext(userContext)

  if (!context) throw new Error("useUserContext must be used within AdminProvider");

  return context
}


export { useUserContext, UserProvider }