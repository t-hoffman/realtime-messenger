"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import Modal from "../Modal";
import Input from "../inputs/Input";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";
import Avatar from "../Avatar";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "@/db/queries/userMutations";

const SettingsModal = ({ isOpen, onClose, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const router = useRouter();
  const initialValues = {
    name: currentUser.name,
    image: currentUser.image,
    errors: {},
  };

  const [updateProfile] = useMutation(UPDATE_USER_MUTATION);

  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get("name");
      const image = photoUrl || currentUser.image;
      const newValues = { name, image };

      console.log("submit");

      console.log(prevState, newValues);
      try {
        const { data } = await updateProfile({
          variables: { input: { ...newValues, userId: currentUser.id } },
        });
        console.log("updated", data);
      } catch (err) {
        console.log(err);
      }
      return { ...newValues, errors: {} };
    },
    initialValues
  );

  const handleUpload = (result) => {
    setPhotoUrl(result?.info?.secure_url);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form action={submitAction}>
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
                value={currentUser.name}
                errors={state.errors}
                disabled={isPending}
                required
              />
            </div>
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
                <Avatar imageLink={photoUrl || currentUser.image} />
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
              Submit
            </Button>
            <Button
              secondary
              onClick={(e) => {
                e.preventDefault();
                return onClose();
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
