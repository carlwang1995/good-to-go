import React from "react";
import FormProvider from "@/components/Login/FormProvider";

const Login = () => {
  return (
    <main className="flex h-screen w-screen items-center justify-center pt-[60px]">
      <FormProvider />
    </main>
  );
};

export default Login;
