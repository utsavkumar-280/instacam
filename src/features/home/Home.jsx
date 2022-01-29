import { useState } from "react";
import homeStyles from "./Home.module.css";
import { AddPost } from "./AddPost/index";
import { PostList } from "./PostList";
import PreviewModal from "../authentication/profile/PreviewModal";

export const Home = () => {
	const [postImgPreview, setPostImgPreview] = useState("");
	const [postImgFile, setPostImgFile] = useState(null);
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
			/>
			<PostList />
			<div className={homeStyles.home_end} />
			{postImgPreview && (
				<PreviewModal
					preview={postImgPreview}
					setPreview={setPostImgPreview}
					file={postImgFile}
					setFile={setPostImgFile}
				/>
			)}
		</div>
	);
};
