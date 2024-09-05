"use server";
import React from "react";
import FormProvider from "@/components/Login/FormProvider";
import Image from "next/image";
const Login = () => {
  return (
    <>
      <main className="flex h-screen w-screen items-center justify-center pt-[60px]">
        <FormProvider />
        <Image
          src="/banner/banner-2.jpg"
          alt="banner"
          fill
          priority
          className="relative z-0 object-cover"
        />
      </main>
    </>
  );
};

export default Login;
