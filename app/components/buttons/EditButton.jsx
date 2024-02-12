import React from "react";

function EditButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className=" bg-[#252945] text-[#DFE3FA] hover:bg-white hover:text-[#9277FF] px-6 py-4  rounded-full font-bold"
    >
      Edit
    </button>
  );
}

export default EditButton;
