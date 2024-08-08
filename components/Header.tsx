"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loginState, setLoginState] = useState<boolean>(false);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setLoginState(true);
        setPhotoUrl(String(user.photoURL));
        setUserName(String(user.displayName));
      } else {
        setLoading(false);
        setLoginState(false);
      }
    });
  }, []);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setLoginState(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="fixed z-50 flex h-[60px] w-screen justify-center bg-white shadow-lg">
      <div className="relative flex h-full w-[1100px]">
        <Link style={{ textDecoration: "none" }} href="/">
          <span className="flex h-full items-center justify-center pl-4 text-3xl font-bold">
            <p>Good to Go</p>
          </span>
        </Link>
        <div className="absolute right-0 top-0 flex h-full items-center">
          {loading ? (
            <div className="mx-3 flex h-screen items-center justify-center text-xl hover:font-bold">
              <p>載入中...</p>
            </div>
          ) : loginState ? (
            <>
              <div className="mx-3 flex items-center justify-center text-xl hover:cursor-pointer hover:font-bold">
                <Link style={{ textDecoration: "none" }} href="/trips">
                  <p>行程規劃</p>
                </Link>
              </div>
              <div className="mx-3 flex items-center justify-center text-base hover:cursor-pointer">
                <Image
                  className="mr-1 rounded-full border-[1px] border-solid border-black"
                  src={photoUrl}
                  alt="member"
                  width={35}
                  height={35}
                ></Image>
                <p>{userName}</p>
              </div>
              <div
                className="mx-3 flex items-center justify-center text-xl hover:cursor-pointer hover:font-bold"
                onClick={logOut}
              >
                <p>登出</p>
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
