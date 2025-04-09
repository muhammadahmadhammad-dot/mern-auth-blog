import React from "react";

const Textarea = ({
  label = "Name",
  name = "name",
  placeholder = "Enter ...",
  required = true,
  value = "",
  onChanage = "",
  error = null,
  rows=4,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id={name}
        rows={rows}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required={required}
        name={name}
        value={value}
        onChange={onChanage}
      ></textarea>
      {error && <p className="text-red-500">{error._errors[0]}</p>}
    </div>
  );
};

export default Textarea;
