import styles from "../followerUsers/FollowerUsers.module.css";
import ProfileTile from "../ProfileTile";

export const FollowingUsers = () => {
	return (
		<section className={styles.userList_section}>
			<section className={styles.users_list}>
				<ProfileTile
					to="/user-profile/rahul"
					pic="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
					name="Utsav Kumar"
					username="@utsavkumar280"
				/>
				<ProfileTile
					to="/user-profile/rahul"
					pic="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
					name="Utsav Kumar"
					username="@utsavkumar280"
				/>
				<ProfileTile
					to="/user-profile/rahul"
					pic="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
					name="Utsav Kumar"
					username="@utsavkumar280"
				/>
				<ProfileTile
					to="/user-profile/rahul"
					pic="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
					name="Utsav Kumar"
					username="@utsavkumar280"
				/>
			</section>
		</section>
	);
};

export default FollowingUsers;
