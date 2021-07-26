import profileStyles from "./Profile.module.css";
import { ImLink } from "react-icons/im";
import { HiOutlineLocationMarker } from "react-icons/hi";

export const Profile = () => {
	return (
		<div className={profileStyles.container}>
			<header className={profileStyles.head_container}>
				<h2 className={profileStyles.route_head}>Utsav Kumar</h2>
				<h2 className={profileStyles.route_head2}>2 posts</h2>
			</header>
			<section className={profileStyles.profile_container}>
				<div className={profileStyles.profile_pic_container}>
					<div
						style={{
							background: `url("https://i.postimg.cc/j2KQHrWL/hero1.jpg")`,
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							transition: "all 0.25s ease",
						}}
						className={profileStyles.profile_cover}
					/>
					<img
						src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
						alt="profile_pic"
						className={profileStyles.profile_pic}
					/>

					<div className={profileStyles.profile_footer}>
						<button>Edit Profile</button>
						<button>Logout</button>
					</div>
				</div>
				<section className={profileStyles.profile_info}>
					<section className={profileStyles.profile_head}>
						<h2 className={profileStyles.route_head}>Utsav kumar</h2>
						<h2 className={profileStyles.route_head2}>@utsavkumar280</h2>
					</section>
					<p className={profileStyles.profile_bio}>
						Hello I'm Utsav. Im a frontend developer. Hello I'm Utsav. Im a
						frontend developer.Hello I'm Utsav. Im a frontend developer.
					</p>
					<div className={profileStyles.profile_links}>
						<div className={profileStyles.profile_blocks}>
							<HiOutlineLocationMarker className={profileStyles.profile_icon} />
							<span>India</span>
						</div>
						<div className={profileStyles.profile_blocks}>
							<ImLink className={profileStyles.profile_icon} />
							<a
								href="https://youteee.codes"
								target="_blank"
								rel="noopener noreferrer"
							>
								youteee.codes
							</a>
						</div>
					</div>
					<section className={profileStyles.follow_container}>
						<div className={profileStyles.follow_info}>
							<span>100</span>
							Followers
						</div>
						<div className={profileStyles.follow_info}>
							<span>102</span>
							Following
						</div>
					</section>
				</section>
			</section>
		</div>
	);
};
