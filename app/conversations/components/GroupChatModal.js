"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Modal from "@/app/components/Modal";
import useConversation from "@/app/hooks/useConversation";
import { clientLocal } from "@/app/libs/apolloClients";
import { ADD_CONVERSATION_MUTATION } from "@/db/queries/conversationMutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import toast from "react-hot-toast";

const GroupChatModal = ({ isOpen, onClose, users }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { refetchConversations } = useConversation();
  const router = useRouter();
  const initialValues = { members: [], errors: {} };

  const [newConversation] = useMutation(ADD_CONVERSATION_MUTATION, {
    client: clientLocal,
    onCompleted: () => refetchConversations(),
  });

  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get("name");
      const members = selectedMembers.map((member) => member.value); // make sure is array

      newConversation({
        variables: { input: { name, members, isGroup: true } },
      })
        .then((data) => {
          const {
            data: { addConversation },
          } = data;

          console.log(addConversation);

          router.refresh();
          onClose();
        })
        .catch((err) => toast.error("Something went wrong."));

      return { ...prevState, name, members, errors: {} };
    },
    initialValues
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setSelectedMembers([]);
        onClose();
      }}
    >
      <form action={submitAction}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with 2 or more people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                label="Name"
                id="name"
                errors={state.errors}
                disabled={isPending}
              />
              <Select
                label="members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) => setSelectedMembers(value)}
                value={selectedMembers}
                disabled={isPending}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            type="button"
            onClick={() => {
              setSelectedMembers([]);
              onClose();
            }}
            disabled={isPending}
            secondary
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
