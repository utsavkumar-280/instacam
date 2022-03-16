import axios from "axios";
import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_URL } from "../utils";
import { logoutUser } from "../authentication/authSlice";
import { followUsers } from "../authentication/profile/followerUsers/followersSlice";

export const loadAllUsers = createAsyncThunk("users/loadAllUsers", async () => {
	const {
		data: { response },
	} = await axios.get(`${API_URL}/user-profiles`);
	console.log({ usersResponse: response });
	return response;
});

export const usersSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		usersLoadStatus: "idle",
	},
	reducers: {},
	extraReducers: {
		[loadAllUsers.fulfilled]: (state, action) => {
			state.users = action.payload;
			state.usersLoadStatus = "success";
		},
		[loadAllUsers.pending]: (state, action) => {
			state.usersLoadStatus = "loading";
		},
		[loadAllUsers.rejected]: (state, action) => {
			console.log(action.error.message);
			state.usersLoadStatus = "failure";
		},
		[logoutUser]: (state) => {
			state.users = [];
		},
		[followUsers.fulfilled]: (state, action) => {
			console.log({ action });
			state.users = action.payload.usersList;
		},
	},
});

export const useUsers = () => useSelector((state) => state.users);
export default usersSlice.reducer;
