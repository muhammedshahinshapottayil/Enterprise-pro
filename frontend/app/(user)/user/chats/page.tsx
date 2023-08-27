"use client";
import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "components/chat/major-components/Chatbox";
import MyChats from "components/chat/major-components/MyChats";
import SideDrawer from "components/chat/miscellaneous/SideDrawer";
import { ChatState } from "Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user }:any = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
