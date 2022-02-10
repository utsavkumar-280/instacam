import homeStyles from "../Home.module.css";
import { GoHeart } from "react-icons/go";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { TrashIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";

import {
	likeUserPost,
	deleteUserPost,
} from "../../authentication/profile/profieSlice";
import { openLikesModal } from "./postsSlice";
import { useAuth } from "../../authentication/authSlice";
import { useProfile } from "../../authentication/profile/profieSlice";

export const PostCard = ({ deleteBtn, post, updatePr }) => {
	const dispatch = useDispatch();
	const { authentication } = useAuth();
	const { profileDetails } = useProfile();

	const deleteable = authentication?.userName === profileDetails?.userName;

	const isLikedpost = post?.totalLikes >= 1;
	console.log(
		{ authentication, profileDetails },
		authentication?.userName === profileDetails?.userName
	);
	return (
		<div className={homeStyles.main_post}>
			{(isLikedpost || deleteable) && (
				<div className={homeStyles.post_layout}>
					<section className={homeStyles.likes_container}>
						<div className={homeStyles.likes_content}>
							<GoHeart className={homeStyles.likes} />
						</div>
					</section>
					<section className={homeStyles.post_content}>
						<p>
							{isLikedpost
								? `Liked by ${post?.totalLikes} people`
								: "Be the first to like the post"}
						</p>
						{deleteable && (
							<div
								className={homeStyles.post_cta_icon_container}
								onClick={() => dispatch(deleteUserPost({ postId: post?._id }))}
							>
								<TrashIcon className={homeStyles.post_cta_icon} />
							</div>
						)}
					</section>
				</div>
			)}

			<div className={homeStyles.post_layout}>
				<section
					className={`${homeStyles.user_pic_container} ${homeStyles.user_pfp_padding}`}
				>
					<img
						src={post?.userId?.profilePic}
						alt="post_user_pic"
						className={homeStyles.user_pic}
					/>
				</section>
				<section className={homeStyles.post_box}>
					<section className={homeStyles.post_head}>
						{`${post?.userId?.userId?.firstname} ${post?.userId?.userId?.lastname}`}{" "}
						<span>{`@${post?.userId?.userName}`}</span>{" "}
						<span>{`. ${post?.time}`}</span>
					</section>
					<section className={homeStyles.post_description}>
						{post?.caption}
					</section>
					{post?.image && (
						<section className={homeStyles.post_description}>
							<img
								src={post?.image}
								alt="post_user_pic"
								className={homeStyles.post_pic}
							/>
						</section>
					)}
					<section className={homeStyles.post_cta_container}>
						{post?.likedByViewer ? (
							<button
								className={homeStyles.liked_post_cta}
								onClick={() =>
									dispatch(
										likeUserPost({ postId: post?._id, updateProfile: updatePr })
									)
								}
							>
								<IoHeart />
							</button>
						) : (
							<button
								className={homeStyles.post_cta}
								onClick={() =>
									dispatch(
										likeUserPost({ postId: post?._id, updateProfile: updatePr })
									)
								}
							>
								<IoHeartOutline />
							</button>
						)}

						<div>{post?.totalLikes}</div>
					</section>
				</section>
			</div>
		</div>
	);
};
