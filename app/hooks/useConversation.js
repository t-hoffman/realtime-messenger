import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useConversationsContext } from "../context/ConversationsContext";

export default function useConversation() {
  const params = useParams();
  const context = useConversationsContext();

  let conversations, setConversations, refetchConversations;
  if (context) {
    conversations = context.conversations;
    setConversations = context.setConversations;
    refetchConversations = context.refetchConversations;
  }

  const conversationId = useMemo(
    () => (!params?.conversationId ? "" : params.conversationId),
    [params?.conversationId]
  );

  const conversation = useMemo(
    () => conversations?.find((convo) => convo.id === conversationId) || null,
    [conversations, conversationId]
  );

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
      conversation,
      conversations,
      refetchConversations,
      setConversations,
    }),
    [
      isOpen,
      conversationId,
      conversation,
      conversations,
      refetchConversations,
      setConversations,
    ]
  );
}
