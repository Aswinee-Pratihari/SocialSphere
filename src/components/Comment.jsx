import React, { useState } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";

const Comment = ({ caption, postImg, openCommentBox }) => {
  // console.log({ caption, postImg });
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { comment: "" },
  });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-lg ">
      <div className="sm:w-[450px] md:w-[600px] w-[300px] flex flex-col ">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => openCommentBox(false)}
        >
          X
        </button>

        <div className="bg-white h-[600px]  p-5 rounded-lg">
          <img src={postImg?.href} alt="" className="h-[300px] mx-auto" />
          <p className="text-black text-lg text-center">{caption}</p>

          <form
            action=""
            onSubmit={handleSubmit()}
            className="flex gap-3 items-center"
          >
            <Input placeholder="Add your caption" {...register("caption")} />
            <button
              className={`${
                loading && "cursor-not-allowed bg-gray-400"
              } bg-orange-600 px-5 py-2  text-lg font-semibold mt-4 w-1/2  rounded-lg shadow-lg text-white inline-block`}
            >
              {loading ? "Posting" : "Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comment;
