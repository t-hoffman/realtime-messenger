import "../styles/Conversations.css";
import MainLayout from "@/app/components/MainLayout";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({ children }) {
  return <MainLayout sidebar={<ConversationList />}>{children}</MainLayout>;
}
