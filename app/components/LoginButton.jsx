import React from "react";

function LoginButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="bg-[#7C5DFA] text-white font-bold p-2 rounded-full text-2xl w-[200px] hover:bg-[#9277FF]"
    >
      Login
    </button>
  );
}

export default LoginButton;
