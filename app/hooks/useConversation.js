import { useParams } from "next/navigation";
import { useConversationsContext } from "../context/ConversationsContext";
import { useMemo } from "react";

export default function useConversation() {
  const params = useParams();
  const context = useConversationsContext();

  const conversationId = !params?.conversationId ? "" : params.conversationId;

  const conversation = useMemo(
    () =>
      context.conversations?.find((convo) => convo.id === conversationId) ||
      null,
    [conversationId, context.conversations]
  );

  const isOpen = !!conversationId;

  return { ...context, conversationId, conversation, isOpen };
}
