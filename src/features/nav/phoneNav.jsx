import navStyles from "./PhoneNav.module.css";
import { NavLink, useLocation } from "react-router-dom";

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

export const PhoneNav = () => {
	const currentPath = useLocation().pathname;
	return (
		<div className={navStyles.container}>
			<ul className={navStyles.link_list}>
				<li>
					<NavLink to="/" end activeClassName={navStyles.link_icons_active}>
						{currentPath === "/" ? (
							<HomeIcon className={navStyles.link_icons} />
						) : (
							<HomeIconOutline className={navStyles.link_icons} />
						)}
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/search"
						end
						activeClassName={navStyles.link_icons_active}
					>
						{currentPath === "/" ? (
							<SearchIcon className={navStyles.link_icons} />
						) : (
							<SearchIconOutline className={navStyles.link_icons} />
						)}
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/notification"
						end
						activeClassName={navStyles.link_icons_active}
					>
						{currentPath === "/notification" ? (
							<BellIcon className={navStyles.link_icons} />
						) : (
							<BellIconOutline className={navStyles.link_icons} />
						)}
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/display"
						end
						activeClassName={navStyles.link_icons_active}
					>
						{currentPath === "/display" ? (
							<LightBulbIcon className={navStyles.link_icons} />
						) : (
							<LightBulbIconOutline className={navStyles.link_icons} />
						)}
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/user-profile/utsav"
						end
						activeClassName={navStyles.link_icons_active}
					>
						{currentPath === "/user-profile/utsav" ? (
							<UserCircleIcon className={navStyles.link_icons} />
						) : (
							<UserCircleIconOutline className={navStyles.link_icons} />
						)}
					</NavLink>
				</li>
			</ul>
		</div>
	);
};
