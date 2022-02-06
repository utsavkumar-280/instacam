import styles from "./followerUsers/FollowerUsers.module.css";
import { Link } from "react-router-dom";

const ProfileTile = ({ to, pic, name, username, isForFollower }) => {
	return isForFollower ? (
		<Link to={to} className={styles.users}>
			<img src={pic} alt="post_user_pic" className={styles.users_pic} />
			<section className={styles.users_info_container}>
				<section className={styles.users_info_alt}>
					<h1>{name}</h1>
					<h2>{username}</h2>
				</section>
			</section>
		</Link>
	) : (
		<div className={styles.users}>
			<img src={pic} alt="post_user_pic" className={styles.users_pic} />
			<section className={styles.users_info_container}>
				<Link to={to} className={styles.users_info}>
					<h1>{name}</h1>
					<h2>{username}</h2>
				</Link>
				<button
					className={styles.users_info_cta}
					onClick={() => console.log("removed")}
				>
					Remove
				</button>
			</section>
		</div>
	);
};

export default ProfileTile;
