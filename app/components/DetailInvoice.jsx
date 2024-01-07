import React from "react";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import MarkasPaidButton from "./buttons/MarkasPaidButton";
import Image from "next/image";

function DetailInvoice({ handleDetail, invoice }) {
  return (
    <div className=" flex flex-col items-start justify-center gap-5 ">
      <div className="flex justify-center items-center gap-5">
        <Image
          src={"/assets/icon-arrow-left.svg"}
          width={10}
          height={10}
          alt="icon"
        />
        <button
          onClick={() => handleDetail()}
          className="text-[#888EB0] font-bold"
        >
          Go back
        </button>
      </div>

      <div className="flex justify-between items-center bg-[#1E2139] rounded-lg px-10 py-6 w-full">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[#DFE3FA]">Status</p>
          <p>{invoice.status}</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <EditButton />
          <DeleteButton />
          <MarkasPaidButton />
        </div>
      </div>
      <div className="bg-[#1E2139] rounded-lg px-10  py-6 w-full  pb-[500px]">
        sdfsf
      </div>
    </div>
  );
}

export default DetailInvoice;
