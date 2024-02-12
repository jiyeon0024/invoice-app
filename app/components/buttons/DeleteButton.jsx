import React from "react";

function DeleteButton({ onClick }) {
  return (
    <button
      onClick={() => onClick()}
      className="text-white bg-[#EC5757] hover:bg-[#FF9797] px-6 py-4  rounded-full font-bold"
    >
      Delete
    </button>
  );
}

export default DeleteButton;
