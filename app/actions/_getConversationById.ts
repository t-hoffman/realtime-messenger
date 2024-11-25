"use server";

import { CONVERSATION_BY_ID_QUERY } from "@/db/queries/conversationQueries";
import getGraphql from "./getGraphql";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) return null;
  // if (!currentUser?.email) return null;

  const { data, error } = await getGraphql({
    queryName: "getConversation",
    query: CONVERSATION_BY_ID_QUERY,
    variables: { conversationId },
    defaultReturn: null,
  });

  if (error) return null;

  return data;
};

export default getConversationById;
