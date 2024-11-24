"use client";

import useRoutes from "@/app/hooks/useRoutes";
import Avatar from "../Avatar";
import NavItem from "./NavItem";
import SettingsModal from "./SettingsModal";
import { useState } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";

export default function Sidebar({ children }) {
  const routes = useRoutes();
  const [modalOpen, setModalOpen] = useState(false);
  const { currentUser } = useAuthContext();
  const { isOpen } = useConversation();

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <nav className="px-2 flex flex-col gap-0.5 md:px-4">
        {routes.map((item) => (
          <NavItem
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={item.active}
            onClick={item.onClick}
          />
        ))}
        <nav className="absolute bottom-0 mb-5">
          <div
            onClick={() => setModalOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </nav>
      <main
        style={{
          scrollbarColor: "#dbdbdb transparent",
          scrollbarWidth: "thin",
        }}
        className={clsx(
          `
          w-full
          h-full
          me-4
          min-[725px]:me-0
          min-[725px]:w-[30%] 
          min-[725px]:min-w-[300px] 
          min-[725px]:max-w-[480px] 
          bg-white
          rounded-xl
          pt-3 px-1
          shadow
          overflow-hidden
        `,
          isOpen && "hidden min-[725px]:block"
        )}
      >
        <div className="flex flex-col flex-1 h-full">{children}</div>
      </main>
    </>
  );
}
