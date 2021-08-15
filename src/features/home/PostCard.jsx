import homeStyles from "./Home.module.css";
import { GoHeart } from "react-icons/go";

export const PostCard = () => {
	return (
		<div className={homeStyles.main_post}>
			<div className={homeStyles.post_layout}>
				<section className={homeStyles.likes_container}>
					<div className={homeStyles.likes_content}>
						<GoHeart className={homeStyles.likes} />
					</div>
				</section>
				<section className={homeStyles.post_content}>Liked by 2 people</section>
			</div>
			<div className={homeStyles.post_layout}>
				<section
					className={`${homeStyles.user_pic_container} ${homeStyles.user_pfp_padding}`}
				>
					<img
						src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
						alt="post_user_pic"
						className={homeStyles.user_pic}
					/>
				</section>
				<section className={homeStyles.post_box}>
					<section className={homeStyles.post_head}>
						Utsav kumar <span>@utsavkumar280</span> <span>. 1h</span>
					</section>
					<section className={homeStyles.post_description}>
						Hello I am Utsav kumar. - An asset is something that puts money in
						your pocket. - A liability is something that takes money out of your
						pocket. - It's not knowing the difference that causes most of the
						financial problems in the world.
					</section>
					{true && (
						<section className={homeStyles.post_description}>
							<img
								src="https://cdn.mos.cms.futurecdn.net/qS8o8LXKrVRhVkmf2AS6u6.jpg"
								alt="post_user_pic"
								className={homeStyles.post_pic}
							/>
						</section>
					)}
					<section className={homeStyles.post_cta}>
						<button>add</button>
					</section>
				</section>
			</div>
		</div>
	);
};
