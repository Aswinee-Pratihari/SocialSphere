// ChatBox.js
import React from "react";
import { useSelector } from "react-redux";

function ChatBox({ messages }) {
  const currentUserId = useSelector((state) => state.auth.user.$id);
  // console.log(currentUserId);
  // console.log(messages);
  return (
    <div className={`chat-box `}>
      {messages.map((message, index) => (
        <div
          key={index}
          class={`flex ${
            message.userId !== currentUserId ? "justify-start" : "justify-end"
          } mb-4`}
        >
          <div
            class={`w-1/2 max-w-md p-4 break-words ${
              message.userId === currentUserId
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-black"
            }  rounded-lg`}
          >
            {message.body}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatBox;
