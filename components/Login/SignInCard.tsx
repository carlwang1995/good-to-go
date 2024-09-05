import React, { useState } from "react";
import Image from "next/image";
import GoogleIcon from "@/public/icons8-google.svg";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserAuth";

const SignInCard = ({
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
  const { googleAuth, signIn } = useUser();

  const signInHandler = async (email: string, password: string) => {
    setIsChecking(true);
    const result = await signIn(email, password);
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
      <h2 className="mb-2 text-2xl font-bold text-sky-800">登入帳號</h2>
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
            className="mt-4 flex w-full items-center justify-center rounded border border-solid border-blue-700 bg-blue-500 px-2 py-1 text-lg transition hover:bg-blue-700"
          >
            <p className="text-white">返回首頁</p>
          </button>
        </>
      ) : (
        <div
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              () => {
                signInHandler(email, password);
              };
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
              <Image src="/loading.gif" alt="loading" width={25} height={25} />
            ) : (
              <div className="flex max-w-[300px] justify-center p-1 text-center text-lg text-red-500">
                {message}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              signInHandler(email, password);
            }}
            className="mt-2 flex w-full items-center justify-center rounded border border-solid border-blue-700 bg-blue-500 px-2 py-1 text-lg transition hover:bg-blue-700"
          >
            <p className="text-white">登入</p>
          </button>
          <div className="my-2 flex w-full justify-center">
            <p
              onClick={() => switchToSignUp((prev) => !prev)}
              className="text-center text-lg hover:cursor-pointer hover:text-blue-600 hover:underline"
            >
              沒有帳號，進行註冊
            </p>
          </div>
          <button
            onClick={() => {
              signInHandler("test@test.com", "111111");
            }}
            className="mt-4 flex w-full items-center justify-center rounded border border-solid border-blue-500 bg-blue-100 px-2 py-1 text-lg transition hover:bg-blue-200"
          >
            <span>測試用帳號，一鍵登入</span>
          </button>
          <button
            className="mt-4 flex w-full items-center justify-center rounded border border-solid border-blue-500 bg-blue-100 px-2 py-1 text-lg transition hover:bg-blue-200"
            onClick={async () => {
              const result = await googleAuth();
              if (result) {
                router.push("/");
              } else {
                setMessage("登入失敗");
              }
            }}
          >
            <Image src={GoogleIcon} alt="Google Icon" width={25} height={25} />
            <p className="ml-2 text-lg">Google帳號登入</p>
          </button>
        </div>
      )}
    </>
  );
};

export default SignInCard;
