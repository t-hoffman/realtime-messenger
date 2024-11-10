import axios from "axios";
import getCurrentUser from "./getCurrentUser";
import { getConversationsQuery } from "@/db/queries/getConversations";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) return [];

  try {
    const {
      data: { data },
    } = await axios.post("http://localhost:3000/api/graphql", {
      query: getConversationsQuery,
      variables: { userId: currentUser.id },
    });

    return data.getConversations;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getConversations;
