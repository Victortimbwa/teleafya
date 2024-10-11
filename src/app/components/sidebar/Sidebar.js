"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./sidebar.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import {
	BiSolidDashboard,
	BiTask,
	BiSpreadsheet,
	BiTransfer,
	BiData,
	BiDetail,
} from "react-icons/bi";
import { FaArrowRightToBracket } from "react-icons/fa6";

const Sidebar = () => {
	const [isCollapsedSidebar, setIsidebarcollapse] = useState(false);

	const toggleSidebarcollapseHandler = () => {
		setIsidebarcollapse((prev) => !prev);
	};
	return (
		<div className={styles.sidebar_wrapper}>
			<button className={styles.btn} onClick={toggleSidebarcollapseHandler}>
				{isCollapsedSidebar ? (
					<MdKeyboardArrowRight />
				) : (
					<MdKeyboardArrowLeft />
				)}
			</button>
			<aside className={styles.sidebar} data-collapse={isCollapsedSidebar}>
				<div className={styles.sidebar_header}>
					<div className={styles.logo}></div>
					<div className={styles.brand_name}>
						<h2>Teleafya</h2>
					</div>
				</div>
				<div className={styles.list_navs}>
					<div className={styles.top_navs}>
						<ul className={styles.sidebar_list}>
							<Link href="/dashboard">
								<li className={styles.sidebar_item}>
									<span className={styles.sidebar_icon}>
										<BiSolidDashboard />
										<span className={styles.sidebar_name}>Dashboard</span>
										<span className={styles.tooltiptext}>Dashboard</span>
									</span>
								</li>
							</Link>
							<Link href="/dashboard/book_appointment">
								<li className={styles.sidebar_item}>
									<span className={styles.sidebar_icon}>
										<BiTask />
										<span className={styles.sidebar_name}>
											Book Appointment
										</span>
										<span className={styles.tooltiptext}>Book Appointment</span>
									</span>
								</li>
							</Link>
							<Link href="/dashboard/book_appointment">
								<li className={styles.sidebar_item}>
									<span className={styles.sidebar_icon}>
										<BiSpreadsheet />
										<span className={styles.sidebar_name}>My Appointments</span>
										<span className={styles.tooltiptext}>My Appointments</span>
									</span>
								</li>
							</Link>
							<Link href="/dashboard/services">
								<li className={styles.sidebar_item}>
									<span className={styles.sidebar_icon}>
										<BiDetail />
										<span className={styles.sidebar_name}>Clinics</span>
										<span className={styles.tooltiptext}>Clinics</span>
									</span>
								</li>
							</Link>
							<Link href="/dashboard/logout">
								<li className={styles.sidebar_item}>
									<span className={styles.sidebar_icon}>
										<FaArrowRightToBracket />
										<span className={styles.sidebar_name}>Logout</span>
										<span className={styles.tooltiptext}>Logout</span>
									</span>
								</li>
							</Link>
						</ul>
					</div>
				</div>
				<div className={styles.copyright}>
					<p>copyright, 2024</p>
					<p>Teleafya</p>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;
