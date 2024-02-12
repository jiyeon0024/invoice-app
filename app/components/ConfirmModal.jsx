import React, { useEffect } from "react";
import CancelButton from "./buttons/CancelButton";
import DeleteButton from "./buttons/DeleteButton";
import { useInvoicesStore } from "@/stores/invoices";
import { useRouter } from "next/navigation";
function ConfirmModal({ handleConfirmModal, i }) {
  const router = useRouter();

  const { deleteData, copyData } = useInvoicesStore();

  return (
    <div className="bg-[#00000099] fixed w-screen h-screen  top-0 left-0">
      <div className=" bg-[#1E2139] w-[500px] p-10 rounded-lg absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
        <h2 className="font-bold text-xl">Confirm Deletion</h2>
        <p className="pt-6">
          Are you sure you want to delete invoice #{i.id}? This action cannot be
          undone.
        </p>
        <div className="flex justify-end items-center gap-10 pt-10">
          <CancelButton onClick={() => handleConfirmModal()} />
          <DeleteButton
            onClick={() => {
              deleteData(i);

              router.push("/invoice");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
