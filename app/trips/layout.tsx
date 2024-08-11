import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "我的行程 | Good to Go",
  description: "我的行程規劃",
};

const Trips = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen overflow-x-hidden bg-slate-100">{children}</div>
  );
};

export default Trips;
