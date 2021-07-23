import homeStyles from "./Home.module.css";

export const PostList = () => {
	return (
		<section className={homeStyles.postList}>
			<div className={`${homeStyles.main_post} ${homeStyles.post_layout}`}>
				<section className={homeStyles.user_pic_container}>
					<img
						src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
						alt="post_user_pic"
						className={homeStyles.user_pic}
					/>
				</section>
				<section className={homeStyles.post_content}></section>
			</div>
		</section>
	);
};
