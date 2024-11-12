import { CONVERSATION_BY_ID_QUERY } from "@/db/queries/conversationQueries";
import useGraphql from "../hooks/useGraphql";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: number) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.email) return null;

  const conversation = await useGraphql({
    queryName: "getConversation",
    query: CONVERSATION_BY_ID_QUERY,
    variables: { conversationId },
    defaultReturn: null,
  });

  return conversation;
};

export default getConversationById;
