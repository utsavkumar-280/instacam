import homeStyles from "../Home.module.css";
import { IoCloudUpload } from "react-icons/io5";

export const ImageUploader = ({ imgDrop, setImgDrop }) => {
	return (
		<div
			className={
				imgDrop
					? homeStyles.img_uploader_container_active
					: homeStyles.img_uploader_container
			}
		>
			<IoCloudUpload />
			<h2>Drag and drop your File here, or Click to select your file</h2>
		</div>
	);
};
