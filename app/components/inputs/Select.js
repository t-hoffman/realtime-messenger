"use client";

import ReactSelect from "react-select";

const Select = ({ label, options, onChange, value, disabled }) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          isMulti
          value={value}
          onChange={onChange}
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{ control: () => "text-sm" }}
        />
      </div>
    </div>
  );
};

export default Select;
