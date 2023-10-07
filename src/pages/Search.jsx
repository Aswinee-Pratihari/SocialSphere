import React, { useEffect, useState } from "react";
import { Input, UserCard } from "../components";
import database from "../appwrite/db";

const Search = () => {
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
    // console.log(e.target.value);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await database.getAllUsers(query);
      console.log(data.documents);
      setUsers(data.documents);
    };
    fetchUsers();
  }, [query]);
  return (
    <div className=" sm:w-[450px] md:w-[600px] w-[300px] mx-auto py-7 flex flex-col justify-center gap-4 items-center ">
      <Input
        label="Search"
        placeholder="Search for an User"
        className="bg-gray-300"
        onChange={handleChange}
      />
      <div className="overflow-y-scroll  top-10 bottom-0 space-y-5 h-screen w-full">
        {users?.length > 0 &&
          users?.map((user) => {
            return (
              <UserCard
                name={user.name}
                email={user.email}
                id={user.$id}
                key={user?.$id}
                followers={user?.followers}
                following={user?.following}
              />
            );
          })}
        {/* <UserCard name={users.name} email={users.email} id={users.$id} key={}/> */}
      </div>
    </div>
  );
};

export default Search;
