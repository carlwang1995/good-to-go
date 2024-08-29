import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DB_getUserInfoByUserId } from "@/libs/db/MemberInfo";
import { useUser } from "@/contexts/UserAuth";
type TripType = {
  docId: string;
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

const BrowseItem = ({ trip }: { trip: TripType }) => {
  const [authorName, setAuthorName] = useState<string>("");
  const [authorId, setAuthorId] = useState<string>("");
  const { userId } = useUser();

  useEffect(() => {
    DB_getUserInfoByUserId(trip.userId).then((result: any) => {
      setAuthorName(result?.userInfo.userName);
      setAuthorId(result?.userInfo.userId);
    });
  }, []);

  return (
    <Link href={`/plan/${trip.docId}`}>
      <div className="my-2 flex h-48 w-full rounded-b-md bg-white p-4 shadow-md transition hover:cursor-pointer hover:shadow-xl">
        <div className="relative h-full w-64 rounded-lg bg-slate-500">
          <Image
            src={trip.photo.photoUrl}
            alt="trip's photo"
            fill={true}
            sizes="{min-width:'256px'}"
            className="rounded-lg"
          ></Image>
          <div className="absolute bottom-0 left-0 flex h-fit w-fit items-center justify-center rounded-bl-lg rounded-tr-lg bg-black/50 px-2 py-1">
            <p className="font-bold text-white">
              {trip.dates.length.toString() + " "}天
            </p>
          </div>
        </div>
        <div className="ml-4 flex flex-col justify-between">
          <div className="mt-2 items-center">
            <p className="text-2xl font-bold">{trip.tripName}</p>
            <div className="mt-2 flex items-center">
              <p className="text-lg">{trip.destination.toString()}</p>
            </div>
          </div>
          <div className="mt-2 flex items-end">
            <p
              className={`text-lg ${userId === authorId ? "text-blue-500" : null}`}
            >
              {authorName}
              {userId === authorId ? " (您)" : null}
            </p>
            <span className="mx-1">｜</span>
            <p className="text-base text-gray-400">
              {trip.createTime.split(" ")[0]}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BrowseItem;