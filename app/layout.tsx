import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { UserContextProvider } from "@/contexts/UserAuth";

const notoSansTc = Noto_Sans_TC({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "旅遊行程規劃 | Good to GO",
  description: "線上旅遊規劃工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <html lang="zh-HANT">
        <body className={notoSansTc.className}>{children}</body>
      </html>
    </UserContextProvider>
  );
}
