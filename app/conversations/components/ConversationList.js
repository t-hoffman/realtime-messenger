"use client";

import useConversation from "@/app/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { HiMiniPencilSquare } from "react-icons/hi2";

export default function ConversationList({ allUsers }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { conversations, conversationId } = useConversation();

  const openConvo = useRef(null);

  useEffect(() => {
    if (openConvo.current) {
      openConvo.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [openConvo]);

  return (
    <>
      <GroupChatModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        users={allUsers}
      />
      <div className="flex justify-between px-3">
        <div className="text-2xl font-bold text-neutral-800">Chats</div>
        <div
          data-text="Compose"
          onClick={() => setModalOpen(true)}
          className="
              tooltip
              rounded-full
              p-2
            bg-gray-100
              cursor-pointer
              hover:bg-gray-200
              transition
            "
        >
          <HiMiniPencilSquare size={20} />
        </div>
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="relative w-full">
          <div
            className="absolute w-full min-h-6 z-10 top-0"
            style={{
              background:
                "linear-gradient(rgba(255, 255, 255, 1), rgba(0, 0, 0, 0))",
            }}
          />
        </div>
        <div className="flex flex-col gap-0.5 flex-1 pt-3 overflow-y-auto h-full">
          {conversations.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
              passRef={openConvo}
              conversationId={conversationId}
            />
          ))}
        </div>
      </div>
    </>
  );
}
