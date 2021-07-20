import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
	toggleTheme,
	togglePrimary,
	usePrimarySelector,
	useThemeSelector,
} from "../display/displaySlice";
import displayStyles from "./Display.module.css";

export const Display = () => {
	const dispatch = useDispatch();
	const primary = usePrimarySelector();
	const theme = useThemeSelector();
	console.log({ primary, theme });
	return (
		<div>
			<section className={displayStyles.primaryToggler}>
				<button
					onClick={() => dispatch(togglePrimary("prBlue"))}
					style={{ backgroundColor: "#1da1f2", color: "var(--head)" }}
				>
					{" "}
					blue
				</button>
				<button
					onClick={() => dispatch(togglePrimary("prYellow"))}
					style={{ backgroundColor: "#ffad1f", color: "var(--head)" }}
				>
					{" "}
					yellow
				</button>
				<button
					onClick={() => dispatch(togglePrimary("prPink"))}
					style={{ backgroundColor: "#e0245e", color: "var(--head)" }}
				>
					{" "}
					pink
				</button>
				<button
					onClick={() => dispatch(togglePrimary("prOrange"))}
					style={{ backgroundColor: "#f45d22", color: "var(--head)" }}
				>
					{" "}
					orange
				</button>
				<button
					onClick={() => dispatch(togglePrimary("prPurple"))}
					style={{ backgroundColor: "#794bc4", color: "var(--head)" }}
				>
					{" "}
					purple
				</button>
				<button
					onClick={() => dispatch(togglePrimary("prGreen"))}
					style={{ backgroundColor: "#17bf63", color: "var(--head)" }}
				>
					{" "}
					green
				</button>
			</section>
			<section className={displayStyles.themeToggler}>
				<button onClick={() => dispatch(toggleTheme("default"))}>
					{" "}
					Default
				</button>
				<button onClick={() => dispatch(toggleTheme("dim"))}> Dim</button>
				<button onClick={() => dispatch(toggleTheme("lightsOut"))}>
					{" "}
					Lights Out
				</button>
				<Link to="/">Home</Link>
			</section>
		</div>
	);
};
