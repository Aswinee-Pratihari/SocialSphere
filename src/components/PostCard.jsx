import React, { useEffect, useState } from "react";
import img from "../assets/logo.png";
import { HandThumbUpIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import photos from "../appwrite/file";
import database from "../appwrite/db";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const PostCard = ({ post, name }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);
  const userId = user?.$id;
  const isAuthor = post && userId ? userId === post.userId : false;
  const [isLiked, setIsLiked] = useState(post.likes.indexOf(userId) !== -1);
  const [likePost, setLikePost] = useState(true);
  const handleLike = async () => {
    try {
      if (post.likes.indexOf(userId) == -1) {
        post.likes.push(userId);
        await database.LikePost(post.$id, post.likes);
        setIsLiked(true);
        setLikePost(true);
        console.log(post.likes);
        toast.success("Post Liked");
      } else {
        post.likes = post.likes.filter((id) => id != userId);
        await database.LikePost(post.$id, post.likes);
        setIsLiked(false);
        setLikePost(false);
        toast.success("Post disliked");
        console.log(post.likes);
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
      <div className="p-3 rounded-lg bg-white ">
        <div className="flex justify-between items-center">
          <Link
            to={`/profile/${post?.userId}`}
            className="top flex items-center gap-3"
          >
            <img
              src={database.getAvatar(post?.users?.name)?.href}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h5 className="text-sm font-semibold">
                {post?.users?.name || name}
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
          <span>{likePost && post?.likes?.length} Likes</span>
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
        </div>
      </div>
    </>
  );
};

export default PostCard;
