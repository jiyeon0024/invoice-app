"use client";
import React, { useEffect, useState } from "react";
import NewInvoiceButton from "@/app/components/NewInvoiceButton";
import Image from "next/image";
import SideBar from "@/app/components/SideBar";
import { useInvoicesStore } from "@/stores/invoices";
import InvoiceCard from "@/app/components/InvoiceCard";
import FilterModal from "@/app/components/FilterModal";
function page() {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  // console.log(copyData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="bg-[#141625] flex w-screen h-screen text-white">
      <SideBar />
      <button onClick={() => filterData("pending")}>FILTERRRR</button>
      <div className="w-[95%]   ">
        <div className=" w-[70%]  m-auto mt-20 ">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-extrabold text-4xl">Invoices</h1>
              <p>There are 7 total invoices</p>
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

              <NewInvoiceButton />
            </div>
          </div>
          <div>
            {/* list  */}
            {copyData?.map((invoice, index) => {
              return <InvoiceCard invoice={invoice} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
