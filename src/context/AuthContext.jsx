import { useEffect, useState } from "react";
import { createContext } from "react";
import { getCurrentUserDetails } from "../appwrite/functions";
import toast from "react-hot-toast";

export const AuthContext = createContext({
    userDetails: null,
    isAuthenticated: false,
    isLoading: false
});

export default function AuthContextProvider({ children }) {
	const [userDetails, setUserDetails] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	async function fetchUserDetails() {
		try {
			setIsLoading(true);
			const response = await getCurrentUserDetails();

			if (response.success) {
				setUserDetails(response.data);
				setIsAuthenticated(true);
                return;
			}
		} catch (error) {
			toast.error("Failed to fetch user details");
			throw error;
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchUserDetails();
	}, []);

	const values = {
		userDetails,
		isAuthenticated,
		isLoading,
	};

	return (
		<AuthContext.Provider value={values}>{children}</AuthContext.Provider>
	);
}
