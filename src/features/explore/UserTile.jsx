import exploreStyles from "./Explore.module.css";
import { Link } from "react-router-dom";

const UserTile = ({ to, pic, name, username }) => {
	return (
		<Link to={to} className={exploreStyles.users}>
			<img src={pic} alt="post_user_pic" className={exploreStyles.users_pic} />
			<section className={exploreStyles.users_info_container}>
				<section className={exploreStyles.users_info}>
					<h1>{name}</h1>
					<h2>{username}</h2>
				</section>
			</section>
		</Link>
	);
};

export default UserTile;
