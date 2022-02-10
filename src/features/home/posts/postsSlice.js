import axios from "axios";
import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_URL } from "../../utils";
import { logoutUser } from "../../authentication/authSlice";
import {
	likeUserPost,
	deleteUserPost,
} from "../../authentication/profile/profieSlice";
import { followUsers } from "../../authentication/profile/followerUsers/followersSlice";

export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
	const {
		data: { response },
	} = await axios.get(`${API_URL}/posts`);

	return response;
});

export const createPost = createAsyncThunk(
	"posts/createPost",
	async ({ post }) => {
		const {
			data: { response },
		} = await axios.post(`${API_URL}/posts`, { ...post });

		return response;
	}
);

export const openLikesModal = createAsyncThunk(
	"posts/openLikesModal",
	async ({ postId }) => {
		const {
			data: { response },
		} = await axios.get(`${API_URL}/posts/${postId}/likedby`);

		return response;
	}
);

const postsSlice = createSlice({
	name: "post",
	initialState: {
		posts: [],
		status: "idle",
		usersWhoLikedPost: [],
		showLikesModal: false,
	},
	reducers: {
		closeLikesModal: (state, action) => {
			state.usersWhoLikedPost = [];
			state.showLikesModal = false;
		},
	},
	extraReducers: {
		[loadPosts.fulfilled]: (state, action) => {
			state.posts = action.payload;
			state.status = "success";
		},
		[loadPosts.pending]: (state, action) => {
			state.status = "loading";
		},
		[loadPosts.rejected]: (state, action) => {
			console.log(action.error.message);
			state.status = "failure";
		},

		[createPost.fulfilled]: (state, action) => {
			state.posts.unshift(action.payload);
		},
		[createPost.rejected]: (state, action) => {
			console.log(action.error.message);
		},

		[openLikesModal.fulfilled]: (state, action) => {
			state.showLikesModal = true;
			state.usersWhoLikedPost = action.payload;
		},
		[openLikesModal.rejected]: (state, action) => {
			console.log(action.error.message);
		},

		[likeUserPost.fulfilled]: (state, action) => {
			const index = state.posts.findIndex(
				(post) => post._id === action.payload.postId
			);

			if (index !== -1) {
				state.posts[index].likedByViewer = action.payload.isLiked;
				action.payload.isLiked
					? state.posts[index].totalLikes++
					: state.posts[index].totalLikes--;
			}
		},
		[likeUserPost.rejected]: (state, action) => {
			console.log(action.error.message);
		},

		[deleteUserPost.fulfilled]: (state, action) => {
			const index = state.posts.findIndex(
				(post) => post._id === action.payload
			);

			if (index !== -1) {
				state.posts.splice(index, 1);
			}
		},

		[followUsers.fulfilled]: (state, action) => {
			if (action.payload.isAdded) {
				state.posts.push(...action.payload.posts);
				state.posts.sort((post1, post2) => post2.createdAt - post1.createdAt);
			} else {
				state.posts = state.posts.filter(
					({ _id }) => !action.payload.posts.find((post) => post._id === _id)
				);
			}
		},

		[logoutUser]: (state) => {
			state.posts = [];
			state.status = "idle";
			state.usersWhoLikedPost = [];
			state.showLikesModal = false;
		},
	},
});

export default postsSlice.reducer;
export const { closeLikesModal } = postsSlice.actions;

export const usePost = () => useSelector((state) => state.posts);
