"use client";

import { useRouter } from "next/navigation";
import { startTransition, useActionState, useState } from "react";
import Modal from "../Modal";
import Input from "../inputs/Input";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";
import Avatar from "../Avatar";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "@/db/queries/userMutations";
import clientLocal from "@/app/libs/apolloClientLocal";
import useConversation from "@/app/hooks/useConversation";

export default function SettingsModal({ isOpen, onClose, currentUser }) {
  const convoContext = useConversation();
  const refetchConversations = convoContext?.refetchConversations || null;
  const [photoUrl, setPhotoUrl] = useState(null);
  const router = useRouter();
  const initialValues = {
    name: currentUser?.name,
    image: currentUser?.image,
    errors: {},
  };

  const [updateProfile] = useMutation(UPDATE_USER_MUTATION, {
    client: clientLocal,
    onCompleted: () => refetchConversations && refetchConversations(),
  });

  const [state, submitAction, isPending] = useActionState(
    async (_prevState, formData) => {
      if (formData === null) return initialValues;

      const name = formData.get("name");
      const image = photoUrl || currentUser.image;
      const newValues = { name, image };

      if (!name) return { ...newValues, errors: { name: true } };

      try {
        await updateProfile({
          variables: { input: { ...newValues, userId: currentUser.id } },
        });
      } catch (err) {
        console.error(err);
      } finally {
        router.refresh();
        onClose();
      }

      return { ...newValues, errors: {} };
    },
    initialValues
  );

  const handleUpload = (result) => {
    setPhotoUrl(result?.info?.secure_url);
  };

  const handleClose = (event) => {
    if (event && event.preventDefault) event.preventDefault();

    startTransition(() => {
      submitAction(null);
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form action={submitAction} noValidate>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                id="name"
                label="Name"
                value={state.name}
                errors={state.errors}
                disabled={isPending}
                required
              />
            </div>
            {state.errors?.name && (
              <div
                className="
                  font-bold 
                  text-rose-500 
                  text-sm 
                  pt-1 ps-1
                "
              >
                This field is required.
              </div>
            )}
            <div>
              <label
                className="
                  block 
                  text-sm 
                  font-medium 
                  leading-6 
                  text-gray-900
                  mt-4
                "
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <Avatar imageLink={photoUrl || state.image} />
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onSuccess={handleUpload}
                  uploadPreset="ljaogfcx"
                  disabled={isPending}
                  type="button"
                  className="
                    flex
                    justify-center
                    rounded-md
                    px-3
                    py-2
                    text-sm
                    font-semibold
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    text-gray-900
                  "
                >
                  Change
                </CldUploadButton>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
            <Button secondary onClick={handleClose} disabled={isPending}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
