import Link from "next/link";
import React from "react";
import UserNav from "./UserNav";

const HeaderContent = () => {
  return (
    <>
      <Link style={{ textDecoration: "none" }} href="/">
        <span className="flex h-full items-center justify-center pl-4">
          <p className="text-3xl font-extrabold text-sky-800">Good to GO</p>
        </span>
      </Link>
      <UserNav />
    </>
  );
};

export default HeaderContent;
