"use client";

import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";

export default function Body() {
  console.log("<Body/>");
  const {
    conversation: { messages },
  } = useConversation();

  return (
    <div
      className="flex flex-col-reverse flex-1 overflow-y-auto"
      style={{ scrollbarColor: "#dbdbdb transparent", scrollbarWidth: "thin" }}
    >
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages?.length - 1}
          key={message.id}
          data={message}
        />
      ))}
    </div>
  );
}
