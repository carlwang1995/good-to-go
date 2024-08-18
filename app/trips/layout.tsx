import type { Metadata } from "next";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "我的行程 | Good to GO",
  description: "我的行程規劃",
};

const Trips = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <div className="overflow-x-hidden">{children}</div>
    </>
  );
};

export default Trips;
