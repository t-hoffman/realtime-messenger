"use client";

const MessageInput = ({ id, errors, required, placeholder }) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        name={id}
        autoComplete={id}
        required={required || false}
        placeholder={placeholder}
        className="
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100
          w-full
          rounded-full
          focus:outline-none
        "
      />
    </div>
  );
};

export default MessageInput;
