import { useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GrCheckmark } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";

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
			<header className={displayStyles.head_container}>
				<p className={displayStyles.route_head}>Customize your Display</p>
			</header>
			<div className={displayStyles.content_container}>
				<h2>Color</h2>
				<section className={displayStyles.primaryToggler}>
					<button
						onClick={() => dispatch(togglePrimary("prBlue"))}
						className={displayStyles.primaryColor}
						style={{ backgroundColor: "#1da1f2", color: "var(--head-primary)" }}
					>
						{primary === "prBlue" ? (
							<FaCheck className={displayStyles.check_icon} />
						) : (
							<FaCheck
								style={{ color: "#1da1f2" }}
								className={displayStyles.check_icon}
							/>
						)}
					</button>
					<button
						onClick={() => dispatch(togglePrimary("prYellow"))}
						className={displayStyles.primaryColor}
						style={{ backgroundColor: "#ffad1f", color: "var(--head-primary)" }}
					>
						{primary === "prYellow" ? (
							<FaCheck className={displayStyles.check_icon} />
						) : (
							<FaCheck
								style={{ color: "#ffad1f" }}
								className={displayStyles.check_icon}
							/>
						)}
					</button>
					<button
						onClick={() => dispatch(togglePrimary("prPink"))}
						className={displayStyles.primaryColor}
						style={{ backgroundColor: "#e0245e", color: "var(--head-primary)" }}
					>
						{primary === "prPink" ? (
							<FaCheck className={displayStyles.check_icon} />
						) : (
							<FaCheck
								style={{ color: "#e0245e" }}
								className={displayStyles.check_icon}
							/>
						)}
					</button>
					<button
						onClick={() => dispatch(togglePrimary("prOrange"))}
						className={displayStyles.primaryColor}
						style={{ backgroundColor: "#f45d22", color: "var(--head-primary)" }}
					>
						{primary === "prOrange" ? (
							<FaCheck className={displayStyles.check_icon} />
						) : (
							<FaCheck
								style={{ color: "#f45d22" }}
								className={displayStyles.check_icon}
							/>
						)}
					</button>
					<button
						onClick={() => dispatch(togglePrimary("prPurple"))}
						className={displayStyles.primaryColor}
						style={{ backgroundColor: "#794bc4", color: "var(--head-primary)" }}
					>
						{primary === "prPurple" ? (
							<FaCheck className={displayStyles.check_icon} />
						) : (
							<FaCheck
								style={{ color: "#794bc4" }}
								className={displayStyles.check_icon}
							/>
						)}
					</button>
					<button
						onClick={() => dispatch(togglePrimary("prGreen"))}
						className={displayStyles.primaryColor}
						style={{ backgroundColor: "#17bf63", color: "var(--head-primary)" }}
					>
						{primary === "prGreen" ? (
							<FaCheck className={displayStyles.check_icon} />
						) : (
							<FaCheck
								style={{ color: "#17bf63" }}
								className={displayStyles.check_icon}
							/>
						)}
					</button>
				</section>
				<h2>Theme</h2>
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
				</section>
			</div>
		</div>
	);
};
