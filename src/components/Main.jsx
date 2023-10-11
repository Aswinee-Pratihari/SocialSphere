import React, { useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input, Modal, PostCard } from "./index";
import { useSelector } from "react-redux";
import database from "../appwrite/db";
import conf from "../conf/conf";
import Shimmer from "./Shimmer";
const Main = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const [OpenModal, setOpenModal] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const res = await database.getAllPost();
      setPost(res?.documents);
      setLoading(false);
    };

    database.client.subscribe(
      `databases.${conf.appwrite_database_id}.collections.${conf.appwrite_post_collection_id}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          fetchPost();
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setPost((prevState) =>
            prevState.filter((post) => post.$id !== response.payload.$id)
          );
        }
      }
    );

    fetchPost();
  }, []);
  return (
    <main className="p-4">
      <h2 className="font-bold text-2xl">Activity Feed</h2>
      <div
        className="flex items-center gap-4 bg-white px-5 py-3 rounded-xl mt-4 cursor-pointer"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        {/* <Avatars/> */}
        <img
          src={database.getAvatar(user?.name)?.href}
          alt=""
          className="w-10 h-10 rounded-full"
        />

        <span className="text-sm font-semibold text-gray-400">
          {`Share Whats in your mind ${user?.name}...`}
        </span>
      </div>
      {OpenModal && <Modal openModal={setOpenModal} />}
      {/* creating search for feed */}
      <div className="inputsearch flex gap-3 items-center rounded-lg shadow-xl bg-white w-fit my-4 p-3">
        <MagnifyingGlassIcon className="w-4 h-4 " />

        <Input
          className="font-medium rounded-lg text-sm"
          placeholder="search the feed"
        />
      </div>
      {/* reating post card */}
      {loading && <Shimmer />}
      <div className="space-y-4">
        {post &&
          post?.map((singlePost) => {
            return <PostCard key={singlePost?.$id} post={singlePost} />;
          })}
      </div>
    </main>
  );
};

export default Main;
