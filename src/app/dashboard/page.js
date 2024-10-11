import React from "react";
import Styles from "./dashboard.module.css";
import { CgClipboard } from "react-icons/cg";
import BottomBanner from "../components/BottomBanner/BottomBanner";

const Dashboard = () => {
	return (
		<div className={Styles.main_home}>
			<div className={Styles.welcome}>
				<div className={Styles.greetings_main}>
					<p className={Styles.greetings}>Welcome Back</p>
					{/* <h2>
							{session.user.entity.firstName}
							{session.user.entity.lastName}
						</h2> */}
				</div>
				<p className={Styles.lastlogin}>
					{/* Last Login: {new Date(session.user.lastLoginTime).toLocaleString()} */}
				</p>
				<BottomBanner />
			</div>
		</div>
	);
};

export default Dashboard;
