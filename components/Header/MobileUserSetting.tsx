import React from "react";
import Image from "next/image";
import Link from "next/link";

type UserSettingProps = {
  user: string | boolean;
  userName: string;
  userEmail: string;
  photoUrl: string;
  signOut: () => void;
  setIsOpenMobileSetting: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileUserSetting = ({
  user,
  userName,
  userEmail,
  photoUrl,
  signOut,
  setIsOpenMobileSetting,
}: UserSettingProps) => {
  return (
    <div className="fixed right-0 top-0 z-50 flex h-dvh w-[250px] flex-col bg-sky-900/90 sm:hidden">
      {user && (
        <>
          <div className="m-4 flex h-fit w-full items-center overflow-hidden">
            <Image
              src={photoUrl ? photoUrl : "/user.png"}
              width={50}
              height={50}
              alt="member"
              className="mr-1 min-h-[50px] min-w-[50px] rounded-full border border-gray-300"
            />
            <div>
              <div className="ml-2 text-lg font-bold text-white">
                {userName ? userName : "使用者"}
              </div>
              <div className="ml-2 mt-1 text-sm text-gray-300">{userEmail}</div>
            </div>
          </div>
          <hr className="mx-4 my-2" />
          <div className="mx-4 my-2 w-fit hover:cursor-pointer">
            <Link href="/trips">
              <p className="text-xl text-white">開始規劃</p>
            </Link>
          </div>
          <div className="mx-4 my-2 w-fit hover:cursor-pointer">
            <p
              onClick={() => {
                signOut();
                setIsOpenMobileSetting(false);
              }}
              className="text-xl text-white"
            >
              登出
            </p>
          </div>
        </>
      )}
      {!user && (
        <div className="flex h-24 items-center">
          <div className="mx-4 my-2 w-fit hover:cursor-pointer">
            <Link href="/login">
              <p
                onClick={() => {
                  setIsOpenMobileSetting(false);
                }}
                className="text-xl text-white"
              >
                登入
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileUserSetting;
