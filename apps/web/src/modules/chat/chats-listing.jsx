import { ChatList } from "react-chat-elements";
import { useNavigate } from "react-router";

export const ChatListingItem = (props) => {
  const { id, icon, name, lastItem } = props.item || {};

  return (
    <div className="cursor-pointer hover:bg-gray-100 w-full p-2 border-b flex gap-2">
      <div className="flex items-center">
        <img className="w-12 h-12 rounded-full" src={icon} />
      </div>
      <div>
        <h3 className="text-sm">{name}</h3>
        <p className="text-gray-600">{lastItem}</p>
      </div>
    </div>
  );
};

export const chatsMock = [];

for (let i = 0; i < 30; ++i) {
  chatsMock.push({
    id: i,
    avatar: `https://randomuser.me/api/portraits/thumb/women/${i}.jpg`,
    alt: "avatar",
    title: `Chat ${i}`,
    subtitle: "Hello, you there...",
    date: new Date(),
    unread: 0,
  });
}

export const ChatListing = ({ data }) => {
  const navigate = useNavigate();

  function handleOnChatClick(e) {
    navigate(`/chats/${e.id}`);
  }

  return (
    <ChatList
      className="chat-list"
      onClick={handleOnChatClick}
      dataSource={data}
    />
  );
};

export const MyChatListing = (props) => {
  const data = [];

  for (let i = 0; i < 30; ++i) {
    data.push({
      id: i,
      name: `Chat ${i}`,
      icon: `https://randomuser.me/api/portraits/thumb/women/${i}.jpg`,
      lastItem: "Hello, you there...",
    });
  }

  return (
    <div className="overflow-y-scroll">
      {data.map((item) => {
        return <ChatListingItem item={item} key={`ChatListing_${item.id}`} />;
      })}
    </div>
  );
};
