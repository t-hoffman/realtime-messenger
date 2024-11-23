import { useParams } from "next/navigation";
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

  const conversationId = !params?.conversationId ? "" : params.conversationId;

  const conversation =
    conversations?.find((convo) => convo.id === conversationId) || null;

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
