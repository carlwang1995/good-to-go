import type { Metadata } from "next";
import Header from "@/components/Header/Header";

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
      <div className="overflow-x-hidden">{children}</div>
    </>
  );
};

export default Trips;
