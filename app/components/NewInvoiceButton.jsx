import React from "react";
import Image from "next/image";

function NewInvoiceButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#7C5DFA] text-white rounded-full p-3 gap-x-3 font-bold flex justify-center items-center hover:bg-[#9277FF]"
    >
      <div className="bg-white p-3 rounded-full ">
        <Image src={"./assets/icon-plus.svg"} width={10} height={10} />
      </div>
      <p>New Invoice</p>
    </button>
  );
}

export default NewInvoiceButton;
