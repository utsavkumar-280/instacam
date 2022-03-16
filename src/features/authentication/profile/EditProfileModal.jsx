import { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { AiOutlineCamera } from "react-icons/ai";
import { CircleSpinner } from "react-spinners-kit";
import { useDispatch } from "react-redux";

import style from "./Modal.module.css";
import PreviewModal from "./PreviewModal";
import { CLOUDINARY_URL, CLOUDINARY_PRESET } from "../../utils";
import { useProfile, updateProfile } from "./profieSlice";

const EditProfileModal = ({ setIsModalOpen }) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const dispatch = useDispatch();
	const {
		profileDetails: { userName, coverPic, profilePic, bio, location, website },
	} = useProfile();

	const [inputCover, setInputCover] = useState(coverPic);
	const [inputProfile, setInputProfile] = useState(profilePic);

	const [inputBio, setInputBio] = useState(bio);
	const [inputLocation, setInputLocation] = useState(location);
	const [inputWebsite, setInputWebsite] = useState(website);

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

			const response = await fetch(`${CLOUDINARY_URL}/image/upload`, {
				method: "POST",
				body: formData,
			});
			const { delete_token, url } = await response.json();

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
				await fetch(`${CLOUDINARY_URL}/delete_by_token`, {
					method: "POST",
					body: formData,
				});
				setToken("");
				setInputCover(coverPic);
			}
			if (type === "profile") {
				formData.append("token", profileDeleteToken);
				await fetch(`${CLOUDINARY_URL}/delete_by_token`, {
					method: "POST",
					body: formData,
				});
				setToken("");
				setInputProfile(profilePic);
			}
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
		setInputBio(bio);
		setInputLocation(location);
		setInputWebsite(website);
		setIsModalOpen(false);
	};

	const updateHandler = async () => {
		try {
			setIsUpdating(true);
			const updateProfileResponse = await dispatch(
				updateProfile({
					userName,
					inputCover,
					inputProfile,
					inputBio,
					inputLocation,
					inputWebsite,
				})
			);

			if (updateProfileResponse.meta.requestStatus === "fulfilled") {
				setIsUpdating(false);
				setIsModalOpen(false);
			}
		} catch (error) {
			console.log(error);
		}
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
						<button
							className={style.update_cta}
							onClick={() => {
								document.body.style.overflow = "overlay";
								updateHandler();
							}}
						>
							{isUpdating ? (
								<>
									<div style={{ paddingRight: "1rem" }}>Updating </div>
									<section className={style.loaderContainer}>
										<CircleSpinner size={15} loading />
									</section>
								</>
							) : (
								"Update"
							)}
						</button>
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
