"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";

import { addConversationQuery } from "@/db/queries/addConversation";
import Avatar from "@/app/components/Avatar";

const UserBox = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [addConvo] = useMutation(addConversationQuery);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    addConvo({
      variables: {
        input: { userId: data.id },
      },
    })
      .then((data) => {
        const {
          data: {
            addConversation: { id },
          },
        } = data;

        router.push(`/conversations/${id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
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
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
