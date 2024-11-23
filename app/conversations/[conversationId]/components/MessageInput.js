"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";

const MessageInput = ({ id, disabled, errors, required, placeholder }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        id={id}
        name={id}
        autoComplete="off"
        autoFocus
        required={required || false}
        placeholder={placeholder}
        disabled={!!disabled}
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
          errors?.[id] && "ring-[1.5px] ring-rose-300",
          disabled && "animate-pulse"
        )}
      />
    </div>
  );
};

export default MessageInput;
