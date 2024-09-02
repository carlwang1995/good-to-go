"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import UserSetting from "./UserSetting";
import { useUser } from "@/contexts/UserAuth";

import Loading from "../Loading";

const UserNav = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);
  const { user, userId, userName, email, photoUrl, logOut } = useUser();

  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className="absolute right-0 top-0 flex h-full items-center">
      <div className="mx-3 flex items-center justify-center">
        <Link href={user ? "/trips" : "/login"}>
          <p className="text-xl transition hover:font-bold">開始規劃</p>
        </Link>
      </div>
      {isLoading ? (
        <div className="relative mx-3 flex items-center justify-center">
          <Loading widthPx={35} heightPx={35} />
        </div>
      ) : user ? (
        <div className="relative mx-3 flex items-center justify-center">
          <Image
            className="rounded-full border-4 border-double border-slate-600 hover:cursor-pointer hover:border-2 hover:border-solid"
            src={photoUrl ? photoUrl : "/user.png"}
            alt="member"
            width={35}
            height={35}
            onClick={() => setIsOpenSetting(!isOpenSetting)}
          />
          {isOpenSetting ? (
            <>
              <UserSetting
                userName={userName}
                userEmail={email}
                photoUrl={photoUrl!}
                signOut={logOut}
              />
              <div
                className="fixed left-0 top-0 z-0 h-screen w-screen bg-black/80"
                onClick={() => setIsOpenSetting(false)}
              ></div>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <Link style={{ textDecoration: "none" }} href="/login">
          <div className="hover:pointer mx-3 flex h-full items-center justify-center text-xl hover:font-bold">
            <p>登入</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default UserNav;
