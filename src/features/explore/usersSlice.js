import axios from "axios";
import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_URL } from "../utils";
import { logoutUser } from "../authentication/authSlice";

export const loadAllUsers = createAsyncThunk("users/loadAllUsers", async () => {
	const {
		data: { response },
	} = await axios.get(`${API_URL}/user-profiles`);
	return response;
});

export const usersSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
	},
	reducers: {},
	extraReducers: {
		[loadAllUsers.fulfilled]: (state, action) => {
			state.users = action.payload;
		},
		[loadAllUsers.rejected]: (state, action) => {
			console.log(action.error.message);
		},
		[logoutUser]: (state) => {
			state.users = [];
		},
	},
});

export const useUsers = () => useSelector((state) => state.users);
export default usersSlice.reducer;
