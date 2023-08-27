import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "store/reducers/userDataSlice";
import { useAppSelector } from "store/store";

const ChatContext = createContext();
const ChatProvider = ({ children }: any) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const data = useAppSelector(getUserData).payload;
  const history = useRouter();
  useEffect(() => {
    setUser(data);
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
