import React from "react";

function CancelButton({ onClick }) {
  return (
    <button
      onClick={() => onClick()}
      className="text-white  bg-[#252945] px-6 py-4  rounded-full font-bold"
    >
      Cancel
    </button>
  );
}

export default CancelButton;
