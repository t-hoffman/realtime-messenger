import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import MainLayout from "@/app/components/MainLayout";
import ConversationList from "./components/ConversationList";
import ConversationsProvider from "@/app/context/ConversationsContext";

export default async function ConversationsLayout({ children }) {
  const conversations = await getConversations();
  const allUsers = await getUsers();

  return (
    <ConversationsProvider initialConversations={conversations}>
      <MainLayout sidebar={<ConversationList allUsers={allUsers} />}>
        {children}
      </MainLayout>
    </ConversationsProvider>
  );
}
