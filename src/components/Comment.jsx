import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import database from "../appwrite/db";

const Comment = ({
  caption,
  postImg,
  postId,
  openCommentBox,
  userId,
  name,
}) => {
  console.log(postId);
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [openCommentBox]);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      comment: "",
      userId: userId,
      name: name,
    },
  });

  const submit = async (data) => {
    // console.log(data);
    try {
      if (data.comment.length > 0) {
        await database.commentOnPost(postId, { ...data });
      } else {
        toast.error("Cant put an empty comment");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-lg ">
      <div className="sm:w-[450px] md:w-[600px] w-[300px] flex flex-col ">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => openCommentBox(false)}
        >
          X
        </button>

        <div className="bg-white h-[600px]  p-5  rounded-lg overflow-y-scroll">
          <img src={postImg?.href} alt="" className="max-h-[300px] mx-auto " />
          <p className="text-black text-lg text-center">{caption}</p>

          <form
            action=""
            onSubmit={handleSubmit(submit)}
            className="block sm:flex gap-3 items-end justify-between my-5"
          >
            <Input
              placeholder="Give Your Comment"
              {...register("comment")}
              type="text"
            />
            <button
              className={`${
                loading && "cursor-not-allowed bg-gray-400"
              } bg-orange-600 px-5 py-2  text-lg font-semibold mt-4 block  ml-auto  rounded-lg shadow-lg text-white `}
            >
              {loading ? "Wait" : "Reply"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comment;
