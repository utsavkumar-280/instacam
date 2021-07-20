import navStyles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

export const Nav = () => {
	return (
		<div className={navStyles.container}>
			<header className={navStyles.head_container}>
				<h1>InstaCam</h1>
			</header>
			<section>
				<nav>
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/">Notification</NavLink>
						</li>
						<li>
							<NavLink to="/user-profile">Profile</NavLink>
						</li>
						<li>
							<NavLink to="/display">Display</NavLink>
						</li>
						<li>
							<button>
								<NavLink to="/display">Logout</NavLink>
							</button>
						</li>
					</ul>
				</nav>
			</section>
			<footer>
				<button>
					<NavLink to="/user-profile">Profile</NavLink>
				</button>
			</footer>
		</div>
	);
};
