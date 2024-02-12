import React, { useEffect, useState } from "react";
import Image from "next/image";
import { months } from "@/util/constants/months";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useInvoicesStore } from "@/stores/invoices";

function InvoiceCard({ invoice, handleDetail }) {
  const [month, setMonth] = useState("");
  const [total, setTotal] = useState("");
  const router = useRouter();

  useEffect(() => {
    months.forEach((i) => {
      if (invoice.paymentDue?.slice(5, 7) === i.num) {
        return setMonth(i.month);
      }
    }, []);

    if (
      invoice.total?.toString().includes(".") &&
      invoice.total?.toString().split(".")[1]?.length > 1
    ) {
      setTotal(invoice.total.toLocaleString("en-US"));
    } else if (
      invoice.total?.toString().includes(".") &&
      invoice.total?.toString().split(".")[1]?.length === 1
    ) {
      setTotal(invoice.total.toLocaleString("en-US") + "0");
    } else {
      setTotal(invoice.total + ".00");
    }
  }, []);

  return (
    <div className=" w-full  bg-[#1E2139] border border-[#1E2139] rounded-lg mt-5 hover:border hover:border-[#7C5DFA] cursor-pointer">
      <ul className="flex items-center justify-start p-3  ">
        <li className="w-[20%] p-3 font-extrabold">
          <span className="text-[#7E88C3]">#</span>
          {invoice.id}
        </li>
        <li className="w-[20%] p-3 flex justify-center items-center gap-2">
          <span>Due</span>
          <span>{invoice.paymentDue?.slice(8)}</span>
          <span>{month}</span>
          <span>{invoice.paymentDue?.slice(0, 4)}</span>
        </li>
        <li className="w-[20%] p-3">{invoice.clientName}</li>
        <li className="w-[20%] p-3 font-extrabold">£ {total}</li>
        <li
          className={
            invoice.status === "paid"
              ? " flex gap-2  items-center  justify-center w-[15%] p-3 backdrop-blur-sm bg-[#33D69F]/10  rounded-md"
              : invoice.status === "pending"
              ? "flex gap-2  items-center  justify-center w-[15%] p-3 backdrop-blur-sm bg-[#FF8F00]/10  rounded-md"
              : " flex gap-2  items-center  justify-center w-[15%] p-3 rounded-md bg-[#979797]/10"
          }
        >
          <div
            className={
              invoice.status === "paid"
                ? "w-[10px] h-[10px] bg-[#33D69F] rounded-full"
                : invoice.status === "pending"
                ? "w-[10px] h-[10px] bg-[#FF8F00] rounded-full"
                : "w-[10px] h-[10px] bg-[#979797] rounded-full "
            }
          ></div>
          <span>
            {invoice.status?.slice(0, 1).toUpperCase() +
              invoice.status?.slice(1)}
          </span>
        </li>
        <Link
          className="w-[5%] p-3  flex justify-end items-center"
          href={"/invoice/detail/" + invoice.id}
        >
          <Image
            src={"./assets/icon-arrow-right.svg"}
            width={10}
            height={10}
            alt="icon"
          />
        </Link>
      </ul>
    </div>
  );
}

export default InvoiceCard;
