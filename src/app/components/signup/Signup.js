"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./styles.css";

const SignupForm = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});
	const [serverError, setServerError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateForm = () => {
		let errors = {};
		if (!formData.firstName.trim()) errors.firstName = "First name is required";
		if (!formData.lastName.trim()) errors.lastName = "Last name is required";
		if (!formData.username.trim()) errors.username = "Username is required";
		if (!formData.email.trim()) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = "Email is invalid";
		}
		if (!formData.password.trim()) errors.password = "Password is required";
		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length === 0) {
			try {
				const response = await fetch(
					"https://djangorestteleafya-a20e658a1b93.herokuapp.com/auth/register/",
					{
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
							"X-CSRFToken":
								"dcjDGHMumHdFL3NfYJYyOVKPO6RxbHUfiPJlOqt4ksFwt63Mab7octBTt2uURHUH",
						},
						body: JSON.stringify({
							first_name: formData.firstName,
							last_name: formData.lastName,
							username: formData.username,
							email: formData.email,
							password: formData.password,
						}),
					}
				);

				if (response.ok) {
					const data = await response.json();
					setSuccessMessage(
						"Registration successful! Please check your email to verify your account."
					);
					setFormData({
						firstName: "",
						lastName: "",
						username: "",
						email: "",
						password: "",
					});
					setServerError("");
				} else {
					const errorData = await response.json();
					setServerError(
						errorData.message || "An error occurred during registration."
					);
					setSuccessMessage("");
				}
			} catch (error) {
				setServerError("Network error. Please try again later.");
				setSuccessMessage("");
			}
		} else {
			setErrors(validationErrors);
		}
	};

	return (
		<div className="signup-form">
			<h2>Sign Up to Teleafya</h2>
			{serverError && <p className="error">{serverError}</p>}
			{successMessage && <p className="success">{successMessage}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="firstName"
					placeholder="First Name"
					value={formData.firstName}
					onChange={handleChange}
					required
				/>
				{errors.firstName && <p className="error">{errors.firstName}</p>}
				<input
					type="text"
					name="lastName"
					placeholder="Last Name"
					value={formData.lastName}
					onChange={handleChange}
					required
				/>
				{errors.lastName && <p className="error">{errors.lastName}</p>}
				<input
					type="text"
					name="username"
					placeholder="Username"
					value={formData.username}
					onChange={handleChange}
					required
				/>
				{errors.username && <p className="error">{errors.username}</p>}
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				{errors.email && <p className="error">{errors.email}</p>}
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				{errors.password && <p className="error">{errors.password}</p>}
				<button type="submit">Sign Up</button>
			</form>
			<p>
				Already have an account? <Link href="/login">Login here</Link>
			</p>
		</div>
	);
};

export default SignupForm;
