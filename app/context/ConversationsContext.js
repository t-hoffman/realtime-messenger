"use client";

import { CONVERSATIONS_BY_USER_QUERY } from "@/db/queries/conversationQueries";
import { useQuery } from "@apollo/client";
import { createContext, useContext, useState } from "react";
import clientLocal from "../libs/apolloClientLocal";
import { useAuthContext } from "./AuthContext";

const ConversationsContext = createContext();

export function useConversationsContext() {
  return useContext(ConversationsContext);
}

export default function ConversationsProvider({
  initialConversations,
  children,
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const { currentUser } = useAuthContext();
  const { refetch } = useQuery(CONVERSATIONS_BY_USER_QUERY, {
    client: clientLocal,
    variables: { userId: currentUser.id },
    skip: initialConversations !== undefined,
  });

  const refetchConversations = async () => {
    const { data } = await refetch();
    setConversations(data.getConversations);
  };

  const contextValue = {
    conversations,
    setConversations,
    refetchConversations,
  };

  return (
    <ConversationsContext.Provider value={contextValue}>
      {children}
    </ConversationsContext.Provider>
  );
}
