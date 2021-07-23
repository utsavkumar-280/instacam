import notifyStyles from "./Notification.module.css";

export const Notification = () => {
	return (
		<div className={notifyStyles.container}>
			<header className={notifyStyles.head_container}>
				<p className={notifyStyles.route_head}>Notification</p>
			</header>
		</div>
	);
};
