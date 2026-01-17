import { userContext } from "@/context/user-context";
import { useContext, useEffect, useState } from "react"
import cookies from "js-cookie"
export default function PrivateRoute({ children }) {
    const { user, setUser } = useContext(userContext)
    const [loading, setLoading] = useState(true)
    const token = cookies.get('access_token')

    useEffect(() => {

    }, [token])
    
    if (loading) {
        <div>
            <p>Loading Page</p>
        </div>
    }
    return { children }
}