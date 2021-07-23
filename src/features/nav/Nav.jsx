import navStyles from "./Nav.module.css";
import { NavLink, Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt, FaRegBell } from "react-icons/fa";

export const Nav = () => {
	return (
		<div className={navStyles.container}>
			<header className={navStyles.head_container}>
				<Link to="/" className={navStyles.head_logo}>
					<h1>instaCam</h1>
				</Link>
			</header>

			<nav className={navStyles.link_container}>
				<ul className={navStyles.link_list}>
					<li>
						<NavLink to="/" className={navStyles.links}>
							<AiFillHome className={navStyles.link_icon} />
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/notification" className={navStyles.links}>
							<FaRegBell className={navStyles.link_icon} />
							Notification
						</NavLink>
					</li>
					<li>
						<NavLink to="/user-profile" className={navStyles.links}>
							<FaUserAlt className={navStyles.link_icon} />
							Profile
						</NavLink>
					</li>
					<li>
						<NavLink to="/display" className={navStyles.links}>
							<FiEdit className={navStyles.link_icon} />
							Display
						</NavLink>
					</li>
					<li>
						<button className={navStyles.link_logout_cta}>
							<NavLink to="/">Logout</NavLink>
						</button>
					</li>
				</ul>
			</nav>

			<footer className={navStyles.footer_container}>
				<NavLink to="/user-profile" className={navStyles.nav_user}>
					<img
						src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
						alt="user_img"
						className={navStyles.nav_user_img}
					/>
					<article className={navStyles.nav_user_text}>
						<h1>Utsav Kumar</h1>
						<h2>@utsavkumar280</h2>
					</article>
				</NavLink>
			</footer>
		</div>
	);
};
