import React, { useEffect } from "react";
import { Routes, useLocation } from "react-router";
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

function App() {
	const dispatch = useDispatch();
	const primary = usePrimarySelector();
	const theme = useThemeSelector();
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
