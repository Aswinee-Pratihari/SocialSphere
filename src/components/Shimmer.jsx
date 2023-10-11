import React from "react";

const Shimmer = () => {
  return (
    <div className=" shadow rounded-md p-4 animate-pulse max-w  w-full mx-auto">
      <div className=" flex space-x-4  ">
        <div className="rounded-full  bg-slate-500 h-10 w-10"></div>
        <div className="h-5 bg-slate-600 rounded w-20"></div>
      </div>
      <div className="flex-1 space-y-6 mt-6 py-1">
        <div className="space-y-3">
          <div className="h-32 w-full bg-slate-600 rounded col-span-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
