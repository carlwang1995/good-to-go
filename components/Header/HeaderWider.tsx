"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useUser } from "@/contexts/UserAuth";
import UserSetting from "./UserSetting";

const Header = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const { isLogin, userId, userName, setIsLogin, setUserId, setUserName } =
    useUser();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        setIsLoading(false);
        setIsLogin(true);
        setPhotoUrl(String(user.photoURL));
        setUserId(String(user.uid));
        setUserName(String(user.displayName));
        setUserEmail(String(user.email));
      } else {
        setIsLoading(false);
        setIsLogin(false);
      }
    });
  }, [isLogin]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setIsLogin(false);
        setIsOpenSetting(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="fixed z-50 flex h-[60px] w-screen justify-center bg-white shadow-lg">
      <div className="relative flex h-full w-full">
        <Link style={{ textDecoration: "none" }} href="/">
          <span className="flex h-full items-center justify-center pl-4 text-3xl font-bold">
            <p>Good to GO</p>
          </span>
        </Link>
        <div className="absolute right-0 top-0 flex h-full items-center">
          {isLoading ? (
            <div className="mx-3 flex h-screen items-center justify-center text-xl hover:font-bold">
              <p>載入中...</p>
            </div>
          ) : isLogin ? (
            <>
              <div className="mx-3 flex items-center justify-center text-xl hover:cursor-pointer hover:font-bold">
                <Link style={{ textDecoration: "none" }} href="/trips">
                  <p>開始規劃</p>
                </Link>
              </div>
              <div className="relative mx-3 flex items-center justify-center text-base">
                <Image
                  className="mr-1 rounded-full border-4 border-double border-slate-600 hover:cursor-pointer hover:border-2 hover:border-solid"
                  src={photoUrl}
                  alt="member"
                  width={35}
                  height={35}
                  onClick={() => setIsOpenSetting(!isOpenSetting)}
                ></Image>
                {isOpenSetting ? (
                  <>
                    <UserSetting
                      userName={userName}
                      userEmail={userEmail}
                      photoUrl={photoUrl}
                      logOut={logOut}
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
            </>
          ) : (
            <>
              <Link style={{ textDecoration: "none" }} href="/login">
                <div className="hover:pointer mx-3 flex h-full items-center justify-center text-xl hover:font-bold">
                  <p>開始規劃</p>
                </div>
              </Link>
              <Link style={{ textDecoration: "none" }} href="/login">
                <div className="hover:pointer mx-3 flex h-full items-center justify-center text-xl hover:font-bold">
                  <p>登入</p>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
