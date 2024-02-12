"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import Loading from "../components/Loading";
import SideBar from "../components/SideBar";
import { useInvoicesStore } from "@/stores/invoices";

const Layout = ({ children }) => {
  const { loggedIn } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // const [fetchData] = useInvoicesStore((state) => [state.fetchData]);
  const { fetchData } = useInvoicesStore();

  useEffect(() => {
    if (!loggedIn) {
      return router.replace("/");
    }

    setLoading(false);
  }, [loggedIn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loading />
    </div>
  ) : (
    <div className="bg-[#141625] flex overflow-y-scroll  text-white    ">
      <div className=" w-[5%] h-screen  ">
        <SideBar />
      </div>

      <div className="   w-full ">{children}</div>
    </div>
  );
};

export default Layout;
