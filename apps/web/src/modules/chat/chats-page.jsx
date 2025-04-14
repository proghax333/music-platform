import { ChatListing, chatsMock } from "./chats-listing";
import { Outlet, useParams } from "react-router";
import { useScreenType } from "@/hooks/useScreenType";
import MainNav from "@/components/main-nav";

const ChatsPage = (props) => {
  const data = chatsMock;

  const screenType = useScreenType();

  const isSmallScreen = screenType === "small";
  const smallStyles = screenType === "small" ? "w-full" : "";
  const smallStylesInner = screenType === "small" ? "w-full" : "w-80";

  const { chatId } = useParams();

  return (
    // <MainLayout showAppBar={true}>
    <>
      <MainNav />

      <div className="min-h-0 flex w-full flex-1">
        {/* Left panel */}
        {(!isSmallScreen || (isSmallScreen && chatId === undefined)) && (
          <div className={`h-full flex flex-col border-r ${smallStyles}`}>
            <div
              className={`flex flex-1 flex-col w-80 h-full ${smallStylesInner}`}
            >
              <div className="p-2 flex flex-col gap-1">
                <input
                  className="w-full input-md p-2 text-base"
                  placeholder="Search chats..."
                />
              </div>
              <ChatListing data={data} />
            </div>
          </div>
        )}

        {/* Main panel */}
        {(!isSmallScreen || (isSmallScreen && chatId !== undefined)) && (
          <div className="h-full flex flex-col w-full">
            <div className="flex flex-1 flex-col w-full h-full">
              <Outlet />
            </div>
          </div>
        )}
      </div>
      {/* <div>Bad</div> */}
    </>
  );
};

export default ChatsPage;
