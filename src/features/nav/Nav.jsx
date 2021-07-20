import navStyles from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { FiHome, FiEdit } from "react-icons/fi";
import { FaUserAlt, FaRegBell } from "react-icons/fa";

export const Nav = () => {
	return (
		<div className={navStyles.container}>
			<header className={navStyles.head_container}>
				<h1>instaCam</h1>
			</header>
			<section className={navStyles.link_container}>
				<nav>
					<ul>
						<li>
							<NavLink to="/">
								<FiHome />
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to="/">
								<FaRegBell />
								Notification
							</NavLink>
						</li>
						<li>
							<NavLink to="/user-profile">
								<FaUserAlt />
								Profile
							</NavLink>
						</li>
						<li>
							<NavLink to="/display">
								<FiEdit />
								Display
							</NavLink>
						</li>
						<li>
							<button>
								<NavLink to="/display">Logout</NavLink>
							</button>
						</li>
					</ul>
				</nav>
			</section>
			<footer className={navStyles.footer_container}>
				<button>
					<NavLink to="/user-profile">Profile</NavLink>
				</button>
			</footer>
		</div>
	);
};
