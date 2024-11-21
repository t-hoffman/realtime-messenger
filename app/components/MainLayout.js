"use client";

import clsx from "clsx";
import Sidebar from "./sidebar/Sidebar";
import useConversation from "../hooks/useConversation";

export default function MainLayout({ sidebar, children }) {
  const { isOpen } = useConversation();

  return (
    <div className="flex py-5 w-full h-full bg-gray-100">
      <Sidebar>{sidebar}</Sidebar>
      <div
        className={clsx(
          `
            flex-1
            bg-white
            rounded-lg
            shadow
            ms-0
            me-4
            min-[725px]:mx-4
            overflow-hidden
            hidden
            min-[725px]:block
          `,
          isOpen && "!block"
        )}
      >
        {children}
      </div>
    </div>
  );
}