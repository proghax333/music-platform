import { useNavigate, useParams } from "react-router";
import { chatsMock } from "./chats-listing";
import { useScreenType } from "@/hooks/useScreenType";
import { BiArrowBack, BiSend } from "react-icons/bi";

import { MessageList } from "react-chat-elements";

export function ChatMainPanel() {
  let { chatId } = useParams();

  const navigate = useNavigate();

  const screenType = useScreenType();
  const isSmallScreen = screenType === "small";

  let chat = chatsMock[chatId] || chatsMock[0];

  chat ??= {
    id: 0,
    avatar: `https://randomuser.me/api/portraits/thumb/women/${0}.jpg`,
    alt: "avatar",
    title: `Chat ${0}`,
    subtitle: "Hello, you there...",
    date: new Date(),
    unread: 0,
  };

  function handleBackButtonClick() {
    navigate("/chats");
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col">
        <div className="w-full p-2 flex gap-4 items-center shadow-sm">
          {isSmallScreen && (
            <button onClick={handleBackButtonClick}>
              <BiArrowBack className="w-5 h-5 ml-2" />
            </button>
          )}
          <img className="w-10 h-10 rounded-full" src={chat.avatar} />
          <h2>{chat.title}</h2>
        </div>
        <hr />
        {/* Chats */}
        <div className="flex flex-col w-full flex-1 overflow-y-auto">
          <MessageList
            className="py-2 flex-1"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={[
              {
                position: "left",
                type: "text",
                title: "Kursat",
                text: "Give me a message list example !",
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "This is a sample message.",
              },
              {
                position: "left",
                type: "text",
                title: "Kursat",
                text: "Alright, this works.",
              },
              {
                position: "left",
                type: "text",
                title: "Kursat",
                text: "We are good to go!",
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "Great!",
              },
              {
                position: "right",
                type: "text",
                title: "Emre",
                text: "Let's do this!",
              },
              {
                position: "left",
                type: "text",
                title: "Kursat",
                text: "Alright!",
              },
            ]}
          />
        </div>

        {/* Chat input */}
        <hr />
        <form>
          <div className="flex flex-row">
            {/* <p className="text-xs text-green-700">Active</p> */}
            <textarea
              className="rounded-none border-none outline-none flex-1 p-4"
              placeholder="Type your message...."
            ></textarea>
            <button
              className="normal-case min-w-16 border-none rounded-none bg-slate-900 text-white flex items-center justify-center p-4 gap-4"
              type="submit"
            >
              <BiSend width={32} />
              {!isSmallScreen && "Send"}
            </button>
          </div>
        </form>
        <hr />
      </div>
    </div>
  );
}
