import React from "react";
import Image from "next/image";

type UserSettingProps = {
  user: string | boolean;
  userName: string;
  userEmail: string;
  photoUrl: string;
  signOut: () => void;
};

const UserSetting = ({
  userName,
  userEmail,
  photoUrl,
  signOut,
}: UserSettingProps) => {
  return (
    <div className="absolute right-0 top-[50px] z-10 w-[300px] rounded-xl bg-white p-5 max-sm:hidden">
      <div className="flex items-center">
        <Image
          src={photoUrl ? photoUrl : "/user.png"}
          width={50}
          height={50}
          alt="member"
          className="mr-1 rounded-full border-[1px] border-solid border-black"
        />
        <div>
          <div className="ml-2 text-lg font-bold">
            {userName ? userName : "使用者"}
          </div>
          <div className="ml-2 mt-1 text-sm text-slate-500">{userEmail}</div>
        </div>
      </div>
      <hr className="my-4 border-slate-300" />
      <div className="flex justify-center">
        <button
          onClick={() => {
            signOut();
          }}
          className="btn_blue"
        >
          登出
        </button>
      </div>
    </div>
  );
};

export default UserSetting;
