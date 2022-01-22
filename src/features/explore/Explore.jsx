import { useState } from "react";
import exploreStyles from "./Explore.module.css";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Explore = () => {
	const [inputSearch, setInputSearch] = useState("");
	return (
		<div className={exploreStyles.container}>
			<header className={exploreStyles.head_container}>
				<div className={exploreStyles.search_container}>
					<button className={exploreStyles.search_cta_container}>
						<FiSearch className={exploreStyles.search_cta} />
					</button>

					<input
						type="text"
						className={exploreStyles.search_input}
						placeholder="Search users"
						value={inputSearch}
						onChange={(e) => setInputSearch(e.target.value)}
					/>
				</div>
			</header>

			<section className={exploreStyles.userList_section}>
				{inputSearch ? (
					<div className={exploreStyles.userList_container_alt}>
						<section className={exploreStyles.users_list_alt}>
							<Link to="/user-profile" className={exploreStyles.users}>
								<img
									src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
									alt="post_user_pic"
									className={exploreStyles.users_pic}
								/>
								<section className={exploreStyles.users_info}>
									<h1>Utsav Kumar</h1>
									<h2>@utsavkumar280</h2>
								</section>
							</Link>
							<Link to="/user-profile" className={exploreStyles.users}>
								<img
									src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
									alt="post_user_pic"
									className={exploreStyles.users_pic}
								/>
								<section className={exploreStyles.users_info}>
									<h1>Utsav Kumar</h1>
									<h2>@utsavkumar280</h2>
								</section>
							</Link>
						</section>
					</div>
				) : (
					<div className={exploreStyles.userList_container}>
						<header className={exploreStyles.userList_header}>
							<p>Users you might like</p>
						</header>
						<section className={exploreStyles.users_list}>
							<Link to="/user-profile" className={exploreStyles.users}>
								<img
									src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
									alt="post_user_pic"
									className={exploreStyles.users_pic}
								/>
								<section className={exploreStyles.users_info}>
									<h1>Utsav Kumar</h1>
									<h2>@utsavkumar280</h2>
								</section>
							</Link>
							<Link to="/user-profile" className={exploreStyles.users}>
								<img
									src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
									alt="post_user_pic"
									className={exploreStyles.users_pic}
								/>
								<section className={exploreStyles.users_info}>
									<h1>Utsav Kumar</h1>
									<h2>@utsavkumar280</h2>
								</section>
							</Link>
							<Link to="/user-profile" className={exploreStyles.users}>
								<img
									src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
									alt="post_user_pic"
									className={exploreStyles.users_pic}
								/>
								<section className={exploreStyles.users_info}>
									<h1>Utsav Kumar</h1>
									<h2>@utsavkumar280</h2>
								</section>
							</Link>
							<Link to="/user-profile" className={exploreStyles.users}>
								<img
									src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
									alt="post_user_pic"
									className={exploreStyles.users_pic}
								/>
								<section className={exploreStyles.users_info}>
									<h1>Utsav Kumar</h1>
									<h2>@utsavkumar280</h2>
								</section>
							</Link>
							<Link to="/user-profile" className={exploreStyles.users}>
								<img
									src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
									alt="post_user_pic"
									className={exploreStyles.users_pic}
								/>
								<section className={exploreStyles.users_info}>
									<h1>Utsav Kumar</h1>
									<h2>@utsavkumar280</h2>
								</section>
							</Link>
							<Link to="/user-profile" className={exploreStyles.users}>
								<img
									src="https://i.postimg.cc/gJPZNW57/mini-passport-pic.jpg"
									alt="post_user_pic"
									className={exploreStyles.users_pic}
								/>
								<section className={exploreStyles.users_info}>
									<h1>Utsav Kumar</h1>
									<h2>@utsavkumar280</h2>
								</section>
							</Link>
						</section>
					</div>
				)}
			</section>
		</div>
	);
};
