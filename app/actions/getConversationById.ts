import { getConversationByIdQuery } from "@/db/queries/getConversationById";
import useGraphql from "../hooks/useGraphql";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: number) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.email) return null;

  const conversation = await useGraphql({
    queryName: "getConversation",
    query: getConversationByIdQuery,
    variables: { conversationId },
    // defaultReturn: null,
  });

  return conversation;
};

export default getConversationById;
