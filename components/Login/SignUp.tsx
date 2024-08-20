import React from "react";

const SignUp = ({
  switchToSignIn,
}: {
  switchToSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <h2 className="mb-2 text-2xl font-bold">註冊帳號</h2>
      <div className="flex items-center p-2">
        <label htmlFor="account" className="text-lg">
          名稱：
        </label>
        <input
          required
          id="account"
          type="email"
          className="rounded border border-solid border-black p-2 outline-none"
          placeholder="王小明"
        />
      </div>
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
        <span>註冊</span>
      </button>
      <div
        onClick={() => switchToSignIn((prev) => !prev)}
        className="my-2 text-lg hover:cursor-pointer hover:text-blue-600 hover:underline"
      >
        已有帳號，進行登入
      </div>
    </>
  );
};

export default SignUp;
