"use client";

import Image from "next/image";

const AvatarGroup = ({ users = [] }) => {
  const avatarUsers = users.slice(0, 3);
  const positionClass = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative h-11 w-11">
      {avatarUsers.map((user, idx) => (
        <div
          key={user.id}
          className={`
            absolute 
            inline-block 
            rounded-full 
            overflow-hidden 
            h-[21px] 
            w-[21px]
            ${positionClass[idx]}
          `}
        >
          <Image
            alt="Avatar"
            fill
            src={user?.image || "/images/placeholder.jpg"}
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
