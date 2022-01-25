import styles from "./followerUsers/FollowerUsers.module.css";
import { Link } from "react-router-dom";

const ProfileTile = ({ to, pic, name, username, removeBtn }) => {
	return (
		<Link to={to} className={styles.users}>
			<img src={pic} alt="post_user_pic" className={styles.users_pic} />
			<section className={styles.users_info_container}>
				<section className={styles.users_info}>
					<h1>{name}</h1>
					<h2>{username}</h2>
				</section>
				{removeBtn && <buton className={styles.users_info_cta}>Remove</buton>}
			</section>
		</Link>
	);
};

export default ProfileTile;
