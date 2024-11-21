"use client";

import clsx from "clsx";

const MessageInput = ({ id, errors, required, placeholder }) => (
  <div className="relative w-full">
    <input
      id={id}
      name={id}
      autoComplete="off"
      required={required || false}
      placeholder={placeholder}
      className={clsx(
        `
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100
          w-full
          rounded-full
          focus:outline-none
        `,
        errors?.[id] && "ring-1 ring-rose-300"
      )}
    />
  </div>
);

export default MessageInput;
