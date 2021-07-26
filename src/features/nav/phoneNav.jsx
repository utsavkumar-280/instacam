import navStyles from "./PhoneNav.module.css";
import { NavLink } from "react-router-dom";
import { FiEdit, FiSearch } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt, FaRegBell } from "react-icons/fa";

export const PhoneNav = () => {
	return (
		<div className={navStyles.container}>
			<ul className={navStyles.link_list}>
				<li>
					<NavLink to="/" end activeClassName={navStyles.link_icons_active}>
						<AiFillHome className={navStyles.link_icons} />
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/search"
						end
						activeClassName={navStyles.link_icons_active}
					>
						<FiSearch className={navStyles.link_icons} />
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/notification"
						end
						activeClassName={navStyles.link_icons_active}
					>
						<FaRegBell className={navStyles.link_icons} />
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/display"
						end
						activeClassName={navStyles.link_icons_active}
					>
						<FiEdit className={navStyles.link_icons} />
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/user-profile/utsav"
						end
						activeClassName={navStyles.link_icons_active}
					>
						<FaUserAlt className={navStyles.link_icons} />
					</NavLink>
				</li>
			</ul>
		</div>
	);
};
