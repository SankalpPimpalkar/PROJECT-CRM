import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "./pages/main/ProtectedLayout";
import MainLayout from "./pages/MainLayout";
import AuthLayout from "./pages/auth/AuthLayout";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Home from "./pages/main/Home";

export default function App() {
	return (
		<Routes>
			<Route path="" element={<MainLayout />}>
				<Route path="/auth" element={<AuthLayout />}>
					<Route path="signup" element={<Signup />} />
					<Route path="signin" element={<Signin />} />
				</Route>
				
				<Route path="/" element={<ProtectedLayout />}>
					<Route path="" element={<Home />} />
				</Route>
			</Route>
		</Routes>
	);
}
