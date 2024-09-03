import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import React, { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "行程瀏覽 | Good to GO",
  description: "行程瀏覽與規劃",
};

const Trips = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <div className="overflow-x-hidden">{children}</div>
      </Suspense>
    </>
  );
};

export default Trips;
