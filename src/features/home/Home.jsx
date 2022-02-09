import { useState } from "react";
import axios from "axios";

import { CLOUDINARY_URL, CLOUDINARY_PRESET } from "../utils";
import homeStyles from "./Home.module.css";
import { AddPost } from "./AddPost/index";
import { PostList } from "./posts/PostList";
import PreviewModal from "../authentication/profile/PreviewModal";

export const Home = () => {
	const [inputImg, setInputImg] = useState("");
	const [postImgPreview, setPostImgPreview] = useState("");
	const [postImgFile, setPostImgFile] = useState(null);
	const [delToken, setDelToken] = useState("");

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

			const {
				data: { delete_token, url },
			} = await axios.post(`${CLOUDINARY_URL}/image/upload`, formData);

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

			await axios.post(`${CLOUDINARY_URL}/delete_by_token`, formData);
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

	return (
		<div className={homeStyles.container}>
			<header className={homeStyles.head_container}>
				<p className={homeStyles.route_head}>Home</p>
			</header>
			<AddPost
				postImgPreview={postImgPreview}
				setPostImgPreview={setPostImgPreview}
				postImgFile={postImgFile}
				setPostImgFile={setPostImgFile}
				delToken={delToken}
				setDelToken={setDelToken}
				inputImg={inputImg}
				setInputImg={setInputImg}
				onChangeHandler={onChangeHandler}
				clearUpdates={clearUpdates}
			/>
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
