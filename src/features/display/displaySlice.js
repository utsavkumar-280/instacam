import { createSlice, createAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const themeToggler = createAction("display/themeToggle");

export const primaryToggler = createAction("display/primaryToggle");

const getSavedDisplay = () => {
	const savedTheme = JSON.parse(localStorage.getItem("savedTheme"));
	const savedPrimary = JSON.parse(localStorage.getItem("savedPrimary"));
	const defaultDisplay = {
		primaryColor: savedPrimary?.primaryColor || "prBlue",
		theme: savedTheme?.theme || "default",
	};
	return defaultDisplay;
};

const displaySlice = createSlice({
	name: "display",
	initialState: getSavedDisplay(),
	reducers: {},
	extraReducers: {
		[themeToggler]: (state, action) => {
			localStorage.setItem(
				"savedTheme",
				JSON.stringify({ theme: action.payload })
			);
			state.theme = action.payload;
		},
		[primaryToggler]: (state, action) => {
			localStorage.setItem(
				"savedPrimary",
				JSON.stringify({ primaryColor: action.payload })
			);
			state.primaryColor = action.payload;
		},
	},
});

export const usePrimarySelector = () =>
	useSelector((state) => state.display.primaryColor);

export const useThemeSelector = () =>
	useSelector((state) => state.display.theme);

export default displaySlice.reducer;
