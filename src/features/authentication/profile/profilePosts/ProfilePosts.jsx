import styles from "./Profile.module.css";
import { CircleSpinner } from "react-spinners-kit";

import { PostCard } from "../../../home/posts/PostCard";
import { useProfile } from "../profieSlice";

const ProfilePosts = () => {
	const { postsDetails, postsDetailsStatus } = useProfile();
	return postsDetailsStatus === "success" ? (
		postsDetails.length !== 0 ? (
			<section className={styles.postList}>
				{postsDetails.map((post) => (
					<PostCard key={post._id} post={post} deleteBtn updatePr />
				))}
			</section>
		) : (
			<section className={styles.userList_section}>
				<section className={styles.users_list}>
					<div className={styles.users_empty}>
						<section className={styles.users_info_alt}>
							<h1>No posts</h1>
						</section>
					</div>
				</section>
			</section>
		)
	) : (
		<section className={styles.loaderContainer}>
			<CircleSpinner size={25} loading c />
		</section>
	);
};

export default ProfilePosts;
