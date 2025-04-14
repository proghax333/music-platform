import { cls } from "@/utils/cls";
import React from "react";
import { ChatItem } from "react-chat-elements";

function ChatsView({ className }) {
  const chatItems = [
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Facebook",
      subtitle: "What are you doing?",
      date: new Date(),
      unread: 0,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Instagram",
      subtitle: "Check out this post!",
      date: new Date(),
      unread: 2,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Messenger",
      subtitle: "Let’s catch up later.",
      date: new Date(),
      unread: 5,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "WhatsApp",
      subtitle: "Voice message received.",
      date: new Date(),
      unread: 1,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Work Group",
      subtitle: "Project deadline is tomorrow!",
      date: new Date(),
      unread: 3,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Work Group",
      subtitle: "Project deadline is tomorrow!",
      date: new Date(),
      unread: 3,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Work Group",
      subtitle: "Project deadline is tomorrow!",
      date: new Date(),
      unread: 3,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Work Group",
      subtitle: "Project deadline is tomorrow!",
      date: new Date(),
      unread: 3,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Work Group",
      subtitle: "Project deadline is tomorrow!",
      date: new Date(),
      unread: 3,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Work Group",
      subtitle: "Project deadline is tomorrow!",
      date: new Date(),
      unread: 3,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Work Group",
      subtitle: "Project deadline is tomorrow!",
      date: new Date(),
      unread: 3,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Work Group",
      subtitle: "Project deadline is tomorrow!",
      date: new Date(),
      unread: 3,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Work Group",
      subtitle: "Project deadline is tomorrow!",
      date: new Date(),
      unread: 3,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Work Group",
      subtitle: "Project deadline is tomorrow!",
      date: new Date(),
      unread: 3,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Work Group",
      subtitle: "Project deadline is tomorrow!",
      date: new Date(),
      unread: 3,
    },
    {
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      alt: "Reactjs",
      title: "Work Group",
      subtitle: "Project deadline is tomorrow!",
      date: new Date(),
      unread: 3,
    },
  ];

  return (
    <div className={cls("w-full h-full flex flex-col", className)}>
      <div className="w-full flex items-center justify-center border-b">
        <h2 className="font-semibold p-2 pointer-events-none select-none">
          Chats
        </h2>
      </div>
      <div className="flex-1 flex flex-col overflow-y-scroll bg-red-300">
        {chatItems.map((item, idx) => {
          return <ChatItem key={`chat-item-${idx}`} {...item} />;
        })}
      </div>
    </div>
  );
}

export default ChatsView;
