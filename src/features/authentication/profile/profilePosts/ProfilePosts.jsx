import styles from "./Profile.module.css";

import { PostCard } from "../../../home/posts/PostCard";

const ProfilePosts = () => {
	return (
		<section className={styles.postList}>
			<PostCard deleteBtn />
			<PostCard deleteBtn />
		</section>
	);
};

export default ProfilePosts;
