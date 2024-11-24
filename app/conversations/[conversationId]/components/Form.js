"use client";

import useConversation from "@/app/hooks/useConversation";
import { useActionState } from "react";
import { HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE_QUERY } from "@/db/queries/messageMutations";
import { CldUploadButton } from "next-cloudinary";
import { clientAppSync, clientLocal } from "@/app/libs/apolloClients";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { UPDATE_CONVERSATION_MUTATION } from "@/db/queries/conversationSubscriptions";
import { useAuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { sendMessage, initialValues } from "./utils/form";

export default function Form() {
  const { conversation, conversationId, setConversations } = useConversation();
  const { currentUser } = useAuthContext();
  const router = useRouter();

  const [addMessage] = useMutation(SEND_MESSAGE_QUERY, { client: clientLocal });
  const [updateConvo] = useMutation(UPDATE_CONVERSATION_MUTATION, {
    client: clientAppSync,
  });

  const [state, submitAction, isPending] = useActionState(
    async (_prevState, formData) => {
      const message = formData.get("message");
      if (!message) return { message, errors: { message: true } };

      await sendMessage(
        {
          body: message,
          createdAt: new Date(),
          conversationId,
        },
        addMessage,
        updateConvo,
        setConversations,
        conversation,
        currentUser
      );

      return { message, errors: {} };
    },
    initialValues
  );

  const handleUpload = async (result) => {
    console.log(result);
    if (result?.info?.secure_url) {
      try {
        let image = result.info.secure_url;
        if (result.info.format === "heic") {
          image = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,h_1000,w_1000/v1732149484/${result.info.public_id}.jpg`;
        }

        const updatedConvo = await sendMessage(
          {
            image,
            createdAt: new Date(),
            conversationId,
          },
          addMessage,
          updateConvo,
          setConversations,
          conversation,
          currentUser
        );
      } catch (err) {
        console.error(err);
      } finally {
        router.refresh();
      }
    }
  };

  return (
    <div
      className="
        py-3
        px-4
        bg-white
        flex
        items-center
        gap-2
        lg:gap-3
        w-full
        rounded-b-lg
      "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUpload}
        // next-cloudinary must cache the handleUpload so it's not getting the updated state
        key={Date.now()}
      >
        <TbPhotoSquareRounded size={30} className="text-blue-500" />
      </CldUploadButton>
      <form
        action={submitAction}
        className="flex items-center gap-2 w-full"
        noValidate
      >
        <MessageInput
          id="message"
          disabled={isPending}
          errors={state.errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          disabled={isPending}
          className="
          rounded-full
          p-2
          cursor-pointer
          hover:bg-sky-100
          transition
        "
        >
          <HiPaperAirplane size={22} className="text-blue-500" />
        </button>
      </form>
    </div>
  );
}
