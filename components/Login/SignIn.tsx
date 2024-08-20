import React from "react";
import Image from "next/image";
import GoogleIcon from "@/public/icons8-google.svg";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/libs/auth/signIn";

const SignIn = ({
  switchToSignUp,
}: {
  switchToSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const GoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result) {
      router.push("/");
    } else {
      alert("登入發生錯誤");
    }
  };
  return (
    <>
      <h2 className="mb-2 text-2xl font-bold">登入帳號</h2>
      <div className="flex items-center p-2">
        <label htmlFor="account" className="text-lg">
          信箱：
        </label>
        <input
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
          placeholder="請輸入至少六位英數字"
          required
          id="password"
          type="password"
          className="rounded border border-solid border-black p-2 outline-none"
        />
      </div>
      <button className="mt-4 flex w-full items-center justify-center rounded border border-black bg-white p-1 text-lg transition hover:cursor-pointer hover:bg-slate-200">
        <span>登入</span>
      </button>
      <div
        onClick={() => switchToSignUp((prev) => !prev)}
        className="my-2 text-lg hover:cursor-pointer hover:text-blue-600 hover:underline"
      >
        沒有帳號，進行註冊
      </div>
      <button className="mt-4 flex w-full items-center justify-center rounded border border-black bg-white p-1 text-lg transition hover:cursor-pointer hover:bg-slate-200">
        <span>測試用帳號，一鍵登入</span>
      </button>
      <button
        className="mt-4 flex w-full items-center justify-center rounded border border-black bg-white p-1 transition hover:cursor-pointer hover:bg-slate-200"
        onClick={GoogleSignIn}
      >
        <Image
          src={GoogleIcon}
          alt="Google Icon"
          width={25}
          height={25}
        ></Image>
        <p className="ml-2 text-lg">Google帳號登入</p>
      </button>
    </>
  );
};

export default SignIn;
