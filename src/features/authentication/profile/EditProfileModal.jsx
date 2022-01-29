import { useState } from "react";
import axios from "axios";
import { XIcon } from "@heroicons/react/solid";
import { AiOutlineCamera } from "react-icons/ai";

import style from "./Modal.module.css";
import PreviewModal from "./PreviewModal";
import { CLOUDINARY_URL, CLOUDINARY_PRESET } from "../../utils";

const EditProfileModal = ({ setIsModalOpen }) => {
	const [inputProfile, setInputProfile] = useState(
		"https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
	);
	const [inputCover, setInputCover] = useState(
		"https://i.postimg.cc/j2KQHrWL/hero1.jpg"
	);
	const [inputBio, setInputBio] = useState("");
	const [inputLocation, setInputLocation] = useState("");
	const [inputWebsite, setInputWebsite] = useState("");

	const [coverPreview, setCoverPreview] = useState("");
	const [profilePreview, setProfilePreview] = useState("");

	const [coverPicFile, setCoverPicFile] = useState(null);
	const [profilePicFile, setProfilePicFile] = useState(null);

	const [coverDeleteToken, setCoverDeleteToken] = useState("");
	const [profileDeleteToken, setProfileDeleteToken] = useState("");

	const onChangeHandler = (event, type) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		if (type === "cover") {
			setCoverPicFile(file);
			reader.onloadend = () => {
				setCoverPreview(reader.result);
			};
		}

		if (type === "profile") {
			setProfilePicFile(file);
			reader.onloadend = () => {
				setProfilePreview(reader.result);
			};
		}
	};

	const uploadHandler = async (
		file,
		setFile,
		setToken,
		setInput,
		setPreview,
		setIsUploading
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
		} catch (error) {
			console.log(error);
			setIsUploading(false);
		}
	};

	const deleteHandler = async (type, setToken) => {
		try {
			const formData = new FormData();
			formData.append("upload_preset", CLOUDINARY_PRESET);
			if (type === "cover") {
				formData.append("token", coverDeleteToken);
			}
			if (type === "profile") {
				formData.append("token", profileDeleteToken);
			}

			await axios.post(`${CLOUDINARY_URL}/delete_by_token`, formData);
			setToken("");
		} catch (error) {
			console.log(error);
			setToken("");
		}
	};

	const clearUpdates = async () => {
		if (coverDeleteToken) {
			await deleteHandler("cover", setCoverDeleteToken);
		}
		if (profileDeleteToken) {
			await deleteHandler("profile", setProfileDeleteToken);
		}
		setInputBio("");
		setInputLocation("");
		setInputWebsite("");
		setIsModalOpen(false);
	};

	return (
		<div className={style.main_conatiner}>
			<div className={style.main_content}>
				<section className={style.modal_container}>
					<header className={style.header}>
						<h1>Edit Profile</h1>
						<div
							className={style.header_cta_container}
							onClick={() => {
								document.body.style.overflow = "overlay";
								clearUpdates();
							}}
						>
							<XIcon className={style.header_cta} />
						</div>
					</header>
					<section className={style.content}>
						<div
							style={{
								backgroundImage: `url(${inputCover})`,
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								transition: "all 0.25s ease",
							}}
							className={style.profile_cover}
						>
							<input
								type="file"
								id="input_profile"
								accept="image/*"
								hidden
								onChange={(event) => onChangeHandler(event, "cover")}
							/>
							<label
								htmlFor="input_profile"
								className={style.cover_cta_container}
							>
								<AiOutlineCamera className={style.cover_cta} />
							</label>
						</div>
						<div
							style={{
								backgroundImage: `url(${inputProfile})`,
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								transition: "all 0.25s ease",
							}}
							alt="profile_pic"
							className={style.profile_pic}
						>
							<input
								type="file"
								id="input_cover"
								accept="image/*"
								hidden
								onChange={(event) => onChangeHandler(event, "profile")}
							/>
							<label
								htmlFor="input_cover"
								className={style.cover_cta_container}
							>
								<AiOutlineCamera className={style.cover_cta} />
							</label>
						</div>
						<div className={style.input_container}>
							<div className={style.input_controller}>
								<label htmlFor="bio">Bio</label>
								<input
									type="text"
									name="bio"
									className={style.profile_input}
									value={inputBio}
									onChange={(e) => setInputBio(e.target.value)}
								/>
							</div>
							<div className={style.input_controller}>
								<label htmlFor="location">Location</label>
								<input
									type="text"
									name="location"
									className={style.profile_input}
									value={inputLocation}
									onChange={(e) => setInputLocation(e.target.value)}
								/>
							</div>
							<div className={style.input_controller}>
								<label htmlFor="website">Website</label>
								<input
									type="text"
									name="website"
									className={style.profile_input}
									value={inputWebsite}
									onChange={(e) => setInputWebsite(e.target.value)}
								/>
							</div>
						</div>
					</section>
					<footer className={style.footer}>
						<button className={style.update_cta}>Update</button>
						<button
							className={style.cancel_cta}
							onClick={() => {
								document.body.style.overflow = "overlay";
								clearUpdates();
							}}
						>
							Cancel
						</button>
					</footer>
				</section>
			</div>
			{coverPreview && (
				<PreviewModal
					preview={coverPreview}
					setPreview={setCoverPreview}
					file={coverPicFile}
					setFile={setCoverPicFile}
					uploadHandler={uploadHandler}
					setToken={setCoverDeleteToken}
					setInput={setInputCover}
				/>
			)}
			{profilePreview && (
				<PreviewModal
					preview={profilePreview}
					setPreview={setProfilePreview}
					file={profilePicFile}
					setFile={setProfilePicFile}
					uploadHandler={uploadHandler}
					setToken={setProfileDeleteToken}
					setInput={setInputProfile}
				/>
			)}
		</div>
	);
};

export default EditProfileModal;
