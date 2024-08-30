"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import UserSetting from "./UserSetting";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useUser } from "@/contexts/UserAuth";
import { DB_getUserInfoByUserId } from "@/libs/db/MemberInfo";
import Loading from "../Loading";

type BaseUserInfoType = {
  userName: string;
  photoUrl: string;
  email: string;
  userId: string;
};

const UserNav = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);
  const [baseUserInfo, setBaseUserInfo] = useState<
    BaseUserInfoType | undefined
  >(undefined);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const { isLogin, userId, userName, setIsLogin, setUserId, setUserName } =
    useUser();

  useEffect(() => {
    if (userId) {
      DB_getUserInfoByUserId(userId)
        .then((result: any) => {
          setBaseUserInfo(result.userInfo);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [userId]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
        setIsLogin(true);
        setUserId(String(user.uid));
        setUserEmail(String(user.email));

        if (user.photoURL && user.displayName) {
          setPhotoUrl(String(user.photoURL));
          setUserName(String(user.displayName));
        } else if (baseUserInfo) {
          setPhotoUrl(baseUserInfo.photoUrl);
          setUserName(baseUserInfo.userName);
        }
      } else {
        setIsLoading(false);
        setIsLogin(false);
      }
    });
  }, [isLogin, baseUserInfo]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setIsLogin(false);
        setUserId("");
        setUserName("");
        setIsOpenSetting(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="absolute right-0 top-0 flex h-full items-center">
      <div className="mx-3 flex items-center justify-center">
        <Link
          style={{ textDecoration: "none" }}
          href={isLogin ? "/trips" : "/login"}
        >
          <p className="text-xl transition hover:font-bold">開始規劃</p>
        </Link>
      </div>
      {isLoading ? (
        <div className="relative mx-3 flex items-center justify-center">
          <Loading widthPx={35} heightPx={35} />
        </div>
      ) : isLogin ? (
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
