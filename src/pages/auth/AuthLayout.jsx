import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
	const navigate = useNavigate();
	const [cookieFallback, setCookieFallback] = useState(
		localStorage.getItem("cookieFallback")
	);

	useEffect(() => {
		if (cookieFallback && cookieFallback !== "[]") {
			navigate("/");
			return
		}
	}, [navigate]);

	return (
		<div className="w-full min-h-dvh flex items-center justify-center bg-white md:bg-primary">
			<Outlet />
		</div>
	);
}
