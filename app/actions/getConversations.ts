import getCurrentUser from "./getCurrentUser";
import getGraphql from "./getGraphql";
import { CONVERSATIONS_BY_USER_QUERY } from "@/db/queries/conversationQueries";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) return [];

  const { data, error } = await getGraphql({
    queryName: "getConversations",
    query: CONVERSATIONS_BY_USER_QUERY,
    variables: { userId: currentUser.id },
  });

  if (error) return null;

  return data;
};

export default getConversations;
