import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				userId: { label: "User ID", type: "text" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				try {
					const res = await axios.post(
						"http://102.210.244.222:6508/authentication/login",
						{
							userId: credentials.userId,
							password: credentials.password,
						}
					);
					const user = res.data;

					if (user && user.statusCode === 200) {
						return Promise.resolve(user);
					} else {
						return Promise.resolve(null);
					}
				} catch (error) {
					console.error(error);
					return Promise.resolve(null);
				}
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
	},
	pages: {
		signIn: "/",
	},
});

export { handler as GET, handler as POST };
