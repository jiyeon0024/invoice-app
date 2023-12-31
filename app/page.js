"use client";
import { useEffect, useState } from "react";
import Input from "./components/Input";
import LoginButton from "./components/LoginButton";
import { useFormik } from "formik";
import { loginValidator } from "@/util/validationSchema";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { loggedIn, setLoggedIn, user, setUser } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidator,
    onSubmit: (values) => {
      user.forEach((user) => {
        if (
          values.email === user.clientEmail &&
          values.password === user.password
        ) {
          setLoggedIn(true);
        }
      });
    },
  });
  console.log(loggedIn);
  useEffect(() => {
    try {
      fetch("./user.json")
        .then((res) => res.json())
        .then((val) => setUser(val));
      if (loggedIn) {
        localStorage.setItem("loggedIn", loggedIn);
        router.push("/invoice");
      }
    } catch (error) {
      console.log(error);
    }
  }, [loggedIn, router]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      action=""
      className="bg-[#141625] w-screen h-screen text-white pt-32 "
    >
      <div className="w-[40%] m-auto p-10  bg-[#1E2139] rounded">
        <h1 className="font-bold text-4xl">Login</h1>
        <div className="pt-16 flex flex-col gap-1">
          <label htmlFor="email" className="text-2xl">
            Email
          </label>
          <Input
            id="email"
            placehollder={"Enter your email"}
            type={"email"}
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          {formik.touched.email && formik.errors.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="pt-10 flex flex-col gap-1">
          <label htmlFor="password" className="text-2xl">
            Password
          </label>
          <Input
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placehollder={"Enter your password"}
            type={"password"}
          />
          {formik.touched.password && formik.errors.password ? (
            <p>{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="w-full flex justify-center items-center pt-32">
          <LoginButton />
        </div>
      </div>
    </form>
  );
}
