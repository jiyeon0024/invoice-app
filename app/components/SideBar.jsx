import React from "react";
import Image from "next/image";

function SideBar() {
  return (
    <div className="bg-[#1E2139] w-[5%] flex flex-col justify-between items-center rounded-r-3xl h-screen sticky">
      <div className="relative ">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="103"
          height="103"
          viewBox="0 0 103 103"
          fill="none"
        >
          <path
            d="M0 0H83C94.0457 0 103 8.9543 103 20V83C103 94.0457 94.0457 103 83 103H0V0Z"
            fill="#7C5DFA"
          />
          <mask
            id="mask0_8_254"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="103"
            height="103"
          >
            <path
              d="M0 0H83C94.0457 0 103 8.9543 103 20V83C103 94.0457 94.0457 103 83 103H0V0Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_8_254)">
            <path
              d="M103 52H20C8.95431 52 0 60.9543 0 72V135C0 146.046 8.95431 155 20 155H103V52Z"
              fill="#9277FF"
            />
          </g>
        </svg>
        <Image
          src={"/assets/logo.svg"}
          width={40}
          height={40}
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-10  w-full">
        <div className="w-[10px] h-[10px] bg-[#858BB2] rounded-full "></div>
        <div className="border-t w-full flex justify-center items-center  p-6">
          <Image
            src={"/assets/image-avatar.jpg"}
            width={50}
            height={50}
            className="rounded-full "
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
