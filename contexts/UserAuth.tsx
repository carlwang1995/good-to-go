"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  signInWithGoogle,
  signInWithUserEmailAndPassword,
} from "@/libs/auth/signIn";
import {
  DB_createNewMember,
  DB_getUserInfoByUserId,
  DB_updateUserInfo,
} from "@/libs/db/MembersDoc";
import { signUpWithUserNameAndEmailAndPassword } from "@/libs/auth/signUp";

type UserContextType = {
  user: string | boolean;
  userId: string;
  userName: string;
  email: string;
  photoUrl: string | undefined;
  googleAuth: () => Promise<boolean | undefined>;
  signIn: (email: string, password: string) => Promise<boolean | undefined>;
  signUp: (
    userName: string,
    email: string,
    password: string,
  ) => Promise<boolean | string | undefined>;
  logOut: () => void;
};
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const auth = useProvideAuth();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser必須在UserContextProvider中使用。");
  }
  return context;
};

function useProvideAuth() {
  const [user, setUser] = useState<any>(undefined);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string | undefined>("");

  const googleAuth = async () => {
    try {
      const result: any = await signInWithGoogle();
      if (result.ok) {
        const user = result.message.user;
        const { uid, displayName, email, photoURL } = user;
        setUser(user);
        setUserId(uid);
        setUserName(displayName);
        setEmail(email);
        setPhotoUrl(photoURL);
        const checkIsExist = await DB_getUserInfoByUserId(uid);
        if (checkIsExist!.docId) {
          const docId = checkIsExist!.docId;
          const upadeGoogleInfo = await DB_updateUserInfo(docId, {
            userId: uid,
            userName: displayName,
            email,
            photoUrl: photoURL,
          });
          if (upadeGoogleInfo) {
            return true;
          }
        } else {
          const createGoogleUserInfo = await DB_createNewMember(
            uid,
            displayName,
            email,
            photoURL,
          );
          if (createGoogleUserInfo) {
            return true;
          }
        }
      } else if (result.error) {
        setUser(false);
        console.error("登入發生錯誤");
        return false;
      }
    } catch (e) {
      console.error("登入發生錯誤");
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    const result = await signInWithUserEmailAndPassword(email, password);
    if (result.ok) {
      setUser(result.user);
      setUserId(result.user.uid);
      setEmail(result.user.email!);
      const userInfo = await DB_getUserInfoByUserId(result.user.uid);
      const userName = userInfo?.userInfo.userName;
      const photoUrl = userInfo?.userInfo.photoUrl;
      if (userName) {
        setUserName(userName);
        setPhotoUrl(photoUrl);
      }
      return true;
    } else if (result.error) {
      setUser(false);
      console.error(result.message);
      return false;
    }
  };

  const signUp = async (userName: string, email: string, password: string) => {
    try {
      const result = await signUpWithUserNameAndEmailAndPassword(
        email,
        password,
      );
      if (result.ok === true) {
        setUser(result.user);
        setUserId(result.user.uid);
        setEmail(result.user.email!);
        const uploadUser = await DB_createNewMember(
          result.user.uid,
          userName,
          email,
        );
        if (uploadUser) {
          setUserName(userName);
        }
        return true;
      } else if (result.error) {
        setUser(false);
        return result.message;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const logOut = () => {
    signOut(auth).then(() => {
      setUser(false);
      setUserId("");
      setUserName("");
      setPhotoUrl("");
      sessionStorage.removeItem("page");
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserId(user.uid);
        setEmail(user.email!);
        DB_getUserInfoByUserId(user.uid).then((userInfo) => {
          if (userInfo?.userInfo.userName) {
            setUserName(userInfo?.userInfo.userName);
            setPhotoUrl(userInfo?.userInfo.photoUrl);
          }
        });
      } else {
        setUser(false);
        setUserId("");
        setEmail("");
        setUserName("");
        setPhotoUrl("");
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    userId,
    userName,
    email,
    photoUrl,
    googleAuth,
    signIn,
    signUp,
    logOut,
  };
}
