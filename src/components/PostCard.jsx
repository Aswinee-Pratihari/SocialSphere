import React, { useEffect, useState } from "react";
import img from "../assets/logo.png";
import { HandThumbUpIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import photos from "../appwrite/file";
import database from "../appwrite/db";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const PostCard = ({ post, user }) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.auth?.user?.$id);
  const isAuthor = post && userId ? userId === post.userId : false;
  const [isLiked, setIsLiked] = useState(post.likes.indexOf(userId) !== -1);

  const handleLike = async () => {
    // console.log(post);
    try {
      if (post.likes.indexOf(userId) == -1) {
        post.likes.push(userId);
        await database.LikePost(post.$id, post.likes);
        setIsLiked(true);
        toast.success("Post Liked");
      } else {
        const likeArray = post.likes.filter((id) => id != userId);
        setIsLiked(false);
        toast.success("Post disliked");
        console.log(likeArray);
        await database.LikePost(post.$id, likeArray);
      }
    } catch (error) {
      toast.error(error.message) || toast.error(error);
    }
  };
  const handleDelete = async () => {
    await database.deletePost(post.$id);
    toast.success("deleted");
    // alert("deleted");
    navigate("/");
  };
  return (
    <>
      <div className="p-3 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <Link
            // to={`/profile/${post?.userId}`}
            to={`/`}
            className="top flex items-center gap-3"
          >
            <img
              src={database.getAvatar(post?.users?.name)?.href}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h5 className="text-sm font-semibold">
                {post?.users?.name || user?.name}
              </h5>
              <p className="text-sm font-normal">
                {dayjs(post?.$createdAt).format("MMM D, YYYY")}
                {/* 2/3/2023 */}
              </p>
            </div>
          </Link>

          {isAuthor && (
            <div>
              <TrashIcon
                className="w-6 h-6 cursor-pointer"
                onClick={handleDelete}
              />
            </div>
          )}
        </div>

        {/* content of post */}
        <div className="middle my-3 space-y-5">
          {post?.caption && (
            <p className="text-sm font-medium ">{post?.caption}</p>
          )}
          <div>
            <img
              // src={post?.img}
              src={photos.filePreview(post.Image)}
              className="max-w max-h-[300px]  rounded-lg object-cover mx-auto"
              alt=""
            />
          </div>
        </div>

        {/* buttons for like and comment */}
        <div className="flex gap-4 items-center">
          <span>{post?.likes?.length + 1} Likes</span>
          <div className="flex items-center gap-2">
            {isLiked ? (
              <>
                <HandThumbUpIcon
                  className="w-6 h-6  cursor-pointer text-orange-500"
                  onClick={handleLike}
                />

                <span>Liked</span>
              </>
            ) : (
              <>
                <HandThumbUpIcon
                  className="w-6 h-6  cursor-pointer text-black"
                  onClick={handleLike}
                />

                <span>Like</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>

            <span>Comment</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
