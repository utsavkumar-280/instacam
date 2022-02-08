import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { NavLink, useLocation } from "react-router-dom";
import { ImLink } from "react-icons/im";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useDispatch } from "react-redux";

import EditProfileModal from "./EditProfileModal";
import profileStyles from "./Profile.module.css";
import { logoutUser, useAuth } from "../authSlice";
import {
	useProfile,
	loadUserProfile,
	loadUserPosts,
	resetUserProfile,
} from "./profieSlice";

export const Profile = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { userName } = useParams();
	const currentPath = useLocation().pathname;

	const { profileDetails, postsDetails } = useProfile();

	const dispatch = useDispatch();

	const {
		authentication: {
			userName: viewerUserName,
			name: viewerName,
			profilePic: viewerProfilePic,
		},
	} = useAuth();

	useEffect(() => {
		dispatch(loadUserProfile(userName));
		dispatch(loadUserPosts(userName));

		return () => dispatch(resetUserProfile());
	}, [userName, dispatch]);

	console.log({ currentPath, viewerUserName, userName });
	return (
		<div className={profileStyles.container}>
			{profileDetails && (
				<>
					<header className={profileStyles.head_container}>
						<h2 className={profileStyles.route_head}>{profileDetails?.name}</h2>
						<h2
							className={profileStyles.route_head2}
						>{`${postsDetails?.length} posts`}</h2>
					</header>
					<section className={profileStyles.profile_container}>
						<div className={profileStyles.profile_pic_container}>
							<div
								style={{
									backgroundImage: `url("${profileDetails?.coverPic}")`,
									backgroundPosition: "center",
									backgroundRepeat: "no-repeat",
									backgroundSize: "cover",
									transition: "all 0.25s ease",
								}}
								className={profileStyles.profile_cover}
							/>
							<img
								src={profileDetails?.profilePic}
								alt="profile_pic"
								className={profileStyles.profile_pic}
							/>

							<div className={profileStyles.profile_footer}>
								{viewerUserName === userName ? (
									<>
										<button
											onClick={() => {
												setIsModalOpen(true);
												document.body.style.overflow = "hidden";
											}}
										>
											Edit Profile
										</button>
										<button onClick={() => dispatch(logoutUser())}>
											Logout
										</button>
									</>
								) : (
									<>
										<button>Follow</button>
									</>
								)}
							</div>
						</div>
						<section className={profileStyles.profile_info}>
							<section className={profileStyles.profile_head}>
								{profileDetails?.name && (
									<h2 className={profileStyles.route_head}>
										{profileDetails?.name}
									</h2>
								)}

								{profileDetails?.userName && (
									<h2
										className={profileStyles.route_head2}
									>{`@${profileDetails?.userName}`}</h2>
								)}
							</section>
							{profileDetails?.bio && (
								<p className={profileStyles.profile_bio}>
									{profileDetails?.bio}
								</p>
							)}

							{profileDetails?.location && profileDetails?.website && (
								<div className={profileStyles.profile_links}>
									{profileDetails?.location && (
										<div className={profileStyles.profile_blocks}>
											<HiOutlineLocationMarker
												className={profileStyles.profile_icon}
											/>
											<span>{profileDetails?.location}</span>
										</div>
									)}

									{profileDetails?.website && (
										<div className={profileStyles.profile_blocks}>
											<ImLink className={profileStyles.profile_icon} />
											<a
												href={profileDetails?.website}
												target="_blank"
												rel="noopener noreferrer"
											>
												{profileDetails?.website}
											</a>
										</div>
									)}
								</div>
							)}
							<section className={profileStyles.follow_container}>
								<NavLink
									to={`/user-profile/${userName}/followerUsers`}
									className={
										currentPath === `/user-profile/${userName}/followerUsers`
											? `${profileStyles.follow_info_active}`
											: `${profileStyles.follow_info}`
									}
								>
									<span>{profileDetails?.followCount.followers}</span>
									Followers
								</NavLink>
								<NavLink
									to={`/user-profile/${userName}/followingUsers`}
									className={
										currentPath === `/user-profile/${userName}/followingUsers`
											? `${profileStyles.follow_info_active}`
											: `${profileStyles.follow_info}`
									}
								>
									<span>{profileDetails?.followCount.following}</span>
									Following
								</NavLink>
								<NavLink
									to={`/user-profile/${userName}`}
									className={
										currentPath === `/user-profile/${userName}`
											? `${profileStyles.follow_info_active}`
											: `${profileStyles.follow_info}`
									}
								>
									<span>{postsDetails?.length}</span>
									Posts
								</NavLink>
							</section>
						</section>
					</section>
					<Outlet />
					<div className={profileStyles.home_end} />
					{isModalOpen && <EditProfileModal setIsModalOpen={setIsModalOpen} />}
				</>
			)}
		</div>
	);
};
