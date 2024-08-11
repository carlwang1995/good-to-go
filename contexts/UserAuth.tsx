"use client";
import React, { createContext, useContext, useState } from "react";

type UserContextType = {
  isLogin: boolean;
  userId: string;
  userName: string;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  return (
    <UserContext.Provider
      value={{ isLogin, userId, userName, setIsLogin, setUserId, setUserName }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser必須在UserContextProvider中使用。");
  }
  return context;
};
