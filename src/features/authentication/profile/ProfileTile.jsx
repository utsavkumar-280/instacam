import styles from "./followerUsers/FollowerUsers.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { removeAFollower } from "./followerUsers/followersSlice";
import { useAuth } from "../authSlice";
import { useProfile } from "./profieSlice";

const ProfileTile = ({
	to,
	pic,
	name,
	username,
	isForFollower,
	followerUserName,
}) => {
	const dispatch = useDispatch();
	const {
		authentication: { userName },
	} = useAuth();

	const { profileDetails } = useProfile();

	return isForFollower ? (
		userName === profileDetails?.userName ? (
			<div className={styles.users}>
				<img src={pic} alt="post_user_pic" className={styles.users_pic} />
				<section className={styles.users_info_container}>
					<Link to={to} className={styles.users_info}>
						<h1>{name}</h1>
						<h2>{username}</h2>
					</Link>
					<button
						className={styles.users_info_cta}
						onClick={() =>
							dispatch(removeAFollower({ userName: followerUserName }))
						}
					>
						Remove
					</button>
				</section>
			</div>
		) : (
			<Link to={to} className={styles.users}>
				<img src={pic} alt="post_user_pic" className={styles.users_pic} />
				<section className={styles.users_info_container}>
					<section className={styles.users_info_alt}>
						<h1>{name}</h1>
						<h2>{username}</h2>
					</section>
				</section>
			</Link>
		)
	) : (
		<Link to={to} className={styles.users}>
			<img src={pic} alt="post_user_pic" className={styles.users_pic} />
			<section className={styles.users_info_container}>
				<section className={styles.users_info_alt}>
					<h1>{name}</h1>
					<h2>{username}</h2>
				</section>
			</section>
		</Link>
	);
};

export default ProfileTile;
