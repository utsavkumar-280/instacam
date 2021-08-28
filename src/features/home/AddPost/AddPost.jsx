import { useState } from "react";
import homeStyles from "../Home.module.css";
import { ImageUploader } from "./ImageUploader";
import { IoImageOutline, IoCloudUpload } from "react-icons/io5";

export const AddPost = () => {
	const [imgDrop, setImgDrop] = useState(false);
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
						<ImageUploader imgDrop={imgDrop} setImgDrop={setImgDrop} />
					</section>
					<section className={homeStyles.form_cta_container}>
						<button
							type="button"
							className={homeStyles.form_upload}
							onClick={() => setImgDrop((prev) => !prev)}
						>
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
