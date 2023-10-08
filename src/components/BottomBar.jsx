import React from "react";
import {
  BeakerIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogOutBtn } from "./index";
const BottomBar = () => {
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
      name: "Like",
    },
    {
      icon: <UserIcon className="w-6 h-6" />,
      slug: `/profile/${userId}`,
      name: "Profile",
    },
  ];
  return (
    <>
      <>
        {/* <h1 className="font-bold text-2xl block max-md:hidden">SOCIALS</h1> */}
        <div className="flex  gap-6 items-center justify-between  ">
          {navItems?.map((item) => {
            return (
              <Link
                to={item?.slug}
                className="flex flex-col items-center  hover:bg-orange-500 w-full p-2 rounded-lg hover:shadow-lg cursor-pointer sm:justify-start justify-center"
                key={item?.name}
              >
                {item?.icon}
                <h4 className="block ">{item?.name}</h4>
              </Link>
            );
          })}
          {authStatus && <LogOutBtn />}
        </div>
      </>
    </>
  );
};

export default BottomBar;
