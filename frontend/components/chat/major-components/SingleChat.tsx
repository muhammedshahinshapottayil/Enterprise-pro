"use client";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "utils/chat-logics/ChatLogics";
import { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "animations/typing.json";
import io from "socket.io-client";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";
import { ChatState } from "Context/ChatProvider";
import chatInstance from "config/axiosConfig/chatInstance";
const ENDPOINT = "http://localhost:5000";
let socket: any, selectedChatCompare: any;

const SingleChat = ({ fetchAgain, setFetchAgain }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [newMessageRecieved, setNewMessageRecieved] = useState<any>("");
  const [newMessageRecievedReturn, setNewMessageRecievedReturn] =
    useState<any>("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [AckConnected, setAckConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
  }: any = ChatState();

  useEffect(() => {
    if (AckConnected && selectedChat ) {
      fetchMessages();
      setAckConnected(false);
    }
  }, [AckConnected]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await chatInstance.get(
        `/api/message/${selectedChat._id}`
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event: any) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");
        const { data } = await chatInstance.post("/api/message", {
          content: newMessage,
          chatId: selectedChat,
        });
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    socket.emit("joined now", selectedChat);
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    if (newMessageRecieved) {
      newMessageRecieved?.readBy.push(user.id);
      socket.emit("message reached", newMessageRecieved);
      setMessages([...messages, newMessageRecieved]);
      setNewMessageRecieved("");
    }
  }, [newMessageRecieved]);

  useEffect(() => {
    if (newMessageRecievedReturn) {
      const setViewedMessage = async () => {
        try {
          messages.pop();
          messages.push(newMessageRecievedReturn);
          setMessages([...messages]);
          setNewMessageRecievedReturn("");
          const { data } = await chatInstance.post(`/api/message/viewed`);
        } catch (error) {
          toast({
            title: "Error Occured While Recieving Data",
            description: "Failed to send the Message",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      };
      setViewedMessage();
    }
  }, [newMessageRecievedReturn]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: any) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else setNewMessageRecieved(newMessageRecieved);
    });
    socket.on("message reached return", (newMessageRecieved: any) => {
      setNewMessageRecievedReturn(newMessageRecieved);
    });
    socket.on("ack joined now", (data:any) => {
      console.log('here');
      setAckConnected(true);
    });
  });
  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>{getSender(user, selectedChat.users)}</>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                letiant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
