import styles from "./dashboard.module.css";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

export default function DashboardLayout({ children }) {
	return (
		<section>
			<div className={styles.layout}>
				<Sidebar />
				<div className={styles.children}>
					<Navbar />
					{children}
				</div>
			</div>
		</section>
	);
}
