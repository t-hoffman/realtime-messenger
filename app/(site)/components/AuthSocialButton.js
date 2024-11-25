import clsx from "clsx";

const AuthSocialButton = ({ icon: Icon, onClick, facebook = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        `
        inline-flex 
        w-full 
        justify-center 
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
        facebook && "text-[#2C64F6]"
      )}
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
