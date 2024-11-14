"use client";

import Avatar from "@/app/components/Avatar";
import PhotoModal from "./PhotoModal";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const MessageBox = ({ data, isLast }) => {
  const [photoOpen, setPhotoOpen] = useState(false);
  const session = useSession();

  const isOwn = session?.data?.user?.email === data?.sender?.email;

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <PhotoModal
            src={data.image}
            isOpen={photoOpen}
            onClose={() => setPhotoOpen(false)}
          />
          {data.image ? (
            <Image
              alt="Image"
              width={288}
              height={288}
              src={data.image}
              onClick={() => setPhotoOpen(true)}
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
                w-auto
                height-auto
              "
            />
          ) : (
            data.body
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
