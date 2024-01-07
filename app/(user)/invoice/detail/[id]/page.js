"use client";
import React from "react";
import { useEffect, useState } from "react";
import EditButton from "@/app/components/buttons/EditButton";

import DeleteButton from "@/app/components/buttons/DeleteButton";
import MarkasPaidButton from "@/app/components/buttons/MarkasPaidButton";
import Image from "next/image";
import { months } from "@/util/constants/months";
import { useInvoicesStore } from "@/stores/invoices";
import Link from "next/link";
import { useParams } from "next/navigation";
const Page = () => {
  const params = useParams();
  const [month, setMonth] = useState("");
  let invoiceDate = "";
  let paymentDue = "";
  let total = "";
  let price = "";
  const [data, copyData, fetchData] = useInvoicesStore((state) => [
    state.data,

    state.copyData,
    state.fetchData,
  ]);

  return (
    <div className=" flex flex-col items-start justify-center gap-5 ">
      <Link
        href={"/invoice"}
        className="flex justify-center items-center gap-5 cursor-pointer"
      >
        <Image
          src={"/assets/icon-arrow-left.svg"}
          width={10}
          height={10}
          alt="icon"
        />
        <button className="text-[#888EB0] font-bold">Go back</button>
      </Link>
      {copyData?.map((i, index) => {
        months.forEach((month) => {
          if (month.num === i.createdAt.slice(5, 7)) {
            paymentDue = month.month;
          }
          if (month.num === i.paymentDue.slice(5, 7)) {
            invoiceDate = month.month;
          }
        });

        if (i.id === params.id) {
          return (
            <div key={index} className="flex flex-col gap-10">
              <div className="flex justify-between items-center bg-[#1E2139] rounded-lg px-10 py-6 w-full">
                <div className="flex justify-center items-center gap-5">
                  <p className="text-[#DFE3FA]">Status</p>
                  <div
                    className={
                      i.status === "paid"
                        ? " flex gap-2  items-center  justify-center  p-3 backdrop-blur-sm bg-[#33D69F]/10  rounded-md"
                        : i.status === "pending"
                        ? "flex gap-2  items-center  justify-center  p-3 backdrop-blur-sm bg-[#FF8F00]/10  rounded-md"
                        : " flex gap-2  items-center  justify-center  p-3 rounded-md bg-[#979797]/10"
                    }
                  >
                    <div
                      className={
                        i.status === "paid"
                          ? "w-[10px] h-[10px] bg-[#33D69F] rounded-full"
                          : i.status === "pending"
                          ? "w-[10px] h-[10px] bg-[#FF8F00] rounded-full"
                          : "w-[10px] h-[10px] bg-[#979797] rounded-full "
                      }
                    ></div>
                    <span>
                      {i.status.slice(0, 1).toUpperCase() + i.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <EditButton />
                  <DeleteButton />
                  <MarkasPaidButton />
                </div>
              </div>
              <div className="bg-[#1E2139] rounded-lg p-16 w-full   ">
                <div className="flex justify-between items-start  ">
                  <div className="flex flex-col items-start gap-2">
                    <h3 className="font-bold text-xl">
                      <span className="text-[#888EB0] ">#</span>
                      {i.id}
                    </h3>
                    <p>{i.description}</p>
                  </div>
                  <div className="flex flex-col items-end justify-center gap-1">
                    <p>19 Union Terrace</p>
                    <p>London</p>
                    <p>E1 3EZ</p>
                    <p>United Kingdom</p>
                  </div>
                </div>
                <div className=" flex justify-start items-start gap-64  pt-5">
                  <div className="flex flex-col items-start justify-center gap-10    ">
                    <div>
                      <p className="pb-3">Invoice Date</p>
                      <div className="flex gap-2 font-bold">
                        <p>{i.createdAt.slice(8)}</p>
                        <p>{invoiceDate}</p>
                        <p>{i.createdAt.slice(0, 4)}</p>
                      </div>

                      {/* <p className="font-bold text-lg">{i.createdAt}</p> */}
                    </div>
                    <div className="">
                      <p className="pb-3">Payment Due</p>
                      <div className="flex gap-2 font-bold">
                        <p>{i.paymentDue.slice(8)}</p>
                        <p>{paymentDue}</p>
                        <p>{i.paymentDue.slice(0, 4)}</p>
                      </div>

                      {/* <p className="font-bold text-lg">{i.paymentDue}</p> */}
                    </div>
                  </div>
                  <div>
                    <p className="pb-3">Bill To</p>
                    <p className="font-bold text-lg">{i.clientName}</p>
                    <p>{i.clientAddress.street}</p>
                    <p>{i.clientAddress.city}</p>
                    <p>{i.clientAddress.postCode}</p>
                    <p>{i.clientAddress.city}</p>
                  </div>
                  <div>
                    <p className="pb-3">Sent to</p>
                    <p className="font-bold text-lg">{i.clientEmail}</p>
                  </div>
                </div>
                <div className="bg-[#252945] p-8 rounded-t-md mt-10">
                  <table className="  w-full">
                    <thead>
                      <tr className="">
                        <td className="">Item Name</td>
                        <td className=" text-center">QTY.</td>
                        <td className="text-end">Price</td>
                        <td className="text-end">Total</td>
                      </tr>
                    </thead>
                    {i.items.map((item, index) => {
                      if (
                        item.total.toString().includes(".") &&
                        item.total.toString().split(".")[1]?.length > 1
                      ) {
                        total = item.total.toLocaleString("en-US");
                      } else if (
                        item.total.toString().includes(".") &&
                        item.total.toString().split(".")[1]?.length === 1
                      ) {
                        total = item.total.toLocaleString("en-US") + "0";
                      } else {
                        total = item.total + ".00";
                      }

                      if (
                        item.price.toString().includes(".") &&
                        item.price.toString().split(".")[1]?.length > 1
                      ) {
                        price = item.price.toLocaleString("en-US");
                      } else if (
                        item.price.toString().includes(".") &&
                        item.price.toString().split(".")[1]?.length === 1
                      ) {
                        price = item.price.toLocaleString("en-US") + "0";
                      } else {
                        price = item.price + ".00";
                      }

                      return (
                        <tbody key={index}>
                          <tr>
                            <td className="font-bold text-lg ">{item.name}</td>

                            <td className="  text-center">{item.quantity}</td>
                            <td className="text-end">
                              {/* £ {item.price} */}£ {price}
                            </td>
                            <td className="text-end ">
                              {/* £ {item.total} */}£ {total}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
                <div className="flex justify-between items-center bg-[#0C0E16] p-8 rounded-b-md">
                  <p>Amount Due</p>
                  <h1>£ {i.total}</h1>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Page;
