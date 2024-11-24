"use client";

import { CONVERSATIONS_BY_USER_QUERY } from "@/db/queries/conversationQueries";
import { useQuery, useSubscription } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { clientAppSync, clientLocal } from "../libs/apolloClients";
import { useAuthContext } from "./AuthContext";
import { CONVERSATIONS_SUBSCRIPTION } from "@/db/queries/conversationSubscriptions";
import Sound from "../conversations/components/Sound";

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

  const { data } = useSubscription(CONVERSATIONS_SUBSCRIPTION, {
    client: clientAppSync,
    variables: { userId: currentUser.id },
  });

  useEffect(() => {
    if (data?.onConversationUpdate) {
      const { id, tag } = data.onConversationUpdate;
      const isDeletion = tag === "DELETION";

      if (isDeletion) {
        setConversations((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
        /**
         * switched to this method since updating conversations based on the
         * updated convo sent from the subscription is buggy/has stale data.
         */
      } else {
        /**
         * could refine/optimize the project to fetch only convo id updated.
         * the conversations context and navigating thru all convos data
         * is not best practice anyway for scalability.
         */
        refetchConversations();
      }
    }
  }, [data, data?.onConversationUpdate?.messages?.length]);

  const soundKey = data?.onConversationUpdate?.messages?.length;

  const contextValue = {
    conversations,
    setConversations,
    refetchConversations,
  };

  return (
    <ConversationsContext.Provider value={contextValue}>
      <Sound data={data} key={soundKey} />
      {children}
    </ConversationsContext.Provider>
  );
}
