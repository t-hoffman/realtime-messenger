import clsx from "clsx";

const AuthSocialButton = ({ icon: Icon, onClick, name }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        `
        flex 
        w-full 
        justify-center
        items-center
        rounded-md 
        bg-white 
        px-4 
        py-2 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-gray-300 
        hover:bg-gray-50 
        focus:outline-offset-0
        text-3xl
      `,
        name === "Facebook" && "text-[#2C64F6]"
      )}
    >
      <div className="flex gap-2 items-center">
        <Icon />
        <div className="text-xs text-black">Sign in with {name}</div>
      </div>
    </button>
  );
};

export default AuthSocialButton;
