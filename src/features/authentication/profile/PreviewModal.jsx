import { useState } from "react";

import style from "./Modal.module.css";
import { XIcon } from "@heroicons/react/solid";

const PreviewModal = ({
	preview,
	setPreview,
	file,
	setFile,
	uploadHandler,
	setToken,
	setInput,
}) => {
	const [isUploading, setIsUploading] = useState(false);

	return (
		<div className={style.main_conatiner_alt}>
			<div className={style.main_content}>
				<section className={style.modal_container}>
					<header className={style.header}>
						<h1>Preview</h1>
						<div
							className={style.header_cta_container}
							onClick={() => {
								setPreview("");
								setFile(null);
							}}
						>
							<XIcon className={style.header_cta} />
						</div>
					</header>
					<section className={style.content_alt}>
						<img src={preview} alt="img_preview" className={style.preview} />
					</section>
					<footer className={style.footer}>
						<button
							className={style.update_cta}
							onClick={() => {
								if (file) {
									console.log(file);
									uploadHandler(
										file,
										setFile,
										setToken,
										setInput,
										setPreview,
										setIsUploading
									);
								}
							}}
						>
							{isUploading ? "Uploading..." : "Upload"}
						</button>
					</footer>
				</section>
			</div>
		</div>
	);
};

export default PreviewModal;
