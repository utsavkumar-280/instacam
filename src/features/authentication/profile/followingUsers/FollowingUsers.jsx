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
	const { followingsDetails } = useFollowings();

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
		<section className={styles.userList_section}>
			<section className={styles.users_list}>
				<ProfileTile
					to="/user-profile/rahul"
					pic="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
					name="Utsav Kumar"
					username="@utsavkumar280"
				/>
				<ProfileTile
					to="/user-profile/rahul"
					pic="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
					name="Utsav Kumar"
					username="@utsavkumar280"
				/>
				<ProfileTile
					to="/user-profile/rahul"
					pic="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
					name="Utsav Kumar"
					username="@utsavkumar280"
				/>
				<ProfileTile
					to="/user-profile/rahul"
					pic="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
					name="Utsav Kumar"
					username="@utsavkumar280"
				/>
			</section>
		</section>
	);
};

export default FollowingUsers;
