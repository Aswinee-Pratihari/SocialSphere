import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import photos from "../appwrite/file";
import database from "../appwrite/db";
import { useNavigate } from "react-router-dom";
import { Input } from "./index";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

const Modal = ({ openModal }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        caption: "",
        Image: "",
        slug: "",
      },
    });

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    // const file = e.target.files[0];
    console.log("file");
  };
  const submit = async (data) => {
    // console.log(id);
    setLoading(true);
    const file = await photos.uploadFile(data.Image[0]);
    if (file) {
      setError("");
      const fileId = file?.$id;
      data.Image = fileId;
      try {
        const dbPost = await database.createPost({
          ...data,
          userId: user.$id,
        });
        if (dbPost) {
          navigate("/");
          openModal(false);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-lg">
      <div className="sm:w-[450px] md:w-[600px] w-[300px] flex flex-col ">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => openModal(false)}
        >
          X
        </button>
        <form action="" onSubmit={handleSubmit(submit)}>
          <div className="bg-white  p-2 rounded-lg text-center">
            {error && <p>{error}</p>}
            <input
              type="file"
              className="hiddn"
              id="file"
              accept="image/png, image/jpg, image/jpeg, image/gif ,image/jfif"
              onChange={handleFileChange}
              {...register("Image", { required: true })}
            />

            {/* <label
              htmlFor="file"
              className="w-full flex justify-center items-center border-dotted border-2"
            >
              <div className="flex flex-col justify-center items-center w-full p-4">
                <div className="min-h-[300px] flex justify-center items-center flex-col">
                  <CloudArrowUpIcon className="text-lg text-black w-10 h-10" />
                  <h5 className="text-base leading-10 text-gray-600 py-3">
                    upload your Image over here <hr /> *(Format being image/png,
                    image/jpg, image/jpeg, image/gif)
                  </h5>
                </div>

                </div>
              </label> */}
            <Input placeholder="Add your caption" {...register("caption")} />

            <button
              className={`${
                loading && "cursor-not-allowed bg-gray-400"
              } bg-orange-600 px-5 py-2  text-lg font-semibold mt-4 w-1/2  rounded-lg shadow-lg text-white inline-block`}
            >
              {loading ? "Posting" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
