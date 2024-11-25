"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import clientLocal from "@/app/libs/apolloClientLocal";

import { ADD_CONVERSATION_MUTATION } from "@/db/queries/conversationMutations";
import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import useConversation from "@/app/hooks/useConversation";

export default function UserBox({ data }) {
  const { setConversations } = useConversation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [newConversation] = useMutation(ADD_CONVERSATION_MUTATION, {
    client: clientLocal,
  });

  const handleClick = useCallback(() => {
    setIsLoading(true);

    newConversation({
      variables: {
        input: { members: [data.id] },
      },
    })
      .then((data) => {
        const {
          data: { addConversation: convo },
        } = data;

        // added setState after removing /conversations Layout SSR props
        setConversations((prevItems) => [
          convo,
          ...prevItems.filter((item) => item.id !== convo.id),
        ]);

        router.push(`/conversations/${convo.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        bg-white
        p-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
      "
      >
        <Avatar user={data} overrideSmall />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
