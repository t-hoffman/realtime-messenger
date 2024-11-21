"use client";

import useConversation from "@/app/hooks/useConversation";
import { useEffect, useState } from "react";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { useSubscription } from "@apollo/client";
import { CONVERSATIONS_SUBSCRIPTION } from "@/db/queries/conversationSubscriptions";
import clientAppSync from "@/app/libs/apolloClientAppSync";
import { useAuthContext } from "@/app/context/AuthContext";
import { HiMiniPencilSquare } from "react-icons/hi2";

export default function ConversationList({ allUsers }) {
  const { currentUser } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);
  const { conversations, conversationId, isOpen, setConversations } =
    useConversation();

  const { data, loading, error } = useSubscription(CONVERSATIONS_SUBSCRIPTION, {
    client: clientAppSync,
    variables: { userId: currentUser.id },
  });

  useEffect(() => {
    if (data?.onConversationUpdate) {
      const newConvo = data.onConversationUpdate;

      /**
       * Filter out convo & update the convos array with the new convo data from the subscription
       * & add it back to the top -- or add the new convo to the top of the convos array
       * */

      setConversations((prevItems) => [
        { ...newConvo },
        ...prevItems.filter((item) => item.id !== newConvo.id),
      ]);
    }
  }, [data]);

  return (
    <>
      <GroupChatModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        users={allUsers}
      />
      <div className="flex justify-between mb-4 px-3">
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
      <div className="flex flex-col gap-0.5">
        {conversations.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </>
  );
}
