"use client";
import React, { useState } from "react";
import styles from "../dashboard.module.css";

const BookingForm = () => {
	const [formData, setFormData] = useState({
		bookFor: "",
		idNumber: "",
		service: "",
		appointmentType: "",
		age: "",
		gender: "",
		areaOfResidence: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setError(""); // Clear error message when the user modifies the form
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Retrieve the token from local storage
		const token = localStorage.getItem("access");
		const csrfToken =
			"k3StPMQCseb3OFWo8eRVteaV6ZVaPtOHpGibXvxcqZDUwIcVkG0LRM1ZLVyxvtO9"; // Replace with the actual CSRF token

		if (!token) {
			alert("Unknown User. Please log in.");
			return;
		}

		setIsLoading(true);
		setError("");
		setSuccessMessage("");

		try {
			const response = await fetch(
				"https://djangorestteleafya-a20e658a1b93.herokuapp.com/appointments/",
				{
					method: "POST",
					headers: {
						accept: "application/json",
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
						"X-CSRFToken": csrfToken,
					},
					body: JSON.stringify(formData),
				}
			);

			if (!response.ok) {
				throw new Error("Network error, please try again");
			}

			const result = await response.json();
			console.log("Success:", result);
			setSuccessMessage("Appointment booked successfully!");

			// Clear the form
			setFormData({
				bookFor: "",
				idNumber: "",
				service: "",
				appointmentType: "",
				age: "",
				gender: "",
				areaOfResidence: "",
			});
		} catch (error) {
			console.error("Error:", error);
			setError("Failed to book appointment. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<h2 className={styles.form_title}>Book Appointment</h2>
			<form onSubmit={handleSubmit} className={styles.form_container}>
				{error && <div className={styles.error_message}>{error}</div>}
				{successMessage && (
					<div className={styles.success_message}>{successMessage}</div>
				)}

				<label htmlFor="bookFor" className={styles.form_label}>
					Book for
				</label>
				<select
					id="bookFor"
					name="bookFor"
					value={formData.bookFor}
					onChange={handleChange}
					required
					className={styles.form_input}>
					<option value="">Select</option>
					<option value="myself">Myself</option>
					<option value="others">Others</option>
				</select>

				<label htmlFor="idNumber" className={styles.form_label}>
					ID Number
				</label>
				<input
					type="text"
					id="idNumber"
					name="idNumber"
					value={formData.idNumber}
					onChange={handleChange}
					required
					className={styles.form_input}
				/>

				<label htmlFor="service" className={styles.form_label}>
					Service
				</label>
				<input
					type="text"
					id="service"
					name="service"
					value={formData.service}
					onChange={handleChange}
					required
					className={styles.form_input}
				/>

				<label className={styles.form_label}>Appointment Type</label>
				<div>
					<input
						type="radio"
						id="physical"
						name="appointmentType"
						value="physical"
						checked={formData.appointmentType === "physical"}
						onChange={handleChange}
						required
					/>
					<label htmlFor="physical">Physical</label>
					<input
						type="radio"
						id="virtual"
						name="appointmentType"
						value="virtual"
						checked={formData.appointmentType === "virtual"}
						onChange={handleChange}
						required
					/>
					<label htmlFor="virtual">Virtual</label>
				</div>

				<label htmlFor="age" className={styles.form_label}>
					Age
				</label>
				<input
					type="number"
					id="age"
					name="age"
					value={formData.age}
					onChange={handleChange}
					required
					className={styles.form_input}
				/>

				<label htmlFor="gender" className={styles.form_label}>
					Gender
				</label>
				<select
					id="gender"
					name="gender"
					value={formData.gender}
					onChange={handleChange}
					required
					className={styles.form_input}>
					<option value="">Select</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
				</select>

				<label htmlFor="areaOfResidence" className={styles.form_label}>
					Area of Residence
				</label>
				<input
					type="text"
					id="areaOfResidence"
					name="areaOfResidence"
					value={formData.areaOfResidence}
					onChange={handleChange}
					required
					className={styles.form_input}
				/>

				<button
					type="submit"
					className={styles.form_button}
					disabled={isLoading}>
					{isLoading ? "Booking..." : "Book Appointment"}
				</button>
			</form>
		</div>
	);
};

export default BookingForm;
