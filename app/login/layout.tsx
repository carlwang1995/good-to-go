import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "登入帳戶 | Good to GO",
  description: "登入會員帳戶",
};

const Login = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default Login;
