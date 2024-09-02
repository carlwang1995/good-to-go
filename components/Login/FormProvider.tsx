"use client";
import React, { useState } from "react";
import SignInCard from "@/components/Login/SignInCard";
import SignUpCard from "@/components/Login/SignUpCard";

const FormProvider = () => {
  const [state, setState] = useState(true);
  return (
    <div className="flex min-h-[455px] min-w-[380px] flex-col items-center rounded-xl border border-solid border-black bg-blue-50 p-10 shadow-2xl">
      {state ? (
        <SignInCard switchToSignUp={setState} />
      ) : (
        <SignUpCard switchToSignIn={setState} />
      )}
    </div>
  );
};

export default FormProvider;
