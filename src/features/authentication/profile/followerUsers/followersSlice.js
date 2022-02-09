import axios from "axios";
import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_URL } from "../../../utils";

export const loadFollowers = createAsyncThunk(
	"profile/loadFollowers",
	async (userName) => {
		const {
			data: { response },
		} = await axios.get(`${API_URL}/user-profiles/${userName}/followers`);

		return response;
	}
);

export const followUsers = createAsyncThunk(
	"profile/followUsers",
	async ({ userName, posts = [], viewerDetails }) => {
		const {
			data: { isAdded },
		} = await axios.post(`${API_URL}/user-profiles/${userName}/followers`);

		return { isAdded, posts, viewerDetails };
	}
);

export const removeAFollower = createAsyncThunk(
	"profile/removeAFollower",
	async ({ userName }) => {
		await axios.post(`${API_URL}/user-profiles/${userName}/following`);

		return { userName };
	}
);

const followersSlice = createSlice({
	name: "followers",
	initialState: {
		followersDetails: [],
		followersStatus: "idle",
	},
	reducers: {
		resetFollowers: (state) => {
			state.followersDetails = [];
			state.followersStatus = "idle";
		},
	},
	extraReducers: {
		[loadFollowers.fulfilled]: (state, action) => {
			if (action.payload) {
				state.followersDetails = action.payload;
				state.followersStatus = "success";
			}
		},
		[loadFollowers.pending]: (state, action) => {
			state.followersStatus = "loading";
		},
		[loadFollowers.rejected]: (state, action) => {
			console.log(action.error.message);
			state.followersStatus = "failure";
		},

		[followUsers.fulfilled]: (state, action) => {
			const index = state.followersDetails.findIndex(
				(user) => user.userName === action.payload.viewerDetails.viewerUserName
			);

			if (index === -1) {
				const viewer = {
					name: action.payload.viewerDetails.viewerName,
					userName: action.payload.viewerDetails.viewerUserName,
					profilePic: action.payload.viewerDetails.viewerProfilePic,
				};
				state.followersDetails.unshift(viewer);
			} else {
				state.followersDetails.splice(index, 1);
			}
		},
		[removeAFollower.fulfilled]: (state, action) => {
			state.followersDetails = state.followersDetails.filter(
				(user) => user.userName !== action.payload.userName
			);
		},
	},
});

export default followersSlice.reducer;
export const { resetFollowers } = followersSlice.actions;

export const useFollowers = () => useSelector((state) => state.followers);
