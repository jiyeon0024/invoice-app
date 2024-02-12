import React from "react";

function Input({ placeholder, type, id, name, onChange, value, className }) {
  return (
    <input
      id={id}
      name={name}
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      className={` ${className} w-full  bg-[#252945]  rounded  outline-none border border-[#252945]  font-bold tracking-[-0.25px] text-white p-3 focus:caret-[#7C5DFA] focus:border focus:border-[#7C5DFA] `}
    />
  );
}

export default Input;
