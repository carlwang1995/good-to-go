import Link from "next/link";
import React from "react";
import UserNav from "./UserNav";
import Image from "next/image";
import { Alkatra, Mochiy_Pop_P_One } from "next/font/google";

const fontStyle = Alkatra({ weight: "700", subsets: ["latin"] });

const HeaderWiderContent = () => {
  return (
    <>
      <Link style={{ textDecoration: "none" }} href="/">
        <span className="flex h-full items-center">
          <Image
            src="/world.png"
            alt="logo"
            height={36}
            width={36}
            className="mr-2"
          />
          <p
            className={`${fontStyle.className} font-serif text-3xl text-sky-800 max-[980px]:hidden`}
          >
            Good to GO
          </p>
        </span>
      </Link>
      <UserNav />
    </>
  );
};

export default HeaderWiderContent;
