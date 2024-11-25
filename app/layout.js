import "./styles/globals.css";
import localFont from "next/font/local";
import AuthProvider from "./context/AuthContext";
import ApolloWrapper from "./context/ApolloWrapper";
import { Toaster } from "react-hot-toast";
import getCurrentUser from "./actions/getCurrentUser";
import ConversationsProvider from "./context/ConversationsContext";
import getConversations from "./actions/getConversations";
import getUsers from "./actions/getUsers";

export const metadata = {
  title: "Messenger",
  description: "Realtime messenger app.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1F2F5" },
    { media: "(prefers-color-scheme: dark)", color: "#F1F2F5" },
  ],
};

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser();

  const conversations = await getConversations();
  const allUsers = await getUsers();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`antialiased`}>
        <AuthProvider initialUser={currentUser}>
          <ConversationsProvider
            initialConversations={conversations}
            allUsers={allUsers}
          >
            <Toaster />
            <ApolloWrapper>{children}</ApolloWrapper>
          </ConversationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
