import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { IoChatbubbleSharp } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function useRoutes() {
  const router = useRouter();
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: IoChatbubbleSharp,
        active: pathname === "/conversations" || !!conversationId,
        onClick: () => router.push("/conversations"),
      },
      {
        label: "Users",
        href: "/users",
        icon: BsFillPeopleFill,
        active: pathname === "/users",
        onClick: () => router.push("/users"),
      },
      {
        label: "Logout",
        href: "#",
        icon: TbLogout2,
        onClick: () => signOut(),
      },
    ],
    [pathname, conversationId]
  );

  return routes;
}
