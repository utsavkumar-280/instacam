import style from "./Modal.module.css";
import { XIcon } from "@heroicons/react/solid";

const EditProfileModal = ({ setIsModalOpen }) => {
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
								setIsModalOpen(false);
							}}
						>
							<XIcon className={style.header_cta} />
						</div>
					</header>
					<section className={style.content}>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
						<h1>Utsav Kumar</h1>
						<h1>@utsavkumar280</h1>
					</section>
					<footer className={style.footer}>
						<button className={style.update_cta}>Update</button>
						<button
							className={style.cancel_cta}
							onClick={() => {
								document.body.style.overflow = "overlay";
								setIsModalOpen(false);
							}}
						>
							Cancel
						</button>
					</footer>
				</section>
			</div>
		</div>
	);
};

export default EditProfileModal;
