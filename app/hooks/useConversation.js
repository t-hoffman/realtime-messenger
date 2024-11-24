import { useParams } from "next/navigation";
import { useConversationsContext } from "../context/ConversationsContext";
import { useMemo } from "react";

export default function useConversation() {
  const params = useParams();
  const context = useConversationsContext();

  let conversations, setConversations, refetchConversations;
  if (context) {
    conversations = context.conversations;
    setConversations = context.setConversations;
    refetchConversations = context.refetchConversations;
  }

  const conversationId = !params?.conversationId ? "" : params.conversationId;

  const conversation = useMemo(
    () => conversations?.find((convo) => convo.id === conversationId) || null,
    [conversationId, conversations]
  );

  const isOpen = !!conversationId;

  return {
    isOpen,
    conversationId,
    conversation,
    conversations,
    refetchConversations,
    setConversations,
  };
}
