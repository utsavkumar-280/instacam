import { CircleSpinner } from "react-spinners-kit";
import homeStyles from "../Home.module.css";
import { PostCard } from "./PostCard";
import { usePost } from "./postsSlice";

export const PostList = () => {
	const { posts, status } = usePost();

	return status === "success" ? (
		posts.length !== 0 ? (
			<section className={homeStyles.postList}>
				{posts.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
			</section>
		) : (
			<div className={homeStyles.noPostContainer}>
				<div className={homeStyles.noPost}>
					Follow someone to see their posts
				</div>
			</div>
		)
	) : (
		<section className={homeStyles.loaderContainer}>
			<CircleSpinner size={25} loading />
		</section>
	);
};
