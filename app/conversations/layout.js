import getConversations from "../actions/getConversations";
import getCurrentUser from "../actions/getCurrentUser";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import { ConversationsProvider } from "@/app/context/ConversationsContext";

export default async function ConversationsLayout({ children }) {
  // const conversations = await getConversations();
  const allUsers = await getUsers();

  const currentUser = await getCurrentUser();
  return (
    <ConversationsProvider currentUser={currentUser}>
      <Sidebar>
        <ConversationList
          // initialItems={conversations}
          allUsers={allUsers}
          currentUser={currentUser}
        />
        <div className="h-full">{children}</div>
      </Sidebar>
    </ConversationsProvider>
  );
}
