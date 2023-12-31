"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import Loading from "../components/Loading";

const Layout = ({ children }) => {
  const { loggedIn } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedIn) {
      return router.replace("/");
    }

    setLoading(false);
  }, [loggedIn]);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loading />
    </div>
  ) : (
    <div>{children}</div>
  );
};

export default Layout;
