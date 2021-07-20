import homeStyles from "./Home.module.css";

export const Home = () => {
	return (
		<div className={homeStyles.container}>
			<header className={homeStyles.head_container}>
				<h1>Hello this is Home.</h1>
			</header>

			<section className={homeStyles.addpost}>
				<h1>Add post</h1>
			</section>

			<section className={homeStyles.postList}>
				<h1>Hello this is Home.</h1>
				<h1>Hello this is Home.</h1>
				<h1>Hello this is Home.</h1>
				<h1>Hello this is Home.</h1>
			</section>
		</div>
	);
};
