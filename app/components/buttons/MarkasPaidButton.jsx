import React from "react";

function MarkasPaidButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white  bg-[#7C5DFA] hover:bg-[#9277FF] px-6 py-4  rounded-full font-bold"
    >
      Mark as Paid
    </button>
  );
}

export default MarkasPaidButton;
