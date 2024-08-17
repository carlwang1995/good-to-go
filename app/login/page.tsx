"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GoogleIcon from "@/public/icons8-google.svg";
import { signInWithGoogle } from "@/libs/auth/signIn";

const Login = () => {
  const router = useRouter();
  const signIn = async () => {
    const result = await signInWithGoogle();
    if (result) {
      router.push("/");
    } else {
      alert("登入發生錯誤");
    }
  };
  return (
    <main className="flex h-screen w-screen items-center justify-center pt-[60px]">
      <div className="flex flex-col items-center rounded-xl border-[1px] border-solid border-black p-10 shadow">
        <h2 className="p-0 text-2xl">登入帳號</h2>
        <button
          className="mt-8 flex items-center rounded-xl border-[1.5px] border-black p-5 text-xl transition hover:cursor-pointer hover:bg-slate-200"
          onClick={signIn}
        >
          <Image src={GoogleIcon} alt="Google Icon"></Image>
          <span>使用Google帳號登入</span>
        </button>
      </div>
    </main>
  );
};

export default Login;
