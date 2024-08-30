"use client";
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserAuth";
import Image from "next/image";
import Link from "next/link";
import DateItem from "./DateItem";
import PlanCard from "./PlanCard";
import {
  DayIndexContext,
  DestinationContext,
  EditableContext,
} from "@/contexts/ContextProvider";
import { useRouter } from "next/navigation";

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

const PlanContent = ({
  docId,
  tripInfo,
}: {
  docId: string;
  tripInfo: TripType;
}) => {
  const [dayIndex, setDayIndex] = useState<string>("day1");
  const [dateCount, setDateCount] = useState<string>("第1天");
  const [isEditable, setIsEditable] = useState(false);
  const dateSectionRef = useRef<HTMLDivElement | null>(null);
  const { isLogin, userId } = useUser();
  const router = useRouter();

  // 判斷是否可編輯、可查看
  useEffect(() => {
    // 未登入
    if (!isLogin && tripInfo) {
      if (!tripInfo.privacy) {
        setIsEditable(false);
        router.push("/");
        return;
      } else {
        setIsEditable(false);
        return;
      }
    }
    // 有登入
    if (tripInfo && userId) {
      // 非公開且非本人，導回首頁
      if (!tripInfo.privacy && tripInfo.userId !== userId) {
        setIsEditable(false);
        router.push("/");
        return;
      }
      // 公開但非本人，可瀏覽不可編輯
      if (tripInfo.privacy && tripInfo.userId !== userId) {
        setIsEditable(false);
        return;
      }
      // 登入且為本人，可瀏覽可編輯
      if (tripInfo.userId === userId) {
        setIsEditable(true);
        return;
      }
    }
  }, [tripInfo, isLogin, userId]);

  const scrollRange = 300;
  const dateScrollToLeft = () => {
    if (dateSectionRef.current) {
      dateSectionRef.current.scrollLeft -= scrollRange;
    }
  };
  const dateScrollToRight = () => {
    if (dateSectionRef.current) {
      dateSectionRef.current.scrollLeft += scrollRange;
    }
  };

  return (
    <div className="flex h-full min-w-[500px] max-w-[500px] flex-col border-r border-slate-200 bg-slate-50">
      <div className="relative border-b border-solid border-slate-300 shadow-lg">
        <Image
          priority={true}
          fill={true}
          sizes="min-width:500px"
          src={tripInfo.photo.photoUrl ? tripInfo.photo.photoUrl : "/blur.jpg"}
          alt="background"
          className="absolute left-0 top-0 z-0 h-40 w-full"
          style={{ objectFit: "cover" }}
        />
        <div className="relative z-10 bg-black/30">
          <div className="flex h-16 w-full items-center bg-black/60 p-3">
            {isLogin ? (
              <Link
                href="/trips"
                className="mr-3 w-8 text-xl text-white hover:font-bold"
              >
                &#8592;
              </Link>
            ) : (
              <></>
            )}
            <span className="text-xl text-white">{tripInfo.tripName}</span>
          </div>
          <div className="flex h-24 w-full flex-col items-center justify-center p-3">
            <div className="w-full">
              <span className="text-white">{tripInfo.startDate}</span>
              <span className="text-white"> - </span>
              <span className="text-white">{tripInfo.endDate}</span>
            </div>
            <div className="mt-1 w-full">
              <p className="text-white">{tripInfo.destination?.toString()}</p>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 m-2 text-sm text-white">
            {isEditable ? "編輯模式" : "檢視模式"}
          </div>
        </div>

        <div className="relative flex h-14 w-full bg-white">
          <div
            onClick={dateScrollToLeft}
            className="absolute left-0 top-0 z-10 flex h-full items-center justify-center border border-white bg-white px-1 hover:cursor-pointer hover:border-slate-300"
          >
            <div className="text-2xl">&#10094;</div>
          </div>
          <div
            className="flex h-full w-full overflow-x-hidden scroll-smooth whitespace-nowrap px-7"
            ref={dateSectionRef}
          >
            {tripInfo.dates?.map((date, index) => (
              <DateItem
                key={index}
                date={date}
                dateNumber={index}
                dayIndex={dayIndex}
                setDateCount={setDateCount}
                setDayIndex={setDayIndex}
              />
            ))}
          </div>
          <div
            onClick={dateScrollToRight}
            className="hover: absolute right-0 top-0 z-10 flex h-full items-center justify-center border border-white bg-white px-1 hover:cursor-pointer hover:border-slate-300"
          >
            <div className="text-2xl">&#10095;</div>
          </div>
        </div>
      </div>
      <DayIndexContext.Provider value={dayIndex}>
        <DestinationContext.Provider
          value={tripInfo.destination ? tripInfo.destination : []}
        >
          <EditableContext.Provider value={isEditable}>
            <PlanCard docId={docId} dateCount={dateCount} />
          </EditableContext.Provider>
        </DestinationContext.Provider>
      </DayIndexContext.Provider>
    </div>
  );
};

export default PlanContent;
