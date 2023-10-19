// UserList.js
import React, { useEffect, useState } from "react";
import { Input, UserCard } from "../components";
import database from "../appwrite/db";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
    // console.log(e.target.value);
  };
  const currentUserId = useSelector((state) => state?.auth.user.$id);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await database.getAllUsers(query);
      // console.log(data.documents);
      setUsers(data.documents);
    };
    fetchUsers();
  }, [query]);
  // Replace with actual user data
  const user = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ];

  return (
    <aside className="w-screen  sm:w-1/2 mx-auto  bg-neutral-200 p-4 ">
      <Input
        label="Search"
        placeholder="Search for an User"
        className="bg-gray-300"
        onChange={handleChange}
      />
      <ul className="space-y-2">
        {users?.map((user) => (
          <>
            {currentUserId != user.$id && (
              <Link
                to={`/chat/${user.$id}`}
                key={user.$id}
                className="hover:bg-blue-100 p-2 rounded cursor-pointer text-black flex gap-2 items-center"
              >
                <img
                  src={database.getAvatar(user.name)?.href}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <p className="">{user.name}</p>
              </Link>
            )}
          </>
        ))}
      </ul>
    </aside>
  );
}

export default UserList;
