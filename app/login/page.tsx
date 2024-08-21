"use client";
import React, { useState } from "react";
import SignIn from "@/components/Login/SignIn";
import SignUp from "@/components/Login/SignUp";

const Login = () => {
  const [state, setState] = useState(true);
  return (
    <main className="flex h-screen w-screen items-center justify-center pt-[60px]">
      <div className="flex min-h-[455px] min-w-[380px] flex-col items-center rounded-xl border border-solid border-black bg-blue-50 p-10 shadow-2xl">
        {state ? (
          <SignIn switchToSignUp={setState} />
        ) : (
          <SignUp switchToSignIn={setState} />
        )}
      </div>
    </main>
  );
};

export default Login;
