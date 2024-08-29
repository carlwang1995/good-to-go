"use client";
import React, { useState } from "react";
import { signUpWithUserNameAndEmailAndPassword } from "@/libs/auth/signUp";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DB_createNewMember } from "@/libs/db/MemberInfo";

const SignUp = ({
  switchToSignIn,
}: {
  switchToSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogUp, setIsLogUp] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const signUp = async (userName: string, email: string, password: string) => {
    setIsChecking(true);
    if (!userName) {
      setMessage("請輸入使用者名稱");
      setIsChecking(false);
      return;
    }
    try {
      const result = await signUpWithUserNameAndEmailAndPassword(
        email,
        password,
      );
      if (result.result === true) {
        const uploadUser = DB_createNewMember(result.message, userName, email);
        if (!uploadUser) {
          console.error("上傳使用者資料失敗。");
          return;
        }
        setIsChecking(false);
        setIsLogUp(true);
        setMessage("註冊成功");
      } else if (result.result === false) {
        setIsChecking(false);
        setIsLogUp(false);
        setMessage(result.message);
      }
    } catch (e) {
      throw new Error("無法連接firebase登入系統");
    }
  };
  return (
    <>
      <h2 className="mb-2 text-2xl font-bold">註冊帳號</h2>
      {isLogUp ? (
        <>
          <div className="flex items-center p-2">
            <label htmlFor="account" className="text-lg">
              名稱：
            </label>
            <input
              readOnly
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="王小明"
              required
              id="userName"
              type="text"
              className="rounded border border-solid border-black bg-gray-200 p-2 text-gray-400 outline-none"
            />
          </div>
          <div className="flex items-center p-2">
            <label htmlFor="userName" className="text-lg">
              信箱：
            </label>
            <input
              readOnly
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="example@example.com"
              required
              id="account"
              type="email"
              className="rounded border border-solid border-black bg-gray-200 p-2 text-gray-400 outline-none"
            />
          </div>
          <div className="flex items-center p-2">
            <label htmlFor="password" className="text-lg">
              密碼：
            </label>
            <input
              readOnly
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="請輸入至少六位英數字"
              required
              id="password"
              type="password"
              className="rounded border border-solid border-black bg-gray-200 p-2 text-gray-400 outline-none"
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center p-2">
            <label htmlFor="account" className="text-lg">
              名稱：
            </label>
            <input
              autoFocus
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="王小明"
              required
              id="userName"
              type="text"
              className="rounded border border-solid border-black p-2 outline-none"
            />
          </div>
          <div className="flex items-center p-2">
            <label htmlFor="account" className="text-lg">
              信箱：
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="example@example.com"
              required
              id="account"
              type="email"
              className="rounded border border-solid border-black p-2 outline-none"
            />
          </div>
          <div className="flex items-center p-2">
            <label htmlFor="password" className="text-lg">
              密碼：
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="請輸入至少六位英數字"
              required
              id="password"
              type="password"
              className="rounded border border-solid border-black p-2 outline-none"
            />
          </div>
        </>
      )}

      {isLogUp ? (
        <>
          <div className="flex max-w-[300px] justify-center p-1 text-center text-lg text-green-500">
            {message}
          </div>
          <button
            onClick={() => router.push("/")}
            className="mt-4 flex w-full items-center justify-center rounded border border-solid border-blue-700 bg-blue-500 px-2 py-1 text-lg transition hover:bg-blue-700"
          >
            <p className="text-white">返回首頁</p>
          </button>
        </>
      ) : (
        <>
          {isChecking ? (
            <Image
              src="/loading.gif"
              alt="loading"
              width={25}
              height={25}
            ></Image>
          ) : (
            <div className="flex max-w-[300px] justify-center p-1 text-center text-lg text-red-500">
              {message}
            </div>
          )}
          <button
            onClick={() => signUp(userName, email, password)}
            className="mt-4 flex w-[289px] items-center justify-center rounded border border-solid border-blue-700 bg-blue-500 px-2 py-1 text-lg transition hover:bg-blue-700"
          >
            <p className="text-white">註冊</p>
          </button>
          <div
            onClick={() => switchToSignIn((prev) => !prev)}
            className="my-2 text-lg hover:cursor-pointer hover:text-blue-600 hover:underline"
          >
            已有帳號，進行登入
          </div>
        </>
      )}
    </>
  );
};

export default SignUp;
