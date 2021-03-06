import axios from "axios";
import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_URL } from "../../../utils";

export const loadFollowings = createAsyncThunk(
	"profile/loadFollowings",
	async (userName) => {
		const {
			data: { response },
		} = await axios.get(`${API_URL}/user-profiles/${userName}/following`);

		return response;
	}
);

const followingsSlice = createSlice({
	name: "followings",
	initialState: {
		followingsDetails: [],
		followingsStatus: "idle",
	},
	reducers: {
		resetFollowings: (state) => {
			state.followingsDetails = [];
			state.followingsStatus = "idle";
		},
	},
	extraReducers: {
		[loadFollowings.fulfilled]: (state, action) => {
			if (action.payload) {
				state.followingsDetails = action.payload;
				state.followingsStatus = "success";
			}
		},
		[loadFollowings.pending]: (state, action) => {
			state.followingsStatus = "loading";
		},
		[loadFollowings.rejected]: (state, action) => {
			console.log(action.error.message);
			state.followingsStatus = "failure";
		},
	},
});

export default followingsSlice.reducer;
export const { resetFollowings } = followingsSlice.actions;

export const useFollowings = () => useSelector((state) => state.followings);
