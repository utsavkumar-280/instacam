import { useEffect, useState } from "react";
import { CircleSpinner } from "react-spinners-kit";

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
	isPost,
}) => {
	const [isUploading, setIsUploading] = useState(false);

	useEffect(() => {
		return () => {
			setIsUploading(false);
		};
	}, []);

	return (
		<div className={style.main_conatiner_alt}>
			<div className={style.main_content}>
				<section className={style.modal_container}>
					<header className={style.header}>
						<h1>Preview</h1>
						<div
							className={style.header_cta_container}
							onClick={() => {
								document.body.style.overflow = "overlay";
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
									uploadHandler(
										file,
										setFile,
										setToken,
										setInput,
										setPreview,
										setIsUploading,
										isPost
									);
								}
							}}
						>
							{isUploading ? (
								<>
									<div style={{ paddingRight: "1rem" }}>Uploading </div>
									<section className={style.loaderContainer}>
										<CircleSpinner size={15} loading />
									</section>
								</>
							) : (
								"Upload"
							)}
						</button>
					</footer>
				</section>
			</div>
		</div>
	);
};

export default PreviewModal;
