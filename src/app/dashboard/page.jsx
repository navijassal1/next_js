"use client"


import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import cookies from "js-cookie"

import { useContext } from "react"
import { userContext } from "@/context/user-context"
import Header from "../components/Header.component"
import Sidebar from "../components/Sidebar.component"

export default function Dashboard() {
    const { user, setUser } = useContext(userContext)
    const token = cookies.get('access_token')
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const fetchUserDetails = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users/user-role', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json()
            console.log(data, 'user in dashboard')
            if (res.status === 401) {
                router.replace('/login')
            }
            if (res.ok) {
                setUser(data.data)
            } else {
                router.replace('/login')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

    const handleLogout = async () => {
        let deviceId = localStorage.getItem("device_id");
        try {
            const res = await fetch('http://localhost:5000/api/users/logout', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ device_id: deviceId })
            })
            if (res.status === 401) {
                router.push('/login')
            }
            if (res.ok) {
                cookies.remove('access_token')
                cookies.remove('refresh_token')
                toast.success('Logout Successfull')
                router.push('/login')
            } else {
                console.log('logoutFailed')
            }
        } catch (error) {
            console.error(error)

        } finally {
            setLoading(false)
        }
    }
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500 text-lg">Loading profile...</p>
            </div>
        )
    }
    return (
        <div className="h-12/12 w-10/12 bg-amber-500">
            <h2 className="text-2xl font-bold">Welcome, {user.roles}</h2>
            {/* <Header /> */}
            {/* <Sidebar /> */}
            <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full mt-4"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
}
