import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginContact } from "../../appwrite/functions";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

export default function Signin() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	async function handleChange(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();

		if (!formData.email.trim()) {
			toast.error("Email field is required")
			return
		}

		if (formData.password.length < 8) {
			toast.error("Password must be at least 8 characters long.")
			return
		}

		try {
			setIsLoading(true);
			const response = await loginContact(formData)
			console.log(response)

			if(response.success) {
				toast.success('You are logged In')
				navigate('/')
			}

		} catch (error) {
			toast.error("Failed to login account. Please try again");
			navigate("/");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="bg-white px-5 py-6 rounded w-full max-w-lg">
			<h1 className="text-2xl font-extrabold text-secondary mb-2">
				Login Account
			</h1>
			<p className="text-sm text-gray-600 mb-4">
				Welcome back! Access your CRM dashboard and manage your
				customers with ease.
			</p>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Email */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						disabled={isLoading}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-200"
						placeholder="Enter your email"
					/>
				</div>

				{/* Password */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Password
					</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
						disabled={isLoading}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-200"
						placeholder="Enter your password"
					/>
				</div>

				{/* Submit Button */}
				<div>
					<button
						type="submit"
						disabled={isLoading}
						className="w-full disabled:bg-primary/70 bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark transition flex items-center justify-center gap-3"
					>
						{isLoading && <LoaderCircle className="animate-spin" />}
						{isLoading ? <p>Signing In</p> : <p>Sign In</p>}
					</button>
				</div>
			</form>

			<p className="text-sm text-gray-600 mt-4">
				New User ?{" "}
				<Link to="/auth/signup" className="font-bold text-primary">
					Create Account
				</Link>
			</p>
		</div>
	);
}
