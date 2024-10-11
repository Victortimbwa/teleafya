import styles from "./navbar.module.css";
import { BiEnvelope, BiBell } from "react-icons/bi";
import Image from "next/image";

const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<div className={styles.pagename}>
				<p></p>
			</div>
			<div className={styles.navbar_elements}>
				<div className={styles.icon_sides}>
					<BiBell className={styles.icons} />
					<BiEnvelope className={styles.icons} />
				</div>
				<div className={styles.prof}>
					<p>Victor Adams</p>
					<Image
						src="/assets/images/profile.jpg"
						alt="profile picture"
						width={40}
						height={40}
						className={styles.profile_image}
					/>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
