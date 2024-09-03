import type { Metadata } from "next";
import Header from "@/components/Header/HeaderWider";
import React, { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "規劃行程 | Good to GO",
  description: "開始規劃行程",
};

const Plan = ({
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

export default Plan;
