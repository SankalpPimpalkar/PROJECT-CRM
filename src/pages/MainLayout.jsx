import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
	return (
		<div>
			<Outlet />
			<Toaster />
		</div>
	);
}
