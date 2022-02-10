import styles from "./Profile.module.css";

import { PostCard } from "../../../home/posts/PostCard";
import { useProfile } from "../profieSlice";

const ProfilePosts = () => {
	const { postsDetails } = useProfile();
	return (
		<section className={styles.postList}>
			{postsDetails.map((post) => (
				<PostCard key={post._id} post={post} deleteBtn updatePr />
			))}
		</section>
	);
};

export default ProfilePosts;
