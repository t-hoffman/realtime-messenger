"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useConversation from "@/app/hooks/useConversation";

export default function Header() {
  const { conversation } = useConversation();
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
          bg-white 
          w-full 
          flex 
          border-b-[1px] 
          p-2
          pe-4
          justify-between 
          items-center 
          shadow-sm
          rounded-t-lg
        "
      >
        <div className="flex gap-3 items-center">
          <Link
            className="
              md:hidden
              block
              text-[#9718FF]
              hover:text-sky-600
              transition
              cursor-pointer
            "
            href="/conversations"
          >
            <FaArrowLeft size={18} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}

          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div
              className="
                text-sm
                font-light
                text-neutral-500
              "
            >
              {statusText}
            </div>
          </div>
        </div>
        <HiOutlineDotsHorizontal
          size={22}
          onClick={() => setDrawerOpen(true)}
          className="text-[#9718FF] cursor-pointer hover:opacity-60 transition"
        />
      </div>
    </>
  );
}
