import React from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import database from "../appwrite/db";

const UserCard = ({ name, email, id, followers, following }) => {
  const user = useSelector((state) => state.auth.user);
  const handleFollow = async () => {
    try {
      followers.push(user.$id);
      // following.push()
      const data = await database.followUser(id, followers);
      console.log(data);
    } catch (error) {
      console.log(error.status);
    }
  };
  return (
    <div className="flex  items-center justify-between w-full">
      <Link to={`/profile/${id}`}>
        <>
          <div className="flex gap-4 items-center">
            <Avatar
              name={name}
              size="40"
              textSizeRatio={0.76}
              textMarginRatio={0.3}
              round={true}
            />
            <div className="details ">
              <h2 className="text- font-semibold ">{name}</h2>
              <p className="text-base font-semibold text-gray-500">{email}</p>
            </div>
          </div>
        </>
      </Link>
      {user?.$id != id ? (
        <button
          className="text-lg font-semibold text-white bg-orange-500 px-3 py-1 rounded-md shadow-md"
          onClick={handleFollow}
        >
          Follow
        </button>
      ) : (
        <button className="text-lg font-semibold text-white bg-gray-500 px-3 py-1 rounded-md shadow-md">
          Self Profile
        </button>
      )}
    </div>
  );
};

export default UserCard;
