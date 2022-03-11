import React, { useEffect } from "react";
import { Routes } from "react-router";
import "./App.css";
import { useDispatch } from "react-redux";
import {
	usePrimarySelector,
	useThemeSelector,
} from "./features/display/displaySlice";
import {
	AuthRoute,
	PrivateRoute,
	Login,
	Signup,
	Profile,
	FollowerUsers,
	FollowingUsers,
	ProfilePosts,
	Nav,
	PhoneNav,
	Explore,
	Home,
	Display,
	Notification,
} from "./features";
import setAxiosErrorHandler from "./features/authentication/utils/setAxiosErrorHandler";
import setAuthHeader from "./features/authentication/utils/setAuthHeader";
import { useAuth } from "./features/authentication/authSlice";
import { loadAllUsers } from "./features/explore/usersSlice";
import { loadPosts } from "./features/home/posts/postsSlice";
import { loadNotifications } from "./features/authentication/authSlice";

function App() {
	const dispatch = useDispatch();
	const primary = usePrimarySelector();
	const theme = useThemeSelector();

	const {
		authentication: { token },
	} = useAuth();

	if (token) {
		setAuthHeader(token);
	}

	useEffect(() => {
		// console.log("axios error handler executed");
		setAxiosErrorHandler(dispatch);
	}, [token, dispatch]);

	useEffect(() => {
		if (token) {
			dispatch(loadAllUsers());
			dispatch(loadPosts());
			dispatch(loadNotifications());
		}
	}, [token, dispatch]);

	return (
		<div className={`app-container ${primary} ${theme}`}>
			<div className="app-main">
				<div className="nav-container">
					<Nav />
				</div>

				<div className="main-routes">
					<Routes>
						<AuthRoute path="/login" element={<Login />} />
						<AuthRoute path="/signup" element={<Signup />} />

						<PrivateRoute path="/" element={<Home />} />
						<PrivateRoute path="/user-profile/:userName" element={<Profile />}>
							<PrivateRoute path="/" element={<ProfilePosts />} />
							<PrivateRoute path="followerUsers" element={<FollowerUsers />} />
							<PrivateRoute
								path="followingUsers"
								element={<FollowingUsers />}
							/>
						</PrivateRoute>
						<PrivateRoute path="/display" element={<Display />} />
						<PrivateRoute path="/search" element={<Explore />} />
						<PrivateRoute path="/notification" element={<Notification />} />
					</Routes>
				</div>
				<div className="explore-container">
					<Explore />
				</div>
				<PhoneNav />
			</div>
		</div>
	);
}

export default App;
