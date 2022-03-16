import axios from "axios";
import { useSelector } from "react-redux";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_URL } from "../utils";
import setAuthHeader from "./utils/setAuthHeader";
import { updateProfile } from "./profile/profieSlice";
import {
	setLocalStorage,
	getLocalStorage,
	updateLocalStorage,
} from "./utils/localStorage";

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const {
				data: { response },
			} = await axios({
				method: "POST",
				url: `${API_URL}/user-profiles/login`,
				headers: { email, password },
			});

			return { userDetails: response };
		} catch (error) {
			const message = error.response.data.message;
			return rejectWithValue(message);
		}
	}
);

export const signupUser = createAsyncThunk(
	"auth/signupUser",
	async (userDetails, { rejectWithValue }) => {
		try {
			const {
				data: { response },
			} = await axios({
				method: "POST",
				url: `${API_URL}/user-profiles/signup`,
				data: { ...userDetails },
			});

			return response;
		} catch (error) {
			const message = error.response.data.message;
			return rejectWithValue(message);
		}
	}
);

export const loadNotifications = createAsyncThunk(
	"auth/loadNotifications",
	async () => {
		const {
			data: { response },
		} = await axios({
			method: "GET",
			url: `${API_URL}/user-profiles/notifications`,
		});

		return response;
	}
);

export const logoutUser = createAction("auth/logoutUser");

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		authentication: getLocalStorage(),
		login: {
			status: "idle",
			error: "",
		},
		signUp: {
			status: "idle",
			error: "",
		},
		notifications: [],
		notificationsStatus: "idle",
	},
	reducers: {},
	extraReducers: {
		[logoutUser]: (state) => {
			Object.assign(state.authentication, {
				token: "",
				userId: "",
				name: "",
				userName: "",
				profilePic: "",
			});
			state.notifications = [];
			localStorage?.removeItem("session");
		},

		[loginUser.fulfilled]: (state, action) => {
			Object.assign(state.authentication, { ...action.payload.userDetails });
			setLocalStorage(action.payload.userDetails);
			setAuthHeader(action.payload.userDetails.token);
			state.login.status = "success";
			state.login.error = "";
		},
		[loginUser.rejected]: (state, action) => {
			console.log(action.error.message);
			state.login.status = "failure";
			state.login.error = action.payload;
		},
		[loginUser.pending]: (state, action) => {
			state.login.status = "loading";
		},

		[signupUser.pending]: (state, action) => {
			state.signUp.status = "loading";
		},
		[signupUser.fulfilled]: (state, action) => {
			state.signUp.status = "success";
			state.signUp.error = "";
		},
		[signupUser.rejected]: (state, action) => {
			state.signUp.status = "failure";
			state.signUp.error = action.payload;
		},

		[loadNotifications.fulfilled]: (state, action) => {
			state.notifications = action.payload;
			state.notificationsStatus = "success";
		},
		[loadNotifications.pending]: (state, action) => {
			state.notificationsStatus = "loading";
		},
		[loadNotifications.rejected]: (state, action) => {
			console.log(action.error.message);
			state.notificationsStatus = "failure";
		},

		[updateProfile.fulfilled]: (state, action) => {
			state.authentication.profilePic = action.payload.profilePic;
			updateLocalStorage(action.payload.profilePic);
		},
	},
});

export default authSlice.reducer;
export const useAuth = () => useSelector((state) => state.auth);
