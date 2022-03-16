import { useState, useEffect } from "react";
import exploreStyles from "./Explore.module.css";
import { FiSearch, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";

import UserTile from "./UserTile";
import { useUsers } from "./usersSlice";
import { useAuth } from "../authentication/authSlice";

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export const Explore = () => {
	const [inputSearch, setInputSearch] = useState("");
	const [restSuggested, setResetSuggested] = useState("");
	const { users, usersLoadStatus } = useUsers();
	const { pathname } = useLocation();

	useEffect(() => {
		setResetSuggested(pathname);
		return () => {
			setResetSuggested("");
		};
	}, [pathname]);
	const {
		authentication: { userName },
	} = useAuth();

	const followSuggestions = (users) => {
		let nonFollowers = users.filter(
			(user) => !user.followedByViewer && userName !== user.userName
		);

		// nonFollowers = shuffle(nonFollowers);
		if (nonFollowers.length > 7) {
			return [
				nonFollowers[0],
				nonFollowers[1],
				nonFollowers[2],
				nonFollowers[3],
				nonFollowers[4],
				nonFollowers[5],
				nonFollowers[6],
			];
		}
		return nonFollowers;
	};

	const suggestedUsers = followSuggestions(users);
	console.log({ pathname }, { suggestedUsers });

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
							{searchedUsers.length !== 0 ? (
								searchedUsers.map((user) => (
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
								))
							) : (
								<div className={exploreStyles.users_empty}>
									<section className={exploreStyles.users_info}>
										<h1>No user found</h1>
									</section>
								</div>
							)}
						</section>
					</div>
				) : (
					<div className={exploreStyles.userList_container}>
						<header className={exploreStyles.userList_header}>
							<p>Users you might like</p>
						</header>
						<section className={exploreStyles.users_list}>
							{usersLoadStatus === "success" ? (
								suggestedUsers.map((user) => (
									<UserTile
										key={user._id}
										to={`/user-profile/${user?.userName}`}
										pic={user?.profilePic}
										name={user?.name}
										username={user?.userName}
									/>
								))
							) : (
								<section className={exploreStyles.loaderContainer}>
									<CircleSpinner size={25} loading />
								</section>
							)}
						</section>
					</div>
				)}
				<div className={exploreStyles.home_end} />
			</section>
		</div>
	);
};
