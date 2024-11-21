import clsx from "clsx";

const Loader = ({ border, secondary, size = 5 }) => (
  <div className="w-full flex justify-center mt-6">
    <div
      className={clsx(
        `loader !w-10 !h-10 !border-[${size}px]`,
        border && `!border-[${border}]`,
        secondary && `!border-b-[${secondary}]`
      )}
    ></div>
  </div>
);

export default Loader;
