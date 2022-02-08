import axios from "axios";
import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_URL } from "../../../utils";

export const loadFollowings = createAsyncThunk(
	"profile/loadFollowings",
	async (userName) => {
		const {
			data: { response },
		} = await axios.get(`${API_URL}/user-profiles/${userName}`);

		return response;
	}
);

const followingsSlice = createSlice({
	name: "followings",
	initialState: {
		followingsDetails: [],
	},
	reducers: {
		resetFollowings: (state) => {
			state.followingsDetails = [];
		},
	},
	extraReducers: {
		[loadFollowings.fulfilled]: (state, action) => {
			if (action.payload) {
				state.followingsDetails = action.payload;
			}
		},
		[loadFollowings.rejected]: (state, action) => {
			console.log(action.error.message);
		},
	},
});

export default followingsSlice.reducer;
export const { resetFollowings } = followingsSlice.actions;

export const useFollowing = () => useSelector((state) => state.followings);
