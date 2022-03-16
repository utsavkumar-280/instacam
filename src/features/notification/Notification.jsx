import styles from "./Notification.module.css";
import { CircleSpinner } from "react-spinners-kit";
import { useAuth } from "../authentication/authSlice";
import { Link } from "react-router-dom";

export const Notification = () => {
	const { notifications, notificationsStatus } = useAuth();
	console.log({ notifications });
	return (
		<div className={styles.container}>
			<header className={styles.head_container}>
				<p className={styles.route_head}>Notifications</p>
			</header>
			<div className={styles.notification_list_container}>
				{notificationsStatus === "success" ? (
					<section className={styles.notification_list}>
						{notifications.length !== 0 ? (
							notifications?.map((not) => (
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
										<p className={styles.notification}>
											{not?.notificationTitle}
										</p>
									</section>
								</Link>
							))
						) : (
							<div className={styles.noNotfication}>No notifications</div>
						)}
					</section>
				) : (
					<section className={styles.loaderContainer}>
						<CircleSpinner size={25} loading c />
					</section>
				)}
			</div>
		</div>
	);
};
