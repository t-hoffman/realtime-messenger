import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({ children }) {
  const conversations = await getConversations();
  const allUsers = await getUsers();

  return (
    <Sidebar>
      <ConversationList initialItems={conversations} allUsers={allUsers} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
