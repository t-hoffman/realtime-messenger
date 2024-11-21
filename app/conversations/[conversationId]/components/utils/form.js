export const initialValues = { message: "", errors: {} };

export const sendMessage = async (
  message,
  mutation,
  subscription,
  state,
  conversation,
  currentUser
) => {
  const { data } = await mutation({ variables: { message } });

  const newMessage = { ...data.sendMessage, sender: currentUser };
  const updatedMessages = [newMessage, ...conversation.messages];
  const updatedConvo = { ...conversation, messages: updatedMessages };

  state((prevItems) =>
    prevItems.map((convo) =>
      convo.id === updatedConvo.id ? updatedConvo : convo
    )
  );

  Promise.all(
    conversation.users.map((user) =>
      subscription({ variables: { input: updatedConvo, userId: user.id } })
    )
  ).catch((err) => console.error(err));

  return updatedConvo;
};
