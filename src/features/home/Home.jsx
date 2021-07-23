import homeStyles from "./Home.module.css";
import { AddPost } from "./AddPost";
import { PostList } from "./PostList";

export const Home = () => {
	return (
		<div className={homeStyles.container}>
			<header className={homeStyles.head_container}>
				<p className={homeStyles.route_head}>Home</p>
			</header>
			<AddPost />

			<PostList />
		</div>
	);
};
