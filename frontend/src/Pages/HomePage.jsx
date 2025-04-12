import ChatContainer from "../Components/ChatContainer";
import Navbar from "../Components/Navbar";
import NoChatSelected from "../Components/NoChatSelected";
import Sidebar from "../Components/Sidebar";
import { useChatStore } from "../Components/Strore/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className=" min-h-screen">
      <Navbar />
      <div className="w-full px-6 py-8 flex justify-center items-center">
        <div className="bg-white w-full max-w-6xl rounded-3xl shadow-xl h-[calc(100vh-7rem)] overflow-hidden">
          <div className="flex h-full">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
