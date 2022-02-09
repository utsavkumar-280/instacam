import { useEffect } from "react";
import { useParams } from "react-router";
import styles from "../followerUsers/FollowerUsers.module.css";
import { useDispatch } from "react-redux";

import ProfileTile from "../ProfileTile";
import {
	loadFollowings,
	resetFollowings,
	useFollowings,
} from "./followingsSlice";
import { useAuth } from "../../authSlice";

export const FollowingUsers = () => {
	const { userName } = useParams();
	const dispatch = useDispatch();
	const { followingsDetails, followingsStatus } = useFollowings();

	const {
		authentication: { userName: viewerName, token },
	} = useAuth();

	useEffect(() => {
		if (token) {
			dispatch(loadFollowings(userName));
		}
		return () => {
			dispatch(resetFollowings());
		};
	}, [token, dispatch, userName]);

	console.log({ followingsDetails });
	return (
		followingsStatus === "success" && (
			<section className={styles.userList_section}>
				<section className={styles.users_list}>
					{followingsDetails?.length === 0 ? (
						<div className={styles.users_empty}>
							<section className={styles.users_info_alt}>
								<h1>No one following</h1>
							</section>
						</div>
					) : (
						followingsDetails?.map((following) => (
							<ProfileTile
								key={following._id}
								to={`/user-profile/${following?.userName}`}
								pic={following?.profilePic}
								name={`${following?.userId?.firstname} ${following?.userId?.lastname}`}
								username={`@${following?.userName}`}
							/>
						))
					)}
				</section>
			</section>
		)
	);
};

export default FollowingUsers;
