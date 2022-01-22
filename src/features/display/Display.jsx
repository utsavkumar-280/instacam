// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { ImRadioUnchecked, ImRadioChecked } from "react-icons/im";
import { primaryColor, mainTheme } from "./util/data";
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
		<div className={displayStyles.container}>
			<header className={displayStyles.head_container}>
				<p className={displayStyles.route_head}>Customize your Display</p>
			</header>
			<section className={displayStyles.content_container}>
				<h2>Color</h2>
				<section className={displayStyles.primaryToggler}>
					{primaryColor.map((prColor, id) => (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<button
								key={id}
								onClick={() => dispatch(togglePrimary(prColor.class))}
								className={displayStyles.primaryColor}
								style={{
									backgroundColor: prColor.color,
								}}
							>
								{primary === prColor.class ? (
									<FaCheck className={displayStyles.check_icon} />
								) : (
									<FaCheck
										style={{ color: prColor.color }}
										className={displayStyles.check_icon}
									/>
								)}
							</button>
						</div>
					))}
				</section>
				<h2>Theme</h2>
				<section className={displayStyles.themeToggler}>
					{mainTheme.map((newtheme, id) => (
						<button
							key={id}
							className={
								theme === newtheme.class
									? ` ${displayStyles[newtheme.theme]} ${
											displayStyles.theme_active
									  }`
									: displayStyles[newtheme.theme]
							}
							onClick={() => dispatch(toggleTheme(newtheme.class))}
						>
							{theme === newtheme.class ? (
								<ImRadioChecked className={displayStyles.theme_icon_active} />
							) : (
								<ImRadioUnchecked className={displayStyles.theme_icon} />
							)}
							{newtheme.name}
						</button>
					))}
				</section>
			</section>
		</div>
	);
};
