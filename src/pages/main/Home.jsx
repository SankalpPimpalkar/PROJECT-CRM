import React from "react";
import { logoutContact } from "../../appwrite/functions";
import useAuth from "../../hooks/useAuth";

export default function Home() {
	const { userDetails } = useAuth();
    console.log(userDetails)

	async function Logout() {
		await logoutContact();
	}

	return (
		<div className="w-full min-h-dvh flex flex-col items-center justify-center">
			{userDetails?.name}
			<button className="px-4 py-2 text-white bg-indigo-500 rounded" onClick={Logout}>Logout</button>
		</div>
	);
}
