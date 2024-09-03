import Image from "next/image";
import Link from "next/link";
import React from "react";

type TripType = {
  userId: string;
  tripName: string;
  destination: Array<string>;
  dates: Array<string>;
  startDate: string;
  endDate: string;
  photo: { fileName: string; photoUrl: string };
  privacy: boolean;
  createTime: string;
};

const PlanTitleCard = ({
  tripInfo,
  user,
  isEditable,
  setShowEditInput,
}: {
  tripInfo: TripType | undefined;
  user: string | boolean;
  isEditable: boolean;
  setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="relative z-10 bg-black/30">
      <div className="relative flex h-16 w-full items-center bg-black/60 p-3">
        {user ? (
          <Link
            href="/trips"
            className="mr-3 w-8 text-xl text-white hover:font-bold"
          >
            &#8592;
          </Link>
        ) : (
          <></>
        )}
        <span className="text-xl text-white">
          {tripInfo && tripInfo.tripName}
        </span>
        {isEditable ? (
          <Image
            src="/edit-white.png"
            alt="edit"
            width={20}
            height={20}
            className="absolute right-2 hover:cursor-pointer"
            onClick={() => setShowEditInput(true)}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="flex min-h-24 w-full flex-col items-center justify-center p-3">
        <div className="w-full">
          <span className="text-white">{tripInfo && tripInfo.startDate}</span>
          <span className="text-white"> - </span>
          <span className="text-white">{tripInfo && tripInfo.endDate}</span>
        </div>
        <div className="mt-1 w-full">
          <p className="text-white">
            {tripInfo && tripInfo.destination.toString()}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 m-2 text-sm text-white">
        {isEditable ? "編輯模式" : "檢視模式"}
      </div>
    </div>
  );
};

export default PlanTitleCard;
