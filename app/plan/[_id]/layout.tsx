import type { Metadata } from "next";
import Header from "@/components/Header/HeaderWider";

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
      {children}
    </>
  );
};

export default Plan;
