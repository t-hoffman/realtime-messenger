"use client";

import { CONVERSATIONS_BY_USER_QUERY } from "@/db/queries/conversationQueries";
import { useQuery } from "@apollo/client";
import { createContext, useContext } from "react";
import clientLocal from "../libs/apolloClientLocal";

const ConversationsContext = createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ currentUser, children }) {
  const { data, loading, error, refetch } = useQuery(
    CONVERSATIONS_BY_USER_QUERY,
    {
      client: clientLocal,
      variables: { userId: currentUser.id },
    }
  );

  return (
    <ConversationsContext.Provider
      value={{
        currentUser,
        conversations: data?.getConversations || [],
        loading,
        error,
        refetchConvos: refetch,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
