import styles from "./Notification.module.css";

import { useAuth } from "../authentication/authSlice";
import { Link } from "react-router-dom";

export const Notification = () => {
	const { notifications } = useAuth();
	return (
		<div className={styles.container}>
			<header className={styles.head_container}>
				<p className={styles.route_head}>Notifications</p>
			</header>
			<div className={styles.notification_list_container}>
				<section className={styles.notification_list}>
					{notifications?.map((not) => (
						<Link
							to={`/user-profile/${not?.notificationUserId?.userName}`}
							key={not?._id}
							className={styles.notification_container}
						>
							<div className={styles.pfp_container}>
								<img
									src={not?.notificationUserId?.profilePic}
									alt="profilePic"
									className={styles.pfp}
								/>
							</div>

							<section className={styles.notification_info}>
								<div className={styles.user_info}>
									<h1>{`${not?.notificationUserId?.userId?.firstname} ${not?.notificationUserId?.userId?.lastname}`}</h1>
									<h2>{`@${not?.notificationUserId?.userName}`}</h2>
									<h2>{`. ${not?.time}`}</h2>
								</div>
								<p className={styles.notification}>{not?.notificationTitle}</p>
							</section>
						</Link>
					))}
				</section>
			</div>
		</div>
	);
};
