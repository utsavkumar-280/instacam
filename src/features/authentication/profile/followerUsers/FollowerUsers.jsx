import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import styles from "./FollowerUsers.module.css";
import ProfileTile from "../ProfileTile";
import { loadFollowers, resetFollowers, useFollowers } from "./followersSlice";
import { useAuth } from "../../authSlice";

const FollowerUsers = () => {
	const { userName } = useParams();
	const dispatch = useDispatch();
	const { followersDetails, followersStatus } = useFollowers();

	const {
		authentication: { userName: viewerName, token },
	} = useAuth();

	useEffect(() => {
		if (token) {
			dispatch(loadFollowers(userName));
		}
		return () => {
			dispatch(resetFollowers());
		};
	}, [token, dispatch, userName]);

	return (
		followersStatus === "success" && (
			<section className={styles.userList_section}>
				<section className={styles.users_list}>
					{followersDetails?.length === 0 ? (
						<div className={styles.users_empty}>
							<section className={styles.users_info_alt}>
								<h1>No followers</h1>
							</section>
						</div>
					) : (
						followersDetails?.map((follower) => (
							<ProfileTile
								key={follower._id}
								to={`/user-profile/${follower?.userName}`}
								pic={follower?.profilePic}
								name={`${follower?.userId?.firstname} ${follower?.userId?.lastname}`}
								username={`@${follower?.userName}`}
								isForFollower
								followerUserName={follower?.userName}
							/>
						))
					)}
				</section>
			</section>
		)
	);
};

export default FollowerUsers;
