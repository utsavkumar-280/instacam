import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import displayReducer from "../features/display/displaySlice";

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		display: displayReducer,
	},
});
