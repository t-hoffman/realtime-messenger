"use client";

import Modal from "@/app/components/Modal";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_CONVERSATION_MUTATION } from "@/db/queries/conversationMutations";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import { DialogTitle } from "@headlessui/react";
import Button from "@/app/components/Button";
import { clientAppSync, clientLocal } from "@/app/libs/apolloClients";
import { UPDATE_CONVERSATION_MUTATION } from "@/db/queries/conversationSubscriptions";

/**
 *
 * need to figure out how to send deleted convo thru subscription
 * so it deletes for all users and doesnt cause any issues
 */

const publishDeletion = async (publish, users, conversationId) => {
  Promise.all(
    users.map((user) =>
      publish({
        variables: {
          input: { id: conversationId, tag: "DELETION" },
          userId: user.id,
        },
      })
    )
  ).catch((err) => console.error(err));
};

export default function ConfirmModal({ isOpen, onClose, users }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { conversationId, refetchConversations } = useConversation();

  const [deleteConvo] = useMutation(DELETE_CONVERSATION_MUTATION, {
    client: clientLocal,
  });
  const [deleteConvoPublish] = useMutation(UPDATE_CONVERSATION_MUTATION, {
    client: clientAppSync,
  });

  const onDelete = useCallback(async () => {
    setIsLoading(true);

    try {
      const {
        data: { deleteConversation },
      } = await deleteConvo({ variables: { conversationId } });

      console.log(deleteConversation);

      if (deleteConversation) {
        refetchConversations();
        await publishDeletion(deleteConvoPublish, users, conversationId);
        router.push("/conversations");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="
        w-full 
        flex 
        flex-col 
        gap-x-4 
        p-5 
        sm:p-0 
        min-[450px]:flex-row
      "
      >
        <div
          className="
          mx-auto 
          flex 
          items-center 
          justify-center 
          flex-shrink-0 
          h-12 w-12 
          rounded-full 
          bg-red-100
          min-[450px]:w-10
          min-[450px]:h-10
        "
        >
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="flex-1 text-center mt-2 min-[450px]:text-left min-[450px]:mt-0">
          <DialogTitle
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Conversation
          </DialogTitle>
          <div className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete this conversation? This action
            cannot be undone.
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-0 min-[450px]:mt-5 min-[450px]:justify-end">
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
