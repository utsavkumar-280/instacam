import homeStyles from "../Home.module.css";
import { PostCard } from "./PostCard";

export const PostList = () => {
	return (
		<section className={homeStyles.postList}>
			<PostCard />
			<PostCard />
		</section>
	);
};
