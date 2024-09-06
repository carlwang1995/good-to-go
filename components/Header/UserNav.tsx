"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import UserSetting from "./UserSetting";
import MobileUserSetting from "./MobileUserSetting";
import { useUser } from "@/contexts/UserAuth";
import { Loading } from "../Loading";

const UserNav = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);
  const [isOpenMobileSetting, setIsOpenMobileSetting] =
    useState<boolean>(false);
  const { user, userId, userName, email, photoUrl, logOut } = useUser();

  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <>
      <div className="absolute right-0 top-0 flex h-full items-center max-sm:hidden">
        <div className="mx-3 flex items-center justify-center">
          {!isLoading && (
            <Link href={user ? "/trips" : "/login"}>
              <p className="text-xl font-bold text-sky-800 transition">
                開始規劃
              </p>
            </Link>
          )}
        </div>
        {isLoading ? (
          <div className="relative mx-3 flex items-center justify-center">
            <Loading widthPx={35} heightPx={35} />
          </div>
        ) : user ? (
          <div className="relative flex items-center justify-center">
            <Image
              className="rounded-full border-2 border-solid border-sky-800 hover:cursor-pointer"
              src={photoUrl ? photoUrl : "/user.png"}
              alt="member"
              width={35}
              height={35}
              onClick={() => setIsOpenSetting(!isOpenSetting)}
            />
          </div>
        ) : (
          <Link style={{ textDecoration: "none" }} href="/login">
            <div className="hover:pointer mx-3 flex h-full items-center justify-center text-xl hover:font-bold">
              <p className="font-bold text-sky-800">登入</p>
            </div>
          </Link>
        )}
      </div>
      <div
        onClick={() => {
          setIsOpenMobileSetting(true);
        }}
        className="absolute right-0 hidden h-full items-center hover:cursor-pointer max-sm:flex"
      >
        <Image src="/pagemenu.png" alt="menu" width={30} height={30} />
      </div>
      {isOpenSetting && user && (
        <>
          <UserSetting
            user={user}
            userName={userName}
            userEmail={email}
            photoUrl={photoUrl!}
            signOut={logOut}
          />
          <div
            className="fixed left-0 top-0 z-0 h-screen w-screen bg-black/80 max-sm:hidden"
            onClick={() => setIsOpenSetting(false)}
          ></div>
        </>
      )}
      {isOpenMobileSetting && (
        <>
          <MobileUserSetting
            user={user}
            userName={userName}
            userEmail={email}
            photoUrl={photoUrl!}
            signOut={logOut}
            setIsOpenMobileSetting={setIsOpenMobileSetting}
          />
          <div
            className="fixed left-0 top-0 z-0 h-screen w-screen sm:hidden"
            onClick={() => setIsOpenMobileSetting(false)}
          ></div>
        </>
      )}
    </>
  );
};

export default UserNav;
