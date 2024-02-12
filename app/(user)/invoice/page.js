"use client";
import React, { useEffect, useState } from "react";
import NewInvoiceButton from "@/app/components/NewInvoiceButton";
import Image from "next/image";
import SideBar from "@/app/components/SideBar";
import { useInvoicesStore } from "@/stores/invoices";
import InvoiceCard from "@/app/components/InvoiceCard";
import FilterModal from "@/app/components/FilterModal";
import DetailInvoice from "@/app/components/DetailInvoice";
import NewForm from "@/app/components/NewForm";
function page() {
  const [addInvoiceModal, setAddInvoiceModal] = useState(false);
  const handleAddModal = () => {
    if (addInvoiceModal) {
      setAddInvoiceModal(false);
    } else {
      setAddInvoiceModal(true);
    }
  };
  const [openDetail, setOpenDetail] = useState(false);

  const [data, setCopyData, copyData, fetchData, filterData] = useInvoicesStore(
    (state) => [
      state.data,
      state.setCopyData,
      state.copyData,
      state.fetchData,
      state.filterData,
    ]
  );
  const [filterModal, setFilterModal] = useState(false);

  const handleFilterModal = () => {
    if (filterModal) {
      setFilterModal(false);
    } else {
      setFilterModal(true);
    }
  };
  console.log(data, copyData);
  const handleDetail = () => {
    if (openDetail) {
      setOpenDetail(false);
    } else {
      setOpenDetail(true);
    }
  };

  useEffect(() => {
    const localPaid = localStorage.getItem("paid");
    console.log(localPaid);
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative w-full">
      {addInvoiceModal ? (
        <div className="absolute  left-0 top-0 z-30 bg-[#00000099] w-full">
          <div className=" w-[50%] ">
            <NewForm handleAddModal={() => handleAddModal()} />
          </div>
        </div>
      ) : null}
      <div className=" w-[70%]  m-auto mt-20  ">
        <div className="flex justify-between items-center rounded-lg">
          <div>
            <h1 className="font-extrabold text-4xl">Invoices</h1>
            {copyData.length === 0 ? (
              <p>No invoices</p>
            ) : (
              <p>There are {copyData.length} total invoices</p>
            )}
          </div>
          <div className="flex justify-center items-center gap-10">
            <div className="relative">
              <button
                className="flex  items-center justify-center gap-3"
                onClick={() => handleFilterModal()}
              >
                <p> Filter by status</p>
                <span>
                  <Image
                    src={"/assets/icon-arrow-down.svg"}
                    width={10}
                    height={10}
                  />
                </span>
              </button>
              <div className="absolute left-[50%]  right-[50%] translate-x-[-50%] top-[150%] w-[200px] z-20">
                {filterModal ? <FilterModal /> : null}
              </div>
            </div>

            <NewInvoiceButton onClick={handleAddModal} />
          </div>
        </div>
        <div>
          {/* list  */}
          {copyData?.map((invoice, index) => {
            return (
              <InvoiceCard
                invoice={invoice}
                key={index}
                handleDetail={() => handleDetail()}
              />
            );
          })}
          {copyData.length === 0 ? (
            <div className="flex flex-col justify-center items-center mt-32">
              <Image
                src={"/assets/illustration-empty.svg"}
                width={500}
                height={500}
                alt="empty img"
              />
              <h1 className="font-bold text-2xl pt-32">
                There is nothing here
              </h1>
              <p className="pt-20">Create an invoice by clicking the </p>
              <p>New Invoice button and get started</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default page;
