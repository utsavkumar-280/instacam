import navStyles from "./Nav.module.css";
import { NavLink, Link, useLocation } from "react-router-dom";

import {
	HomeIcon,
	BellIcon,
	UserCircleIcon,
	LightBulbIcon,
	SearchIcon,
} from "@heroicons/react/solid";
import {
	HomeIcon as HomeIconOutline,
	BellIcon as BellIconOutline,
	UserCircleIcon as UserCircleIconOutline,
	LightBulbIcon as LightBulbIconOutline,
	SearchIcon as SearchIconOutline,
} from "@heroicons/react/outline";

export const Nav = () => {
	const currentPath = useLocation().pathname;
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
						<NavLink
							to="/"
							end
							className={navStyles.links}
							activeClassName={navStyles.links_active}
						>
							{currentPath === "/" ? (
								<HomeIcon className={navStyles.link_icon} />
							) : (
								<HomeIconOutline className={navStyles.link_icon} />
							)}
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/notification"
							end
							className={navStyles.links}
							activeClassName={navStyles.links_active}
						>
							{currentPath === "/notification" ? (
								<BellIcon className={navStyles.link_icon} />
							) : (
								<BellIconOutline className={navStyles.link_icon} />
							)}
							Notifications
						</NavLink>
					</li>
					<li className={navStyles.display_none}>
						<NavLink
							to="/search"
							end
							className={navStyles.links}
							activeClassName={navStyles.links_active}
						>
							{currentPath === "/search" ? (
								<SearchIcon className={navStyles.link_icon} />
							) : (
								<SearchIconOutline className={navStyles.link_icon} />
							)}
							Search
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/user-profile/utsav"
							end
							className={navStyles.links}
							activeClassName={navStyles.links_active}
						>
							{currentPath === "/user-profile/utsav" ? (
								<UserCircleIcon className={navStyles.link_icon} />
							) : (
								<UserCircleIconOutline className={navStyles.link_icon} />
							)}
							Profile
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/display"
							end
							className={navStyles.links}
							activeClassName={navStyles.links_active}
						>
							{currentPath === "/display" ? (
								<LightBulbIcon className={navStyles.link_icon} />
							) : (
								<LightBulbIconOutline className={navStyles.link_icon} />
							)}
							Display
						</NavLink>
					</li>

					<li>
						<button className={navStyles.link_logout_cta}>
							<NavLink to="/login">Logout</NavLink>
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
