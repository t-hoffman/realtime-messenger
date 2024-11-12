import axios from "axios";
import getCurrentUser from "./getCurrentUser";
import useGraphql from "../hooks/useGraphql";
import { CONVERSATIONS_BY_USER_QUERY } from "@/db/queries/conversationQueries";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) return [];

  const conversations = await useGraphql({
    queryName: "getConversations",
    query: CONVERSATIONS_BY_USER_QUERY,
    variables: { userId: currentUser.id },
  });

  // console.log("DATA", conversations);

  return conversations;
};

export default getConversations;
