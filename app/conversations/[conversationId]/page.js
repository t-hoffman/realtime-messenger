import getConversationById from "@/app/actions/getConversationById";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import getCurrentUser from "@/app/actions/getCurrentUser";

const ConversationId = async ({ params }) => {
  const { conversationId } = await params;
  const currentUser = await getCurrentUser();
  const conversation = await getConversationById(conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  const { messages } = conversation;

  // console.log(conversation, messages);

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form currentUser={currentUser} />
      </div>
    </div>
  );
};

export default ConversationId;
