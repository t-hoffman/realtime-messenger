"use client";

import clsx from "clsx";

const Avatar = ({ user, imageLink = null, overrideSmall, header }) => (
  <div
    className={clsx(
      `
        relative
        inline-block
        rounded-full
        bg-cover 
        bg-center
        shadow-[inset_0_0_0_1px_rgba(0,0,0,.1)]
      `,
      overrideSmall && "h-[48px] w-[48px]",
      !overrideSmall && !header && "h-9 w-9 md:h-[48px] md:w-[48px]",
      header && "w-9 h-9"
    )}
    style={{
      backgroundImage: `url('${
        imageLink || user?.image || "/images/placeholder.png"
      }')`,
    }}
  >
    <span
      className="
        absolute 
        block 
        rounded-full 
        bg-green-500 
        ring-2 
        ring-white 
        bottom-0
        right-0
        h-2 
        w-2 
        md:h-2.5 
        md:w-2.5
      "
    />
  </div>
);

export default Avatar;
