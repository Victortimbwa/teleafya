import "./globals.css";
import { AuthProvider } from "./AuthContext";

export const metadata = {
	title: "Teleafya",
	description: "Your health, your way",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<AuthProvider>
				<body>{children}</body>
			</AuthProvider>
		</html>
	);
}
