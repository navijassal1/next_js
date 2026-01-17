"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import cookies from "js-cookie"

export default function LoginForm() {

	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		device_type: "",
		device_id: ""
	});

	const getDeviceType = () => {
		const ua = navigator.userAgent.toLowerCase();
		if (/tablet|ipad|playbook|silk/.test(ua)) return "tablet";
		if (/mobi|android|iphone/.test(ua)) return "mobile";
		return "desktop";
	}

	const getDeviceId = () => {
		let deviceId = localStorage.getItem("device_id");
		if (!deviceId) {
			deviceId = crypto.randomUUID();
			localStorage.setItem("device_id", deviceId);
		}
		return deviceId;
	};

	useEffect(() => {
		setFormData(prev => ({
			...prev,
			device_type: getDeviceType(),
			device_id: getDeviceId(),
		}));
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
		// console.log('-----formdata------\n', formData)
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await fetch("http://localhost:5000/auth/login", {
				method: "POST",
				credentials: 'include', //very important for recieve cookies
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await res.json()
			if (res.ok) {

				toast.success('Login Successfull')
				cookies.set('access_token', data.data.accessToken, { expires: 1 })
				cookies.set('refresh_token', data.data.refreshToken, { expires: 20 })

				router.push('/dashboard')
			} else {
				if (data.errorMessage) {
					console.log('-------ErrorMessage---------\n', data.errorMessage)
					setErrors(data.errorMessage);
				} else {
					toast.error('Login Failed')
				}
			}
		} catch (error) {
			console.log("Error:", error);
			toast.error("Something went wrong. Check console for details.");
		}
		finally {
			setLoading(false)
		}
	}
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-white to-purple-50 dark:from-black dark:via-gray-900 dark:to-black font-sans">
			<div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 sm:p-16 w-full max-w-md flex flex-col items-center">
				{/* Logo */}
				<h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-6">
					InstaClone
				</h1>

				{/* Heading */}
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
					Welcome Back
				</h2>
				<p className="text-gray-500 dark:text-gray-300 mb-8 text-center">
					Log in to your account to start sharing your moments.
				</p>

				{/* Form */}
				<form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Email"
						className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
						value={formData.email}
						name="email"
						onChange={handleChange}
						required
					/>
					{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
					<input
						type="password"
						placeholder="Password"
						className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white"
						value={formData.password}
						name="password"
						onChange={handleChange}
						required

					/>
					{errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
					<button
						type="submit"
						className={`w-full py-3 mt-2 font-semibold rounded-xl transition ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 text-white"
							}`}
						disabled={loading}
					>
						{loading ? "loging..." : "Login"}
					</button>
				</form>

				{/* Quick Links */}
				<div className="flex justify-between w-full mt-6 text-sm text-gray-500 dark:text-gray-300">
					<Link href="/signup" className="hover:text-green-600 dark:hover:text-green-400">
						Sign Up
					</Link>
					<Link href="/forgot-password" className="hover:text-green-600 dark:hover:text-green-400">
						Forgot Password?
					</Link>
				</div>
			</div>
		</div>
	);
}
