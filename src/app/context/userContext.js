import React, { createContext, useState } from "react";

// Create the user context
export const UserContext = createContext();
// Create a provider component
export const UserProvider = ({ children }) => {
	// Define the state for the user
	const [user, setUser] = useState(null);
	const [userAccounts, setUserAccounts] = useState(null);
	const [selectedAccount, setSelectedAccount] = useState(null);

	// Return the provider with the user state and any other values/functions
	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				userAccounts,
				setUserAccounts,
				selectedAccount,
				setSelectedAccount,
			}}>
			{children}
		</UserContext.Provider>
	);
};
