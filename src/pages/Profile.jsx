import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { PostCard } from "../components";
import { useParams } from "react-router-dom";
import database from "../appwrite/db";
import Avatar from "react-avatar";

const Profile = () => {
  const { id } = useParams();
  const posts = [];
  const [user, setUser] = useState(null);
  // const user = null;
  useEffect(() => {
    const fetchUser = async () => {
      const data = await database.getSingleUser(id);
      setUser(data);
    };
    fetchUser();
  }, [id]);
  return (
    <section className="p-3 rounded-lg  flex">
      <div className="flex-[3]">
        <div className="space-y-5">
          <div className="white  w-full bg-white h-[400px] rounded-2xl">
            <div className="h-1/2 relative ">
              <img
                src="https://online-communities.demos.buddyboss.com/wp-content/sandbox211102-uploads/buddypress/members/2/cover-image/621e2cf2a9e5d-bp-cover-image.jpg"
                alt=""
                className="w-full h-full "
              />
            </div>
            <div className="flex justify-center items-center flex-col ">
              {/* profile image */}
              <Avatar
                name={user?.name}
                size="70"
                textSizeRatio={0.76}
                // textMarginRatio={0.3}
                round={true}
              />
              <h4 className="text-lg font-bold tracking-wide">{user?.name}</h4>
              <span className="text-sm font-light ">
                Joined {dayjs(user?.$createdAt).format("MMM , YYYY")}
              </span>
              <div className="flex items-center gap-4">
                <p className="text-sm font-normal">
                  {/* <span className="font-bold">{user?.followers.length}</span> */}
                  Followers
                </p>
                <p className="text-sm font-normal">
                  {/* <span className="font-bold">{user?.following.length}</span> */}
                  Following
                </p>
              </div>
            </div>
          </div>

          {user?.posts?.length > 0 ? (
            user?.posts?.map((post) => {
              return <PostCard post={post} key={post?.$id} user={user} />;
            })
          ) : (
            <div className="text-xl text-center text-slate-500 font-semibold">
              no post to show
            </div>
          )}

          {/* <PostCard /> */}
        </div>
      </div>
      <div className="flex-[1] gap-3 max-md:hidden h-screen sticky top-0 bottom-0">
        {/* <Following userId={user?._id} />
    <Follower userId={user?._id} /> */}
      </div>
    </section>
  );
};

export default Profile;
