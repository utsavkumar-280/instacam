import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authentication/authSlice";
import profileReducer from "../features/authentication/profile/profieSlice";
import followersReducer from "../features/authentication/profile/followerUsers/followersSlice";
import followingsReducer from "../features/authentication/profile/followingUsers/followingsSlice";
import postsReducer from "../features/home/posts/postsSlice";
import displayReducer from "../features/display/displaySlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		profile: profileReducer,
		followers: followersReducer,
		followings: followingsReducer,
		posts: postsReducer,
		display: displayReducer,
	},
});
