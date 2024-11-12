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

const ConfirmModal = ({ children, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { conversationId } = useConversation();
  const [deleteConvo] = useMutation(DELETE_CONVERSATION_MUTATION);

  const onDelete = useCallback(async () => {
    setIsLoading(true);

    try {
      const {
        data: { deleteConversation },
      } = await deleteConvo({ variables: { conversationId } });

      console.log(deleteConversation);

      if (deleteConversation) {
        // router.push("/conversations");
        // router.refresh();
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
      <div className="sm:flex sm:items-start">
        <div
          className="
            mx-auto 
            flex 
            h-12 
            w-12 
            flex-shrink-0 
            items-center 
            justify-center 
            rounded-full 
            bg-red-100 
            sm:mx-0 
            sm:h-10 
            sm:w-10
          "
        >
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <DialogTitle
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Conversation
          </DialogTitle>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
