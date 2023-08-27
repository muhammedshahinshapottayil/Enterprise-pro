import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "utils/chat-logics/ChatLogics";
import { ChatState } from "Context/ChatProvider";

const ScrollableChat = ({ messages }: any) => {
  const { user }: any = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m: any, i: any) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user.id) ||
              isLastMessage(messages, i, user.id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user.id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.id),
                marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                position: "relative",
              }}
            >
              <span style={{ position: "absolute", top: 0, right: 0 }}>
                <span>
                  {m.sender._id === user.id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="15"
                      id="msg-dblcheck-ack"
                      x="2063"
                      y="2076"
                    >
                      <path
                        d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                        fill={`${
                          m.sender._id === user.id &&
                          m?.chat?.users?.length - 1 == m?.readBy?.length
                            ? "#4fc3f7"
                            : "#aeaeae"
                        }`}
                      />
                    </svg>
                  )}
                </span>
              </span>
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
