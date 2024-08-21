import React, { useState } from "react";
import Image from "next/image";
import GoogleIcon from "@/public/icons8-google.svg";
import { useRouter } from "next/navigation";
import {
  signInWithGoogle,
  signInWithUserEmailAndPassword,
} from "@/libs/auth/signIn";

const SignIn = ({
  switchToSignUp,
}: {
  switchToSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const GoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result) {
      router.push("/");
    } else {
      alert("登入發生錯誤");
    }
  };
  const signIn = async (email: string, password: string) => {
    setIsChecking(true);
    const result = await signInWithUserEmailAndPassword(email, password);
    if (result) {
      setIsChecking(false);
      setIsLogin(true);
      setMessage("登入成功");
    } else {
      setIsChecking(false);
      setIsLogin(false);
      setMessage("登入失敗，請確認帳號密碼");
    }
  };
  return (
    <>
      <h2 className="mb-2 text-2xl font-bold">登入帳號</h2>
      {isLogin ? (
        <>
          <div className="flex items-center p-2">
            <label htmlFor="account" className="text-lg">
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
          <div className="flex max-w-[300px] justify-center p-1 text-center">
            <div className="flex max-w-[300px] justify-center p-1 text-center text-lg text-green-500">
              {message}
            </div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="mt-2 flex w-full items-center justify-center rounded border border-black bg-white p-1 text-lg transition hover:cursor-pointer hover:bg-slate-200"
          >
            <span>返回首頁</span>
          </button>
        </>
      ) : (
        <div
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              signIn(email, password);
            }
          }}
        >
          <div className="flex items-center p-2">
            <label htmlFor="account" className="text-lg">
              信箱：
            </label>
            <input
              autoFocus
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
          <div className="flex max-w-[300px] justify-center p-1 text-center">
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
          </div>
          <button
            onClick={() => signIn(email, password)}
            className="mt-2 flex w-full items-center justify-center rounded border border-black bg-white p-1 text-lg transition hover:cursor-pointer hover:bg-slate-200"
          >
            <span>登入</span>
          </button>
          <div
            onClick={() => switchToSignUp((prev) => !prev)}
            className="my-2 w-full text-center text-lg hover:cursor-pointer hover:text-blue-600 hover:underline"
          >
            沒有帳號，進行註冊
          </div>
          <button
            onClick={() => {
              signIn("test@test.com", "111111");
              setEmail("test@test.com");
              setPassword("111111");
            }}
            className="mt-4 flex w-full items-center justify-center rounded border border-black bg-white p-1 text-lg transition hover:cursor-pointer hover:bg-slate-200"
          >
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
        </div>
      )}
    </>
  );
};

export default SignIn;
