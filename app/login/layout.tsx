import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "登入帳戶 | Good to Go",
  description: "登入Good to Go會員帳戶",
};

const Login = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default Login;
