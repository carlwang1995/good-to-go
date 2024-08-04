import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "規劃行程 | Good to Go",
  description: "開始規劃行程",
};

const Plan = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default Plan;
