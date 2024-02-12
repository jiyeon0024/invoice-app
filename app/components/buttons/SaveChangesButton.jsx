import React from "react";

function SaveChangesButton({ onClick }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="text-white  bg-[#7C5DFA] hover:bg-[#9277FF] px-6 py-4  rounded-full font-bold"
    >
      Save changes
    </button>
  );
}

export default SaveChangesButton;
