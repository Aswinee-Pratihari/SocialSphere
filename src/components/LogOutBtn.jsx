import React from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { logOut } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
const LogOutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    authService.logOut().then(() => {
      dispatch(logOut());
      navigate("/login");
    });
  };
  return (
    <button
      className="flex items-center gap-3 hover:bg-orange-500 w-full p-3 rounded-lg hover:shadow-lg cursor-pointer"
      onClick={handleLogOut}
    >
      <ArrowLeftOnRectangleIcon className="w-6 h-6" />
      <h4 className="block max-md:hidden">LogOut</h4>
    </button>
  );
};

export default LogOutBtn;
