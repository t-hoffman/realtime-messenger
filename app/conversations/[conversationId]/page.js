"use client";

import EmptyPage from "@/app/components/EmptyPage";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import useConversation from "@/app/hooks/useConversation";

export default function ConversationId({ params }) {
  const { conversation } = useConversation();

  return conversation ? (
    <div className="flex flex-col w-full h-full">
      <Header />
      <Body />
      <Form />
    </div>
  ) : (
    <EmptyPage />
  );
}
