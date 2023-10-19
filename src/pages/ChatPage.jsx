// ChatApp.js
import React, { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import UserList from "./UserList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import database from "../appwrite/db";
import toast from "react-hot-toast";

function ChatApp() {
  const currentuserId = useSelector((state) => state?.auth?.user?.$id);
  const { id } = useParams();
  const combinedId = id.slice(3) + currentuserId.slice(3);
  // console.log(combinedId);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("");

  const handleSendMessage = async () => {
    try {
      if (newMessage) {
        const res = await database.createMessage(
          chatId,
          currentuserId,
          newMessage
        );
        console.log(res);
        // setMessages([...messages, { text: newMessage, user: "yo" }]);
        setNewMessage("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getChat = async (firstId, secondId) => {
      try {
        const res = await database.getChat(firstId, secondId);
        console.log(res);
        if (res != null) {
          // get the message list
          setChatId(res?.$id);
          setMessages(res?.messages);
        } else {
          //create a new document

          try {
            const res = await database.createChat(
              combinedId,
              currentuserId,
              id
            );
            setChatId(res?.$id);
            // console.log(res);
          } catch (error) {
            toast.error(error.message);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      }
    };
    getChat(id.slice(3), currentuserId.slice(3));
  }, []);

  const [newMessage, setNewMessage] = useState("");

  return (
    <div className=" bg-white flex  ml-0  sm:w-full  w-[calc(100vh-20px)] md:h-screen h-[calc(100vh-50px)] ">
      <div className="flex-1 flex flex-col  ">
        <header className="bg-orange-500 text-white p-4">
          <h1 className="text-2xl">Chat App</h1>
        </header>
        <main className="flex-1 p-4 overflow-y-scroll">
          <ChatBox messages={messages} />
        </main>
        <div className="bg-white p-4 border-t-2 border-gray-200">
          <div className="flex">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 rounded-l border outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-orange-500 text-white p-2 rounded-r mr-10"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
