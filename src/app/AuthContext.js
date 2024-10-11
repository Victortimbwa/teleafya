"use client";
import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);

	useEffect(() => {
		// Retrieve token from local storage if it exists
		const storedToken = localStorage.getItem("access");
		if (storedToken) {
			setToken(storedToken);
		}
	}, []);

	const login = (newToken) => {
		localStorage.setItem("access", newToken);
		setToken(newToken);
	};

	const logout = () => {
		localStorage.removeItem("access");
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
