"use client";

import useConversation from "@/app/hooks/useConversation";
import { useRef, useState } from "react";
import MessageBox from "./MessageBox";

const Body = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef(null);
  const { conversationId } = useConversation();

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24"></div>
    </div>
  );
};

export default Body;