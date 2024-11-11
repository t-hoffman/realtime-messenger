import axios from "axios";
import getCurrentUser from "./getCurrentUser";
import { getConversationsQuery } from "@/db/queries/getConversations";
import useGraphql from "../hooks/useGraphql";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) return [];

  const conversations = await useGraphql({
    queryName: "getConversations",
    query: getConversationsQuery,
    variables: { userId: currentUser.id },
  });

  // console.log("DATA", conversations);

  return conversations;
};

export default getConversations;
