import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContextProvider from "../../context/AuthContext";

export default function ProtectedLayout() {
	const navigate = useNavigate();
	const [cookieFallback, setCookieFallback] = useState(
		localStorage.getItem("cookieFallback")
	);

	useEffect(() => {
		if (!cookieFallback || cookieFallback == "[]") {
			navigate("/auth/signin");
			return;
		}
	}, [navigate]);

	return (
		<AuthContextProvider>
			<Outlet />
		</AuthContextProvider>
	);
}
