import { ListBulletIcon, TableCellsIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { PostCard } from "../components";
import { useSelector } from "react-redux";
import database from "../appwrite/db";

const LikedPostPage = () => {
  const [gridView, setGridView] = useState(false);
  const [post, setPost] = useState();
  const userId = useSelector((state) => state.auth.user.$id);
  useEffect(() => {
    const fetchLikedPost = async () => {
      const data = await database.getAllPost();
      const likedPost = data.documents.filter(
        (post) => post.likes.indexOf(userId) != -1
      );
      setPost(likedPost);
    };
    fetchLikedPost();
  }, []);
  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl my-5">Liked Post</h2>

      {/*  grid vs list view switches*/}
      <div
        className={`sm:flex  items-center hidden   rounded-full bg-slate-200 w-fit `}
      >
        <button
          className={`flex  gap-2 items-center ${
            !gridView && "bg-orange-500 text-white"
          }  rounded-full py-2 px-3`}
          onClick={() => setGridView(false)}
        >
          <ListBulletIcon className="w-8 h-8 " />
          <span>List</span>
        </button>

        <button
          className={`${
            gridView && "bg-orange-500 text-white"
          } flex gap-2 items-center rounded-full py-2 px-3`}
          onClick={() => setGridView(true)}
        >
          <TableCellsIcon className="w-8 h-8 " />
          <span>Grid</span>
        </button>
      </div>

      <div
        className={`${gridView && "grid md:grid-cols-3 grid-cols-2"} space-y-4`}
      >
        {post ? (
          post?.map((singlePost) => {
            return <PostCard key={singlePost?.$id} post={singlePost} />;
          })
        ) : (
          <h1 className="text-gray-500 font-semibold text-xl">
            No Post Liked By You
          </h1>
        )}
      </div>
    </div>
  );
};

export default LikedPostPage;
