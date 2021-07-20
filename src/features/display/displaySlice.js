import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const displaySlice = createSlice({
	name: "display",
	initialState: {
		primaryColor: "blue",
		theme: "default",
	},
	reducers: {
		toggleTheme(state, action) {
			state.theme = action.payload;
		},
		togglePrimary(state, action) {
			state.primaryColor = action.payload;
		},
	},
});

export const usePrimarySelector = () =>
	useSelector((state) => state.display.primaryColor);

export const useThemeSelector = () =>
	useSelector((state) => state.display.theme);

export const { togglePrimary, toggleTheme } = displaySlice.actions;

export default displaySlice.reducer;
