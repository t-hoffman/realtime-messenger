"use client";

import useConversation from "@/app/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { useSubscription } from "@apollo/client";
import { CONVERSATIONS_SUBSCRIPTION } from "@/db/queries/conversationSubscriptions";
import clientAppSync from "@/app/libs/apolloClientAppSync";
import { useAuthContext } from "@/app/context/AuthContext";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Sound from "./Sound.js";

export default function ConversationList({ allUsers }) {
  const { currentUser } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);
  const { conversations, conversationId, isOpen, setConversations } =
    useConversation();

  const { data } = useSubscription(CONVERSATIONS_SUBSCRIPTION, {
    client: clientAppSync,
    variables: { userId: currentUser.id },
  });

  useEffect(() => {
    if (data?.onConversationUpdate) {
      const { id, tag } = data.onConversationUpdate;
      const isDeletion = tag === "DELETION";

      setConversations((prevItems) => {
        if (isDeletion) {
          return prevItems.filter((item) => item.id !== id);
        }

        const updatedConvo = { ...data.onConversationUpdate };
        const filteredItems = prevItems.filter((item) => item.id !== id);

        return [updatedConvo, ...filteredItems];
      });
    }
  }, [data]);

  const openConvo = useRef(null);

  useEffect(() => {
    if (openConvo.current) {
      openConvo.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [openConvo]);

  const soundKey = data?.onConversationUpdate?.messages?.length;

  return (
    <>
      <Sound data={data} key={soundKey} />
      <div className="flex flex-col flex-1 h-full">
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
      </div>
    </>
  );
}
