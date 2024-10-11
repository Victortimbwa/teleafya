"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./login.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrorMessage("");

		try {
			const response = await fetch(
				"https://djangorestteleafya-a20e658a1b93.herokuapp.com/auth/login/",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"X-CSRFToken":
							"dcjDGHMumHdFL3NfYJYyOVKPO6RxbHUfiPJlOqt4ksFwt63Mab7octBTt2uURHUH",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				}
			);

			const data = await response.json();
			if (response.ok) {
				console.log("Login successful:", data);
				// Handle successful login, e.g., store token
				// Redirect to the dashboard
				localStorage.setItem("accessToken", data.access);
				localStorage.setItem("refreshToken", data.refresh);
				//show successful toast message
				toast.success("Login successful", {
					position: "top-center",
					autoClose: 3000,
				});
				router.push("/dashboard");
			} else {
				setErrorMessage(
					data.message || "Login failed. Please check your credentials."
				);
			}
		} catch (error) {
			setErrorMessage("Network error. Please try again later.");
		}

		setLoading(false);
	};

	return (
		<section className={styles.homelogin}>
			<div className={styles.left}>
				<h1>
					Your
					<br />
					<span>Ultimate </span>
					<br />
					Health Solution Provider
				</h1>
			</div>
			<div className={styles.right}>
				<h4>Sign in to your Account</h4>
				<p>Sign in to continue. Do not share your password</p>
				{errorMessage && <p className={styles.error}>{errorMessage}</p>}
				<form className={styles.loginform} onSubmit={handleSubmit}>
					<div className={styles.inputbox}>
						<input
							type="text"
							placeholder="Email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<FaRegUserCircle />
					</div>
					<div className={styles.inputbox}>
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<MdOutlineLock />
					</div>
					<button
						type="submit"
						className={styles.login_button}
						disabled={loading}>
						{loading ? "Signing in..." : "Sign in"}
					</button>
					<div className={styles.links}>
						<a href="/signup" className={styles.link}>
							Sign Up
						</a>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Login;
