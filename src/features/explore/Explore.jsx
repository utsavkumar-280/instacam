import { useState } from "react";
import exploreStyles from "./Explore.module.css";
import { FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import UserTile from "./UserTile";
import { useUsers } from "./usersSlice";
import { useAuth } from "../authentication/authSlice";

export const Explore = () => {
	const [inputSearch, setInputSearch] = useState("");
	const { users } = useUsers();
	const {
		authentication: { name, userName, profilePic },
	} = useAuth();

	const followSuggestions = (users) => {
		let nonFollowers = users.filter(
			(user) => !user.followedByViewer && userName !== user.userName
		);
		if (nonFollowers.length > 5) {
			return [
				nonFollowers[1],
				nonFollowers[0],
				nonFollowers[4],
				nonFollowers[3],
				nonFollowers[2],
			];
		}
		return nonFollowers;
	};

	const searchUsers = (users, searchKeyword) => {
		const searchedUpper = searchKeyword.toUpperCase();

		if (searchKeyword) {
			const filteredUsers = users.filter(({ userName, name }) => {
				const userNameUpper = userName.toUpperCase();
				const nameUpper = name.toUpperCase();

				return (
					userNameUpper.includes(searchedUpper) ||
					nameUpper.includes(searchedUpper)
				);
			});
			return filteredUsers;
		}
		return [];
	};

	const searchedUsers = searchUsers(users, inputSearch);

	console.log({ searchedUsers });

	const suggestedUsers = followSuggestions(users);
	return (
		<div className={exploreStyles.container}>
			<header className={exploreStyles.head_container}>
				<div className={exploreStyles.search_container}>
					<input
						type="text"
						className={exploreStyles.search_input}
						placeholder="Search users"
						value={inputSearch}
						onChange={(e) => setInputSearch(e.target.value)}
					/>
					<button className={exploreStyles.search_cta_container}>
						{inputSearch ? (
							<FiX
								className={exploreStyles.search_cta}
								onClick={() => setInputSearch("")}
							/>
						) : (
							<FiSearch className={exploreStyles.search_cta} />
						)}
					</button>
				</div>
			</header>

			<section className={exploreStyles.userList_section}>
				{inputSearch ? (
					<div className={exploreStyles.userList_container_alt}>
						<section className={exploreStyles.users_list_alt}>
							{searchedUsers.map((user) => (
								<Link
									to={`/user-profile/${user?.userName}`}
									key={user?._id}
									className={exploreStyles.users_alt}
								>
									<img
										src={user?.profilePic}
										alt="post_user_pic"
										className={exploreStyles.users_pic}
									/>
									<section className={exploreStyles.users_info}>
										<h1>{user?.name}</h1>
										<h2>{`@${user?.userName}`}</h2>
									</section>
								</Link>
							))}
						</section>
					</div>
				) : (
					<div className={exploreStyles.userList_container}>
						<header className={exploreStyles.userList_header}>
							<p>Users you might like</p>
						</header>
						<section className={exploreStyles.users_list}>
							{suggestedUsers.map((user) => (
								<UserTile
									key={user._id}
									to={`/user-profile/${user?.userName}`}
									pic={user?.profilePic}
									name={user?.name}
									username={user?.userName}
								/>
							))}
						</section>
					</div>
				)}
				<div className={exploreStyles.home_end} />
			</section>
		</div>
	);
};
