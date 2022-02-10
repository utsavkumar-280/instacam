import { useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { IoImageOutline } from "react-icons/io5";
import { XIcon } from "@heroicons/react/solid";

import { CLOUDINARY_URL, CLOUDINARY_PRESET } from "../utils";
import homeStyles from "./Home.module.css";
import { PostList } from "./posts/PostList";
import PreviewModal from "../authentication/profile/PreviewModal";
import { createPost } from "./posts/postsSlice";
import {
	postInitialState,
	postFormReducer,
	setCaption,
	setCaptionError,
	clearError,
	clearForm,
} from "../utils";
import { useAuth } from "../authentication/authSlice";

export const Home = () => {
	const [inputImg, setInputImg] = useState("");
	const [postImgPreview, setPostImgPreview] = useState("");
	const [postImgFile, setPostImgFile] = useState(null);
	const [delToken, setDelToken] = useState("");
	const [isPosting, setIsPosting] = useState(false);

	const {
		authentication: { profilePic },
	} = useAuth();

	const dispatch = useDispatch();
	const [formState, formDispatch] = useReducer(
		postFormReducer,
		postInitialState
	);

	const onChangeHandler = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		setPostImgFile(file);
		reader.onloadend = () => {
			setPostImgPreview(reader.result);
		};
	};

	const uploadHandler = async (
		file,
		setFile,
		setToken,
		setInput,
		setPreview,
		setIsUploading,
		isPost
	) => {
		try {
			setIsUploading(true);

			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", CLOUDINARY_PRESET);

			const response = await fetch(`${CLOUDINARY_URL}/image/upload`, {
				method: "POST",
				body: formData,
			});
			const { delete_token, url } = await response.json();

			console.log({ delete_token, url });

			setToken(delete_token);
			setInput(url);
			setPreview("");
			setFile(null);
			setIsUploading(false);
			if (isPost) {
				document.body.style.overflow = "overlay";
			}
		} catch (error) {
			console.log(error);
			setIsUploading(false);
			if (isPost) {
				document.body.style.overflow = "overlay";
			}
		}
	};

	const deleteHandler = async (setToken) => {
		try {
			const formData = new FormData();
			formData.append("upload_preset", CLOUDINARY_PRESET);
			formData.append("token", delToken);

			await fetch(`${CLOUDINARY_URL}/delete_by_token`, {
				method: "POST",
				body: formData,
			});
			setToken("");
			setInputImg("");
		} catch (error) {
			console.log(error);
			setToken("");
			setInputImg("");
		}
	};

	const clearUpdates = async () => {
		if (delToken) {
			await deleteHandler(setDelToken);
		}
	};

	const createPostHandler = async () => {
		setIsPosting(true);
		formDispatch(clearError());
		if (/^\s*$/.test(formState.caption)) {
			formDispatch(setCaptionError({ error: "Add a caption" }));
			setIsPosting(false);
		} else {
			const postDetails = {
				caption: formState.caption,
				image: inputImg,
			};

			const postResponse = await dispatch(createPost({ post: postDetails }));

			if (postResponse.meta.requestStatus === "fulfilled") {
				setIsPosting(false);
				formDispatch(clearForm());
				setInputImg("");
				setDelToken("");
			}
		}
	};

	console.log({ inputImg, postImgPreview, postImgFile, delToken, formState });
	return (
		<div className={homeStyles.container}>
			<header className={homeStyles.head_container}>
				<p className={homeStyles.route_head}>Home</p>
			</header>
			<div className={homeStyles.add_post}>
				<section className={homeStyles.post_layout}>
					<div className={homeStyles.user_pic_container}>
						<img
							src={profilePic}
							alt="post_user_pic"
							className={homeStyles.user_pic}
						/>
					</div>
					<form
						className={
							formState.captionError
								? `${homeStyles.form_conatiner_alt} ${homeStyles.form_conatiner}`
								: `${homeStyles.form_conatiner}`
						}
					>
						<textarea
							placeholder="What's Happening?"
							value={formState.caption}
							onChange={(e) =>
								formDispatch(setCaption({ caption: e.target.value }))
							}
							onFocus={() => formDispatch(setCaptionError({ error: "" }))}
						/>
						{formState?.captionError && (
							<div className={homeStyles.caption_error}>
								{formState?.captionError}
							</div>
						)}

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
								onClick={createPostHandler}
							>
								{isPosting ? "Posting..." : "Post"}
							</button>
						</section>
					</form>
				</section>
				<div className={homeStyles.divider} />
			</div>
			<PostList />
			<div className={homeStyles.home_end} />
			{postImgPreview && (
				<PreviewModal
					preview={postImgPreview}
					setPreview={setPostImgPreview}
					file={postImgFile}
					setFile={setPostImgFile}
					uploadHandler={uploadHandler}
					setToken={setDelToken}
					setInput={setInputImg}
					isPost={true}
				/>
			)}
		</div>
	);
};
