import axios from "axios";
import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_URL } from "../../utils";
import { followUsers, removeAFollower } from "./followerUsers/followersSlice";

export const loadUserProfile = createAsyncThunk(
	"profile/loadUserProfile",
	async (userName) => {
		const {
			data: { response },
		} = await axios.get(`${API_URL}/user-profiles/${userName}`);

		return response;
	}
);

export const loadUserPosts = createAsyncThunk(
	"profile/loadUserPosts",
	async (userName) => {
		const {
			data: { response },
		} = await axios.get(`${API_URL}/posts/user/${userName}`);

		return response;
	}
);

export const updateProfile = createAsyncThunk(
	"profile/updateProfile",
	async ({
		userName,
		inputCover,
		inputProfile,
		inputBio,
		inputLocation,
		inputWebsite,
	}) => {
		const {
			data: { response },
		} = await axios({
			method: "POST",
			url: `${API_URL}/user-profiles/${userName}`,
			data: {
				coverPic: inputCover,
				profilePic: inputProfile,
				bio: inputBio,
				location: inputLocation,
				website: inputWebsite,
			},
		});

		return response;
	}
);

export const likeUserPost = createAsyncThunk(
	"posts/likeUserPost",
	async ({ postId, updateProfile = false }) => {
		const {
			data: { isLiked },
		} = await axios.post(`${API_URL}/posts/${postId}/likedby`);

		return { postId, isLiked, updateProfile };
	}
);

export const deleteUserPost = createAsyncThunk(
	"posts/deleteUserPost",
	async ({ postId }) => {
		const {
			data: { response },
		} = await axios.delete(`${API_URL}/posts/${postId}`);

		return response;
	}
);

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		profileDetails: null,
		postsDetails: [],
		postsDetailsStatus: "idle",
	},
	reducers: {
		resetUserProfile: (state, action) => {
			state.profileDetails = null;
			state.postsDetails = [];
			state.postsDetailsStatus = "idle";
		},
	},
	extraReducers: {
		[loadUserProfile.fulfilled]: (state, action) => {
			state.profileDetails = action.payload;
		},
		[loadUserProfile.rejected]: (state, action) => {
			console.log(action.error.message);
		},

		[loadUserPosts.fulfilled]: (state, action) => {
			if (action.payload) {
				state.postsDetails = action.payload;
				state.postsDetailsStatus = "success";
			}
		},
		[loadUserPosts.pending]: (state, action) => {
			state.postsDetailsStatus = "loading";
		},
		[loadUserPosts.rejected]: (state, action) => {
			console.log(action.error.message);
			state.postsDetailsStatus = "failure";
		},

		[updateProfile.fulfilled]: (state, action) => {
			state.profileDetails.profilePic = action.payload.profilePic;
			state.profileDetails.coverPic = action.payload.coverPic;
			state.profileDetails.bio = action.payload.bio;
			state.profileDetails.location = action.payload.location;
			state.profileDetails.website = action.payload.website;
		},
		[updateProfile.rejected]: (state, action) => {
			console.log(action.error.message);
		},

		[likeUserPost.fulfilled]: (state, action) => {
			if (action.payload.updateProfile) {
				const index = state.postsDetails.findIndex(
					(post) => post._id === action.payload.postId
				);
				if (index !== -1) {
					state.postsDetails[index].likedByViewer = action.payload.isLiked;
					action.payload.isLiked
						? state.postsDetails[index].totalLikes++
						: state.postsDetails[index].totalLikes--;
				}
			}
		},
		[likeUserPost.rejected]: (state, action) => {
			console.log(action.error.message);
		},

		[deleteUserPost.fulfilled]: (state, action) => {
			const index = state.postsDetails.findIndex(
				(post) => post._id === action.payload
			);
			if (index !== -1) {
				state.postsDetails.splice(index, 1);
			}
		},

		[followUsers.fulfilled]: (state, action) => {
			action.payload.isAdded
				? state.profileDetails.followCount.followers++
				: state.profileDetails.followCount.followers--;

			state.profileDetails.followedByViewer = action.payload.isAdded;
		},
		[followUsers.rejected]: (state, action) => {
			console.log(action.error.message);
		},

		[removeAFollower.fulfilled]: (state, action) => {
			state.profileDetails.followCount.followers--;
		},
		[removeAFollower.rejected]: (state, action) => {
			console.log(action.error.message);
		},
	},
});

export default profileSlice.reducer;
export const { resetUserProfile } = profileSlice.actions;

export const useProfile = () => useSelector((state) => state.profile);
