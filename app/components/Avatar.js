"use client";

import Image from "next/image";

const Avatar = ({ user }) => {
  return (
    <div className="relative">
      <div
        className="
          relative 
          inline-block 
          rounded-full 
          overflow-hidden 
          h-9 
          w-9 
          md:h-11 
          md:w-11
        "
      >
        <Image
          alt="Avatar"
          src={user?.image || "/images/placeholder.jpg"}
          sizes="(max-width:100%)"
          fill
        />
      </div>
      <span
        className="
        absolute 
        block 
        rounded-full 
        bg-green-500 
        ring-2 
        ring-white 
        bottom-1
        right-0
        h-2 
        w-2 
        md:h-2.5 
        md:w-2.5
      "
      />
    </div>
  );
};

export default Avatar;
