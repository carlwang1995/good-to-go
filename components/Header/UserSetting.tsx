import React from "react";
import Image from "next/image";

type UserSettingProps = {
  userName: string;
  userEmail: string;
  photoUrl: string;
  logOut: () => void;
};

const UserSetting = ({
  userName,
  userEmail,
  photoUrl,
  logOut,
}: UserSettingProps) => {
  return (
    <div className="absolute right-0 top-[50px] z-10 w-[300px] rounded-xl bg-white p-5">
      <div className="flex items-center">
        <Image
          src={photoUrl}
          width={50}
          height={50}
          alt="member"
          className="mr-1 rounded-full border-[1px] border-solid border-black"
        ></Image>
        <div>
          <div className="ml-2 text-lg font-bold">{userName}</div>
          <div className="ml-2 mt-1 text-sm text-slate-500">{userEmail}</div>
        </div>
      </div>
      <hr className="my-4 border-slate-300" />
      <div className="flex justify-center">
        <button
          onClick={() => {
            logOut();
          }}
          className="rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
        >
          登出
        </button>
      </div>
    </div>
  );
};

export default UserSetting;
