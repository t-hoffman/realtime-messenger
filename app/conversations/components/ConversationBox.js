"use client";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import useOtherUser from "@/app/hooks/useOtherUser";
import clsx from "clsx";
import { format, formatDistanceToNow, isToday } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

const formatDate = (date) => {
  const formattedDate = formatDistanceToNow(date, { addSuffix: true })
    .replace(/^about /, "")
    .replace(/^less than/, "about");
  return formattedDate;
};

export default function ConversationBox({
  data,
  conversationId,
  passRef,
  selected,
}) {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const [message] = data.messages || [];
    return message;
  }, [data.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an image";

    if (lastMessage?.body) return lastMessage.body;

    return "Started a conversation";
  }, [lastMessage]);

  const openRefProp = data.id === conversationId ? { ref: passRef } : {};

  const notToday = !isToday(new Date(data.createdAt));

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        w-full
        relative
        flex
        items-center
        space-x-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer   
        p-3 
        `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} overrideSmall />
      )}
      <div className="min-w-0 flex-1" {...openRefProp}>
        <div className="focus:outline-none">
          <div
            className="
            flex
            justify-between
            items-center
            mb-1
          "
          >
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <>
                <p className="text-xs text-gray-400 font-light hidden min-[400px]:inline-block">
                  {formatDate(new Date(lastMessage.createdAt))}
                </p>
                <p className="text-xs text-gray-400 font-light inline-block min-[400px]:hidden">
                  {format(
                    new Date(lastMessage.createdAt),
                    notToday ? "E p" : "p"
                  )}
                </p>
              </>
            )}
          </div>
          <p
            className={clsx(
              `
              truncate
              text-sm
              `,
              "text-black font-medium"
              // will put the seen style here, seen: text-gray-500, not seen: text-black font-medium
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
}
