import homeStyles from "../Home.module.css";
import { IoImageOutline } from "react-icons/io5";
import { XIcon } from "@heroicons/react/solid";

export const AddPost = ({
	postImgPreview,
	setPostImgPreview,
	postImgFile,
	setPostImgFile,
	delToken,
	setDelToken,
	inputImg,
	setInputImg,
	onChangeHandler,
	clearUpdates,
}) => {
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
					<textarea placeholder="What's Happening?" />
					{inputImg && (
						<div className={homeStyles.form_img_conatiner}>
							<img src={inputImg} alt="post_img" />
							<div
								className={homeStyles.header_cta_container}
								onClick={clearUpdates}
							>
								<XIcon className={homeStyles.header_cta} />
							</div>
						</div>
					)}

					<section className={homeStyles.form_cta_container}>
						<input
							type="file"
							id="input_postImg"
							hidden
							onChange={(event) => {
								document.body.style.overflow = "hidden";
								onChangeHandler(event);
							}}
						/>
						<label htmlFor="input_postImg" className={homeStyles.form_upload}>
							<IoImageOutline className={homeStyles.form_upload_cta} />
						</label>
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
