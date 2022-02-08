import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import styles from "./FollowerUsers.module.css";
import ProfileTile from "../ProfileTile";
import {
	loadFollowers,
	removeAFollower,
	resetFollowers,
	useFollowers,
} from "./followersSlice";
import { useAuth } from "../../authSlice";

const FollowerUsers = () => {
	const { userName } = useParams();
	const dispatch = useDispatch();
	const { followersDetails } = useFollowers();

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

	console.log({ followersDetails });

	return (
		<section className={styles.userList_section}>
			<section className={styles.users_list}>
				<ProfileTile
					to="/user-profile/rahul"
					pic="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
					name="Utsav Kumar"
					username="@utsavkumar280"
					isForFollower
				/>
				<ProfileTile
					to="/user-profile/rahul"
					pic="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
					name="Utsav Kumar"
					username="@utsavkumar280"
					isForFollower
				/>
				<ProfileTile
					to="/user-profile/rahul"
					pic="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
					name="Utsav Kumar"
					username="@utsavkumar280"
					isForFollower
				/>
			</section>
		</section>
	);
};

export default FollowerUsers;
