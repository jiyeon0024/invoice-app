import React from "react";

function Input({ placehollder, type, id, name, onChange, value }) {
  return (
    <input
      id={id}
      name={name}
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placehollder}
      className="w-full  bg-[#252945]  rounded border-none outline-none font-bold tracking-[-0.25px] text-white p-3 focus:caret-[#7C5DFA]"
    />
  );
}

export default Input;
