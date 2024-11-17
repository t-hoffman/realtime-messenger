"use client";

const Avatar = ({ user, imageLink = null }) => {
  return (
    <div
      className="
        relative
        inline-block
        rounded-full
        h-9 w-9
        md:h-11 md:w-11
        bg-cover 
        bg-center
      "
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
