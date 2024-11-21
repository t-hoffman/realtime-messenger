import clsx from "clsx";

const Input = ({ label, id, required, errors, disabled, value }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        name={id}
        type={id}
        autoComplete={id}
        disabled={disabled}
        required={required}
        defaultValue={value}
        className={clsx(
          `
            form-input 
            block w-full 
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-sky-600 
            sm:text-sm 
            sm:leading-6`,
          errors?.[id] && "!ring-1 !ring-rose-500",
          disabled && "opacity-50 cursor-default"
        )}
      />
    </div>
  </div>
);

export default Input;
