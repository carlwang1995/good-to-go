"use client";
import React, { useState } from "react";
import SignInCard from "@/components/Login/SignInCard";
import SignUpCard from "@/components/Login/SignUpCard";

const FormProvider = () => {
  const [state, setState] = useState(true);
  return (
    <div className="relative z-10 flex min-h-[455px] min-w-[380px] flex-col items-center rounded-xl bg-zinc-100/80 p-10 shadow-xl">
      {state ? (
        <SignInCard switchToSignUp={setState} />
      ) : (
        <SignUpCard switchToSignIn={setState} />
      )}
    </div>
  );
};

export default FormProvider;
