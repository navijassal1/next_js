"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner"
import { axiosInstance } from "@/utils/axiosInstance"


export default function SignupForm() {
    const router = useRouter()

    const [formData, setFormData] = useState({
        role: "",
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({});
        setLoading(true);
        try {
            const res = await axiosInstance.post("/auth/signup", formData);

            const data = res.data;
            console.log(res.status, ' : Res Status')
            if (res.status === 201) {
                toast.success("Signup successful! You can now log in.")
                // console.log('--------data---------\n', data)
                router.push('/login')
            }
        } catch (error) {
            // console.log("Error:", error);
            // console.log("AxiosError:", error);
            if (error.response && error.response.data && error.response.data.errorMessage) {
                setErrors(error.response.data.errorMessage);
                console.log('-------ErrorMessage---------\n', error.response.data.errorMessage)
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-blue-50 dark:from-black dark:via-gray-900 dark:to-black font-sans">
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 sm:p-16 w-full max-w-md flex flex-col items-center">
                {/* Logo */}
                <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-6">
                    InstaClone
                </h1>

                {/* Heading */}
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Create Your Account
                </h2>
                <p className="text-gray-500 dark:text-gray-300 mb-8 text-center">
                    Sign up to start sharing your moments with friends!
                </p>

                {/* Signup Form */}
                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Role */}

                    <select
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                        required
                        name="role"
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="" disabled>select</option>
                        <option value="USER">User</option>
                        <option value="VENDOR">Vendor</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

                    {/* First Name */}
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                        required
                    />
                    {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}

                    {/* Last Name */}
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                        required
                    />
                    {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}

                    {/* Username */}
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                        required
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                    {/* Confirm Password */}
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                        required
                    />
                    {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 mt-2 font-semibold rounded-xl transition ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 text-white"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                {/* Quick Links */}
                <div className="flex justify-between w-full mt-6 text-sm text-gray-500 dark:text-gray-300">
                    <Link href="/login" className="hover:text-green-600 dark:hover:text-green-400">
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
