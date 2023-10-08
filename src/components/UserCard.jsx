import React, { useState } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import database from "../appwrite/db";

const UserCard = ({ name, email, id, followers }) => {
  const user = useSelector((state) => state.auth.user);
  const [isFollowing, setIsFollowing] = useState(
    followers.indexOf(user?.$id) !== -1
  );

  const handlefollow = async () => {
    const userDetails = await database.getSingleUser(user?.$id);
    try {
      if (followers.indexOf(user?.$id) == -1) {
        console.log("followed");
        setIsFollowing(true);
        followers.push(user?.$id);
        userDetails.following.push(id);
        const followerArray = await database.followUser(id, followers);
        const followingArray = await database.following(
          user?.$id,
          userDetails?.following
        );
        console.log(followerArray, followingArray);
      } else {
        setIsFollowing(false);

        console.log("unfollowed");
        followers = followers.filter((id) => id !== userDetails?.$id);
        userDetails.following = userDetails?.following.filter(
          (userId) => userId !== id
        );
        const followerArray = await database.followUser(id, followers);
        const followingArray = await database.following(
          user?.$id,
          userDetails?.following
        );
        console.log(followerArray, followingArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex  items-center justify-between w-full">
      <Link to={`/profile/${id}`}>
        <>
          <div className="flex gap-4 items-center">
            <img
              src={database.getAvatar(name)?.href}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="details ">
              <h2 className="text- font-semibold ">{name}</h2>
              <p className="text-base font-semibold text-gray-500">{email}</p>
            </div>
          </div>
        </>
      </Link>
      {user?.$id != id ? (
        <>
          {isFollowing ? (
            <>
              <button
                className="text-lg font-semibold text-white bg-gray-700 px-3 py-1 rounded-md shadow-md"
                onClick={handlefollow}
              >
                Following
              </button>
            </>
          ) : (
            <button
              className="text-lg font-semibold text-white bg-orange-500 px-3 py-1 rounded-md shadow-md"
              onClick={handlefollow}
            >
              Follow
            </button>
          )}
        </>
      ) : (
        <button className="text-lg font-semibold text-white bg-gray-500 px-3 py-1 rounded-md shadow-md">
          Self Profile
        </button>
      )}
    </div>
  );
};

export default UserCard;
