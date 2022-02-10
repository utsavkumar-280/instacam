import homeStyles from "../Home.module.css";
import { PostCard } from "./PostCard";
import { usePost } from "./postsSlice";

export const PostList = () => {
	const { posts } = usePost();
	return (
		<section className={homeStyles.postList}>
			{posts.map((post) => (
				<PostCard key={post._id} post={post} />
			))}
		</section>
	);
};
