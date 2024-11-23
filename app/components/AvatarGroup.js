"use client";

import Image from "next/image";

const AvatarGroup = ({ users = [] }) => {
  const avatarUsers = [
    ...users.filter((user) => user.image).slice(0, 2),
    { image: "" },
    { image: "" },
  ].slice(0, 2);

  const positionClass = {
    0: "top-[-2px] right-[-3px]",
    1: "bottom-[-2px] left-[-3px]",
  };

  return (
    <div className="relative h-[48px] w-[48px]">
      {avatarUsers.map((user, idx) => (
        <div
          key={user?.id || Math.random()}
          className={`
            absolute 
            inline-block 
            rounded-full 
            overflow-hidden 
            h-[36px] 
            w-[36px]
            border-2 border-white
            ${positionClass[idx]}
          `}
        >
          <div
            className="
            w-full h-full
            relative
            inline-block
            rounded-full
            bg-cover 
            bg-center
            shadow-[inset_0_0_0_1px_rgba(0,0,0,.1)]
          "
            style={{
              backgroundImage: `url('${
                user?.image || "/images/placeholder.png"
              }')`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
