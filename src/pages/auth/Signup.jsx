import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createContact } from "../../appwrite/functions";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		phone_number: "",
		role: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	async function handleChange(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	async function handleSubmit(e) {
		e.preventDefault();

		if (
			["name", "email", "phone_number", "role"].some(
				(field) => !formData[field]?.trim()
			)
		) {
			toast.error("All fields are required")
			return
		}

		if (formData.password.length < 8) {
			toast.error("Password must be at least 8 characters long.")
			return
		}

		try {
			setIsLoading(true);
			const response = await createContact(formData);
			console.log(response)

			if(response.success) {
				toast.success('New account created')
				navigate('/auth/signin')
			}

		} catch (error) {
			toast.error("Failed to create account. Please try again");
			navigate("/auth/signup");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-white px-5 py-6 rounded w-full max-w-lg">
			<h1 className="text-2xl font-extrabold text-secondary mb-2">
				Create Account
			</h1>
			<p className="text-sm text-gray-600 mb-4">
				Join us today and streamline your customer relationships
				effortlessly.
				<br /> Sign up now to get started!
			</p>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Name */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Name
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						disabled={isLoading}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-200"
						placeholder="Enter your name"
					/>
				</div>

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

				{/* Phone Number */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Phone Number
					</label>
					<input
						type="tel"
						name="phone_number"
						value={formData.phone_number}
						onChange={handleChange}
						required
						disabled={isLoading}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-200"
						placeholder="Enter your phone number"
					/>
				</div>

				{/* Role */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Role
					</label>
					<input
						type="text"
						name="role"
						value={formData.role}
						onChange={handleChange}
						required
						disabled={isLoading}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-200"
						placeholder="What is your role ?"
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
						{isLoading ? <p>Signing Up</p> : <p>Sign Up</p>}
					</button>
				</div>
			</form>

			<p className="text-sm text-gray-600 mt-4">
				Already have an account ?{" "}
				<Link to="/auth/signin" className="font-bold text-primary">
					Login Account
				</Link>
			</p>
		</div>
	);
}
