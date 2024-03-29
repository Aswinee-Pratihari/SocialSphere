import React from "react";
import {
  BeakerIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HandThumbUpIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogOutBtn } from "./index";
const SideBar = ({ lastVisitedRoute }) => {
  const userDetails = useSelector((state) => state.auth);
  const authStatus = userDetails.status;
  const userId = userDetails?.user?.$id;

  const navItems = [
    {
      icon: <HomeIcon className="w-6 h-6" />,
      slug: "/",
      name: "Home",
    },
    {
      icon: <MagnifyingGlassIcon className="w-6 h-6" />,
      slug: "/search",
      name: "Search",
    },
    {
      icon: <HandThumbUpIcon className="w-6 h-6" />,
      slug: "/likedPost",
      name: "Liked Post",
    },
    {
      icon: <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />,
      slug: `/chat`,
      name: "Chat",
    },
    {
      icon: <UserIcon className="w-6 h-6" />,
      slug: `/profile/${userId}`,
      name: "Profile",
    },
  ];
  return (
    <div
      className={`bg-white p-4 h-screen fixed top-0 bottom-0 ${
        !lastVisitedRoute && "w-[200px]"
      } max-md:w-[90px] max-sm:[50px]`}
    >
      <div className="flex flex-col gap-4 items-start  w-full  h-full">
        <h1 className={`font-bold text-2xl block ${" max-md:hidden"}`}>
          SOCIALS
        </h1>
        <div className="flex flex-col gap-6 items-start  h-full  w-full">
          {navItems?.map((item) => {
            return (
              <Link
                to={item?.slug}
                className="flex items-center gap-3 hover:bg-orange-500 w-full p-3 rounded-lg hover:shadow-lg cursor-pointer sm:justify-start justify-center"
                key={item?.name}
              >
                {item?.icon}
                <h4 className={`block max-md:hidden ${" max-md:hidden"}`}>
                  {item?.name}
                </h4>
              </Link>
            );
          })}
          {authStatus && <LogOutBtn lastVisitedRoute={lastVisitedRoute} />}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
