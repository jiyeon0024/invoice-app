import React from "react";
import Image from "next/image";

function CheckBox({ selected, id, checked, onChange, onClick, htmlFor, item }) {
  return (
    <div className="flex justify-start items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        onClick={onClick}
        className={checked ? " hidden  " : " hidden   "}
      />
      <label
        htmlFor={htmlFor}
        className="flex item-center gap-3  cursor-pointer"
      >
        <div
          className={
            checked
              ? "w-4 h-4 rounded bg-[#7C5DFA] flex justify-center items-center  hover:border hover:border-[#7C5DFA]"
              : "w-4 h-4 rounded bg-[#1E2139] flex justify-center items-center hover:border hover:border-[#7C5DFA]"
          }
        >
          {checked ? (
            <Image
              src={"/assets/icon-check.svg"}
              alt="check icon"
              width={10}
              height={10}
              className=" "
            />
          ) : null}
        </div>
        <span>{item}</span>
      </label>
    </div>
  );
}

export default CheckBox;
