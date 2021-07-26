import homeStyles from "./Home.module.css";
import { IoImageOutline } from "react-icons/io5";

export const AddPost = () => {
	return (
		<div className={homeStyles.add_post}>
			<section className={homeStyles.post_layout}>
				<div className={homeStyles.user_pic_container}>
					<img
						src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
						alt="post_user_pic"
						className={homeStyles.user_pic}
					/>
				</div>
				<form className={homeStyles.form_conatiner}>
					<section className={homeStyles.form_input}>
						<textarea placeholder="What's Happening?" />
						{/* <input type="file" name="" id="" /> */}
					</section>
					<section className={homeStyles.form_cta_container}>
						<button type="button" className={homeStyles.form_upload}>
							<IoImageOutline className={homeStyles.form_upload_cta} />
						</button>
						<button
							type="button"
							className={homeStyles.form_cta}
							disabled={false}
						>
							Post
						</button>
					</section>
				</form>
			</section>
			<div className={homeStyles.divider} />
		</div>
	);
};
