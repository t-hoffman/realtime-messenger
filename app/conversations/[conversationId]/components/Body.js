"use client";

import useConversation from "@/app/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_TO_MESSAGES } from "@/db/queries/messageMutations";
import { useConversations } from "@/app/context/ConversationsContext";

const Body = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef(null);
  const { conversationId } = useConversation();

  const { refetchConvos } = useConversations();

  const { data, loading, error } = useSubscription(SUBSCRIBE_TO_MESSAGES);

  useEffect(() => {
    bottomRef.current.scrollIntoView();
    console.log(data, loading, error);

    if (data?.onNewMessage) {
      refetchConvos();
      setMessages((prevItems) =>
        prevItems.some((item) => item.id === data.onNewMessage.id)
          ? prevItems
          : [...prevItems, data.onNewMessage]
      );
    }
  }, [data]);
  // console.log(messages);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Body;
