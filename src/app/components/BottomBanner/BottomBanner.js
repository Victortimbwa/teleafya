import styles from "./bottom-banner.module.css";
import Image from "next/image";

export default function BottomBanner() {
	<div className={styles.bottom_banner}>
		<div className={styles.top_image}>
			<p>
				The mobile banking service is available on Smart Phones and Tablets
				using iOS, Android and Windows mobile operating systems.. The E-banking
				platform can be accessed using Internet Explorer, Google Chrome, Mozilla
				Firefox, Safari and Opera browsers.
			</p>
		</div>
		<div className={styles.stores}>
			<Image
				src="/assets/images/googlestore.png"
				alt="playstore"
				className={styles.store_logo}
				width={150}
				height={50}
			/>
			<Image
				src="/assets/images/applestore.png"
				alt="applelestore"
				className={styles.store_logo}
				width={150}
				height={50}
			/>
		</div>
	</div>;
}
